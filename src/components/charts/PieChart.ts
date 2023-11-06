import {merge} from 'deep-fusion';
import axios from 'axios';
import isString from '~/utils/isString';
import PieChartOptions from '~/interfaces/PieChartOptions';
import PieChartResponse from '~/interfaces/PieChartResponse';

/**
 * Pie chart based on <a href="https://apexcharts.com/" target="_blank">ApexCharts</a>.
 */
export default class {
  // /**
  //  * Read-only ApexCharts instance.
  //  * @type {ApexCharts}
  //  */
  // get instance(): ApexCharts|undefined {
  //   return this.#chart;
  // }

  /**
   * ApexCharts instance.
   * @type {ApexCharts|undefined}
   */
  #chart: ApexCharts|undefined;

  /**
   * Finalized options.
   * @type {PieChartOptions}
   */
  #options: PieChartOptions;

  /**
   * The element on which the chart is drawn.
   * @type {HTMLElement}
   */
  #element: HTMLElement;

  /**
   * Create a new instance of the PieChart class.
   * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
   * @param {PieChartOptions} options Chart options.
   */
  public constructor(element: string|HTMLElement|JQuery, options: PieChartOptions) {
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
      width: 250,
      ajax: {
        method: 'GET',
        url: undefined,
        data: undefined,
        dataSrc: undefined,
      },
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
    const data: PieChartResponse[] = this.#options.ajax.dataSrc ? this.#options.ajax.dataSrc(res.data) : res.data;

    // Destroy drawn chart object.
    if (this.#chart)
      this.#chart.destroy();

    // Drawing a chart.
    this.#chart = new ApexCharts(this.#element, {
      series: data.map(({data}) => data),
      chart: {
        fontFamily: 'inherit',
        type: 'donut',
        width: this.#options.width,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%',
            labels: {
              value: {
                fontSize: '10px'
              }
            }
          }
        }
      },
      colors: data.map(({color}) => color),
      stroke: {
        width: 0
      },
      labels: data.map(({name}) => name),
      legend: {
        show: false,
      },
      fill: {
        type: 'false',
      }
    });
    this.#chart.render();
  }
}