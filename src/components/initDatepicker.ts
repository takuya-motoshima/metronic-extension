// import moment from 'moment';
import {merge} from 'deep-fusion';
import isString from '~/utils/isString';
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
export default (element: string|HTMLInputElement|JQuery, options?: DatePickerOptions): daterangepicker => {
  // Check parameters.
  if (isString(element))
    element = $(element as string);
  else if (element instanceof HTMLInputElement)
    element = $(element);
  else if (!(element instanceof $))
    throw new TypeError('element parameter should be HTMLInputElement selectors, elements, and JQuery object');

  // Initialize options.
  options = merge({
    minDate: undefined,
    maxDate: undefined,
    maxDays: undefined,
    locale: undefined,
    format: 'YYYY/M/D',
    language: {
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
    },
    autoUpdateInput: true,
  }, options);

  // Get moment global object.
  const moment = window.moment;

  // Set date locales.
  if (options!.locale)
    moment.locale(options?.locale);

  // Initialize Date Range Picker.
  return (element as JQuery)
    .on('apply.daterangepicker', (event: Event, picker: daterangepicker.DateRangePicker) => {
      // Triggered when the apply button is clicked, or when a predefined range is clicked.
      if (!picker)
        return;

      // If the autoUpdateInput option is false, the selected date is not reflected in the display and the display value must be set manually.
      if (!options!.autoUpdateInput) {
        const format = picker.locale.format;
        picker.element.val(`${picker.startDate.format(format)} - ${picker.endDate.format(format)}`);
      }
    })
    .on('cancel.daterangepicker', (event: Event, picker: daterangepicker.DateRangePicker) => {
      // After selecting the Cancel button, the input is cleared.
      picker.element.val('').trigger('apply.daterangepicker');
    })
    .daterangepicker({
      autoUpdateInput: options!.autoUpdateInput,
      // autoApply: true,
      minDate: options!.minDate,
      maxDate: options!.maxDate,
      maxSpan: options!.maxDays ? {days: options!.maxDays} : undefined,
      locale: {
        format: options!.format,
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        applyLabel: options!.language!.applyLabel,
        cancelLabel: options!.language!.cancelLabel
      },
      showDropdowns: false,
      timePicker: false,
    })
    .data('daterangepicker') as daterangepicker;
}