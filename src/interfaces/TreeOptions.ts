import TreeAjaxOptions from '~/interfaces/TreeAjaxOptions';

/**
 * Tree options.
 */
export default interface TreeOptions {
  /**
   * Ajax options for creating, deleting, and renaming nodes. This option is required.
   */
  ajax: {
    /**
     * Ajax option to retrieve child nodes (GET).
     * The "_PARENT_NODE_ID_" in the URL is replaced by the currently selected folder node ID.
     * If you want to make the URL dynamic, use the callback function.
     * Also, use the data option if you want to add or change the data to be sent.
     * @example
     * ```js
     * // Send to "GET /api/tree/:_PARENT_NODE_ID_"
     * children: '/api/tree/_PARENT_NODE_ID_',
     * 
     * // Dynamic URL generation.
     * children: node => {
     *   // This is an example of simply retrieving tree data in JSON without using the server side.
     *   if (node.id === '#')
     *     // If the node ID is "#", the data of the root node itself is returned.
     *     return 'tree-root-itself.json';
     *   else if (node.id == 1)
     *     // If the node ID is "1", the data of the child node associated with the root node (ID=1) is returned.
     *     return 'tree-roots-children.json';
     *   else if (node.id == 2)
     *     // If the node ID is "2", the data of the child node (ID=2) associated with the child1 node is returned.
     *     return 'tree-child1s-children.json';
     * }
     * 
     * // Added data to be sent.
     * children: {
     *   url: '/api/tree/_PARENT_NODE_ID_',
     *   data: (data, node) => {
     *     data.extra = 'Extra';
     *   }
     * }
     * 
     * // Dynamically generate URLs and add data to be sent.
     * children: {
     *   url: node => {
     *     // This is an example of simply retrieving tree data in JSON without using the server side.
     *     if (node.id === '#')
     *       // If the node ID is "#", the data of the root node itself is returned.
     *       return 'tree-root-itself.json';
     *     else if (node.id == 1)
     *       // If the node ID is "1", the data of the child node associated with the root node (ID=1) is returned.
     *       return 'tree-roots-children.json';
     *     else if (node.id == 2)
     *       // If the node ID is "2", the data of the child node (ID=2) associated with the child1 node is returned.
     *       return 'tree-child1s-children.json';
     *   }
     *   data: (data, node) => {
     *     data.extra = 'Extra';
     *   }
     * }
     * ```
     */
    children: string|((node: any) => string)|TreeAjaxOptions;

    /**
     * Ajax option to create a folder node (POST).
     * The "_PARENT_NODE_ID_" in the URL is replaced by the currently selected folder node ID.
     * The data to be sent is "{"text": new node name}", but can be added or changed with the data option.
     * If you want to make the URL dynamic, use the callback function.
     * @example
     * ```js
     * // Send to "POST /api/tree/folder/:_PARENT_NODE_ID_".
     * createFolder: '/api/tree/folder/_PARENT_NODE_ID_'
     * ```
     */
    createFolder: string|((node: any) => string)|TreeAjaxOptions;

    /**
     * Ajax option to delete a folder node (DELETE).
     * URL to request. The "_CURRENT_NODE_ID_" in the URL will be replaced by the current node ID.
     * If you want to make the URL dynamic, use the callback function.
     * Also, use the data option if you want to add or change the data to be sent.
     * @example
     * ```js
     * // Send to "DELETE /api/tree/folder/:_CURRENT_NODE_ID_".
     * deleteFolder: '/api/tree/folder/_CURRENT_NODE_ID_'
     * ```
     */
    deleteFolder: string|((node: any) => string)|TreeAjaxOptions;

    /**
     * Ajax option to rename a folder node (PUT).
     * The "_CURRENT_NODE_ID_" in the URL will be replaced by the current node ID.
     * The data to be sent is "{"text": changed node name}", but can be added or changed with the data option.
     * If you want to make the URL dynamic, use the callback function.
     * @example
     * ```js
     * // Send to "PUT /api/tree/folder/:_CURRENT_NODE_ID_".
     * renameFolder: '/api/tree/folder/_CURRENT_NODE_ID_'
     * ```
     */
    renameFolder: string|((node: any) => string)|TreeAjaxOptions;

    /**
     * Ajax option to create a file node (POST).
     * The "_PARENT_NODE_ID_" in the URL is replaced by the currently selected folder node ID.
     * The data to be sent is "{"text": new node name}", but can be added or changed with the data option.
     * If you want to make the URL dynamic, use the callback function.
     * @example
     * ```js
     * // Send to "POST /api/tree/file/:_PARENT_NODE_ID_".
     * createFile: '/api/tree/file/_PARENT_NODE_ID_'
     * ```
     */
    createFile: string|((node: any) => string)|TreeAjaxOptions;

    /**
     * Ajax option to delete a file node (DELETE).
     * The "_CURRENT_NODE_ID_" in the URL will be replaced by the current node ID.
     * If you want to make the URL dynamic, use the callback function.
     * Also, use the data option if you want to add or change the data to be sent.
     * @example
     * ```js
     * // Send to "DELETE /api/tree/file/:_CURRENT_NODE_ID_".
     * deleteFile: '/api/tree/file/_CURRENT_NODE_ID_'
     * ```
     */
    deleteFile: string|((node: any) => string)|TreeAjaxOptions;

    /**
     * Ajax option to rename a file node (PUT).
     * The "_CURRENT_NODE_ID_" in the URL will be replaced by the current node ID.
     * The data to be sent is "{"text": changed node name}", but can be added or changed with the data option.
     * If you want to make the URL dynamic, use the callback function.
     * @example
     * ```js
     * // Send to "PUT /api/tree/file/:_CURRENT_NODE_ID_".
     * renameFile: '/api/tree/file/_CURRENT_NODE_ID_'
     * ```
     */
    renameFile: string|((node: any) => string)|TreeAjaxOptions;
  };

