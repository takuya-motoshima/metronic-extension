import bootstrap from '~/utils/bootstrap';
/**
 * Initialize tooltips for dynamically added elements using <a href="https://getbootstrap.com/docs/5.2/components/tooltips/" target="_blank">Bootstrap Tooltips</a>.
 * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
 * @param {string} tooltipSelector? Selector for the element that initializes the tooltip. Default is '[data-bs-toggle="tooltip"]'.
 * @return {bootstrap.Tooltip[]} List of bootstrap.Tooltip instances created when the element's tooltip is initialized.
 */
declare const _default: (element: string | HTMLElement | JQuery, tooltipSelector?: string) => bootstrap.Tooltip[];
export default _default;
