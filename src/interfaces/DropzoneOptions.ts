/**
 * Dropzone options.
 */
export default interface DropzoneOptions {
  /**
   * hidden element to store the uploaded content.
   * For media data such as images and PDFs, DataURL is set; for text data such as CSV, text data is set.
   */
  hiddenInputContent?: HTMLInputElement;

  /**
   * A comma-separated list of MIME types or file extensions (e.g., "image/*,application/pdf,.psd") for files that are allowed to be uploaded.
   * Default is none (undefined).
   */
  acceptedFiles?: string;

  /**
   * The maximum filesize (in bytes) that is allowed to be uploaded. Default is none (undefined).
   */
  maxFilesize?: number;

  /**
   * Drop zone title text. Default is "Drop files here to upload".
   */
  dictDefaultMessage?: string;

  /**
   * Drop zone description text. Default is none (undefined).
   */
  dictDescriptionMessage?: string;

  /**
   * Error message to be displayed if the file size exceeds the allowable size. 
   * Default is "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.".
   * "{{filesize}}" is set to the selected file size, and "{{maxFilesize}}" is set to the file size that can be uploaded.
   */
  dictFileTooBig?: string;
}