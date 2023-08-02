import ImageInputOption from '~/interfaces/ImageInputOption';
/**
 * Image input.
 *
 * @example
 * // HTML: <div id="imageInput"></div>
 * import {ImageInput} from 'metronic-extension';
 *
 * const imageInput =  new ImageInput(document.querySelector('#imageInput'), {
 *   current: 'current.png',
 *   default: 'default.png'
 * });
 * imageInput.onChange(currentImage => {});
 *
 * @see {@link https://preview.keenthemes.com/metronic8/demo1/documentation/forms/image-input.html} Custom Bootstrap Image Input with Preview Component by Keenthemes.
 */
export default class ImageInput {
    #private;
    /**
     * Initialization.
     */
    constructor(context: HTMLDivElement | JQuery, options: ImageInputOption);
    /**
     * Set change event handler.
     */
    onChange(handler: (currentImage: string | null) => void): ImageInput;
    /**
     * Download the current image.
     */
    download(): void;
    /**
     * Returns the selected image input instance input field.
     */
    getInputElement(): HTMLInputElement;
    /**
     * Get the data URL of the current image.
     */
    getImage(): string | null;
    /**
     * Returns the hidden field of the selected image input instance.
     */
    getHiddenElement(): HTMLInputElement | null;
}
