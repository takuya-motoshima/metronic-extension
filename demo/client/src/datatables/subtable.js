import {components} from 'metronic-extension';

// Get DOM element references.
const ref = components.selectRef();

// Initialize the DataTable.
const initSubtable = () => {
  let targetIndex = 0;
  return new components.Datatable(ref.subtable, {
    columnDefs: [
      {targets: targetIndex++, data: 'orderId', name: 'orderId'},
      {targets: targetIndex++, data: 'customerName', name: 'customerName'},
      {targets: targetIndex++, data: 'orderDate', name: 'orderDate'},
      {targets: targetIndex++, data: 'expandRow', name: 'expandRow'},
    ],
    pageLength: 3,
    drawCallback: settings => {
      resetSubtable();
    },
  });
}

// Handles the row expand button click event.
const handleRowExpand = () => {
  $(subtableContainer).on('click', '[data-on-expand-row]', event => {
    event.stopImmediatePropagation();
    event.preventDefault();

    const expandButton = event.currentTarget;
    const row = expandButton.closest('tr');
    const rowClasses = ['isOpen', 'border-bottom-0'];
    
    // Toggle subtable visibility.
    if (row.classList.contains('isOpen')) {
      // Close subtable.
      removeSubtableRows(row);
      row.classList.remove(...rowClasses);
      expandButton.classList.remove('active');
    } else {
      // Open subtable.
      const orderId = subtable.getRowData(row).orderId;
      const subtableRows = subtableData.filter(data => data.orderId == orderId);
      const subtableRowCount = subtableRows.length;

      for (let [index, data] of Object.entries(subtableRows))
        populateSubtableRow(data, row, index, subtableRowCount);

      row.classList.add(...rowClasses);
      expandButton.classList.add('active');
    }
  })
}

// Removes subtable rows associated with the given parent row.
const removeSubtableRows = parentRow => {
  while (parentRow.nextSibling && parentRow.nextSibling.getAttribute('data-is-subtable-row') === 'true')
    parentRow.nextSibling.parentNode.removeChild(parentRow.nextSibling);
}

// Populates a subtable row with data and inserts it into the table.
const populateSubtableRow = (data, parentRow, index, subtableRowCount) => {
  // Clone the template row.
  const subRowFragment = subtableTemplate.content.cloneNode(true);
  const subRow = subRowFragment.children[0]; 

  // Set an attribute to identify the subtable row.
  subRow.setAttribute('data-is-subtable-row', 'true');
  
  // Populate data fields in the subtable row.
  const nameElement = subRow.querySelector('[data-subtable-field="name"]');
  const quantityElement = subRow.querySelector('[data-subtable-field="quantity"]');
  const unitPriceElement = subRow.querySelector('[data-subtable-field="unit_price"]');

  nameElement.innerText = data.name;
  quantityElement.innerText = data.quantity;
  unitPriceElement.innerText = data.unitPrice;

  // Apply rounded corners based on row position.
  applyRoundedCorners(subRow, index, subtableRowCount);

  // Insert the new subtable row into the table.
  const tbody = subtableContainer.querySelector('tbody');
  tbody.insertBefore(subRow, parentRow.nextSibling);
}

// Applies rounded corners to the first and last rows of the subtable.
const applyRoundedCorners = (subRow, index, subtableRowCount) => {
  const columns = subRow.querySelectorAll('td');
  const firstColumn = columns[0];
  const lastColumn = columns[columns.length - 1];

  if (subtableRowCount === 1) {
    // Single row.
    firstColumn.classList.add('rounded', 'rounded-end-0');
    lastColumn.classList.add('rounded', 'rounded-start-0');
    subRow.classList.add('border-bottom-0');
  } else {
    // Multiple rows.
    if (index === 0) { // First row.
      firstColumn.classList.add('rounded-start', 'rounded-top-0');
      lastColumn.classList.add('rounded-end', 'rounded-top-0');
      subRow.classList.add('border-bottom-0');
    }
    if (index === subtableRowCount - 1) { // Last row.
      firstColumn.classList.add('rounded-start', 'rounded-bottom-0');
      lastColumn.classList.add('rounded-end', 'rounded-bottom-0');
    }
  }
}

// Resets the subtable by removing all subtable rows and resetting row styles.
const resetSubtable = () => {
  const subtableRows = subtableContainer.querySelectorAll('[data-is-subtable-row="true"]');
  for (const subtableRow of subtableRows)
    subtableRow.parentNode.removeChild(subtableRow);

  const rows = subtableContainer.querySelectorAll('tbody tr');
  for (const row of rows) {
    row.classList.remove('isOpen');
    const expandButton = row.querySelector('button[data-on-expand-row]');
    if (expandButton) {
      expandButton.classList.remove('active');
    }
  }
}

// Sample subtable data.
const subtableData = [
  {
    "orderId": 1001,
    "name": "Wireless Mouse",
    "quantity": 1,
    "unitPrice": 25.99
  },
  {
    "orderId": 1001,
    "name": "Keyboard",
    "quantity": 2,
    "unitPrice": 45.00
  },
  {
    "orderId": 1002,
    "name": "Desk Lamp",
    "quantity": 1,
    "unitPrice": 34.50
  },
  {
    "orderId": 1002,
    "name": "Notebook",
    "quantity": 3,
    "unitPrice": 12.00
  },
  {
    "orderId": 1002,
    "name": "USB Hub",
    "quantity": 2,
    "unitPrice": 18.75
  },
  {
    "orderId": 1003,
    "name": "Office Chair",
    "quantity": 1,
    "unitPrice": 120.00,
  }
];


// DOM element references.
const subtableContainer = ref.subtable.get(0);
const subtableTemplate = document.getElementById('subtable-template');// Get subtable template.

// Initialize the component and set up event listeners.
const subtable = initSubtable();
handleRowExpand();