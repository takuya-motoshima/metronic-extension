import validator from 'validator';
import {merge} from 'deep-fusion';
import IsIPOptions from '~/interfaces/IsIPOptions';

/**
 * Check for IP (version 4 or 6).
 */
export default (value: string, options?: IsIPOptions): boolean => {
  // Initialize options.
  options = merge({
    ipVersion: undefined,
    allowIPRange: false,
  }, options);

  // IP validation.
  const validIP = options?.ipVersion ? validator.isIP(value, options?.ipVersion) : validator.isIP(value);

  // Returns IP validation result if IP range is not allowed or if IP range is allowed and IP validation result is true.
  if (!options?.allowIPRange || (options?.allowIPRange && validIP))
    return validIP;

  // If IP range is allowed, return IP range validation result.
  return options?.ipVersion ? validator.isIPRange(value, options?.ipVersion) : validator.isIPRange(value);
}