import PieChartOptions from '~/interfaces/PieChartOptions';
/**
 * Pie chart based on <a href="https://apexcharts.com/" target="_blank">ApexCharts</a>.
 */
export default class {
    #private;
    /**
     * Create a new instance of the PieChart class.
     * @param {string|HTMLElement|JQuery} element HTMLElement selector, element, or JQuery object.
     * @param {PieChartOptions} options Chart options.
     */
    constructor(element: string | HTMLElement | JQuery, options: PieChartOptions);
    /**
     * Redraw the chart.
     */
    reload(): Promise<void>;
}
