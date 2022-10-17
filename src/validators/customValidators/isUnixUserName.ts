import isEmpty from '~/misc/isEmpty';

/**
 * Validate an UNIX username.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    if (isEmpty(input.value))
      return {valid: true};
    return {valid: /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/.test(input.value)};
  }
})