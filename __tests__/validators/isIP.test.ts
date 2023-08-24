import path from 'path';
import fs from 'fs';
// @ts-ignore
import {parse} from 'csv-parse/sync';
import isIP from '~/validators/isIP';

// Data type to be passed to test.each.
type Table = [string, object, boolean];

// Sample data.
const sampleDir = path.join(__dirname, '../samples');
const ipv4Valid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv4-valid.csv'))).map((record: string[]) => record[0]);
const ipv6Valid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv6-valid.csv'))).map((record: string[]) => record[0]);
const ipv4And6Invalid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv4-and-6-invalid.csv'))).map((record: string[]) => record[0]);
const ipv4Invalid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv4-invalid.csv'))).map((record: string[]) => record[0]);
const ipv6Invalid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv6-invalid.csv'))).map((record: string[]) => record[0]);
const ipv4RangeValid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv4-range-valid.csv'))).map((record: string[]) => record[0]);
const ipv6RangeValid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv6-range-valid.csv'))).map((record: string[]) => record[0]);
const ipv4And6RangeInvalid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv4-and-6-range-invalid.csv'))).map((record: string[]) => record[0]);
const ipv4RangeInvalid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv4-range-invalid.csv'))).map((record: string[]) => record[0]);
const ipv6RangeInvalid: string[] = parse(fs.readFileSync(path.join(sampleDir, 'ipv6-range-invalid.csv'))).map((record: string[]) => record[0]);



describe('Valid IPv4, IPv6 should be true', () => {
  const table: Table[] = [...ipv4Valid, ...ipv6Valid].map(item => ([item, {}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 should be false', () => {
  const table: Table[] = ipv4And6Invalid.map(item => ([item, {}, false]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 should be true', () => {
  const table: Table[] = ipv4Valid.map(item => ([item, {version: 4}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 should be false', () => {
  const table: Table[] = ipv4Invalid.map(item => ([item, {version: 4}, false]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 should be true', () => {
  const table: Table[] = ipv6Valid.map(item => ([item, {version: 6}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 should be false', () => {
  const table: Table[] = ipv6Invalid.map(item => ([item, {version: 6}, false]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv6 range should be true', () => {
  const table: Table[] = [...ipv4RangeValid, ...ipv6RangeValid].map(item => ([item, {allowRange: true}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 range should be false', () => {
  const table: Table[] = ipv4And6RangeInvalid.map(item => ([item, {allowRange: true}, false]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 range should be true', () => {
  const table: Table[] = ipv4RangeValid.map(item => ([item, {allowRange: true, version: 4}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 range should be false', () => {
  const table: Table[] = ipv4RangeInvalid.map(item => ([item, {allowRange: true, version: 4}, false]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 range should be true', () => {
  const table: Table[] = ipv6RangeValid.map(item => ([item, {allowRange: true, version: 6}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 range should be false', () => {
  const table: Table[] = ipv6RangeInvalid.map(item => ([item, {allowRange: true, version: 6}, false]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv4 range should be true', () => {
  const table: Table[] = [...ipv4Valid, ...ipv4RangeValid].map(item => ([item, {allowRange: true, version: 4}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6, IPv6 range should be true', () => {
  const table: Table[] = [...ipv6Valid, ...ipv6RangeValid].map(item => ([item, {allowRange: true, version: 6}, true]));
  test.each<Table>(table)('isIP("%s", %o) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});