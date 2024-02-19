import ElementSearchOptions from '~/interfaces/ElementSearchOptions';
/**
 * Search results for HTML elements.
 */
type Reference = {
    [key: string]: any;
};
/**
 * Searches for HTML elements with the data-ref attribute.
 * Returns an object whose key is the data-ref attribute value and whose value is the HTML element.
 * @param {string|JQuery|HTMLElement} rootElement Selector, element, or jQuery object of the search source context. Default is document.body.
 * @param {boolean} options.asHtmlElement? If true, the element collection is obtained as an HTML element; if false, the element collection is obtained as a JQuery object. Default is false.
 * @return {Reference|undefined} The key is the data-ref attribute value and the value is the HTML element object.
 */
declare const _default: (rootElement?: string | JQuery | HTMLElement, options?: ElementSearchOptions) => Reference | undefined;
export default _default;
