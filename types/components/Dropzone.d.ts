/// <reference types="dropzone" />
import DropzoneOption from '~/interfaces/DropzoneOption';
/**
 * Drag-and-drop file upload component with image preview.
 */
export default class DropzoneComponent {
    #private;
    /**
     * Initialization.
     */
    constructor(container: HTMLElement | JQuery, options: DropzoneOption);
    /**
     * Set the file addition event handler.
     */
    onAddFile(handler: (file: Dropzone.DropzoneFile) => void): DropzoneComponent;
    /**
     * Set file cancellation event handler.
     */
    onCancelFile(handler: () => void): DropzoneComponent;
}
