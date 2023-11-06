import PieChartResponse from '~/interfaces/PieChartResponse';
/**
 * PieChart options.
 * @see {@link https://apexcharts.com/docs/installation/|APEXCHARTS.JS}
 */
export default interface PieChartOptions {
    /**
     * Width of the chart in pixels. Default is 250.
     */
    width?: number;
    /**
     * Option to request chart data.
     */
    ajax: {
        /**
         * HTTP method of the request. Default is "GET".
         */
        method?: 'GET' | 'POST' | 'PUT';
        /**
         * URL to request. This option is required.
         */
        url: string;
        /**
         * Callback function to add or change data to be sent to the server. Default is none (undefined).
         * @example
         * ```js
         * data: data => {
         *   data.extra = 'Extra';
         * }
         * ```
         */
        data?: (data: object) => object;
        /**
         * Callback function to add or modify data retrieved from the server. Default is none (undefined).
         * @example
         * ```js
         * dataSrc: data => {
         *   // Calculate and display data totals.
         *   const total = data.reduce((total, item) => {
         *     return total + item.data;
         *   }, 0);
         *   document.getElementById('total').textContent = total;
         *
         *   // Returns data to be drawn on the chart.
         *   return data;
         * }
         * ```
         */
        dataSrc?: (data: PieChartResponse[] | any) => PieChartResponse[];
    };
}
