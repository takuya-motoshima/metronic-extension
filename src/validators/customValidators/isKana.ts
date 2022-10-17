import isEmpty from '~/misc/isEmpty';

/**
 * Validate an half-width full-width katakana.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    if (isEmpty(input.value))
      return {valid: true};
    return {valid: /^[ァ-ヶーｦ-ﾟ0-9０-９\s]*$/.test(input.value)};
  }
})