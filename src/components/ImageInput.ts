import hbs from 'handlebars-extd';
import {merge} from 'deep-fusion';
import compare from 'compare-img';
import initTooltip from '~/components/initTooltip';
import fetchDataUrl from '~/utils/fetchDataUrl';
import ImageInputOptions from '~/interfaces/ImageInputOptions';
import isDataURI from '~/validators/isDataURI';
import getExtensionFromDataUrl from '~/utils/getExtensionFromDataUrl';
import isString from '~/utils/isString';

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
  /** 
   * KTImageInput instance.
   * @type {KTImageInput}
   */
  #imageInput: typeof window.KTImageInput;

  /** 
   * Callback function called when image is changed. The callback function receives the Data URL of the selected image.
   * @type {(dataURL: string|null) => void}
   */
  #changeHandler: (dataURL: string|null) => void = (dataURL: string|null) => {};

  /** 
   * Data URL of the selected image.
   * @type {string|null}
   */
  #imageDataURL: string|null = null;

  /** 
   * A hidden element that stores the Data URL of the selected image.
   * @type {HTMLInputElement|null}
   */
  #hiddenInput: HTMLInputElement|null = null;

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
  public constructor(element: string|HTMLDivElement|JQuery, options: ImageInputOptions) {
    // Check parameters.
    if (isString(element))
      element = $(element as string).get(0) as HTMLDivElement;
    else if (element instanceof $)
      element = (element as JQuery).get(0) as HTMLDivElement;
    else if (!(element instanceof HTMLDivElement))
      throw new TypeError('element parameter should be HTMLDivElement selectors, elements, and JQuery object');

    // Initialize options.
    options = merge({
      default: element.dataset.imageInputDefault,
      current: element.dataset.imageInputCurrent,
      hiddenEl: undefined,
      width: 125,
      height: 125,
      readonly: false,
      cancelable: false,
      accept: '.png,.jpg,.jpeg,.svg',
      language: {
        change: 'Change',
        remove: 'Delete',
        cancel: 'Cancel and undo changes'
      }
    }, options);

    // Save hidden elements as members.
    if (options.hiddenEl)
      this.#hiddenInput = options.hiddenEl;

    // Render the current and default images.
    (async () => {
      // If the default image is not a DataURL but a URL, it is loaded remotely.
      let defaultImage;
      if (options.default)
        defaultImage = isDataURI(options.default, 'image/*') ? options.default : await fetchDataUrl(options.default);

      // If the current image is not a DataURL but a URL, it is loaded remotely.
      if (options.current)
        this.#imageDataURL = isDataURI(options.current, 'image/*') ? options.current : await fetchDataUrl(options.current);

      // If the current and the default image are the same, the image change cancel button is not displayed in the initial display.
      if (options.current && options.default && await compare(options.current, options.default))
        options.current = undefined;

      // If the current image and default image are specified, priority is given to saving and displaying the current image.
      if (defaultImage || this.#imageDataURL) {
        // Set images for hidden elements.
        if (this.#hiddenInput)
          this.#hiddenInput.value = this.#imageDataURL || defaultImage as string;

        // If no image is currently available, the default image is saved.
        if (!this.#imageDataURL)
          this.#imageDataURL = defaultImage as string;
      }

      // Rendering ImageInput UI.
      this.#imageInput = this.#render(element as HTMLDivElement, options);

      // Initialize image input events.
      this.#initEventListeners(options, defaultImage);

      // Initialize Observer.
      this.#initObserver();
    })();
  }

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
  public onChange(handler: (dataURL: string|null) => void): ImageInput {
    this.#changeHandler = handler;
    return this;
  }

  /**
   * Downloading the image under selection.
   */
  public download(): void {
    if (!this.#imageDataURL)
      return;
    let link = document.createElement('a') as HTMLAnchorElement;
    const extension = getExtensionFromDataUrl(this.#imageDataURL);
    link.download = `image.${extension}`;
    link.href = this.#imageDataURL as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    (link as any) = null;
  }

  /**
   * Get input element.
   * @return {HTMLInputElement} Input Element.
   */
  public getInputElement(): HTMLInputElement {
    return this.#imageInput.getInputElement();
  }

  /**
   * Get Data URL of selected image.
   * @return {string|null} Data URL.
   */
  public getImage(): string|null {
    return this.#imageDataURL;
  }

  /**
   * Get the hidden element that contains the Data URL of the selected image.
   * @return {HTMLInputElement|null} Hidden Element.
   */
  public getHiddenElement(): HTMLInputElement|null {
    return this.#hiddenInput;
  }

  /**
   * Rendering ImageInput UI.
   * @param {HTMLDivElement} element Element to draw the image input element.
   * @param {ImageInputOptions} options Image input options.
   */
  #render(element: HTMLDivElement, options: ImageInputOptions) {
    // Context styling.
    element.classList.add(
      'image-input',
      'image-input-outline',
      options.current ? 'image-input-changed' : 'image-input-empty',
      'bg-light',
      // 'bg-dark'
    );
    element.style.width = 'fit-content';

    // If there is a default image, set it as the element background.
    if (options.default)
      element.style.backgroundImage = `url(${options.default})`;
    element.setAttribute('data-kt-image-input', 'false');

    // Render ImageInput HTML to element.
    element.insertAdjacentHTML('afterbegin', hbs.compile(
      `<!--begin::Preview-->
      <div
        {{#unless options.readonly}}
          data-bs-toggle="tooltip"
          data-bs-dismiss="click"
          title="{{options.language.change}}"
        {{/unless}}
        class="image-input-wrapper bgi-position-center {{#unless options.readonly}}cursor-pointer{{/unless}}"
        style="background-size: contain; {{#if (notEmpty options.current)}}background-image: url({{options.current}});{{/if}} width: {{options.width}}px; height: {{options.height}}px;">
      </div>
      <!--end::Preview-->
      <!--begin::Edit-->
      <label
        class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow {{ifx options.readonly 'd-none'}}"
        data-kt-image-input-action="change"
        data-bs-toggle="tooltip"
        data-bs-dismiss="click"
        title="{{options.language.change}}">
        <i class="bi bi-pencil-fill fs-6"></i>
        <input type="file" name="avatar" accept="{{options.accept}}" />
        <input type="hidden" name="avatar_remove" />
      </label>
      <!--end::Edit-->
      {{#if options.cancelable}}
        <!--begin::Cancel-->
        <span
          class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow {{ifx options.readonly 'd-none'}}"
          data-kt-image-input-action="cancel"
          data-bs-toggle="tooltip"
          data-bs-dismiss="click"
          title="{{options.language.cancel}}">
          <i class="bi bi-x fs-3"></i>
        </span>
        <!--end::Cancel-->
      {{/if}}
      <!--begin::Remove-->
      <span
        class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow {{ifx options.readonly 'd-none'}}"
        data-kt-image-input-action="remove"
        data-bs-toggle="tooltip"
        data-bs-dismiss="click"
        title="{{options.language.remove}}">
        <i class="bi bi-x fs-3"></i>
      </span>
      <!--end::Remove-->`)({options}));

    // Initialize tooltip.
    initTooltip(element);

    // Initialize the ImageInput component.
    const imageInput = new window.KTImageInput(element);

    // If there is currently an image and the Cancel button is disabled, the Delete Image button is shown.
    if (options.current && !options.cancelable)
      imageInput.removeElement.style.display = 'flex';

    // Removes the name attribute that was automatically added to the file element and the name attribute of the hidden element that was automatically added.
    // This prevents unintended data from being sent when the form is sent.
    imageInput.inputElement.removeAttribute('name');
    imageInput.hiddenElement.removeAttribute('name');
    return imageInput;
  }

  /**
   * Initialize image input events.
   * @param {ImageInputOptions} options Image input options.
   * @param {string|undefined} defaultImage Data URL of the default image to be displayed when no image is selected.
   */
  #initEventListeners(options: ImageInputOptions, defaultImage: string|undefined): void {
    // This event fires on when the ImageInput has been changed.
    this.#imageInput.on('kt.imageinput.changed', async (input: typeof window.KTImageInput) => {
      // If cancellation is disabled, the delete button is forcibly displayed when editing the image.
      if (!options.cancelable)
        input.removeElement.style.display = 'flex';
    });

    // This event fires on when the ImageInput has been removed.
    this.#imageInput.on('kt.imageinput.removed', async (input: typeof window.KTImageInput) => {
      if (defaultImage) {
        // If there is a default image.
        // Set default image for hidden elements.
        if (this.#hiddenInput)
          this.#hiddenInput.value = defaultImage as string;

        // Set the data URL of the current image.
        this.#imageDataURL = defaultImage as string;
      } else {
        // If there is no default image.
        // Clear hidden elements.
        if (this.#hiddenInput)
          this.#hiddenInput.value = '';

        // Currently clearing the image.
        this.#imageDataURL = null;
      }

      // If cancellation is disabled, the delete button is forcibly hidden when deleting an image.
      if (!options.cancelable)
        input.removeElement.style.display = 'none';

      // Invoke change event.
      this.#changeHandler(this.#imageDataURL);
    });

    // Unless it is read-only.
    if (!options.readonly)
      // Open file selection dialog when clicking preview.
      this.#imageInput.wrapperElement.addEventListener('click', () => {
        // Get edit button element.
        const editButton = this.#imageInput.getElement().querySelector('[data-kt-image-input-action="change"]');

        // Triggers the click event of the Edit button to open the file selection dialog.
        editButton.click();
      }, {passive: true});
  }

  /**
   * Initialize Observer.
   */
  #initObserver() {
    const observer = new MutationObserver(async mutationsList => {
      for (let mutation of mutationsList) {
        // If it is not a style or attribute that has been changed, do nothing.
        if (mutation.type !== 'attributes' || mutation.attributeName !== 'style')
          continue;

        // Get the source of the image.
        const matches = this.#imageInput.wrapperElement.style.backgroundImage.match(/(?:\(['"]?)(.*?)(?:['"]?\))/);
        if (!matches)
          continue;

        // Get current image.
        this.#imageDataURL = isDataURI(matches[1], 'image/*') ? matches[1] : await fetchDataUrl(matches[1]);

        // Update on hidden elements.
        if (this.#hiddenInput)
          this.#hiddenInput.value = this.#imageDataURL as string;

        // Invoke change event.
        this.#changeHandler(this.#imageDataURL);
      }
    });
    observer.observe(this.#imageInput.wrapperElement, {attributes: true, childList: false, characterData: true, attributeFilter: ['style']});
  }
}