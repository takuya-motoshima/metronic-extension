// import Tagify from '@yaireo/tagify';

/**
 * Tag input UI options.
 */
export default interface TagifyOptions extends Tagify.TagifySettings {
  // Maximum tag input length. This is a proprietary option, not a tagify option.
  maxChars?: number,

  // Read-only. This is a proprietary option, not a tagify option.
  readonly?: boolean
}