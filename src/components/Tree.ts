import fusion from 'deep-fusion';
import Dialog from '~/components/Dialog';
import Toast from '~/components/Toast';
import isString from '~/misc/isString';
import isFunction from '~/misc/isFunction';
import trim from '~/misc/trim';
import TreeOption from '~/interfaces/TreeOption';
import TreeApiOption from '~/interfaces/TreeApiOption';

const FILE_NODE_ID_PREFIX = 'f_';
const MULTIPLE = false;
const PARENT_FOLDER_VAR = '_PARENT_FOLDER_ID_';
const CURRENT_FOLDER_VAR = '_CURRENT_FOLDER_ID_';
const CURRENT_FILE_VAR = '_CURRENT_FILE_ID_';

/**
 * Tree API.
 */
class ApiClient {
  #otpions: Record<string, TreeApiOption>;

  /**
   * Initialization.
   */
  constructor(options: Record<string, TreeApiOption>) {
    this.#otpions = options;
  }

  /**
   * Create a folder.
   */
  async createFolder(newNode: any) {
    const {type, url, data} = this.#otpions.createFolder;
    return $.ajax({
      type,
      url: isString(url) ? (url as string).replace(PARENT_FOLDER_VAR, encodeURIComponent(newNode.parent)) : (url as (node: any) => string)(newNode),
      data: data ? data(newNode) : {text: newNode.text}
    });
  }
  
  /**
   * Delete a folder.
   */
  async deleteFolder(deleteNode: any) {
    const {type, url, data} = this.#otpions.deleteFolder;
    return $.ajax({
      type,
      url: isString(url) ? (url as string).replace(CURRENT_FOLDER_VAR, deleteNode.id) : (url as (node: any) => string)(deleteNode),
      data: data ? data(deleteNode) : undefined
    });
  }

  /**
   * Rename a folder.
   */
  async renameFolder(node: any) {
    const {type, url, data} = this.#otpions.renameFolder;
    return $.ajax({
      type,
      url: isString(url) ? (url as string).replace(CURRENT_FOLDER_VAR, node.id) : (url as (node: any) => string)(node),
      data: data ? data(node) : {text: node.text}
    });

  }

  /**
   * Create file
   */
  async createFile(newNode: any) {
    const {type, url, data} = this.#otpions.createFile;
    return $.ajax({
      type,
      url: isString(url) ? (url as string).replace(PARENT_FOLDER_VAR, encodeURIComponent(newNode.parent)) : (url as (node: any) => string)(newNode),
      data: data ? data(newNode) : {text: newNode.text}
    });
  }
  
  /**
   * Delete file
   */
  async deleteFile(deleteNode: any) {
    const {type, url, data} = this.#otpions.deleteFile;
    return $.ajax({
      type,
      url: isString(url) ? (url as string).replace(CURRENT_FILE_VAR, deleteNode.id.replace(FILE_NODE_ID_PREFIX, '')) : (url as (node: any) => string)(deleteNode),
      data: data ? data(deleteNode) : undefined
    });
  }

  /**
   * Rename a file
   */
  async renameFile(node: any) {
    const {type, url, data} = this.#otpions.renameFile;
    return $.ajax({
      type,
      url: isString(url) ? (url as string).replace(CURRENT_FILE_VAR, node.id.replace(FILE_NODE_ID_PREFIX, '')) : (url as (node: any) => string)(node),
      data: data ? data(node) : {text: node.text}
    });
  }
}

/**
 * Folder and file tree components.
 */
export default class Tree {
  #treeInstance: any;
  #api: ApiClient;
  #selectedHandler = (evnt: any, node: any) => {};
  #errorHandler = (err: any) => {};

