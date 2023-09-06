/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
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
declare const _default: (context: JQuery | HTMLElement) => void;
export default _default;
