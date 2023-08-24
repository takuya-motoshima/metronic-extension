/**
 * Validate directory name.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return /^\/$|(\/[a-zA-Z_0-9-]+)+$/.test(value);
}