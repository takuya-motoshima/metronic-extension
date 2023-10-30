import validator from 'validator';
import {merge} from 'deep-fusion';
import IsFQDNOptions from '~/interfaces/IsFQDNOptions';

/**
 * Check if the domain name is fully qualified (e.g. domain.com).
 * @param {string} value Value to be validated.
 * @param {boolean} options.requireFQDNTld? If true, the TLD is required. Default is true.
 * @param {boolean} options.allowFQDNWildcard? If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 * 
 * validators.isFQDN('domain.com');
 * validators.isFQDN('localhost', {requireFQDNTld: false});
 * validators.isFQDN('*.example.com', {allowFQDNWildcard: true});
 * ```
 */
export default (value: string, options?: IsFQDNOptions): boolean => {
  // Initialize options.
  options = merge({
    requireFQDNTld: true,
    allowFQDNWildcard: false,
  }, options);

  // Returns validation results.
  return validator.isFQDN(value, {
    require_tld: options?.requireFQDNTld,// If true, the TLD is required. Default is true.
    allow_underscores: false,// If true, allows the use of underscore characters in the domain. Default is false.
    allow_trailing_dot: false,// If true, remove the trailing dot from the domain before checking for validity. Default is false.
    allow_numeric_tld: false,// If true, allow numeric-only TLDs. Default is false.
    allow_wildcard: options?.allowFQDNWildcard,// If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
  });
}