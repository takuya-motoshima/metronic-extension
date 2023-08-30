import isHTML from '~/validators/isHTML';
import isEmpty from '~/misc/isEmpty';

/**
 * Validate HTML strings.
 */
export default () => ({
  validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions, FormValidation.core.Localization>) => {
    // If input is empty, do not validate.
    if (isEmpty(input.value))
      return {valid: true};

    // Returns validation results.
    return {valid: isHTML(input.value)};
  }
})