/**
 * Escapes HTML special characters (&'`"<>).
 * @param {string} str String to escape.
 * @return {string} Escaped string.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 * 
 * utils.escapeHtml('I <b>think</b> this is good.');// -> I &lt;b&gt;think&lt;/b&gt; this is good.
 * utils.escapeHtml('John "Johnny" Smith');// -> John &quot;Johnny&quot; Smith
 * ```
 */
export default (str: string): string => {
  return str.replace(/[&'`"<>]/g, (replacement: string): any => {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;', 
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[replacement];
  });
}