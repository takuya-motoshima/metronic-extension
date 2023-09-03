import isFQDN from '~/validators/isFQDN';
import isIP from '~/validators/isIP';
import IsFQDNorIPOptions from '~/interfaces/IsFQDNorIPOptions';

/**
 * Check for a fully qualified domain name (e.g. domain.com) or IP (version 4 or 6).
 */
export default (value: string, options?: IsFQDNorIPOptions): boolean => {
  // Returns validation results.
  return isFQDN(value, options) || isIP(value, {ipVersion: options?.ipVersion, allowIPRange: options?.allowIPRange});
}