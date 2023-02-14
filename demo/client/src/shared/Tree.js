import fusion from 'deep-fusion';
import {Dialog, isString, trim, Toast, isFunction} from 'metronic-extension';

const FILE_ID_PREFIX = 'f_';
const NODE_FOLDER = 'folder';
const NODE_FILE = 'file';
const MULTIPLE = false;
const PARENT_FOLDER_VAR = '_PARENT_FOLDER_ID_';
const CURRENT_FOLDER_VAR = '_CURRENT_FOLDER_ID_';
const CURRENT_FILE_VAR = '_CURRENT_FILE_ID_';

/**
 * Tree API.
 */
class ApiClient {
  #otpions;

  /**
   * Initialization.
   */
  constructor(options) {
    this.#otpions = options;
  }

  /**
   * Create a folder.
   */
  async createFolder(newNode) {
    const {type, url, data} = this.#otpions.createFolder;
    return $.ajax({
      type,
      url: isString(url) ? url.replace(PARENT_FOLDER_VAR, encodeURIComponent(newNode.parent)) : url(newNode),
      data: data ? data(newNode) : {text: newNode.text}
    });
  }
  
  /**
   * Delete a folder.
   */
  async deleteFolder(deleteNode) {
    const {type, url, data} = this.#otpions.deleteFolder;
    return $.ajax({
      type,
      url: isString(url) ? url.replace(CURRENT_FOLDER_VAR, deleteNode.id) : url(deleteNode),
      data: data ? data(deleteNode) : undefined
    });
  }

  /**
   * Rename a folder.
   */
  async renameFolder(node) {
    const {type, url, data} = this.#otpions.renameFolder;
    return $.ajax({
      type,
      url: isString(url) ? url.replace(CURRENT_FOLDER_VAR, node.id) : url(node),
      data: data ? data(node) : {text: node.text}
    });

  }

  /**
   * Create file
   */
  async createFile(newNode) {
    const {type, url, data} = this.#otpions.createFile;
    return $.ajax({
      type,
      url: isString(url) ? url.replace(PARENT_FOLDER_VAR, encodeURIComponent(newNode.parent)) : url(newNode),
      data: data ? data(newNode) : {text: newNode.text}
    });
  }
  
  /**
   * Delete file
   */
  async deleteFile(deleteNode) {
    const {type, url, data} = this.#otpions.deleteFile;
    return $.ajax({
      type,
      url: isString(url) ? url.replace(CURRENT_FILE_VAR, deleteNode.id.replace(FILE_ID_PREFIX, '')) : url(deleteNode),
      data: data ? data(deleteNode) : undefined
    });
  }

  /**
   * Rename a file
   */
  async renameFile(node) {
    const {type, url, data} = this.#otpions.renameFile;
    return $.ajax({
      type,
      url: isString(url) ? url.replace(CURRENT_FILE_VAR, node.id.replace(FILE_ID_PREFIX, '')) : url(node),
      data: data ? data(node) : {text: node.text}
    });
  }
}

/**
 * Folder and file tree components.
 */
export default class Tree {
  #treeInstance;
  #api;
  #selectedHandler = (evnt, node) => {};
  #errorHandler = err => {};

