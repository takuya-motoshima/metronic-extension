import validator from 'validator';

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
export default (value: string, accept?: string): boolean => {
  // Check if the string is in Data URI format.
  const valid = validator.isDataURI(value);

  // If the validation fails or the accept option is empty, the result is returned immediately.
  if (!valid || !accept)
    return valid;

  // Detect MIME type from data URI.
  const matches = value.trim().match(/^data:([a-z]+\/[a-z0-9\-\+\._]+)(?:;..*)?,(..*)/i);
  if (!matches)
    // If the MIME type cannot be extracted.
    return false;
  const mimeType = matches[1];
  const baseMimeType = mimeType.replace(/\/.*$/, '');

  // Compare the MIME type of the Data URI with the allowed MIME types.
  for (let validType of accept.split(',')) {
    validType = validType.trim();
    if (/\/\*$/.test(validType)) {
      // This is something like a image/* mime type.
      if (baseMimeType === validType.replace(/\/.*$/, ''))
        return true;
    } else {
      if (mimeType === validType)
        return true;
    }
  }
  return false;
}