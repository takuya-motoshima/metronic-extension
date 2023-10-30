import {merge} from 'deep-fusion';
import hbs from 'handlebars-extd';
import DropzoneOptions from '~/interfaces/DropzoneOptions';
import isString from '~/utils/isString';

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
  /** 
   * Callback function called when a file is added.
   * @type {(file: Dropzone.DropzoneFile) => void}
   */
  #addFileHandler: (file: Dropzone.DropzoneFile) => void = (file: Dropzone.DropzoneFile) => {};

  /** 
   * Callback function called when canceling an uploaded file.
   * @type {() => void}
   */
  #cancelFileHandler: () => void = () => {};

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
  public constructor(element: string|HTMLElement|JQuery, options: DropzoneOptions) {
    // Check parameters.
    if (isString(element))
      element = $(element as string).get(0) as HTMLElement;
    else if (element instanceof $)
      element = (element as JQuery).get(0) as HTMLElement;
    else if (!(element instanceof HTMLElement))
      throw new TypeError('element parameter should be HTMLElement selectors, elements, and JQuery object');

    // Initialize options.
    options = merge({
      hiddenInputContent: undefined,
      acceptedFiles: undefined,
      maxFilesize: undefined,
      dictDefaultMessage: 'Drop files here to upload',
      dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
      dictDescriptionMessage: undefined,
    }, options);

    // Container HTML.
    element.classList.add('dropzone');
    element.innerHTML = hbs.compile(
      `<!--begin::Message-->
      <div class="dz-message needsclick align-items-center">
        <!--begin::Icon-->
        <i class="bi bi-file-earmark-arrow-up text-primary fs-3x"></i>
        <!--end::Icon-->
        <!--begin::Info-->
        <div class="ms-4">
          <h3 class="fs-5 fw-bold text-gray-900 {{#if options.dictDescriptionMessage}}mb-1{{else}}mb-0{{/if}}">{{options.dictDefaultMessage}}</h3>
          {{#if options.dictDescriptionMessage}}
            <span class="fs-7 fw-semibold text-gray-900">{{options.dictDescriptionMessage}}</span>
          {{/if}}
        </div>
        <!--end::Info-->
      </div>
      <!--end::Message-->`)({options});

    // An instance of this class.
    const self = this;

    // Initialize dropzone.
    new window.Dropzone(element, {
    // this.#dropzone = new window.Dropzone(element, {
      url: 'dummy',
      acceptedFiles: options.acceptedFiles,
      maxFiles: 1,
      maxFilesize: options.maxFilesize,
      init: function(this: Dropzone) {
        this.on('addedfile', function(this: Dropzone, file: Dropzone.DropzoneFile) {
          if (this.files.length > 1)
            this.removeFile(this.files[0]);
          if (options.hiddenInputContent) {
            const reader = new FileReader();
            reader.onload = evnt => {
              const dataURL = (<FileReader>evnt.target).result as string;
              (options.hiddenInputContent as HTMLInputElement).value = dataURL;
            };
            reader.readAsDataURL(file);
          }
          self.#addFileHandler(file);
        });
        // this.on('maxfilesexceeded', function(this: Dropzone, file: Dropzone.DropzoneFile) {
        //   this.removeAllFiles();
        //   this.addFile(file);
        // });
        this.on('removedfile', function(this: Dropzone, file: Dropzone.DropzoneFile) {
          if (options.hiddenInputContent)
            (options.hiddenInputContent as HTMLInputElement).value = '';
          self.#cancelFileHandler();
        });
      },
      addRemoveLinks: true,
      autoProcessQueue: false,
      autoQueue: false,
      dictFileTooBig: options.dictFileTooBig
   });
  }

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
  public onAddFile(handler: (file: Dropzone.DropzoneFile) => void): DropzoneComponent {
    this.#addFileHandler = handler;
    return this;
  }

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
  public onCancelFile(handler: () => void): DropzoneComponent {
    this.#cancelFileHandler = handler;
    return this;
  }
}