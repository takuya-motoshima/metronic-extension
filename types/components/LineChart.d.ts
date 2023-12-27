import LineChartOptions from '~/interfaces/LineChartOptions';
/**
 * Line chart based on <a href="https://apexcharts.com/" target="_blank">ApexCharts</a>.
 */
export default class {
    #private;
    /**
     * Read-only ApexCharts instance.
     * @type {ApexCharts|undefined}
     */
    get instance(): ApexCharts | undefined;
    /**
     * Create a new instance of the LineChart class.
     * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
     * @param {LineChartOptions} options Chart options.
     */
    constructor(element: string | HTMLElement | JQuery, options: LineChartOptions);
    /**
     * Redraw the chart.
     */
    reload(): Promise<void>;
}
