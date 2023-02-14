/**
 * Date Range Picker option.
 */
export default interface {
  minDate? :string,
  maxDate?: string,
  locale?: string,
  language?: {
    applyLabel: string,
    cancelLabel: string
  }
}