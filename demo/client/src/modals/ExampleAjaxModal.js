import {components} from 'metronic-extension';
import hbs from 'handlebars-extd';

/**
 * Modal example.
 */
export default class extends components.Modal {
  /**
   * Includes a modal-backdrop element. Alternatively, specify <code>static</code> for a backdrop which doesn't close the modal on click. Default is true.
   * @type {boolean}
   */
  backdrop = 'static';

  /**
   * Closes the modal when escape key is pressed. Default is true.
   * @type {boolean}
   */
  keyboard = false;

  /**
   * Implement the initial processing required when the modal is opened in a subclass.
   * Within this process, the modal's jQuery object (this.element) and instance (this.instance) are accessible.
   * This is called after the render method is called when showing a modal in a superclass.
   * @abstract
   * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
   * @return {Promise<void>|void}
   */
  init(...params) {
    // Initialize form validation.
    const validation = new components.Validation(this.element.find('#form'), {
      name: {
        validators: {
          notEmpty: {message: 'Name is required.'}
        }
      }
    });

    // If the form validation passes, the input data is sent to the server.
    validation.onValid(async () => {
      // Display the loader on the form.
      validation.onIndicator();

      // The example waits for 2 seconds without sending data to the server.
      // In actuality, the process of sending data to the server should be described here.
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Release the form loader.
      validation.offIndicator();

      // Show Success Dialog.
      await components.Dialog.success('Data was successfully saved');

      // Closes the modal and returns true to the caller.
      super.hide(true);
    });
  }

  /**
   * If there is processing to be performed immediately after the modal opens, implement it in a subclass.
   */
  afterShown() {
    // After opening the modal, focus on the name input field.
    this.element.find('#name').focus();
  }

  /**
   * Destroy modal instances and elements.
   * If additional processing is required, it can be overridden, but <code>super.dispose()</code> must be performed within the overridden method.
   */
  dispose() {
    // Close the dialog.
    components.Dialog.close();

    // Discard elements and instances of the modal.
    super.dispose();
  }

  /**
   * Implement the process of returning the modal's HTML in a subclass.
   * This is called first when showing a modal in the superclass.
   * @abstract
   * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
   * @return {Promise<string>|string} Modal HTML.
   */
  async render(...params) {
    // Get display data from the server side.
    const profile = await (await fetch('json/profile.json')).json();

    // Returns a modal HTML string.
    return hbs.compile(
      `<div class="modal fade" tabindex="-1" aria-hidden="true">
        <!--begin::Modal dialog-->
        <div class="modal-dialog modal-dialog-centered mw-650px">
          <!--begin::Modal content-->
          <div class="modal-content">
            <!--begin::Form-->
            <form id="form" action="#">
              <!--begin::Modal header-->
              <div class="modal-header">
                <!--begin::Modal title-->
                <h2>Profile</h2>
                <!--end::Modal title-->
                <!--begin::Close-->
                <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                  <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                  <span class="svg-icon svg-icon-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                  </svg></span>
                  <!--end::Svg Icon-->
                </div>
                <!--end::Close-->
              </div>
              <!--end::Modal header-->
              <!--begin::Modal body-->
              <div class="modal-body">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semibold mb-2">Name</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <input id="name" type="text" class="form-control form-control-solid" name="name" value="{{profile.name}}">
                    <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Modal body-->
              <!--begin::Modal footer-->
              <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                  <span class="indicator-label">Save changes</span>
                  <span class="indicator-progress">Sending... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
              </div>
              <!--end::Modal footer-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
      </div>`)({profile});
  }
}