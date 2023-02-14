/**
 * Tree API Options.
 */
export default interface  {
    type?: string;
    url: string | ((node: any) => string);
    data?: (node: any) => Record<string, any>;
}
