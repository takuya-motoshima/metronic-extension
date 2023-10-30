/**
 * Get the fetched result as a Data URL.
 * @param {string|URL} url URL string or URL object.
 * @return {Promise<string>} Data URL.
 * @example
 * ```js
 * import {fetchDataUrl} from 'metronic-extension';
 *
 * await fetchDataUrl('/img/sample.png');// -> data:image/png;base64,iVBORw0K...
 * await fetchDataUrl('/img/sample.svg');// -> data:image/svg+xml;utf8,%3Csvg...
 * ```
 */
declare const _default: (url: string | URL) => Promise<string>;
export default _default;
