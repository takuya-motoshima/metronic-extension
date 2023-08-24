/**
 * Validate katakana. Half-width and full-width numbers are also allowed.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return /^[ァ-ヶーｦ-ﾟ0-9０-９\s]*$/.test(value);
}