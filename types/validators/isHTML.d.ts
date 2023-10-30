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
declare const _default: (value: string) => boolean;
export default _default;
