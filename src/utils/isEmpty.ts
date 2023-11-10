import getType from '~/utils/getType';
import trim from '~/utils/trim';

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