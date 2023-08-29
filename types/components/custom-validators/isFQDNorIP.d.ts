import IsFQDNorIPValidateOptions from '~/interfaces/IsFQDNorIPValidateOptions';
/**
 * Validate the domain name (e.g. domain.com) or IP.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNorIPValidateOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
