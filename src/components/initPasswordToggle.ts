import {merge} from 'deep-fusion';
import PasswordToggleOptions from '~/interfaces/PasswordToggleOptions';

function setToggleEventListener(input: HTMLElement, options: PasswordToggleOptions) {
  if (input.hasAttribute('data-show-password-toggle-initialized'))
    return;
  const button = input.nextElementSibling;
  if (!(button instanceof HTMLButtonElement))
    return void console.warn('The button element to the right of the input element is missing');
  button.innerHTML = `<i class="${options.showButtonClass}"></i>`;
  button.addEventListener('click', evnt => {
    const button = evnt.currentTarget as HTMLButtonElement;
    const icon = button.querySelector('i') as HTMLElement;
    if (input.getAttribute('type')!.toLowerCase() === 'password') {
      input.setAttribute('type', 'text');
      icon.classList.remove(...options.showButtonClass.split(' '));
      icon.classList.add(...options.hideButtonClass.split(' '));
    } else {
      input.setAttribute('type', 'password');
      icon.classList.remove(...options.hideButtonClass.split(' '));
      icon.classList.add(...options.showButtonClass.split(' '));
    }
  }, {passive: true});
  input.setAttribute('data-show-password-toggle-initialized', 'true');
}

/**
 * Toggle between showing and hiding passwords.
 */
export default (context: HTMLElement|JQuery, options?: PasswordToggleOptions) => {
  // Check parameters.
  if (context instanceof $)
    context = (context as JQuery).get(0) as HTMLElement;
  else if (context instanceof HTMLElement)
    throw new TypeError('For the context parameter, specify HTMLElement, or a JQuery object');
  
  // Initialize options.
  options = merge({
    showButtonClass: 'bi bi-eye fs-2',
    hideButtonClass: 'bi bi-eye-slash fs-2'
  }, options);
  if (context instanceof HTMLInputElement
    && context!.getAttribute('data-show-password-toggle')
    && context!.getAttribute('data-show-password-toggle')!.toLowerCase() === 'true'
  ) {
    setToggleEventListener(context, options as PasswordToggleOptions);
  } else {
    for (let input of (context as HTMLElement).querySelectorAll('input[data-show-password-toggle]')) {
      if (!input.getAttribute('data-show-password-toggle') || input.getAttribute('data-show-password-toggle')!.toLowerCase() !== 'true')
        continue;
      setToggleEventListener(input as HTMLInputElement, options as PasswordToggleOptions);
    }
  }
}