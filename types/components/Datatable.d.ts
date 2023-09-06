/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
import DatatableOptions from '~/interfaces/DatatableOptions';
/**
 * DataTable.
 *
 * Example of error handling in a subclass.
 * @example
 * ```js
 * import {Datatable} from 'metronic-extension';
 *
 * export default class extends Datatable {
 *   requestErrorHook(code) {
 *     if (code === 403) {
 *       // Redirect in case of authentication error (403).
 *       alert('The session has expired');
 *       location.replace('/');
 *     }
 *   }
 * }
 * ```
 */
export default class Datatable {
    #private;
    /**
     * Initialization.
     */
    constructor(table: string | HTMLTableElement | JQuery, options: DatatableOptions);
    /**
     * Object of the DataTables API.
     */
    get api(): DataTables.Api;
    /**
     * Reload the table data from the Ajax data source.
     *
     * @param {boolean} resetPaging Reset (default action or true) or hold the current paging position (false).
     * @return {Promise<any>} JSON data returned by the server.
     */
    reload(resetPaging?: boolean): Promise<any>;
    /**
     * Adjust column layout.
     */
    adjustColumns(): void;
    /**
     * Filter row by the specified string.
     */
    filter(columnSelector: number | string | number[] | string[], input: string, regex?: boolean): void;
    /**
     * Returns a table wrapper element.
     */
    getContainer(): JQuery;
    /**
     * Returns a table filter container element.
     */
    getFilterContainer(): JQuery;
    /**
     * Create a row.
     */
    createRow(data: any, paging?: boolean): any;
    /**
     * Delete row.
     */
    deleteRow(rowSelector: any): void;
    /**
     * Update row.
     */
    updateRow(rowSelector: any, data: any, redraw?: boolean): void;
    /**
     * Get single row or all rows of data
     *
     * @example
     * ```js
     * // Get the first row data.
     * table.getRowData(0);
     *
     * // By not specifying a selector, all rows of data can be retrieved.
     * table.getRowData();
     * ```
     */
    getRowData(rowSelector?: any): any;
    /**
     * Get the number of rows.
     *
     * @example
     * ```js
     * // Get the number of selected rows.
     * table.getRowCount('.selected');
     *
     * // Get the number of all rows.
     * table.getRowCount();
     * ```
     */
    getRowCount(rowSelector?: any): number;
    /**
     * Get the row nodes.
     */
    getRowNodes(): HTMLTableRowElement[];
    /**
     * Get a row object.
     */
    getRowObject(rowSelector: any): DataTables.RowsMethods;
    /**
     * Request error hook.
     * This function should be defined in a subclass.
     * For example, to redirect in case of a 403 error, use the following
     *
     * @example
     * ```js
     * import {Datatable} from 'metronic-extension';
     *
     * export default class extends Datatable {
     *   requestErrorHook(code) {
     *     if (code === 403) {
     *       // Redirect in case of authentication error (403).
     *       alert('The session has expired');
     *       location.replace('/');
     *     }
     *   }
     * }
     * ```
     */
    requestErrorHook(code: number, xhr: XMLHttpRequest): void;
    /**
     * Select the column found by a the column selector
     */
    column(columnSelector: any, modifier?: DataTables.ObjectSelectorModifier): DataTables.ColumnMethods;
    /**
     * Clear the table of all data.
     */
    clear(): Datatable;
}
