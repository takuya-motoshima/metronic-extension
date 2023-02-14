/**
 * Check if it is a function type.
 */
export default (payload: any): boolean => {
  if (!payload)
    return false
  var type = Object.prototype.toString.call(payload)
  return type === '[object Function]'
    || (typeof payload === 'function' && type !== '[object RegExp]')
    || (typeof window !== 'undefined' &&
     // IE8 and below
     (payload === window.setTimeout
      || payload === window.alert
      || payload === window.confirm
      || payload === window.prompt))
}