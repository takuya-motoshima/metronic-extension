/// <reference types="dropzone" />
import DropzoneOptions from '~/interfaces/DropzoneOptions';
/**
 * Drag-and-drop file upload component with image preview.
 */
export default class {
    #private;
    /**
     * Initialization.
     */
    constructor(container: HTMLElement | JQuery, options: DropzoneOptions);
    /**
     * Set the file addition event handler.
     */
    onAddFile(handler: (file: Dropzone.DropzoneFile) => void): void;
}
