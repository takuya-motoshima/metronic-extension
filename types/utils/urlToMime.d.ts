/**
 * Get the MIME type inferred from the extension at the end of the URL.
 * @param {string} url URL string.
 * @return {string|null} MIME type inferred from the filename in the URL.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 *
 * utils.urlToMime('https://example.com/sample.js');// -> application/javascript
 * utils.urlToMime('https://example.com/sample.json');// -> application/json
 * utils.urlToMime('https://example.com/sample.txt');// -> text/plain
 * utils.urlToMime('https://example.com/sample.jpg');// -> image/jpeg
 * utils.urlToMime('https://example.com/dir/sample.txt');// -> text/plain
 * ```
 */
declare const _default: (url: string) => string | null;
export default _default;
