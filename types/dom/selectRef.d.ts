/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
/**
 * An array to store the nodes found.
 */
type SelectionResults = {
    [key: string]: any;
};
/**
 * Gets nodes with data-ref attribute.
 */
declare const _default: (context?: string | JQuery | HTMLElement, result?: SelectionResults | undefined, additionalKey?: string | undefined, asHTMLElement?: boolean) => SelectionResults | undefined;
export default _default;
