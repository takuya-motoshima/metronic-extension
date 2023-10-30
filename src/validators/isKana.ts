/**
 * Check if it is katakana (half-width and full-width numbers are also permitted).
 * @param {string} value Value to be validated.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 * 
 * validators.isKana('トウキョウタワー');
 * validators.isKana('ﾄｳｷｮｳﾀﾜｰ');
 * validators.isKana('トウキョウﾀﾜｰ');
 * validators.isKana('トウキョウ タワー');
 * ```
 */
export default (value: string): boolean => {
  // Returns validation results.
  return /^[ァ-ヶーｦ-ﾟ0-9０-９\s]*$/.test(value);
}