/**
 * Check if the value is empty.
 * @param {any} payload The value to test.
 * @return {boolean} True for blank, null, undefined, NaN, empty array, empty object, empty File, empty Set, or empty Map; false otherwise.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 *
 * utils.isEmpty('');// -> true
 * utils.isEmpty(' ');// -> true
 * utils.isEmpty(null);// -> true
 * utils.isEmpty(undefined);// -> true
 * utils.isEmpty(NaN);// -> true
 * utils.isEmpty([]);// -> true
 * utils.isEmpty({});// -> true
 * utils.isEmpty(new Set());// -> true
 * utils.isEmpty(new Map());// -> true
 * utils.isEmpty(new Map());// -> true
 * utils.isEmpty(new File([''], 'foo.txt'));// -> true
 *
 * utils.isEmpty('string');// -> false
 * utils.isEmpty(['a', 'b']);// -> false
 * utils.isEmpty({a: 'b'});// -> false
 * utils.isEmpty(0);// -> false
 * utils.isEmpty(42);// -> false
 * utils.isEmpty(function() {});// -> false
 * utils.isEmpty(false);// -> false
 * utils.isEmpty(true);// -> false
 * utils.isEmpty(new Set([1,2,3]));// -> false
 * utils.isEmpty(new Map([['key', 'value']]));// -> false
 * utils.isEmpty(new File(['bar'], 'bar.txt'));// -> false
 * ```
 */
declare const _default: (payload: any) => boolean;
export default _default;
