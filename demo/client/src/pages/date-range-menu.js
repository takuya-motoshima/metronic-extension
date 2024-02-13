import {components} from 'metronic-extension';

// Initialize date range menu.
const dateRangePicker = components.initDaterangeMenu(document.getElementById('dateRangeMenu'), {
  locale: 'en',
  format: 'YYYY/M/D',
  initialRange: 'today',
  name: 'date',
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
});
