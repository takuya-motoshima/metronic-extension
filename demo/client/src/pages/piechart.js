import {components} from 'metronic-extension';

// Initialize chart.
const piechart = new components.PieChart(document.getElementById('piechart'), {
  width: 400,
  ajax: {
    url: 'json/piechart.json'
  },
});