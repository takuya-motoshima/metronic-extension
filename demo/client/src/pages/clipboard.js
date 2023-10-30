import {initClipboard} from 'metronic-extension';

// Initialize clipboard.
initClipboard(document.getElementById('button'));

// Initialize the clipboards for all action buttons in the wrapper element.
initClipboard(document.getElementById('wrapper'));