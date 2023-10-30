import BarChartOptions from '~/interfaces/BarChartOptions';
/**
 * Bar chart based on <a href="https://apexcharts.com/" target="_blank">ApexCharts</a>.
 */
export default class {
    #private;
    /**
     * Create a new instance of the BarChart class.
     * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
     * @param {BarChartOptions} options Chart options.
     */
    constructor(element: string | HTMLElement | JQuery, options: BarChartOptions);
    /**
     * Loads the drawing data and redraws the chart.
     */
    reload(): Promise<void>;
}