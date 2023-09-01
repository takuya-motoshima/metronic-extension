/**
 * Check if it is a Japanese phone number.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return /^(\d{2,3})\-?(\d{3,4})\-?(\d{4})$/.test(value);
}