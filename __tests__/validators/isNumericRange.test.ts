import isNumericRange from '~/validators/isNumericRange';

describe('Valid numeric range should be true', () => {
  test.each([
    [1, {min: 1, max: 3}, true],
    [2, {min: 1, max: 3}, true],
    [3, {min: 1, max: 3}, true],
  ])('isNumericRange(%s, %s) = %s', (a, b, expected) => {
    expect(isNumericRange(a, b)).toBe(expected);
  });
});

describe('Invalid numeric range should be false', () => {
  test.each([
    [0, {min: 1, max: 3}, false],
    [4, {min: 1, max: 3}, false],
  ])('isNumericRange(%s, %s) = %s', (a, b, expected) => {
    expect(isNumericRange(a, b)).toBe(expected);
  });
});