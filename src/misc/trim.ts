/**
 * Remove spaces before and after a string.
 */
export default (str: string|null, toLower = false): string|null => {
  if (str == null)
    return str;
  str =  str.replace(/^[\s　]+|[\s　]+$/g, '');
  if (toLower)
    str = str.toLowerCase();
  return str;
}