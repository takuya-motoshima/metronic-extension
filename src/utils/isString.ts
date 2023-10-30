/**
 * Check if it is a string.
 * @param {any} payload The value to test.
 * @return {boolean} True if string, false otherwise.
 * @example
 * ```js
 * import {isString} from 'metronic-extension';
 * 
 * isString('a');// -> true
 * isString(Object('a'));// -> true
 * 
 * isString([1, 2, 3]);// -> false
 * isString(true);// -> false
 * isString(new Date());// -> false
 * isString(new Error());// -> false
 * isString({0: 1, length: 1});// -> false
 * isString(1);// -> false
 * isString(/x/);// -> false
 * isString(Symbol('a'));// -> false
 * ```
 */
export default (payload: any): boolean => {
  return typeof payload === 'string' || payload instanceof String;
}
