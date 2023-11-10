import mime from 'mime';

/**
 * Get extension from Data URL.
 * @param {string} value Data URL.
 * @return {string|null} Extension. For example, jpeg, svg.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 * 
 * utils.getExtensionFromDataUrl('data:text/html,Hello%2C%20World!');// -> html
 * utils.getExtensionFromDataUrl('data:image/jpeg;base64,/9j/4AAQS');// -> jpeg
 * utils.getExtensionFromDataUrl('data:image/png;base64,iVBORw0KGg');// -> png
 * utils.getExtensionFromDataUrl('data:image/svg+xml;base64,PHN2Zy');// -> svg
 * utils.getExtensionFromDataUrl('data:application/pdf;base64,JVBE');// -> pdf
 * ```
 */
export default (value: string): string|null => {
  // Detect MIME type from data URI.
  const matches = value.trim().match(/^data:([a-z]+\/[a-z0-9\-\+\._]+)(?:;..*)?,(..*)/i);
  if (!matches)
    // If the MIME type cannot be extracted.
    return null;
  const mimeType = matches[1];

  // Get the default extension for MIME type.
  return mime.getExtension(mimeType);
}