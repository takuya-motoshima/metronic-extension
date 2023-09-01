import validator from 'validator';

/**
 * Check if it is a port number.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isPort(value);
}