import IsURLValidateOptions from '~/interfaces/IsURLValidateOptions';
/**
 * Validate URL.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsURLValidateOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
