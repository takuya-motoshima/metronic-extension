import path from 'path';
import fs from 'fs';
// @ts-ignore
import {parse} from 'csv-parse/sync';

/**
 * Get sample data for testing.
 */
export default (fileName: string): string[] => {
  // Import sample data from CSV.
  const records = parse(fs.readFileSync(path.join(__dirname, '../samples', fileName)));

  // Returns a list from which only the first column of the CSV is extracted.
  return records.map((record: string[]) => record[0]);
}