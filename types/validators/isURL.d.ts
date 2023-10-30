import IsURLOptions from '~/interfaces/IsURLOptions';
/**
 * Check if it is a URL.
 * @param {string} value Value to be validated.
 * @param {boolean} options.requireFQDNTld? If true, the TLD is required. Default is true.
 * @param {boolean} options.allowFQDNWildcard? If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
 * @param {boolean} options.allowFragments? If true, allow fragment input. Default is false.
 * @param {boolean} options.allowQueryComponents? If true, allow input of query string. Default is false.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * validators.isURL('http://www.foobar.com/');
 * validators.isURL('HTTP://WWW.FOOBAR.COM/');
 * validators.isURL('http://www.foobar.com:23/');
 * validators.isURL('http://www.foobar.com/~foobar');
 * validators.isURL('http://127.0.0.1/');
 * validators.isURL('http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html');
 * validators.isURL('http://1337.com');
 *
 * validators.isURL('http://localhost/', {requireFQDNTld: false});
 * validators.isURL('http://localhost/foo.txt', {requireFQDNTld: false});
 * validators.isURL('http://127.0.0.1/', {requireFQDNTld: false});
 *
 * validators.isURL('https://example.com/*', {allowFQDNWildcard: true});
 * validators.isURL('https://*.example.com/*', {allowFQDNWildcard: true});
 * validators.isURL('https://www.example.com/*', {allowFQDNWildcard: true});
 * ```
 */
declare const _default: (value: string, options?: IsURLOptions) => boolean;
export default _default;
