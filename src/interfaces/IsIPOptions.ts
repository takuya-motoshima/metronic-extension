/**
 * IP validate option.
 */
export default interface IsIPOptions {
  /**
   * 4 or 6. The default is undefind (allows both versions 4 and 6).
   */
  ipVersion?: '4'|'6'|4|6;

  /**
   * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
   */
  allowIPRange?: boolean;
}