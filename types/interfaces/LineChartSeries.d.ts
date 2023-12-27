/**
 * Data to be set in the series option of the chart.
 */
export default interface LineChartSeries {
    /**
     * Data name.
     */
    name: string;
    /**
     * Category 1-N data.
     */
    data: number[];
    /**
     * Line color.
     * Default is "#009EF7".
     */
    color: string;
}
