import * as utils from '~/utils';

describe('Whitespace (tabs and newline codes too) before and after the string should be trimmed', () => {
  test.each([
    ['  foo bar  ', 'foo bar'],
    ['\n\n\nfoo bar\n\r\n\n', 'foo bar'],
  ])('utils.trim("%s") = "%s"', (a, expected) => {
    expect(utils.trim(a)).toBe(expected);
  });
});