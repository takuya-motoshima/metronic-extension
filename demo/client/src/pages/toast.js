import {Toast} from 'metronic-extension';

// Toggle Success.
$('[data-on-success]').on('click', () => {
  Toast.success('This is a toast message', 'Toast Title');
});

// Toggle Error.
$('[data-on-error]').on('click', () => {
  Toast.error('This is a toast message', 'Toast Title');
});

// Toggle Warning.
$('[data-on-warning]').on('click', () => {
  Toast.warning('This is a toast message', 'Toast Title');
});

// Toggle Info.
$('[data-on-info]').on('click', () => {
  Toast.info('This is a toast message', 'Toast Title');
});