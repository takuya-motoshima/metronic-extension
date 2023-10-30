import { SweetAlertOptions } from 'sweetalert2';
/**
 * Dialogue based on sweetalert2.
 */
export default class {
    #private;
    /**
     * Show the confirm dialog.
     * @param {string} message The modal's text.
     * @param {sweetalert2.SweetAlertOptions|undefined} options? Sweet Alert options.
     * @return {Promise<boolean>} True if the confirmation button is clicked, false otherwise.
     */
    static confirm(message: string, options?: SweetAlertOptions): Promise<boolean>;
    /**
     * Show the success dialog.
     * @param {string} message The modal's text.
     * @param {sweetalert2.SweetAlertOptions|undefined} options? Sweet Alert options.
     * @return {Promise<boolean>} True if the confirmation button is clicked, false otherwise.
     */
    static success(message: string, options?: SweetAlertOptions): Promise<boolean>;
    /**
     * Show the error dialog.
     * @param {string} message The modal's text.
     * @param {sweetalert2.SweetAlertOptions|undefined} options? Sweet Alert options.
     * @return {Promise<void>} Wait for the dialog to close.
     */
    static error(message: string, options?: SweetAlertOptions): Promise<void>;
    /**
     * Show the warning dialog.
     * @param {string} message The modal's text.
     * @param {sweetalert2.SweetAlertOptions|undefined} options? Sweet Alert options.
     * @return {Promise<void>} Wait for the dialog to close.
     */
    static warning(message: string, options?: SweetAlertOptions): Promise<void>;
    /**
     * Show the info dialog.
     * @param {string} message The modal's text.
     * @param {sweetalert2.SweetAlertOptions|undefined} options? Sweet Alert options.
     * @return {Promise<void>} Wait for the dialog to close.
     */
    static info(message: string, options?: SweetAlertOptions): Promise<void>;
    /**
     * Show unknown error.
     * @param {string} message The modal's text. The default is "The process was interrupted due to an error. Please try again.".
     * @param {sweetalert2.SweetAlertOptions|undefined} options? Sweet Alert options.
     * @return {Promise<void>} Wait for the dialog to close.
     */
    static unknownError(message?: string, options?: SweetAlertOptions): Promise<void>;
    /**
     * Show loading.
     * @param {string} message The modal's text.
     * @param {sweetalert2.SweetAlertOptions|undefined} options? Sweet Alert options.
     * @return {Promise<void>} Wait for the dialog to close.
     */
    static loading(message: string, options?: SweetAlertOptions): Promise<void>;
    /**
     * Closes all currently open dialogs.
     */
    static close(): void;
}
