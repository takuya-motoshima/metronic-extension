/**
 * Check if it is a file (directory) path
 */
export default (value: string): boolean => {
  // UNIX path regular expression.
  // Based on the "/^(\/|(\/[\w\s@^!#$%&-]+)+(\.[a-z]+\/?)?)$/i" regular expression, the leading and trailing slashes have been improved to be optional.
  const re = /^(\/|(\/?[\w\s@^!#$%&-\.]+)+\/?)$/i;

  // Returns validation results.
  return re.test(value);
}