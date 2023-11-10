import * as utils from '~/utils';

describe('Asynchronous functions should be true', () => {
  test.each([
    [async function func() {}, true],
  ])('utils.isAsyncFunction(%s) = %s', (a, expected) => {
    expect(utils.isAsyncFunction(a)).toBe(expected);
  });
});

describe('Non-asynchronous functions should be false', () => {
  test.each([
    [function func() {}, false],
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
  ])('utils.isAsyncFunction(%s) = %s', (a, expected) => {
    expect(utils.isAsyncFunction(a)).toBe(expected);
  });
});