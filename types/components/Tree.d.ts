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
     * Set node fetch event handler.
     *
     * @param {(nodeData: any) => void} handler Handle function.
     * @return {Tree}
     */
    onFetch(handler: (nodeData: any) => void): Tree;
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
    /**
     * Get parent node.
     *
     * @param  {any} obj The node, you can pass an array to delete multiple nodes.
     * @return {any}
     */
    getParentNode(obj: any): any;
}
