import * as utils from '~/utils';

describe('Should be formatted as comma-separated numbers', () => {
  test.each([
    [1234, '1,234'],
    [1234.5, '1,234.5'],
    [0, '0'],
    [.0, '0'],
    [-1234, '-1,234'],
    [-1234.5, '-1,234.5'],
    ['1234', '1,234'],
    ['1234.5', '1,234.5'],
    ['0', '0'],
    ['.0', '0'],
    ['-1234', '-1,234'],
    ['-1234.5', '-1,234.5'],
  ])('utils.numberFormat(%s) = "%s"', (a, expected) => {
    expect(utils.numberFormat(a)).toBe(expected);
  });
});