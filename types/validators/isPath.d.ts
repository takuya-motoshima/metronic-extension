/**
 * Check if it is a file (directory) path
 * @param {string} value Value to be validated.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * // With leading slash, without trailing slash.
 * validators.isPath('/');
 * validators.isPath('/usr');
 * validators.isPath('/usr/lib');
 *
 * // With leading and trailing slashes.
 * validators.isPath('/usr/');
 * validators.isPath('/usr/lib/');
 *
 * // Without leading slash, with trailing slash.
 * validators.isPath('usr/');
 * validators.isPath('usr/lib/');
 * ```
 */
declare const _default: (value: string) => boolean;
export default _default;
