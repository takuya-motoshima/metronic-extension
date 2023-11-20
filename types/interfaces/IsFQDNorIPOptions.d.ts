/**
 * FQDN or IP validate option.
 */
export default interface IsFQDNorIPOptions {
    /**
     * If true, the TLD is required. Default is true.
     */
    requireFQDNTld?: boolean;
    /**
     * If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
     */
    allowFQDNWildcard?: boolean;
    /**
     * 4 or 6. The default is undefind (allows both versions 4 and 6).
     */
    ipVersion?: '4' | '6' | 4 | 6;
    /**
     * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
     */
    allowIPRange?: boolean;
}
