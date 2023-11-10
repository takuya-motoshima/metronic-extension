import getType from "~/utils/getType";

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
export default (payload: any): boolean => {
  return getType(payload) === 'Function';
  // // Checks if it is a function type and returns the result.
  // const type = Object.prototype.toString.call(payload)
  // return type === '[object Function]'
  //   || (typeof payload === 'function' && type !== '[object RegExp]')
  //   // IE8 and below
  //   || (typeof window !== 'undefined' && (payload === window.setTimeout || payload === window.alert || payload === window.confirm || payload === window.prompt))
}