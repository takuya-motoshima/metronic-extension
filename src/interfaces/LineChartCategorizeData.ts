/**
 * Results of grouping data in LineChartSeries[] format by category name.
 */
export default interface LineChartCategorizeData {
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
     * Line color.
     * Default is "#009EF7".
     */
    color: string;
  }[];
}