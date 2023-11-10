import isString from "~/utils/isString";

/**
 * Trim blanks before and after.
 * @param {string|null|undefined} str String to be trimmed.
 * @param {boolean} toLower? If true, the trimmed string is converted to lowercase and returned. Default is false.
 * @return {string|null|undefined} Trimmed string.
 * @throws {TypeError} Value is not a string.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 * 
 * utils.trim('  foo bar  ');// -> 'foo bar'
 * utils.trim('\n\n\nfoo bar\n\r\n\n');// -> 'foo bar'
 * ```
 */
export default (str: string|null|undefined, toLower = false): string|null|undefined => {
  if (str == null)
    // If the value is null or undefined, the value is returned as is.
    return str;
  else if (!isString(str))
    // If the value is not a string, an error is returned.
    throw new TypeError('Value should be a string');

  // Remove the blanks before and after.
  str =  str.replace(/^[\s　]+|[\s　]+$/g, '');

  // Convert to lowercase if the lowercase option is enabled.
  if (toLower)
    str = str.toLowerCase();
  return str;
}