import isString from '~/utils/isString';

/**
 * Initializes the toggle for button group elements that have the dynamically added [data-kt-buttons="true"] attribute.
 * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
 * @example
 * HTML:
 * ```html
 * <!--begin::Row-->
 * <div class="row g-9" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button='true']">
 *   <!--begin::Col-->
 *   <div class="col">
 *     <!--begin::Option-->
 *     <label class="btn btn-outline btn-outline-dashed btn-active-light-primary active d-flex text-start p-6" data-kt-button="true">
 *       <!--begin::Radio-->
 *       <span class="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
 *         <input class="form-check-input" type="radio" name="type" value="1" checked="checked" />
 *       </span>
 *       <!--end::Radio-->
 *       <!--begin::Info-->
 *       <span class="ms-5">
 *         <span class="fs-4 fw-bold text-gray-800 mb-2 d-block">Personal Deal</span>
 *         <span class="fw-semibold fs-7 text-gray-600">If you need more info, please check it out</span>
 *       </span>
 *       <!--end::Info-->
 *     </label>
 *     <!--end::Option-->
 *   </div>
 *   <!--end::Col-->
 *   <!--begin::Col-->
 *   <div class="col">
 *     <!--begin::Option-->
 *     <label class="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6" data-kt-button="true">
 *       <!--begin::Radio-->
 *       <span class="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
 *         <input class="form-check-input" type="radio" name="type" value="2" />
 *       </span>
 *       <!--end::Radio-->
 *       <!--begin::Info-->
 *       <span class="ms-5">
 *         <span class="fs-4 fw-bold text-gray-800 mb-2 d-block">Corporate Deal</span>
 *         <span class="fw-semibold fs-7 text-gray-600">Create corporate account to manage users</span>
 *       </span>
 *       <!--end::Info-->
 *     </label>
 *     <!--end::Option-->
 *   </div>
 *   <!--end::Col-->
 * </div>
 * <!--end::Row-->
 * ```
 * 
 * JS:
 * ```js
 * import {components} from 'metronic-extension';
 * 
 * // Initializes the toggle for button group elements that have the dynamically added [data-kt-buttons="true"] attribute.
 * components.initToggleButton(document.body);
 * ```
 */
export default (element: string|HTMLElement|JQuery): void => {
  // Check parameters.
  if (isString(element))
    element = $(element as string).get(0) as HTMLElement;
  else if (element instanceof $)
    element = (element as JQuery).get(0) as HTMLElement;
  else if (!(element instanceof HTMLElement))
    throw new TypeError('element parameter should be HTMLElement selectors, elements, and JQuery object');

  // Find the button group element.
  const groups: HTMLElement[] = [].slice.call(element.querySelectorAll('[data-kt-buttons="true"]'));

  // Initialize toggle for button group elements.
  for (let group of groups) {
    // If the toggle for a button group has already been initialized, nothing is done.
    if (group.getAttribute('data-kt-initialized') === '1')
      return;

    // Selector for a button element under a button group element.
    const buttoSelector: string = group.hasAttribute('data-kt-buttons-target') ?
      group.getAttribute('data-kt-buttons-target') as string :
      '.btn';

    // Find the button element under the button group element.
    const buttons: HTMLElement[] = [].slice.call(group.querySelectorAll(buttoSelector));

    // Set up toggle processing for button click events.
    $(group).on('click', buttoSelector, (evnt: any) => {
      // Deactivate all buttons under the button group element.
      for (let button of buttons)
        button.classList.remove('active');

      // Activate clicked button.
      evnt.currentTarget.classList.add('active');
    });

    // Set the toggle initialization completion attribute for the button group.
    group.setAttribute('data-kt-initialized', '1');
  }
}