import {components} from 'metronic-extension';

// Search for elements.
const ref = components.selectRef();

// Initialize loader.
const blockUI = new components.BlockUI(ref.target, 'Loading...', false);

// Initialize events.
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