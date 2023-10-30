import isHTML from '~/validators/isHTML';

describe('Valid HTML string should be true', () => {
  test.each([
    ['<p>foo</p>', true],
    ['<a href="#">foo</a>', true],
    ['<x-unicorn>', true],
  ])('isHTML("%s") = %s', (a, expected) => {
    expect(isHTML(a)).toBe(expected);
  });
});

describe('Invalid HTML string should be false', () => {
  test.each([
	  ['foo', false],
  ])('isHTML("%s") = %s', (a, expected) => {
    expect(isHTML(a)).toBe(expected);
  });
});