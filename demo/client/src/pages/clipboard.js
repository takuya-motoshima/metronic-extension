import {initClipboard} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();

// Copy when the button is clicked.
initClipboard(document.querySelector('#coppyButton'));

// It is also possible to specify a context element and apply the copy function to all button elements with the data-clipboard-target attribute under the context element at once.
initClipboard(document.body);
initClipboard(document.querySelector('#kt_body'));