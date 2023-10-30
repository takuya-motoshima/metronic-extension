import ImageInputOptions from '~/interfaces/ImageInputOptions';
/**
 * Image input field component.
 * @example
 * HTML:
 * ```html
 * <!--begin::ImageInput-->
 * <div id="myImageInput"></div>
 * <!--end::ImageInput-->
 * <!--begin::Image data URL-->
 * <input id="myImageDataURL" type="hidden">
 * <!--end::Image data URL-->
 * ```
 *
 * JS:
 * ```js
 * import {ImageInput} from 'metronic-extension';
 *
 * // Initialize ImageInput.
 * const imageInput =  new ImageInput(document.getElementById('myImageInput'), {
 *   default: '/img/avatar1.svg',
 *   current: '/img/avatar2.png',
 *   width: 125,
 *   height: 125,
 *   hiddenEl: document.getElementById('myImageDataURL'),
 *   language: {
 *     change: 'Change this image',
 *     remove: 'Delete this image',
 *     cancel: 'Cancel changes to this image'
 *   }
 * });
 *
 * // Set callbacks for image changes.
 * imageInput.onChange(dataURL => {});
 * ```
 */
export default class ImageInput {
    #private;
    /**
     * Create a new instance of the ImageInput class.
     * @param {string|HTMLDivElement|JQuery} element HTMLDivElement selector, element, or JQuery object.
     * @param {string} options.default? The path or Data URL of the image to display by default if no image is selected; default is none (undefined).
     * @param {string} options.current? Path or Data URL of the current image, default is none (undefined).
     * @param {HTMLInputElement} options.hiddenEl? A hidden element that sets the Data URL for the currently selected image. Default is none (undefined).
     * @param {number} options.width? Width of the image preview area in pixels. Default is 125.
     * @param {number} options.height? Height of the image preview area in pixels. Default is 125.
     * @param {boolean} options.readonly? If true, read-only. Default is false (editable).
     * @param {boolean} options.cancelable? If true, the Cancel Change (Undo) button is displayed. Default is false (cancel button is hidden).
     * @param {string} options.accept? A comma-separated list of MIME types or file extensions (e.g., "image/*,application/pdf,.psd") for files that are allowed to be uploaded. Default is ".png,.jpg,.jpeg,.svg".
     * @param {string} options.language.change? Tooltip for the change button. Default is "Change".
     * @param {string} options.language.remove? Delete button tooltip. Default is "Delete".
     * @param {string} options.language.cancel? Tooltip for the Cancel Change button. Default is "Cancel and undo changes".
     */
    constructor(element: string | HTMLDivElement | JQuery, options: ImageInputOptions);
    /**
     * Sets the callback function that will be called when an image is modified. The callback function receives the Data URL of the image.
     * @param {(dataURL: string|null) => void} handler Callback function.
     * @return {ImageInput}
     * @example
     * ```js
     * // Set callbacks for image changes.
     * imageInput.onChange(dataURL => {
     *   alert('Changed image');
     * });
     * ```
     */
    onChange(handler: (dataURL: string | null) => void): ImageInput;
    /**
     * Downloading the image under selection.
     */
    download(): void;
    /**
     * Get input element.
     * @return {HTMLInputElement} Input Element.
     */
    getInputElement(): HTMLInputElement;
    /**
     * Get Data URL of selected image.
     * @return {string|null} Data URL.
     */
    getImage(): string | null;
    /**
     * Get the hidden element that contains the Data URL of the selected image.
     * @return {HTMLInputElement|null} Hidden Element.
     */
    getHiddenElement(): HTMLInputElement | null;
}
