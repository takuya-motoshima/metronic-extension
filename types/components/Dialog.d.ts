import * as DialogOption from '~/interfaces/DialogOption';
/**
 * Display various dialogs.
 */
export default class {
    #private;
    /**
     * Show the confirm dialog.
     */
    static confirm(message: string, options?: DialogOption.Confirm | undefined): Promise<boolean>;
    /**
     * Show the success dialog.
     */
    static success(message: string, options?: DialogOption.Success | undefined): Promise<boolean>;
    /**
     * Show the error dialog.
     */
    static error(message: string, options?: DialogOption.Error | undefined): Promise<void>;
    /**
     * Show the warning dialog.
     */
    static warning(message: string, options?: DialogOption.Warning | undefined): Promise<void>;
    /**
     * Show the info dialog.
     */
    static info(message: string, options?: DialogOption.Info | undefined): Promise<void>;
    /**
     * Show unknown error.
     */
    static unknownError(message?: string, options?: DialogOption.UnknownError | undefined): Promise<void>;
    /**
     * Show loading.
     */
    static loading(message: string, options?: DialogOption.Loading | undefined): Promise<void>;
    /**
     * Close.
     */
    static close(): void;
}
