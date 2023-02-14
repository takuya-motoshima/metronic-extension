// import Tagify from '@yaireo/tagify';

/**
 * Tag input UI options.
 */
export default interface TagifyOption extends Tagify.TagifySettings {
  /**
   * Maximum tag input length. This is a proprietary option, not a tagify option.
   * @type {number|undefined}
   */
  maxChars?: number,

  /**
   * Read-only. This is a proprietary option, not a tagify option.
   * @type {boolean|undefined}
   */
  readonly?: boolean
}