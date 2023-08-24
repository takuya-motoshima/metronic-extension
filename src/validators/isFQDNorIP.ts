import isFQDN from '~/validators/isFQDN';
import isIP from '~/validators/isIP';

/**
 * Domain name (e.g. domain.com) validation options.
 */
interface Options {
  /**
   * If true, the TLD is required. Default is true.
   */
  requireTld?: boolean;

  // /**
  //  * If true, allows the use of underscore characters in the domain. Default is false.
  //  */
  // allowUnderscores?: boolean;

  // /**
  //  * If true, remove the trailing dot from the domain before checking for validity. Default is false.
  //  */
  // allowTrailingDot?: boolean;

  // /**
  //  * If true, allow numeric-only TLDs. Default is false.
  //  */
  // allowNumericTld?: boolean;

  /**
    * If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`).
    */
  allowWildcard?: boolean;

  /**
  * 4 or 6. The default is undefind (allows both versions 4 and 6).
  */
  ipVersion?: '4'|'6'|4|6;

  /**
   * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
   */
  allowIPRange?: boolean;
}

/**
 * Validate the domain name (e.g. domain.com) or IP.
 */
export default (value: string, options?: Options): boolean => {
  // Returns validation results.
  return isFQDN(value, options) || isIP(value, {version: options?.ipVersion, allowRange: options?.allowIPRange});
}