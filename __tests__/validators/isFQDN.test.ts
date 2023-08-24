import path from 'path';
import fs from 'fs';
// @ts-ignore
import {parse} from 'csv-parse/sync';
import isFQDN from '~/validators/isFQDN';

// Data type to be passed to test.each.
type Table = [string, object, boolean];

// Sample data.
const sampleDir = path.join(__dirname, '../samples');
const fqdnValid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'fqdn-valid.csv'))).map((record: string[]) => record[0]);
const fqdnInvalid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'fqdn-invalid.csv'))).map((record: string[]) => record[0]);
const fqdnWithoutTldValid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'fqdn-without-tld-valid.csv'))).map((record: string[]) => record[0]);
const fqdnWithWildcardValid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'fqdn-with-wildcard-valid.csv'))).map((record: string[]) => record[0]);

describe('Valid FQDN should be true', () => {
  const table: Table[] = fqdnValid.map(item => ([item, {}, true]));
  test.each<Table>(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN should be false', () => {
  const table: Table[] = fqdnInvalid.map(item => ([item, {}, false]));
  test.each<Table>(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN without TLD should be true', () => {
  const table: Table[] = fqdnWithoutTldValid.map(item => ([item, {requireTld: false}, true]));
  test.each<Table>(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN with wildcard should be true', () => { 
  const table: Table[] = fqdnWithWildcardValid.map(item => ([item, {allowWildcard: true}, true]));
  test.each<Table>(table)('isFQDN("%s", %o) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});