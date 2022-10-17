import isEmpty from '~/misc/isEmpty';

/**
 * Validate an HTML string.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    if (isEmpty(input.value))
      return {valid: true};
    const doc = new DOMParser().parseFromString(input.value, "text/html");
    return {valid: Array.from(doc.body.childNodes).some(node => node.nodeType === 1)};
  }
})