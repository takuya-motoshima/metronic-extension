import isFQDNorIP from '~/validators/isFQDNorIP';
import getSampleData from '../utils/getSampleData';
import {Table} from '../utils/types';

const fqdnValidList = getSampleData('fqdn-valid.csv');
const ipv4ValidList = getSampleData('ipv4-valid.csv');
const ipv6ValidList = getSampleData('ipv6-valid.csv');
const fqdnInvalidList = getSampleData('fqdn-invalid.csv');
const ipv4Or6InvalidList = getSampleData('ipv4-or-6-invalid.csv');
const ipv4RangeValidList = getSampleData('ipv4-range-valid.csv');
const ipv6RangeValidList = getSampleData('ipv6-range-valid.csv');
const ipv4InvalidList = getSampleData('ipv4-invalid.csv');
const ipv6InvalidList = getSampleData('ipv6-invalid.csv');

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
