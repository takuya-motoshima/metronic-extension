import hbs from 'handlebars-extd';
import bootstrap from '~/utils/bootstrap';
import isAsyncFunction from '~/utils/isAsyncFunction';
import isFunction from '~/utils/isFunction';

/**
 * Abstract class for a modal that extends <a href="https://getbootstrap.com/docs/5.2/components/modal/" target="_blank">Bootstrap Modal</a>.
 * @abstract
 */
export default abstract class {
  /**
   * A jQuery object for a modal element. This is read-only.
   * @type {JQuery<HTMLDivElement>}
   * @readonly
   */
  protected get element(): JQuery<HTMLDivElement> {
    return this.#element as JQuery<HTMLDivElement>;
  }

  /**
   * bootstrap.Modal instance. This is read-only.
   * @type {bootstrap.Modal}
   */
  protected get instance(): bootstrap.Modal {
    return this.#instance as bootstrap.Modal;
  }

  /**
   * Includes a modal-backdrop element. Alternatively, specify <code>static</code> for a backdrop which doesn't close the modal on click. Default is true.
   * @type {boolean}
   */
  protected backdrop: boolean|'static' = true;

  /**
   * Closes the modal when escape key is pressed. Default is true.
   * @type {boolean}
   */
  protected keyboard: boolean = true;

  /**
   * Puts the focus on the modal when initialized. Default is true.
   * @type {boolean}
   */
  protected focus: boolean = true;

  /**
   * A jQuery object for a modal element.
   * @type {JQuery<HTMLDivElement>|undefined}
   */
  #element: JQuery<HTMLDivElement>|undefined;

  /**
   * bootstrap.Modal instance.
   * @type {bootstrap.Modal|undefined}
   */
  #instance: bootstrap.Modal|undefined;

  /**
   * Called when a modal is closed, it returns a response to the process that opened the modal and is waiting.
   * @type {((response: any) => void)|undefined}
   */
  #resolve: ((response: any) => void)|undefined;

  /**
   * Value returned to the process that opened the modal and is waiting.
   * Each time the modal is opened, false is set and initialized.
   * @type {any}
   */
  #response: any = false;

  /**
   * Stack of blockUI instances created to display the loader on the modal.
   * @type {KTBlockUI[]}
   */
  #blockStack: typeof window.KTBlockUI[] = [];

  /**
   * Modal show/hide status (true: show, false: hide).
   * @type {boolean}
   */
  #isShowing: boolean = false;

  /**
   * Create a new instance of the Modal class.
   * @throws {Error} Modal HTML generation process (render method) is not implemented in the subclass.
   * @throws {Error} Initial processing (init method) is not implemented in the subclass.
   */
  public constructor() {
    try {
      // Checks if the abstract method is implemented in a subclass.
      if (!isFunction(this.render) && !isAsyncFunction(this.render))
        throw new Error('Should implement modal HTML generation process (render method) in a subclass');
      else if (!isFunction(this.init) && !isAsyncFunction(this.init))
        throw new Error('Should implement initial processing (init method) in subclasses');
    } catch (err: any) {
      alert(err.message);
      throw err;
    }
  }

  /**
   * Implement the initial processing required when the modal is opened in a subclass.
   * Within this process, the modal's jQuery object (this.element) and instance (this.instance) are accessible.
   * This is called after the render method is called when showing a modal in a superclass.
   * @abstract
   * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
   * @return {Promise<void>|void}
   */
  protected abstract init(...params: any[]): Promise<void>|void;

  /**
   * Implement the process of returning the modal's HTML in a subclass.
   * This is called first when showing a modal in the superclass.
   * @abstract
   * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
   * @return {Promise<string>|string} 
   */
  protected abstract render(...params: any[]): Promise<string>|string;

  /**
   * Adds a modal element to the document and creates a modal instance.
   * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
   */
   async #init(...params: any[]) {
    // Call the modal HTML generation method of the subclass.
    let modalHtml: string;
    if (isAsyncFunction(this.render)) {
      // console.log('Calls the render() method of a subclass in await');
      modalHtml = await this.render.apply(this, params);
    } else {
      // console.log('Calls the render() method of the subclass');
      modalHtml = this.render.apply(this, params) as string;
    }

    // Append the modal element to the document.
    this.#element = $<HTMLDivElement>(modalHtml).appendTo('body');
    // console.log('Set modal HTML element to this.#element');

