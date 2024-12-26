import {merge} from 'deep-fusion';
import axios from 'axios';
import isString from '~/utils/isString';
import isPlainObject from '~/utils/isPlainObject';
import isFunction from '~/utils/isFunction';
import trim from '~/utils/trim';
import Toast from '~/components/Toast';
import Dialog from '~/components/Dialog';
import TreeOptions from '~/interfaces/TreeOptions';
import TreeAjaxOptions from '~/interfaces/TreeAjaxOptions';

const multiple = false;
const fileNodeIdPrefix = 'f_';
const parentNodeIdSymbol = '_PARENT_NODE_ID_';
const currentNodeIdSymbol = '_CURRENT_NODE_ID_';

/**
 * Folder node creation Ajax response.
 */
interface CreateFolderNodeResponse {
  /**
   * Creation node ID.
   */
  id: string;
}

/**
 * File node creation Ajax response.
 */
interface CreateFileNodeResponse {
  /**
   * Creation node ID.
   */
  id: string;

  /**
   * For file nodes, the original ID before prefixing is set.
   */
  raw_id?: number;
}

/**
 * <code>jsTree</code> plugin-based interactive tree component.
 * For more info please visit the plugin's <a class="me-1" href="https://www.jstree.com/" target="_blank">Home</a> or <a href="https://github.com/vakata/jstree" target="_blank">Github Repo</a>.
 */
export default class Tree {
  /**
   * JSTree instance.
   * @type {JSTree}
   */
  #instance: JSTree;

  /**
   * Callback function called when a node is selected.
   * @type {(event: any, node: any) => void}
   */
  #selectedHandler: (event: any, node: any) => void = (event: any, node: any) => {};

  /**
   * Callback function to be called on error.
   * @type {(error: any) => void}
   */
  #errorHandler: (error: any) => void = (error: any) => {};

  /**
   * Callback function to be called when a child node of the selected node is retrieved from the server side.
   * @type {(data: any) => void}
   */
  #fetchHandler: (data: any) => void = (data: any) => {};

  /**
   * Callback function to be called when tree initialization is complete.
   * @type {(event: any) => void}
   */
  #readyhHandler: (event: any) => void = (event: any) => {};

  /**
   * Function to hook new node creation operations.
   * @type {((parent: any) => Promise<{id: string|number, text: string, [key: string]: any}|null|undefined|false>)|null}
   */
  #createFileHook: ((parent: any) => Promise<{id: string|number, text: string, [key: string]: any}|null|undefined|false>)|null = null;

  /**
   * Finalized options.
   * @type {Required<TreeOptions>}
   */
  #options: Required<TreeOptions>;

