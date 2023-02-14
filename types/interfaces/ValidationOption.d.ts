/**
 * Validation options.
 */
export default interface  {
    fields?: FormValidation.core.FieldsOptions;
    locale?: string;
    localization?: FormValidation.core.Localization;
    plugins: {
        [name: string]: FormValidation.core.Plugin<unknown>;
    };
    init?(core: FormValidation.core.Core): void;
}
