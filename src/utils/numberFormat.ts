import isString from '~/utils/isString';

/**
 * Number Format (Comma Separation) as per locale.
 * @param {string|number} num Numeric value or numeric string.
 * @return {string} Formatted number.
 * @example
 * ```js
 * import {numberFormat} from 'metronic-extension';
 * 
 * numberFormat(1234);// -> '1,234'
 * numberFormat(1234.5);// -> '1,234.5'
 * numberFormat(0);// -> '0'
 * numberFormat(.0);// -> '0'
 * numberFormat(-1234);// -> '-1,234'
 * numberFormat(-1234.5);// -> '-1,234.5'
 * numberFormat('1234');// -> '1,234'
 * numberFormat('1234.5');// -> '1,234.5'
 * numberFormat('0');// -> '0'
 * numberFormat('.0');// -> '0'
 * numberFormat('-1234');// -> '-1,234'
 * numberFormat('-1234.5');// -> '-1,234.5'
 * ```
 */
export default (num: string|number): string => {
  if (num == null)
    // If the value is null or undefined, replace with zero.
    num = 0;
  else if (isString(num))
    // If the value is a string, it is converted to a numeric type.
    num = parseFloat(num as string);

  // Returns a numerical value in a formatted format.
  return num.toLocaleString();
}