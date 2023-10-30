import isKana from '~/validators/isKana';

describe('Valid katakana should be true', () => {
  test.each([
    ['トウキョウタワー', true],
    ['ﾄｳｷｮｳﾀﾜｰ', true],
    ['トウキョウﾀﾜｰ', true],
    ['トウキョウ タワー', true],
  ])('isKana("%s") = %s', (a, expected) => {
    expect(isKana(a)).toBe(expected);
  });
});

describe('Invalid katakana should be false', () => {
  test.each([
    ['東京タワー', false],
    ['トウキョウたわー', false],
  ])('isKana("%s") = %s', (a, expected) => {
    expect(isKana(a)).toBe(expected);
  });
});