/**
 * Check if the value is empty.
 * @param {any} payload The value to test.
 * @return {boolean} True for blank, null, undefined, NaN, empty array, empty object, empty File, empty Set, or empty Map; false otherwise.
 * @example
 * ```js
 * import {isEmpty} from 'metronic-extension';
 *
 * isEmpty('');// -> true
 * isEmpty(' ');// -> true
 * isEmpty(null);// -> true
 * isEmpty(undefined);// -> true
 * isEmpty(NaN);// -> true
 * isEmpty([]);// -> true
 * isEmpty({});// -> true
 * isEmpty(new Set());// -> true
 * isEmpty(new Map());// -> true
 * isEmpty(new Map());// -> true
 * isEmpty(new File([''], 'foo.txt'));// -> true
 *
 * isEmpty('string');// -> false
 * isEmpty(['a', 'b']);// -> false
 * isEmpty({a: 'b'});// -> false
 * isEmpty(0);// -> false
 * isEmpty(42);// -> false
 * isEmpty(function() {});// -> false
 * isEmpty(false);// -> false
 * isEmpty(true);// -> false
 * isEmpty(new Set([1,2,3]));// -> false
 * isEmpty(new Map([['key', 'value']]));// -> false
 * isEmpty(new File(['bar'], 'bar.txt'));// -> false
 * ```
 */
declare const _default: (payload: any) => boolean;
export default _default;
