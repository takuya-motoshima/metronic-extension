/**
 * Check if the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs" target="_blank">data URI format</a>.
 * @param {string} value Value to be validated.
 * @param {string} accept? Comma-separated list of allowed MIME types (e.g., "image/*,application/pdf"). Default is none (undefined).
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 *
 * validators.isDataURI('data:text/html,Hello%2C%20World!');
 * validators.isDataURI('data:image/jpeg;base64,/9j...');
 * validators.isDataURI('data:image/png;base64,iVB...');
 * validators.isDataURI('data:image/svg+xml;base64,PHN...');
 * validators.isDataURI('data:application/pdf;base64,JVB...');
 * ```
 */
declare const _default: (value: string, accept?: string) => boolean;
export default _default;
