import isFQDNorIP from '~/validators/isFQDNorIP';
import readCSV from '../support/readCSV';
import {Table} from '../support/types';

const fqdnValidList = readCSV('fqdn-valid.csv');
const ipv4ValidList = readCSV('ipv4-valid.csv');
const ipv6ValidList = readCSV('ipv6-valid.csv');
const fqdnInvalidList = readCSV('fqdn-invalid.csv');
const ipv4Or6InvalidList = readCSV('ipv4-or-6-invalid.csv');
const ipv4RangeValidList = readCSV('ipv4-range-valid.csv');
const ipv6RangeValidList = readCSV('ipv6-range-valid.csv');
const ipv4InvalidList = readCSV('ipv4-invalid.csv');
const ipv6InvalidList = readCSV('ipv6-invalid.csv');

describe('Valid FQDN, IP should be true', () => {
  const table: Table[] = [...fqdnValidList, ...ipv4ValidList, ...ipv6ValidList].map(item => ([item, {}, true]));
  test.each(table)('isFQDNorIP("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IP should be false', () => {
  const table: Table[] = [...fqdnInvalidList, ...ipv4Or6InvalidList, ...ipv4RangeValidList, ...ipv6RangeValidList].map(item => ([item, {}, false]));
  test.each(table)('isFQDNorIP("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Valid FQDN, IPv4 should be true', () => {
  const table: Table[] = [...fqdnValidList, ...ipv4ValidList].map(item => ([item, {ipVersion: 4}, true]));
  test.each(table)('isFQDNorIP("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IPv4 should be false', () => {
  const table: Table[] = [...fqdnInvalidList, ...ipv4InvalidList, ...ipv4RangeValidList].map(item => ([item, {ipVersion: 4}, false]));
  test.each(table)('isFQDNorIP("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Valid FQDN, IPv6 should be true', () => {
  const table: Table[] = [...fqdnValidList, ...ipv6ValidList].map(item => ([item, {ipVersion: 6}, true]));
  test.each(table)('isFQDNorIP("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IPv6 should be false', () => {
  const table: Table[] = [...fqdnInvalidList, ...ipv6InvalidList, ...ipv6RangeValidList].map(item => ([item, {ipVersion: 6}, false]));
  test.each(table)('isFQDNorIP("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});
