import {BlockUI, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const blockUI = new BlockUI(ref.target, 'Loading...', false);
$('body').on('click', '[data-on-block]', () => {
  if (blockUI.isBlocked()) {
    blockUI.release();
    ref.block.text('Block');
  } else {
    blockUI.block();
    ref.block.text('Release');
  }
});