import TreeApiOption from '~/interfaces/TreeApiOption';
import isString from '~/misc/isString';

const FILE_NODE_ID_PREFIX = 'f_';
const PARENT_FOLDER_VAR = '_PARENT_FOLDER_ID_';
const CURRENT_FOLDER_VAR = '_CURRENT_FOLDER_ID_';
const CURRENT_FILE_VAR = '_CURRENT_FILE_ID_';

/**
 * Tree API.
 */
export default class {
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
