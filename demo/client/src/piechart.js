import {components} from 'metronic-extension';

// Initialize the component and set up event listeners.
const piechart = new components.PieChart(document.getElementById('piechart'), {
  width: 400,
  ajax: {
    url: 'json/piechart.json'
  },
});