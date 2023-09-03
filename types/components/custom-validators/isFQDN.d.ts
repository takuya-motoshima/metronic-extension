import IsFQDNOptions from '~/interfaces/IsFQDNOptions';
/**
 * Check if the domain name is fully qualified (e.g. domain.com).
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
