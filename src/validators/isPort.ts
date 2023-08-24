import validator from 'validator';

/**
 * Validate port number.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isPort(value);
}