import * as utils from '~/utils';

describe('HTML special characters should be escaped', () => {
  test.each([
    ['I <b>think</b> this is good.', 'I &lt;b&gt;think&lt;/b&gt; this is good.'],
    ['John "Johnny" Smith', 'John &quot;Johnny&quot; Smith'],
  ])('utils.escapeHtml("%s") = "%s"', (a, expected) => {
    expect(utils.escapeHtml(a)).toBe(expected);
  });
});