/**
 * Toast display.
 *
 * @example
 * import {Toast} from 'metronic-extension';
 *
 * Toast.success('This is a toast message');
 * Toast.info('This is a toast message');
 * Toast.error('This is a toast message');
 * Toast.warning('This is a toast message');
 */
export default class {
    #private;
    /**
     * Show success message.
     */
    static success(message: string, title?: undefined | string, delay?: number): void;
    /**
     * Show info message.
     */
    static info(message: string, title?: undefined | string, delay?: number): void;
    /**
     * Show warning message.
     */
    static warning(message: string, title?: undefined | string, delay?: number): void;
    /**
     * Show error message.
     */
    static error(message: string, title?: undefined | string, delay?: number): void;
}
