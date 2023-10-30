/**
 * Tree options.
 */
export default interface TreeOptions {
  /**
    * URL to request. If you want to make the URL dynamic, use the callback function.
    */
  url: string|((node: any) => string);

  /**
    * Callback function to add or change data to be sent to the server. Default is none (undefined).
    */
  data?: (data: object, node: any) => void;
}