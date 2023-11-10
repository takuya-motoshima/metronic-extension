import * as validators from '~/validators';

describe('Valid katakana should be true', () => {
  test.each([
    ['トウキョウタワー', true],
    ['ﾄｳｷｮｳﾀﾜｰ', true],
    ['トウキョウﾀﾜｰ', true],
    ['トウキョウ タワー', true],
  ])('validators.isKana("%s") = %s', (a, expected) => {
    expect(validators.isKana(a)).toBe(expected);
  });
});

describe('Invalid katakana should be false', () => {
  test.each([
    ['東京タワー', false],
    ['トウキョウたわー', false],
  ])('validators.isKana("%s") = %s', (a, expected) => {
    expect(validators.isKana(a)).toBe(expected);
  });
});