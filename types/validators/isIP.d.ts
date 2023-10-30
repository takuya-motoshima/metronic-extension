import IsIPOptions from '~/interfaces/IsIPOptions';
/**
 * Check for IP (version 4 or 6).
 * @param {string} value Value to be validated.
 * @param {'4'|'6'|4|6} options.ipVersion? 4 or 6. The default is undefind (allows both versions 4 and 6).
 * @param {boolean} options.allowIPRange? If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * validators.isIP('127.0.0.1');
 * validators.isIP('2001:db8:0000:1:1:1:1:1');
 * validators.isIP('1.2.3.4', {ipVersion: 4});
 * validators.isIP('fe80::a6db:30ff:fe98:e946', {ipVersion: 6});
 * validators.isIP('127.0.0.1/24', {allowIPRange: true});
 * validators.isIP('2001::/128', {allowIPRange: true});
 * ```
 */
declare const _default: (value: string, options?: IsIPOptions) => boolean;
export default _default;
