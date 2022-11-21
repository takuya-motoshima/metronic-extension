import hbs from 'handlebars-extd';
import bootstrap from '~/misc/bootstrap';
import isAsyncFunction from '~/misc/isAsyncFunction';

/**
 * base class of modal.
 */
export default class {
  node: JQuery<HTMLDivElement>|undefined;
  instance: bootstrap.Modal|undefined;
  resolve: ((res: any) => void)|undefined;
  res: any = false;
  #blockUICallStack: typeof window.KTBlockUI[] = [];
  #isShowing: boolean = false;

  /**
   * Show Modal.
   */
  async show(...params: any[]) {
    if (isAsyncFunction(this.init))
      [this.node, this.instance] = <[JQuery<HTMLDivElement>, bootstrap.Modal]>await this.init.apply(this, params);
    else
       // @ts-ignore In some cases, the init function is not asynchronous (async), but it will result in a Typescript syntax check error, so the check is ignored.
      [this.node, this.instance] = <[JQuery<HTMLDivElement>, bootstrap.Modal]>this.init.apply(this, params);
    this.node
      .on('show.bs.modal', () => {
        this.#isShowing = true;
      })
      .on('shown.bs.modal', () => {
        this.afterShown();
      })
      .on('hide.bs.modal', () => {
        this.#isShowing = false;
      })
      .on('hidden.bs.modal', () => {
        this.resolve!(this.res);
        this.dispose();
        this.afterHidden();
      });
    this.res = false;
    this.instance.show();
    return new Promise(resolve => this.resolve = resolve);
  }

  /**
   * Modal initialization.
   * Must be implemented in a subclass.
   */
  async init(...params: any[]): Promise<[JQuery<HTMLDivElement>, bootstrap.Modal]> {
    return new Promise<[JQuery<HTMLDivElement>, bootstrap.Modal]>(rslv => {
      rslv([$(), new bootstrap.Modal('div')]);
    });
  }

  /**
   * Dispose Modal.
   */
  dispose(): void {
    if (this.instance)
      this.instance.dispose();
    if (this.node)
      this.node.remove();
  }

  /**
   * Hide Modal.
   */
  hide(res = undefined): void {
    if (res !== undefined)
      this.res = res;
    if (this.instance)
      this.instance.hide();
  }

  /**
   * Enable hide with escape key.
   */
  enableHideWithEscapeKey(): void {
    if (this.instance)
      // @ts-ignore Ignore Typescript syntax errors that occur because _config is not defined in bootstrap.Modal.
      this.instance._config.keyboard = true;
  }

  /**
   * Disable hide with escape key.
   */
  disableHideWithEscapeKey(): void {
    if (this.instance)
      // @ts-ignore Ignore Typescript syntax errors that occur because _config is not defined in bootstrap.Modal.
      this.instance._config.keyboard = false;
  }

  /**
   * Show blockUI.
   */
  showBlockUI(message: string): void {
    if (!this.node)
      return;
    const blockUI = new window.KTBlockUI(this.node.find('.modal-content').get(0), {
      message: hbs.compile(
        `<div class="blockui-message fw-bolder">
          <span class="spinner-border text-primary me-3"></span>
          <span>{{message}}</span>
        </div>`)({message})
    });
    blockUI.block();
    this.#blockUICallStack.push(blockUI);
  }

  /**
   * Hide blockUI.
   */
  hideBlockUI() {
    if (this.#blockUICallStack.length === 0)
      return;
    const blockUI = this.#blockUICallStack.pop();
    blockUI.release();
    blockUI.destroy();
  }

  /**
   * If the modal is shown, return true.
   */
  isShowing() {
    return this.#isShowing;
  }

  /**
   * The event after the modal showed. Implementation is done in a subclass.
   */
  afterShown() {}

  /**
   * The event after the modal is hidden. Implementation is done in a subclass.
   */
  afterHidden() {}
}