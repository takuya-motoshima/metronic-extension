/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/shared/initCodeCopy.js
/**
 * Initialize the copy button on the code.
 */
/* harmony default export */ const initCodeCopy = (() => {
  // Find the .highlight block.
  for (let highlightBlock of document.querySelectorAll('.highlight')) {
    // Find the Copy button.
    const copyButton = highlightBlock.querySelector('button.highlight-copy');
    if (!copyButton)
      // If there is no copy button, it does nothing.
      continue;

    // Set up a copy event for the code on the copy button.
    const clipboard = new ClipboardJS(copyButton, {
      target: coppyButton => {
        // Find the .highlight element.
        const highlightBlock = coppyButton.closest('.highlight');

        // Find the tab panel under the .highlight block.
        const tabs = highlightBlock.querySelectorAll('.tab-pane');
        if (tabs.length > 0) {
          // If a tab panel is found, find the active tab.
          const activeTab = Array.from(tabs).find(tabPanel => tabPanel.classList.contains('active'));

          // Return the code element under the active tab.
          return activeTab ? activeTab.querySelector('.highlight-code') : null;
        } else
          // If there is no tab panel, the code element under the .highlight block is returned.
          return highlightBlock.querySelector('.highlight-code');
      }
    });
    clipboard.on('success', event => {
      // After copying, switch the caption of the Copy button to Copied.
      const copyButton = event.trigger;
      const caption = copyButton.innerHTML;
      copyButton.innerHTML = 'copied';
      event.clearSelection();
      setTimeout(() => {
        // After a certain period of time, the caption of the copy button is switched from copied to original text.
        copyButton.innerHTML = caption;
      }, 2000);
    });
  }
});
;// CONCATENATED MODULE: ./src/app.js



// Initialize the copy button on the code.
initCodeCopy();
/******/ })()
;