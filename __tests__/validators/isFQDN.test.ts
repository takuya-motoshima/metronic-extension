import isFQDN from '~/validators/isFQDN';
import getSampleData from '../utils/getSampleData';
import {Table} from '../utils/types';

const fqdnValidList = getSampleData('fqdn-valid.csv');
const fqdnInvalidList = getSampleData('fqdn-invalid.csv');
const fqdnNoTldValidList = getSampleData('fqdn-no-tld-valid.csv');
const fqdnWildcardValidList = getSampleData('fqdn-wildcard-valid.csv');

describe('Valid FQDN should be true', () => {
  const table: Table[] = fqdnValidList.map(item => ([item, {}, true]));
  test.each(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN should be false', () => {
  const table: Table[] = fqdnInvalidList.map(item => ([item, {}, false]));
  test.each(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN without TLD should be true', () => {
  const table: Table[] = fqdnNoTldValidList.map(item => ([item, {requireFQDNTld: false}, true]));
  test.each(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN with wildcard should be true', () => { 
  const table: Table[] = fqdnWildcardValidList.map(item => ([item, {allowFQDNWildcard: true}, true]));
  test.each(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});