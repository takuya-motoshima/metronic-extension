/**
 * Check if it is a function.
 * @param {any} payload The value to test.
 * @return {boolean} True for function, false otherwise.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 *
 * utils.isFunction(function func() {});// -> true
 * utils.isFunction(async function func() {});// -> false
 * utils.isFunction(true);// -> false
 * utils.isFunction(false);// -> false
 * utils.isFunction(null);// -> false
 * utils.isFunction(undefined);// -> false
 * utils.isFunction({});// -> false
 * utils.isFunction([]);// -> false
 * utils.isFunction(/a/g);// -> false
 * utils.isFunction('string');// -> false
 * utils.isFunction(42);// -> false
 * utils.isFunction(new Date());// -> false
 * ```
 */
declare const _default: (payload: any) => boolean;
export default _default;
