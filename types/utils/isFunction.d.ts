/**
 * Check if it is a function.
 * @param {any} payload The value to test.
 * @return {boolean} True for function, false otherwise.
 * @example
 * ```js
 * import {isFunction} from 'metronic-extension';
 *
 * isFunction(function func() {});// -> true
 * isFunction(async function func() {});// -> false
 * isFunction(true);// -> false
 * isFunction(false);// -> false
 * isFunction(null);// -> false
 * isFunction(undefined);// -> false
 * isFunction({});// -> false
 * isFunction([]);// -> false
 * isFunction(/a/g);// -> false
 * isFunction('string');// -> false
 * isFunction(42);// -> false
 * isFunction(new Date());// -> false
 * ```
 */
declare const _default: (payload: any) => boolean;
export default _default;
