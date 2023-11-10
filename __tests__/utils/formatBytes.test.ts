import * as utils from '~/utils';

describe('Should be able to convert byte values to values in the appropriate units', () => {
  test.each([
    [435, 2, true, '435 Bytes'],
    [490398, 2, true, '478.9 KB'],
    [23483023, 2, true, '22.4 MB'],
    [30498505889, 2, true, '28.4 GB'],
    [9485039485039445, 2, true, '8.42 PB'],
    [9485039485039445, 2, false, {val: 8.42, unit: 'PB'}],
  ])('utils.formatBytes(%d, %d, %s) = "%s"', (a, b, c, expected) => {
    if (c)
      expect(utils.formatBytes(a, b, c)).toBe(expected);
    else
      expect(utils.formatBytes(a, b, c)).toEqual(expected);
  });
});