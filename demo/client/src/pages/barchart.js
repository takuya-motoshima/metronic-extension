import {charts} from 'metronic-extension';

function initHorizontalBarChart() {
  return new charts.BarChart(document.getElementById('horizontalBarChart'), {
    horizontal: true,
    ajax: {
      url: 'json/barchart.json',
      dataSrc: data => {
        // Filter chart data by categories matching the entered keywords.
        // Normally, use the ajax.data option to set the keywords as request parameters and perform the filtering on the server side.
        const keyword = horizontalBarChartKeyword.value.replace(/^[\s　]+|[\s　]+$/g, '');
        if (!keyword)
          // If the keyword is empty, all data is displayed.
          return data;

        // Return only data with keywords in the name.
        return data.filter(item => item.category.includes(keyword));
      },
    },
    dataFormatter: value => {
      // Comma-separate the values.
      return Number(value).toLocaleString();
    },
    dataLabelFormatter: value => {
      // Comma-separate the values and add units.
      return `${Number(value).toLocaleString()} items`;
    },
    tooltipDataFormatter: value => {
      // Comma-separate the values and add units.
      return `${Number(value).toLocaleString()} items`;
    },
  });
}

function initVerticalBarChart() {
  return new charts.BarChart(document.getElementById('verticalBarChart'), {
    horizontal: false,
    ajax: {
      url: 'json/barchart.json',
      dataSrc: data => {
        // Filter chart data by categories matching the entered keywords.
        // Normally, use the ajax.data option to set the keywords as request parameters and perform the filtering on the server side.
        const keyword = verticalBarChartKeyword.value.replace(/^[\s　]+|[\s　]+$/g, '');
        if (!keyword)
          // If the keyword is empty, all data is displayed.
          return data;

        // Return only data with keywords in the name.
        return data.filter(item => item.category.includes(keyword));
      },
    },
    dataFormatter: value => {
      // Comma-separate the values.
      return Number(value).toLocaleString();
    },
    dataLabelFormatter: value => {
      // Comma-separate the values.
      return Number(value).toLocaleString();
    },
    tooltipDataFormatter: value => {
      // Comma-separate the values.
      return `${Number(value).toLocaleString()} items`;
    },
  });
}

function initHorizontalBarChartSearchForm() {
  // Timer to prevent duplicate filtering runs.
  let searchTimer;
  horizontalBarChartKeyword.addEventListener('input', () => {
    // Cancel a reserved filtering request.
    if (searchTimer)
      clearTimeout(searchTimer);

    // Scheduled filtering runs.
    searchTimer = setTimeout(() => {
      // Filtering chart data.
      horizontalBarChart.reload();
    }, 1000);
  });
}

function initVerticalBarChartSearchForm() {
  // Timer to prevent duplicate filtering runs.
 let searchTimer;
  verticalBarChartKeyword.addEventListener('input', () => {
    // Cancel a reserved filtering request.
    if (searchTimer)
      clearTimeout(searchTimer);

    // Scheduled filtering runs.
    searchTimer = setTimeout(() => {
      // Filtering chart data.
      verticalBarChart.reload();
    }, 1000);
  });
}

// Search keyword input field.
const horizontalBarChartKeyword = document.getElementById('horizontalBarChartKeyword');
const verticalBarChartKeyword = document.getElementById('verticalBarChartKeyword');

// Initialize chart.
const horizontalBarChart = initHorizontalBarChart();
const verticalBarChart = initVerticalBarChart();

// Initialize events, etc.
initHorizontalBarChartSearchForm();
initVerticalBarChartSearchForm();