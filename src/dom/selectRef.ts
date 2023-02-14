import isString from '~/misc/isString';
import isPlainObject from '~/misc/isPlainObject';

/**
 * An array to store the nodes found.
 */
// NOTE: I wanted to use "{[key: string]: JQuery}" but could not solve the following error, so I used "{[key: string]: any}" instead.
//      Type 'SelectionResults' is missing the following properties from type 'JQuery<HTMLElement>': jquery, length, add, addBack, and 151 more.ts(2740)
type SelectionResults = {[key: string]: any};
// type SelectionResults = {[key: string]: JQuery};

/**
 * Set node reference.
 */
function setNodeReference(result: SelectionResults, key: string, node: HTMLElement, asElement?: boolean): void {
  const keys: string[] = key.split('.');
  while (key = <string>keys.shift()) {
    if (!keys.length)
      result[key] = key in result ? result[key].add($(node)) : $(node);
    else {
      if (!(key in result))
        result[key] = {};
      result = result[key];
    }
  }
}

/**
 * Selection results to HTML elements.
 */
function resultsToHTMLElements(result: SelectionResults, parentKey?: string): void {
  for (let [key, value] of Object.entries(result)) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (isPlainObject(value)) {
      resultsToHTMLElements(value, fullKey);
      continue;
    } else if (!(value instanceof $))
      throw (`The ${fullKey} element should be a JQuery object`);
    else if ((value as JQuery).length === 0)
      continue;
    result[key] = (value as JQuery).length === 1 ?
      (value as JQuery).get(0) :
      (value as JQuery).toArray();
  }
}

/**
 * Gets nodes with data-ref attribute.
 */
export default (context: string|JQuery|HTMLElement = 'body', result: SelectionResults|undefined = undefined, additionalKey: string|undefined = undefined, asHTMLElement: boolean = false): SelectionResults | undefined => {
  // Check the argument.
  if(isString(context))
    context = $(context as string);
  else if (context instanceof HTMLElement)
    context = $(context);
  else if (!(context instanceof $))
    throw new TypeError('The context parameter can be a string or a JQuery object');
  if (result && additionalKey) {
    if (result && !isPlainObject(result))
      throw new TypeError('The second nodes parameter must be an object');
    else if (additionalKey && !isString(additionalKey))
      throw new TypeError('The third additionalKey parameter must be a string');
    for (let node of (context as JQuery).find(`[data-ref="${additionalKey}"]`))
      setNodeReference(result, additionalKey, node);
    return;
  }
  result = {};
  for (let node of (context as JQuery).find('[data-ref]'))
    setNodeReference(result, node.dataset.ref as string, node);
  if (asHTMLElement)
    resultsToHTMLElements(result);
  return result;
}