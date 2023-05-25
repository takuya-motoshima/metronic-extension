import TreeApiOption from '~/interfaces/TreeApiOption';
/**
 * Tree API.
 */
export default class {
    #private;
    /**
     * Initialization.
     */
    constructor(options: Record<string, TreeApiOption>);
    /**
     * Create a folder.
     */
    createFolder(newNode: any): Promise<any>;
    /**
     * Delete a folder.
     */
    deleteFolder(deleteNode: any): Promise<any>;
    /**
     * Rename a folder.
     */
    renameFolder(node: any): Promise<any>;
    /**
     * Create file
     */
    createFile(newNode: any): Promise<any>;
    /**
     * Delete file
     */
    deleteFile(deleteNode: any): Promise<any>;
    /**
     * Rename a file
     */
    renameFile(node: any): Promise<any>;
}
