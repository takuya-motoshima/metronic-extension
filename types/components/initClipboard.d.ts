/**
 * Initialize clipboard.
 * @param {string|HTMLElement|JQuery} context A button element with a "data-clipboard-target" attribute that initiates a clipboard copy, or a context element or selector with such an element.
 * @param {number} delay Time (in milliseconds) to switch from the copy complete icon to the pre-copy icon. Default is 3000.
 * @example
 * HTML:
 * ```html
 * <!--begin::Input group-->
 * <div class="input-group">
 *   <!--begin::Input-->
 *   <input id="target" type="text" class="form-control" placeholder="name@example.com" value="name@example.com">
 *   <!--end::Input-->
 *   <!--begin::Button-->
 *   <button id="button" class="btn btn-icon btn-light" data-clipboard-target="#target">
 *     <i class="ki-duotone ki-copy fs-2"></i>
 *   </button>
 *   <!--end::Button-->
 * </div>
 * <!--end::Input group-->
 * ```
 *
 * JS:
 * ```js
 * import {components} from 'metronic-extension';
 *
 * // Initialize clipboard.
 * components.initClipboard(document.getElementById('button'));
 * ```
 */
declare const _default: (context: string | HTMLElement | JQuery, delay?: number) => void;
export default _default;
