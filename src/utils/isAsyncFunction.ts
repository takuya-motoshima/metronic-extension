import getType from "~/utils/getType";

/**
 * Check if it is an asynchronous function.
 * @param {any} payload The value to test.
 * @return {boolean} True for asynchronous functions, false otherwise.
 * @example
 * ```js
 * import {isAsyncFunction} from 'metronic-extension';
 * 
 * isAsyncFunction(async function asyncFunction() {});// -> true
 * isAsyncFunction(function func() {});// -> false
 * isAsyncFunction(true);// -> false
 * isAsyncFunction(false);// -> false
 * isAsyncFunction(null);// -> false
 * isAsyncFunction(undefined);// -> false
 * isAsyncFunction({});// -> false
 * isAsyncFunction([]);// -> false
 * isAsyncFunction(/a/g);// -> false
 * isAsyncFunction('string');// -> false
 * isAsyncFunction(42);// -> false
 * isAsyncFunction(new Date());// -> false
 * ```
 */
export default (payload: any): boolean => {
  return getType(payload) === 'AsyncFunction';
  // return payload &&
  //   payload.constructor &&
  //   payload.constructor === Object.getPrototypeOf(async function(){}).constructor;
}
