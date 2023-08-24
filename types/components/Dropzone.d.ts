/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
import DropzoneOptions from '~/interfaces/DropzoneOptions';
/**
 * Drag-and-drop file upload component with image preview.
 */
export default class DropzoneComponent {
    #private;
    /**
     * Initialization.
     */
    constructor(container: HTMLElement | JQuery, options: DropzoneOptions);
    /**
     * Set the file addition event handler.
     */
    onAddFile(handler: (file: Dropzone.DropzoneFile) => void): DropzoneComponent;
    /**
     * Set file cancellation event handler.
     */
    onCancelFile(handler: () => void): DropzoneComponent;
}