  /**
   * Read-only. If true, the context menu for changing nodes is not displayed. Default is false.
   */
  readonly?: boolean;

  /**
   * Maximum number of levels in the tree. Default is 2.
   */
  maxDepth?: number;

  /**
   * Maximum length of folder node name. Default is 20.
   */
  folderMaxlen?: number;

  /**
   * Maximum length of file node name. Default is 20.
   */
  fileMaxlen?: number;

  /**
   * Node type.
   */
  nodeTypes?: {
    /**
     * Folder node options.
     */
    folder: {
      /**
       * Folder node identifier. Default is "folder".
       */
      type: string;

      /**
       * Folder node icons. Default is "fa fa-folder text-warning".
       */
      icon: string;
    };

    /**
     * File node options.
     */
    file: {
      /**
       * File node identifier. Default is "file".
       */
      type: string;

      /**
       * File node icons. Default is "fa fa-file text-white".
       */
      icon: string;
    };
  };

  /**
   * Strings used in the user interface.
   */
  language?: {
    /**
     * Folder node creation menu. Default is "Create folder".
     */
    createFolderMenu?: string;

    /**
     * Folder node creation success message. The "_FOLDER_" in the text is set to the name of the created folder. Default is "_FOLDER_ has been created.".
     */
    createFolderSuccessful?: string;

    /**
     * Folder node deletion menu. Default is "Delete folder".
     */
    deleteFolderMenu?: string;

    /**
     * Folder node deletion confirmation message. The "_FOLDER_" in the text is set to the name of the folder to be deleted. Default is "Are you sure you want to delete _FOLDER_?".
     */
    deleteFolderConfirmation?: string;

    /**
     * Folder node deletion confirmation OK button. Default is "Delete the folder".
     */
    deleteFolderButton?: string;

    /**
     * Folder node deletion confirmation cancel button. Default is "Cancel".
     */
    deleteFolderCancelButton?: string;

    /**
     * Folder node deletion success message. The "_FOLDER_" in the text is set to the name of the folder to be deleted. Default is "_FOLDER_ has been deleted.".
     */
    deleteFolderSuccessful?: string;

    /**
     * Folder node rename menu. Default is "Rename folder".
     */
    renameFolderManu?: string;

    /**
     * Default new folder node name. Default is "New Folder".
     */
    newFolderName?: string;

    /**
     * File node creation menu. Default is "Create file".
     */
    createFileMenu?: string;
    
    /**
     * File node creation success message. The "_FILE_" in the text is set to the name of the created file. Default is "_FILE_ has been created.".
     */
    createFileSuccessful?: string;

    /**
     * File node deletion menu. Default is "Delete file".
     */
    deleteFileMenu?: string;

    /**
     * File node deletion confirmation message. The "_FILE_" in the text is set to the name of the file to be deleted. Default is "Are you sure you want to delete _FILE_?".
     */
    deleteFileConfirmation?: string;

    /**
     * OK button for file node deletion confirmation. Default is "Delete file".
     */
    deleteFileButton?: string;

    /**
     * Cancel button for confirming file node deletion. Default is "Cancel".
     */
    deleteFileCancelButton?: string;

    /**
     * Success message for deleting a file node. The "_FILE_" in the text is set to the name of the file to be deleted. Default is "_FILE_ has been deleted.".
     */
    deleteFileSuccessful?: string;
    
    /**
     * File node rename menu. Default is "Rename file".
     */
    renameFileManu?: string;

    /**
     * Default new file node name. Default is "New File".
     */
    newFileName?: string;

    /**
     * Unexpected error title. Default is "An unexpected error has occurred.".
     */
    unknownErrorTitle?: string;

    /**
     * Unexpected error message. Default is "The process was interrupted due to an error. Please try again.".
     */
    unknownErrorMessage?: string;
  };

  // /**
  //  * If true, children of the folder will be cached and not retrieved from the server.
  //  * If you want the folder to always be fetched from the server when opened, set to false.
  //  * Default is true.
  //  */
  // cacheLoadedChildren: true;
}