  /**
   * Initialization.
   */
  constructor(context: HTMLDivElement|JQuery, options?: TreeOption) {
    // Check the argument.
    if (context instanceof HTMLDivElement)
      context = $(context);
    else if (!(context instanceof $))
      throw new TypeError('The context parameter specifies an HTMLDivElement or a JQuery object of HTMLDivElement');

    // Initialize options.
    options = this.#initOptions(options);

    // Check options.
    for (let key of ['getChildren', 'createFolder', 'deleteFolder', 'renameFolder', 'createFile', 'deleteFile', 'renameFile'])
      if (!isString(options.api[key].url) && !isFunction(options.api[key].url))
        throw new TypeError(`"api.${key}.url" option must be a string or function`);
      else if (options.api.getChildren.data && !isFunction(options.api[key].data))
        throw new TypeError(`"api.${key}.data" option must be a function`);

    // Initialize API client.
    this.#api = new ApiClient(options.api);

    // Initialize the tree.
    this.#treeInstance = context
      .on('focus', '.jstree-rename-input', evnt => {
        // Set the maximum input length once the folder or file name input field is focused.
        const input = evnt.currentTarget;
        const li = input.closest('li[data-node-type]');
        switch (li.dataset.nodeType) {
        case options!.nodeTypes.folder.type:
          if (options!.folderMaxlen)
            input.setAttribute('maxlength', options!.folderMaxlen);
          break;
        case options!.nodeTypes.file.type:
          if (options!.fileMaxlen)
            input.setAttribute('maxlength', options!.fileMaxlen);
          break;
        }
      })
      .on('state_ready.jstree refresh.jstree', () => {
        // // Set the ready flag.
        // this.#ready = true;

        // If there is no first selected node, the root node is made selected.
        if (!this.#getSelectedNodes(true, 0))
          this.#selectNode(this.#getRootNode());
      })
      // .on('after_close.jstree', (evnt, data) => {
      //   if (!options.cacheLoadedChildren) {
      //     // Flag it to be reloaded on reopen.
      //     // FIXME: If the parent folder of a selected folder is closed and opened, the selection is removed.
      //     data.node.state.loaded = false;
      //   }
      // })
      .on('select_node.jstree', (evnt: any, data: any) => {
        this.#selectedHandler(evnt, data.node);
      })
      .jstree({
        core: {
          themes: {
            // A boolean specifying if a reponsive version of the theme should kick in on smaller screens (if the theme supports it).
            // Defaults to `false`.
            responsive: false
          },

          // Determines what happens when a user tries to modify the structure of the tree
          // If left as `false` all operations like create, rename, delete, move or copy are prevented.
          // You can set this to `true` to allow all interactions or use a function to have better control.
          check_callback: true,

          // A boolean indicating if multiple nodes can be selected.
          multiple: MULTIPLE,

          // Data configuration.
          data: {
            type: options.api.getChildren.type,
            url: (node: any) => {
              if (isString(options!.api.getChildren.url))
                return (options!.api.getChildren.url as string)
                  .replace(PARENT_FOLDER_VAR, encodeURIComponent(node.id));
              else
                return (options!.api.getChildren.url as (node: any) => string)(node);
            },
            data: options.api.getChildren.data,
            success: (data: any) => {
              for (let item of data) {
                switch (item.type) {
                case options!.nodeTypes.folder.type:
                  // The children property, which determines whether there are children, must be of type bool, so a string or numeric 1 or 0 is converted to a bool type.
                  if (typeof item?.children !== 'boolean')
                    item.children = item.children == 1 || item?.children.toString().toLowerCase() === 'true';
                  break;
                case options!.nodeTypes.file.type:
                  // The "children" property is not needed for file nodes, so it is removed.
                  delete item.children;

                  // File IDs are not displayed correctly in jstree if they overlap with folder IDs.
                  // Prefix file IDs with folder IDs to avoid duplication.
                  item.id = `${FILE_NODE_ID_PREFIX}${item.id}`;
                  break;
                default:
                  alert(`Incorrect node type. Use "${options!.nodeTypes.folder.type}" or "${options!.nodeTypes.file.type}" for the node type.`);
                  throw new Error(`Incorrect node type. Use "${options!.nodeTypes.folder.type}" or "${options!.nodeTypes.file.type}" for the node type.`);
                }
              }
            },
            error: () => {
              alert('Server Error. Please try again later.');
            },
          }
        },
        plugins: [
          'contextmenu',
          // 'dnd',
          'state',
          'types',
          'sort',
        ],
        // Settings for each node type.
        types: {
          [options!.nodeTypes.folder.type]: {
            icon: options!.nodeTypes.folder.icon,// Folder node icons.
            li_attr: {'data-node-type': options!.nodeTypes.folder.type},// Attribute set to the li element of the folder node.
          },
          [options!.nodeTypes.file.type]: {
            icon: options!.nodeTypes.file.icon,// File node icons.
            li_attr: {'data-node-type': options!.nodeTypes.file.type},// Attributes to be set on the li element of a file node.
          }
        },
        // Customize the state to be saved in the browser.
        state: {
          key: `Tree_${location.pathname.replace(/^\//, '').replace(/\//g, '_')}`,
        },
        // Customize the context menu. Learn more https://old.jstree.com/documentation/contextmenu.
        contextmenu: {
          items: (node: any) => {
            const depth = node.parents.length - 1;
            const menu: Record<string, any> = {};
            if (node.type === options!.nodeTypes.folder.type) {
              if (depth < options!.maxDepth)
                menu.createFolder = {
                  label: options!.language.createFolderMenu,
                  action: (data: any) => {
                    const parent = this.#getNode(data.reference);
                    this.#treeInstance.create_node(parent, {text: options!.language.newFolderName, 'type': options!.nodeTypes.folder.type} , 'last', (newNode: any) => {
                      // try{
                        this.#treeInstance.edit(newNode, newNode.text, async () => {
                          try {
                            // Folder creation request.
                            const res = await this.#api.createFolder(newNode);

                            // Update the ID of the new folder.
                            this
                              .#selectNode(newNode)
                              .#setNodeId(newNode, res.id);
                            Toast.success(options!.language.createFolderSuccessful.replace('_FOLDER_', trim(newNode.text) as string));
                          } catch (err) {
                            await Dialog.unknownError(options!.language.unknownErrorMessage, {title: options!.language.unknownErrorTitle});
                            this.#errorHandler(err);
                            throw err;
                          }
                        });
                      // } catch (err) {
                      //   setTimeout(() => this.#treeInstance.edit(newNode), 0);
                      // }
                    });
                  },
                };
              menu.createFile = {
                label: options!.language.createFileMenu,
                action: (data: any) => {
                  const parent = this.#getNode(data.reference);
                  this.#treeInstance.create_node(parent, {text: options!.language.newFileName, 'type': options!.nodeTypes.file.type} , 'last', (newNode: any) => {
                    // try{
                      this.#treeInstance.edit(newNode, newNode.text, async () => {
                        try {
                          // File creation request.
                          const res = await this.#api.createFile(newNode);

                          // Update the ID of the new folder.
                          this
                            .#selectNode(newNode)
                            .#setNodeId(newNode, res.id);
                          Toast.success(options!.language.createFileSuccessful.replace('_FILE_', trim(newNode.text) as string));
                        } catch (err) {
                          await Dialog.unknownError(options!.language.unknownErrorMessage, {title: options!.language.unknownErrorTitle});
                          this.#errorHandler(err);
                          throw err;
                        }
                      });
                    // } catch (err) {
                    //   setTimeout(() => this.#treeInstance.edit(newNode), 0);
                    // }
                  });
                }
              };
              if (depth > 0) {
                menu.deleteFolder = {
                  label: options!.language.deleteFolderMenu,
                  action: async (data: any) => {
                    try {
                      const deleteNode = this.#getNode(data.reference);
                      if (!await Dialog.confirm(options!.language.deleteFolderConfirmation.replace('_FOLDER_', deleteNode.text), {
                          confirmButtonText: options!.language.deleteFolderButton,
                          cancelButtonText: options!.language.deleteFolderCancelButton}))
                        return;
                      await this.#api.deleteFolder(deleteNode);
                      this
                        .#deleteNode(deleteNode)
                        .#selectNode(this.getParentNode(deleteNode));
                        // .#selectNode(this.#getRootNode());
                      Toast.success(options!.language.deleteFolderSuccessful.replace('_FOLDER_', trim(deleteNode.text) as string));
                    } catch (err) {
                      await Dialog.unknownError(options!.language.unknownErrorMessage, {title: options!.language.unknownErrorTitle});
                      this.#errorHandler(err);
                      throw err;
                    }
                  },
                };
                menu.renameFolder = {
                  label: options!.language.renameFolderManu,
                  action: async (data: any) => {
                    const node = this.#getNode(data.reference);
                    const beforeText = trim(node.text);
                    this.#treeInstance.edit(node, node.text, async () => {
                      try {
                        // If there is no change in the name, nothing is done.
                        if (beforeText === trim(node.text))
                          return void console.info('The name does not change, so no request is made');
                        await this.#api.renameFolder(node);
                      } catch (err) {
                        await Dialog.unknownError(options!.language.unknownErrorMessage, {title: options!.language.unknownErrorTitle});
                        this.#errorHandler(err);
                        throw err;
                      }
                    });
                  },
                };
              }
            } else if (node.type === options!.nodeTypes.file.type) {
              menu.deleteFile = {
                label: options!.language.deleteFileMenu,
                action: async (data: any) => {
                  try {
                    const deleteNode = this.#getNode(data.reference);
                    if (!await Dialog.confirm(options!.language.deleteFileConfirmation.replace('_FILE_', deleteNode.text), {
                        confirmButtonText: options!.language.deleteFileButton,
                        cancelButtonText: options!.language.deleteFileCancelButton}))
                      return;
                    await this.#api.deleteFile(deleteNode);
                    this
                      .#deleteNode(deleteNode)
                      .#selectNode(this.getParentNode(deleteNode));
                    Toast.success(options!.language.deleteFileSuccessful.replace('_FILE_', trim(deleteNode.text) as string));
                  } catch (err) {
                    await Dialog.unknownError(options!.language.unknownErrorMessage, {title: options!.language.unknownErrorTitle});
                    this.#errorHandler(err);
                    throw err;
                  }
                },
              };
              menu.renameFile = {
                label: options!.language.renameFileManu,
                action: async (data: any) => {
                  const node = this.#getNode(data.reference);
                  const beforeText = trim(node.text);
                  this.#treeInstance.edit(node, node.text, async () => {
                    try {
                      // If there is no change in the name, nothing is done.
                      if (beforeText === trim(node.text))
                        return void console.info('The name does not change, so no request is made');
                      await this.#api.renameFile(node);
                    } catch (err) {
                      await Dialog.unknownError(options!.language.unknownErrorMessage, {title: options!.language.unknownErrorTitle});
                      this.#errorHandler(err);
                      throw err;
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
   * Set node selection event handler.
   *
   * @param {(evnt: any, node: any) => void} handler Handle function.
   * @return {Tree}
   */
  onSelected(handler: (evnt: any, node: any) => void): Tree {
    this.#selectedHandler = handler;
    return this;
  }

  /**
   * Set error event handler.
   *
   * @param {(err: any) => void} handler Handle function.
   * @return {Tree}
   */
  onError(handler: (err: any) => void): Tree {
    this.#errorHandler = handler;
    return this;
  }

  /**
   * Select a node.
   *
   * @param {any} obj An array can be used to select multiple nodes.
   * @param {boolean} supressEvent if set to `true` the `changed.jstree` event won't be triggered.
   * @param {boolean} preventOpen if set to `true` parents of the selected node won't be opened.
   * @return {Tree}
   */
  #selectNode(obj: any, supressEvent: boolean = false, preventOpen: boolean = false): Tree {
    if (!MULTIPLE)
      this.#deselectAll(supressEvent)
    this.#treeInstance.select_node(obj, supressEvent, preventOpen);
    return this;
  }

  /**
    * Deselect a node.
    *
    * @param {any} obj An array can be used to deselect multiple nodes.
    * @param {boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered.
    * @return {Tree}
    */
  #deselectNode(obj: any, supressEvent: boolean = false): Tree {
    this.#treeInstance.deselect_node(obj, supressEvent);
    return this;
  }

  /**
    * Deselect all selected nodes.
    *
    * @param {boolean} supressEvent if set to `true` the `changed.jstree` event won't be triggered.
    * @return {Tree}
    */
  #deselectAll(supressEvent: boolean = false): Tree {
    this.#treeInstance.deselect_all(supressEvent);
    return this;
  }

  /**
   * Refreshes the tree - all nodes are reloaded with calls to `load_node`.
   *
   * @param {boolean} skipLoading An option to skip showing the loading indicator.
   * @param {boolean} forgetState If set to `true` state will not be reapplied.
   * @return {Tree}
   */
  #refresh(skipLoading: boolean = false, forgetState: boolean = false): Tree {
    this.#treeInstance.refresh(skipLoading, forgetState);
    return this;
  }

  /**
    * Get the JSON representation of a node (or the actual jQuery extended DOM node) by using any input (child DOM element, ID string, selector, etc).
    *
    * @param {any} obj An array can be used to deselect multiple nodes.
    * @param {boolean} asDom
    * @return {Object|jQuery}
    */
  #getNode(obj: any, asDom: boolean = false) {
    return this.#treeInstance.get_node(obj, asDom);
  }

  /**
   * Set (change) the ID of a node.
   *
   * @param {any} obj An array can be used to deselect multiple nodes.
   * @param {string} id New node ID.
   * @return {Tree}
   */
  #setNodeId(obj: any, id: string): Tree {
    this.#treeInstance.set_id(obj, id);
    return this;
  }

  /**
    * Get an array of all selected nodes.
    *
    * @param {boolean} full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned.
    * @param {undefined|number} position 
    * @return {any}
    */
  #getSelectedNodes(full: boolean = true, position?: number) {
    const nodes = this.#treeInstance.get_selected(full);
    if (position == null)
      return nodes;
    return nodes[position] || null;
  }

  /**
    * Delete a node.
    *
    * @param  {any} obj The node, you can pass an array to delete multiple nodes.
    * @return {boolean}
    */
  #deleteNode(obj: any): Tree {
    const couldDelete = this.#treeInstance.delete_node(obj);
    if (!couldDelete)
      throw new Error(`Deletion of ${obj.text} (#${obj.id}) failed`);
    return this;
  }

  /**
   * Get root node.
   *
   * @return {any}
   */
  #getRootNode(): any {
    return this.#getNode(this.#treeInstance.get_json()[0].id);
  }

  /**
   * Get parent node.
   *
   * @param  {any} obj The node, you can pass an array to delete multiple nodes.
   * @return {any}
   */
  getParentNode(obj: any): any {
    return this.#getNode(obj.parent);
  }

  /**
   * Get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array).
   *
   * @example
   * import {Tree} from 'metronic-extension';
   * 
   * const tree = new Tree(document.getElementById('tree'));
   * tree.onSelected((evnt, node) => {
   *   tree.getPath(node);            // ['Root node', 'Folder#1', 'Folder#1_1']
   *   tree.getPath(node, '/');       // 'Root node/Folder#1/Folder#1_1'
   *   tree.getPath(node, '/', true); // '1/2/3'
   * });
   *
   * @param  {any} obj The node.
   * @param  {string|undefined} glue If you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned.
   * @param  {boolean} ids If set to true build the path using ID, otherwise node text is used.
   * @return {string[]|string}
   */
  getPath(obj: any, glue: string|undefined = undefined, ids: boolean = false) {
    return this.#treeInstance.get_path(obj, glue, ids);
  }

  /**
   * Initialize options.
   */
  #initOptions(options?: TreeOption): Required<TreeOption> {
    for (let key of ['getChildren', 'createFolder', 'deleteFolder', 'renameFolder', 'createFile', 'deleteFile', 'renameFile'])
      if (options && options.api && isString(options.api[key]))
        options.api[key] = {url: options.api[key].toString()};
    return fusion({
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
          // icon: 'fa fa-file text-warning',
        },
      },
      // cacheLoadedChildren: true,
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
      api: {
        /**
         * Get Child Items API.
         */
        getChildren: {
          type: 'GET',
          // The PARENT_FOLDER_VAR in the string type URL is replaced by the ID of the currently selected folder.
          url: `/folders/${PARENT_FOLDER_VAR}/children`,
          data: undefined,
        },
        /**
         * Folder creation API.
         */
        createFolder: {
          type: 'POST',
          // The PARENT_FOLDER_VAR in the string type URL is replaced by the ID of the currently selected folder.
          url: `/folders/${PARENT_FOLDER_VAR}`,
          data: undefined,
        },
        /**
         * Folder deletion API.
         */
        deleteFolder: {
          type: 'DELETE',
          // The CURRENT_FOLDER_VAR in the string type URL is replaced by the ID of the currently selected folder.
          url: `/folders/${CURRENT_FOLDER_VAR}`,
          data: undefined,
        },
        /**
         * Folder Rename API.
         */
        renameFolder: {
          type: 'PUT',
          // The CURRENT_FOLDER_VAR in the string type URL is replaced by the ID of the currently selected folder.
          url: `/folders/${CURRENT_FOLDER_VAR}`,
          data: undefined,
        },
        /**
         * File creation API.
         */
        createFile: {
          type: 'POST',
          // The PARENT_FOLDER_VAR in the string type URL is replaced by the ID of the currently selected folder.
          url: `/files/${PARENT_FOLDER_VAR}`,
          data: undefined,
        },
        /**
         * File deletion API.
         */
        deleteFile: {
          type: 'DELETE',
          // The CURRENT_FILE_VAR in the string type URL is replaced by the ID of the currently selected file.
          url: `/files/${CURRENT_FILE_VAR}`,
          data: undefined,
        },
        /**
         * File Rename API.
         */
        renameFile: {
          type: 'PUT',
          // The CURRENT_FILE_VAR in the string type URL is replaced by the ID of the currently selected file.
          url: `/files/${CURRENT_FILE_VAR}`,
          data: undefined,
        },
      },
    }, options);
  }
}