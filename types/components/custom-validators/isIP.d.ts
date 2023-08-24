/**
 * IP Validate Option.
 */
interface Options extends FormValidation.core.ValidateOptions {
    /**
     * 4 or 6. The default is undefind (allows both versions 4 and 6).
     */
    version?: '4' | '6';
    /**
     * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
     */
    allowRange?: boolean;
}
/**
 * Validate IP.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<Options, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
