/**
 * Send push notifications to visitors using toast.
 * @example
 * ```js
 * import {components} from 'metronic-extension';
 *
 * // Show success toast message.
 * components.Toast.success('This is a toast message');
 *
 * // Show info toast message.
 * components.Toast.info('This is a toast message');
 *
 * // Show error toast message.
 * components.Toast.error('This is a toast message');
 *
 * // Show warning toast message.
 * components.Toast.warning('This is a toast message');
 * ```
 */
export default class {
    #private;
    /**
     * Show success toast message.
     * @param {string} message Toast Message.
     * @param {string|undefined} title? Toast Title. Default is no title (undefined).
     * @param {number} delay? Delay in milliseconds before hiding the toast. Default is 5000.
     */
    static success(message: string, title?: string | undefined, delay?: number): void;
    /**
     * Show info toast message.
     * @param {string} message Toast Message.
     * @param {string|undefined} title? Toast Title. Default is no title (undefined).
     * @param {number} delay? Delay in milliseconds before hiding the toast. Default is 5000.
     */
    static info(message: string, title?: string | undefined, delay?: number): void;
    /**
     * Show warning toast message.
     * @param {string} message Toast Message.
     * @param {string|undefined} title? Toast Title. Default is no title (undefined).
     * @param {number} delay? Delay in milliseconds before hiding the toast. Default is 5000.
     */
    static warning(message: string, title?: string | undefined, delay?: number): void;
    /**
     * Show error toast message.
     * @param {string} message Toast Message.
     * @param {string|undefined} title? Toast Title. Default is no title (undefined).
     * @param {number} delay? Delay in milliseconds before hiding the toast. Default is 5000.
     */
    static error(message: string, title?: string | undefined, delay?: number): void;
}
