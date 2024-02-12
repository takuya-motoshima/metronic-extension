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
      // Button to toggle column visibility.
      {
        extend: 'colvis',
        text: 'Show / hide columns',
        // Columns selector that defines the columns to include in the column visibility button set.
        // CSS selectors, column indexes, etc. can be used to specify columns to switch visibility.
        columns: ':eq(1),:eq(2),:eq(3),:eq(4),:eq(5)',
        // columns: [1,2,3,4,5],
      }
    ],
    // Save the column visibility in the browser.
    stateSave: true,
    /* Enable/Disable saving for various datatables elements. Delete any items you do not wish to save.
        - data.columns.search: This option allows for the saving of the search applied to individual columns to be enabled or disabled.
        - data.columns.visible: This option allows for the saving of the visibility of the columns to be enabled or disabled.
        - data.length: This option allows for the saving of the page length to be enabled or disabled.
        - data.order: This option allows for the saving of the tables column sorting to be enabled or disabled.
        - data.paging: This option allows for the saving of the paging to be enabled or disabled.
        - data.scroller: This option allows for the saving of the scroller position to be enabled or disabled.
        - data.search: This option allows for the saving of the search to be enabled or disabled.
        - data.searchBuilder: This option allows for the saving of the searchBuilder state to be enabled or disabled.
        - data.searchPanes: This option allows for the saving of the searchPanes state to be enabled or-  disabled.
        - data.select: This option allows for the saving of the select state to be enabled or disabled.
    */
    stateSaveParams: (_, data) => {
      delete data.columns.search;
      // delete data.columns.visible;
      delete data.length;
      delete data.order;
      delete data.paging;
      delete data.scroller;
      delete data.search;
      delete data.searchBuilder;
      delete data.searchPanes;
      delete data.select;
    }
  });
}

function initColumnVisibilityWithIconButtonTable() {
  return new components.Datatable(ref.columnVisibilityWithIconButtonTable, {
    dom: `<'row align-items-center'<'col dataTables_pager'p><'col-auto'B>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    columnDefs: [
      {targets: 0, data: 'name'},
      {targets: 1, data: 'position'},
      {targets: 2, data: 'office'},
      {targets: 3, data: 'age'},
      {targets: 4, data: 'startDate'},
      {targets: 5, data: 'salary'},
    ],
    pageLength: 3,
    buttons: {
      dom: {
        button: {
          // Disable the default button class (btn btn-secondary) to set the icon button (btn-icon).
          className: null,
        },
        buttonLiner: {
          // By default, a span element is added within the button, so disable it.
          tag: null,
        }
      },
      buttons: [
        // Button to toggle column visibility.
        {
          extend: 'colvis',
          columns: ':eq(1),:eq(2),:eq(3),:eq(4),:eq(5)',
          text: '<i class="ki-solid ki-gear fs-1"></i>',

          // Icon button style. Switch between them as you wish.
          // className: 'btn btn-sm btn-icon btn-color-primary btn-active-light-primary',
          className: 'btn btn-icon btn-color-gray-500 btn-active-color-primary',

          // Display column drop-downs inside the table container. If this is not set, the column dropdowns will overflow the table container.
          align: 'container',
        }
      ],
    },
    // Save the column visibility in the browser.
    stateSave: true,
    /* Enable/Disable saving for various datatables elements. Delete any items you do not wish to save.
        - data.columns.search: This option allows for the saving of the search applied to individual columns to be enabled or disabled.
        - data.columns.visible: This option allows for the saving of the visibility of the columns to be enabled or disabled.
        - data.length: This option allows for the saving of the page length to be enabled or disabled.
        - data.order: This option allows for the saving of the tables column sorting to be enabled or disabled.
        - data.paging: This option allows for the saving of the paging to be enabled or disabled.
        - data.scroller: This option allows for the saving of the scroller position to be enabled or disabled.
        - data.search: This option allows for the saving of the search to be enabled or disabled.
        - data.searchBuilder: This option allows for the saving of the searchBuilder state to be enabled or disabled.
        - data.searchPanes: This option allows for the saving of the searchPanes state to be enabled or-  disabled.
        - data.select: This option allows for the saving of the select state to be enabled or disabled.
    */
    stateSaveParams: (_, data) => {
      delete data.columns.search;
      // delete data.columns.visible;
      delete data.length;
      delete data.order;
      delete data.paging;
      delete data.scroller;
      delete data.search;
      delete data.searchBuilder;
      delete data.searchPanes;
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
const columnVisibilityWithIconButtonTable = initColumnVisibilityWithIconButtonTable();
const disableFirstAjaxCallTable = initDisableFirstAjaxCallTable();

// Initialize events, etc.
initBasicTableSearchForm();
initServerSideProcessingTableSearchForm();
initDisableFirstAjaxCallTableForm();