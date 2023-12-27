/**
 * Results of grouping data in BarChartSeries[] format by category name.
 */
export default interface BarChartCategorizeData {
  /**
   * Category name.
   */
  category: string;

  /**
   * Data associated with the category
   */
  data: {
    /**
     * Data name.
     */
    name: string;

    /**
     * Data Value.
     */
    data: number;

    /**
     * Bar color.
     * Default is "#009EF7".
     */
    color: string;
  }[];
}