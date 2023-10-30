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
export default (value: string): boolean => {
  // Returns validation results.
  return /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/.test(value);
}