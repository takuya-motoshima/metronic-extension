import isEmpty from '~/misc/isEmpty';

/**
 * Validate an japanese phone number.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    if (isEmpty(input.value))
      return {valid: true};
    return {valid: /^(\d{2,3})\-?(\d{3,4})\-?(\d{4})$/.test(input.value)};
  }
})
