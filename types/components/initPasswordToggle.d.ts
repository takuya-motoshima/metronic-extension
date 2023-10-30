import PasswordToggleOptions from '~/interfaces/PasswordToggleOptions';
/**
 * Initialize password toggle.
 * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
 * @param {string} options.showButtonClass? CSS class to be applied to the button that shows the password. Default is "bi bi-eye fs-2".
 * @param {string} options.hideButtonClass? CSS class to be applied to the button that hides the password. Default is "bi bi-eye-slash fs-2".
 */
declare const _default: (element: string | HTMLElement | JQuery, options?: PasswordToggleOptions) => void;
export default _default;
