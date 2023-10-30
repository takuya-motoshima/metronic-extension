/**
 * Trim blanks before and after.
 * @param {string|null|undefined} str String to be trimmed.
 * @param {boolean} toLower? If true, the trimmed string is converted to lowercase and returned. Default is false.
 * @return {string|null|undefined} Trimmed string.
 * @throws {TypeError} Value is not a string.
 * @example
 * ```js
 * import {trim} from 'metronic-extension';
 *
 * trim('  foo bar  ');// -> 'foo bar'
 * trim('\n\n\nfoo bar\n\r\n\n');// -> 'foo bar'
 * ```
 */
declare const _default: (str: string | null | undefined, toLower?: boolean) => string | null | undefined;
export default _default;
