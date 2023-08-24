/**
 * Domain name (e.g. domain.com) validation options.
 */
interface Options extends FormValidation.core.ValidateOptions {
    /**
     * If true, the TLD is required. Default is true.
     */
    requireTld?: boolean;
    /**
      * If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`).
      */
    allowWildcard?: boolean;
}
/**
 * Validate domain name (e.g. domain.com).
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<Options, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
