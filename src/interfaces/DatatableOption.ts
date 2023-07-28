/**
 * DataTable option.
 */
export default interface extends DataTables.Settings {
  /**
   * If asynchronous mode (options.ajax) is enabled, whether to request table data remotely first.
   * If true, request table data first; if false, do not request table data until the Datatable.reload method is called.
   * Default is true.
   * @type {boolean|undefined}
   */
  firstAjax?: boolean,

  /**
   * Locale of the displayed text. Default is English (en).
   * @type {'en'|'ja'}
   */
  locale?: 'en'|'ja',
}