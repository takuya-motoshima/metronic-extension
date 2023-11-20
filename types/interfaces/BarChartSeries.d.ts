/**
 * Data to be set in the series option of the chart.
 */
export default interface BarChartSeries {
    /**
     * Data name.
     */
    name: string;
    /**
     * Category 1-N data.
     */
    data: number[];
    /**
     * Bar color.
     * Default is "#50CD89".
     */
    color: string;
}
