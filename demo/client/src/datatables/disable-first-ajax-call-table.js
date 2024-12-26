import {components} from 'metronic-extension';

// Initialize the DataTable.
const initDisableFirstAjaxCallTable = () => {
  let targetIndex = 0;
  return new components.Datatable(ref.disableFirstAjaxCallTable, {
    firstAjax: false,
    ajax: '/api/persons/pages',
    columnDefs: [
      {targets: targetIndex++, data: 'name'},
      {targets: targetIndex++, data: 'position'},
      {targets: targetIndex++, data: 'office'},
      {targets: targetIndex++, data: 'age'},
      {targets: targetIndex++, data: 'startDate'},
      {targets: targetIndex++, data: 'salary'},
    ],
    pageLength: 3
  });
}

// Initialize the form.
const initDisableFirstAjaxCallTableForm = () => {
  $('body').on('click', '[data-on-load-disable-first-ajax-call-table]', () => disableFirstAjaxCallTable.reload());
}

// Get DOM element references.
const ref = components.selectRef();

// Initialize the component and set up event listeners.
const disableFirstAjaxCallTable = initDisableFirstAjaxCallTable();
initDisableFirstAjaxCallTableForm();