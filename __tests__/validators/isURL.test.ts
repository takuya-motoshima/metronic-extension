import isURL from '~/validators/isURL';
import getSampleData from '../utils/getSampleData';
import {Table} from '../utils/types';

const urlValidList = getSampleData('url-valid.csv');
const urlInvalidList = getSampleData('url-invalid.csv');
const urlNoTldValidList = getSampleData('url-no-tld-valid.csv');
const urlWildcardValidList = getSampleData('url-wildcard-valid.csv');

describe('Valid URL should be true', () => {
  const table: Table[] = urlValidList.map(item => ([item, {}, true]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Invalid URL should be false', () => {
  const table: Table[] = urlInvalidList.map(item => ([item, {}, false]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Valid URL without TLD should be false', () => {
  const table: Table[] = urlNoTldValidList.map(item => ([item, {requireFQDNTld: false}, true]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Valid URL with wildcard should be true', () => {
  const table: Table[] = urlWildcardValidList.map(item => ([item, {allowFQDNWildcard: true}, true]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});