import * as validators from '~/validators';

describe('Valid Japanese phone numbers should be true', () => {
  test.each([
    ['080-1111-1111', true],
    ['080-11111111', true],
    ['08011111111', true],
    ['03-1111-1111', true],
    ['03-11111111', true],
    ['0311111111', true],
  ])('validators.isPhoneNumberJp("%s") = %s', (a, expected) => {
    expect(validators.isPhoneNumberJp(a)).toBe(expected);
  });
});

describe('Invalid Japanese phone numbers should be false', () => {
  test.each([
    ['111-1111-1111', false],
    ['111-11111111', false],
    ['11111111111', false],
    ['03-1111-111111', false],
    ['03-11111111111', false],
    ['03111111111111', false],
  ])('validators.isPhoneNumberJp("%s") = %s', (a, expected) => {
    expect(validators.isPhoneNumberJp(a)).toBe(expected);
  });
});