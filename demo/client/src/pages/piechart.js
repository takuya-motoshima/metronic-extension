import {charts} from 'metronic-extension';

// Initialize chart.
const piechart = new charts.PieChart(document.getElementById('piechart'), {
  width: 400,
  ajax: {
    url: 'json/pie-chart.json'
  },
});