import isPath from '~/validators/isPath';

describe('Valid File (directory) path should be true', () => {
  test.each([
    // With leading slash, without trailing slash.
    ['/', true],
    ['/usr', true],
    ['/usr/lib', true],
    ['/usr/lib/sysctl.d', true],
    ['/usr/lib/yum-plugins', true],
    ['/usr/lib/node_modules', true],
    ['/usr/123', true],

    // With leading and trailing slashes.
    ['/usr/', true],
    ['/usr/lib/', true],
    ['/usr/lib/sysctl.d/', true],
    ['/usr/lib/yum-plugins/', true],
    ['/usr/lib/node_modules/', true],
    ['/usr/123/', true],

    // Without leading slash, with trailing slash.
    ['usr/', true],
    ['usr/lib/', true],
    ['usr/lib/sysctl.d/', true],
    ['usr/lib/yum-plugins/', true],
    ['usr/lib/node_modules/', true],
    ['usr/123/', true],
  ])('isPath("%s") = %s', (a, expected) => {
    expect(isPath(a)).toBe(expected);
  });
});

describe('Invalid File (directory) path should be false', () => {
  test.each([
    ['//', false],
    ['//usr', false],
    ['/usr//', false],
    ['/usr//lib', false],
    ['/ドキュメント', false],
    ['/usr/ドキュメント', false],
  ])('isPath("%s") = %s', (a, expected) => {
    expect(isPath(a)).toBe(expected);
  });
});