import isFQDNorIP from '~/validators/isFQDNorIP';
import isEmpty from '~/misc/isEmpty';
import IsFQDNorIPOptions from '~/interfaces/IsFQDNorIPOptions';

/**
 * Check for a fully qualified domain name (e.g. domain.com) or IP (version 4 or 6).
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNorIPOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isFQDNorIP(input.value, input.options)};
  }
})