/**
 * Dropzone options.
 */
export default interface DropzoneOptions {
// export default interface DropzoneOptions extends Dropzone.DropzoneOptions {
  /**
   * hidden element to store the uploaded content.
   * For media data such as images and PDFs, DataURL is set; for text data such as CSV, text data is set.
   */
  hiddenInputContent?: HTMLInputElement

  // /**
  //  * If not null defines how many files this Dropzone handles. If it exceeds, the event maxfilesexceeded will be called. 
  //  */
  // maxFiles: number,

  /**
   * The default implementation of accept checks the file's mime type or extension against this list. 
   * This is a comma separated list of mime types or file extensions.
   * Eg.: image/*,application/pdf,.psd
   */
  acceptedFiles?: string,

  /**
   * The maximum filesize (in bytes) that is allowed to be uploaded.
   */
  maxFilesize?: number,

  /**
   * Drop zone title text.
   */
  dictDefaultMessage?: string,

  /**
   * Drop zone description text.
   */
  dictDescriptionMessage?: string,

  /**
   * Error message to be displayed if the file size exceeds the allowable size.
   */
  dictFileTooBig?: string,

  /**
   * If true, debug logs are output to console.
   */
  debug?: boolean
}