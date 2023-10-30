/**
 * Check if it is HTML.
 * @param {string} value Value to be validated.
 * @return {boolean} Pass is true, fail is false.
 * @example
 * ```js
 * import {validators} from 'metronic-extension';
 * 
 * validators.isHTML('<p>foo</p>');
 * validators.isHTML('<a href="#">foo</a>');
 * validators.isHTML('<x-unicorn>');
 * ```
 */
export default (value: string): boolean => {
  // Returns validation results.
  const parser = new DOMParser().parseFromString(value, 'text/html');
  return Array.from(parser.body.childNodes)
    .some(node => node.nodeType === 1);
}