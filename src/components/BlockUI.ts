import hbs from 'handlebars-extd';
import isString from '~/utils/isString';

/**
 * BlockUI blocks elements with overlays and loading indicators.
 * @example
 * HTML:
 * ```html
 * <div data-ref="target" class="rounded border p-10 mb-10">
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Inceptos imperdiet magna! Sed fusce fames tempus litora venenatis.
 *   Ac aliquet leo hendrerit taciti viverra? Nisl suscipit potenti accumsan quis ipsum purus cursus. 
 *   Suspendisse ultrices morbi in purus lectus dictum porta; Commodo penatibus nec.
 * </div>
 * <button data-on-block data-ref="blockButton" type="button" class="btn btn-primary">Block</button>
 * ```
 * 
 * JS:
 * ```js
 * import {components} from 'metronic-extension';
 * 
 * // Search for elements.
 * const ref = components.selectRef();
 *
 * // Block #target element. Do not block initially.
 * const blockUI = new components.BlockUI(ref.target, 'Loading...', false);
 * 
 * // Initialize events.
 * $('body').on('click', '[data-on-block]', () => {
 *   if (blockUI.isBlocked()) {
 *     // If currently blocking, unblock.
 *     blockUI.release();
 * 
 *     // Changed block button text.
 *     ref.blockButton.text('Block');
 *   } else {
 *     // If not currently blocking, block.
 *     blockUI.block();
 * 
 *     // Changed block button text.
 *     ref.blockButton.text('Release');
 *   }
 * });
 * ```
 */
export default class BlockUI {
  /**
   * KTBlockUI instance.
   * @type {KTBlockUI}
   */
  #blockUI: typeof window.KTBlockUI;

  /**
   * Create a new instance of the BlockUI class.
   * @param {HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
   * @param {string} message Message displayed during blocking.
   * @param {boolean} firstBlock If true, it is blocked immediately after instance creation. Default is true.
   */
  public constructor(element: string|HTMLElement|JQuery, message: string, firstBlock = true) {
    // Check parameters.
    if (isString(element))
      element = $(element as string).get(0) as HTMLElement;
    else if (element instanceof $)
      element = (element as JQuery).get(0) as HTMLElement;
    else if (!(element instanceof HTMLElement))
      throw new TypeError('element parameter should be HTMLElement selectors, elements, and JQuery object');

    // Obtain a previously created KTBlockUI instance.
    this.#blockUI = window.KTBlockUI.getInstance(element);
    if (!this.#blockUI)
      // If there is no KTBlockUI instance, create one.
      this.#blockUI = new window.KTBlockUI(element, {
        message: hbs.compile(
          `<div class="blockui-message fw-bolder">
            <span class="spinner-border text-primary me-3"></span>
            <span>{{message}}</span>
          </div>`)({message})
      });

    // If the firstBlock parameter is true, block immediately.
    if (firstBlock)
      this.block();
  }

  /**
   * Block.
   * @return {BlockUI}
   * @example
   * ```js
   * blockUI.block();
   * ```
   */
  public block(): BlockUI {
    if (!this.isBlocked())
      this.#blockUI.block();
    return this;
  }

  /**
   * Unblock.
   * @return {BlockUI}
   * @example
   * ```js
   * blockUI.release();
   * ```
   */
  public release(): BlockUI {
    if (this.isBlocked())
      this.#blockUI.release();
    return this;
  }

  /**
   * Check if it is blocking.
   * @return {boolean} True if currently blocking, false if not.
   */
  public isBlocked(): boolean {
    return this.#blockUI.isBlocked();
  }

  /**
   * Discard the loading indicator.
   */
  public destroy(): void {
    this.release();
    this.#blockUI.destroy();
  }
}