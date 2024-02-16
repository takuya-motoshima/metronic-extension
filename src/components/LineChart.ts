import {merge} from 'deep-fusion';
import axios from 'axios';
import isString from '~/utils/isString';
import LineChartOptions from '~/interfaces/LineChartOptions';
import LineChartResponse from '~/interfaces/LineChartResponse';
import LineChartCategorizeData from '~/interfaces/LineChartCategorizeData';
import LineChartSeries from '~/interfaces/LineChartSeries';

/**
 * Line chart based on <a href="https://apexcharts.com/" target="_blank">ApexCharts</a>.
 */
export default class {
  /**
   * Read-only ApexCharts instance.
   * @type {ApexCharts|undefined}
   */
  get instance(): ApexCharts|undefined {
    return this.#instance;
  }

  /**
   * ApexCharts instance.
   * @type {ApexCharts|undefined}
   */
  #instance: ApexCharts|undefined;

  /**
   * Finalized options.
   * @type {LineChartOptions}
   */
  #options: LineChartOptions;

  /**
   * The element on which the chart is drawn.
   * @type {HTMLElement}
   */
  #element: HTMLElement;

  /**
   * Create a new instance of the LineChart class.
   * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
   * @param {LineChartOptions} options Chart options.
   */
  public constructor(element: string|HTMLElement|JQuery, options: LineChartOptions) {
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
      ajax: {
        method: 'GET',
        url: undefined,
        data: undefined,
        dataSrc: undefined,
      },
      gradient: true,
      lineWidth: 3,
      yAxisOpposite: false,
      xAxisFormatter: (value: string|number) => value,
      yAxisFormatter: (value: string|number) => value,
      tooltipDataFormatter: (value: number) => value.toString(),
    }, options);

    // Drawing a chart.
    this.#render();
  }

  /**
   * Redraw the chart.
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
      [this.#options.ajax.method === 'GET' ? 'params' : 'data']: this.#options.ajax.data ?
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
    const data: LineChartResponse[] = this.#options.ajax.dataSrc ? this.#options.ajax.dataSrc(res.data) : res.data;

    // Get colors used in charts from theme CSS.
    const labelColor = window.KTUtil.getCssVariableValue('--bs-gray-800');
    const borderColor = window.KTUtil.getCssVariableValue('--bs-border-dashed-color');
    const strokeColor = window.KTUtil.getCssVariableValue('--bs-gray-500');

    // Chart Height.
    const height = parseInt(getComputedStyle(this.#element).getPropertyValue('height'), 10) || 300;

    // Destroy drawn chart object.
    if (this.#instance)
      this.#instance.destroy();

    // Chart data retrieved from the server is grouped by category.
    const categorized = this.#categorizeData(data);

    // Create series data.
    const series = this.#createSeriesData(categorized);

    // Line color.
    const lineColors = series.map(({color}) => color);

    // Category Name.
    const categories = categorized.map(({category}) => category);

    // Maximum and minimum values on the Y-axis.
    const yAxisMax = Math.max(...data.map(({data}) => data));
    const yAxisMin = Math.min(...data.map(({data}) => data));

    // Drawing a chart.
    this.#instance = new ApexCharts(this.#element, {
      series: series.map(({name, data}) => ({name, data})),
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: height,
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: this.#options.gradient ? {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          // stops: []
        }
      } : {
        type: 'solid',
        opacity: 0,
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: this.#options.lineWidth,
        colors: lineColors,
      },
      xaxis: {
        categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        // Number of Tick Intervals to show.
        tickAmount: categorized.length,
        labels: {
          rotate: -45,
          rotateAlways: false,
          // When labels are too close and start to overlap on one another, this option prevents overlapping of the labels.
          hideOverlappingLabels: true,
          style: {
            colors: labelColor,
            fontSize: '12px'
          },
          formatter: this.#options.xAxisFormatter,
        },
        // Show crosshairs on x-axis when user moves the mouse over chart area.
        crosshairs: {
          position: 'front',
          stroke: {
            color: strokeColor,
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        // When enabled, will draw the yaxis on the right side of the chart.
        opposite: this.#options.yAxisOpposite,
        max: yAxisMax,
        min: yAxisMin,
        // If set to true, the y-axis scales are forced to generate nice looking rounded numbers even when min/max are provided. Turn this off if you manually set min/max and want it to be unchanged.
        forceNiceScale: true,
        // // Number of Tick Intervals to show. The number of labels to be displayed on the Y-axis is set to the result of the "chart height/Y-axis label height" calculation.
        // tickAmount: Math.ceil(height / 22.4),
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px'
          },
          formatter: this.#options.yAxisFormatter,
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px'
        },
        y: {
          formatter: this.#options.tooltipDataFormatter,
        }
      },
      colors: lineColors,
      grid: {
        borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      markers: {
        strokeColor: lineColors,
        strokeWidth: 3
      },
    });
    this.#instance.render();
  }

  /**
   * Chart data retrieved from the server is grouped by category.
   * @param {LineChartResponse[]} data Data to be drawn on the chart returned by the Ajax request called from the chart.
   * @return {LineChartCategorizeData[]} Results of grouping data in LineChartSeries[] format by category name.
   * @example
   * ```js
   * // Chart data retrieved from the server.
   * const data = [
   *   {name: 'Series1', category: 'Category1', data: 1, color: '#50CD89'},
   *   {name: 'Series2', category: 'Category1', data: 2, color: '#F1416C'},
   *   {name: 'Series1', category: 'Category2', data: 3, color: '#50CD89'},
   *   {name: 'Series2', category: 'Category2', data: 4, color: '#F1416C'},
   * ];
   * 
   * // Chart data retrieved from the server is grouped by category.
   * const categorized = this.#categorizeData(data);
   * // categorized: [
   * //   {
   * //     category: 'Category1',
   * //     data: [
   * //       {name: 'Series1', data: 1, color: '#50CD89'},
   * //       {name: 'Series2', data: 2, color: '#F1416C'}
   * //     ]
   * //   },
   * //   {
   * //     category: 'Category2',
   * //     data: [
   * //       {name: 'Series1', data: 3, color: '#50CD89'},
   * //       {name: 'Series2', data: 4, color: '#F1416C'}
   * //     ]
   * //   }
   * // ]
   * ```
   */
  #categorizeData(data: LineChartResponse[]): LineChartCategorizeData[] {
    // Sort data in ascending order by category and name.
    data.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

    // Grouping data by category.
    return data.reduce<LineChartCategorizeData[]>((categorized, raw) => {
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
        // Default line color.
        const lineColor = '#009EF7';

        // If there is no matching item, create it.
        categorized[categoryIndex].data.push({
          name: raw.name,
          data: 0,
          color: raw.color || lineColor,
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
   * @param {LineChartCategorizeData[]} Results of grouping data in LineChartSeries[] format by category name.
   * @return {LineChartSeries[]} Data to be set in the series option of the chart.
   * @example
   * ```js
   * // Chart data grouped by category.
   * const categorized = [
   *   {
   *     category: 'Category1',
   *     data: [
   *       {name: 'Series1', data: 1, color: '#50CD89'},
   *       {name: 'Series2', data: 2, color: '#F1416C'}
   *     ]
   *   },
   *   {
   *     category: 'Category2',
   *     data: [
   *       {name: 'Series1', data: 3, color: '#50CD89'},
   *       {name: 'Series2', data: 4, color: '#F1416C'}
   *     ]
   *   }
   * ];
   * 
   * // Create series data.
   * const series = this.#createSeriesData(categorized);
   * // series: [
   * //   {
   * //     name: 'Series1',
   * //     data: [1, 3],
   * //     color: '#50CD89'
   * //   }, {
   * //     name: 'Series2',
   * //     data: [2, 4],
   * //     color: '#F1416C'
   * //   }
   * // ]
   * ```
   */
  #createSeriesData(categorized: LineChartCategorizeData[]): LineChartSeries[] {
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