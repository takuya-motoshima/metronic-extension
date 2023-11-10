import BarChartOptions from '~/interfaces/BarChartOptions';
/**
 * Bar chart based on <a href="https://apexcharts.com/" target="_blank">ApexCharts</a>.
 */
export default class {
    #private;
    /**
     * Read-only ApexCharts instance.
     * @type {ApexCharts|undefined}
     */
    get instance(): ApexCharts | undefined;
    /**
     * Create a new instance of the BarChart class.
     * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
     * @param {BarChartOptions} options Chart options.
     */
    constructor(element: string | HTMLElement | JQuery, options: BarChartOptions);
    /**
     * Redraw the chart.
     */
    reload(): Promise<void>;
}
