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
export default (value: string): boolean => {
  // UNIX path regular expression.
  // Based on the "/^(\/|(\/[\w\s@^!#$%&-]+)+(\.[a-z]+\/?)?)$/i" regular expression, the leading and trailing slashes have been improved to be optional.
  const re = /^(\/|(\/?[\w\s@^!#$%&-\.]+)+\/?)$/i;

  // Returns validation results.
  return re.test(value);
}