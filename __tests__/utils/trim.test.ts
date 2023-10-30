import trim from '~/utils/trim';

describe('Whitespace (tabs and newline codes too) before and after the string should be trimmed', () => {
  test.each([
    ['  foo bar  ', 'foo bar'],
    ['\n\n\nfoo bar\n\r\n\n', 'foo bar'],
  ])('trim("%s") = "%s"', (a, expected) => {
    expect(trim(a)).toBe(expected);
  });
});