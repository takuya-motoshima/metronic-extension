/**
 * base class of modal.
 */
export default class {
    #private;
    node: JQuery<HTMLDivElement> | undefined;
    instance: bootstrap.Modal | undefined;
    resolve: ((res: any) => void) | undefined;
    res: any;
    /**
     * Show Modal.
     */
    show(...params: any[]): Promise<unknown>;
    /**
     * Modal initialization.
     * Must be implemented in a subclass.
     */
    init(...params: any[]): Promise<[JQuery<HTMLDivElement>, bootstrap.Modal]>;
    /**
     * Dispose Modal.
     */
    dispose(): void;
    /**
     * Hide Modal.
     */
    hide(res?: undefined): void;
    /**
     * Enable hide with escape key.
     */
    enableHideWithEscapeKey(): void;
    /**
     * Disable hide with escape key.
     */
    disableHideWithEscapeKey(): void;
    /**
     * Show blockUI.
     */
    showBlockUI(message: string): void;
    /**
     * Hide blockUI.
     */
    hideBlockUI(): void;
    /**
     * If the modal is shown, return true.
     */
    isShowing(): boolean;
    /**
     * The event after the modal showed. Implementation is done in a subclass.
     */
    afterShown(): void;
    /**
     * The event after the modal is hidden. Implementation is done in a subclass.
     */
    afterHidden(): void;
}
