import IsFQDNorIPOptions from '~/interfaces/IsFQDNorIPOptions';
/**
 * Check for a fully qualified domain name (e.g. domain.com) or IP (version 4 or 6).
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNorIPOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
