/**
 * Numeric Range Validate Option.
 */
interface Options {
    min: string;
    max: string;
}
/**
 * Validate numerical range.
 */
declare const _default: (value: string | number, options: Options) => boolean;
export default _default;
