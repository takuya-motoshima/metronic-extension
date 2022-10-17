/**
 * Image input component options.
 */
export default interface {
  current?: string,
  default?: string,
  hiddenEl?: HTMLInputElement,
  width?: number,
  height?: number,
  readonly?: boolean,
  cancelable?: boolean,
  accept?: string,
  language?: {
    change: string,
    remove: string,
    cancel: string,
  },
}