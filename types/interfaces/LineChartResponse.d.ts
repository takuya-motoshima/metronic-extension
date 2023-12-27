/**
 * Data to be drawn on the chart returned by the Ajax request called from the chart.
 */
export default interface LineChartResponse {
    /**
     * Data name.
     * This value is used in tooltips and other displays.
     * This option is required.
     */
    name: string;
    /**
     * Category name.
     * Data will be grouped by category and each data will be displayed in the chart as a child of the category.
     * This option is required.
     */
    category: string;
    /**
     * Data Value.
     * This option is required.
     */
    data: number;
    /**
     * Line color.
     * Default is "#009EF7".
     */
    color?: string;
}
