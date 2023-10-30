/**
 * Check if it is a unix user name.
 * @param {string} value Value to be validated.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * validators.isUnixUserName('root');
 * validators.isUnixUserName('www-data');
 * validators.isUnixUserName('user$');
 * validators.isUnixUserName('user123');
 * validators.isUnixUserName('_user');
 * ```
 */
declare const _default: (value: string) => boolean;
export default _default;
