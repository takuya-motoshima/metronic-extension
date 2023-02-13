import fusion from 'deep-fusion';
// NOTE: Do not import sweetalert2 here to use the Swal object of the Metronic theme.
// import Swal from 'sweetalert2';
import * as DialogOptions from '~/interfaces/DialogOptions';

/**
 * Display various dialogs.
 */
export default class {
  /**
   * Show the confirm dialog.
   */
  static async confirm(message: string, options: DialogOptions.Confirm|undefined = undefined): Promise<boolean> {
    // Initialize options.
    options = fusion({
      icon: 'question',
      confirmButtonText: 'OK',
      cancelButtonText: '取り消し',
      customClass: {
        htmlContainer: 'overflow-hidden',
        confirmButton: `btn btn-primary fw-bolder`,
        cancelButton: 'btn btn-light fw-bolder'
      },
      didOpen: (popup: HTMLElement): void => {},
      preConfirm: () => {}
    }, options);
    return (await window.Swal.fire({
      html: message,
      showCancelButton: true,
      buttonsStyling: false,
      ...options
    })).isConfirmed;
  }

  /**
   * Show the success dialog.
   */
  static async success(message: string, options: DialogOptions.Success|undefined = undefined): Promise<void> {
    // Initialize options.
    options = fusion({
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: `btn btn-primary fw-bolder`,
      }
    }, options);
    return window.Swal.fire({
      html: message,
      icon: 'success',
      buttonsStyling: false,
      ...options
    });
  }

  /**
   * Show the error dialog.
   */
  static async error(message: string, options: DialogOptions.Error|undefined = undefined): Promise<void> {
    // Initialize options.
    options = fusion({
      confirmButtonText: 'OK',
    }, options);
    return window.Swal.fire({
      html: message,
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: `btn btn-danger fw-bolder`,
      },
      ...options
    });
  }

  /**
   * Show the warning dialog.
   */
  static async warning(message: string, options: DialogOptions.Warning|undefined = undefined): Promise<void> {
    // Initialize options.
    options = fusion({
      confirmButtonText: 'OK'
    }, options);
    return window.Swal.fire({
      html: message,
      icon: 'warning',
      buttonsStyling: false,
      customClass: {
        confirmButton: `btn btn-warning fw-bolder`,
      },
      ...options
    });
  }

  /**
   * Show the info dialog.
   */
  static async info(message: string, options: DialogOptions.Info|undefined = undefined): Promise<void> {
    // Initialize options.
    options = fusion({
      confirmButtonText: 'OK'
    }, options);
    return window.Swal.fire({
      html: message,
      icon: 'info',
      buttonsStyling: false,
      customClass: {
        confirmButton: `btn btn-primary fw-bolder`,
      },
      ...options
    });
  }

  /**
   * Show unknown error.
   */
  static async unknownError(message: string = 'エラーが発生したため処理を中断しました。再度お試し下さい。何度も発生する場合は、お問い合わせ窓口までご連絡下さい。', options: DialogOptions.UnknownError|undefined = undefined): Promise<void> {
    // Initialize options.
    options = fusion({
      title: '予期せぬエラーが発生しました。'
    }, options);
    return this.error(message, options);
  }

  /**
   * Show loading.
   */
  static async loading(message: string, options: DialogOptions.Loading|undefined = undefined): Promise<void> {
    return window.Swal.fire({
      html: message,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        window.Swal.showLoading()
      },
      ...options
    });
  }

  /**
   * Close.
   */
  static close(): void {
    window.Swal.close();
  }
}