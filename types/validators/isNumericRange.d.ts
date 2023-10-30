import IsNumericRangeOptions from '~/interfaces/IsNumericRangeOptions';
/**
 * Check the range of numbers.
 * @param {string} value Value to be validated.
 * @param {string|number} options.min Minimum value of the range. Required.
 * @param {string|number} options.max Maximum value of the range. Required.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * validators.isNumericRange(2, {min: 1, max: 3});
 * ```
 */
declare const _default: (value: string | number, options: IsNumericRangeOptions) => boolean;
export default _default;
