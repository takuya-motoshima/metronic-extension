import IsFQDNorIPOptions from '~/interfaces/IsFQDNorIPOptions';
/**
 * Check for a fully qualified domain name (e.g. domain.com) or IP (version 4 or 6).
 * @param {string} value Value to be validated.
 * @param {boolean} options.requireFQDNTld? If true, the TLD is required. Default is true.
 * @param {boolean} options.allowFQDNWildcard? If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
 * @param {'4'|'6'|4|6} options.ipVersion? 4 or 6. The default is undefind (allows both versions 4 and 6).
 * @param {boolean} options.allowIPRange? If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * validators.isFQDNorIP('domain.com');
 * validators.isFQDNorIP('127.0.0.1');
 * validators.isFQDNorIP('127.0.0.1');
 * validators.isFQDNorIP('2001:db8:0000:1:1:1:1:1');
 * validators.isFQDNorIP('1.2.3.4', {ipVersion: 4});
 * validators.isFQDNorIP('::ffff:127.0.0.1', {ipVersion: 6});
 * ```
 */
declare const _default: (value: string, options?: IsFQDNorIPOptions) => boolean;
export default _default;
