import validator from 'validator';
import {merge} from 'deep-fusion';

/**
 * IP Validate Option.
 */
interface Options {
  /**
   * 4 or 6. The default is undefind (allows both versions 4 and 6).
   */
  version?: '4'|'6'|4|6;

  /**
   * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
   */
  allowRange?: boolean;
}

/**
 * Validate IP.
 */
export default (value: string, options?: Options): boolean => {
  // Initialize options.
  options = merge({
    version: undefined,
    allowRange: false,
  }, options);

  // IP validation.
  const validIP = options?.version ? validator.isIP(value, options?.version) : validator.isIP(value);

  // Returns IP validation result if IP range is not allowed or if IP range is allowed and IP validation result is true.
  if (!options?.allowRange || (options?.allowRange && validIP))
    return validIP;

  // If IP range is allowed, return IP range validation result.
  return options?.version ? validator.isIPRange(value, options?.version) : validator.isIPRange(value);
}