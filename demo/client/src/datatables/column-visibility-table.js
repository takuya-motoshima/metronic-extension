import {components} from 'metronic-extension';

// Initialize the DataTable.
const initColumnVisibilityTable = () => {
  let targetIndex = 0;
  return new components.Datatable(ref.columnVisibilityTable, {
    dom: `<'row align-items-center'<'col-auto'B><'col dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    columnDefs: [
      {targets: targetIndex++, data: 'name'},
      {targets: targetIndex++, data: 'position'},
      {targets: targetIndex++, data: 'office'},
      {targets: targetIndex++, data: 'age'},
      {targets: targetIndex++, data: 'startDate'},
      {targets: targetIndex++, data: 'salary'},
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

// Get DOM element references.
const ref = components.selectRef();

// Initialize the component and set up event listeners.
const columnVisibilityTable = initColumnVisibilityTable();