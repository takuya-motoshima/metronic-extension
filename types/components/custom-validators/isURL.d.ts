import IsURLOptions from '~/interfaces/IsURLOptions';
/**
 * Check if it is a URL.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsURLOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
