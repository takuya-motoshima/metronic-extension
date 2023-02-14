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
  options = fusion({
    minDate: undefined,
    maxDate: undefined,
    locale: 'ja',
    language: {
      applyLabel: '決定',
      cancelLabel: '削除'
    }
  }, options);
  if (options!.locale)
    moment.locale(options?.locale);
  return (input as JQuery)
    .on('apply.daterangepicker', (evnt: Event, picker: daterangepicker.DateRangePicker) => {
      if (!picker)
        return;
      const format = picker.locale.format;
      picker.element.val(`${picker.startDate.format(format)} - ${picker.endDate.format(format)}`);
    })
    .on('cancel.daterangepicker', (evnt: Event, picker: daterangepicker.DateRangePicker) => {
      picker.element.val('').trigger('apply.daterangepicker');
    })
    .daterangepicker({
      timePicker: false,
      autoUpdateInput: false,
      // autoApply: true,
      showDropdowns: false,
      minDate: options!.minDate,
      maxDate: options!.maxDate,
      locale: {
        format: 'YYYY/M/D',
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        applyLabel: options!.language!.applyLabel,
        cancelLabel: options!.language!.cancelLabel
      }
    })
    .data('daterangepicker') as daterangepicker;
}