/**
 * Validate an port number.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    const value = Number(input.value);
    return {valid: !isNaN(value) && Number.isInteger(value) && value >= 0 && value <= 65535};
  }
})