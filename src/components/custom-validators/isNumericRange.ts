import isNumericRange from '~/validators/isNumericRange';
import isEmpty from '~/misc/isEmpty';

/**
 * Numeric Range Validate Option.
 */
interface Options extends FormValidation.core.ValidateOptions {
  min: string;
  max: string;
}

/**
 * Validate numerical range.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<Options, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isNumericRange(input.value, input.options!)};
  }
})