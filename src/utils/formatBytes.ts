import isString from '~/utils/isString';

/**
 * Convert bytes to strings with units (KB, MB, GB, etc.).
 * @param {string|number} bytes Bytes.
 * @param {number} decimals? Number of decimal places. Default is 2.
 * @param {boolean} asString? If true, returns the result as a string; if false, returns the result as a value and unit object ({val: number, unit: string}). Default is false.
 * @return {string|{val: number, unit: string}} Value with units.
 * @example
   * ```js
 * import {utils} from 'metronic-extension';
 * 
 * utils.formatBytes(435, 2, true);// -> 435 Bytes
 * utils.formatBytes(490398, 2, true);// -> 478.9 KB
 * utils.formatBytes(23483023, 2, true);// -> 22.4 MB
 * utils.formatBytes(30498505889, 2, true);// -> 28.4 GB
 * utils.formatBytes(9485039485039445, 2, true);// -> 8.42 PB
 * utils.formatBytes(9485039485039445);// -> {val: 8.42, unit: 'PB'}
 * ```
 */
export default (bytes: string|number, decimals: number = 2, asString: boolean = false): string|{val: number, unit: string} => {
  // If the value is a string, it is converted to a float type.
  if (isString(bytes))
    bytes = parseFloat(bytes as string);

  // Unit.
  let unit = 'Bytes';

  // Value to match the unit.
  let val = 0;

  // List of units.
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (bytes) {
    // If the value is greater than or equal to 0, it is converted to the appropriate unit.
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes as number) / Math.log(k));
    unit = units[i];
    val = parseFloat(((bytes as number) / Math.pow(k, i)).toFixed(dm));
  }
  return asString ? `${val} ${unit}` : {val, unit};
}