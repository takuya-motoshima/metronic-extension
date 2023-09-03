/**
 * URL validate option.
 */
export default interface IsURLOptions {
    /**
     * If true, the TLD is required. Default is true.
     */
    requireFQDNTld?: boolean;
    /**
     * If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
     */
    allowFQDNWildcard?: boolean;
    /**
     * If true, allow fragment input. Default is false.
     */
    allowFragments?: boolean;
    /**
     * If true, allow input of query string. Default is false.
     */
    allowQueryComponents?: boolean;
}
