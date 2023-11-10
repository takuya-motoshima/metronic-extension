import {components} from 'metronic-extension';

// Initialize clipboard.
components.initClipboard(document.getElementById('button'));

// Initialize the clipboards for all action buttons in the wrapper element.
components.initClipboard(document.getElementById('wrapper'));