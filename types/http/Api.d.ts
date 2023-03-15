import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios';
/**
 * REST client.
 *
 * Example of error handling in a subclass.
 * @example
 * import {Api} from 'metronic-extension';
 *
 * export default class extends Api {
 *   requestErrorHook(code) {
 *     if (code === 403) {
 *       // Redirect in case of authentication error (403).
 *       alert('The session has expired');
 *       location.replace('/');
 *     }
 *   }
 * }
 */
export default class Api {
    #private;
    client: AxiosInstance;
    /**
     * Initialization.
     */
    constructor(path: string, origin?: string, options?: AxiosRequestConfig);
    /**
     * Get a token to cancel the request.
     */
    getCancelToken(): CancelTokenSource;
    /**
     * Check if the request was canceled.
     */
    isCancel(thrown: any): any;
    /**
     * Set before request event handler.
     */
    onBeforeRequest(handler: (config: AxiosRequestConfig) => void): Api;
    /**
     * Set after response event handler.
     */
    onAfterResponse(handler: (res: AxiosResponse) => void): Api;
    /**
     * Set response error event handler.
     */
    onResponseError(handler: (code: number, err: AxiosError) => void): Api;
    /**
     * Request error hook.
     * This function should be defined in a subclass.
     * For example, to redirect in case of a 403 error, use the following
     * @example
     * import {Api} from 'metronic-extension';
     *
     * export default class extends Api {
     *   requestErrorHook(code) {
     *     if (code === 403) {
     *       // Redirect in case of authentication error (403).
     *       alert('The session has expired');
     *       location.replace('/');
     *     }
     *   }
     * }
     */
    requestErrorHook(code: number, err: AxiosError): void;
}
