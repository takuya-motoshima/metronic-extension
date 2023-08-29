import isFQDNorIP from '~/validators/isFQDNorIP';
import isEmpty from '~/misc/isEmpty';
import IsFQDNorIPValidateOptions from '~/interfaces/IsFQDNorIPValidateOptions';

/**
 * Validate the domain name (e.g. domain.com) or IP.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNorIPValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isFQDNorIP(input.value, input.options)};
  }
})