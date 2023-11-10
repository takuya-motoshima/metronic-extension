/**
 * Check if it is an asynchronous function.
 * @param {any} payload The value to test.
 * @return {boolean} True for asynchronous functions, false otherwise.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 *
 * utils.isAsyncFunction(async function asyncFunction() {});// -> true
 * utils.isAsyncFunction(function func() {});// -> false
 * utils.isAsyncFunction(true);// -> false
 * utils.isAsyncFunction(false);// -> false
 * utils.isAsyncFunction(null);// -> false
 * utils.isAsyncFunction(undefined);// -> false
 * utils.isAsyncFunction({});// -> false
 * utils.isAsyncFunction([]);// -> false
 * utils.isAsyncFunction(/a/g);// -> false
 * utils.isAsyncFunction('string');// -> false
 * utils.isAsyncFunction(42);// -> false
 * utils.isAsyncFunction(new Date());// -> false
 * ```
 */
declare const _default: (payload: any) => boolean;
export default _default;
