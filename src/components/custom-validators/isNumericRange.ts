import isNumericRange from '~/validators/isNumericRange';
import isEmpty from '~/misc/isEmpty';
import IsNumericRangeOptions from '~/interfaces/IsNumericRangeOptions';

/**
 * Check the range of numbers.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsNumericRangeOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isNumericRange(input.value, input.options!)};
  }
})