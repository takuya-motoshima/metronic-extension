/**
 * Check if it is a string or not.
 */
export default (payload: any): boolean => {
  return typeof payload === 'string' || payload instanceof String;
}
