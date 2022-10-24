/**
 * Option to validate if there is a value between integers.
 */
export default interface  extends FormValidation.core.ValidateOptions {
    min: string;
    max: string;
}
