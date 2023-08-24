/**
 * IP Validate Option.
 */
interface Options {
    /**
     * 4 or 6. The default is undefind (allows both versions 4 and 6).
     */
    version?: '4' | '6' | 4 | 6;
    /**
     * If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.
     */
    allowRange?: boolean;
}
/**
 * Validate IP.
 */
declare const _default: (value: string, options?: Options) => boolean;
export default _default;
