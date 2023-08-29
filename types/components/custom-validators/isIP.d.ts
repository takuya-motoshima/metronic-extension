import IsIPValidateOptions from '~/interfaces/IsIPValidateOptions';
/**
 * Validate IP.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsIPValidateOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
