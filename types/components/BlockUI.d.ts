/**
 * Display loading indicator on the block.
 */
export default class BlockUI {
    #private;
    /**
     * Initialization.
     */
    constructor(target: JQuery | HTMLElement, message: string, executeBlock?: boolean);
    /**
     * Show the loading indicator.
     */
    block(): BlockUI;
    /**
     * Hide the loading indicator.
     */
    release(): BlockUI;
    /**
     * Check if it is blocking.
     */
    isBlocked(): boolean;
    /**
     * Discard the loading indicator.
     */
    destroy(): void;
}
