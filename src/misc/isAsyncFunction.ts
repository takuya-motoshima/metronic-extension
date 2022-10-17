/**
  * Check for asynchronous functions.
  */
export default (payload: any): boolean => {
  return payload &&
    payload.constructor &&
    payload.constructor === Object.getPrototypeOf(async function(){}).constructor;
}
