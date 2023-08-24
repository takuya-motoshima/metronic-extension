/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
import DatePickerOptions from '~/interfaces/DatePickerOptions';
/**
 * Initialize the date picker.
 */
declare const _default: (input: HTMLInputElement | JQuery, options?: DatePickerOptions) => daterangepicker;
export default _default;
