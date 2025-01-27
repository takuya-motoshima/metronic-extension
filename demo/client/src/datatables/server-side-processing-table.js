import {components} from 'metronic-extension';

// Initialize the DataTable.
const initServerSideProcessingTable = () => {
  let targetIndex = 0;
  return new components.Datatable(ref.serverSideProcessingTable, {
    ajax: {
      url: '/api/persons/pages',
      data: d => {
        // Set filter parameters.
        d.search = {keyword: ref.serverSideProcessingTableKeyword.val()};
      }
    },
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
const initServerSideProcessingTableSearchForm = () => {
  $('body').on('input', '[data-on-search-server-side-processing-table]', () => {
    // Reload when the filter is changed.
    // The filter information is set in the parameters sent to the server from the ajax.data optional function.
    serverSideProcessingTable.reload();
  })
}

// Get references to elements with data-ref attributes.
const ref = components.selectRef();

// Initialize the component and set up event listeners.
const serverSideProcessingTable = initServerSideProcessingTable();
initServerSideProcessingTableSearchForm();