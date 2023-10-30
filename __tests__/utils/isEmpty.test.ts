import isEmpty from '~/utils/isEmpty';

describe('Should be true if the value is empty', () => {
  test.each([
    ['', true],
    [' ', true],
    [null, true],
    [undefined, true],
    [NaN, true],
    [[], true],
    [{}, true],
    [new Set(), true],
    [new Map(), true],
    [new Map(), true],
    [new File([''], 'foo.txt'), true],
  ])('isEmpty(%s) = %s', (a, expected) => {
    expect(isEmpty(a)).toBe(expected);
  });
});

describe('Should be false if the value is not empty', () => {
  test.each([
    ['string', false],
    [['a', 'b'], false],
    [{a: 'b'}, false],
    [0, false],
    [42, false],
    [function() {}, false],
    [false, false],
    [true, false],
    [new Set([1,2,3]), false],
    [new Map([['key', 'value']]), false],
    [new File(['bar'], 'bar.txt'), false],
  ])('isEmpty(%s) = %s', (a, expected) => {
    expect(isEmpty(a)).toBe(expected);
  });
});