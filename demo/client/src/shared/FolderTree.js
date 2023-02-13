import fusion from 'deep-fusion';
import {Dialog} from 'metronic-extension';

const FILE_ID_PREFIX = 'f_';
const NODE_FOLDER = 'folder';
const NODE_FILE = 'file';
const MULTIPLE = false;

function isString(payload) {
  return typeof payload === 'string' || payload instanceof String;
}

function isFunction(payload) {
  return toString.call(payload) === '[object Function]';
}

/**
 * Folder and file tree components.
 */
export default class {
  #treeInstance;
  // #selectedNodeHandler = (node) => {};

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
    for (let key of ['getChildren', 'createFolder', 'deleteFolder'])
      if (isString(options.api[key]))
        options.api[key] = {url: options.api[key]};
    options = fusion({
      maxDepth: 2,
      folderNameMaxlength: undefined,
      fileNameMaxlength: undefined,
      api: {
        getChildren: {
          type: 'GET',
          // The "_PARENT_" in the string type URL is replaced by the ID of the currently selected folder.
          url: '/folders/_PARENT_/children',
          data: undefined,
          // data: node => ({parent: node.id}),
        },
        createFolder: {
          type: 'POST',
          // The "_PARENT_" in the string type URL is replaced by the ID of the currently selected folder.
          url: '/folders/_PARENT_',
          data: undefined,
          // data: node => ({parent: node.id}),
        },
        deleteFolder: {
          type: 'DELETE',
          // The "_CURRENT_" in the string type URL is replaced by the ID of the currently selected folder.
          url: '/folders/_CURRENT_',
          data: undefined,
          // data: node => ({parent: node.id}),
        },
      },
      language: {
        createFolderMenu: 'Create folder',
        createFileMenu: 'Create file',
        renameManu: 'Rename',
        removeManu: 'Remove',
        newFolderName: 'New Folder',
        // The "_FOLDER_" in the text is set to the name of the folder to be deleted.
        deletionConfirmation: 'Are you sure you want to delete _FOLDER_?',
        deleteButton: 'OK',
        deleteCancelButton: 'Cancel',
      }
    }, options);

    // Check options.
    for (let key of ['getChildren', 'createFolder', 'deleteFolder'])
      if (!isString(options.api[key].url) && !isFunction(options.api[key].url))
        throw new TypeError(`"api.${key}.url" option must be a string or function`);
      else if (options.api.getChildren.data && !isFunction(options.api[key].data))
        throw new TypeError(`"api.${key}.data" option must be a function`);

    // Initialize the tree.
    this.#treeInstance = context
      .on('focus', '.jstree-rename-input', evnt => {
        // Set the maximum input length once the folder or file name input field is focused.
        const input = evnt.currentTarget;
        const li = input.closest('li[data-node-type]');
        switch (li.dataset.nodeType) {
        case NODE_FOLDER:
          if (options.folderNameMaxlength)
            input.setAttribute('maxlength', options.folderNameMaxlength);
          break;
        case NODE_FILE:
          if (options.fileNameMaxlength)
            input.setAttribute('maxlength', options.fileNameMaxlength);
          break;
        }
      })
      // .on('rename_node.jstree', function (e, data) {
      //   console.log('rename_node!!!', data.text);
      //   //MAKE AJAX CALL HERE
      // })
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
                          options.api.getChildren.url.replace('_PARENT_', encodeURIComponent(node.id)) :
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
            icon: 'fa fa-file  text-warning',
            li_attr: {'data-node-type': NODE_FILE},
          }
        },
        // Customize the state to be saved in the browser.
        state: {
          key: `FolderTree_${location.pathname.replace(/^\//, '').replace(/\//g, '_')}`,
        },
        // Customize the context menu. Learn more https://old.jstree.com/documentation/contextmenu.
        contextmenu: {
          items: node => {
            const depth = node.parents.length - 1;
            const menu = {
              createFolder: false,
              createFile: false,
              rename: false,
              remove: false,
              cut: false,
              copy: false,
              paste: false
            };
            if (node.type === NODE_FOLDER && depth < options.maxDepth)
              menu.createFolder = {
                label: options.language.createFolderMenu,
                action: data => {
                  const parent = this.#getNode(data.reference);
                  this.#treeInstance.create_node(parent, {text: options.language.newFolderName, 'type': NODE_FOLDER} , 'last', newNode => {
                    // try{
                      this.#treeInstance.edit(newNode, newNode.text, async () => {
                        // Folder creation request.
                        const res = await $.ajax({
                          type: options.api.createFolder.type,
                          url: isString(options.api.createFolder.url) ?
                                options.api.createFolder.url.replace('_PARENT_', encodeURIComponent(newNode.parent)) :
                                options.api.createFolder.url(newNode),
                          data: options.api.createFolder.data ?
                                  options.api.createFolder.data(newNode) :
                                  {text: newNode.text}
                        });

                        // Update the ID of the new folder.
                        this
                          .#selectNode(newNode)
                          .#setNodeId(newNode, res.id);
                      });
                    // } catch (err) {
                    //   setTimeout(() => this.#treeInstance.edit(newNode), 0);
                    // }
                  });
                },
              };
            if (node.type === NODE_FOLDER)
              menu.createFile = {
                label: options.language.createFileMenu,
              };
            if (depth > 0) {
              menu.rename = {
                label: options.language.renameManu,
              };
              menu.remove = {
                label: options.language.removeManu,
                action: async data => {
                  const deleteNode = this.#getNode(data.reference);
                  if (!await Dialog.confirm(options.language.deletionConfirmation.replace('_FOLDER_', deleteNode.text), {
                      confirmButtonText: options.language.deleteButton,
                      cancelButtonText: options.language.deleteCancelButton}))
                    return;
                  await $.ajax({
                    type: options.api.deleteFolder.type,
                    url: isString(options.api.deleteFolder.url) ?
                          options.api.deleteFolder.url.replace('_CURRENT_', deleteNode.id) :
                          options.api.deleteFolder.url(deleteNode),
                    data: options.api.deleteFolder.data ?
                            options.api.deleteFolder.data(deleteNode) :
                            undefined
                  });
                  this.#deleteNode(deleteNode);
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
   * Select a node.
   *
   * @param {any} obj An array can be used to select multiple nodes.
   * @param {boolean} supressEvent if set to `true` the `changed.jstree` event won't be triggered.
   * @param {boolean} preventOpen if set to `true` parents of the selected node won't be opened.
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
    */
  #deselectNode(obj, supressEvent = false) {
    this.#treeInstance.deselect_node(obj, supressEvent);
    return this;
  }

  /**
    * Deselect all selected nodes.
    *
    * @param {boolean} supressEvent if set to `true` the `changed.jstree` event won't be triggered.
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
    * @param {boolean} full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
    * @param {undefined|number} position 
    * @return {any}
    */
  getSelectedNodes (full = true, position = undefined) {
    const nodes = this.#treeInstance.get_selected(full);
    if (position == null)
      return nodes;
    return nodes[position] || null;
  }

  /**
    * Remove a node.
    *
    * @param  {any} obj The node, you can pass an array to delete multiple nodes.
    * @return {boolean}
    */
  #deleteNode(obj) {
    return this.#treeInstance.delete_node(obj);
  }
}