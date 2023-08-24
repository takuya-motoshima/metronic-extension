import isDirectory from '~/validators/isDirectory';
import isEmpty from '~/misc/isEmpty';

/**
 * Validate directory name.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isDirectory(input.value)};
  }
})