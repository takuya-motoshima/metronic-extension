import isString from '~/utils/isString';
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
export default (value: string|number, options: IsNumericRangeOptions): boolean => {
  // If the input is a string, convert to numeric.
  if (isString(value)) {
    value = parseInt(value as string, 10);

    // If the string cannot be converted to a numeric value, a validation error is returned.
    if (!Number.isInteger(value))
      return false;
  }

  // Returns validation results.
  return (value as number) >= parseInt(options.min as string, 10)
    && (value as number) <= parseInt(options.max as string, 10);
}