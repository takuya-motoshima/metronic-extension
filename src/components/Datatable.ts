import {merge} from 'deep-fusion';
import initTooltip from '~/components/initTooltip';
import isString from '~/utils/isString';
import isPlainObject from '~/utils/isPlainObject';
import DatatableOptions from '~/interfaces/DatatableOptions';

/**
 * DataTable component based on <a href="https://datatables.net/" target="_blank">datatables.net</a> with advanced instructions.
 */
export default class Datatable {
  /**
   * DataTables.Api instance. This is read-only.
   * @type {DataTables.Api}
   */
  public get api(): DataTables.Api {
    return this.#dt;
  }

  /**
   * Table Element.
   * @type {JQuery}
   */
  #element: JQuery;

  /**
   * DataTables.Api instance.
   * @type {DataTables.Api}
   */
  #dt: DataTables.Api;

  /**
   * Whether to read table data asynchronously.
   * @type {boolean}
   */
  #isAjax: boolean = false;

  /**
   * If asynchronous mode (options.ajax) is enabled, whether to request table data remotely first.
   * If true, request table data first; if false, do not request table data until the Datatable.reload method is called.
   * Default is true.
   * @type {boolean}
   */
  #firstAjax: boolean = true;

  /**
   * Finalized options.
   * @type {DatatableOptions|null}
   */
  #options: DatatableOptions|null = null;

  /**
   * Whether to enable the ajax option on reload.
   * @type {boolean}
   */
  #enableAjaxOnReload: boolean = false;

  /**
   * Create a new instance of the Datatable class.
   * @param {string|HTMLTableElement|JQuery} element HTMLTableElement selector, element, or JQuery object.
   * @param {DatatableOptions} options An object with the following custom options inherited from <a href="https://datatables.net/reference/option/" target="_blank">DataTables.Settings</a>.
   */
  public constructor(element: string|HTMLTableElement|JQuery, options: DatatableOptions) {
    // Check parameters.
    if (isString(element))
      this.#element = $(element as string);
    else if (element instanceof HTMLTableElement)
      this.#element = $(element);
    else if (element instanceof $)
      this.#element = element as JQuery;
    else
      throw new TypeError('element parameter should be HTMLTableElement selectors, elements, and JQuery object');

    // Initialize options.
    options = this.#initOptions(options);

    // Do we request table data asynchronously first?
    this.#firstAjax = options.firstAjax !== false;

    // Save the finalized options.
    this.#options = {...options} as DatatableOptions;

    // Determine if data is read asynchronously first.
    if (this.#isAjax && !this.#firstAjax) {
      // Remove the ajax option from the Apply option if you do not want to retrieve data asynchronously first.
      delete options.ajax;

      // Disable server-side processing.
      options.serverSide = false;

      // Enable ajax option on reload.
      this.#enableAjaxOnReload = true;
    }

    // Initialize DataTable.
    this.#dt = this.#element
      .on('draw.dt', () => {
        // Immediately after drawing the DataTable, hide the data-reading message.
        $("#table_processing").hide();
      })
      .DataTable(options);

    // In order to display the loading image in the center, set the "position" of the parent element of the loading image (.dataTables_processing) to "relative".
    $('#table_processing')
      .parent()
      .css('position', 'relative');

    // Readjust the column widths once the window is resized.
    $(window).on('resize', () => this.adjustColumns());
  }

