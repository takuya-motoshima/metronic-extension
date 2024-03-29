import * as validators from '~/validators';
import readCSV from '../support/readCSV';
import {Table} from '../support/types';

const validFQDN = readCSV('valid-fqdn.csv');
const validFQDNNoTld = readCSV('valid-fqdn-no-tld.csv');
const validFQDNWildcard = readCSV('valid-fqdn-wildcard.csv');
const invalidFQDN = readCSV('invalid-fqdn.csv');

describe('Valid FQDN should be true', () => {
  const table: Table[] = validFQDN.map(item => ([item, {}, true]));
  test.each(table)('validators.isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isFQDN(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN should be false', () => {
  const table: Table[] = invalidFQDN.map(item => ([item, {}, false]));
  test.each(table)('validators.isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN without TLD should be true', () => {
  const table: Table[] = validFQDNNoTld.map(item => ([item, {requireFQDNTld: false}, true]));
  test.each(table)('validators.isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN with wildcard should be true', () => { 
  const table: Table[] = validFQDNWildcard.map(item => ([item, {allowFQDNWildcard: true}, true]));
  test.each(table)('validators.isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(validators.isFQDN(a, b)).toBe(expected);
  });
});