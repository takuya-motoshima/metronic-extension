import TreeApiOption from '~/interfaces/TreeApiOption';
/**
 * Tree option.
 */
export default interface  {
    /**
      * Defines maximum depth of the tree. The default is 2 (up to child and grandchild folders).
      * @type {number}
      */
    maxDepth: number;
    /**
      * Maximum length of folder name. Default is 20.
      * @type {number}
      */
    folderMaxlen: number;
    /**
      * Maximum length of file name. Default is 20.
      * @type {number}
      */
    fileMaxlen: number;
    /**
      * Define folder and file creation, deletion, and rename requests.
      * @type {object}
      */
    api: Record<string, TreeApiOption>;
    /**
      * Text used in the tree.
      */
    language: {
        createFolderMenu: string;
        createFolderSuccessful: string;
        deleteFolderMenu: string;
        deleteFolderConfirmation: string;
        deleteFolderButton: string;
        deleteFolderCancelButton: string;
        deleteFolderSuccessful: string;
        renameFolderManu: string;
        newFolderName: string;
        createFileMenu: string;
        createFileSuccessful: string;
        deleteFileMenu: string;
        deleteFileConfirmation: string;
        deleteFileButton: string;
        deleteFileCancelButton: string;
        deleteFileSuccessful: string;
        renameFileManu: string;
        newFileName: string;
        unknownErrorTitle: string;
        unknownErrorMessage: string;
    };
}
