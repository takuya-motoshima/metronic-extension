/**
 * FQDN validate option.
 */
export default interface IsFQDNOptions {
  /**
   * If true, the TLD is required. Default is true.
   */
  requireFQDNTld?: boolean;

  /**
    * If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
    */
  allowFQDNWildcard?: boolean;
}