  /**
   * Initialization.
   */
  constructor(context, options) {
  // constructor(context: HTMLDivElement|JQueryoptions, options) {
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
        case NODE_FOLDER:
          if (options.folderMaxlen)
            input.setAttribute('maxlength', options.folderMaxlen);
          break;
        case NODE_FILE:
          if (options.fileMaxlen)
            input.setAttribute('maxlength', options.fileMaxlen);
          break;
        }
      })
      .on('state_ready.jstree refresh.jstree', evnt => {
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
      .on('select_node.jstree', (evnt, data) => {
        if (this.#selectedHandler)
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
            url: node => isString(options.api.getChildren.url) ?
                          options.api.getChildren.url.replace(PARENT_FOLDER_VAR, encodeURIComponent(node.id)) :
                          options.api.getChildren.url(node),
            data: options.api.getChildren.data,
            success: data => {
              for (let item of data) {
                switch (item.type) {
                case NODE_FOLDER:
                  // The children property, which determines whether there are children, must be of type bool, so a string or numeric 1 or 0 is converted to a bool type.
                  if (typeof item?.children !== 'boolean')
                    item.children = item.children == 1 || item?.children.toString().toLowerCase() === 'true';
                  break;
                case NODE_FILE:
                  // The "children" property is not needed for file nodes, so it is removed.
                  delete item.children;

                  // File IDs are not displayed correctly in jstree if they overlap with folder IDs.
                  // Prefix file IDs with folder IDs to avoid duplication.
                  item.id = `${FILE_ID_PREFIX}${item.id}`;
                  break;
                default:
                  alert('Incorrect node type. Use "folder" or "file" for the node type.');
                  throw new Error('Incorrect node type. Use "folder" or "file" for the node type.');
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
          [NODE_FOLDER]: {
            icon: 'fa fa-folder text-warning',
            li_attr: {'data-node-type': NODE_FOLDER},
          },
          [NODE_FILE]: {
            icon: 'fa fa-file text-white',
            // icon: 'fa fa-file text-warning',
            li_attr: {'data-node-type': NODE_FILE},
          }
        },
        // Customize the state to be saved in the browser.
        state: {
          key: `Tree_${location.pathname.replace(/^\//, '').replace(/\//g, '_')}`,
        },
        // Customize the context menu. Learn more https://old.jstree.com/documentation/contextmenu.
        contextmenu: {
          items: node => {
            const depth = node.parents.length - 1;
            const menu = {};
            if (node.type === NODE_FOLDER) {
              if (depth < options.maxDepth)
                menu.createFolder = {
                  label: options.language.createFolderMenu,
                  action: data => {
                    const parent = this.#getNode(data.reference);
                    this.#treeInstance.create_node(parent, {text: options.language.newFolderName, 'type': NODE_FOLDER} , 'last', newNode => {
                      // try{
                        this.#treeInstance.edit(newNode, newNode.text, async () => {
                          try {
                            // Folder creation request.
                            const res = await this.#api.createFolder(newNode);

                            // Update the ID of the new folder.
                            this
                              .#selectNode(newNode)
                              .#setNodeId(newNode, res.id);
                            Toast.success(options.language.createFolderSuccessful.replace('_FOLDER_', trim(newNode.text)));
                          } catch (err) {
                            await Dialog.unknownError(options.language.unknownErrorMessage, {title: options.language.unknownErrorTitle});
                            if (this.#errorHandler)
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
                label: options.language.createFileMenu,
                action: data => {
                  const parent = this.#getNode(data.reference);
                  this.#treeInstance.create_node(parent, {text: options.language.newFileName, 'type': NODE_FILE} , 'last', newNode => {
                    // try{
                      this.#treeInstance.edit(newNode, newNode.text, async () => {
                        try {
                          // File creation request.
                          const res = await this.#api.createFile(newNode);

                          // Update the ID of the new folder.
                          this
                            .#selectNode(newNode)
                            .#setNodeId(newNode, res.id);
                          Toast.success(options.language.createFileSuccessful.replace('_FILE_', trim(newNode.text)));
                        } catch (err) {
                          await Dialog.unknownError(options.language.unknownErrorMessage, {title: options.language.unknownErrorTitle});
                          if (this.#errorHandler)
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
                  label: options.language.deleteFolderMenu,
                  action: async data => {
                    try {
                      const deleteNode = this.#getNode(data.reference);
                      if (!await Dialog.confirm(options.language.deleteFolderConfirmation.replace('_FOLDER_', deleteNode.text), {
                          confirmButtonText: options.language.deleteFolderButton,
                          cancelButtonText: options.language.deleteFolderCancelButton}))
                        return;
                      await this.#api.deleteFolder(deleteNode);
                      this
                        .#deleteNode(deleteNode)
                        .#selectNode(this.#getParentNode(deleteNode));
                        // .#selectNode(this.#getRootNode());
                      Toast.success(options.language.deleteFolderSuccessful.replace('_FOLDER_', trim(deleteNode.text)));
                    } catch (err) {
                      await Dialog.unknownError(options.language.unknownErrorMessage, {title: options.language.unknownErrorTitle});
                      if (this.#errorHandler)
                        this.#errorHandler(err);
                      throw err;
                    }
                  },
                };
                menu.renameFolder = {
                  label: options.language.renameFolderManu,
                  action: async data => {
                    const node = this.#getNode(data.reference);
                    const beforeText = trim(node.text);
                    this.#treeInstance.edit(node, node.text, async () => {
                      try {
                        // If there is no change in the name, nothing is done.
                        if (beforeText === trim(node.text))
                          return void console.info('The name does not change, so no request is made');
                        await this.#api.renameFolder(node);
                      } catch (err) {
                        await Dialog.unknownError(options.language.unknownErrorMessage, {title: options.language.unknownErrorTitle});
                        if (this.#errorHandler)
                          this.#errorHandler(err);
                        throw err;
                      }
                    });
                  },
                };
              }
            } else if (node.type === NODE_FILE) {
              menu.deleteFile = {
                label: options.language.deleteFileMenu,
                action: async data => {
                  try {
                    const deleteNode = this.#getNode(data.reference);
                    if (!await Dialog.confirm(options.language.deleteFileConfirmation.replace('_FILE_', deleteNode.text), {
                        confirmButtonText: options.language.deleteFileButton,
                        cancelButtonText: options.language.deleteFileCancelButton}))
                      return;
                    await this.#api.deleteFile(deleteNode);
                    this
                      .#deleteNode(deleteNode)
                      .#selectNode(this.#getParentNode(deleteNode));
                    Toast.success(options.language.deleteFileSuccessful.replace('_FILE_', trim(deleteNode.text)));
                  } catch (err) {
                    await Dialog.unknownError(options.language.unknownErrorMessage, {title: options.language.unknownErrorTitle});
                    if (this.#errorHandler)
                      this.#errorHandler(err);
                    throw err;
                  }
                },
              };
              menu.renameFile = {
                label: options.language.renameFileManu,
                action: async data => {
                  const node = this.#getNode(data.reference);
                  const beforeText = trim(node.text);
                  this.#treeInstance.edit(node, node.text, async () => {
                    try {
                      // If there is no change in the name, nothing is done.
                      if (beforeText === trim(node.text))
                        return void console.info('The name does not change, so no request is made');
                      await this.#api.renameFile(node);
                    } catch (err) {
                      await Dialog.unknownError(options.language.unknownErrorMessage, {title: options.language.unknownErrorTitle});
                      if (this.#errorHandler)
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
   * @param {(evnt: MessageEvent,node: any) => void} handler Handle function.
   * @return {Tree}
   */
  onSelected(handler) {
    this.#selectedHandler = handler;
    return this;
  }

  /**
   * Set error event handler.
   *
   * @param {(err: Error) => void} handler Handle function.
   * @return {Tree}
   */
  onError(handler) {
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
  #selectNode(obj, supressEvent = false, preventOpen = false) {
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
  #deselectNode(obj, supressEvent = false) {
    this.#treeInstance.deselect_node(obj, supressEvent);
    return this;
  }

  /**
    * Deselect all selected nodes.
    *
    * @param {boolean} supressEvent if set to `true` the `changed.jstree` event won't be triggered.
    * @return {Tree}
    */
  #deselectAll(supressEvent = false) {
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
  #refresh(skipLoading = false, forgetState = false) {
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
  #getNode(obj, asDom = false) {
    return this.#treeInstance.get_node(obj, asDom);
  }

  /**
   * Set (change) the ID of a node.
   *
   * @param {any} obj An array can be used to deselect multiple nodes.
   * @param {string} id New node ID.
   */
  #setNodeId(obj, id) {
    this.#treeInstance.set_id(obj, id);
  }

  /**
    * Get an array of all selected nodes.
    *
    * @param {boolean} full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned.
    * @param {undefined|number} position 
    * @return {any}
    */
  #getSelectedNodes(full = true, position = undefined) {
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
  #deleteNode(obj) {
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
  #getRootNode() {
    return this.#getNode(this.#treeInstance.get_json()[0].id);
  }

  /**
   * Get parent node.
   *
   * @return {any}
   */
  #getParentNode(obj) {
    return this.#getNode(obj.parent);
  }

  /**
   * Initialize options.
   */
  #initOptions(options) {
    for (let key of ['getChildren', 'createFolder', 'deleteFolder', 'renameFolder', 'createFile', 'deleteFile', 'renameFile'])
      if (isString(options.api[key]))
        options.api[key] = {url: options.api[key]};
    return fusion({
      /**
       * Defines maximum depth of the tree. The default is 2 (up to child and grandchild folders).
       * @type {number}
       */
      maxDepth: 2,

      /**
       * Maximum length of folder name. Default is 20.
       * @type {number}
       */
      folderMaxlen: 20,

      /**
       * Maximum length of file name. Default is 20.
       * @type {number}
       */
      fileMaxlen: 20,

      // /**
      //  * If true, children of the folder will be cached and not retrieved from the server.
      //  * If you want the folder to always be fetched from the server when opened, set to false.
      //  * Default is true.
      //  * @type {boolean}
      //  */
      // cacheLoadedChildren: true,

      /**
       * Define folder and file creation, deletion, and rename requests.
       * @type {object}
       */
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
      /**
       * Text used in the tree.
       */
      language: {
        // Folder-related text.
        createFolderMenu: 'Create folder',
        createFolderSuccessful: '_FOLDER_ has been created.',// The "_FOLDER_" in the text is set to the name of the created folder.
        deleteFolderMenu: 'Delete folder',
        deleteFolderConfirmation: 'Are you sure you want to delete _FOLDER_?',// The "_FOLDER_" in the text is set to the name of the folder to be deleted.
        deleteFolderButton: 'Delete the folder',
        deleteFolderCancelButton: 'Cancel',
        deleteFolderSuccessful: '_FOLDER_ has been deleted.',// The "_FOLDER_" in the text is set to the name of the folder to be deleted.
        renameFolderManu: 'Rename folder',
        newFolderName: 'New Folder',

        // File-related text.
        createFileMenu: 'Create file',
        createFileSuccessful: '_FILE_ has been created.',// The "_FILE_" in the text is set to the name of the created file.
        deleteFileMenu: 'Delete file',
        deleteFileConfirmation: 'Are you sure you want to delete _FILE_?',// The "_FILE_" in the text is set to the name of the file to be deleted.
        deleteFileButton: 'Delete file',
        deleteFileCancelButton: 'Cancel',
        deleteFileSuccessful: '_FILE_ has been deleted.',// The "_FILE_" in the text is set to the name of the file to be deleted.
        renameFileManu: 'Rename file',
        newFileName: 'New File',

        // Error message.
        unknownErrorTitle: 'An unexpected error has occurred.',
        unknownErrorMessage: 'The process was interrupted due to an error. Please try again.',
      }
    }, options);
  }
}