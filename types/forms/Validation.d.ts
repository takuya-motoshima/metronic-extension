/**
 * A form validation class based on <a href="https://formvalidation.io/" target="_blank">formvalidation.io</a>.
 * Note: The parent element of the validation item must have the fv-row CSS class to display error messages.
 * @example
 * HTML:
 * ```html
 * <form id="myForm">
 *   <div class="fv-row mb-10">
 *     <label class="fs-5 fw-bolder form-label mb-2 required">First name</label>
 *     <input name="firstName" class="form-control form-control-solid">
 *   </div>
 *   <button type="submit" class="btn btn-primary">Send</button>
 * </form>
 * ```
 *
 * JS:
 * ```js
 * import {Validation} from 'metronic-extension';
 *
 * // Get form element.
 * const form = document.getElementById('myForm');
 *
 * // Initialize form validation.
 * const validation = new Validation(form, {
 *   firstName: {
 *     validators: {
 *       notEmpty: {message: 'First name is required.'}
 *     }
 *   }
 * });
 *
 * // Set form validation events.
 * validation.onValid(async () => {
 *   try {
 *     // Show loader.
 *     validation.onIndicator();
 *     await fetch('/api/persons', {body: new FormData(form), method: 'post'});
 *
 *     // Hide loader.
 *     validation.offIndicator();
 *     alert('The request was successful.');
 *   } catch (err) {
 *     // Hide loader.
 *     validation.offIndicator();
 *     throw err;
 *   }
 * });
 * ```
 * @see {@link https://formvalidation.io/guide/} FormValidation reference.
 */
