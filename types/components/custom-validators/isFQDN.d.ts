import IsFQDNValidateOptions from '~/interfaces/IsFQDNValidateOptions';
/**
 * Validate domain name (e.g. domain.com).
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<FormValidation.core.ValidateOptions & IsFQDNValidateOptions, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
