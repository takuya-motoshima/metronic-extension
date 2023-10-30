import getType from "~/utils/getType";

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
export default (payload: any): boolean => {
  return getType(payload) === 'Function';
  // // Checks if it is a function type and returns the result.
  // const type = Object.prototype.toString.call(payload)
  // return type === '[object Function]'
  //   || (typeof payload === 'function' && type !== '[object RegExp]')
  //   // IE8 and below
  //   || (typeof window !== 'undefined' && (payload === window.setTimeout || payload === window.alert || payload === window.confirm || payload === window.prompt))
}