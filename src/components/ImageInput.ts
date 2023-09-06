import hbs from 'handlebars-extd';
import {merge} from 'deep-fusion';
import compare from 'compare-img';
import initTooltip from '~/components/initTooltip';
import fetchDataUrl from '~/http/fetchDataUrl';
import ImageInputOptions from '~/interfaces/ImageInputOptions';
import isDataUrl from '~/misc/isDataUrl';
import getExtensionFromDataUrl from '~/misc/getExtensionFromDataUrl';

/**
 * Image input.
 * 
 * @example
 * HTML:
 * ```html
 * <div id="imageInput"></div>
 * ```
 *
 * JS:
 * ```js 
 * import {ImageInput} from 'metronic-extension';
 *
 * const imageInput =  new ImageInput(document.querySelector('#imageInput'), {
 *   current: 'current.png',
 *   default: 'default.png'
 * });
 * imageInput.onChange(currentImage => {});
 * ```
 * 
 * @see {@link https://preview.keenthemes.com/metronic8/demo1/documentation/forms/image-input.html} Custom Bootstrap Image Input with Preview Component by Keenthemes.
 */
export default class ImageInput {
  #imageInput: typeof window.KTImageInput;
  #changeHandler: (currentImage: string|null) => void = (currentImage: string|null) => {};
  #image: string|null = null;
  #hiddenEl: HTMLInputElement|null = null;

  /**
   * Initialization.
   */
  constructor(context: HTMLDivElement|JQuery, options: ImageInputOptions) {
    // Check parameters.
    if (context instanceof $)
      context = (context as JQuery).get(0) as HTMLDivElement;
    else if (!(context instanceof HTMLDivElement))
      throw new TypeError('The context parameter specifies an HTMLDivElement or a JQuery object of HTMLDivElement');

    // Initialize options.
    options = merge({
      current: context.dataset.imageInputCurrent,
      default: context.dataset.imageInputDefault,
      hiddenEl: undefined,
      width: 125,
      height: 125,
      readonly: false,
      cancelable: false,
      accept: '.png,.jpg,.jpeg,.svg',
      language: {
        change: 'Change',
        remove: 'Delete',
        cancel: 'Cancel change'
      }
    }, options);

    // Save hidden elements as members.
    if (options.hiddenEl)
      this.#hiddenEl = options.hiddenEl;

    // Render the current and default images.
    (async () => {
      // If the default image is not a DataURL but a URL, it is loaded remotely.
      let defaultImage;
      if (options.default)
        defaultImage = isDataUrl(options.default) ? options.default : await fetchDataUrl(options.default);

      // If the current image is not a DataURL but a URL, it is loaded remotely.
      if (options.current)
        this.#image = isDataUrl(options.current) ? options.current : await fetchDataUrl(options.current);

      // If the current and the default image are the same, the image change cancel button is not displayed in the initial display.
      if (options.current && options.default && await compare(options.current, options.default))
        options.current = undefined;

      // If the current image and default image are specified, priority is given to saving and displaying the current image.
      if (defaultImage || this.#image) {
        // Set images for hidden elements.
        if (this.#hiddenEl)
          this.#hiddenEl.value = this.#image || defaultImage as string;

        // If no image is currently available, the default image is saved.
        if (!this.#image)
          this.#image = defaultImage as string;
      }

      // Rendering image input UI.
      this.#imageInput = this.#render(context as HTMLDivElement, options);

      // Initialize event handler.
      this.#initEventListeners(options, defaultImage);

      // Initialize Observer.
      this.#initObserver();
    })();
  }

  /**
   * Set change event handler.
   */
  onChange(handler: (currentImage: string|null) => void): ImageInput {
    this.#changeHandler = handler;
    return this;
  }

  /**
   * Download the current image.
   */
  download(): void {
    if (!this.#image)
      return;
    let link = document.createElement('a') as HTMLAnchorElement;
    const extension = getExtensionFromDataUrl(this.#image);
    link.download = `image.${extension}`;
    link.href = this.#image as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    (link as any) = null;
  }

  /**
   * Returns the selected image input instance input field.
   */
  getInputElement(): HTMLInputElement {
    return this.#imageInput.getInputElement();
  }

  /**
   * Get the data URL of the current image.
   */
  getImage(): string|null {
    return this.#image;
  }

  /**
   * Returns the hidden field of the selected image input instance.
   */
  getHiddenElement(): HTMLInputElement|null {
    return this.#hiddenEl;
  }

  /**
   * Rendering image input UI.
   */
  #render(context: HTMLDivElement, options: ImageInputOptions) {
    // Context styling.
    context.classList.add(
      'image-input',
      'image-input-outline',
      options.current ? 'image-input-changed' : 'image-input-empty',
      'bg-light',
      // 'bg-dark'
    );
    // context.style.backgroundColor = '#babbbe';
    context.style.width = 'fit-content';

    // If there is a default image, set it as the context background.
    if (options.default)
      context.style.backgroundImage = `url(${options.default})`;
    context.setAttribute('data-kt-image-input', 'false');

    // Render image input HTML to context.
    context.insertAdjacentHTML('afterbegin', hbs.compile(
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
    initTooltip(context);

    // Initialize the image input component.
    const imageInput = new window.KTImageInput(context);

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
   * Initialize event handler.
   */
  #initEventListeners(options: ImageInputOptions, defaultImage: string|undefined): void {
    // This event fires on when the image input has been changed.
    this.#imageInput.on('kt.imageinput.changed', async (input: typeof window.KTImageInput) => {
      // If cancellation is disabled, the delete button is forcibly displayed when editing the image.
      if (!options.cancelable)
        input.removeElement.style.display = 'flex';
    });

    // This event fires on when the image input has been removed.
    this.#imageInput.on('kt.imageinput.removed', async (input: typeof window.KTImageInput) => {
      if (defaultImage) {
        // If there is a default image.
        // Set default image for hidden elements.
        if (this.#hiddenEl)
          this.#hiddenEl.value = defaultImage as string;

        // Set the data URL of the current image.
        this.#image = defaultImage as string;
      } else {
        // If there is no default image.
        // Clear hidden elements.
        if (this.#hiddenEl)
          this.#hiddenEl.value = '';

        // Currently clearing the image.
        this.#image = null;
      }

      // If cancellation is disabled, the delete button is forcibly hidden when deleting an image.
      if (!options.cancelable)
        input.removeElement.style.display = 'none';

      // Invoke change event.
      this.#changeHandler(this.#image);
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
        this.#image = isDataUrl(matches[1]) ? matches[1] : await fetchDataUrl(matches[1]);

        // Update on hidden elements.
        if (this.#hiddenEl)
          this.#hiddenEl.value = this.#image as string;

        // Invoke change event.
        this.#changeHandler(this.#image);
      }
    });
    observer.observe(this.#imageInput.wrapperElement, {attributes: true, childList: false, characterData: true, attributeFilter: ['style']});
  }
}