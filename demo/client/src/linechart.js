import {components} from 'metronic-extension';

const initSingleLineChart = () => {
  return new components.LineChart(document.getElementById('singleLineChart'), {
    ajax: {
      url: 'json/single-linechart.json',
    },
    yAxisFormatter: value => {
      // Comma-separate the values.
      return `${Number(value).toLocaleString()} items`;
    },
    tooltipDataFormatter: value => {
      // Comma-separate the values and add units.
      return `${Number(value).toLocaleString()} items`;
    },
  });
}

const initMultiLineChart = () => {
  return new components.LineChart(document.getElementById('multiLineChart'), {
    ajax: {
      url: 'json/multi-linechart.json',
      dataSrc: data => {
        // Filter chart data by categories matching the entered keywords.
        // Normally, use the ajax.data option to set the keywords as request parameters and perform the filtering on the server side.
        const keyword = multiLineChartKeyword.value.replace(/^[\s　]+|[\s　]+$/g, '');
        if (!keyword)
          // If the keyword is empty, all data is displayed.
          return data;

        // Return only data with keywords in the name.
        return data.filter(item => item.name.includes(keyword));
      },
    },
    yAxisFormatter: value => {
      // Comma-separate the values.
      return `${Number(value).toLocaleString()} items`;
    },
    tooltipDataFormatter: value => {
      // Comma-separate the values and add units.
      return `${Number(value).toLocaleString()} items`;
    },
  });
}

const initMultiLineChartSearchForm = () => {
  // Timer to prevent duplicate filtering runs.
 let searchTimer;
  multiLineChartKeyword.addEventListener('input', () => {
    // Cancel a reserved filtering request.
    if (searchTimer)
      clearTimeout(searchTimer);

    // Scheduled filtering runs.
    searchTimer = setTimeout(() => {
      // Filtering chart data.
      multiLineChart.reload();
    }, 1000);
  });
}

// Search keyword input field.
const multiLineChartKeyword = document.getElementById('multiLineChartKeyword');

// Initialize the component and set up event listeners.
const singleLineChart = initSingleLineChart();
const multiLineChart = initMultiLineChart();
initMultiLineChartSearchForm();