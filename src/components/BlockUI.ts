import hbs from 'handlebars-extd';

/**
 * Display loading indicator on the block.
 */
export default class BlockUI {
  #blockUI: typeof window.KTBlockUI;

  /**
   * Initialization.
   */
  constructor(target: JQuery|HTMLElement, message: string, executeBlock = true) {
    if (target instanceof $)
      target = (target as JQuery).get(0)!;
    this.#blockUI = window.KTBlockUI.getInstance(target);
    if (!this.#blockUI)
      this.#blockUI = new window.KTBlockUI(target, {
        message: hbs.compile(
          `<div class="blockui-message fw-bolder">
            <span class="spinner-border text-primary me-3"></span>
            <span>{{message}}</span>
          </div>`)({message})
      });
    if (executeBlock)
      this.block();
  }

  /**
   * Show the loading indicator.
   */
  block(): BlockUI {
    if (!this.isBlocked())
      this.#blockUI.block();
    return this;
  }


  /**
   * Hide the loading indicator.
   */
  release(): BlockUI {
    if (this.isBlocked())
      this.#blockUI.release();
    return this;
  }

  /**
   * Check if it is blocking.
   */
  isBlocked(): boolean {
    return this.#blockUI.isBlocked();
  }

  /**
   * Discard the loading indicator.
   */
  destroy(): void {
    this.release();
    this.#blockUI.destroy();
  }
}