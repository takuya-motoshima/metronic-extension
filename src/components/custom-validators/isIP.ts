import isIP from '~/validators/isIP';
import isEmpty from '~/misc/isEmpty';
import IsIPValidateOptions from '~/interfaces/IsIPValidateOptions';

/**
 * Validate IP.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsIPValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isIP(input.value, input.options)};
  }
})