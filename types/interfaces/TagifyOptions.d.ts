/// <reference types="yaireo__tagify" />
/**
 * Tag input UI options.
 */
export default interface TagifyOptions extends Tagify.TagifySettings {
    /**
     * Maximum tag input length. This is a proprietary option, not a tagify options.
     * @type {number|undefined}
     */
    maxChars?: number;
    /**
     * Read-only. This is a proprietary option, not a tagify options.
     * @type {boolean|undefined}
     */
    readonly?: boolean;
}
