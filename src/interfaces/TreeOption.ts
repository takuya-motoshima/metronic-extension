import TreeApiOption from '~/interfaces/TreeApiOption';

/**
 * Tree option.
 */
export default interface {
  /**
    * Defines maximum depth of the tree. The default is 2 (up to child and grandchild folders).
    * @type {number}
    */
  maxDepth: number,

  /**
    * Maximum length of folder name. Default is 20.
    * @type {number}
    */
  folderMaxlen: number,

  /**
    * Maximum length of file name. Default is 20.
    * @type {number}
    */
  fileMaxlen: number,

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
  api: Record<string, TreeApiOption>,
 
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
  }
}