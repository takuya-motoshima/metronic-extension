/**
 * Checks if the type is Symbol.
 * @param {any} payload The value to test.
 * @return {boolean} True if it is a Symbol type, false otherwise.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 *
 * utils.isSymbol(Symbol('a'));// -> true
 * utils.isSymbol(Object(Symbol('a')));// -> true
 *
 * utils.isSymbol([1, 2, 3]);// -> false
 * utils.isSymbol(true);// -> false
 * utils.isSymbol(new Date());// -> false
 * utils.isSymbol(new Error());// -> false
 * utils.isSymbol({0: 1, length: 1});// -> false
 * utils.isSymbol(1);// -> false
 * utils.isSymbol(/x/);// -> false
 * utils.isSymbol('a');// -> false
 * ```
 */
declare const _default: (payload: any) => boolean;
export default _default;
