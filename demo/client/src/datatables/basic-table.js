import {components} from 'metronic-extension';

// Initialize the DataTable.
const initBasicTable = () => {
  let targetIndex = 0;
  return new components.Datatable(ref.basicTable, {
    columnDefs: [
      {targets: targetIndex++, name: 'name'},
      {targets: targetIndex++, name: 'position'},
      {targets: targetIndex++, name: 'office'},
      {targets: targetIndex++, name: 'age'},
      {targets: targetIndex++, name: 'startDate'},
      {targets: targetIndex++, name: 'salary'},
    ],
    pageLength: 3
  });
}

// Initialize the form.
const initBasicTableSearchForm = () => {
  $('body').on('input', '[data-on-search-basic-table]', () => {
    // Filter data by keyword.
    basicTable.filter('name:name', ref.basicTableKeyword.val());
  });
}

// Get DOM element references.
const ref = components.selectRef();

// Initialize the component and set up event listeners.
const basicTable = initBasicTable();
initBasicTableSearchForm();