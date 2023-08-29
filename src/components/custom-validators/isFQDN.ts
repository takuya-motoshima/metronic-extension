import isFQDN from '~/validators/isFQDN';
import isEmpty from '~/misc/isEmpty';
import IsFQDNValidateOptions from '~/interfaces/IsFQDNValidateOptions';

/**
 * Validate domain name (e.g. domain.com).
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isFQDN(input.value, input.options)};
  }
})