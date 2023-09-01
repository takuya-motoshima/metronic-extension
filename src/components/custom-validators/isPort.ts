import isPort from '~/validators/isPort';
import isEmpty from '~/misc/isEmpty';

/**
 * Check if it is a port number.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isPort(input.value)};
  }
})