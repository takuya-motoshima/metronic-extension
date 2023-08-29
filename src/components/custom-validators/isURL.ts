import isURL from '~/validators/isURL';
import isEmpty from '~/misc/isEmpty';
import IsURLValidateOptions from '~/interfaces/IsURLValidateOptions';

/**
 * Validate URL.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsURLValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isURL(input.value, input.options)};
  }
})