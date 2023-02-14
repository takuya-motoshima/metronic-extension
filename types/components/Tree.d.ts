import TreeOption from '~/interfaces/TreeOption';
/**
 * Folder and file tree components.
 */
export default class Tree {
    #private;
    /**
     * Initialization.
     */
    constructor(context: HTMLDivElement | JQuery, options?: TreeOption);
    /**
     * Set node selection event handler.
     *
     * @param {(evnt: any, node: any) => void} handler Handle function.
     * @return {Tree}
     */
    onSelected(handler: (evnt: any, node: any) => void): Tree;
    /**
     * Set error event handler.
     *
     * @param {(err: any) => void} handler Handle function.
     * @return {Tree}
     */
    onError(handler: (err: any) => void): Tree;
    /**
     * Get parent node.
     *
     * @param  {any} obj The node, you can pass an array to delete multiple nodes.
     * @return {any}
     */
    getParentNode(obj: any): any;
    /**
     * Get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array).
     *
     * @example
     * import {Tree} from 'metronic-extension';
     *
     * const tree = new Tree(document.getElementById('tree'));
     * tree.onSelected((evnt, node) => {
     *   tree.getPath(node);            // ['Root node', 'Folder#1', 'Folder#1_1']
     *   tree.getPath(node, '/');       // 'Root node/Folder#1/Folder#1_1'
     *   tree.getPath(node, '/', true); // '1/2/3'
     * });
     *
     * @param  {any} obj The node.
     * @param  {string|undefined} glue If you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned.
     * @param  {boolean} ids If set to true build the path using ID, otherwise node text is used.
     * @return {string[]|string}
     */
    getPath(obj: any, glue?: string | undefined, ids?: boolean): any;
}
