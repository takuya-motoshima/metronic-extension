import {components} from 'metronic-extension';

// Get DOM element references.
const ref = components.selectRef();

// Initialize the component and set up event listeners.
const validation = new components.Validation(ref.myForm, {
  firstName: {
    validators: {
      notEmpty: {message: 'First name is required.'},
    }
  },
});

validation.onValid(async () => {
  // Show loader.
  validation.onIndicator();

  // Hide the loader after a certain time.
  setTimeout(() => {
    // Hide loader.
    validation.offIndicator();

    // Success Message.
    components.Dialog.success('Form has been successfully submitted!', {confirmButtonText: 'OK, got it!'});
  }, 2000);
});