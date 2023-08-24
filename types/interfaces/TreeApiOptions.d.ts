/**
 * Tree API Options.
 */
export default interface TreeApiOptions {
    type?: string;
    url: string | ((node: any) => string);
    data?: (node: any) => Record<string, any>;
}
