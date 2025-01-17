/// <reference types="yaireo__tagify" />
import TagifyOptions from '~/interfaces/TagifyOptions';
/**
 * Tag input component based on <a href="https://yaireo.github.io/tagify/" target="_blank">tagify</a>.
 */
export default class<T extends Tagify.BaseTagData = Tagify.TagData> {
    #private;
    /**
     * Tagify instance. This is read-only.
     * @type {typeof window.Tagify}
     */
    get api(): typeof window.Tagify;
    /**
     * Create a new instance of the Tagify class.
     * See <a href="https://yaireo.github.io/tagify/" target="_blank">tagify documentation</a> for options not listed here.
     * @param {string|HTMLInputElement|HTMLTextAreaElement|JQuery} element HTMLInputElement or HTMLTextAreaElement selector, element, or JQuery object.
     * @param {number} options.maxChars? Maximum length of tag input. This is a proprietary option and not a tagify option. The default is no limit (undefined).
     * @param {number} options.readonly? Read-only. This is a proprietary option, not a tagify option. Default is false.
     */
    constructor(element: string | HTMLInputElement | HTMLTextAreaElement | JQuery, options: TagifyOptions);
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
    addTags(tags: string | string[] | T[], clearInput?: boolean, skipInvalid?: boolean): HTMLElement[];
    /**
     * Removes all tags and resets the original input tag's value property.
     */
    removeAllTags(): void;
    /**
     * Sets the read-only state of the Tagify instance.
     * @param {boolean} readonly True to enable read-only mode, false to disable it.
     */
    setReadonly(readonly?: boolean): void;
    /**
     * Sets the disabled state of the Tagify instance.
     * @param {boolean} disabled True to enable disabled mode, false to disable it.
     */
    setDisabled(disabled?: boolean): void;
    /**
     * Sets the callback function to be called when a tag is added.
     * @param {(event: Tagify.AddEventData) => void} handler Callback function.
     * @return {Tagify}
     */
    onAddTag(handler: (event: Tagify.AddEventData) => void): this;
    /**
     * Sets the callback function to be called when a tag is removed.
     * @param {(event: Tagify.RemoveEventData) => void} handler Callback function.
     * @return {Tagify}
     */
    onRemoveTag(handler: (event: Tagify.RemoveEventData) => void): this;
    /**
     * Sets the callback function to be called when the tag is modified.
     * @param {(event: Tagify.AddEventData|Tagify.RemoveEventData) => void} handler Callback function.
     * @return {Tagify}
     */
    onChangeTag(handler: (event: Tagify.AddEventData | Tagify.RemoveEventData) => void): this;
    /**
     * Reverts the input element back as it was before Tagify was applied.
     */
    dispose(): void;
}
