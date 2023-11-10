import mime from 'mime';

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
export default (url: string): string|null => {
  // If the extension cannot be obtained from the URL, null is returned.
  if (url.indexOf('.') === -1)
    return null;

  // Get the extension from the URL.
  const extension = url.split('.').pop()?.toLocaleLowerCase() as string;

  // Guess the MIME type from the extension and return it.
  return mime.getType(extension);
}