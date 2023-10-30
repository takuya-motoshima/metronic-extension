/**
 * Date Range Picker options.
 */
export default interface DatePickerOptions {
    /**
     * The earliest date a user may select. Default is none (undefined).
     */
    minDate?: string;
    /**
     * The latest date a user may select. Default is none (undefined).
     */
    maxDate?: string;
    /**
     * Maximum number of days that can be selected. Default is indefinite (undefined).
     */
    maxDays?: number;
    /**
     * Language Code (ja, en, etc.). Default is none (undefined).
     */
    locale?: string;
    /**
      * Date Format. Default is 'YYYY/M/D'.
      */
    format?: string;
    /**
     * Strings used in the user interface.
     */
    language?: {
        /**
         * Apply button text. Default is 'Apply'.
         */
        applyLabel: string;
        /**
         * Cancel button text. Default is 'Cancel'.
         */
        cancelLabel: string;
    };
    /**
      * Indicates whether the date range picker should automatically update the value of the <input> element it's attached to at initialization and when the selected dates change. Default is true.
      */
    autoUpdateInput?: boolean;
}
