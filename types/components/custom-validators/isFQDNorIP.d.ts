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
    /**
    * 4 or 6. The default is undefind (allows both versions 4 and 6).
    */
    ipVersion?: '4' | '6';
    /**
     * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
     */
    allowIPRange?: boolean;
}
/**
 * Validate the domain name (e.g. domain.com) or IP.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<Options, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
