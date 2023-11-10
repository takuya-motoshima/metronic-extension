import getType from '~/utils/getType';

/**
 * Check if it is a plain object created by "{}" or "new Object()".
 * @param {any} payload The value to test.
 * @return {boolean} True for function, false otherwise.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 * 
 * utils.isPlainObject({});// -> true
 * utils.isPlainObject({foo: true});// -> true
 * utils.isPlainObject(new Object());// -> true
 * 
 * utils.isPlainObject(['foo', 'bar']);// -> false
 * utils.isPlainObject(new class Foo{});// -> false
 * utils.isPlainObject(Math);// -> false
 * utils.isPlainObject(JSON);// -> false
 * utils.isPlainObject(Atomics);// -> false
 * utils.isPlainObject(Error);// -> false
 * utils.isPlainObject(() => {});// -> false
 * utils.isPlainObject(/./);// -> false
 * utils.isPlainObject(null);// -> false
 * utils.isPlainObject(undefined);// -> false
 * utils.isPlainObject(Number.NaN);// -> false
 * utils.isPlainObject('');// -> false
 * utils.isPlainObject(0);// -> false
 * utils.isPlainObject(false);// -> false
 * utils.isPlainObject(Object.create({}));// -> false
 * utils.isPlainObject(Object.create(null));// -> false
 * ```
 */
export default (payload: any): boolean => {
  // If it is not an object to begin with, return false.
  if (getType(payload) !== 'Object')
    return false;

  // Checks if it is a plain object created by "{}" or "new Object()" and returns the result.
  return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
}