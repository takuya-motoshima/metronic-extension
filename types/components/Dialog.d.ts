import ConfirmDialogOptions from '~/interfaces/ConfirmDialogOptions';
import SuccessDialogOptions from '~/interfaces/SuccessDialogOptions';
import ErrorDialogOptions from '~/interfaces/ErrorDialogOptions';
import WarningDialogOptions from '~/interfaces/WarningDialogOptions';
import InfoDialogOptions from '~/interfaces/InfoDialogOptions';
import LoadingDialogOptions from '~/interfaces/LoadingDialogOptions';
import UnknownErrorDialogOptions from '~/interfaces/UnknownErrorDialogOptions';
/**
 * Display various dialogs.
 */
export default class {
    #private;
    /**
     * Show the confirm dialog.
     */
    static confirm(message: string, options?: ConfirmDialogOptions | undefined): Promise<boolean>;
    /**
     * Show the success dialog.
     */
    static success(message: string, options?: SuccessDialogOptions | undefined): Promise<boolean>;
    /**
     * Show the error dialog.
     */
    static error(message: string, options?: ErrorDialogOptions | undefined): Promise<void>;
    /**
     * Show the warning dialog.
     */
    static warning(message: string, options?: WarningDialogOptions | undefined): Promise<void>;
    /**
     * Show the info dialog.
     */
    static info(message: string, options?: InfoDialogOptions | undefined): Promise<void>;
    /**
     * Show unknown error.
     */
    static unknownError(message?: string, options?: UnknownErrorDialogOptions | undefined): Promise<void>;
    /**
     * Show loading.
     */
    static loading(message: string, options?: LoadingDialogOptions | undefined): Promise<void>;
    /**
     * Close.
     */
    static close(): void;
}
