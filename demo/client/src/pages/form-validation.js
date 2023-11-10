import {components} from 'metronic-extension';

// Search for elements.
const ref = components.selectRef();

// Initialize form validation.
const validation = new components.Validation(ref.myForm, {
  firstName: {
    validators: {
      notEmpty: {message: 'First name is required.'},
    }
  },
});

// Set form validation events.
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