import isUnixUserName from '~/validators/isUnixUserName';
import isEmpty from '~/misc/isEmpty';

/**
 * Check if it is a unix user name.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isUnixUserName(input.value)};
  }
})