import isEmpty from '~/misc/isEmpty';

/**
 * Validate an directory name.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    if (isEmpty(input.value))
      return {valid: true};
    return {valid: /^\/$|(\/[a-zA-Z_0-9-]+)+$/.test(input.value)};
  }
})