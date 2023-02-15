import {Toast} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
$('body')
  .on('click', '[data-on-success]', () => {
    Toast.success('Hello, world! This is a toast message.');
  })
  .on('click', '[data-on-info]', () => {
    Toast.info('Hello, world! This is a toast message.');
  })
  .on('click', '[data-on-warning]', () => {
    Toast.warning('Hello, world! This is a toast message.');
  })
  .on('click', '[data-on-error]', () => {
    Toast.error('Hello, world! This is a toast message.');
  })
  .on('click', '[data-on-with-title]', () => {
    Toast.success('Hello, world! This is a toast message.', 'Title test.');
  });