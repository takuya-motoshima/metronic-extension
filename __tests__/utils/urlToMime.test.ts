import * as utils from '~/utils';

describe('Should be able to get the MIME type from the filename in the URL', () => {
  test.each([
    ['https://example.com/sample.js', 'application/javascript'],
    ['https://example.com/sample.json', 'application/json'],
    ['https://example.com/sample.txt', 'text/plain'],
    ['https://example.com/sample.jpg', 'image/jpeg'],
    ['https://example.com/dir/sample.txt', 'text/plain'],
  ])('utils.urlToMime("%s") = "%s"', (a, expected) => {
    expect(utils.urlToMime(a)).toBe(expected);
  });
});