/// <reference types="dropzone" />
import DropzoneOptions from '~/interfaces/DropzoneOptions';
/**
 * Drag-and-drop file upload component with image preview.
 * @example
 * HTML:
 * ```html
 * <!--begin::Dropzone-->
 * <div id="myDropzone"></div>
 * <!--end::Dropzone-->
 * <!--begin::DataURL of the selected file-->
 * <input id="myFileContent" type="hidden">
 * <!--end::DataURL of the selected file-->
 * ```
 *
 * JS:
 * ```js
 * import {Dropzone} from 'metronic-extension';
 *
 * // Initializes Dropzone.
 * const dropzone = new Dropzone(document.getElementById('myDropzone'), {
 *   hiddenInputContent: document.getElementById('myFileContent'),
 *   maxFilesize: 10,
 *   dictDescriptionMessage: 'Files up to 10 MB can be uploaded',
 * });
 * ```
 */
export default class DropzoneComponent {
    #private;
    /**
     * Create a new instance of the DropzoneComponent class.
     * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
     * @param {HTMLInputElement} options.hiddenInputContent? hidden element to store the uploaded content. For media data such as images and PDFs, DataURL is set; for text data such as CSV, text data is set.
     * @param {string} options.acceptedFiles? A comma-separated list of MIME types or file extensions (e.g., "image/*,application/pdf,.psd") for files that are allowed to be uploaded. Default is none (undefined).
     * @param {number} options.maxFilesize? The maximum filesize (in bytes) that is allowed to be uploaded. Default is none (undefined).
     * @param {string} options.dictDefaultMessage? Drop zone title text. Default is "Drop files here to upload".
     * @param {string} options.dictDescriptionMessage? Drop zone description text. Default is none (undefined).
     * @param {string} options.dictFileTooBig? Error message to be displayed if the file size exceeds the allowable size.
     *                                          Default is "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.".
     *                                          "{{filesize}}" is set to the selected file size, and "{{maxFilesize}}" is set to the file size that can be uploaded.
     */
    constructor(element: string | HTMLElement | JQuery, options: DropzoneOptions);
    /**
     * Sets the callback function to be called when a file is added. The callback function takes a file object.
     * @param {(file: Dropzone.DropzoneFile) => void} handler Callback function.
     * @return {DropzoneComponent}
     * @example
     * ```js
     * // Called when a file is added.
     * dropzone.onAddFile(file => {
     *   alert(`From additional handlers. Select ${file.name}`);
     * });
     * ```
     */
    onAddFile(handler: (file: Dropzone.DropzoneFile) => void): DropzoneComponent;
    /**
     * Sets the callback function to be called when an uploaded file is canceled.
     * @param {() => void} handler Callback function.
     * @return {DropzoneComponent}
     * @example
     * ```js
     * // Called when an uploaded file is canceled.
     * dropzone.onCancelFile(() => {
     *   alert('Canceled file selection');
     * });
     * ```
     */
    onCancelFile(handler: () => void): DropzoneComponent;
}
