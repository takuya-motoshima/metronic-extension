import {components} from 'metronic-extension';

// Initialize date range picker.
components.initDatepicker(document.getElementById('dateRangePicker'), {
  // Available for selection after today.
  minDate: moment().format('YYYY/M/D'),
  // Selectable only for the current month.
  maxDate: moment().endOf('month').format('YYYY/M/D'),
  // Up to 7 days can be selected.
  maxDays: 7,
  // Language is English.
  locale: 'en',
  format: 'YYYY/M/D',
  language: {
    applyLabel: 'OK',
    cancelLabel: 'Cancel',
  }
});

// No initial value Initialize date range picker.
components.initDatepicker(document.getElementById('noInitialValueDateRangePicker'), {
  // If the "autoUpdateInput" option is set to false, the initial input value will be empty.
  autoUpdateInput: false,
});