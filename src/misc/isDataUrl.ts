/**
  * Check if it is a DataURL string.
  */
export default (payload: string): boolean => {
  return /^data:image\/[\w-+\d.]+;\w+,/.test(payload);
}