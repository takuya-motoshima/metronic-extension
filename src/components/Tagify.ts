// import Tagify, {TagData} from '@yaireo/tagify';
import $ from 'jquery';
import fusion from 'deep-fusion';
import TagifyOptions from '~/interfaces/TagifyOptions';

/**
 * Tag input UI.
 */
export default class<T extends Tagify.BaseTagData = Tagify.TagData> {
  #tagify: typeof window.Tagify;
  #addTagHandler: (evnt: Tagify.AddEventData) => void = (evnt: Tagify.AddEventData) => {};
  #removeTagHandler: (evnt: Tagify.RemoveEventData) => void = (evnt: Tagify.RemoveEventData) => {};

  /**
   * Initialization.
   */
  constructor(input: HTMLInputElement|HTMLTextAreaElement|JQuery, options: TagifyOptions) {
    if (input instanceof $)
      input = (input as JQuery).get(0) as HTMLInputElement|HTMLTextAreaElement;
    else if (!(input instanceof HTMLInputElement) && !(input instanceof HTMLTextAreaElement))
      throw new TypeError('Only HTMLInputElement, HTMLTextAreaElement, or JQuery objects (HTMLInputElement, HTMLTextAreaElement ) can be specified as input parameters');

    // Initialize options.
    options = fusion({
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

    // Save maxChars custom option.
    const maxChars = options.maxChars;
    delete options.maxChars;

    // Save readonly custom option.
    const readonly = options.readonly;
    delete options.readonly;

    // Overlaps the specified transformTag option.
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
    this.#tagify = new window.Tagify(input, options);

    // Make it read-only.
    if (readonly)
      this.setReadonly();

    // The tag has been added.
    this.#tagify.on('add', (evnt: Tagify.AddEventData) => {
      this.#addTagHandler(evnt);
    });

    // The tag is removed.
    this.#tagify.on('remove', (evnt: Tagify.RemoveEventData) => {
      this.#removeTagHandler(evnt);
    });
  }

  /**
    * Parse and add tags.
    *
    * @param tags Tags to add. When a string, it can be either a single word or multiple words separated with a delimiter.
    * @param clearInput If `true`, the input's value gets cleared after adding tags.
    * @param skipInvalid If `true`, do not add, mark & remove invalid tags (defaults to the current tagify settings).
    * @return List of HTML elements representing the tags that were added.
    */
  addTags(tags: string|string[]|T[], clearInput: boolean = false, skipInvalid: boolean = true): HTMLElement[] {
    if (typeof tags === 'string')
      tags = tags.split(',');
    return this.#tagify.addTags(tags, clearInput, skipInvalid);
  }

  /**
    * Removes all tags and resets the original input tag's value property.
    */
  removeAllTags(): void {
    this.#tagify.removeAllTags();
  }

  /**
   * Switches read-only mode on or off.
   *
   * @param readonly `true` to switch the tagify instance to read-only mode, `false` to switch off read-only mode.
   */
  setReadonly(readonly: boolean = true) {
    this.#tagify.setReadonly(readonly);
  }

  /**
   * Set the tag addition event handler.
   */
  onAddTag(handler: (evnt: Tagify.AddEventData) => void) {
    this.#addTagHandler = handler;
  }

  /**
   * Set the tag remove event handler.
   */
  onRemoveTag(handler: (evnt: Tagify.RemoveEventData) => void) {
    this.#removeTagHandler = handler;
  }

  /**
   * Reverts the input element back as it was before Tagify was applied.
   */
  dispose() {
    this.#tagify.destroy();
  }
}