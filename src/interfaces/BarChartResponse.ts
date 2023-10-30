/**
 * Data to be drawn on the chart returned by the Ajax request called from the chart.
 */
export default interface BarChartResponse {
  /**
   * Category name.
   * Data will be grouped by category and each data will be displayed in the chart as a child of the category.
   * This option is required.
   */
  category: string;

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
   * Bar color.
   * Default is "#50CD89".
   */
  color?: string;
};