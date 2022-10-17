import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios';
/**
 * REST client.
 */
export default class Api {
    #private;
    client: AxiosInstance;
    /**
     * Initialization.
     */
    constructor(path: string, customOrigin?: string | undefined);
    /**
     * Get a token to cancel the request.
     */
    getCancelToken(): CancelTokenSource;
    /**
     * Check if the request was canceled.
     */
    isCancel(thrown: any): any;
    /**
     * Set before request event listeners.
     */
    onBeforeRequest(handler: (config: AxiosRequestConfig) => void): Api;
    /**
     * Set after response event listeners.
     */
    onAfterResponse(handler: (res: AxiosResponse) => void): Api;
    /**
     * Set response error event listeners.
     */
    onResponseError(handler: (err: AxiosError, status: number) => void): Api;
}
