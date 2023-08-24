/**
 * Domain name (e.g. domain.com) validation options.
 */
interface Options {
    /**
     * If true, the TLD is required. Default is true.
     */
    requireTld?: boolean;
    /**
      * If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`).
      */
    allowWildcard?: boolean;
}
/**
 * Validate domain name (e.g. domain.com).
 */
declare const _default: (value: string, options?: Options) => boolean;
export default _default;
