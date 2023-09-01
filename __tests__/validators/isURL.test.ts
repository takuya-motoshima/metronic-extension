import isURL from '~/validators/isURL';
import readCSV from '../support/readCSV';
import {Table} from '../support/types';

const validURL = readCSV('valid-url.csv');
const validURLNoTld = readCSV('valid-url-no-tld.csv');
const validURLWildcard = readCSV('valid-url-wildcard.csv');
const invalidURL = readCSV('invalid-url.csv');

describe('Valid URL should be true', () => {
  const table: Table[] = validURL.map(item => ([item, {}, true]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Invalid URL should be false', () => {
  const table: Table[] = invalidURL.map(item => ([item, {}, false]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Valid URL without TLD should be false', () => {
  const table: Table[] = validURLNoTld.map(item => ([item, {requireFQDNTld: false}, true]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Valid URL with wildcard should be true', () => {
  const table: Table[] = validURLWildcard.map(item => ([item, {allowFQDNWildcard: true}, true]));
  test.each(table)('isURL("%s", %o) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});