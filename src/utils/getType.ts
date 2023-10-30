/**
 * Get type name.
 * @param {any} payload The value to test.
 * @return {string} Type Name.
 * @example
 * ```js
 * import {getType} from 'metronic-extension';
 * 
 * getType(3);// -> Number
 * getType(3.4);// -> Number
 * getType(NaN);// -> Number
 * getType('ram');// -> String
 * getType(new String('ram'));// -> String
 * getType(new Date());// -> Date
 * getType(true);// -> Boolean
 * getType(false);// -> Boolean
 * getType(new Boolean(true));// -> Boolean
 * getType({});// -> Object
 * getType(Object.create(null));// -> Object
 * getType({name: 'Narendra'});// -> Object
 * getType(new class Person{});// -> Object
 * getType([]);// -> Array
 * getType(new Array(3, 4));// -> Array
 * getType([3, 4]);// -> Array
 * getType(parseFloat);// -> Function
 * getType(function(){});// -> Function
 * getType(Symbol('foo'));// -> Symbol
 * getType(null);// -> Null
 * getType(undefined);// -> Undefined
 * ```
 */
export default (payload: any): string => {
  return Object.prototype.toString.call(payload).slice(8, -1);
}