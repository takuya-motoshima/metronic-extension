import * as customValidators from '~/components/custom-validators';
import isString from '~/utils/isString';
import ValidationOptions from '~/interfaces/ValidationOptions';

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
 * import {components} from 'metronic-extension';
 * 
 * // Get form element.
 * const form = document.getElementById('myForm');
 *
 * // Initialize form validation.
 * const validation = new components.Validation(form, {
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
  /**
   * Form Elements.
   * @type {HTMLFormElement}
   */
  public form: HTMLFormElement;

  /**
   * A submit button element.
   * @type {HTMLButtonElement|null}
   */
  public submit: HTMLButtonElement|null = null;

  /**
   * FormValidation instance.
   * @type {FormValidation.core.Core}
   */
  public fv: FormValidation.core.Core;

  /**
   * Focus determination of the first input element.
   * @type {boolean}
   */
  #shouldFocus: boolean;

  /**
   * Callback function called when all fields pass validation.
   * @type {(evnt: any) => void}
   */
  #formValidHandler: (evnt: any) => void = (evnt: any) => {};

  /**
   * Callback function called when validation fails.
   * @type {(evnt: any) => void}
   */
  #formInvalidHandler: (evnt: any) => void = (evnt: any) => {};

  /**
   * Callback function called when a field passes validation.
   * @type {(name: string) => void}
   */
  #fieldValidHandler: (name: string) => void = (name: string) => {};

  /**
   * Callback function called when a field fails validation.
   * @type {(name: string) => void}
   */
  #fieldInvalidHandler: (name: string) => void = (name: string) => {};

  /**
   * Create a new instance of the Validation class.
   * @param {string|HTMLFormElement|JQuery} form HTMLFormElement selector, element, or JQuery object.
   * @param {FormValidation.core.FieldsOptions} fields Validate Options.
   * @param {boolean} enableSubmitTrigger If true, validation is performed when the submit button is pressed. Default is true.
   * @param {boolean} enableSequence If true, if the validation fails, the remaining validators will not be run. Default is true.
   * @param {boolean} shouldFocus If true, focus on the first element of the form. Default is true.
   */
  public constructor(form: string|HTMLFormElement|JQuery, fields: FormValidation.core.FieldsOptions, enableSubmitTrigger: boolean = true, enableSequence: boolean = true, shouldFocus: boolean = true) {
    // Check parameters.
    if (isString(form)) {
      const formElement = document.querySelector<HTMLFormElement>(form as string);
      if (!formElement)
        throw new TypeError(`${form} selector form element not found`);
      this.form = formElement as HTMLFormElement;
    } else if (form instanceof HTMLFormElement)
      this.form = form;
    else if (form instanceof $)
      this.form = (form as JQuery).get(0) as HTMLFormElement;
    else
      throw new TypeError('form parameter should be HTMLFormElement selectors, elements, and JQuery object');

    // Save autoscroll option to invalid elements.
    this.#shouldFocus = shouldFocus;

    // Set custom validation.
    this.#registerCustomValidators();

    // Get submit button element.
    if (enableSubmitTrigger) {
      this.submit = this.form.querySelector<HTMLButtonElement>('[type="submit"]');
      if (!this.submit && this.form.id)
        // If the submit button is outside the form.
        this.submit = document.querySelector<HTMLButtonElement>(`[form="${this.form.id}"]`);
    }

    // Initialize form validation.
    this.fv = FormValidation.formValidation(this.form, this.#initOptions(fields, enableSubmitTrigger, enableSequence));

    // Set event handler.
    this.fv
      .on('core.form.valid', (evnt: any) => {
        // Triggered when the form is completely validated, and all fields are valid.
        this.#formValidHandler(evnt);
      })
      .on('core.form.invalid', (evnt: any) => {
        // Triggered when the form is completely validated, and all fields are invalid.
        if (this.#shouldFocus) {
          // Scroll to invalid element on submit.
          const plugin: any = this.fv.getPlugin('bootstrap');
          if (plugin.opts.rowInvalidClass) {
            const invalidField: JQuery = $(this.form).find(`.${plugin.opts.rowInvalidClass}:first`);
            if (invalidField.length > 0)
              (invalidField.get(0) as HTMLElement).scrollIntoView();
          }
        }

        // Invoke callback function.
        this.#formInvalidHandler(evnt);
      })
      .on('core.field.valid', (...arg: unknown[]) => {
        // Triggered after validating a field, and it is a valid field.
        this.#fieldValidHandler(arg[0] as string);
      })
      .on('core.field.invalid', (...arg: unknown[]) => {
        // Triggered after validating a field, and it is an invalid field.
        this.#fieldInvalidHandler(arg[0] as string);
      });
  }

  /**
   * Validate all fields. If it is valid, it returns true, if invalid, it returns false.
   * @return {Promise<boolean>} true if the validation passes, false if it fails.
   * @example
   * ```js
   * await validation.validate();
   * ```
   */
  public async validate(): Promise<boolean> {
    return await this.fv.validate()  === 'Valid';
  }

  /**
   * Sets the callback function to be called when all fields pass validation.
   * @param {(evnt: any) => void} handler Callback function.
   * @return {Validation}
   * @example
   * ```js
   * validation.onValid(async evnt => {});
   * ```
   */
  public onValid(handler: (evnt: any) => void): Validation {
    this.#formValidHandler = handler;
    return this;
  }

  /**
   * Sets the callback function to be called when the validation fails.
   * @param {(evnt: any) => void} handler Callback function.
   * @return {Validation}
   * @example
   * ```js
   * validation.onInvalid(async evnt => {});
   * ```
   */
  public onInvalid(handler: (evnt: any) => void): Validation {
    this.#formInvalidHandler = handler;
    return this;
  }

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
  public onFieldValid(handler: (name: string) => void): Validation {
    this.#fieldValidHandler = handler;
    return this;
  }

  /**
   * Sets the callback function to be called when the field fails validation. The callback function will receive the name of the field that failed validation.
   * @param {(name: string) => void} handler Callback function.
   * @return {Validation}
   * @example
   * ```js
   * validation.onFieldInvalid(name => {});
   * ```
   */
  public onFieldInvalid(handler: (name: string) => void): Validation {
    this.#fieldInvalidHandler = handler;
    return this;
  }

  /**
   * Display the loader on the form.
   * @return {Validation}
   * @example
   * ```js
   * validation.onIndicator();
   * ```
   */
  public onIndicator(): Validation {
    if (this.submit) {
      this.submit.setAttribute('data-kt-indicator', 'on');
      this.submit.setAttribute('disabled', 'disabled');
    }
    return this;
  }

  /**
   * Release the form loader.
   * @return {Validation}
   * @example
   * ```js
   * validation.offIndicator();
   * ```
   */
  public offIndicator(): Validation {
    if (this.submit) {
      this.submit.removeAttribute('data-kt-indicator');
      this.submit.removeAttribute('disabled');
    }
    return this;
  }

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
  public setError(field: string, validator: string): Validation {
    this.fv.updateFieldStatus(field, 'Invalid', validator);
    return this;
  }

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
  public enableValidator(field: string, validator: string|undefined = undefined): Validation {
    this.fv.enableValidator(field, validator);
    return this;
  }

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
  public disableValidator(field: string, validator: string|undefined = undefined): Validation {
    this.fv.disableValidator(field, validator);
    return this;
  }

  /**
   * Validate a specific field.
   * @param {string} field The name attribute of the field.
   * @return {Promise<boolean>} true if the validation passes, false if it fails.
   * @example
   * ```js
   * await validation.validateField('firstName');
   * ```
   */
  public async validateField(field: string): Promise<boolean> {
    return await this.fv.validateField(field)  === 'Valid';
  }

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
  public resetField(field: string, reset: boolean = false): Validation {
    this.fv.resetField(field, reset);
    return this;
  }

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
  public resetForm(reset: boolean = false): Validation {
    this.fv.resetForm(reset);
    return this;
  }

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
  public addField(field: string, validators: {[validatorName: string]: FormValidation.core.ValidatorOptions}): Validation {
    this.fv.addField(field, {validators});
    return this;
  }

  /**
   * Get validate options for all fields.
   * @return {FormValidation.core.FieldsOptions} Validate Option.
   */
  public getFields(): FormValidation.core.FieldsOptions {
    return this.fv.getFields();
  }

  /**
   * Remove fields from validation.
   * @param {string} field The name attribute of the field.
   * @return {Validation}
   */
  public removeField(field: string): Validation {
    const fields = this.getFields();
    if (field in fields)
      this.fv.removeField(field);
    return this;
  }

  /**
   * Remove all fields from validation.
   */
  public removeAllField(): void {
    for (let field of Object.keys(this.getFields()))
      this.removeField(field);
  }

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
  public addRule(validator: string, func: () => FormValidation.core.ValidateFunction<FormValidation.core.ValidateOptions>): Validation {
    this.fv.registerValidator(validator, func);
    return this;
  }

  /**
   * Destroy validation.
   */
  public destroy() {
    this.fv.destroy();
  }

  /**
   * Register custom validators.
   */
  #registerCustomValidators() {
    for (let [name, func] of Object.entries(customValidators))
      // @ts-ignore Ignore the error assigning undefined keys to FormValidation.validators because we want to add arbitrary keys to FormValidation.validators.
      FormValidation.validators[name] = func;
  }

  /**
   * Initialize options.
   * @param {FormValidation.core.FieldsOptions} fields Validate Option.
   * @param {boolean} enableSubmitTrigger If true, validation is performed when the submit button is pressed.
   * @param {boolean} enableSequence If true, if the validation fails, the remaining validators will not be run.
   * @return {ValidationOptions} Validate option.
   */
  #initOptions(fields: FormValidation.core.FieldsOptions, enableSubmitTrigger: boolean, enableSequence: boolean): ValidationOptions {
    const options: ValidationOptions = {
      fields,
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        // @ts-ignore Ignore errors that do not match the type of FormValidation.plugins.FrameworkOptions.
        bootstrap: new FormValidation.plugins.Bootstrap5({
          rowSelector: '.fv-row',
          eleInvalidClass: '',
          eleValidClass: ''
        }),
        excluded: new FormValidation.plugins.Excluded({
          // Condition of the element not to validate.
          excluded: (field, element: any) => element.disabled
        }),
      }
    };
    // Automatically validate the form when pressing its Submit button.
    if (this.submit && enableSubmitTrigger)
      options.plugins!.submitButton = new FormValidation.plugins.SubmitButton();

    // Stop performing remaining validators if there is a validator that the field does not pass.
    if (enableSequence)
        options.plugins!.sequence = new FormValidation.plugins.Sequence({enabled: true});
    return options;
  }
}