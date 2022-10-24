import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource} from 'axios';

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
  client: AxiosInstance;
  #beforeRequestHandler: (config: AxiosRequestConfig) => void = (config: AxiosRequestConfig) => {};
  #afterResponseHandler: (res: AxiosResponse) => void = (res: AxiosResponse) => {};
  #responseErrorHandler: (code: number, err: AxiosError) => void = (code: number, err: AxiosError) => {};

  /**
   * Initialization.
   */
  constructor(path: string, customOrigin: string|undefined = undefined) {
    let origin: string = location.origin;
    if (customOrigin)
      origin = customOrigin;
    origin = origin.replace(/\/$/, '');
    const options: AxiosRequestConfig = {
      baseURL: `${origin}/${path.replace(/^\//, '')}`,
      // baseURL: `${origin}/api/${path.replace(/^\//, '')}`,
      timeout: 60000,
      // timeout: 5000,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json',
      // transformRequest: [
      //   (data, headers) => {
      //     return data;
      //   }
      // ],
      withCredentials: true
    };

    // Client instance.
    this.client = axios.create(options);

    // Hook before sending a request.
    this.client.interceptors.request.use((config: AxiosRequestConfig) => {
      // if (config.data instanceof FormData)
      //   config.headers['Content-Type'] = 'multipart/form-data';
      this.#beforeRequestHandler(config);
      return config;
    });
 
    // Hook the response.
    this.client.interceptors.response.use(
      (res: AxiosResponse): AxiosResponse => {
        this.#afterResponseHandler(res);
        return res;
      },
      (err: AxiosError) => {
        const code = err.response?.status || 0;
        console.error(`Response error. Status: ${code}`);
        this.#responseErrorHandler(code, err);
        this.requestErrorHook(code, err);
        return Promise.reject(err);
      });
  }

  /**
   * Get a token to cancel the request.
   */
  getCancelToken(): CancelTokenSource {
    const CancelToken = axios.CancelToken;
    return CancelToken.source();
  }

  /**
   * Check if the request was canceled.
   */
  isCancel(thrown: any): any {
    return axios.isCancel(thrown);
  }

  /**
   * Set before request event listeners.
   */
  onBeforeRequest(handler: (config: AxiosRequestConfig) => void): Api {
    this.#beforeRequestHandler = handler;
    return this;
  }

  /**
   * Set after response event listeners.
   */
  onAfterResponse(handler: (res: AxiosResponse) => void): Api {
    this.#afterResponseHandler = handler;
    return this;
  }

  /**
   * Set response error event listeners.
   */
  onResponseError(handler: (code: number, err: AxiosError) => void): Api {
    this.#responseErrorHandler = handler;
    return this;
  }

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
  requestErrorHook(code: number, err: AxiosError): void {}
}