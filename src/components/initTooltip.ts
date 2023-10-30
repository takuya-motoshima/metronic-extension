import bootstrap from '~/utils/bootstrap';
import isString from '~/utils/isString';

/**
 * Initialize tooltips for dynamically added elements using <a href="https://getbootstrap.com/docs/5.2/components/tooltips/" target="_blank">Bootstrap Tooltips</a>.
 * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
 * @param {string} tooltipSelector? Selector for the element that initializes the tooltip. Default is '[data-bs-toggle="tooltip"]'.
 * @return {bootstrap.Tooltip[]} List of bootstrap.Tooltip instances created when the element's tooltip is initialized.
 */
export default (element: string|HTMLElement|JQuery, tooltipSelector: string = '[data-bs-toggle="tooltip"]'): bootstrap.Tooltip[] => {
  // Check parameters.
  if (isString(element))
    element = $(element as string);
  else if (element instanceof HTMLElement)
    element = $(element);
  else if (!(element instanceof $))
    throw new TypeError('element parameter should be HTMLElement selectors, elements, and JQuery object');

  // List of bootstrap.Tooltip instances.
  const tooltipInstances = [];
  
  // Find elements matching the tooltip selector.
  for (let tooltipTrigger of element.find(tooltipSelector)) {
    // Initialize tooltip.
    const tooltipInsance = new bootstrap.Tooltip(tooltipTrigger, {trigger: 'hover'});

    // Keep tooltip instance.
    tooltipInstances.push(tooltipInsance);

    // NOTE: Remove the data-bs-toggle attribute so that metronic theme JS does not instantiate the tooltip in duplicate.
    // Double instantiation will cause the tooltip to stop working.
    tooltipTrigger.removeAttribute('data-bs-toggle');
  }
  return tooltipInstances;
}