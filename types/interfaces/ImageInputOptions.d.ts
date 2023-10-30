/**
 * ImageInput component options.
 */
export default interface ImageInputOptions {
    /**
     * The path or Data URL of the image to display by default if no image is selected; default is none (undefined).
     */
    default?: string;
    /**
     * Path or Data URL of the current image, default is none (undefined).
     */
    current?: string;
    /**
     * A hidden element that sets the Data URL for the currently selected image. Default is none (undefined).
     */
    hiddenEl?: HTMLInputElement;
    /**
     * Width of the image preview area in pixels. Default is 125.
     */
    width?: number;
    /**
     * Height of the image preview area in pixels. Default is 125.
     */
    height?: number;
    /**
     * If true, read-only. Default is false (editable).
     */
    readonly?: boolean;
    /**
     * If true, the Cancel Change (Undo) button is displayed. Default is false (cancel button is hidden).
     */
    cancelable?: boolean;
    /**
     * A comma-separated list of MIME types or file extensions (e.g., "image/*,application/pdf,.psd") for files that are allowed to be uploaded.
     * Default is ".png,.jpg,.jpeg,.svg".
     */
    accept?: string;
    /**
     * Strings used in the user interface.
     */
    language?: {
        /**
         * Tooltip for the change button. Default is "Change".
         */
        change: string;
        /**
         * Delete button tooltip. Default is "Delete".
         */
        remove: string;
        /**
         * Tooltip for the Cancel Change button. Default is "Cancel and undo changes".
         */
        cancel: string;
    };
}
