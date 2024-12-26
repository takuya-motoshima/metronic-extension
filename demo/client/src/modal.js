import ExampleModal from '~/modals/ExampleModal';
import ExampleFullscreenModal from '~/modals/ExampleFullscreenModal';
import ExampleScrollingLongContentModal from '~/modals/ExampleScrollingLongContentModal';
import ExampleAjaxModal from '~/modals/ExampleAjaxModal';

// Initialize the component and set up event listeners.
const exampleModal = new ExampleModal();
const exampleFullscreenModal = new ExampleFullscreenModal();
const exampleScrollingLongContentModal = new ExampleScrollingLongContentModal();
const exampleAjaxModal = new ExampleAjaxModal();

$('body')
  .on('click', '[data-on-show-modal]', async () => {
    // Show Modal.
    const res = await exampleModal.show('Modal title', 'Modal body text goes here');

    // Check modal response. True if the "Save changes" button is clicked, false if the "Cancel" button is clicked.
    console.log(`Response is ${res}`);
  })
  .on('click', '[data-on-show-fullscreen-modal]', () => {
    exampleFullscreenModal.show('Modal title', 'Modal body text goes here');
  })
  .on('click', '[data-on-show-scrolling-long-content-modal]', () => {
    exampleScrollingLongContentModal.show('Modal title');
  })
  .on('click', '[data-on-show-ajax-modal]', () => {
    exampleAjaxModal.show('Modal title');
  });
