import DateRangeMenuOptions from '~/interfaces/DateRangeMenuOptions';
/**
 * Initialize date range menu.
 * @param {string|HTMLDivElement|JQuery} element HTMLDivElement selector, element, or JQuery object.
 * @param {string} options.locale? Language Code (ja, en, etc.). Default is none (undefined).
 * @param {string} options.format? Date Format. Default is 'YYYY/M/D'.
 * @param {'today'|'last30days'} options.initialRange? Date selection range for initial display. Can be either "today" (today) or "last30days" (last 30 days). The default is 'today'.
 * @param {string} options.name? The name attribute of the hidden element that stores the date selection result. Default is none (undefined).
 * @param {string} options.language.applyLabel? Apply button text. Default is 'Apply'.
 * @param {string} options.language.cancelLabel? Cancel button text. Default is 'Cancel'.
 * @param {string} options.language.customRangeMenuLabel? Custom Range menu label text. Default is 'Custom Range'.
 * @param {string} options.language.todayMenuLabel? Today menu label text. Default is 'Today'.
 * @param {string} options.language.yesterdayMenuLabel? Yesterday menu label text. Default is 'Yesterday'.
 * @param {string} options.language.last7DaysMenuLabel? Last 7 Days menu label text. Default is 'Last 7 Days'.
 * @param {string} options.language.last30DaysMenuLabel? Last 30 Days menu label text. Default is 'Last 30 Days'.
 * @param {string} options.language.thisMonthMenuLabel? This Month menu label text. Default is 'This Month'.
 * @param {string} options.language.lastMonthMenuLabel? Last Month menu label text. Default is 'Last Month'.
 * @return {daterangepicker} daterangepicker instance.
 * @example
 * HTML:
 * ```html
 * <!--begin::Date Range Menu-->
 * <div id="dateRangeMenu" class="btn btn-sm btn-light d-flex align-items-center px-4"></div>
 * <!--end::Date Range Menu-->
 * ```
 *
 * JS:
 * ```js
 * import {components} from 'metronic-extension';
 *
 * // Initialize date range menu.
 * const dateRangePicker = components.initDaterangeMenu(document.getElementById('dateRangeMenu'), {
 *   locale: 'en',
 *   format: 'YYYY/M/D',
 *   initialRange: 'today',
 *   name: 'date',
 *   language: {
 *     applyLabel: 'Apply',
 *     cancelLabel: 'Cancel',
 *     customRangeMenuLabel: 'Custom Range',
 *     todayMenuLabel: 'Today',
 *     yesterdayMenuLabel: 'Yesterday',
 *     last7DaysMenuLabel: 'Last 7 Days',
 *     last30DaysMenuLabel: 'Last 30 Days',
 *     thisMonthMenuLabel: 'This Month',
 *     lastMonthMenuLabel: 'Last Month',
 *   },
 * });
 * ```
 */
declare const _default: (element: string | HTMLDivElement | JQuery, options?: DateRangeMenuOptions) => daterangepicker;
export default _default;
