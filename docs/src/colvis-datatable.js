import {Datatable, selectRef} from 'metronic-extension';
import persons from '~/persons.json';
import '~/colvis-datatable.css';

function initColvisDatatable() {
  const options = {
    dom: `<'row align-items-center'<'col-auto'B><'col dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    columnDefs: [
      {targets: 0, data: 'name'},
      {targets: 1, data: 'position'},
      {targets: 2, data: 'office'},
      {targets: 3, data: 'age'},
      {targets: 4, data: 'startDate'},
      {targets: 5, data: 'salary'}
    ],
    pageLength: 10,
    buttons: [
      {
        extend: 'colvis',
        text: 'Show / hide columns',
        // Columns selector that defines the columns to include in the column visibility button set.
        columns: ':eq(1),:eq(2),:eq(3),:eq(4)',
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
  };
  if (isLocalServer)
    options.ajax = {url: 'http://localhost:8080/persons'};
  const colvisDatatable = new Datatable(ref.colvisDatatable, options);
  if (!isLocalServer)
    for (let row of persons)
      colvisDatatable.createRow(row, false);
}

const ref = selectRef();
const isLocalServer = !location.host;
initColvisDatatable();