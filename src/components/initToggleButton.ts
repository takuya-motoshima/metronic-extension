/**
 * Initialize button group components.
 *
 * @example
 * HTML:
 * ```html
 * <!--begin::Input group-->
 * <div>
 *   <!--begin::Label-->
 *   <label class="fs-6 fw-bolder mb-2 required">Gender</label>
 *   <!--End::Label-->
 *   <!--begin::Row-->
 *   <div class="row g-9" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button='true']">
 *     <!--begin::Col-->
 *     <div class="col">
 *       <!--begin::Option-->
 *       <label class="btn btn-outline btn-outline-dashed btn-active-light-primary active d-flex text-start p-6" data-kt-button="true">
 *         <!--begin::Radio-->
 *         <span class="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
 *           <input class="form-check-input" type="radio" name="campaign_gender" value="1" checked="checked" />
 *         </span>
 *         <!--end::Radio-->
 *         <!--begin::Info-->
 *         <span class="ms-5">
 *           <span class="fs-4 fw-bold text-gray-800 d-block">Male</span>
 *         </span>
 *         <!--end::Info-->
 *       </label>
 *       <!--end::Option-->
 *     </div>
 *     <!--end::Col-->
 *     <!--begin::Col-->
 *     <div class="col">
 *       <!--begin::Option-->
 *       <label class="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6" data-kt-button="true">
 *         <!--begin::Radio-->
 *         <span class="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
 *           <input class="form-check-input" type="radio" name="campaign_gender" value="2" />
 *         </span>
 *         <!--end::Radio-->
 *         <!--begin::Info-->
 *         <span class="ms-5">
 *           <span class="fs-4 fw-bold text-gray-800 d-block">Female</span>
 *         </span>
 *         <!--end::Info-->
 *       </label>
 *       <!--end::Option-->
 *     </div>
 *     <!--end::Col-->
 *   </div>
 *   <!--end::Row-->
 * </div>
 * <!--end::Input group-->
 * ```
 *
 * JS:
 * import {initToggleButton} from 'metronic-extension';
 *
 * // Initialize all toggle buttons under the document.
 * initToggleButton();
 *
 * // Initializes only the toggle buttons under the specified element.
 * initToggleButton();
 * ```
 */
export default (context: JQuery|HTMLElement): void => {
  // Check parameters.
  if (context instanceof $)
    context = (context as JQuery).get(0) as HTMLElement;
  else if (!(context instanceof HTMLElement))
    throw new TypeError('The context parameter specifies an HTMLElement or a JQuery object of HTMLElement');

  // Get the parent element surrounding the button element
  const buttonsGroup: HTMLElement[] = [].slice.call(context.querySelectorAll('[data-kt-buttons="true"]'));

  // Set events for button elements found.
  for (let group of buttonsGroup) {
    // If it has already been initialized, do nothing and process the next button element.
    if (group.getAttribute('data-kt-initialized') === '1')
      return;

    // Get the selector of the button element. Defaults to ".btn".
    const selector = group.hasAttribute('data-kt-buttons-target') ? group.getAttribute('data-kt-buttons-target') : '.btn';

    // Get all button elements.
    const activeButtons: HTMLElement[] = [].slice.call(group.querySelectorAll(selector as string));

    // Toggle Handler.
    $(group).on('click', selector, (evnt: any) => {
    // window.KTUtil.on(group, selector, 'click', (evnt: any) => {
      // Deactivate all buttons.
      for (let button of activeButtons)
        button.classList.remove('active');

      // Activate clicked buttons.
      evnt.currentTarget.classList.add('active');
    });

    // Make the parent element of the button already initialized.
    group.setAttribute('data-kt-initialized', '1');
  }
}
