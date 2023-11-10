import isKana from '~/validators/isKana';
import isEmpty from '~/utils/isEmpty';

/**
 * Check if it is katakana (half-width and full-width numbers are also permitted).
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isKana(input.value)};
  }
})