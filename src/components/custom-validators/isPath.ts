import isPath from '~/validators/isPath';
import isEmpty from '~/misc/isEmpty';

/**
 * Check if it is a file (directory) path
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isPath(input.value)};
  }
})