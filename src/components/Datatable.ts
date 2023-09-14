import {merge} from 'deep-fusion';
import initTooltip from '~/components/initTooltip';
import isString from '~/misc/isString';
import isPlainObject from '~/misc/isPlainObject';
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
  #table: JQuery;
  #dt: DataTables.Api;

  // Whether to read table data asynchronously.
  #isAjax: boolean = false;

  // If asynchronous mode (options.ajax) is enabled, whether to request table data remotely first.
  // If true, request table data first; if false, do not request table data until the Datatable.reload method is called.
  // Default is true.
  #firstAjax: boolean = true;

  // Finalized data table options.
  #options: DatatableOptions|null = null;

  // Whether to enable the ajax option on reload.
  #enableAjaxOnReload: boolean = false;

  /**
   * Initialization.
   */
  constructor(table: string|HTMLTableElement|JQuery, options: DatatableOptions) {
    // Check parameters.
    if (isString(table))
      this.#table = $(table as string);
    else if (table instanceof HTMLTableElement)
      this.#table = $(table);
    else if (table instanceof $)
      this.#table = table as JQuery;
    else
      throw new TypeError('For the table parameter, specify a character string, HTMLTableElement, or a JQuery object of HTMLTableElement');

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

    // Initialize data tables.
    this.#dt = this.#table
      .on('draw.dt', () => {
        // Immediately after drawing the data table, hide the data-reading message.
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
   * Object of the DataTables API.
   */
  get api(): DataTables.Api {
    return this.#dt;
  }

  /**
   * Reload the table data from the Ajax data source.
   *
   * @param {boolean} resetPaging Reset (default action or true) or hold the current paging position (false).
   * @return {Promise<any>} JSON data returned by the server.
   */
  async reload(resetPaging: boolean = false): Promise<any> {
    if (this.#enableAjaxOnReload) {
      // If data was not acquired asynchronously at the beginning, data acquisition is enabled asynchronously on reload.
      // Do not rebuild options on next reload.
      this.#enableAjaxOnReload = false;

      // Rebuild data tables with asynchronous data acquisition enabled.
      this.#dt.destroy();
      this.#dt = this.#table.DataTable(this.#options as DatatableOptions);
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
  adjustColumns(): void {
    this.#dt.columns.adjust();
  }

  /**
   * Filter row by the specified string.
   */
  filter(columnSelector: number|string|number[]|string[], input: string, regex: boolean = false): void {
    const smart = !regex;
    const caseInsen = true;
    this.#dt
      .column(columnSelector)
      .search(input, regex, smart, caseInsen)
      .draw();
  }

  /**
   * Returns a table wrapper element.
   */
  getContainer(): JQuery {
    const tableSelector = undefined;
    return $(this.#dt.table(tableSelector).container() as HTMLElement);
  }

  /**
   * Returns a table filter container element.
   */
  getFilterContainer(): JQuery {
    return this.getContainer().find('.dataTables_filter:first');
  }

  /**
   * Create a row.
   */
  createRow(data: any, paging: boolean = true): any {
    const node = this.#dt.row
      .add(data)
      .draw(paging);
    return node;
  }

  /**
   * Delete row.
   */
  deleteRow(rowSelector: any): void {
    const row = this.#dt.row(rowSelector);
    row.remove();
    row.draw();
  }

  /**
   * Update row.
   */
  updateRow(rowSelector: any, data: any, redraw = true): void {
    const row = this.#dt.row(rowSelector);
    row.data(Object.assign(row.data(), data));
    if (redraw)
      row.draw(true);
  }

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
  getRowData(rowSelector?: any): any {
    return rowSelector !== undefined ?
      this.#dt.row(rowSelector).data() :
      this.#dt.rows().data().toArray();
  }

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
  getRowCount(rowSelector: any = undefined): number {
    return this.#dt
      .rows(rowSelector)
      .count();
  }

  /**
   * Get the row nodes.
   */
  getRowNodes(): HTMLTableRowElement[] {
    return <HTMLTableRowElement[]>this.#dt
      .rows()
      .nodes()
      .to$()// Convert to a jQuery object
      .toArray();
  }

  /**
   * Get a row object.
   */
  getRowObject(rowSelector: any): DataTables.RowsMethods {
    return this.#dt.rows(rowSelector);
  }

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
        this.requestErrorHook(xhr.status, xhr as XMLHttpRequest);
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

    // Display text for each locale.
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
      // responsive: true,
      // scrollCollapse: true,
      scrollX: true,
      // Display page up and down.
      dom: `<'row'<'col-12'f>><'row'<'col-12 dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
      // dom: `<'row'<'col-12'f>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
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
        initTooltip(this.#table);

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
  requestErrorHook(code: number, xhr: XMLHttpRequest): void {}

  /**
   * Select the column found by a the column selector
   */
  column(columnSelector: any, modifier?: DataTables.ObjectSelectorModifier): DataTables.ColumnMethods {
    return this.#dt.column(columnSelector, modifier);
  }

  /**
   * Clear the table of all data.
   */
  clear(): Datatable {
    this.#dt.clear().draw();
    return this;
  }
}