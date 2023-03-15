import * as DialogOptions from '~/interfaces/DialogOptions';
/**
 * Display various dialogs.
 */
export default class {
    /**
     * Show the confirm dialog.
     */
    static confirm(message: string, options?: DialogOptions.Confirm | undefined): Promise<boolean>;
    /**
     * Show the success dialog.
     */
    static success(message: string, options?: DialogOptions.Success | undefined): Promise<boolean>;
    /**
     * Show the error dialog.
     */
    static error(message: string, options?: DialogOptions.Error | undefined): Promise<void>;
    /**
     * Show the warning dialog.
     */
    static warning(message: string, options?: DialogOptions.Warning | undefined): Promise<void>;
    /**
     * Show the info dialog.
     */
    static info(message: string, options?: DialogOptions.Info | undefined): Promise<void>;
    /**
     * Show unknown error.
     */
    static unknownError(message?: string, options?: DialogOptions.UnknownError | undefined): Promise<void>;
    /**
     * Show loading.
     */
    static loading(message: string, options?: DialogOptions.Loading | undefined): Promise<void>;
    /**
     * Close.
     */
    static close(): void;
}
