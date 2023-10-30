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
declare const _default: (value: string, options?: IsFQDNOptions) => boolean;
export default _default;
