import isIP from '~/validators/isIP';
import isEmpty from '~/misc/isEmpty';

/**
 * IP Validate Option.
 */
interface Options extends FormValidation.core.ValidateOptions {
  /**
   * 4 or 6. The default is undefind (allows both versions 4 and 6).
   */
  version?: '4'|'6';

  /**
   * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
   */
  allowRange?: boolean;
}

/**
 * Validate IP.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<Options, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isIP(input.value, input.options)};
  }
})