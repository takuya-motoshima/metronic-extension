/// <reference types="yaireo__tagify" />
/**
 * Tag input UI options.
 */
export default interface TagifyOptions extends Tagify.TagifySettings {
    /**
     * Maximum length of tag input. This is a proprietary option and not a tagify option. The default is no limit (undefined).
     */
    maxChars?: number;
    /**
     * Read-only. This is a proprietary option, not a tagify option. Default is false.
     */
    readonly?: boolean;
}
