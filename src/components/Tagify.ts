// import Tagify, {TagData} from '@yaireo/tagify';
import {merge} from 'deep-fusion';
import isString from '~/utils/isString';
import TagifyOptions from '~/interfaces/TagifyOptions';

/**
 * Tag input component based on <a href="https://yaireo.github.io/tagify/" target="_blank">tagify</a>.
 */
export default class<T extends Tagify.BaseTagData = Tagify.TagData> {
  /**
   * Tagify instance.
   * @type {Tagify}
   */
  #tagify: typeof window.Tagify;

  /**
   * Callback function called when a tag is added.
   * @type {(evnt: Tagify.AddEventData) => void}
   */
  #addTagHandler: (evnt: Tagify.AddEventData) => void = (evnt: Tagify.AddEventData) => {};

  /**
   * Callback function called when a tag is deleted.
   * @type {(evnt: Tagify.RemoveEventData) => void}
   */
  #removeTagHandler: (evnt: Tagify.RemoveEventData) => void = (evnt: Tagify.RemoveEventData) => {};

  /**
   * Callback function called when a tag is modified.
   * @type {(evnt: Tagify.AddEventData|Tagify.RemoveEventData) => void}
   */
  #changeTagHandler: (evnt: Tagify.AddEventData|Tagify.RemoveEventData) => void = (evnt: Tagify.AddEventData|Tagify.RemoveEventData) => {};

  /**
   * Create a new instance of the Tagify class.
   * See <a href="https://yaireo.github.io/tagify/" target="_blank">tagify documentation</a> for options not listed here.
   * @param {string|HTMLInputElement|HTMLTextAreaElement|JQuery} element HTMLInputElement or HTMLTextAreaElement selector, element, or JQuery object.
   * @param {number} options.maxChars? Maximum length of tag input. This is a proprietary option and not a tagify option. The default is no limit (undefined).
   * @param {number} options.readonly? Read-only. This is a proprietary option, not a tagify option. Default is false.
   */
  public constructor(element: string|HTMLInputElement|HTMLTextAreaElement|JQuery, options: TagifyOptions) {
    // Check parameters.
    if (isString(element))
      element = document.querySelector<HTMLInputElement|HTMLTextAreaElement>(element as string) as HTMLInputElement|HTMLTextAreaElement;
    else if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)
      element = element;
    else if (element instanceof $)
      element = (element as JQuery).get(0) as HTMLInputElement|HTMLTextAreaElement;
    else
      throw new TypeError('element parameter should be HTMLInputElement or HTMLTextAreaElement selectors, elements, and JQuery object');

    // Initialize options.
    options = merge({
      enforceWhitelist: false,
      maxTags: Infinity,
      editTags: false,
      dropdown: {
        closeOnSelect: false,
        enabled: 0,
        maxItems: 5
      },
      originalInputValueFormat: (value: T[]): string => value.map(item => item.value).join(','),
      maxChars: undefined,
      readonly: false
    }, options);

    // Save maxChars custom options.
    const maxChars = options.maxChars;
    delete options.maxChars;

    // Save readonly custom options.
    const readonly = options.readonly;
    delete options.readonly;

    // Overlaps the specified transformTag options.
    const transformTag = options.transformTag || null;
    options.transformTag = (tagData: Tagify.TagData): void => {
      // Characters exceeding the maximum character length are truncated.
      if (maxChars)
        tagData.value = tagData.value.slice(0, maxChars);

      // Invoke the specified transformTag.
      if (transformTag)
        transformTag(tagData);
    };

    // Initialize tagify.
    this.#tagify = new window.Tagify(element, options);

    // Make it read-only.
    if (readonly)
      this.setReadonly();

    // The tag has been added.
    this.#tagify.on('add', (evnt: Tagify.AddEventData) => {
      this.#addTagHandler(evnt);
      this.#changeTagHandler(evnt);
    });

    // The tag is removed.
    this.#tagify.on('remove', (evnt: Tagify.RemoveEventData) => {
      this.#removeTagHandler(evnt);
      this.#changeTagHandler(evnt);
    });
  }

  /**
   * Add one or more tags.
   * @param {string|string[]|T[]} tags Tags to add. When a string, it can be either a single word or multiple words separated with a delimiter.
   * @param {boolean} clearInput? If true, the input's value gets cleared after adding tags. Default is false.
   * @param {boolean} skipInvalid? If true, do not add, mark & remove invalid tags. Default is true.
   * @return {HTMLElement[]} List of HTML elements representing the tags that were added.
   * @example
   * ```js
   * // Add one tag.
   * tagify.addTags(&#039;tag4&#039;);
   * 
   * // Add multiple tags at once.
   * tagify.addTags([&#039;tag5&#039;, &#039;tag6&#039;]);
   * ```
   */
  public addTags(tags: string|string[]|T[], clearInput: boolean = false, skipInvalid: boolean = true): HTMLElement[] {
    if (typeof tags === 'string')
      tags = tags.split(',');
    return this.#tagify.addTags(tags, clearInput, skipInvalid);
  }

  /**
   * Removes all tags and resets the original input tag's value property.
   */
  public removeAllTags(): void {
    this.#tagify.removeAllTags();
  }

  /**
   * Switches read-only mode on or off.
   * @param {boolean} readonly true to switch the tagify instance to read-only mode, false to switch off read-only mode.
   */
  public setReadonly(readonly: boolean = true): void {
    this.#tagify.setReadonly(readonly);
  }

  /**
   * Sets the callback function to be called when a tag is added.
   * @param {(evnt: Tagify.AddEventData) => void} handler Callback function.
   * @return {Tagify}
   */
  public onAddTag(handler: (evnt: Tagify.AddEventData) => void) {
    this.#addTagHandler = handler;
    return this;
  }

  /**
   * Sets the callback function to be called when a tag is removed.
   * @param {(evnt: Tagify.RemoveEventData) => void} handler Callback function.
   * @return {Tagify}
   */
  public onRemoveTag(handler: (evnt: Tagify.RemoveEventData) => void) {
    this.#removeTagHandler = handler;
    return this;
  }

  /**
   * Sets the callback function to be called when the tag is modified.
   * @param {(evnt: Tagify.AddEventData|Tagify.RemoveEventData) => void} handler Callback function.
   * @return {Tagify}
   */
  public onChangeTag(handler: (evnt: Tagify.AddEventData|Tagify.RemoveEventData) => void) {
    this.#changeTagHandler = handler;
    return this;
  }

  /**
   * Reverts the input element back as it was before Tagify was applied.
   */
  public dispose() {
    this.#tagify.destroy();
  }
}