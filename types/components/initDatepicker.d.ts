import DatePickerOptions from '~/interfaces/DatePickerOptions';
/**
 * Initialize date range picker.
 * @param {string|HTMLInputElement|JQuery} element HTMLInputElement selector, element, or JQuery object.
 * @param {string} options.minDate? The earliest date a user may select. Default is none (undefined).
 * @param {string} options.maxDate? The latest date a user may select. Default is none (undefined).
 * @param {number} options.maxDays? Maximum number of days that can be selected. Default is indefinite (undefined).
 * @param {string} options.locale? Language Code (ja, en, etc.). Default is none (undefined).
 * @param {string} options.format? Date Format. Default is 'YYYY/M/D'.
 * @param {string} options.language.applyLabel? Apply button text. Default is 'Apply'.
 * @param {string} options.language.cancelLabel? Cancel button text. Default is 'Cancel'.
 * @param {boolean} options.autoUpdateInput? Indicates whether the date range picker should automatically update the value of the <input> element it's attached to at initialization and when the selected dates change. Default is true.
 * @return {daterangepicker} daterangepicker instance.
 * @example
 * HTML:
 * ```html
 * <!--begin::Input group-->
 * <div>
 *   <!--begin::Label-->
 *   <label class="form-label">Basic example</label>
 *   <!--end::Label-->
 *   <!--begin::Input-->
 *   <input id="dateRangePicker" class="form-control form-control-solid" placeholder="Pick date range">
 *   <!--end::Input-->
 * </div>
 * <!--end::Input group-->
 * ```
 *
 * JS:
 * ```js
 * import {components} from 'metronic-extension';
 *
 * // Initialize date range picker.
 * const dateRangePicker = components.initDatepicker(document.getElementById('dateRangePicker'), {
 *   minDate: moment().format('YYYY/M/D'),
 *   maxDate: moment().endOf('month').format('YYYY/M/D'),
 *   maxDays: 7,
 *   locale: 'en',
 *   format: 'YYYY/M/D',
 *   language: {
 *     applyLabel: 'OK',
 *     cancelLabel: 'Cancel',
 *   }
 * });
 * ```
 */
declare const _default: (element: string | HTMLInputElement | JQuery, options?: DatePickerOptions) => daterangepicker;
export default _default;