  /**
   * Reload the table data from the Ajax data source.
   * @param {boolean} resetPaging Reset (default action or true) or hold the current paging position (false).
   * @return {Promise<any>} JSON data returned by the server.
   */
  public async reload(resetPaging: boolean = false): Promise<any> {
    if (this.#enableAjaxOnReload) {
      // If data was not acquired asynchronously at the beginning, data acquisition is enabled asynchronously on reload.
      // Do not rebuild options on next reload.
      this.#enableAjaxOnReload = false;

      // Rebuild DataTable with asynchronous data acquisition enabled.
      this.#dt.destroy();
      this.#dt = this.#element.DataTable(this.#options as DatatableOptions);
    }
    return new Promise<any>(resolve => {
      this.#dt.ajax.reload(((json: any) => {
        resolve(json);
      }), resetPaging);
    });
  }

  /**
   * Adjust column layout.
   */
  public adjustColumns(): void {
    this.#dt.columns.adjust();
  }

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
  public filter(columnSelector: any, input: string, regex: boolean = false): void {
    // If regular expressions are enabled, disable smart search.
    const smart = !regex;

    // It is case-insensitive.
    const caseInsen = true;
    this.#dt
      .column(columnSelector)
      .search(input, regex, smart, caseInsen)
      .draw();
  }

  /**
   * Returns a table wrapper element.
   * @param {boolean} asHtmlElement If true, get it as an HTMLElement, if false, get it as a jQuery object. Default is false.
   * @return {JQuery|HTMLElement} Table wrapper element.
   */
  public getContainer(asHtmlElement: boolean = false): JQuery|HTMLElement {
    // Table selector to select which table you want to operate on.
    const tableSelector = undefined;

    // Get table wrapper element.
    const wrapper = this.#dt.table(tableSelector).container() as HTMLElement;

    // Returns the table wrapper element.
    return asHtmlElement ? wrapper : $(wrapper);
  }

  /**
   * Returns a table filter container element.
   * @param {boolean} asHtmlElement If true, get it as an HTMLElement, if false, get it as a jQuery object. Default is false.
   * @return {JQuery|HTMLElement|null} Filter container element.
   */
  public getFilterContainer(asHtmlElement: boolean = false): JQuery|HTMLElement|null {
    // Get table wrapper element.
    const wrapper = this.getContainer(false) as JQuery;

    // Find the filter container element.
    const container = wrapper.find('.dataTables_filter:first');
    if (container.length === 0)
      // If there is no filter container element, null is returned.
      return null;

    // Returns the filter container elements found.
    return asHtmlElement ? container.get(0) as HTMLElement : container;
  }

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
  public createRow(data: any, paging: boolean = true): Datatable {
    this.#dt.row
      .add(data)
      .draw(paging);
    return this;
  }

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
  public deleteRow(rowSelector: any): Datatable {
    // Find the row to be deleted.
    const row = this.#dt.row(rowSelector);

    // Delete row.
    row.remove();

    // Redraw the table to reflect the deletion.
    row.draw();
    return this;
  }

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
  public updateRow(rowSelector: any, data: any[]|object, redraw: boolean = true): Datatable {
    const row = this.#dt.row(rowSelector);
    row.data(Object.assign(row.data(), data));
    if (redraw)
      row.draw(true);
    return this;
  }

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
  public getRowData(rowSelector?: any): any[]|object {
    return rowSelector !== undefined ?
      this.#dt.row(rowSelector).data() :
      this.#dt.rows().data().toArray();
  }

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
  public getRowCount(rowSelector: any = undefined): number {
    return this.#dt
      .rows(rowSelector)
      .count();
  }

  /**
   * Get row HTML elements.
   * @return {HTMLTableRowElement[]} HTML elements of row.
   */
  public getRowNodes(): HTMLTableRowElement[] {
    return <HTMLTableRowElement[]>this.#dt
      .rows()
      .nodes()
      .to$()// Convert to a jQuery object
      .toArray();
  }

  /**
   * Get the DataTable API instance containing the selected rows.
   * @param {any} rowSelector Row selector. See <a href="https://datatables.net/reference/type/row-selector" target="_blank">here</a> for more information.
   * @return {DataTables.RowsMethods} DataTable API instance containing the selected rows.
   */
  public getRowObject(rowSelector: any): DataTables.RowsMethods {
    return this.#dt.rows(rowSelector);
  }

  /**
   * Select the column found by a the column selector.
   * @param {any} columnSelector Column selector. See <a href="https://datatables.net/reference/type/column-selector" target="_blank">here</a> for more information.
   * @param {DataTables.ObjectSelectorModifier|undefined} modifier? Specifies the order, paging, and filtering status of the selected columns. Default is none (undefined). See <a href="https://datatables.net/reference/type/selector-modifier" target="_blank">here</a> for more information.
   * @return {DataTables.ColumnMethods} DataTable API instance with selected column in the result set.
   */
  public column(columnSelector: any, modifier?: DataTables.ObjectSelectorModifier): DataTables.ColumnMethods {
    return this.#dt.column(columnSelector, modifier);
  }

  /**
   * Clear the table of all data.
   * @return {Datatable}
   */
  public clear(): Datatable {
    this.#dt.clear().draw();
    return this;
  }

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
  protected ajaxErrorHook(httpStatusCode: number, xhr: XMLHttpRequest): void {}

  /**
   * Initialize options.
   */
  #initOptions(options: DatatableOptions): DatatableOptions {
    // Asynchronous data acquisition.
    this.#isAjax = !!options.ajax;

    // Whether the data acquisition method is Ajax
    if (this.#isAjax && (isString(options.ajax) || isPlainObject(options.ajax))) {
      // If the ajax option is a URL string, convert it to object format.
      if (isString(options.ajax))
        options.ajax = {url: options.ajax as string};

      // For Ajax, send a cookie to the server.
      (options.ajax as DataTables.AjaxSettings).xhrFields = {
        withCredentials: true
      };

      // Add an element called "actions" corresponding to columns such as edit button and delete button to the record of response data.
      // [caution]An error will occur if there is no data corresponding to the column.
      const dataSrc = (options.ajax as DataTables.AjaxSettings).dataSrc||undefined;
      (options.ajax as DataTables.AjaxSettings).dataSrc = (res: any): any[] => {
        // Add action field to row data only if data element is present.
        if (res.data)
          res.data = res.data.map((row: object) => Object.assign(row, {actions: ''}));
        if (dataSrc)
          res = (dataSrc as (data: any) => any)(res);
        return res.data || res;
      }

      // Error Handling.
      (options.ajax as DataTables.AjaxSettings).error = (xhr: any) => {
        console.log(`Response error. Status: ${xhr.status}`);
        this.ajaxErrorHook(xhr.status, xhr as XMLHttpRequest);
      };
    }

    // Save drawCallback options.
    let drawCallback: DataTables.FunctionDrawCallback|undefined;
    if ('drawCallback' in options) {
      drawCallback = options.drawCallback;
      delete options.drawCallback;
    }

    // Save createdRow options.
    let createdRow: DataTables.FunctionCreateRow|undefined;
    if ('createdRow' in options) {
      createdRow = options.createdRow;
      delete options.createdRow;
    }

    // Locale of the displayed text.
    const locale = options.locale || 'en';

    // Strings used in the user interface.
    const language = (locale === 'en' || locale !== 'ja') ?
      {
        sEmptyTable: 'No data available in table',
        sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
        sInfoEmpty: 'Showing 0 to 0 of 0 entries',
        sInfoFiltered: '(filtered from _MAX_ total entries)',
        sInfoPostFix: '',
        sInfoThousands: ',',
        sLengthMenu: 'Show _MENU_ entries',
        sLoadingRecords: '&nbsp;',
        sProcessing: '<div class="datatable-spinner"></div>',
        //sLoadingRecords: Loading...',
        sSearch: `<span class="svg-icon svg-icon-muted svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect x="0" y="0" width="24" height="24"/>
                      <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                      <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
                    </g>
                  </svg></span>`,
        sSearchPlaceholder: 'Search...',
        sZeroRecords: 'No matching records found',
        // oPaginate: {
        //   sFirst: 'First',
        //   sLast: 'Last',
        //   sNext: 'Next',
        //   sPrevious: 'Previous'
        // },
        oAria: {
          sSortAscending: ': activate to sort column ascending',
          sSortDescending: ': activate to sort column descending'
        }
      } : {
        sEmptyTable: '該当データはありません',
        sInfo: '_TOTAL_ 件中 _START_ から _END_ まで表示',
        sInfoEmpty: '0 件中 0 から 0 まで表示',
        sInfoFiltered: '（全 _MAX_ 件より抽出）',
        sInfoPostFix: '',
        sInfoThousands: ',',
        sLengthMenu: '_MENU_ 件表示',
        sLoadingRecords: '&nbsp;',
        sProcessing: '<div class="datatable-spinner"></div>',
        //sLoadingRecords: '読み込み中...',
        sSearch: `<span class="svg-icon svg-icon-muted svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect x="0" y="0" width="24" height="24"/>
                      <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                      <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
                    </g>
                  </svg></span>`,
        sSearchPlaceholder: 'キーワードを入力',
        sZeroRecords: '該当データはありません',
        // oPaginate: {
        //   sFirst: '先頭',
        //   sLast: '最終',
        //   sNext: '次',
        //   sPrevious: '前'
        // },
        oAria: {
          sSortAscending: ': 列を昇順に並べ替えるにはアクティブにする',
          sSortDescending: ': 列を降順に並べ替えるにはアクティブにする'
        }
      };
    return merge({
      locale: 'en',
      firstAjax: true,
      scrollX: true,
      dom: `<'row'<'col-12 dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
      // dom: `<'row'<'col-12'f>><'row'<'col-12 dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
      pageLength: 30,
      searchDelay: 500,
      processing: true,
      serverSide: 'ajax' in options,
      createdRow: (row: Node, data: any, dataIndex: number, cells: Node[]) => {
      // createdRow: (row: Node, data: any[] | object, dataIndex: number, cells: Node[]) => {
        // Add the data ID to the tr element.
        if (data.id)
          $(row).attr('data-id', data.id);

        // Execute an optional callback function.
        if (createdRow)
          createdRow(row, data, dataIndex, cells);
      },
      drawCallback: (settings: DataTables.SettingsLegacy) => {
        // Initialize the tooltip in the dynamically added line.
        initTooltip(this.#element);

        // Initialize drop-down menu buttons for dynamically added rows.
        const menuSelector = `#${settings.sTableId} [data-kt-menu="true"]`;
        window.KTMenu.createInstances(menuSelector);

        // Execute an optional callback function.
        if (drawCallback)
          drawCallback(settings);
      },
      fnServerParams: (aoData: any) => {
        const columns = Object.assign({}, aoData.columns);
        delete aoData.columns;
        if (aoData.order.length > 0) {
          const {column, dir} = aoData.order[0];
          aoData.order = columns[column].data;
          aoData.dir = dir;
        } else {
          aoData.order = null;
          aoData.dir = null;
        }
        aoData.search = aoData.search.value;
      },
      language,
    }, options);
  }
}