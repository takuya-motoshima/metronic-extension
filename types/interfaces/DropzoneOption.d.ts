/**
 * Dropzone options.
 */
export default interface  {
    /**
     * hidden element to store the uploaded content.
     * For media data such as images and PDFs, DataURL is set; for text data such as CSV, text data is set.
     * @type {HTMLInputElement|undefined}
     */
    hiddenInputContent?: HTMLInputElement;
    /**
     * The default implementation of accept checks the file's mime type or extension against this list.
     * This is a comma separated list of mime types or file extensions.
     * Eg.: image/*,application/pdf,.psd
     * @type {number|undefined}
     */
    acceptedFiles?: string;
    /**
     * The maximum filesize (in bytes) that is allowed to be uploaded.
     * @type {number|undefined}
     */
    maxFilesize?: number;
    /**
     * Drop zone title text.
     * @type {string|undefined}
     */
    dictDefaultMessage?: string;
    /**
     * Drop zone description text.
     * @type {string|undefined}
     */
    dictDescriptionMessage?: string;
    /**
     * Error message to be displayed if the file size exceeds the allowable size.
     * @type {string|undefined}
     */
    dictFileTooBig?: string;
    /**
     * If true, debug logs are output to console.
     * @type {boolean|undefined}
     */
    debug?: boolean;
}
