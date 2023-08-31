import isURL from '~/validators/isURL';
import readCSV from '../support/readCSV';
import {Table} from '../support/types';

const urlValidList = readCSV('url-valid.csv');
const urlInvalidList = readCSV('url-invalid.csv');
const urlNoTldValidList = readCSV('url-no-tld-valid.csv');
const urlWildcardValidList = readCSV('url-wildcard-valid.csv');

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