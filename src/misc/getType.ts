/**
 * Get the type.
 */
export default (payload: any): string => {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
