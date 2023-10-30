import IsNumericRangeOptions from '~/interfaces/IsNumericRangeOptions';
/**
 * Check the range of numbers.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsNumericRangeOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
