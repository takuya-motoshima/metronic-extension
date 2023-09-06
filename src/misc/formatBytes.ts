/**
 * Convert bytes to strings with units (KB, MB, GB, etc.).
 *
 * @example
   * ```js
 * import {formatBytes} from 'metronic-extension';
 *
 * formatBytes(435);                 // 435 bytes
 * formatBytes(3398);                // 3.3 KB
 * formatBytes(490398);              // 479 KB
 * formatBytes(6544528);             // 6.2 MB
 * formatBytes(23483023);            // 22 MB
 * formatBytes(3984578493);          // 3.7 GB
 * formatBytes(30498505889);         // 28 GB
 * formatBytes(9485039485039445);    // 8.4 PB
 * ```
 */
export default (bytes: string, decimals: number = 2, asString: boolean = false): string|{val: number, unit: string} => {
  let unit = 'Bytes';
  let val = 0;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (bytes) {
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(parseFloat(bytes)) / Math.log(k));
    unit = units[i];
    val = parseFloat((parseFloat(bytes) / Math.pow(k, i)).toFixed(dm));
  }
  return asString ? `${val} ${unit}` : {val, unit};
}