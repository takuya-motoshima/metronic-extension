/**
 * Numeric range validate option.
 */
export default interface IsNumericRangeOptions {
  /**
   * Minimum value of the range. Required.
   */
  min: string|number;

  /**
   * Maximum value of the range. Required.
   */
  max: string|number;
}
