/**
 * Check if it is a Japanese phone number.
 * @param {string} value Value to be validated.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 * 
 * validators.isPhoneNumberJp('080-1111-1111');
 * validators.isPhoneNumberJp('080-11111111');
 * validators.isPhoneNumberJp('08011111111');
 * validators.isPhoneNumberJp('03-1111-1111');
 * validators.isPhoneNumberJp('03-11111111');
 * validators.isPhoneNumberJp('0311111111');
 * ```
 */
export default (value: string): boolean => {
  // Returns validation results.
  return /^0[-\d]{9,12}$/.test(value);
}