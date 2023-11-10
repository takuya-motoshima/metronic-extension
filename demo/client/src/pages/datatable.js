import {components} from 'metronic-extension';

function initBasicTable() {
  return new components.Datatable(ref.basicTable, {
    columnDefs: [
      {targets: 0, data: 'name', name: 'name'},
      {targets: 1, data: 'position', name: 'position'},
      {targets: 2, data: 'office', name: 'office'},
      {targets: 3, data: 'age', name: 'age'},
      {targets: 4, data: 'startDate', name: 'startDate'},
      {targets: 5, data: 'salary', name: 'salary'},
    ],
    pageLength: 3
  });
}

function initServerSideProcessingTable() {
  return new components.Datatable(ref.serverSideProcessingTable, {
    ajax: {
      url: '/api/persons/pages',
      data: d => {
        d.search = {keyword: ref.serverSideProcessingTableKeyword.val()};
      }
    },
    columnDefs: [
      {targets: 0, data: 'name'},
      {targets: 1, data: 'position'},
      {targets: 2, data: 'office'},
      {targets: 3, data: 'age'},
      {targets: 4, data: 'startDate'},
      {targets: 5, data: 'salary'},
    ],
    pageLength: 3
  });
}

function initColumnVisibilityTable() {
  return new components.Datatable(ref.columnVisibilityTable, {
    dom: `<'row align-items-center'<'col-auto'B><'col dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    columnDefs: [
      {targets: 0, data: 'name'},
      {targets: 1, data: 'position'},
      {targets: 2, data: 'office'},
      {targets: 3, data: 'age'},
      {targets: 4, data: 'startDate'},
      {targets: 5, data: 'salary'},
    ],
    pageLength: 3,
    buttons: [
      {
        extend: 'colvis',
        text: 'Show / hide columns',
        // Columns selector that defines the columns to include in the column visibility button set.
        // CSS selectors, column indexes, etc. can be used to specify columns to switch visibility.
        columns: ':eq(1),:eq(2),:eq(3),:eq(4),:eq(5)',
        // columns: [1,2,3,4,5],
      }
    ],
    stateSave: true,// Save the column visibility in the browser.
    stateSaveParams: (_, data) => {
      // This option allows for the saving of the search applied to individual columns to be enabled or disabled.
      delete data.columns.search;

      // This option allows for the saving of the visibility of the columns to be enabled or disabled.
      // delete data.columns.visible;

      // This option allows for the saving of the page length to be enabled or disabled.
      delete data.length;

      // This option allows for the saving of the tables column sorting to be enabled or disabled.
      delete data.order;

      // This option allows for the saving of the paging to be enabled or disabled.
      delete data.paging;

      // This option allows for the saving of the scroller position to be enabled or disabled.
      delete data.scroller;

      // This option allows for the saving of the search to be enabled or disabled.
      delete data.search;

      // This option allows for the saving of the searchBuilder state to be enabled or disabled. 
      delete data.searchBuilder;

      // This option allows for the saving of the searchPanes state to be enabled or disabled. 
      delete data.searchPanes;

      // This option allows for the saving of the select state to be enabled or disabled.
      delete data.select;
    }
  });
}

function initDisableFirstAjaxCallTable() {
  return new components.Datatable(ref.disableFirstAjaxCallTable, {
    firstAjax: false,
    ajax: '/api/persons/pages',
    columnDefs: [
      {targets: 0, data: 'name'},
      {targets: 1, data: 'position'},
      {targets: 2, data: 'office'},
      {targets: 3, data: 'age'},
      {targets: 4, data: 'startDate'},
      {targets: 5, data: 'salary'},
    ],
    pageLength: 3
  });
}

function initBasicTableSearchForm() {
  $('body').on('input', '[data-on-search-basic-table]', () => {
    // Filter data by keyword.
    basicTable.filter('name:name', ref.basicTableKeyword.val());
  });
}

function initServerSideProcessingTableSearchForm() {
  $('body').on('input', '[data-on-search-server-side-processing-table]', () => {
    // Reload when the filter is changed.
    // The filter information is set in the parameters sent to the server from the ajax.data optional function.
    serverSideProcessingTable.reload();
  })
}

function initDisableFirstAjaxCallTableForm() {
  $('body').on('click', '[data-on-load-disable-first-ajax-call-table]', () => disableFirstAjaxCallTable.reload());
}

// Search for elements.
const ref = components.selectRef();

// Initialize DataTable.
const basicTable = initBasicTable();
const serverSideProcessingTable = initServerSideProcessingTable();
const columnVisibilityTable = initColumnVisibilityTable();
const disableFirstAjaxCallTable = initDisableFirstAjaxCallTable();

// Initialize events, etc.
initBasicTableSearchForm();
initServerSideProcessingTableSearchForm();
initDisableFirstAjaxCallTableForm();