/// <reference types="yaireo__tagify" />
import TagifyOptions from '~/interfaces/TagifyOptions';
/**
 * Tag input UI.
 */
export default class<T extends Tagify.BaseTagData = Tagify.TagData> {
    #private;
    /**
     * Initialization.
     */
    constructor(input: HTMLInputElement | HTMLTextAreaElement | JQuery, options: TagifyOptions);
    /**
      * Parse and add tags.
      *
      * @param tags Tags to add. When a string, it can be either a single word or multiple words separated with a delimiter.
      * @param clearInput If `true`, the input's value gets cleared after adding tags.
      * @param skipInvalid If `true`, do not add, mark & remove invalid tags (defaults to the current tagify settings).
      * @return List of HTML elements representing the tags that were added.
      */
    addTags(tags: string | string[] | T[], clearInput?: boolean, skipInvalid?: boolean): HTMLElement[];
    /**
      * Removes all tags and resets the original input tag's value property.
      */
    removeAllTags(): void;
    /**
     * Switches read-only mode on or off.
     *
     * @param readonly `true` to switch the tagify instance to read-only mode, `false` to switch off read-only mode.
     */
    setReadonly(readonly?: boolean): void;
    /**
     * Set the tag addition event handler.
     */
    onAddTag(handler: (evnt: Tagify.AddEventData) => void): void;
    /**
     * Set the tag remove event handler.
     */
    onRemoveTag(handler: (evnt: Tagify.RemoveEventData) => void): void;
    /**
     * Reverts the input element back as it was before Tagify was applied.
     */
    dispose(): void;
}
