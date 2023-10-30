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
declare const _default: (num: string | number) => string;
export default _default;
