// import ClipboardJS from 'clipboard';
import isString from '~/utils/isString';

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
 *   <input id="target" type="text" class="form-control" placeholder="name@example.com" value="name@example.com" />
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
 * import {initClipboard} from 'metronic-extension';
 * 
 * // Initialize clipboard.
 * initClipboard(document.getElementById('button'));
 * ```
 */
export default (context: string|HTMLElement|JQuery, delay: number = 3000): void => {
  // Check parameters.
  if (isString(context))
    context = $(context as string).get(0) as HTMLElement;
  else if (context instanceof $)
    context = (context as JQuery).get(0) as HTMLElement;
  else if (!(context instanceof HTMLElement))
    throw new TypeError('context parameter should be HTMLElement selectors, elements, and JQuery object');

  // Get the trigger element.
  const buttons = context.hasAttribute('data-clipboard-target') ? [context] : (context as HTMLElement).querySelectorAll('[data-clipboard-target]');

  // Set the copy event.
  for (let button of buttons) {
    const clipboard = new window.ClipboardJS(button);
    clipboard.on('success', (evnt: any) => {
      // Copy button element.
      const button = evnt.trigger as HTMLElement;

      // If the button does not have a clipboard-target attribute indicating the element to copy to, an error is returned.
      if (!button.dataset.clipboardTarget)
        throw new Error('Target element selector should be set to the "data-clipboard-target" attribute of the button element');

      // The element with the value to copy.
      const target = ((context as HTMLElement).hasAttribute('data-clipboard-target') ? document.body : context as HTMLElement).querySelector(button.dataset.clipboardTarget)!;
      // const target = (context as HTMLElement).querySelector(button.dataset.clipboardTarget)!;

      // Returns an error if the target element cannot be found.
      if (!target)
        throw new Error(`Cannot find element matching the "${button.dataset.clipboardTarget}" selector set in the "data-clipboard-target" attribute`);

      // Copy icon.
      const copyIcon =
        button.querySelector('.ki-copy')! ||// metronic version > 8.1.7
        button.querySelector('.svg-icon')!;// metronic version <= 8.1.7

      // Get the supporting metronic version (> 8.1.7).
      const isLatestVersion = copyIcon.classList.contains('ki-copy');

      // Check icon.
      let checkIcon = isLatestVersion ? button.querySelector('.ki-check')! : button.querySelector('.bi-check')!;
      if (checkIcon)
        // Exit if check icon is already shown.
        return;

      // Create check icon.
      checkIcon = document.createElement('i');
      if (isLatestVersion) {
        checkIcon.classList.add('ki-solid');
        checkIcon.classList.add('ki-check');
        checkIcon.classList.add('fs-2');
      } else {
        checkIcon.classList.add('bi');
        checkIcon.classList.add('bi-check');
        checkIcon.classList.add('fs-2x');
      }

      // Append check icon.
      button.appendChild(checkIcon);

      // Highlight target.
      target.classList.add('text-success');

      // Hide copy icon.
      copyIcon.classList.add('d-none');

      // After the specified number of seconds, the copy icon is displayed again.
      setTimeout(()  => {
        // Remove check icon.
        copyIcon.classList.remove('d-none');

        // Show check icon back.
        button.removeChild(checkIcon);

        // Remove highlight.
        target.classList.remove('text-success');
      }, delay);
    });
  }
}