import {Modal} from 'metronic-extension';
import hbs from 'handlebars-extd';

/**
 * Modal example.
 */
export default class extends Modal {
  /**
   * Implement the initial processing required when the modal is opened in a subclass.
   * Within this process, the modal's jQuery object (this.element) and instance (this.instance) are accessible.
   * This is called after the render method is called when showing a modal in a superclass.
   * @abstract
   * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
   * @return {Promise<void>|void}
   */
  init(...params) {
    // Define events.
    this.element.on('click', '[data-on-save-change]', () => {
      // When the save button is clicked, close the modal and return true to the caller.
      super.hide(true);
    });
  }

  /**
   * Implement the process of returning the modal's HTML in a subclass.
   * This is called first when showing a modal in the superclass.
   * @abstract
   * @param {...any} params The parameters received by the method that opens the modal (show method) are taken over as is.
   * @return {Promise<string>|string} Modal HTML.
   */
  render(...params) {
    // Title of the modal passed from the caller in the show method.
    const [title] = params;

    // Returns a modal HTML string.
    return hbs.compile(
      `<div class="modal fade" tabindex="-1" aria-hidden="true">
        <!--begin::Modal dialog-->
        <div class="modal-dialog modal-dialog-scrollable">
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
            <div class="modal-body">
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
              This is some placeholder content to show the scrolling behavior for modals. 
              Instead of repeating the text the modal, we use an inline style set a minimum height, 
              thereby extending the length of the overall modal and demonstrating the overflow scrolling. 
              When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
            </div>
            <!--end::Modal body-->
            <!--begin::Modal footer-->
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
              <button data-on-save-change type="button" class="btn btn-primary">Save changes</button>
            </div>
            <!--end::Modal footer-->
          </div>
          <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
      </div>`)({title});
  }
}