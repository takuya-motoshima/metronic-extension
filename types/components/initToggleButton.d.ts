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
declare const _default: (element: string | HTMLElement | JQuery) => void;
export default _default;
