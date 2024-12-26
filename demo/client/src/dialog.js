import {components} from 'metronic-extension';

// Toggle Confirm.
$('[data-on-confirm]').on('click', async() => {
  const isConfirmed = await components.Dialog.confirm("Here's an example of confirm dialog.", {confirmButtonText: 'Yes', cancelButtonText: 'No'});
  alert(`Response is ${isConfirmed}`);
});

// Toggle Success.
$('[data-on-success]').on('click', () => {
  components.Dialog.success("Here's an example of success dialog.");
});

// Toggle Success with cancel button.
$('[data-on-success-with-cancel-button]').on('click', async () => {
  const isConfirmed = await components.Dialog.success("Here's an example of success dialog.", {showCancelButton: true});
  alert(`Response is ${isConfirmed}`);
});

// Toggle Error.
$('[data-on-error]').on('click', () => {
  components.Dialog.error("Here's an example of error dialog.");
});

// Toggle Unknown error.
$('[data-on-unknown-error]').on('click', () => {
  components.Dialog.unknownError();
});

// Toggle Warning.
$('[data-on-warning]').on('click', () => {
  components.Dialog.warning("Here's an example of warning dialog.");
});

// Toggle Info.
$('[data-on-info]').on('click', () => {
  components.Dialog.info("Here's an example of info dialog.");
});

// Toggle Loading.
$('[data-on-loading]').on('click', () => {
  components.Dialog.loading("Here's an example of loading dialog.");
  setTimeout(() => components.Dialog.close(), 2000);
});