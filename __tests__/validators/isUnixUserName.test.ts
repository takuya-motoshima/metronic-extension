import * as validators from '~/validators';

describe('Valid unix user name should be true', () => {
  test.each([
    ['root', true],
    ['www-data', true],
    ['user$', true],
    ['user123', true],
    ['_user', true],
  ])('validators.isUnixUserName("%s") = %s', (a, expected) => {
    expect(validators.isUnixUserName(a)).toBe(expected);
  });
});

describe('Invalid unix user name should be false', () => {
  test.each([
    ['1', false],
    ['$', false],
    ['-', false],
    ['user12345678901234567890123456789', false],
  ])('validators.isUnixUserName("%s") = %s', (a, expected) => {
    expect(validators.isUnixUserName(a)).toBe(expected);
  });
});