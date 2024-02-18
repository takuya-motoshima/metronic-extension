import {merge} from 'deep-fusion';
import isString from '~/utils/isString';
import isPlainObject from '~/utils/isPlainObject';
import ElementSearchOptions from '~/interfaces/ElementSearchOptions';

/**
 * Search results for HTML elements.
 */
type Reference = {[key: string]: any};

/**
 * Search for HTML elements.
 */
function searchHtmlElements(reference: Reference, key: string, node: HTMLElement, asElement?: boolean): void {
  const keys: string[] = key.split('.');
  while (key = <string>keys.shift()) {
    if (!keys.length)
      reference[key] = key in reference ? reference[key].add($(node)) : $(node);
    else {
      if (!(key in reference))
        reference[key] = {};
      reference = reference[key];
    }
  }
}

/**
 * Convert JQuery objects to HTML elements.
 */
function toHtmlElements(reference: Reference, parentKey?: string): void {
  for (let [key, value] of Object.entries(reference)) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (isPlainObject(value)) {
      toHtmlElements(value, fullKey);
      continue;
    } else if (!(value instanceof $))
      throw (`The ${fullKey} element should be a JQuery object`);
    else if ((value as JQuery).length === 0)
      continue;
    reference[key] = (value as JQuery).length === 1 ?
      (value as JQuery).get(0) :
      (value as JQuery).toArray();
  }
}

/**
 * Searches for HTML elements with the data-ref attribute.
 * Returns an object whose key is the data-ref attribute value and whose value is the HTML element.
 * @param {string|JQuery|HTMLElement} rootElement Selector, element, or jQuery object of the search source context. Default is document.body.
 * @param {boolean} options.asHtmlElement? If true, the element collection is obtained as an HTML element; if false, the element collection is obtained as a JQuery object. Default is false.
 * @return {Reference|undefined} The key is the data-ref attribute value and the value is the HTML element object.
 */
export default (rootElement: string|JQuery|HTMLElement = 'body', options?: ElementSearchOptions): Reference | undefined => {
  // Check parameters.
  if(isString(rootElement))
    rootElement = $(rootElement as string);
  else if (rootElement instanceof HTMLElement)
    rootElement = $(rootElement);
  else if (!(rootElement instanceof $))
    throw new TypeError('rootElement parameter should be HTMLElement selectors, elements, and JQuery object');

  // Initialize options.
  options = merge({
    asHtmlElement: false,
  }, options);

  // Searches for HTML elements.
  const reference = {};
  for (let node of (rootElement as JQuery).find('[data-ref]'))
    searchHtmlElements(reference, node.dataset.ref as string, node);
  if (options!.asHtmlElement)
    toHtmlElements(reference);
  return reference;
}