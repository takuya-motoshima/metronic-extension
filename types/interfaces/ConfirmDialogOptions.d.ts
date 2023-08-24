/**
 * Confirm dialog options.
 */
export default interface ConfirmDialogOptions {
    title?: string;
    icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
    confirmButtonText?: string;
    cancelButtonText?: string;
    customClass?: {
        container?: string | readonly string[];
        popup?: string | readonly string[];
        title?: string | readonly string[];
        closeButton?: string | readonly string[];
        icon?: string | readonly string[];
        image?: string | readonly string[];
        htmlContainer?: string | readonly string[];
        input?: string | readonly string[];
        inputLabel?: string | readonly string[];
        validationMessage?: string | readonly string[];
        actions?: string | readonly string[];
        confirmButton?: string | readonly string[];
        denyButton?: string | readonly string[];
        cancelButton?: string | readonly string[];
        loader?: string | readonly string[];
        footer?: string | readonly string[];
        timerProgressBar?: string | readonly string[];
    } | string;
    didOpen?: (popup: HTMLElement) => void;
    preConfirm?: (inputValue: any) => any;
}
