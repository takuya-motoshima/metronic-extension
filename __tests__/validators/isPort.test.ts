import * as validators from '~/validators';

describe('Valid port should be true', () => {
  test.each([
    ['0', true],
    ['22', true],
    ['80', true],
    ['443', true],
    ['3000', true],
    ['8080', true],
    ['65535', true],
  ])('validators.isPort("%s") = %s', (a, expected) => {
    expect(validators.isPort(a)).toBe(expected);
  });
});

describe('Invalid port should be false', () => {
  test.each([
    ['', false],
    ['-1', false],
    ['65536', false],
  ])('validators.isPort("%s") = %s', (a, expected) => {
    expect(validators.isPort(a)).toBe(expected);
  });
});