import IsIPOptions from '~/interfaces/IsIPOptions';
/**
 * Check for IP (version 4 or 6).
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsIPOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
