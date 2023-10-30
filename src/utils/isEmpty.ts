import trim from '~/utils/trim';
import getType from '~/utils/getType';

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
export default (payload: any): boolean => {
  if (payload == null || Number.isNaN(payload))
    // True for null, undefined, and NaN.
    return true;

  // The emptiness determination method changes for each type.
  switch(getType(payload)) {
  case 'Array':
    // For arrays, true if length is 0, false if length is greater than or equal to 1.
    return payload.length === 0;
  case 'Object':
    // For objects, true if the number of properties is 0, false if 1 or more.
    return Object.keys(payload).length === 0;
  case 'File':
  case 'Map':
  case 'Set':
    // For File, Map, and Set, true if size is 0, false if size is greater than 1.
    return payload.size === 0
  default: 
    // If other than the above, returns true if the string length is 0, or false if the string length is greater than or equal to 1.
    return trim(payload.toString()) === '';
  }
}