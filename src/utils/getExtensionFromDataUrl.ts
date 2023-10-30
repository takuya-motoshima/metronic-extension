import mime from 'mime';

/**
 * Get extension from Data URL.
 * @param {string} value Data URL.
 * @return {string|null} Extension. For example, jpeg, svg.
 * @example
 * ```js
 * import {getExtensionFromDataUrl} from 'metronic-extension';
 * 
 * getExtensionFromDataUrl('data:text/html,Hello%2C%20World!');// -> html
 * getExtensionFromDataUrl('data:image/jpeg;base64,/9j/4AAQS');// -> jpeg
 * getExtensionFromDataUrl('data:image/png;base64,iVBORw0KGg');// -> png
 * getExtensionFromDataUrl('data:image/svg+xml;base64,PHN2Zy');// -> svg
 * getExtensionFromDataUrl('data:application/pdf;base64,JVBE');// -> pdf
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