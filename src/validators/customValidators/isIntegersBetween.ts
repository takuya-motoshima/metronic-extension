import isEmpty from '~/misc/isEmpty';
import BetweenIntegersValidateOption from '~/interfaces/BetweenIntegersValidateOption';

/**
 * Validate an between integers.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<BetweenIntegersValidateOption, FormValidation.core.Localization>) => {
  // validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    if (isEmpty(input.value))
      return {valid: true};
    const value = parseInt(input.value, 10);
    if (!Number.isInteger(value))
      return {valid: false};
    const min = parseInt((input.options as BetweenIntegersValidateOption).min, 10);
    const max = parseInt((input.options as BetweenIntegersValidateOption).max, 10);
    return {valid: value >= min && value <= max};
  }
})
