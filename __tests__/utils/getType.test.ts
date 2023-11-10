import * as utils from '~/utils';

describe('Should be able to get type names from variables of various types', () => {
  test.each([
    [3, 'Number'],
    [3.4, 'Number'],
    [NaN, 'Number'],
    ['ram', 'String'],
    [new String('ram'), 'String'],
    [new Date(), 'Date'],
    [true, 'Boolean'],
    [false, 'Boolean'],
    [new Boolean(true), 'Boolean'],
    [{}, 'Object'],
    [Object.create(null), 'Object'],
    [{name: 'Narendra'}, 'Object'],
    [new class Person{}, 'Object'],
    [[], 'Array'],
    [new Array(3, 4), 'Array'],
    [[3, 4], 'Array'],
    [parseFloat, 'Function'],
    [function(){}, 'Function'],
    [Symbol('foo'), 'Symbol'],
    [null, 'Null'],
    [undefined, 'Undefined'],
  ])('utils.getType(%s) = "%s"', (a, expected) => {
    expect(utils.getType(a)).toBe(expected);
  });
});