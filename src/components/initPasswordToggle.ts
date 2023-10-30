import {merge} from 'deep-fusion';
import PasswordToggleOptions from '~/interfaces/PasswordToggleOptions';
import isString from '~/utils/isString';

/**
 * Set the password display toggle process to the click event of the action button.
 * @param {HTMLElement} input Password input element.
 * @param {PasswordToggleOptions} options Password toggle options.
 */
function setToggleEvent(input: HTMLElement, options: Required<PasswordToggleOptions>) {
  // If the password toggle has already been initialized, then nothing is done.
  if (input.hasAttribute('data-password-toggle-initialized'))
    return;

  // Get the button element right next to the password entry element.
  const button = input.nextElementSibling;

  // If a button element cannot be obtained, a warning message is output.
  if (!(button instanceof HTMLButtonElement))
    return void console.warn('Need an action button right next to the password entry element');

  // Set a CSS class to show the password on the button element.
  button.innerHTML = `<i class="${options.showButtonClass}"></i>`;

  // Set up password toggle processing for button element click events.
  button.addEventListener('click', evnt => {
    // Get button element.
    const button = evnt.currentTarget as HTMLButtonElement;

    // Get the icon element of the button.
    const icon = button.querySelector('i') as HTMLElement;

    // Check the visibility of password input elements.
    if (input.getAttribute('type')!.toLowerCase() === 'password') {
      // If the password is hidden, show the password.
      input.setAttribute('type', 'text');
      icon.classList.remove(...options.showButtonClass.split(' '));
      icon.classList.add(...options.hideButtonClass.split(' '));
    } else {
      // If the password is visible, hide the password.
      input.setAttribute('type', 'password');
      icon.classList.remove(...options.hideButtonClass.split(' '));
      icon.classList.add(...options.showButtonClass.split(' '));
    }
  }, {passive: true});

  // Set the password toggle initialization complete attribute on the password input element.
  input.setAttribute('data-password-toggle-initialized', 'true');
}

/**
 * Initialize password toggle.
 * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
 * @param {string} options.showButtonClass? CSS class to be applied to the button that shows the password. Default is "bi bi-eye fs-2".
 * @param {string} options.hideButtonClass? CSS class to be applied to the button that hides the password. Default is "bi bi-eye-slash fs-2".
 */
export default (element: string|HTMLElement|JQuery, options?: PasswordToggleOptions) => {
  // Check parameters.
  if (isString(element))
    element = $(element as string).get(0) as HTMLElement;
  else if (element instanceof $)
    element = (element as JQuery).get(0) as HTMLElement;
  else if (!(element instanceof HTMLElement))
    throw new TypeError('element parameter should be HTMLElement selectors, elements, and JQuery object');
  
  // Initialize options.
  options = merge({
    showButtonClass: 'bi bi-eye fs-2',
    hideButtonClass: 'bi bi-eye-slash fs-2'
  }, options);

  // Determines if the element received as a parameter is a password input element or a wrapper element for a password input element.
  if (element instanceof HTMLInputElement && element!.getAttribute('data-password-toggle') && element!.getAttribute('data-password-toggle')!.toLowerCase() === 'true') {
    // If the element received as a parameter is a password input element.
    setToggleEvent(element, options as Required<PasswordToggleOptions>);
  } else {
    // If the element received as a parameter is a wrapper element for a password input element.
    // Find the password input element under the wrapper element.
    const inputElements = (element as HTMLElement).querySelectorAll('input[data-password-toggle]');
    for (let inputElement of inputElements) {
      // If the "data-password-toggle" attribute is not true, do nothing.
      if (inputElement.getAttribute('data-password-toggle')!.toLowerCase() !== 'true')
        continue;

      // Initialize password toggle for elements with "data-password-toggle" attribute true.
      setToggleEvent(inputElement as HTMLInputElement, options as Required<PasswordToggleOptions>);
    }
  }
}