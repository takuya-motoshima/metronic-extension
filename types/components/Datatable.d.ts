/// <reference types="datatables.net" />
import "bootstrap";
/**
 * DataTable.
 */
export default class {
    #private;
    /**
     * Initialization.
     */
    constructor(table: string | HTMLTableElement | JQuery, options: DataTables.Settings);
    /**
     * Reload data.
     */
    reload(): void;
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
     * Get row data.
     */
    getRowData(rowSelector: any): any;
    /**
     * Get the number of rows.
     *
     * @example
     * // Get the number of selected rows.
     * table.getRowCount('.selected');
     *
     * // Get the number of all rows.
     * table.getRowCount();
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
}
