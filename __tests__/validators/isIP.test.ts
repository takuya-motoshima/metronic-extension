import * as validators from '~/validators';
import readCSV from '../support/readCSV';
import {Table} from '../support/types';

const validIPv4 = readCSV('valid-ipv4.csv');
const validIPv6 = readCSV('valid-ipv6.csv');
const validIPv4Range = readCSV('valid-ipv4-range.csv');
const validIPv6Range = readCSV('valid-ipv6-range.csv');
const invalidIPv4Or6 = readCSV('invalid-ipv4-or-6.csv');
const invalidIPv4 = readCSV('invalid-ipv4.csv');
const invalidIPv6 = readCSV('invalid-ipv6.csv');
const invalidIPv4Or6Range = readCSV('invalid-ipv4-or-6-range.csv');
const invalidIPv4Range = readCSV('invalid-ipv4-range.csv');
const invalidIPv6Range = readCSV('invalid-ipv6-range.csv');

describe('Valid IPv4, IPv6 should be true', () => {
  const table: Table[] = [...validIPv4, ...validIPv6].map(item => ([item, {}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 should be false', () => {
  const table: Table[] = invalidIPv4Or6.map(item => ([item, {}, false]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 should be true', () => {
  const table: Table[] = validIPv4.map(item => ([item, {ipVersion: 4}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 should be false', () => {
  const table: Table[] = invalidIPv4.map(item => ([item, {ipVersion: 4}, false]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 should be true', () => {
  const table: Table[] = validIPv6.map(item => ([item, {ipVersion: 6}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 should be false', () => {
  const table: Table[] = invalidIPv6.map(item => ([item, {ipVersion: 6}, false]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv6 range should be true', () => {
  const table: Table[] = [...validIPv4Range, ...validIPv6Range].map(item => ([item, {allowIPRange: true}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 range should be false', () => {
  const table: Table[] = invalidIPv4Or6Range.map(item => ([item, {allowIPRange: true}, false]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 range should be true', () => {
  const table: Table[] = validIPv4Range.map(item => ([item, {allowIPRange: true, ipVersion: 4}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 range should be false', () => {
  const table: Table[] = invalidIPv4Range.map(item => ([item, {allowIPRange: true, ipVersion: 4}, false]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 range should be true', () => {
  const table: Table[] = validIPv6Range.map(item => ([item, {allowIPRange: true, ipVersion: 6}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 range should be false', () => {
  const table: Table[] = invalidIPv6Range.map(item => ([item, {allowIPRange: true, ipVersion: 6}, false]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv4 range should be true', () => {
  const table: Table[] = [...validIPv4, ...validIPv4Range].map(item => ([item, {allowIPRange: true, ipVersion: 4}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6, IPv6 range should be true', () => {
  const table: Table[] = [...validIPv6, ...validIPv6Range].map(item => ([item, {allowIPRange: true, ipVersion: 6}, true]));
  test.each(table)('validators.isIP("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isIP(a, b)).toBe(expected);
  });
});