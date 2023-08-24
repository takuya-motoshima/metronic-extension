/**
 * Validate HTML strings.
 */
export default (value: string): boolean => {
  // Returns validation results.
  const parser = new DOMParser().parseFromString(value, 'text/html');
  return Array.from(parser.body.childNodes)
    .some(node => node.nodeType === 1);
}