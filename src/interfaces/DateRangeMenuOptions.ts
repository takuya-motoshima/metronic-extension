/**
 * Date Range menu option.
 */
export default interface DatePickerOptions {
  /**
   * Language Code (ja, en, etc.). Default is none (undefined).
   */
  locale?: string;

  /**
   * Date Format. Default is 'YYYY/M/D'.
   */
  format?: string;

  /**
   * Date selection range for initial display.
   * Can be either "today" (today) or "last30days" (last 30 days).
   * The default is 'today'.
   */
  initialRange?: 'today'|'last30days';

  /**
   * The name attribute of the hidden element that stores the date selection result. Default is none (undefined).
   */
  name?: string;

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

    /**
     * Custom Range menu label text. Default is 'Custom Range'.
     */
    customRangeMenuLabel: string;

    /**
     * Today menu label text. Default is 'Today'.
     */
    todayMenuLabel: string;

    /**
     * Yesterday menu label text. Default is 'Yesterday'.
     */
    yesterdayMenuLabel: string;

    /**
     * Last 7 Days menu label text. Default is 'Last 7 Days'.
     */
    last7DaysMenuLabel: string;

    /**
     * Last 30 Days menu label text. Default is 'Last 30 Days'.
     */
    last30DaysMenuLabel: string;

    /**
     * This Month menu label text. Default is 'This Month'.
     */
    thisMonthMenuLabel: string;

    /**
     * Last Month menu label text. Default is 'Last Month'.
     */
    lastMonthMenuLabel: string;
  };
}