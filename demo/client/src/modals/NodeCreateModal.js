import hbs from 'handlebars-extd';
import {Modal, Validation, selectRef, Dialog} from 'metronic-extension';
import FileApi from '~/api/FileApi';

export default class extends Modal {
  #fileApi = new FileApi();

  /**
   * @param {string} parent Parent folder ID.
   */
  async init(parent) {
    const node = this.#render();
    const instance = new bootstrap.Modal(node);
    const ref = selectRef(node);
    const validation = this.#initValidation(ref);
    this.#initForm(validation, parent);
    return [node, instance];
  }

  #initForm(validation, parent) {
    validation.onValid(async () => {
      try {
        validation.onIndicator();
        const {data: newNode} = await this.#fileApi.createFile(parent, new FormData(validation.form));
        validation.offIndicator();
        super.hide(newNode);
      } catch (err) {
        validation.offIndicator();
        Dialog.unknownError('An unexpected error has occurred', {title: 'Error'});
        throw err;
      }
    });
  }

  #initValidation(ref) {
    return new Validation(ref.form.get(0), {
      text: {
        validators: {
          notEmpty: {message: 'Node name is required'},
        }
      },
    });
  }

  #render() {
    const html = hbs.compile(
      `<div class="modal fade" tabindex="-1" aria-hidden="true">
        <!--begin::Modal dialog-->
        <div class="modal-dialog modal-dialog-centered modal-xl">
        {{!-- <div class="modal-dialog modal-dialog-centered mw-900px"> --}}
          <!--begin::Modal content-->
          <div class="modal-content">
            <!--begin::Modal header-->
            <div class="modal-header">
              <!--begin::Modal title-->
              <h2>Create a new node</h2>
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
            <div class="modal-body py-lg-10 px-lg-10">
              <!--begin:Form-->
              <form data-ref="form" novalidate="novalidate">
                <!--begin::Input group-->
                <div class="fv-row mb-10">
                  <!--begin::Label-->
                  <label class="fs-5 fw-semibold mb-2 required">Node Name</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <input type="text" class="form-control form-control-lg form-control-solid" name="text" maxlength="20">
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Actions-->
                <div class="d-flex flex-center">
                  <button type="button" class="btn btn-light me-3" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary">
                    <span class="indicator-label">Submit</span>
                    <span class="indicator-progress">Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                  </button>
                </div>
                <!--end::Actions-->
              </form>
              <!--end:Form-->
            </div>
            <!--end::Modal body-->
          </div>
          <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
      </div>`)();
    return $(html).appendTo('body');
  }
}