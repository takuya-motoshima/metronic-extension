/**
 * Numeric Range Validate Option.
 */
interface Options extends FormValidation.core.ValidateOptions {
    min: string;
    max: string;
}
/**
 * Validate numerical range.
 */
declare const _default: () => {
    validate: (input: FormValidation.core.ValidateInput<Options, FormValidation.core.Localization>) => {
        valid: boolean;
    };
};
export default _default;
