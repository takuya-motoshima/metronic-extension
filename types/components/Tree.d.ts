/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
import TreeOptions from '~/interfaces/TreeOptions';
/**
 * Folder and file tree components.
 */
export default class Tree {
    #private;
    /**
     * Initialization.
     */
    constructor(context: HTMLDivElement | JQuery, options?: TreeOptions);
    /**
     * Refreshes the tree - all nodes are reloaded with calls to load_node.
     *
     * @param {boolean} skipLoading An option to skip showing the loading indicator. Default is false.
     * @param {boolean} forgetState If set to true state will not be reapplied, if set to a function (receiving the current state as argument) the result of that function will be used as state. Default is false.
     * @return {Tree}
     */
    refresh(skipLoading?: boolean, forgetState?: boolean): Tree;
    /**
     * Refreshes a node in the tree (reload its children) all opened nodes inside that node are reloaded with calls to load_node.
     *
     * @param {any} obj The node.
     * @return {Tree}
     */
    refreshNode(obj: any): Tree;
    /**
     * Triggered when a node is selected.
     *
     * @param {(evnt: any, node: any) => void} handler Handle function.
     * @return {Tree}
     */
    onSelected(handler: (evnt: any, node: any) => void): Tree;
    /**
     * Triggered on error.
     *
     * @param {(err: any) => void} handler Handle function.
     * @return {Tree}
     */
    onError(handler: (err: any) => void): Tree;
    /**
     * Triggered when a node is fetched from the server side.
     *
     * @param {(nodeData: any) => void} handler Handle function.
     * @return {Tree}
     */
    onFetch(handler: (nodeData: any) => void): Tree;
    /**
     * Triggered when all nodes have been loaded and the previously selected node's selection state has been restored.
     *
     * @param {(evnt: any) => void} handler Handle function.
     * @return {Tree}
     */
    onReady(handler: (evnt: any) => void): Tree;
    /**
     * Hook file creation process.
     * If the hook is not set, the node is simply added to the folder and after entering the node name, the node is sent to the server.
     * If you want to have your own node creation logic, use the hook.
     *
     * If a node is created by the hook function, return the ID and text of the created node.
     * If the creation is canceled, return a value(null, false, or undefined)  that causes the judgment to be false.
     *
     * @param {(parent: any) => Promise<{id: string|number, text: string, [key: string]: any}|null|undefined|false>} hook Hook function.
     * @return {Tree}
     */
    onCreateFileHook(hook: (parent: any) => Promise<{
        id: string | number;
        text: string;
        [key: string]: any;
    } | null | undefined | false>): Tree;
    /**
      * Get an array of all selected nodes.
      *
      * @param {boolean} full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned.
      * @param {undefined|number} index Index of the node to be acquired. Default is none and all nodes are retrieved.
      * @return {any|null}
      */
    getSelectedNodes(full?: boolean, index?: number): any | null;
    /**
      * Get the first selected node.
      *
      * @param {boolean} full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned.
      * @return {any|null}
      */
    getSelectedNode(full?: boolean): any | null;
    /**
     * Get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array).
     *
     * @example
     * ```js
     * import {Tree} from 'metronic-extension';
     *
     * const tree = new Tree(document.getElementById('tree'));
     * tree.onSelected((evnt, node) => {
     *   tree.getPath(node);            // ['Root node', 'Folder#1', 'Folder#1_1']
     *   tree.getPath(node, '/');       // 'Root node/Folder#1/Folder#1_1'
     *   tree.getPath(node, '/', true); // '1/2/3'
     * });
     * ```
     *
     * @param {any} obj The node.
     * @param {string|undefined} glue If you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned.
     * @param {boolean} ids If set to true build the path using ID, otherwise node text is used.
     * @return {string[]|string}
     */
    getPath(obj: any, glue?: string | undefined, ids?: boolean): any;
    /**
     * Get parent node.
     *
     * @param {any} obj The node, you can pass an array to delete multiple nodes.
     * @return {any}
     */
    getParentNode(obj: any): any;
    /**
     * Set the text value of a node.
     *
     * @param {any} obj The node, you can pass an array to rename multiple nodes to the same name.
     * @param {string} text The new text value.
     * @return {Tree}
     */
    renameNode(obj: any, text: string): Tree;
}
