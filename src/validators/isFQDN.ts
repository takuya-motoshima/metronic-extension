import validator from 'validator';
import {merge} from 'deep-fusion';

/**
 * Domain name (e.g. domain.com) validation options.
 */
interface Options {
  /**
   * If true, the TLD is required. Default is true.
   */
  requireTld?: boolean;

  // /**
  //  * If true, allows the use of underscore characters in the domain. Default is false.
  //  */
  // allowUnderscores?: boolean;

  // /**
  //  * If true, remove the trailing dot from the domain before checking for validity. Default is false.
  //  */
  // allowTrailingDot?: boolean;

  // /**
  //  * If true, allow numeric-only TLDs. Default is false.
  //  */
  // allowNumericTld?: boolean;

  /**
    * If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`).
    */
  allowWildcard?: boolean;
}

/**
 * Validate domain name (e.g. domain.com).
 */
export default (value: string, options?: Options): boolean => {
  // Initialize options.
  options = merge({
    requireTld: true,
    // allowUnderscores: false,
    // allowTrailingDot: false,
    // allowNumericTld: false,
    allowWildcard: false,
  }, options);

  // Returns validation results.
  return validator.isFQDN(value, {
    require_tld: options?.requireTld,
    // NOTE: The RFC952 specification does not permit the inclusion of underscores in domain names because the RFC952 specification does not include underscores in the domain name naming conventions.
    allow_underscores: false,// allow_underscores: options?.allowUnderscores,

    // NOTE: The dot at the end of the domain name is not automatically removed.
    allow_trailing_dot: false,// allow_trailing_dot: options?.allowTrailingDot,

    // NOTE: No numeric TLDs are allowed.
    allow_numeric_tld: false,
    // // NOTE: Allow the use of numbers in the TLD, since domains with a number in the TLD actually exist.
    // allow_numeric_tld: true,
    allow_wildcard: options?.allowWildcard,
  });
}