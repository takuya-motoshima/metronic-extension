import isString from '~/misc/isString';
import IsNumericRangeOptions from '~/interfaces/IsNumericRangeOptions';

/**
 * Validate numerical range.
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
  return (value as number) >= parseInt(options.min, 10) && (value as number) <= parseInt(options.max, 10);
}