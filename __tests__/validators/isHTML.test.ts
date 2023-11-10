import * as validators from '~/validators';

describe('Valid HTML string should be true', () => {
  test.each([
    ['<p>foo</p>', true],
    ['<a href="#">foo</a>', true],
    ['<x-unicorn>', true],
  ])('validators.isHTML("%s") = %s', (a, expected) => {
    expect(validators.isHTML(a)).toBe(expected);
  });
});

describe('Invalid HTML string should be false', () => {
  test.each([
	  ['foo', false],
  ])('validators.isHTML("%s") = %s', (a, expected) => {
    expect(validators.isHTML(a)).toBe(expected);
  });
});