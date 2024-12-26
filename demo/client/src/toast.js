import {components} from 'metronic-extension';

// Toggle Success.
$('[data-on-success]').on('click', () => {
  components.Toast.success('This is a toast message', 'Toast Title');
});

// Toggle Error.
$('[data-on-error]').on('click', () => {
  components.Toast.error('This is a toast message', 'Toast Title');
});

// Toggle Warning.
$('[data-on-warning]').on('click', () => {
  components.Toast.warning('This is a toast message', 'Toast Title');
});

// Toggle Info.
$('[data-on-info]').on('click', () => {
  components.Toast.info('This is a toast message', 'Toast Title');
});