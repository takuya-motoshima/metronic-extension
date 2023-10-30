import getType from '~/utils/getType';

/**
 * Checks if the type is Symbol.
 * @param {any} payload The value to test.
 * @return {boolean} True if it is a Symbol type, false otherwise.
 * @example
 * ```js
 * import {isSymbol} from 'metronic-extension';
 * 
 * isSymbol(Symbol('a'));// -> true
 * isSymbol(Object(Symbol('a')));// -> true
 * 
 * isSymbol([1, 2, 3]);// -> false
 * isSymbol(true);// -> false
 * isSymbol(new Date());// -> false
 * isSymbol(new Error());// -> false
 * isSymbol({0: 1, length: 1});// -> false
 * isSymbol(1);// -> false
 * isSymbol(/x/);// -> false
 * isSymbol('a');// -> false
 * ```
 */
export default (payload: any): boolean => {
  return getType(payload) === 'Symbol';
}