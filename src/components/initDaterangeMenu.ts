// import moment from 'moment';
import hbs from 'handlebars-extd';
import {merge} from 'deep-fusion';
import isString from '~/utils/isString';
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
export default (element: string|HTMLDivElement|JQuery, options?: DateRangeMenuOptions): daterangepicker => {
  // Check parameters.
  if (isString(element))
    element = $(element as string);
  else if (element instanceof HTMLDivElement)
    element = $(element);
  else if (!(element instanceof $))
    throw new TypeError('element parameter should be HTMLDivElement selectors, elements, and JQuery object');

  // Initialize options.
  options = merge({
    locale: undefined,
    format: 'YYYY/M/D',
    initialRange: 'today',
    name: undefined,
    language: {
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      customRangeMenuLabel: 'Custom Range',
      todayMenuLabel: 'Today',
      yesterdayMenuLabel: 'Yesterday',
      last7DaysMenuLabel: 'Last 7 Days',
      last30DaysMenuLabel: 'Last 30 Days',
      thisMonthMenuLabel: 'This Month',
      lastMonthMenuLabel: 'Last Month',
    },
  }, options);

  // Variable width depending on the length of the text.
  element.css('width', 'fit-content');

  // Draw the contents of the date picker.
  element.html(hbs.compile(`<!--begin::Display range-->
                <div class="text-gray-600 fw-bold"></div>
                <!--end::Display range-->
                <i class="ki-duotone ki-calendar-8 fs-1 ms-2 me-0">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                  <span class="path6"></span>
                </i>
                <!--begin::Hidden input-->
                <input {{#if options.name}}name="{{options.name}}"{{/if}} type="hidden">
                <!--end::Hidden input-->`)({options}));

  // Find text display element.
  const display = element.find('div:first');

  // Find hidden element.
  const hidden = element.find('[type="hidden"]');

  // Get moment global object.
  const moment = window.moment;

  // Set date locales.
  if (options!.locale)
    moment.locale(options?.locale);

  // Decide on the first date to be displayed.
  let startDate = moment().subtract(29, 'days');
  let endDate = moment();
  if (options!.initialRange === 'today')
    startDate = endDate = moment();

  // Initialize Date Range Picker.
  const picker = (element as JQuery)
    .on('apply.daterangepicker', (evnt: Event) => {
      // Get date picker instance.
      const picker = $(evnt.currentTarget as HTMLDivElement).data('daterangepicker') as unknown as daterangepicker.DateRangePicker;

      // Triggered when the apply button is clicked, or when a predefined range is clicked.
      // The display switches depending on whether the selected date is a single date or a range of dates.
      const current = moment();
      const value = current.isSame(picker.startDate, 'day') && current.isSame(picker.endDate, 'day')
        ? picker.startDate.format(picker.locale.format)
        : picker.startDate.format(picker.locale.format) + ' - ' + picker.endDate.format(picker.locale.format);

      // Show selection value.
      display.text(value);

      // Set the selection value to a hidden element.
      hidden.val(value);
    })
    .daterangepicker({
      startDate,
      endDate,
      opens: 'left',
      ranges: {
        [options!.language!.todayMenuLabel]: [moment(), moment()],
        [options!.language!.yesterdayMenuLabel]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        [options!.language!.last7DaysMenuLabel]: [moment().subtract(6, 'days'), moment()],
        [options!.language!.last30DaysMenuLabel]: [moment().subtract(29, 'days'), moment()],
        [options!.language!.thisMonthMenuLabel]: [moment().startOf('month'), moment().endOf('month')],
        [options!.language!.lastMonthMenuLabel]: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      locale: {
        // direction: 'ltr',
        format: options!.format,
        // separator: ' - ',
        applyLabel: options!.language!.applyLabel,
        cancelLabel: options!.language!.cancelLabel,
        // weekLabel: 'W',
        customRangeLabel: options!.language!.customRangeMenuLabel,
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        // firstDay: moment.localeData().firstDayOfWeek(),
      },
    })
    .data('daterangepicker') as daterangepicker;

  // Call the apply.daterangepicker event to display the initial selection values.
  (element as JQuery).trigger('apply.daterangepicker');
  return picker;
}