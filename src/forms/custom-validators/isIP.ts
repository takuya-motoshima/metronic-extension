import isIP from '~/validators/isIP';
import isEmpty from '~/utils/isEmpty';
import IsIPOptions from '~/interfaces/IsIPOptions';

/**
 * Check for IP (version 4 or 6).
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsIPOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isIP(input.value, input.options)};
  }
})