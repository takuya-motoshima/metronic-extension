import TreeApiOptions from '~/interfaces/TreeApiOptions';
/**
 * Tree options.
 */
export default interface TreeOptions {
    /**
     * Defines maximum depth of the tree. The default is 2 (up to child and grandchild folders).
     */
    maxDepth: number;
    /**
     * Maximum length of folder name. Default is 20.
     */
    folderMaxlen: number;
    /**
     * Maximum length of file name. Default is 20.
     */
    fileMaxlen: number;
    /**
     * Options per node type.
     */
    nodeTypes: {
        /**
         * Folder node options.
         */
        folder: {
            type: string;
            icon: string;
        };
        /**
         * File node options.
         */
        file: {
            type: string;
            icon: string;
        };
    };
    /**
     * Define folder and file creation, deletion, and rename requests.
     */
    api: Record<string, TreeApiOptions>;
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
