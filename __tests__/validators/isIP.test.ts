import isIP from '~/validators/isIP';
import getSampleData from '../utils/getSampleData';
import {Table} from '../utils/types';

const ipv4ValidList = getSampleData('ipv4-valid.csv');
const ipv6ValidList = getSampleData('ipv6-valid.csv');
const ipv4Or6InvalidList = getSampleData('ipv4-or-6-invalid.csv');
const ipv4InvalidList = getSampleData('ipv4-invalid.csv');
const ipv6InvalidList = getSampleData('ipv6-invalid.csv');
const ipv4RangeValidList = getSampleData('ipv4-range-valid.csv');
const ipv6RangeValidList = getSampleData('ipv6-range-valid.csv');
const ipv4Or6RangeInvalidList = getSampleData('ipv4-or-6-range-invalid.csv');
const ipv4RangeInvalidList = getSampleData('ipv4-range-invalid.csv');
const ipv6RangeInvalidList = getSampleData('ipv6-range-invalid.csv');

describe('Valid IPv4, IPv6 should be true', () => {
  const table: Table[] = [...ipv4ValidList, ...ipv6ValidList].map(item => ([item, {}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 should be false', () => {
  const table: Table[] = ipv4Or6InvalidList.map(item => ([item, {}, false]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 should be true', () => {
  const table: Table[] = ipv4ValidList.map(item => ([item, {ipVersion: 4}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 should be false', () => {
  const table: Table[] = ipv4InvalidList.map(item => ([item, {ipVersion: 4}, false]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 should be true', () => {
  const table: Table[] = ipv6ValidList.map(item => ([item, {ipVersion: 6}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 should be false', () => {
  const table: Table[] = ipv6InvalidList.map(item => ([item, {ipVersion: 6}, false]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv6 range should be true', () => {
  const table: Table[] = [...ipv4RangeValidList, ...ipv6RangeValidList].map(item => ([item, {allowIPRange: true}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 range should be false', () => {
  const table: Table[] = ipv4Or6RangeInvalidList.map(item => ([item, {allowIPRange: true}, false]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 range should be true', () => {
  const table: Table[] = ipv4RangeValidList.map(item => ([item, {allowIPRange: true, ipVersion: 4}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 range should be false', () => {
  const table: Table[] = ipv4RangeInvalidList.map(item => ([item, {allowIPRange: true, ipVersion: 4}, false]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 range should be true', () => {
  const table: Table[] = ipv6RangeValidList.map(item => ([item, {allowIPRange: true, ipVersion: 6}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 range should be false', () => {
  const table: Table[] = ipv6RangeInvalidList.map(item => ([item, {allowIPRange: true, ipVersion: 6}, false]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv4 range should be true', () => {
  const table: Table[] = [...ipv4ValidList, ...ipv4RangeValidList].map(item => ([item, {allowIPRange: true, ipVersion: 4}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6, IPv6 range should be true', () => {
  const table: Table[] = [...ipv6ValidList, ...ipv6RangeValidList].map(item => ([item, {allowIPRange: true, ipVersion: 6}, true]));
  test.each(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});