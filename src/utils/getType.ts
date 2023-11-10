/**
 * Get type name.
 * @param {any} payload The value to test.
 * @return {string} Type Name.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 * 
 * utils.getType(3);// -> Number
 * utils.getType(3.4);// -> Number
 * utils.getType(NaN);// -> Number
 * utils.getType('ram');// -> String
 * utils.getType(new String('ram'));// -> String
 * utils.getType(new Date());// -> Date
 * utils.getType(true);// -> Boolean
 * utils.getType(false);// -> Boolean
 * utils.getType(new Boolean(true));// -> Boolean
 * utils.getType({});// -> Object
 * utils.getType(Object.create(null));// -> Object
 * utils.getType({name: 'Narendra'});// -> Object
 * utils.getType(new class Person{});// -> Object
 * utils.getType([]);// -> Array
 * utils.getType(new Array(3, 4));// -> Array
 * utils.getType([3, 4]);// -> Array
 * utils.getType(parseFloat);// -> Function
 * utils.getType(function(){});// -> Function
 * utils.getType(Symbol('foo'));// -> Symbol
 * utils.getType(null);// -> Null
 * utils.getType(undefined);// -> Undefined
 * ```
 */
export default (payload: any): string => {
  return Object.prototype.toString.call(payload).slice(8, -1);
}