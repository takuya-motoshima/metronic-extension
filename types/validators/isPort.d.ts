/**
 * Check if it is a port number.
 * @param {string} value Value to be validated.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * validators.isPort('0');
 * validators.isPort('22');
 * validators.isPort('80');
 * validators.isPort('443');
 * validators.isPort('3000');
 * validators.isPort('8080');
 * validators.isPort('65535');
 * ```
 */
declare const _default: (value: string) => boolean;
export default _default;
