import $ from 'jquery';
import customValidators from '~/validators/customValidators/index';
import ValidationOptions from '~/interfaces/ValidationOptions';
import isString from '~/misc/isString';

/**
 * Form validation.
 * Note that the parent element of the input element to be validated must have the fv-row class.
 *
 * @example
 * // HTML:
 * // <form id="myForm">
 * //   <div class="fv-row mb-10">
 * //     <label class="fs-5 fw-bolder form-label mb-2 required">Person's Name</label>
 * //     <input name="name" class="form-control form-control-solid">
 * //   </div>
 * //   <button type="submit" class="btn btn-primary">Send</button>
 * // </form>
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
 *     await fetch("http://localhost:8080/persons", {body: new FormData(form), method: 'post'});
 *     validation.offIndicator();
 *     alert('The request was successful.');
 *   } catch (err) {
 *     validation.offIndicator();
 *     throw err;
 *   }
 * });
 * @see {@link https://formvalidation.io/guide/} FormValidation reference.
 */
export default class Validation {
  form: HTMLFormElement;
  submit: HTMLButtonElement|null = null;
  fv: FormValidation.core.Core;

  /**
   * Initialization.
   */
  constructor(form: string|HTMLFormElement|JQuery, fields: FormValidation.core.FieldsOptions, enableSubmitTrigger: boolean = true) {
    debugger;
    if (isString(form)) {
      const formEl = document.querySelector<HTMLFormElement>(form as string);
      if (!formEl)
        throw new TypeError(`No form element found that corresponds to ${form}`);
      this.form = formEl as HTMLFormElement;
    } else if (form instanceof HTMLFormElement)
      this.form = form;
    else if (form instanceof $)
      this.form = (form as JQuery).get(0) as HTMLFormElement;
    else
      throw new TypeError('For the form parameter, specify a character string, HTMLFormElement, or a JQuery object of HTMLFormElement');
    this.#registerCustomValidators();
    if (enableSubmitTrigger) {
      this.submit = this.form.querySelector<HTMLButtonElement>('[type="submit"]');
      if (!this.submit && this.form.id)
        // If the submit button is outside the form.
        this.submit = document.querySelector<HTMLButtonElement>(`[form="${this.form.id}"]`);
    }
    this.fv = FormValidation.formValidation(this.form, this.#initOptions(fields, enableSubmitTrigger));
  }

  /**
   * Validate all fields.
   * If it is valid, it returns true, if invalid, it returns false.
   */
  async validate(): Promise<boolean> {
    return await this.fv.validate()  === 'Valid';
  }

  /**
   * Triggered when the form is completely validated, and all fields are valid.
   */
  onValid(handler: any): Validation {
    this.fv.on('core.form.valid', handler);
    return this;
  }

  /**
   * Triggered when the form is completely validated, and all fields are invalid.
   */
  onInvalid(handler: any): Validation {
    this.fv.on('core.form.invalid', handler);
    return this;
  }

  /**
   * Sets the event handler when the field becomes valid.
   */
  onFieldValid(handler: (name: string) => void): Validation {
    this.fv.on('core.field.valid', (...arg: unknown[]) => {
      handler(arg[0] as string);
    });
    return this;
  }

  /**
   * Sets the event handler when the field becomes invalid.
   */
  onFieldInvalid(handler: (name: string) => void): Validation {
    this.fv.on('core.field.invalid', (...arg: unknown[]) => {
      handler(arg[0] as string);
    });
    return this;
  }

  /**
   * Show loading indication.
   */
  onIndicator(): Validation {
    if (this.submit) {
      this.submit.setAttribute('data-kt-indicator', 'on');
      this.submit.setAttribute('disabled', 'disabled');
    }
    return this;
  }

  /**
   * Hide loading indication.
   */
  offIndicator(): Validation {
    if (this.submit) {
      this.submit.removeAttribute('data-kt-indicator');
      this.submit.removeAttribute('disabled');
    }
    return this;
  }

  /**
   * Show error message.
   */
  setError(field: string, validator: string): Validation {
    this.fv.updateFieldStatus(field, 'Invalid', validator);
    return this;
  }

  /**
   * Enable particular validator for given field.
   */
  enableValidator(field: string, validator: string|undefined = undefined): Validation {
    this.fv.enableValidator(field, validator);
    return this;
  }

  /**
   * Disable particular validator for given field.
   */
  disableValidator(field: string, validator: string|undefined = undefined): Validation {
    this.fv.disableValidator(field, validator);
    return this;
  }

  /**
   * Validate a particular field.
   * If it is valid, it returns true, if invalid, it returns false.
   */
  async validateField(name: string): Promise<boolean> {
    return await this.fv.validateField(name)  === 'Valid';
  }

  /**
    * Clear field messages.
    * @see {@link https://formvalidation.io/guide/api/reset-field/|resetField() method - FormValidation}
    */
  resetField(name: string, reset: boolean = false): Validation {
    this.fv.resetField(name, reset);
    return this;
  }

  /**
   * Added items to verify.
   * 
   * @example
   * import {Validation} from 'metronic-extension';
   * 
   * const validation = new Validation(document.querySelector('form'), {});
   * validation.addField(`name`, {
   *   notEmpty: {message: 'Enter your name'},
   * })
   * @see {@link https://formvalidation.io/guide/api/add-field|FormValidation • addField() method}
   */
  addField(field: string, validators: {[validatorName: string]: FormValidation.core.ValidatorOptions}): Validation {
    this.fv.addField(field, {validators});
    return this;
  }

  /**
   * Return entire fields option.
   */
  getFields(): FormValidation.core.FieldsOptions {
    return this.fv.getFields();
  }

  /**
   * Remove the validation field.
   */
  removeField(field: string): Validation {
    const fields = this.getFields();
    if (field in fields)
      this.fv.removeField(field);
    return this;
  }

  /**
   * Remove all validation fields.
   */
  removeAllField(): void {
    for (let field of Object.keys(this.getFields()))
      this.removeField(field);
  }

  /**
    * Added new validation rule.
    * 
    * @example
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
    * @see {@link https://formvalidation.io/guide/api/register-validator/|FormValidation • registerValidator() method}
    */
  addRule(name: string, func: () => FormValidation.core.ValidateFunction<FormValidation.core.ValidateOptions>): Validation {
    this.fv.registerValidator(name, func);
    return this;
  }

  /**
   * Destroy validation.
   */
  destroy() {
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
   */
  #initOptions(fields: FormValidation.core.FieldsOptions, enableSubmitTrigger: boolean): ValidationOptions {
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
        })
      }
    };
    if (this.submit && enableSubmitTrigger)
      options.plugins!.submitButton = new FormValidation.plugins.SubmitButton();
    return options;
  }
}