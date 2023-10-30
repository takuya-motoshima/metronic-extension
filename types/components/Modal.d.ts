/**
 * Abstract class for a modal that extends <a href="https://getbootstrap.com/docs/5.2/components/modal/" target="_blank">Bootstrap Modal</a>.
 * @abstract
 */
export default abstract class {
    #private;
    /**
     * A jQuery object for a modal element. This is read-only.
     * @type {JQuery<HTMLDivElement>}
     * @readonly
     */
    protected get element(): JQuery<HTMLDivElement>;
    /**
     * bootstrap.Modal instance. This is read-only.
     * @type {bootstrap.Modal}
     */
    protected get instance(): bootstrap.Modal;
    /**
     * Includes a modal-backdrop element. Alternatively, specify <code>static</code> for a backdrop which doesn't close the modal on click. Default is true.
     * @type {boolean}
     */
    protected backdrop: boolean | 'static';
    /**
     * Closes the modal when escape key is pressed. Default is true.
     * @type {boolean}
     */
    protected keyboard: boolean;
    /**
     * Puts the focus on the modal when initialized. Default is true.
     * @type {boolean}
     */
    protected focus: boolean;
    /**
     * Create a new instance of the Modal class.
     * @throws {Error} Modal HTML generation process (render method) is not implemented in the subclass.
     * @throws {Error} Initial processing (init method) is not implemented in the subclass.
     */
    constructor();
    /**
     * Implement the initial processing required when the modal is opened in a subclass.
     * Within this process, the modal's jQuery object (this.element) and instance (this.instance) are accessible.
     * This is called after the render method is called when showing a modal in a superclass.
     * @abstract
     * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
     * @return {Promise<void>|void}
     */
    protected abstract init(...params: any[]): Promise<void> | void;
    /**
     * Implement the process of returning the modal's HTML in a subclass.
     * This is called first when showing a modal in the superclass.
     * @abstract
     * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
     * @return {Promise<string>|string}
     */
    protected abstract render(...params: any[]): Promise<string> | string;
    /**
     * Show Modal. Initially, the init method of the subclass is executed.
     * @param {...any} params Any parameter required in the initial processing of the modal. This is passed to the init method implemented in the subclass.
     * @return {Promise<any>} Returns a response when the modal is closed.
     */
    show(...params: any[]): Promise<any>;
    /**
     * Hide Modal.
     * @param {any} response? Response value to the process that opened the modal.
     */
    hide(response?: any): void;
    /**
     * Get modal show/hide status.
     * @return {boolean} Modal show/hide status (true: show, false: hide).
     */
    isShowing(): boolean;
    /**
     * If there is processing to be performed immediately after the modal opens, implement it in a subclass.
     */
    protected afterShown(): void;
    /**
     * If there is a process to be executed immediately after the modal is closed, implement it in a subclass.
     */
    afterHidden(): void;
    /**
     * Enables the ability to close the modal by pressing the escape key.
     */
    protected enableEscapeKey(): void;
    /**
     * Disables the ability to close the modal by pressing the escape key.
     */
    protected disableEscapeKey(): void;
    /**
     * Show the loader in the modal.
     * @param {string} message Loading message.
     */
    protected showLoading(message: string): void;
    /**
     * Hide modal loader.
     */
    protected hideLoading(): void;
    /**
     * Destroy modal instances and elements.
     * If additional processing is required, it can be overridden, but <code>super.dispose()</code> must be performed within the overridden method.
     */
    protected dispose(): void;
}
