import {components} from 'metronic-extension';

// Initialize date range picker.
components.initDatepicker(document.getElementById('dateRangePicker'), {
  minDate: moment().format('YYYY/M/D'),
  maxDate: moment().endOf('month').format('YYYY/M/D'),
  maxDays: 7,
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