    // Create a modal instance.
    this.#instance = new bootstrap.Modal(this.#element, {
      backdrop: this.backdrop,
      keyboard: this.keyboard,
      focus: this.focus,
    });
  }

  /**
   * Show Modal. Initially, the init method of the subclass is executed.
   * @param {...any} params Any parameter required in the initial processing of the modal. This is passed to the init method implemented in the subclass.
   * @return {Promise<any>} Returns a response when the modal is closed.
   */
  public async show(...params: any[]): Promise<any> {
    // Adds a modal element to the document and creates a modal instance.
    await this.#init.apply(this, params);

    // Call initial processing.
    if (isAsyncFunction(this.init)) {
      // console.log('Call the init() method of the subclass in await');
      await this.init.apply(this, params);
    } else {
      // console.log('Calls the init() method of a subclass');
      this.init.apply(this, params);
    }

    // Set modal events.
    this.#element!
      .on('show.bs.modal', () => {
        // Called just before the modal opens.
        // Update show/hide status.
        this.#isShowing = true;
      })
      .on('shown.bs.modal', () => {
        // Called after opening a modal.
        // Call the afterShown method implemented in the subclass.
        this.afterShown();
      })
      .on('hide.bs.modal', () => {
        // Called before the modal closes.
        // Update show/hide status.
        this.#isShowing = false;
      })
      .on('hidden.bs.modal', () => {
        // Called after the modal is closed.

        // Open a modal and return a response to the waiting process.
        this.#resolve!(this.#response);

        // Destroy modal instances and elements.
        this.dispose();

        // Call the afterHidden method implemented in the subclass.
        this.afterHidden();
      });

    // Initializes a value that responds to a process that has opened a modal and is waiting.
    this.#response = false;

    // Open the modal.
    this.#instance!.show();

    // Returns a promise instance to the process that opened the modal and waits until the modal is closed.
    return new Promise(resolve => this.#resolve = resolve);
  }

  /**
   * Hide Modal.
   * @param {any} response? Response value to the process that opened the modal.
   */
  public hide(response?: any): void {
    // Save response value.
    if (response !== undefined)
      this.#response = response;

    // If a modal instance has been created, call the modal closing process.
    if (this.#instance)
      this.#instance.hide();
  }

  /**
   * Get modal show/hide status.
   * @return {boolean} Modal show/hide status (true: show, false: hide).
   */
  public isShowing(): boolean {
    return this.#isShowing;
  }

  /**
   * If there is processing to be performed immediately after the modal opens, implement it in a subclass.
   */
  protected afterShown() {}

  /**
   * If there is a process to be executed immediately after the modal is closed, implement it in a subclass.
   */
  afterHidden() {}

  /**
   * Enables the ability to close the modal by pressing the escape key.
   */
  protected enableEscapeKey(): void {
    if (this.#instance)
      // @ts-ignore Ignore Typescript syntax errors that occur because _config is not defined in bootstrap.Modal.
      this.#instance._config.keyboard = true;
  }

  /**
   * Disables the ability to close the modal by pressing the escape key.
   */
  protected disableEscapeKey(): void {
    if (this.#instance)
      // @ts-ignore Ignore Typescript syntax errors that occur because _config is not defined in bootstrap.Modal.
      this.#instance._config.keyboard = false;
  }

  /**
   * Show the loader in the modal.
   * @param {string} message Loading message.
   */
  protected showLoading(message: string): void {
    if (!this.#element)
      return;
    const blockUI = new window.KTBlockUI(this.#element.find('.modal-content').get(0), {
      message: hbs.compile(
        `<div class="blockui-message fw-bolder">
          <span class="spinner-border text-primary me-3"></span>
          <span>{{message}}</span>
        </div>`)({message})
    });
    blockUI.block();
    this.#blockStack.push(blockUI);
  }

  /**
   * Hide modal loader.
   */
  protected hideLoading() {
    if (this.#blockStack.length === 0)
      return;
    const blockUI = this.#blockStack.pop();
    blockUI.release();
    blockUI.destroy();
  }

  /**
   * Destroy modal instances and elements.
   * If additional processing is required, it can be overridden, but <code>super.dispose()</code> must be performed within the overridden method.
   */
  protected dispose(): void {
    // Discard modal instances, if any.
    if (this.#instance)
      this.#instance.dispose();

    // Delete the modal element from the document.
    if (this.#element)
      this.#element.remove();
  }
}