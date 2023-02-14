import fusion from 'deep-fusion';
import hbs from 'handlebars-extd';
import DropzoneOption from '~/interfaces/DropzoneOption';

/**
 * Drag-and-drop file upload component with image preview.
 */
export default class DropzoneComponent {
  // #dropzone: typeof window.Dropzone;
  #addFileHandler: (file: Dropzone.DropzoneFile) => void = (file: Dropzone.DropzoneFile) => {};
  #cancelFileHandler: () => void = () => {};

  /**
   * Initialization.
   */
  constructor(container: HTMLElement|JQuery, options: DropzoneOption) {
    // Check the argument.
    if (container instanceof $)
      container = (container as JQuery).get(0) as HTMLElement;
    else if (!(container instanceof HTMLElement))
      throw new TypeError('Only HTMLElement, or JQuery objects (HTMLElement) can be specified as container parameters');

    // Initialize options.
    options = fusion({
      hiddenInputContent: undefined,
      acceptedFiles: undefined,
      maxFilesize: undefined,
      dictDefaultMessage: 'Drop files here to upload',
      dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
      dictDescriptionMessage: undefined,
      debug: false
    }, options);

    // Container HTML.
    container.classList.add('dropzone');   
    container.innerHTML = hbs.compile(
      `<style>
      .dropzone .dz-progress {
        display: none;
      }

      .dropzone .dz-preview .dz-details {
        /* Details (file name and size) should be centered. */
        display: flex;
        flex-direction: column;
        align-items: center;
      }

        .dropzone .dz-preview .dz-details .dz-filename span,
        .dropzone .dz-preview .dz-details .dz-size span {
          background-color: transparent;
          color: var(--kt-text-gray-800);
        }

        .dropzone .dz-preview .dz-details .dz-filename:not(:hover) {
          /* The selected file name is displayed without abbreviation. */
          overflow: visible;
          text-overflow: clip;
        }

        .dropzone .dz-preview .dz-details .dz-filename:hover span {
          /* The background color is not changed when the file name is hovered. */
          background-color: transparent;
          border: 0;
        }
      </style>
      <!--begin::Message-->
      <div class="dz-message needsclick align-items-center">
        <!--begin::Icon-->
        <i class="bi bi-file-earmark-arrow-up text-primary fs-3x"></i>
        <!--end::Icon-->
        <!--begin::Info-->
        <div class="ms-4">
          <h3 class="fs-5 fw-bold text-gray-900 {{#if options.dictDescriptionMessage}}mb-1{{else}}mb-0{{/if}}">{{options.dictDefaultMessage}}</h3>
          {{#if options.dictDescriptionMessage}}
            <span class="fs-7 fw-semibold text-gray-900">{{options.dictDescriptionMessage}}</span>
          {{/if}}
        </div>
        <!--end::Info-->
      </div>
      <!--end::Message-->`)({options});

    // An instance of this class.
    const self = this;

    // Initialize dropzone.
    new window.Dropzone(container, {
    // this.#dropzone = new window.Dropzone(container, {
      url: 'dummy',
      acceptedFiles: options.acceptedFiles,
      maxFiles: 1,
      maxFilesize: options.maxFilesize,
      init: function(this: Dropzone) {
        this.on('addedfile', function(this: Dropzone, file: Dropzone.DropzoneFile) {
          if (options.debug)
            console.log('Added file');
          if (this.files.length > 1) {
            if (options.debug)
              console.log('Delete the file with the 0th index');
            this.removeFile(this.files[0]);
          }
          if (options.hiddenInputContent) {
            const reader = new FileReader();
            reader.onload = evnt => {
              const dataUrl = (<FileReader>evnt.target).result as string;
              if (options.debug)
                console.log(`Set content for hidden elements (Contents: ${dataUrl.slice(0, 100)})`);
              (options.hiddenInputContent as HTMLInputElement).value = dataUrl;
            };
            reader.readAsDataURL(file);
          }
          self.#addFileHandler(file);
        });
        // this.on('maxfilesexceeded', function(this: Dropzone, file: Dropzone.DropzoneFile) {
        //   if (options.debug)
        //     console.log('Maxfiles exceeded');
        //   this.removeAllFiles();
        //   this.addFile(file);
        // });
        this.on('removedfile', function(this: Dropzone, file: Dropzone.DropzoneFile) {
          if (options.debug)
            console.log('Removed file');
          if (options.hiddenInputContent) {
            if (options.debug)
              console.log('Clear the hidden elements');
            (options.hiddenInputContent as HTMLInputElement).value = '';
          }
          self.#cancelFileHandler();
        });
      },
      addRemoveLinks: true,
      autoProcessQueue: false,
      autoQueue: false,
      dictFileTooBig: options.dictFileTooBig
   });
  }

  /**
   * Set the file addition event handler.
   */
  onAddFile(handler: (file: Dropzone.DropzoneFile) => void): DropzoneComponent {
    this.#addFileHandler = handler;
    return this;
  }

  /**
   * Set file cancellation event handler.
   */
  onCancelFile(handler: () => void): DropzoneComponent {
    this.#cancelFileHandler = handler;
    return this;
  }
}