import hbs from 'handlebars-extd';
import {Modal} from 'metronic-extension';

export default class extends Modal {
  async init(title, message) {
    const node = this.#render(title, message);
    const instance = new bootstrap.Modal(node);
    this.#initForm(node);
    return [node, instance];
  }

  #initForm(node) {
    node.on('click', '[data-on-save-change]', () => {
      super.hide(true);
    });
  }

  #render(title, message) {
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
              <h2>{{title}}</h2>
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
              {{message}}
            </div>
            <!--end::Modal body-->
            <!--begin::Modal footer-->
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
              <button data-on-save-change type="button" class="btn btn-primary">Save changes</button>
            </div>
            <!--end::Modal footer-->
          </div>
          <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
      </div>`)({title, message});
    return $(html).appendTo('body');
  }
}