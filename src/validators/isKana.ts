/**
 * Check if it is katakana (half-width and full-width numbers are also permitted).
 */
export default (value: string): boolean => {
  // Returns validation results.
  return /^[ァ-ヶーｦ-ﾟ0-9０-９\s]*$/.test(value);
}