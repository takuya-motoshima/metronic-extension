/**
 * Date Range Picker option.
 */
export default interface {
  /**
   * The earliest date a user may select. Default is none (undefined).
   * @type string
   */
  minDate? :string,

  /**
   * The latest date a user may select. Default is none (undefined).
   * @type string
   */
  maxDate?: string,

  /**
   * Maximum number of days that can be selected. Default is indefinite (undefined).
   * @type number
   */
  maxDays?: number,

  /**
   * Language Code (ja, en, etc.). Default is none (undefined).
   * @type string
   */
  locale?: string,

  /**
    * Date Format. Default is 'YYYY/M/D'.
    * @type string
    */
  format: string,

  /**
   * Allows you to provide localized strings for buttons and labels, customize the date format, and change the first day of week for the calendars.
   * @type [key: string]: any
   */
  language?: {
    /**
     * Apply button text. Default is 'Apply'.
     * @type string
     */
    applyLabel: string,

    /**
     * Cancel button text. Default is 'Cancel'.
     * @type string
     */
    cancelLabel: string,
  }

  /**
    * Indicates whether the date range picker should automatically update the value of the <input> element it's attached to at initialization and when the selected dates change. Default is true.
    * @type boolean
    */
  autoUpdateInput: boolean,
}