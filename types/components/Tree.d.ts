import TreeOptions from '~/interfaces/TreeOptions';
/**
 * <code>jsTree</code> plugin-based interactive tree component.
 * For more info please visit the plugin's <a class="me-1" href="https://www.jstree.com/" target="_blank">Home</a> or <a href="https://github.com/vakata/jstree" target="_blank">Github Repo</a>.
 */
export default class Tree {
    #private;
    /**
     * Create a new instance of the Tree class.
     * @param {string|HTMLDivElement|JQuery} element HTMLDivElement selector, element, or JQuery object.
     * @param {TreeOptions} options Tree options.
     */
    constructor(element: string | HTMLDivElement | JQuery, options: TreeOptions);
    /**
     * Refresh the tree.
     * @param {boolean} skipLoading An option to skip showing the loading indicator. Default is false.
     * @param {boolean} forgetState If set to true state will not be reapplied, if set to a function (receiving the current state as argument) the result of that function will be used as state. Default is false.
     * @return {Tree}
     */
    refresh(skipLoading?: boolean, forgetState?: boolean): Tree;
    /**
     * Refresh a node in the tree (reload child nodes).
     * @param {any} nodeObject The node.
     * @return {Tree}
     */
    refreshNode(nodeObject: any): Tree;
    /**
     * Sets the callback function to be called when a node is selected. The callback function receives an event object and a node object.
     * @param {(evnt: any, node: any) => void} handler Callback function.
     * @return {Tree}
     */
    onSelected(handler: (evnt: any, node: any) => void): Tree;
    /**
     * Sets the callback function to be called on error. The callback function receives an error object.
     * @param {(err: any) => void} handler Callback function.
     * @return {Tree}
     */
    onError(handler: (err: any) => void): Tree;
    /**
     * Sets the callback function that will be called when a child node of the selected node is retrieved from the server side.
     * The callback function receives the data retrieved from the server side and can modify or add data.
     * @param {(nodeData: any) => void} handler Callback function.
     * @return {Tree}
     */
    onFetch(handler: (nodeData: any) => void): Tree;
    /**
     * Sets the callback function that will be called when the tree initialization is complete. The callback function receives an event object.
     * @param {(evnt: any) => void} handler Callback function.
     * @return {Tree}
     */
    onReady(handler: (evnt: any) => void): Tree;
    /**
     * Sets the function that hooks the operation to create a new node.
     * If the hook is not set, the new node will be added to the tree immediately.
     * The hook function you set must return the ID and text of the newly created node. Also, return false, null, or undefined if you want to cancel the creation.
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
     * @param {boolean} full if set to true the returned array will consist of the full node objects, otherwise - only IDs will be returned.
     * @param {undefined|number} index Index of the node to be acquired. Default is none and all nodes are retrieved.
     * @return {any|null} Selected node.
     */
    getSelectedNodes(full?: boolean, index?: number): any | null;
    /**
     * Get the first node among the selected.
     * @param {boolean} full if set to true the returned array will consist of the full node objects, otherwise - only IDs will be returned.
     * @return {any|null} Selected node.
     */
    getSelectedNode(full?: boolean): any | null;
    /**
     * Get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array).
     * @example
     * ```js
     * tree.onSelected((evnt, node) => {
     *   // Get the path of the node.
     *   tree.getPath(node);// ['Root', 'Folder#1', 'Folder#1_1']
     *   tree.getPath(node, '/');// 'Root/Folder#1/Folder#1_1'
     *   tree.getPath(node, '/', true);// '1/2/3'
     * });
     * ```
     * @param {any} nodeObject The node.
     * @param {string|undefined} glue If you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned.
     * @param {boolean} ids If set to true build the path using ID, otherwise node text is used.
     * @return {string[]|string} Path of the node.
     */
    getPath(nodeObject: any, glue?: string | undefined, ids?: boolean): any;
    /**
     * Get parent node.
     * @param {any} nodeObject The node.
     * @return {any} Parent node.
     */
    getParentNode(nodeObject: any): any;
    /**
     * Rename node.
     * @param {any} nodeObject The node, you can pass an array to rename multiple nodes to the same name.
     * @param {string} text The new text value.
     * @return {Tree}
     */
    renameNode(nodeObject: any, text: string): Tree;
}
