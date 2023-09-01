/**
 * Check if it is a unix user name.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/.test(value);
}