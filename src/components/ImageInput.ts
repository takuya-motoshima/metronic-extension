import hbs from 'handlebars-extd';
import fusion from 'deep-fusion';
import compareImg from 'compare-img';
import $ from 'jquery';
import initTooltip from '~/components/initTooltip';
import fetchDataUrl from '~/http/fetchDataUrl';
import ImageInputOptions from '~/interfaces/ImageInputOptions';
import isDataUrl from '~/misc/isDataUrl';
import getExtensionFromDataUrl from '~/misc/getExtensionFromDataUrl';

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
  #imageInput: typeof window.KTImageInput;
  #changeHandler: (dataUrl: string|null) => void = (dataUrl: string|null) => {};
  #imgDataUrl: string|undefined;

  /**
   * Initialization.
   */
  constructor(context: HTMLDivElement|JQuery, options: ImageInputOptions) {
    if (context instanceof $)
      context = (context as JQuery).get(0) as HTMLDivElement;
    else if (!(context instanceof HTMLDivElement))
      throw new TypeError('The context parameter specifies an HTMLDivElement or a JQuery object of HTMLDivElement');
    options = fusion({
      current: undefined,
      default: undefined,
      hiddenEl: undefined,
      width: 125,
      height: 125,
      readonly: false,
      cancelable: false,
      accept: '.png,.jpg,.jpeg,.svg',
      language: {
        change: '変更する。',
        remove: '削除する。',
        cancel: '変更を取り消す。'
      }
    }, options);
    (async () => {
      const defaultImg = options.default ? await fetchDataUrl(options.default) : undefined;
      const currentImg = options.current ? await fetchDataUrl(options.current) : undefined;

      // If the current and the default image are the same, the image change cancel button is not displayed in the initial display.
      if (options.current && options.default && await compareImg(options.current, options.default))
        options.current = undefined;

      // Set the current image to the hidden element.
      if (options.hiddenEl && (defaultImg || currentImg))
        // The currernt optional image takes precedence over default.
        if (currentImg)
          options.hiddenEl.value = currentImg as string;
        else 
          options.hiddenEl.value = defaultImg as string;

      // Set the data URL of the current image.
      if (defaultImg || currentImg)
        // The currernt optional image takes precedence over default.
        if (currentImg)
          this.#imgDataUrl = currentImg as string;
        else 
          this.#imgDataUrl = defaultImg as string;

      // Rendering image input UI.
      this.#imageInput = this.#render(context as HTMLDivElement, options);

      // Initialize event handler.
      this.#initEventListeners(options, defaultImg);

      // Initialize Observer.
      this.#initObserver(options.hiddenEl);
    })();
  }


  /**
   * Set change event handler.
   */
  onchange(handler: (dataUrl: string|null) => void) {
    this.#changeHandler = handler;
  }

  /**
   * Get the data URL of the current image.
   */
  getImgDataUrl(): string|undefined {
    return this.#imgDataUrl;
  }

  /**
   * Download the current image.
   */
  download(): void {
    if (!this.#imgDataUrl)
      return;
    let link = document.createElement('a') as HTMLAnchorElement;
    const extension = getExtensionFromDataUrl(this.#imgDataUrl);
    link.download = `image.${extension}`;
    link.href = this.#imgDataUrl as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    (link as any) = null;
  }

  /**
   * Rendering image input UI.
   */
  #render(context: HTMLDivElement, options: ImageInputOptions) {
    context.classList.add(
      'image-input',
      'image-input-outline',
      options.current ? 'image-input-changed' : 'image-input-empty',
      'bg-light',
      // 'bg-dark'
    );
    // context.style.backgroundColor = '#babbbe';
    context.style.width = 'fit-content';
    context.style.backgroundImage = `url(${options.default})`;
    context.setAttribute('data-kt-image-input', 'false');
    context.insertAdjacentHTML('afterbegin', hbs.compile(
      `<div class="image-input-wrapper bgi-position-center" style="background-size: contain; {{#if current}}background-image: url({{current}});{{/if}} width: {{width}}px; height: {{height}}px;"></div>
      <label
        class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow {{ifx readonly 'd-none'}}"
        data-kt-image-input-action="change"
        data-bs-toggle="tooltip"
        data-bs-dismiss="click"
        title="{{language.change}}">
        <i class="bi bi-pencil-fill fs-7"></i>
        <input type="file" name="avatar" accept="{{accept}}" />
        <input type="hidden" name="avatar_remove" />
      </label>
      {{#if cancelable}}
        <span
          class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow {{ifx readonly 'd-none'}}"
          data-kt-image-input-action="cancel"
          data-bs-toggle="tooltip" data-bs-dismiss="click" title="{{language.cancel}}">
          <i class="bi bi-x fs-2"></i>
        </span>
      {{/if}}
      <span
        class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow {{ifx readonly 'd-none'}}"
        data-kt-image-input-action="remove"
        data-bs-toggle="tooltip" data-bs-dismiss="click" title="{{language.remove}}">
        <i class="bi bi-x fs-2"></i>
      </span>`)(options));
    initTooltip(context);
    const imageInput = new window.KTImageInput(context);
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
  #initEventListeners(options: ImageInputOptions, defaultImg: string|undefined): void {
    this.#imageInput.on('kt.imageinput.changed', async (input: typeof window.KTImageInput) => {
      // If cancellation is disabled, the delete button is forcibly displayed when editing the image.
      if (!options.cancelable)
        input.removeElement.style.display = 'flex';
    });
    this.#imageInput.on('kt.imageinput.removed', async (input: typeof window.KTImageInput) => {
      if (defaultImg) {
        // Set the default image when the image is canceled.
        if (options.hiddenEl)
          options.hiddenEl.value = defaultImg as string;

        // Set the data URL of the current image.
        this.#imgDataUrl = defaultImg as string;

        // Invoke change event.
        this.#changeHandler(defaultImg||null);
      }

      // If cancellation is disabled, the delete button is forcibly hidden when deleting an image.
      if (!options.cancelable)
        input.removeElement.style.display = 'none';
    });
  }

  /**
   * Initialize Observer.
   */
  #initObserver(hiddenEl: HTMLInputElement|undefined) {
    const observer = new MutationObserver(async mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type !== 'attributes' || mutation.attributeName !== 'style')
          continue;

        // Get the image source from the background style.
        const matches = this.#imageInput.wrapperElement.style.backgroundImage.match(/(?:\(['"]?)(.*?)(?:['"]?\))/);
        if (!matches)
          continue;
        const backgroundImg = matches[1];

        // Active image.
        const activeImg = isDataUrl(backgroundImg) ? backgroundImg : await fetchDataUrl(backgroundImg);

        // Set the selected image to the Hidden element.
        if (hiddenEl)
          hiddenEl.value = activeImg;

        // Set the data URL of the current image.
        this.#imgDataUrl = activeImg;

        // Invoke change event.
        this.#changeHandler(activeImg);
      }
    });
    observer.observe(this.#imageInput.wrapperElement, { 
      attributes: true, 
      childList: false,
      characterData: true,
      attributeFilter: ['style'],
    });
  }
}