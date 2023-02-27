import {Dialog} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
$('body')
  .on('click', '[data-on-confirm]', async () => {
    const res = await Dialog.confirm('Here\'s a basic example of confirm dialog!', {confirmButtonText: 'Yes', cancelButtonText: 'No',});
    Dialog.info(`The return value is ${res}`);
  })
  .on('click', '[data-on-success]', () => {
    Dialog.success('Here\'s a basic example of success dialog!');
  })
  .on('click', '[data-on-error]', () => {
    Dialog.error('Here\'s a basic example of error dialog!');
  })
  .on('click', '[data-on-warning]', () => {
    Dialog.warning('Here\'s a basic example of warning dialog!');
  })
  .on('click', '[data-on-info]', () => {
    Dialog.info('Here\'s a basic example of info dialog!');
  })
  .on('click', '[data-on-unknown-error]', () => {
    Dialog.unknownError('The process was interrupted due to an error. Please try again.', {title: 'An unexpected error has occurred.'});
  })
  .on('click', '[data-on-loading]', () => {
    Dialog.loading('Here\'s a basic example of loading dialog!');
    setTimeout(() => Dialog.close(), 3000);
  });