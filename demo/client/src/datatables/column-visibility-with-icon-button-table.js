import {components} from 'metronic-extension';

// Initialize the DataTable.
const initColumnVisibilityWithIconButtonTable = () => {
  let targetIndex = 0;
  return new components.Datatable(ref.columnVisibilityWithIconButtonTable, {
    dom: `<'row align-items-center'<'col dataTables_pager'p><'col-auto'B>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    columnDefs: [
      {targets: targetIndex++, data: 'name'},
      {targets: targetIndex++, data: 'position'},
      {targets: targetIndex++, data: 'office'},
      {targets: targetIndex++, data: 'age'},
      {targets: targetIndex++, data: 'startDate'},
      {targets: targetIndex++, data: 'salary'},
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

// Get references to elements with data-ref attributes.
const ref = components.selectRef();

// Initialize the component and set up event listeners.
const columnVisibilityWithIconButtonTable = initColumnVisibilityWithIconButtonTable();