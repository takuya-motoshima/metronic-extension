/**
 * An array to store the nodes found.
 */
declare type SelectionResults = {
    [key: string]: any;
};
/**
 * Gets nodes with data-ref attribute.
 */
declare const _default: (context?: string | JQuery | HTMLElement, result?: SelectionResults | undefined, additionalKey?: string | undefined, asHTMLElement?: boolean) => SelectionResults | undefined;
export default _default;
