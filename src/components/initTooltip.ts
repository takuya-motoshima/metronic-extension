// import $ from 'jquery';
import bootstrap from '~/misc/bootstrap';

/**
 * Initialize the tooltip.
 */
export default (context: JQuery|HTMLElement, tooltipSelector: string = '[data-bs-toggle="tooltip"]'): void => {
  if (context instanceof HTMLElement)
    context = $(context);
  else if (!(context instanceof $))
    throw new TypeError('Specify HTMLElement or jQuery object for context parameter');
  for (let tooltipTrigger of context.find(tooltipSelector)) {
    new bootstrap.Tooltip(tooltipTrigger, {trigger: 'hover'});

    // NOTE: Remove the data-bs-toggle attribute so that metronic theme JS does not instantiate the tooltip in duplicate.
    // Double instantiation will cause the tooltip to stop working.
    tooltipTrigger.removeAttribute('data-bs-toggle');
  }
}