export default class Validation {
    #private;
    /**
     * Form Elements.
     * @type {HTMLFormElement}
     */
    form: HTMLFormElement;
    /**
     * A submit button element.
     * @type {HTMLButtonElement|null}
     */
    submit: HTMLButtonElement | null;
    /**
     * FormValidation instance.
     * @type {FormValidation.core.Core}
     */
    fv: FormValidation.core.Core;
    /**
     * Create a new instance of the Validation class.
     * @param {string|HTMLFormElement|JQuery} form HTMLFormElement selector, element, or JQuery object.
     * @param {FormValidation.core.FieldsOptions} fields Validate Options.
     * @param {boolean} enableSubmitTrigger If true, validation is performed when the submit button is pressed. Default is true.
     * @param {boolean} enableSequence If true, if the validation fails, the remaining validators will not be run. Default is true.
     * @param {boolean} shouldFocus If true, focus on the first element of the form. Default is true.
     */
    constructor(form: string | HTMLFormElement | JQuery, fields: FormValidation.core.FieldsOptions, enableSubmitTrigger?: boolean, enableSequence?: boolean, shouldFocus?: boolean);
    /**
     * Validate all fields. If it is valid, it returns true, if invalid, it returns false.
     * @return {Promise<boolean>} true if the validation passes, false if it fails.
     * @example
     * ```js
     * await validation.validate();
     * ```
     */
    validate(): Promise<boolean>;
    /**
     * Sets the callback function to be called when all fields pass validation.
     * @param {(evnt: any) => void} handler Callback function.
     * @return {Validation}
     * @example
     * ```js
     * validation.onValid(async evnt => {});
     * ```
     */
    onValid(handler: (evnt: any) => void): Validation;
    /**
     * Sets the callback function to be called when the validation fails.
     * @param {(evnt: any) => void} handler Callback function.
     * @return {Validation}
     * @example
     * ```js
     * validation.onInvalid(async evnt => {});
     * ```
     */
    onInvalid(handler: (evnt: any) => void): Validation;
    /**
     * Sets the callback function to be called when the field passes validation. The callback function will receive the name of the field that passed validation.
     * @param {(name: string) => void} handler Callback function.
     * @return {Validation}
     * @example
     * ```js
     * ```js
     * validation.onFieldValid(name => {});
     * ```
     */
    onFieldValid(handler: (name: string) => void): Validation;
    /**
     * Sets the callback function to be called when the field fails validation. The callback function will receive the name of the field that failed validation.
     * @param {(name: string) => void} handler Callback function.
     * @return {Validation}
     * @example
     * ```js
     * validation.onFieldInvalid(name => {});
     * ```
     */
    onFieldInvalid(handler: (name: string) => void): Validation;
    /**
     * Display the loader on the form.
     * @return {Validation}
     * @example
     * ```js
     * validation.onIndicator();
     * ```
     */
    onIndicator(): Validation;
    /**
     * Release the form loader.
     * @return {Validation}
     * @example
     * ```js
     * validation.offIndicator();
     * ```
     */
    offIndicator(): Validation;
    /**
     * Displays validation error messages for the specified fields.
     * @param {string} field The name attribute of the field.
     * @param {string} validator The name of the validation rule.
     * @return {Validation}
     * @example
     * ```js
     * validation.setError('firstName', 'notEmpty');
     * ```
     */
    setError(field: string, validator: string): Validation;
    /**
     * Activates the validator rules for the field.
     * @param {string} field The name attribute of the field.
     * @param {string} validator? The name of the validation rule. The default is none (undefined). If none, all validator rules are active.
     * @return {Validation}
     * @example
     * ```js
     * // Activate all validator rules.
     * validation.enableValidator('firstName');
     *
     * // Activate only mandatory check validator rules.
     * validation.enableValidator('firstName', 'notEmpty');
     * ```
     */
    enableValidator(field: string, validator?: string | undefined): Validation;
    /**
     * Deactivates the validator rule for the field.
     * @param {string} field The name attribute of the field.
     * @param {string} validator? The name of the validation rule. Default is none (undefined). If none, all validator rules are deactivated.
     * @return {Validation}
     * @example
     * ```js
     * // Deactivate all validator rules.
     * validation.disableValidator('firstName');
     *
     * // Deactivate only mandatory check validator rules.
     * validation.disableValidator('firstName', 'notEmpty');
     * ```
     */
    disableValidator(field: string, validator?: string | undefined): Validation;
    /**
     * Validate a specific field.
     * @param {string} field The name attribute of the field.
     * @return {Promise<boolean>} true if the validation passes, false if it fails.
     * @example
     * ```js
     * await validation.validateField('firstName');
     * ```
     */
    validateField(field: string): Promise<boolean>;
    /**
     * Clears error messages in the field.
     * @param {string} field The name attribute of the field.
     * @param {boolean} reset If true, clears the input value of the field. Default is false.
     * @return {Validation}
     * @see {@link https://formvalidation.io/guide/api/reset-field/|resetField() method - FormValidation}
     * @example
     * ```js
     * // Clear error message.
     * validation.resetField('firstName');
     *
     * // Clear error messages and input values.
     * validation.resetField('firstName', true);
     * ```
     */
    resetField(field: string, reset?: boolean): Validation;
    /**
     * Clears error messages for all fields.
     * @param {boolean} reset If true, clears the input value of the field. Default is false.
     * @return {Validation}
     * @see {@link https://formvalidation.io/guide/api/reset-form/|resetForm() method - FormValidation}
     * @example
     * ```js
     * // Clear error messages for all fields.
     * validation.resetForm();
     *
     * // Clear error messages and input values for all fields.
     * validation.resetForm(true);
     * ```
     */
    resetForm(reset?: boolean): Validation;
    /**
     * Adds a validator rule to the specified field.
     * @param {string} field The name attribute of the field.
     * @param {{[validatorName: string]: FormValidation.core.ValidatorOptions}} validators Validate Rule.
     * @return {Validation}
     * @example
     * ```js
     * validation.addField(`firstName`, {
     *   notEmpty: {message: 'First name is required.'},
     * });
     * ```
     * @see {@link https://formvalidation.io/guide/api/add-field|FormValidation.addField() method}
     */
    addField(field: string, validators: {
        [validatorName: string]: FormValidation.core.ValidatorOptions;
    }): Validation;
    /**
     * Get validate options for all fields.
     * @return {FormValidation.core.FieldsOptions} Validate Option.
     */
    getFields(): FormValidation.core.FieldsOptions;
    /**
     * Remove fields from validation.
     * @param {string} field The name attribute of the field.
     * @return {Validation}
     */
    removeField(field: string): Validation;
    /**
     * Remove all fields from validation.
     */
    removeAllField(): void;
    /**
     * Add a new validation rule.
     * @param {string} validator The name of the validation rule.
     * @param {() => FormValidation.core.ValidateFunction<FormValidation.core.ValidateOptions>} func Validate function.
     * @return {Validation}
     * @example
     * ```js
     * // Add the Validate rule.
     * validation.addRule(`isNumber`, () => {
     *   return {
     *     validate: input => {
     *       return {valid: !isNaN(input.value)};
     *     }
     *   }
     * });
     *
     * // Add a validator rule with options.
     * validation.addRule(`isNumber`, () => {
     *   return {
     *     validate: input => {
     *       // Check if it is numeric.
     *       const valid = isNaN(input.value);
     *       if (!valid || input.options.allowNegative)
     *          // If negative numbers are allowed, return the result of the check.
     *          return {valid};
     *
     *       // If negative numbers are not allowed, return pass only if greater than or equal to 0.
     *       return {valid: input.value > 0};
     *     }
     *   }
     * });
     * ```
     * @see {@link https://formvalidation.io/guide/api/register-validator/|FormValidation.registerValidator() method}
     */
    addRule(validator: string, func: () => FormValidation.core.ValidateFunction<FormValidation.core.ValidateOptions>): Validation;
    /**
     * Destroy validation.
     */
    destroy(): void;
}
