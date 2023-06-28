import moment from 'moment';
import fusion from 'deep-fusion';
import DatePickerOption from '~/interfaces/DatePickerOption';

/**
 * Initialize the date picker.
 */
export default (input: HTMLInputElement|JQuery, options?: DatePickerOption): daterangepicker => {
  // Check the argument.
  if (input instanceof HTMLInputElement)
    input = $(input);
  else if (!(input instanceof $))
    throw new TypeError('The input parameter specifies an HTMLInputElement or a JQuery object of HTMLInputElement');

  // Initialize options.
  options = fusion({
    minDate: undefined,
    maxDate: undefined,
    locale: undefined,
    format: 'YYYY/M/D',
    language: {
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
    },
    autoUpdateInput: true,
  }, options);

  // Set date locales.
  if (options!.locale)
    moment.locale(options?.locale);

  // Initialize Date Range Picker.
  return (input as JQuery)
    .on('apply.daterangepicker', (evnt: Event, picker: daterangepicker.DateRangePicker) => {
      // Triggered when the apply button is clicked, or when a predefined range is clicked.
      if (!picker)
        return;

      // If the autoUpdateInput option is false, the selected date is not reflected in the display and the display value must be set manually.
      if (!options!.autoUpdateInput) {
        const format = picker.locale.format;
        picker.element.val(`${picker.startDate.format(format)} - ${picker.endDate.format(format)}`);
      }
    })
    .on('cancel.daterangepicker', (evnt: Event, picker: daterangepicker.DateRangePicker) => {
      // After selecting the Cancel button, the input is cleared.
      picker.element.val('').trigger('apply.daterangepicker');
    })
    .daterangepicker({
      autoUpdateInput: options!.autoUpdateInput,
      // autoApply: true,
      minDate: options!.minDate,
      maxDate: options!.maxDate,
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