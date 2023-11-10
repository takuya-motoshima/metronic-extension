/**
 * Check if it is a string.
 * @param {any} payload The value to test.
 * @return {boolean} True if string, false otherwise.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 *
 * utils.isString('a');// -> true
 * utils.isString(Object('a'));// -> true
 *
 * utils.isString([1, 2, 3]);// -> false
 * utils.isString(true);// -> false
 * utils.isString(new Date());// -> false
 * utils.isString(new Error());// -> false
 * utils.isString({0: 1, length: 1});// -> false
 * utils.isString(1);// -> false
 * utils.isString(/x/);// -> false
 * utils.isString(Symbol('a'));// -> false
 * ```
 */
declare const _default: (payload: any) => boolean;
export default _default;
