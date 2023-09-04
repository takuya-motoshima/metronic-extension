import TreeApiOptions from '~/interfaces/TreeApiOptions';

/**
 * Tree options.
 */
export default interface TreeOptions {
  /**
   * Defines maximum depth of the tree. The default is 2 (up to child and grandchild folders).
   */
  maxDepth: number,

  /**
   * Maximum length of folder name. Default is 20.
   */
  folderMaxlen: number,

  /**
   * Maximum length of file name. Default is 20.
   */
  fileMaxlen: number,

  /**
   * Options per node type.
   */
  nodeTypes: {
    /**
     * Folder node options.
     */
    folder: {
      // Folder node identifier.
      type: string,

      // Folder node icons. Default is 'fa fa-folder text-warning'.
      icon: string,
    },
    /**
     * File node options.
     */
    file: {
      // File node identifier.
      type: string,

      // File node icons. Default is 'fa fa-file text-white'.
      icon: string,
    },
  }

  // /**
  //  * If true, children of the folder will be cached and not retrieved from the server.
  //  * If you want the folder to always be fetched from the server when opened, set to false.
  //  * Default is true.
  //  */
  // cacheLoadedChildren: true,

  /**
   * Define folder and file creation, deletion, and rename requests.
   */
  api: Record<string, TreeApiOptions>,

  /**
   * Text used in the tree.
   */
  language: {
    // Folder-related text.
    createFolderMenu: string,
    createFolderSuccessful: string,// The "_FOLDER_" in the text is set to the name of the created folder.
    deleteFolderMenu: string,
    deleteFolderConfirmation: string,// The "_FOLDER_" in the text is set to the name of the folder to be deleted.
    deleteFolderButton: string,
    deleteFolderCancelButton: string,
    deleteFolderSuccessful: string,// The "_FOLDER_" in the text is set to the name of the folder to be deleted.
    renameFolderManu: string,
    newFolderName: string,

    // File-related text.
    createFileMenu: string,
    createFileSuccessful: string,// The "_FILE_" in the text is set to the name of the created file.
    deleteFileMenu: string,
    deleteFileConfirmation: string,// The "_FILE_" in the text is set to the name of the file to be deleted.
    deleteFileButton: string,
    deleteFileCancelButton: string,
    deleteFileSuccessful: string,// The "_FILE_" in the text is set to the name of the file to be deleted.
    renameFileManu: string,
    newFileName: string,

    // Error message.
    unknownErrorTitle: string,
    unknownErrorMessage: string,
  },
}