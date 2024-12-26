/// <reference types="datatables.net" />
import DatatableOptions from '~/interfaces/DatatableOptions';
/**
 * DataTable component based on <a href="https://datatables.net/" target="_blank">datatables.net</a> with advanced instructions.
 */
export default class Datatable {
    #private;
    /**
     * DataTables.Api instance. This is read-only.
     * @type {DataTables.Api}
     */
    get api(): DataTables.Api;
    /**
     * Create a new instance of the Datatable class.
     * @param {string|HTMLTableElement|JQuery} element HTMLTableElement selector, element, or JQuery object.
     * @param {DatatableOptions} options An object with the following custom options inherited from <a href="https://datatables.net/reference/option/" target="_blank">DataTables.Settings</a>.
     */
    constructor(element: string | HTMLTableElement | JQuery, options: DatatableOptions);
    /**
     * Reload the table data from the Ajax data source.
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
     * @param {any} columnSelector Column selector. See <a href="https://datatables.net/reference/type/column-selector" target="_blank">here</a> for more information.
     * @param {string} input Search string to apply to the table.
     * @param {boolean} regex Whether to treat input as a regular expression (true) or not (default is false).
     * @example
     * HTML:
     * ```html
     * <table id="myTable" class="table table-row-bordered gy-5">
     *   <thead>
     *     <tr class="text-start text-gray-700 fw-bold fs-7 gs-0">
     *       <th>Name</th>
     *       <th>Position</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Airi Satou</td>
     *       <td>Accountant</td>
     *     </tr>
     *     <tr>
     *       <td>Angelica Ramos</td>
     *       <td>Chief Executive Officer (CEO)</td>
     *     </tr>
     *   </tbody>
     * </table>
     * ```
     *
     * JS:
     * ```js
     * import {components} from 'metronic-extension';
     *
     * // Initialize the component and set up event listeners.
     * let targetIndex = 0;
     * const myTable = new components.Datatable(document.getElementById('myTable'), {
     *   columnDefs: [
     *     {targets: targetIndex++, name: 'name'},
     *     {targets: targetIndex++, name: 'position'},
     *   ],
     * });
     *
     * // Search by column position.
     * myTable.filter(1, 'CEO');
     *
     * // Search by column name.
     * myTable.filter('position:name', 'CEO');
     * ```
     */
    filter(columnSelector: any, input: string, regex?: boolean): void;
    /**
     * Returns a table wrapper element.
     * @param {boolean} asHtmlElement If true, get it as an HTMLElement, if false, get it as a jQuery object. Default is false.
     * @return {JQuery|HTMLElement} Table wrapper element.
     */
    getContainer(asHtmlElement?: boolean): JQuery | HTMLElement;
    /**
     * Returns a table filter container element.
     * @param {boolean} asHtmlElement If true, get it as an HTMLElement, if false, get it as a jQuery object. Default is false.
     * @return {JQuery|HTMLElement|null} Filter container element.
     */
    getFilterContainer(asHtmlElement?: boolean): JQuery | HTMLElement | null;
    /**
     * Create a row.
     * @param {any} data Data to use for the new row. This may be an array, object, Javascript object instance or a tr element. If a data structure is used (i.e. array or object) it must be in the same format as the other data in the table (i.e. if your table uses objects, pass in an object with the same properties here!).
     * @param {boolean} paging The type of drawing after the row is added. If true, paging is reset to the first page; if false Paging is not reset and the current page is displayed. Default is true.
     * @return {Datatable}
     * @example
     * HTML:
     * ```html
     * <table id="myTable" class="table table-row-bordered gy-5">
     *   <thead>
     *     <tr class="text-start text-gray-700 fw-bold fs-7 gs-0">
     *       <th>Name</th>
     *       <th>Position</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Airi Satou</td>
     *       <td>Accountant</td>
     *     </tr>
     *     <tr>
     *       <td>Angelica Ramos</td>
     *       <td>Chief Executive Officer (CEO)</td>
     *     </tr>
     *   </tbody>
     * </table>
     * ```
     *
     * JS:
     * ```js
     * import {components} from 'metronic-extension';
     *
     * // Initialize the component and set up event listeners.
     * let targetIndex = 0;
     * const myTable = new components.Datatable(document.getElementById('myTable'), {
     *   columnDefs: [
     *     {targets: targetIndex++, data: 'name'},
     *     {targets: targetIndex++, data: 'position'},
     *   ],
     * });
     *
     * // Add object as a new row.
     * myTable.createRow({name: 'Ashton Cox', position: 'Junior Technical Author'});
     *
     * // Add HTML element as a new row.
     * const row = document.createElement('tr');
     * row.insertAdjacentHTML('afterbegin', '<td>Bradley Greer</td><td>Software Engineer</td>');
     * myTable.createRow(row);
     * ```
     */
    createRow(data: any, paging?: boolean): Datatable;
    /**
     * Delete row.
     * @param {any} rowSelector Row selector. See <a href="https://datatables.net/reference/type/row-selector" target="_blank">here</a> for more information.
     * @return {Datatable}
     * @example
     * HTML:
     * ```html
     * <table id="myTable" class="table table-row-bordered gy-5">
     *   <thead>
     *     <tr class="text-start text-gray-700 fw-bold fs-7 gs-0">
     *       <th>Name</th>
     *       <th>Position</th>
     *       <th>#</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Airi Satou</td>
     *       <td>Accountant</td>
     *       <td><button data-on-delete class="btn btn-primary">Delete</button></td>
     *     </tr>
     *     <tr>
     *       <td>Angelica Ramos</td>
     *       <td>Chief Executive Officer (CEO)</td>
     *       <td><button data-on-delete class="btn btn-primary">Delete</button></td>
     *     </tr>
     *   </tbody>
     * </table>
     * ```
     *
     * JS:
     * ```js
     * import {components} from 'metronic-extension';
     *
     * // Initialize the component and set up event listeners.
     * let targetIndex = 0;
     * const myTable = new components.Datatable(document.getElementById('myTable'), {
     *   columnDefs: [
     *     {targets: targetIndex++, data: 'name'},
     *     {targets: targetIndex++, data: 'position'},
     *     {targets: targetIndex++, data: 'actions'},
     *   ],
     * });
     *
     * // Delete at specified position; the second row is deleted.
     * myTable.deleteRow(1);
     *
     * // Specify a row element to delete.
     * $('#myTable tbody').on('click', '[data-on-delete]', event => {
     *   // Get selection row.
     *   const row = event.currentTarget.closest('tr');
     *
     *   // Delete row.
     *   myTable.deleteRow(row);
     * });
     * ```
     */
    deleteRow(rowSelector: any): Datatable;
    /**
     * Update row.
     * @param {any} rowSelector Row selector. See <a href="https://datatables.net/reference/type/row-selector" target="_blank">here</a> for more information.
     * @param {any[]|object} data Data source object for the data source of the row. This will be an array if you use DOM sourced data, otherwise it will be the array / object / instance that is used to populate the table with data.
     * @param {boolean} redraw Reloads the table data after updating a row if true, otherwise does not. Default is true.
     * @return {Datatable}
     * @example
     * HTML:
     * ```html
     * <table id="myTable" class="table table-row-bordered gy-5">
     *   <thead>
     *     <tr class="text-start text-gray-700 fw-bold fs-7 gs-0">
     *       <th>Name</th>
     *       <th>Position</th>
     *       <th>#</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Airi Satou</td>
     *       <td>Accountant</td>
     *       <td><button data-on-update class="btn btn-primary">Update name</button></td>
     *     </tr>
     *     <tr>
     *       <td>Angelica Ramos</td>
     *       <td>Chief Executive Officer (CEO)</td>
     *       <td><button data-on-update class="btn btn-primary">Update name</button></td>
     *     </tr>
     *   </tbody>
     * </table>
     * ```
     *
     * JS:
     * ```js
     * import {components} from 'metronic-extension';
     *
     * // Initialize the component and set up event listeners.
     * let targetIndex = 0;
     * const myTable = new components.Datatable(document.getElementById('myTable'), {
     *   columnDefs: [
     *     {targets: targetIndex++, data: 'name'},
     *     {targets: targetIndex++, data: 'position'},
     *     {targets: targetIndex++, data: 'actions'},
     *   ],
     * });
     *
     * $('#myTable tbody').on('click', '[data-on-update]', event => {
     *   // Display name input dialog.
     * 	const name = window.prompt('Please enter a new name.');
     *   if (!name)
     *     // Cancel input or do nothing if input is empty.
     *     return;
     *
     *   // Get selection row.
     *   const row = event.currentTarget.closest('tr');
     *
     *   // Update the name column of row.
     *   myTable.updateRow(row, {name}, false);
     * });
     * ```
     */
    updateRow(rowSelector: any, data: any[] | object, redraw?: boolean): Datatable;
    /**
     * Gets the data for a single row or all rows in the DataTable.
     * You can access the column data in a row using the name specified in the `data` property during column definition.
     * @param {any} rowSelector Row selector. See <a href="https://datatables.net/reference/type/row-selector" target="_blank">here</a> for more information.
     * @return {any[]|object} An array of row data objects if no row selector is provided, or a single row data object if a selector is provided.
     * @example
     * HTML:
     * ```html
     * <table id="myTable" class="table table-row-bordered gy-5">
     *   <thead>
     *     <tr class="text-start text-gray-700 fw-bold fs-7 gs-0">
     *       <th>Name</th>
     *       <th>Position</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Airi Satou</td>
     *       <td>Accountant</td>
     *     </tr>
     *     <tr>
     *       <td>Angelica Ramos</td>
     *       <td>Chief Executive Officer (CEO)</td>
     *     </tr>
     *   </tbody>
     * </table>
     * ```
     *
     * JS:
     * ```js
     * import {components} from 'metronic-extension';
     *
     * // Initialize the component and set up event listeners.
     * let targetIndex = 0;
     * const myTable = new components.Datatable(document.getElementById('myTable'), {
     *   columnDefs: [
     *     {targets: targetIndex++, data: 'name'},
     *     {targets: targetIndex++, data: 'position'},
     *   ],
     * });
     *
     * // Retrieve the first row of data.
     * // The result is "{name: 'Airi Satou', position: 'Accountant'}".
     * const row = myTable.getRowData(0);
     *
     * // Get all row data.
     * // The retrieved result is "[{name: 'Airi Satou', position: 'Accountant'}, {name: 'Angelica Ramos', position: 'Chief Executive Officer (CEO)'}]".
     * const rows = myTable.getRowData();
     * ```
     */
    getRowData(rowSelector?: any): any[] | object;
    /**
     * Get the number of rows.
     * @param {any|undefined} rowSelector Row selector. See <a href="https://datatables.net/reference/type/row-selector" target="_blank">here</a> for more information.
     * @return {number} Number of rows.
     * @example
     * ```js
     * // Get the number of rows for which the ".select" CSS class is set.
     * myTable.getRowCount('.selected');
     *
     * // Get the number of all rows.
     * myTable.getRowCount();
     * ```
     */
    getRowCount(rowSelector?: any): number;
    /**
     * Get row HTML elements.
     * @return {HTMLTableRowElement[]} HTML elements of row.
     */
    getRowNodes(): HTMLTableRowElement[];
    /**
     * Get the DataTable API instance containing the selected rows.
     * @param {any} rowSelector Row selector. See <a href="https://datatables.net/reference/type/row-selector" target="_blank">here</a> for more information.
     * @return {DataTables.RowsMethods} DataTable API instance containing the selected rows.
     */
    getRowObject(rowSelector: any): DataTables.RowsMethods;
    /**
     * Select the column found by a the column selector.
     * @param {any} columnSelector Column selector. See <a href="https://datatables.net/reference/type/column-selector" target="_blank">here</a> for more information.
     * @param {DataTables.ObjectSelectorModifier|undefined} modifier? Specifies the order, paging, and filtering status of the selected columns. Default is none (undefined). See <a href="https://datatables.net/reference/type/selector-modifier" target="_blank">here</a> for more information.
     * @return {DataTables.ColumnMethods} DataTable API instance with selected column in the result set.
     */
    column(columnSelector: any, modifier?: DataTables.ObjectSelectorModifier): DataTables.ColumnMethods;
    /**
     * Clear the table of all data.
     * @return {Datatable}
     */
    clear(): Datatable;
    /**
     * Hook function called when an error occurs in an Ajax request to retrieve table data that can be implemented in a subclass.
     * This method receives an HTTP status code and an XMLHttpRequest object.
     * @param {number} httpStatusCode HTTP status code.
     * @param {XMLHttpRequest} xhr XMLHttpRequest object.
     * @example
     * ```js
     * ajaxErrorHook(httpStatusCode, xhr) {
     *   if (httpStatusCode === 403)
     *     // Redirect in case of authentication error (403).
     *     location.replace('/');
     * }
     * ```
     */
    protected ajaxErrorHook(httpStatusCode: number, xhr: XMLHttpRequest): void;
}
