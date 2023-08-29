import isFQDN from '~/validators/isFQDN';
import isIP from '~/validators/isIP';
import IsFQDNorIPValidateOptions from '~/interfaces/IsFQDNorIPValidateOptions';

/**
 * Validate the domain name (e.g. domain.com) or IP.
 */
export default (value: string, options?: IsFQDNorIPValidateOptions): boolean => {
  // Returns validation results.
  return isFQDN(value, options) || isIP(value, {ipVersion: options?.ipVersion, allowIPRange: options?.allowIPRange});
}