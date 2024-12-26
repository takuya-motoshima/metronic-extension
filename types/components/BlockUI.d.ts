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
 * // Get DOM element references.
 * const ref = components.selectRef();
 *
 * // Initialize the component and set up event listeners.
 * const blockUI = new components.BlockUI(ref.target, 'Loading...', false);
 *
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
    #private;
    /**
     * Create a new instance of the BlockUI class.
     * @param {HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
     * @param {string} message Message displayed during blocking.
     * @param {boolean} firstBlock If true, it is blocked immediately after instance creation. Default is true.
     */
    constructor(element: string | HTMLElement | JQuery, message: string, firstBlock?: boolean);
    /**
     * Block.
     * @return {BlockUI}
     * @example
     * ```js
     * blockUI.block();
     * ```
     */
    block(): BlockUI;
    /**
     * Unblock.
     * @return {BlockUI}
     * @example
     * ```js
     * blockUI.release();
     * ```
     */
    release(): BlockUI;
    /**
     * Check if it is blocking.
     * @return {boolean} True if currently blocking, false if not.
     */
    isBlocked(): boolean;
    /**
     * Discard the loading indicator.
     */
    destroy(): void;
}
