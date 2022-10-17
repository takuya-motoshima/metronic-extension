/**
 * Convert bytes to strings with units (KB, MB, GB, etc.).
 *
 * @example
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
 */
declare const _default: (bytes: string, decimals?: number, asString?: boolean) => string | {
    val: number;
    unit: string;
};
export default _default;
