/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
/**
 * Form validation.
 * Note that the parent element of the input element to be validated must have the fv-row class.
 *
 * @example
 * HTML:
 * ```html
 * <form id="myForm">
 *   <div class="fv-row mb-10">
 *     <label class="fs-5 fw-bolder form-label mb-2 required">Person's Name</label>
 *     <input name="name" class="form-control form-control-solid">
 *   </div>
 *   <button type="submit" class="btn btn-primary">Send</button>
 * </form>
 * ```
 *
 * JS:
 * ```js
 * import {Validation} from 'metronic-extension';
 *
 * const form = document.querySelector('#myForm');
 * const validation = new Validation(form, {
 *   'name': {
 *     validators: {
 *       notEmpty: {message: 'Person\'s name is required.'}
 *     }
 *   }
 * });
 * validation.onValid(async () => {
 *   try {
 *     validation.onIndicator();
 *     await fetch('/api/persons', {body: new FormData(form), method: 'post'});
 *     validation.offIndicator();
 *     alert('The request was successful.');
 *   } catch (err) {
 *     validation.offIndicator();
 *     throw err;
 *   }
 * });
 * ```
 * @see {@link https://formvalidation.io/guide/} FormValidation reference.
 */
export default class Validation {
    #private;
    form: HTMLFormElement;
    submit: HTMLButtonElement | null;
    fv: FormValidation.core.Core;
    /**
     * Initialization.
     */
    constructor(form: string | HTMLFormElement | JQuery, fields: FormValidation.core.FieldsOptions, enableSubmitTrigger?: boolean, enableSequence?: boolean, shouldFocus?: boolean);
    /**
     * Validate all fields.
     * If it is valid, it returns true, if invalid, it returns false.
     */
    validate(): Promise<boolean>;
    /**
     * Triggered when the form is completely validated, and all fields are valid.
     */
    onValid(handler: (evnt: any) => void): Validation;
    /**
     * Triggered when the form is completely validated, and all fields are invalid.
     */
    onInvalid(handler: (evnt: any) => void): Validation;
    /**
     * Sets the event handler when the field becomes valid.
     */
    onFieldValid(handler: (name: string) => void): Validation;
    /**
     * Sets the event handler when the field becomes invalid.
     */
    onFieldInvalid(handler: (name: string) => void): Validation;
    /**
     * Show loading indication.
     */
    onIndicator(): Validation;
    /**
     * Hide loading indication.
     */
    offIndicator(): Validation;
    /**
     * Show error message.
     */
    setError(field: string, validator: string): Validation;
    /**
     * Enable particular validator for given field.
     */
    enableValidator(field: string, validator?: string | undefined): Validation;
    /**
     * Disable particular validator for given field.
     */
    disableValidator(field: string, validator?: string | undefined): Validation;
    /**
     * Validate a particular field.
     * If it is valid, it returns true, if invalid, it returns false.
     */
    validateField(name: string): Promise<boolean>;
    /**
      * Clear field messages.
      * @see {@link https://formvalidation.io/guide/api/reset-field/|resetField() method - FormValidation}
      */
    resetField(name: string, reset?: boolean): Validation;
    /**
      * Clear all field errors.
      *
      * @param reset If true, the method resets field value to empty or remove checked, selected attributes. Default is false.
      * @see {@link https://formvalidation.io/guide/api/reset-form/|resetForm() method - FormValidation}
      */
    resetForm(reset?: boolean): Validation;
    /**
     * Added items to verify.
     *
     * @example
     * ```js
     * import {Validation} from 'metronic-extension';
     *
     * const validation = new Validation(document.querySelector('form'), {});
     * validation.addField(`name`, {
     *   notEmpty: {message: 'Enter your name'},
     * })
     * ```
     *
     * @see {@link https://formvalidation.io/guide/api/add-field|FormValidation.addField() method}
     */
    addField(field: string, validators: {
        [validatorName: string]: FormValidation.core.ValidatorOptions;
    }): Validation;
    /**
     * Return entire fields options.
     */
    getFields(): FormValidation.core.FieldsOptions;
    /**
     * Remove the validation field.
     */
    removeField(field: string): Validation;
    /**
     * Remove all validation fields.
     */
    removeAllField(): void;
    /**
      * Added new validation rule.
      *
      * @example
      * ```js
      * import {Validation} from 'metronic-extension';
      *
      * const validation = new Validation(document.querySelector('form'), {});
      * validation.addRule(`isNumber`, () => {
      *   return {
      *     validate: input => {
      *       return {valid: !isNaN(input.value)};
      *     }
      *   }
      * });
      * ```
      *
      * @see {@link https://formvalidation.io/guide/api/register-validator/|FormValidation.registerValidator() method}
      */
    addRule(name: string, func: () => FormValidation.core.ValidateFunction<FormValidation.core.ValidateOptions>): Validation;
    /**
     * Destroy validation.
     */
    destroy(): void;
}
