import {merge} from 'deep-fusion';
import axios from 'axios';
import isString from '~/utils/isString';
import BarChartOptions from '~/interfaces/BarChartOptions';
import BarChartResponse from '~/interfaces/BarChartResponse';
import BarChartCategorizeData from '~/interfaces/BarChartCategorizeData';
import BarChartSeries from '~/interfaces/BarChartSeries';

/**
 * Bar chart based on <a href="https://apexcharts.com/" target="_blank">ApexCharts</a>.
 */
export default class {
  // /**
  //  * Read-only ApexCharts instance.
  //  * @type {ApexCharts}
  //  */
  // get chart(): ApexCharts|undefined {
  //   return this.#chart;
  // }

  /**
   * ApexCharts instance.
   * @type {ApexCharts|undefined}
   */
  #chart: ApexCharts|undefined;

  /**
   * Finalized options.
   * @type {BarChartOptions}
   */
  #options: BarChartOptions;

  /**
   * The element on which the chart is drawn.
   * @type {HTMLElement}
   */
  #element: HTMLElement;

  /**
   * Create a new instance of the BarChart class.
   * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
   * @param {BarChartOptions} options Chart options.
   */
  public constructor(element: string|HTMLElement|JQuery, options: BarChartOptions) {
    // Check parameters.
    if (isString(element))
      this.#element = document.querySelector(element as string) as HTMLElement;
    else if (element instanceof HTMLElement)
      this.#element = element;
    else if (element instanceof $)
      this.#element = (element as JQuery).get(0) as HTMLElement;
    else
      throw new TypeError('element parameter should be HTMLElement selectors, elements, and JQuery object');

    // Initialize options.
    this.#options = merge({
      horizontal: false,
      ajax: {
        method: 'GET',
        url: undefined,
        data: undefined,
        dataSrc: undefined,
      },
      dataLabelFormatter: (value: string|number) => value,
      dataFormatter: (value: string|number) => value,
      tooltipDataFormatter: (value: number) => value.toString(),
    }, options);

    // Drawing a chart.
    this.#render();
  }

  /**
   * Loads the drawing data and redraws the chart.
   */
  public reload(): Promise<void> {
    // Redraw the chart.
    return this.#render();
  }

  /**
   * Drawing a chart.
   * @return {Promise<void>}
   */
  async #render(): Promise<void> {
    // Request data to be drawn on the chart.
    let res = await axios({
      method: this.#options.ajax.method,
      url: this.#options.ajax.url,
      // If the HTTP method is GET, set parameters in the query string; if POST or PUT, set parameters in the request body.
      [this.#options.ajax.method === 'GET' ? 'data' : 'params']: this.#options.ajax.data ?
        (() => {
          // Execute if there is a callback set up that returns data to be sent to the server.
          const data = {};
          this.#options.ajax.data(data);
          return data;
        })() :
        undefined
    });

    // Extract data from the response.
    // If a callback is set to modify data retrieved from the server, execute it.
    const data: BarChartResponse[] = this.#options.ajax.dataSrc ? this.#options.ajax.dataSrc(res.data) : res.data;

    // Get colors used in charts from theme CSS.
    const labelColor = window.KTUtil.getCssVariableValue('--bs-gray-800');
    const borderColor = window.KTUtil.getCssVariableValue('--bs-border-dashed-color');

    // Chart Height.
    let height: 'auto'|number = 'auto';
    if (this.#options.horizontal)
      // For horizontal bar charts, calculate the graph height from the number of data (number of bars).
      // Formula: bar width * data length + footer height
      // Minimum graph height: 100px
      height = Math.max(30 * data.length + 50, 100);
    else {
      // For vertical bar charts, set the element height to the chart height.
      const computedHeight = parseInt(getComputedStyle(this.#element).getPropertyValue('height'), 10);
      if (computedHeight)
        height = computedHeight;
    }

    // Destroy drawn chart object.
    if (this.#chart)
      this.#chart.destroy();

    // Chart data retrieved from the server is grouped by category.
    const categorized = this.#categorizeData(data);

    // Create series data.
    const series = this.#createSeriesData(categorized);

    // Bar color.
    const colors = series.map(({color}) => color);

    // Category Name.
    const categories = categorized.map(({category}) => category);

    // The series are not discrete because the values should have the same meaning; if set to true, the same color cannot be used for bars with the same name.
    const distributed = false;
 
    // Calculates the width of bars in a vertical bar chart.
    // Formula: bar width / (chart width / number of data) * 100
    // Maximum bar width: 100%.
    let columnWidth;
    if (!this.#options.horizontal)
      columnWidth = Math.min(Math.round((30 / (this.#element.clientWidth / data.length)) * 100), 100);

    // Drawing a chart.
    this.#chart = new ApexCharts(this.#element, {
      series: series.map(({name, data}) => ({name, data})),
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: this.#options.horizontal,
          // For vertical bars, set the width of the bar.
          columnWidth: this.#options.horizontal ? undefined : columnWidth,
          borderRadius: 8,
          distributed,
          dataLabels: {
            position: this.#options.horizontal ? 'bottom' : 'top',
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        textAnchor: this.#options.horizontal ? 'start': 'middle',
        offsetX: 0,
        offsetY: this.#options.horizontal ? 0 : -28,
        style: {
          fontSize: '13px',
          fontWeight: 'normal',
          align: 'left',
        },
        formatter: this.#options.dataLabelFormatter,
      },
      colors,
      xaxis: {
        categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: this.#options.horizontal,
        },
        labels: {
          // If there is no data, hide the label.
          show: data.length > 0,
          // Rotate if text does not fit into available width.
          rotate: -45,
          rotateAlways: false,
          style: {
            colors: labelColor,
            fontSize: '13px',
            fontWeight: 'normal',
            align: 'left',
          },
          formatter: this.#options.horizontal ? this.#options.dataFormatter : undefined,
        },
      },
      yaxis: {
        labels: {
          // If there is no data, hide the label.
          show: data.length > 0,
          style: {
            colors: labelColor,
            fontSize: '13px',
            fontWeight: 'normal'
          },
          formatter: !this.#options.horizontal ? this.#options.dataFormatter : undefined,
          offsetY: this.#options.horizontal ? 2 : 0,
          align: this.#options.horizontal ? 'left' : 'right',
        }
      },
      grid: {
        borderColor,
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: this.#options.horizontal,
          },
        },
        yaxis: {
          lines: {
            show: !this.#options.horizontal,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: this.#options.tooltipDataFormatter,
        }
      },
    });
    this.#chart.render();
  }


  /**
   * Chart data retrieved from the server is grouped by category.
   * @param {BarChartResponse[]} data Data to be drawn on the chart returned by the Ajax request called from the chart.
   * @return {BarChartCategorizeData[]} Results of grouping data in BarChartSeries[] format by category name.
   * @example
   * ```js
   * // Chart data retrieved from the server.
   * const data = [
   *   {category: 'Category1', name: 'Series1', color: '#50cd89', data: 1},
   *   {category: 'Category1', name: 'Series2', color: '#f1416c', data: 2},
   *   {category: 'Category2', name: 'Series1', color: '#50cd89', data: 3},
   *   {category: 'Category2', name: 'Series2', color: '#f1416c', data: 4},
   * ];
   * 
   * // Chart data retrieved from the server is grouped by category.
   * const categorized = this.#categorizeData(data);
   * // categorized: [
   * //   {
   * //     category: 'Category1',
   * //     data: [
   * //       {name: 'Series1', color: '#50cd89', data: 1},
   * //       {name: 'Series2', color: '#f1416c', data: 2}
   * //     ]
   * //   },
   * //   {
   * //     category: 'Category2',
   * //     data: [
   * //       {name: 'Series1', color: '#50cd89', data: 3},
   * //       {name: 'Series2', color: '#f1416c', data: 4}
   * //     ]
   * //   }
   * // ]
   * ```
   */
  #categorizeData(data: BarChartResponse[]): BarChartCategorizeData[] {
    // Default bar color.
    const defaultBarColor = '#50CD89';

    // Sort data in ascending order by category and name.
    data.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

    // Grouping data by category.
    return data.reduce<BarChartCategorizeData[]>((categorized, raw) => {
      // Get an index of registered items that match the current category.
      let categoryIndex = categorized.findIndex(item => item.category === raw.category);
      if (categoryIndex === -1) {
        // If there is no matching item, create it.
        categorized.push({category: raw.category, data: []});

        // Get the index of the created item.
        categoryIndex = categorized.length - 1;
      }

      // Get the index of registered items that matches the current name.
      let nameIndex = categorized[categoryIndex].data.findIndex(item => item.name === raw.name);
      if (nameIndex === -1) {
        // If there is no matching item, create it.
        categorized[categoryIndex].data.push({
          name: raw.name,
          data: 0,
          color: raw.color || defaultBarColor,
        });

        // Get the index of the created item.
        nameIndex = categorized[categoryIndex].data.length - 1;
      }
      categorized[categoryIndex].data[nameIndex].data = raw.data;
      return categorized;
    }, []);
  }

  /**
   * Create data to be set for the series option of the chart.
   * @param {BarChartCategorizeData[]} Results of grouping data in BarChartSeries[] format by category name.
   * @return {BarChartSeries[]} Data to be set in the series option of the chart.
   * @example
   * ```js
   * // Chart data grouped by category.
   * const categorized = [
   *   {
   *     category: 'Category1',
   *     data: [
   *       {name: 'Series1', color: '#50cd89', data: 1},
   *       {name: 'Series2', color: '#f1416c', data: 2}
   *     ]
   *   },
   *   {
   *     category: 'Category2',
   *     data: [
   *       {name: 'Series1', color: '#50cd89', data: 3},
   *       {name: 'Series2', color: '#f1416c', data: 4}
   *     ]
   *   }
   * ];
   * 
   * // Create series data.
   * const series = this.#createSeriesData(categorized);
   * // series: [
   * //   {
   * //     name: 'Series1',
   * //     color: '#50cd89',
   * //     data: [1, 3]
   * //   }, {
   * //     name: 'Series2',
   * //     color: '#f1416c',
   * //     data: [2, 4]
   * //   }
   * // ]
   * ```
   */
  #createSeriesData(categorized: BarChartCategorizeData[]): BarChartSeries[] {
    // Map to get name index.
    const indexOfNames = categorized.reduce<Record<string, {index: number, color: string}>>((indexOfNames, raw) => {
      for (let data of raw.data)
        if (!indexOfNames.hasOwnProperty(data.name))
          indexOfNames[data.name] = {
            index: Object.keys(indexOfNames).length,
            color: data.color,
          };
      return indexOfNames;
    }, {});

    // Map to get category index.
    const indexOfCategories = categorized.reduce<Record<string, number>>((indexOfCategories, raw) => {
      if (!indexOfCategories.hasOwnProperty(raw.category))
        indexOfCategories[raw.category] = Object.keys(indexOfCategories).length;
      return indexOfCategories;
    }, {});

    // Create chart drawing data.
    const series = Object.entries(indexOfNames).map(([name, {index, color}]) => ({
      name,
      data: Array(Object.keys(indexOfCategories).length).fill(0),
      color,
    }));
    for (let categoryItem of categorized)
      for (let item of categoryItem.data)
        series[indexOfNames[item.name].index].data[indexOfCategories[categoryItem.category]] = item.data;
    return series;
  }
}