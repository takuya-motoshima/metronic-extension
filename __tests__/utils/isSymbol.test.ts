import isSymbol from '~/utils/isSymbol';

describe('Symbol should be true', () => {
  test.each([
    [Symbol('a'), true],
    [Object(Symbol('a')), true],
  ])('isSymbol(%s) = %s', (a, expected) => {
    expect(isSymbol(a)).toBe(expected);
  });
});

describe('Non-symbol should be false', () => {
  test.each([
    [[1, 2, 3], false],
    [true, false],
    [new Date(), false],
    [new Error(), false],
    [{0: 1, length: 1}, false],
    [1, false],
    [/x/, false],
    ['a', false],
  ])('isSymbol(%s) = %s', (a, expected) => {
    expect(isSymbol(a)).toBe(expected);
  });
});