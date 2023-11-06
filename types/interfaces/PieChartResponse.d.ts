/**
 * Data to be drawn on the chart returned by the Ajax request called from the chart.
 */
export default interface PieChartResponse {
    /**
     * Data name.
     * This value is used in tooltips and other displays.
     * This option is required.
     */
    name: string;
    /**
     * Data Value.
     * This option is required.
     */
    data: number;
    /**
     * Color of slice.
     * This option is required.
     */
    color: string;
}
