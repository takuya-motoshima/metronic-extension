import getType from '~/utils/getType';

/**
 * Check if it is a plain object created by "{}" or "new Object()".
 * @param {any} payload The value to test.
 * @return {boolean} True for function, false otherwise.
 * @example
 * ```js
 * import {isPlainObject} from 'metronic-extension';
 * 
 * isPlainObject({});// -> true
 * isPlainObject({foo: true});// -> true
 * isPlainObject(new Object());// -> true
 * 
 * isPlainObject(['foo', 'bar']);// -> false
 * isPlainObject(new class Foo{});// -> false
 * isPlainObject(Math);// -> false
 * isPlainObject(JSON);// -> false
 * isPlainObject(Atomics);// -> false
 * isPlainObject(Error);// -> false
 * isPlainObject(() => {});// -> false
 * isPlainObject(/./);// -> false
 * isPlainObject(null);// -> false
 * isPlainObject(undefined);// -> false
 * isPlainObject(Number.NaN);// -> false
 * isPlainObject('');// -> false
 * isPlainObject(0);// -> false
 * isPlainObject(false);// -> false
 * isPlainObject(Object.create({}));// -> false
 * isPlainObject(Object.create(null));// -> false
 * ```
 */
export default (payload: any): boolean => {
  // If it is not an object to begin with, return false.
  if (getType(payload) !== 'Object')
    return false;

  // Checks if it is a plain object created by "{}" or "new Object()" and returns the result.
  return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
}