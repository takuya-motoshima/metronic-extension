/**
 * Escaping HTML special characters.
 */
export default (str: string): string => {
  return str.replace(/[&'`"<>]/g, (replacement: string): any => {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;', 
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;'
    }[replacement];
  });
}