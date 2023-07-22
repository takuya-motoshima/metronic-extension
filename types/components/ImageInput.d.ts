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
 * imageInput.onchange(dataUrl => {});
 *
 * @see {@link https://preview.keenthemes.com/metronic8/demo1/documentation/forms/image-input.html} Custom Bootstrap Image Input with Preview Component by Keenthemes.
 */
export default class {
    #private;
    /**
     * Initialization.
     */
    constructor(context: HTMLDivElement | JQuery, options: ImageInputOption);
    /**
     * Set change event handler.
     */
    onchange(handler: (dataUrl: string | null) => void): void;
    /**
     * Get the data URL of the current image.
     */
    getImgDataUrl(): string | undefined;
    /**
     * Download the current image.
     */
    download(): void;
    /**
     * Returns the selected image input instance input field.
     */
    getInputElement(): HTMLInputElement;
}
