import {components} from 'metronic-extension';

// Get DOM element references.
const ref = components.selectRef();

// Initialize the component and set up event listeners.
const blockUI = new components.BlockUI(ref.target, 'Loading...', false);

$('body').on('click', '[data-on-block]', () => {
  if (blockUI.isBlocked()) {
    // If currently blocking, unblock.
    blockUI.release();

    // Changed block button text.
    ref.blockButton.text('Block');
  } else {
    // If not currently blocking, block.
    blockUI.block();

    // Changed block button text.
    ref.blockButton.text('Release');
  }
});