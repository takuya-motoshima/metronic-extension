import Swal from 'sweetalert2';

/**
 * Confirm dialog option.
 */
export interface Confirm {
  title?: string,
  icon?: Swal.SweetAlertIcon,
  confirmButtonText?: string,
  cancelButtonText?: string,
  customClass?: Swal.SweetAlertCustomClass | string,
  didOpen?: (popup: HTMLElement) => void,
  preConfirm?: (inputValue: any) => any
}

/**
 * Success dialog option.
 */
export interface Success {
  title?: string,
  confirmButtonText?: string,
  customClass?: Swal.SweetAlertCustomClass | string
}

/**
 * Error dialog option.
 */
export interface Error {
  title?: string,
  confirmButtonText?: string
}

/**
 * Warning dialog option.
 */
export interface Warning {
  title?: string,
  confirmButtonText?: string
}

/**
 * Info dialog option.
 */
export interface Info {
  title?: string,
  confirmButtonText?: string
}

/**
 * Loading dialog option.
 */
export interface Loading {
  title?: string
}

/**
 * Unknown error dialog option.
 */
export interface UnknownError {
  title?: string
}