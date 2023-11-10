import * as utils from '~/utils';

describe('Function should be true', () => {
  test.each([
    [function func() {}, true],
  ])('utils.isFunction(%s) = %s', (a, expected) => {
    expect(utils.isFunction(a)).toBe(expected);
  });
});

describe('Non-functions should be false', () => {
  test.each([
    [async function func() {}, false],
    [true, false],
    [false, false],
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [/a/g, false],
    ['string', false],
    [42, false],
    [new Date(), false],
  ])('utils.isFunction(%s) = %s', (a, expected) => {
    expect(utils.isFunction(a)).toBe(expected);
  });
});