  /**
   * Create a new instance of the Tree class.
   * @param {string|HTMLDivElement|JQuery} element HTMLDivElement selector, element, or JQuery object.
   * @param {TreeOptions} options Tree options.
   */
  public constructor(element: string|HTMLDivElement|JQuery, options: TreeOptions) {
    // Check parameters.
    if (isString(element))
      element = $(element as string);
    else if (element instanceof HTMLDivElement)
      element = $(element);
    else if (element instanceof $)
      element = element as JQuery;
    else
      throw new TypeError('element parameter should be HTMLDivElement selectors, elements, and JQuery object');

    // Initialize options.
    this.#options = this.#initOptions(options);

    // Plug-ins to be applied to the tree.
    const plugins =[
      'state',
      'types',
      'sort',
      // 'dnd',
    ];
    if (!this.#options.readonly)
      // If it is not read-only, a context menu for node operations is displayed.
      plugins.push('contextmenu');

    // Initialize the tree.
    this.#instance = element
      .on('focus', '.jstree-rename-input', event => {
        // Set the maximum input length once the folder or file name input field is focused.
        const input = event.currentTarget;
        const li = input.closest('li[data-node-type]');
        switch (li.dataset.nodeType) {
        case this.#options.nodeTypes.folder.type:
          if (this.#options.folderMaxlen)
            input.setAttribute('maxlength', this.#options.folderMaxlen);
          break;
        case this.#options.nodeTypes.file.type:
          if (this.#options.fileMaxlen)
            input.setAttribute('maxlength', this.#options.fileMaxlen);
          break;
        }
      })
      .on('state_ready.jstree refresh.jstree', (event: any) => {
        // If there is no first selected node, the root node is made selected.
        if (!this.getSelectedNodes(true, 0))
          this.#selectNode(this.#getRootNode());

        // Triggers a ready event.
        this.#readyhHandler(event);
      })
      // .on('after_close.jstree', (event, data) => {
      //   if (!this.#options.cacheLoadedChildren) {
      //     // Flag it to be reloaded on reopen.
      //     // FIXME: If the parent folder of a selected folder is closed and opened, the selection is removed.
      //     data.node.state.loaded = false;
      //   }
      // })
      .on('select_node.jstree', (event: any, data: any) => {
        this.#selectedHandler(event, data.node);
      })
      .jstree({
        core: {
          themes: {
            // A boolean specifying if a reponsive version of the theme should kick in on smaller screens (if the theme supports it).
            // Defaults to false.
            responsive: false
          },

          // Determines what happens when a user tries to modify the structure of the tree
          // If left as false all operations like create, rename, delete, move or copy are prevented.
          // You can set this to true to allow all interactions or use a function to have better control.
          check_callback: true,

          // A boolean indicating if multiple nodes can be selected.
          multiple,

          // Data configuration.
          data: {
            type: 'GET',
            url: (currentNode: any) => {
              // Get request URL.
              const url = this.#getURLFromAjaxOption(this.#options.ajax.children, currentNode);

              // Replaces the parent node ID in the URL.
              return url.replace(parentNodeIdSymbol, encodeURIComponent(currentNode.id));
            },
            data: (currentNode: any) => {
              // Execute if there is a callback set up that returns data to be sent to the server.
              const data = {};
              if (isPlainObject(this.#options.ajax.children) && (this.#options.ajax.children as TreeAjaxOptions).data)
                (this.#options.ajax.children as TreeAjaxOptions).data!(data, currentNode);
              return data;
            },
            success: (data: any) => {
              for (let nodeData of data) {
                // Call node fetch event.
                this.#fetchHandler(nodeData);

                // Per node type.
                switch (nodeData.type) {
                case this.#options.nodeTypes.folder.type:
                  // The children property, which determines whether there are children, must be of type bool, so a string or numeric 1 or 0 is converted to a bool type.
                  if (typeof nodeData?.children !== 'boolean')
                    nodeData.children = nodeData.children == 1 || nodeData?.children.toString().toLowerCase() === 'true';
                  break;
                case this.#options.nodeTypes.file.type:
                  // The "children" property is not needed for file nodes, so it is removed.
                  delete nodeData.children;

                  // Set file node ID prefix.
                  this.#setFileNodeIDPrefix(nodeData);
                  break;
                default:
                  const error = `The type of node data returned by Ajax should be "${this.#options.nodeTypes.folder.type}" or "${this.#options.nodeTypes.file.type}"`;
                  alert(error);
                  throw new Error(error);
                }
              }
            },
            error: () => {
              alert('An Ajax error has occurred, please wait a while and try again');
            },
          }
        },
        plugins,
        // Settings for each node type.
        types: {
          [this.#options.nodeTypes.folder.type]: {
            icon: this.#options.nodeTypes.folder.icon,// Folder node icons.
            li_attr: {'data-node-type': this.#options.nodeTypes.folder.type},// Attribute set to the li element of the folder node.
          },
          [this.#options.nodeTypes.file.type]: {
            icon: this.#options.nodeTypes.file.icon,// File node icons.
            li_attr: {'data-node-type': this.#options.nodeTypes.file.type},// Attributes to be set on the li element of a file node.
          }
        },
        // Customize the state to be saved in the browser.
        state: {
          key: `Tree_${location.pathname.replace(/^\//, '').replace(/\//g, '_')}`,
        },
        // Customize the context menu. Learn more https://old.jstree.com/documentation/contextmenu.
        contextmenu: this.#options.readonly ? undefined : {
          items: (node: any) => {
            const depth = node.parents.length - 1;
            const menu: Record<string, any> = {};
            if (node.type === this.#options.nodeTypes.folder.type) {
              if (depth < this.#options.maxDepth)
                menu.createFolder = {
                  label: this.#options.language.createFolderMenu,
                  action: (data: any) => {
                    // Get parent folder node.
                    const parent = this.#getNode(data.reference);
                    this.#instance.create_node(parent, {text: this.#options.language.newFolderName, type: this.#options.nodeTypes.folder.type} , 'last', (newNode: any) => {
                      // try{
                        this.#instance.edit(newNode, newNode.text, async () => {
                          try {
                            // Get request URL.
                            let url = this.#getURLFromAjaxOption(this.#options.ajax.createFolder, newNode);

                            // Replaces the parent node ID in the URL.
                            url = url.replace(parentNodeIdSymbol, encodeURIComponent(newNode.parent));

                            // Folder creation request.
                            let {data: nodeData} = await axios<CreateFolderNodeResponse>({
                              method: 'POST',
                              url,
                              data: (() => {
                                // Execute if there is a callback set up that returns data to be sent to the server.
                                const data = {text: newNode.text};
                                if (isPlainObject(this.#options.ajax.createFolder) && (this.#options.ajax.createFolder as TreeAjaxOptions).data)
                                  (this.#options.ajax.createFolder as TreeAjaxOptions).data!(data, newNode);
                                return data;
                              })()
                            });

                            // If the response does not contain the ID of the created node, an error is returned.
                            if (!nodeData.id)
                              throw new Error('Folder node creation API should return the created node ID');

                            // Update the ID of the new folder.
                            this
                              .#setNodeID(newNode, nodeData.id)
                              .#selectNode(newNode);
                            Toast.success(this.#options.language.createFolderSuccessful!.replace('_FOLDER_', trim(newNode.text) as string));
                          } catch (error) {
                            await Dialog.unknownError(this.#options.language.unknownErrorMessage, {title: this.#options.language.unknownErrorTitle});
                            this.#errorHandler(error);
                            throw error;
                          }
                        });
                      // } catch (error) {
                      //   setTimeout(() => this.#instance.edit(newNode), 0);
                      // }
                    });
                  },
                };
              menu.createFile = {
                label: this.#options.language.createFileMenu,
                action: async (data: any) => {
                  // Get parent folder node.
                  const parent = this.#getNode(data.reference);
                  if (!this.#createFileHook) {
                    // Add a new node to the tree.
                    this.#instance.create_node(parent, {text: this.#options.language.newFileName, type: this.#options.nodeTypes.file.type} , 'last', (newNode: any) => {
                      // try{
                        // After entering the name of the new node, send a request to the server.
                        this.#instance.edit(newNode, newNode.text, async () => {
                          try {
                            // Get request URL.
                            let url = this.#getURLFromAjaxOption(this.#options.ajax.createFile, newNode);

                            // Replaces the parent node ID in the URL.
                            url = url.replace(parentNodeIdSymbol, encodeURIComponent(newNode.parent));

                            // File creation request.
                            let {data: nodeData} = await axios<CreateFileNodeResponse>({
                              method: 'POST',
                              url,
                              data: (() => {
                                // Execute if there is a callback set up that returns data to be sent to the server.
                                const data = {text: newNode.text};
                                if (isPlainObject(this.#options.ajax.createFile) && (this.#options.ajax.createFile as TreeAjaxOptions).data)
                                  (this.#options.ajax.createFile as TreeAjaxOptions).data!(data, newNode);
                                return data;
                              })()
                            });

                            // If the response does not contain the ID of the created node, an error is returned.
                            if (!nodeData.id)
                              throw new Error('File node creation API should return the created node ID');

                            // Set file node ID prefix.
                            this.#setFileNodeIDPrefix(nodeData);

                            // Update the original data of the node.
                            newNode.original.id = nodeData.id;
                            newNode.original.raw_id = nodeData.raw_id;

                            // Update the ID of the new folder.
                            this
                              .#setNodeID(newNode, nodeData.id)
                              .#selectNode(newNode);
                            Toast.success(this.#options.language.createFileSuccessful!.replace('_FILE_', trim(newNode.text) as string));
                          } catch (error) {
                            await Dialog.unknownError(this.#options.language.unknownErrorMessage, {title: this.#options.language.unknownErrorTitle});
                            this.#errorHandler(error);
                            throw error;
                          }
                        });
                      // } catch (error) {
                      //   setTimeout(() => this.#instance.edit(newNode), 0);
                      // }
                    });
                  } else {
                    // Call node creation hook.
                    const nodeData = await this.#createFileHook(parent);

                    // If the hook process cancels the creation of a node, nothing is done.
                    if (!nodeData)
                      return;

                    // Check that the new node returned by the hook has all the necessary items.
                    if (!nodeData.id || !nodeData.text)
                      throw new Error('Node data returned by the node creation hook set by the "onCreateFileHook" method should have "id" and "text"');

                    // Set file node ID prefix.
                    this.#setFileNodeIDPrefix(nodeData);

                    // Add a new node to the tree.
                    this.#instance.create_node(parent, {...nodeData, type: this.#options.nodeTypes.file.type}, 'last', (newNode: any) => {
                      // Update the ID of the new folder.
                      this
                        .#setNodeID(newNode, newNode.id)
                        .#selectNode(newNode);
                      Toast.success(this.#options.language.createFileSuccessful!.replace('_FILE_', trim(newNode.text) as string));
                    });
                  }
                }
              };
              if (depth > 0) {
                menu.deleteFolder = {
                  label: this.#options.language.deleteFolderMenu,
                  action: async (data: any) => {
                    try {
                      // Get the node to be deleted.
                      const currentNode = this.#getNode(data.reference);

                      // Confirmation before deletion.
                      if (!await Dialog.confirm(this.#options.language.deleteFolderConfirmation!.replace('_FOLDER_', currentNode.text), {confirmButtonText: this.#options.language.deleteFolderButton, cancelButtonText: this.#options.language.deleteFolderCancelButton}))
                        return;

                      // Get request URL.
                      let url = this.#getURLFromAjaxOption(this.#options.ajax.deleteFolder, currentNode);

                      // Replaces the current node ID in the URL.
                      url = url.replace(currentNodeIdSymbol, encodeURIComponent(currentNode.id));

                      // Folder node deletion request.
                      await axios({
                        method: 'DELETE',
                        url,
                        data: (() => {
                          // Execute if there is a callback set up that returns data to be sent to the server.
                          const data = {};
                          if (isPlainObject(this.#options.ajax.deleteFolder) && (this.#options.ajax.deleteFolder as TreeAjaxOptions).data)
                            (this.#options.ajax.deleteFolder as TreeAjaxOptions).data!(data, currentNode);
                          return data;
                        })()
                      });
                    
                      // Deletes the selected node and makes the parent node of the deleted node selected.
                      this
                        .#deleteNode(currentNode)
                        .#selectNode(this.getParentNode(currentNode));
                        // .#selectNode(this.#getRootNode());
                      Toast.success(this.#options.language.deleteFolderSuccessful!.replace('_FOLDER_', trim(currentNode.text) as string));
                    } catch (error) {
                      await Dialog.unknownError(this.#options.language.unknownErrorMessage, {title: this.#options.language.unknownErrorTitle});
                      this.#errorHandler(error);
                      throw error;
                    }
                  },
                };
                menu.renameFolder = {
                  label: this.#options.language.renameFolderManu,
                  action: async (data: any) => {
                    const currentNode = this.#getNode(data.reference);
                    const beforeText = trim(currentNode.text);
                    this.#instance.edit(currentNode, currentNode.text, async () => {
                      try {
                        // If there is no change in the name, nothing is done.
                        if (beforeText === trim(currentNode.text))
                          return void console.info('The name does not change, so no request is made');

                        // Get request URL.
                        let url = this.#getURLFromAjaxOption(this.#options.ajax.renameFolder, currentNode);

                        // Replaces the current node ID in the URL.
                        url = url.replace(currentNodeIdSymbol, encodeURIComponent(currentNode.id));

                        // Folder node rename request.
                        await axios({
                          method: 'PUT',
                          url,
                          data: (() => {
                            // Execute if there is a callback set up that returns data to be sent to the server.
                            const data = {text: currentNode.text};
                            if (isPlainObject(this.#options.ajax.renameFolder) && (this.#options.ajax.renameFolder as TreeAjaxOptions).data)
                              (this.#options.ajax.renameFolder as TreeAjaxOptions).data!(data, currentNode);
                            return data;
                          })()
                        });
                      } catch (error) {
                        await Dialog.unknownError(this.#options.language.unknownErrorMessage, {title: this.#options.language.unknownErrorTitle});
                        this.#errorHandler(error);
                        throw error;
                      }
                    });
                  },
                };
              }
            } else if (node.type === this.#options.nodeTypes.file.type) {
              menu.deleteFile = {
                label: this.#options.language.deleteFileMenu,
                action: async (data: any) => {
                  try {
                    // Get the node to be deleted.
                    const currentNode = this.#getNode(data.reference);

                    // Confirmation before deletion.
                    if (!await Dialog.confirm(this.#options.language.deleteFileConfirmation!.replace('_FILE_', currentNode.text), {confirmButtonText: this.#options.language.deleteFileButton, cancelButtonText: this.#options.language.deleteFileCancelButton}))
                      return;

                    // Get request URL.
                    let url = this.#getURLFromAjaxOption(this.#options.ajax.deleteFile, currentNode);

                    // Replaces the current node ID in the URL.
                    url = url.replace(currentNodeIdSymbol, encodeURIComponent(currentNode.id.replace(fileNodeIdPrefix, '')));

                    // File node deletion request.
                    await axios({
                      method: 'DELETE',
                      url,
                      data: (() => {
                        // Execute if there is a callback set up that returns data to be sent to the server.
                        const data = {};
                        if (isPlainObject(this.#options.ajax.deleteFile) && (this.#options.ajax.deleteFile as TreeAjaxOptions).data)
                          (this.#options.ajax.deleteFile as TreeAjaxOptions).data!(data, currentNode);
                        return data;
                      })()
                    });

                    // Deletes the selected node and makes the parent node of the deleted node selected.
                    this
                      .#deleteNode(currentNode)
                      .#selectNode(this.getParentNode(currentNode));
                    Toast.success(this.#options.language.deleteFileSuccessful!.replace('_FILE_', trim(currentNode.text) as string));
                  } catch (error) {
                    await Dialog.unknownError(this.#options.language.unknownErrorMessage, {title: this.#options.language.unknownErrorTitle});
                    this.#errorHandler(error);
                    throw error;
                  }
                },
              };
              menu.renameFile = {
                label: this.#options.language.renameFileManu,
                action: async (data: any) => {
                  const currentNode = this.#getNode(data.reference);
                  const beforeText = trim(currentNode.text);
                  this.#instance.edit(currentNode, currentNode.text, async () => {
                    try {
                      // If there is no change in the name, nothing is done.
                      if (beforeText === trim(currentNode.text))
                        return void console.info('The name does not change, so no request is made');

                      // Get request URL.
                      let url = this.#getURLFromAjaxOption(this.#options.ajax.renameFile, currentNode);

                      // Replaces the current node ID in the URL.
                      url = url.replace(currentNodeIdSymbol, encodeURIComponent(currentNode.id.replace(fileNodeIdPrefix, '')));

                      // File node rename request.
                      await axios({
                        method: 'PUT',
                        url,
                        data: (() => {
                          // Execute if there is a callback set up that returns data to be sent to the server.
                          const data = {text: currentNode.text};
                          if (isPlainObject(this.#options.ajax.renameFile) && (this.#options.ajax.renameFile as TreeAjaxOptions).data)
                            (this.#options.ajax.renameFile as TreeAjaxOptions).data!(data, currentNode);
                          return data;
                        })()
                      });
                    } catch (error) {
                      await Dialog.unknownError(this.#options.language.unknownErrorMessage, {title: this.#options.language.unknownErrorTitle});
                      this.#errorHandler(error);
                      throw error;
                    }
                  });
                },
              };
            }
            return menu;
          }
        }
      })
      .jstree(true);
  }

  /**
   * Refresh the tree.
   * @param {boolean} skipLoading An option to skip showing the loading indicator. Default is false.
   * @param {boolean} forgetState If set to true state will not be reapplied, if set to a function (receiving the current state as argument) the result of that function will be used as state. Default is false.
   * @return {Tree}
   */
  public refresh(skipLoading: boolean = false, forgetState: boolean = false): Tree {
    this.#instance.refresh(skipLoading, forgetState);
    return this;
  }

  /**
   * Refresh a node in the tree (reload child nodes).
   * @param {any} nodeObject The node.
   * @return {Tree}
   */
  public refreshNode(nodeObject: any): Tree {
    this.#instance.refresh_node(nodeObject);
    return this;
  }

  /**
   * Sets the callback function to be called when a node is selected. The callback function receives an event object and a node object.
   * @param {(event: any, node: any) => void} handler Callback function.
   * @return {Tree}
   */
  public onSelected(handler: (event: any, node: any) => void): Tree {
    this.#selectedHandler = handler;
    return this;
  }

  /**
   * Sets the callback function to be called on error. The callback function receives an error object.
   * @param {(error: any) => void} handler Callback function.
   * @return {Tree}
   */
  public onError(handler: (error: any) => void): Tree {
    this.#errorHandler = handler;
    return this;
  }

  /**
   * Sets the callback function that will be called when a child node of the selected node is retrieved from the server side.
   * The callback function receives the data retrieved from the server side and can modify or add data.
   * @param {(nodeData: any) => void} handler Callback function.
   * @return {Tree}
   */
  public onFetch(handler: (nodeData: any) => void): Tree {
    this.#fetchHandler = handler;
    return this;
  }

  /**
   * Sets the callback function that will be called when the tree initialization is complete. The callback function receives an event object.
   * @param {(event: any) => void} handler Callback function.
   * @return {Tree}
   */
  public onReady(handler: (event: any) => void): Tree {
    this.#readyhHandler = handler;
    return this;
  }

  /**
   * Sets the function that hooks the operation to create a new node.
   * If the hook is not set, the new node will be added to the tree immediately.
   * The hook function you set must return the ID and text of the newly created node. Also, return false, null, or undefined if you want to cancel the creation.
   * @param {(parent: any) => Promise<{id: string|number, text: string, [key: string]: any}|null|undefined|false>} hook Hook function.
   * @return {Tree}
   */
  public onCreateFileHook(hook: (parent: any) => Promise<{id: string|number, text: string, [key: string]: any}|null|undefined|false>): Tree {
    this.#createFileHook = hook;
    return this;
  }

  /**
   * Get an array of all selected nodes.
   * @param {boolean} full if set to true the returned array will consist of the full node objects, otherwise - only IDs will be returned.
   * @param {undefined|number} index Index of the node to be acquired. Default is none and all nodes are retrieved.
   * @return {any|null} Selected node.
   */
  public getSelectedNodes(full: boolean = true, index?: number): any|null {
    const nodes = this.#instance.get_selected(full);
    if (index == null)
      return nodes;
    return nodes[index] || null;
  }

  /**
   * Get the first node among the selected.
   * @param {boolean} full if set to true the returned array will consist of the full node objects, otherwise - only IDs will be returned.
   * @return {any|null} Selected node.
   */
  public getSelectedNode(full: boolean = true): any|null {
    return this.getSelectedNodes(full, 0);
  }

  /**
   * Get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array).
   * @example
   * ```js
   * tree.onSelected((event, node) => {
   *   // Get the path of the node.
   *   tree.getPath(node);// ['Root', 'Folder#1', 'Folder#1_1']
   *   tree.getPath(node, '/');// 'Root/Folder#1/Folder#1_1'
   *   tree.getPath(node, '/', true);// '1/2/3'
   * });
   * ```
   * @param {any} nodeObject The node.
   * @param {string|undefined} glue If you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned.
   * @param {boolean} ids If set to true build the path using ID, otherwise node text is used.
   * @return {string[]|string} Path of the node.
   */
  public getPath(nodeObject: any, glue: string|undefined = undefined, ids: boolean = false) {
    return this.#instance.get_path(nodeObject, glue, ids);
  }

  /**
   * Get parent node.
   * @param {any} nodeObject The node.
   * @return {any} Parent node.
   */
  public getParentNode(nodeObject: any): any {
    return this.#getNode(nodeObject.parent);
  }

  /**
   * Rename node.
   * @param {any} nodeObject The node, you can pass an array to rename multiple nodes to the same name.
   * @param {string} text The new text value.
   * @return {Tree}
   */
  public renameNode(nodeObject: any, text: string): Tree {
    this.#instance.rename_node(nodeObject, text);
    return this;
  }

  /**
   * Activate node selection.
   * @param {any} nodeObject An array can be used to select multiple nodes.
   * @param {boolean} supressEvent if set to true the `changed.jstree` event won't be triggered.
   * @param {boolean} preventOpen if set to true parents of the selected node won't be opened.
   * @return {Tree}
   */
  #selectNode(nodeObject: any, supressEvent: boolean = false, preventOpen: boolean = false): Tree {
    if (!multiple)
      this.#deselectAll(supressEvent)
    this.#instance.select_node(nodeObject, supressEvent, preventOpen);
    return this;
  }

  /**
   * Deactivate node selection..
   * @param {any} nodeObject An array can be used to deselect multiple nodes.
   * @param {boolean} supress_event if set to true the `changed.jstree` event won't be triggered.
   * @return {Tree}
   */
  #deselectNode(nodeObject: any, supressEvent: boolean = false): Tree {
    this.#instance.deselect_node(nodeObject, supressEvent);
    return this;
  }

  /**
   * Deactivate all node selections.
   * @param {boolean} supressEvent if set to true the `changed.jstree` event won't be triggered.
   * @return {Tree}
   */
  #deselectAll(supressEvent: boolean = false): Tree {
    this.#instance.deselect_all(supressEvent);
    return this;
  }

  /**
   * Get the JSON representation of a node (or the actual jQuery extended DOM node) by using any input (child DOM element, ID string, selector, etc).
   * @param {any} nodeObject An array can be used to deselect multiple nodes.
   * @param {boolean} asDom
   * @return {Object|jQuery}
   */
  #getNode(nodeObject: any, asDom: boolean = false) {
    return this.#instance.get_node(nodeObject, asDom);
  }

  /**
   * Set or change the node ID.
   * @param {any} nodeObject An array can be used to deselect multiple nodes.
   * @param {string} id New node ID.
   * @return {Tree}
   */
  #setNodeID(nodeObject: any, id: string): Tree {
    this.#instance.set_id(nodeObject, id);
    return this;
  }

  /**
   * Delete a node.
   * @param {any} nodeObject The node, you can pass an array to delete multiple nodes.
   * @return {Tree}
   */
  #deleteNode(nodeObject: any): Tree {
    const couldDelete = this.#instance.delete_node(nodeObject);
    if (!couldDelete)
      throw new Error(`Node could not be deleted (node id: ${nodeObject.id}, node name: ${nodeObject.text})`);
    return this;
  }

  /**
   * Get root node.
   * @return {any}
   */
  #getRootNode(): any {
    return this.#getNode(this.#instance.get_json()[0].id);
  }

  /**
   * Set file node ID prefix. The tree is not displayed correctly if the file ID overlaps with the folder ID. Prefix the file IDs to avoid duplication.
   * @param {{[key: string]: any}} nodeObject Node object.
   */
  #setFileNodeIDPrefix(nodeData: {[key: string]: any}): void {
    // Save raw ID of file node.
    nodeData.raw_id = nodeData.id;

    // Prefix file IDs to avoid duplication with folder IDs.
    nodeData.id = `${fileNodeIdPrefix}${nodeData.id}`;
  }

  /**
   * Get URL from ajax option.
   * @param {string|((node: any) => string)|TreeAjaxOptions} options Ajax options for the tree.
   * @param {any} node Node object.
   * @return {string} Request URL taken from the Ajax option.
   */
  #getURLFromAjaxOption(options: string|((node: any) => string)|TreeAjaxOptions, node: any): string {
    if (isString(options))
      return options as string;
    else if (isFunction(options))
      return (options as (node: any) => string)(node);
    else if (isPlainObject(options)) {
      if (isString((options as TreeAjaxOptions).url))
        return (options as TreeAjaxOptions).url as string;
      else 
        return ((options as TreeAjaxOptions).url as (node: any) => string)(node);
    } else 
      throw new TypeError('Ajax options should be string or function or object');
  }

  /**
   * Initialize options.
   * @param {TreeOptions} options Tree options received in the constructor.
   * @return {Required<TreeOptions>} Finalized options.
   */
  #initOptions(options?: TreeOptions): Required<TreeOptions> {
    return merge({
      readonly: false,
      maxDepth: 2,
      folderMaxlen: 20,
      fileMaxlen: 20,
      nodeTypes: {
        folder: {
          type: 'folder',
          icon: 'fa fa-folder text-warning',
        },
        file: {
          type: 'file',
          icon: 'fa fa-file text-white',
        },
      },
      language: {
        createFolderMenu: 'Create folder',
        createFolderSuccessful: '_FOLDER_ has been created.',// The "_FOLDER_" in the text is set to the name of the created folder.
        deleteFolderMenu: 'Delete folder',
        deleteFolderConfirmation: 'Are you sure you want to delete _FOLDER_?',// The "_FOLDER_" in the text is set to the name of the folder to be deleted.
        deleteFolderButton: 'Delete the folder',
        deleteFolderCancelButton: 'Cancel',
        deleteFolderSuccessful: '_FOLDER_ has been deleted.',// The "_FOLDER_" in the text is set to the name of the folder to be deleted.
        renameFolderManu: 'Rename folder',
        newFolderName: 'New Folder',
        createFileMenu: 'Create file',
        createFileSuccessful: '_FILE_ has been created.',// The "_FILE_" in the text is set to the name of the created file.
        deleteFileMenu: 'Delete file',
        deleteFileConfirmation: 'Are you sure you want to delete _FILE_?',// The "_FILE_" in the text is set to the name of the file to be deleted.
        deleteFileButton: 'Delete file',
        deleteFileCancelButton: 'Cancel',
        deleteFileSuccessful: '_FILE_ has been deleted.',// The "_FILE_" in the text is set to the name of the file to be deleted.
        renameFileManu: 'Rename file',
        newFileName: 'New File',
        unknownErrorTitle: 'An unexpected error has occurred.',
        unknownErrorMessage: 'The process was interrupted due to an error. Please try again.',
      },
    }, options);
  }
}