import isPhoneNumberJp from '~/validators/isPhoneNumberJp';
import isEmpty from '~/utils/isEmpty';

/**
 * Check if it is a Japanese phone number.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isPhoneNumberJp(input.value)};
  }
})