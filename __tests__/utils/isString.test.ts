import isString from '~/utils/isString';

describe('String should be true', () => {
  test.each([
    ['a', true],
    [Object('a'), true],
  ])('isString(%s) = %s', (a, expected) => {
    expect(isString(a)).toBe(expected);
  });
});

describe('Non-string should be false', () => {
  test.each([
    [[1, 2, 3], false],
    [true, false],
    [new Date(), false],
    [new Error(), false],
    [{0: 1, length: 1}, false],
    [1, false],
    [/x/, false],
    [Symbol('a'), false],
  ])('isString(%s) = %s', (a, expected) => {
    expect(isString(a)).toBe(expected);
  });
});