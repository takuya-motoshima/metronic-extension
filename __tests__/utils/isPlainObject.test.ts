import * as utils from '~/utils';

describe('Plain objects should be true', () => {
  test.each([
    [{}, true],
    [{foo: true}, true],
    [new Object(), true],
  ])('utils.isPlainObject(%s) = %s', (a, expected) => {
    expect(utils.isPlainObject(a)).toBe(expected);
  });
});

describe('Non-plain objects should be false', () => {
  test.each([
    [['foo', 'bar'], false],
    [new class Foo{}, false],
    [Math, false],
    [JSON, false],
    [Atomics, false],
    [Error, false],
    [() => {}, false],
    [/./, false],
    [null, false],
    [undefined, false],
    [Number.NaN, false],
    ['', false],
    [0, false],
    [false, false],
    [Object.create({}), false],
    [Object.create(null), false],
  ])('utils.isPlainObject(%s) = %s', (a, expected) => {
    expect(utils.isPlainObject(a)).toBe(expected);
  });
});