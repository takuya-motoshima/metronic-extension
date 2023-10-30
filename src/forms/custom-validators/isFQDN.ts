import isFQDN from '~/validators/isFQDN';
import isEmpty from '~/utils/isEmpty';
import IsFQDNOptions from '~/interfaces/IsFQDNOptions';

/**
 * Check if the domain name is fully qualified (e.g. domain.com).
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isFQDN(input.value, input.options)};
  }
})