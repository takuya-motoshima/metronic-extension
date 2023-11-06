import BarChartResponse from '~/interfaces/BarChartResponse';
/**
 * BarChart options.
 * @see {@link https://apexcharts.com/docs/installation/|APEXCHARTS.JS}
 */
export default interface BarChartOptions {
    /**
     * This option will turn a column chart into a horizontal bar chart.
     * Default is false.
     */
    horizontal?: boolean;
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
        dataSrc?: (data: BarChartResponse[] | any) => BarChartResponse[];
    };
    /**
      * Callback function to change the value displayed for numeric data.
      * This is the value of the X-axis for horizontal bars and the value of the Y-axis for vertical bars.
      * Default is none (undefined), displaying the original value.
      * @example
      * ```js
      * dataFormatter: value => {
      *   // Converts values to a locale-specific format and displays them.
      *   return Number(value).toLocaleString();
      * }
      * ```
      */
    dataFormatter?: (value: string | number) => string;
    /**
      * Callback function to change the value displayed on the bar.
      * Default is none (undefined), displaying the original value.
      * @example
      * ```js
      * dataLabelFormatter: value => {
      *   // Converts values to a locale-specific format and displays them.
      *   return Number(value).toLocaleString();
      * }
      * ```
      */
    dataLabelFormatter?: (value: string | number) => string | number;
    /**
      * A callback function that changes the value displayed in the numeric data on the tooltip.
      * Default is none (undefined), displaying the original value.
      */
    tooltipDataFormatter?: (value: number) => string;
}
