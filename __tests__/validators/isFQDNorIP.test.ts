import isFQDNorIP from '~/validators/isFQDNorIP';
import readCSV from '../support/readCSV';
import {Table} from '../support/types';

const validFQDN = readCSV('valid-fqdn.csv');
const validIPv4 = readCSV('valid-ipv4.csv');
const validIPv6 = readCSV('valid-ipv6.csv');
const validIPv4Range = readCSV('valid-ipv4-range.csv');
const validIPv6Range = readCSV('valid-ipv6-range.csv');
const invalidFQDN = readCSV('invalid-fqdn.csv');
const invalidIPv4Or6 = readCSV('invalid-ipv4-or-6.csv');
const invalidIPv4 = readCSV('invalid-ipv4.csv');
const invalidIPv6 = readCSV('invalid-ipv6.csv');

describe('Valid FQDN, IP should be true', () => {
  const table: Table[] = [...validFQDN, ...validIPv4, ...validIPv6].map(item => ([item, {}, true]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IP should be false', () => {
  const table: Table[] = [...invalidFQDN, ...invalidIPv4Or6, ...validIPv4Range, ...validIPv6Range].map(item => ([item, {}, false]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Valid FQDN, IPv4 should be true', () => {
  const table: Table[] = [...validFQDN, ...validIPv4].map(item => ([item, {ipVersion: 4}, true]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IPv4 should be false', () => {
  const table: Table[] = [...invalidFQDN, ...invalidIPv4, ...validIPv4Range].map(item => ([item, {ipVersion: 4}, false]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Valid FQDN, IPv6 should be true', () => {
  const table: Table[] = [...validFQDN, ...validIPv6].map(item => ([item, {ipVersion: 6}, true]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IPv6 should be false', () => {
  const table: Table[] = [...invalidFQDN, ...invalidIPv6, ...validIPv6Range].map(item => ([item, {ipVersion: 6}, false]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});
