import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource} from 'axios';
import {merge} from 'deep-fusion';

/**
 * API client based on <a href="https://axios-http.com/" target="_blank">Axios</a>.
 * @example
 * ```js
 * import {components} from 'metronic-extension';
 * 
 * class PersonApi extends components.Api {
 *   constructor() {
 *     super('/api/persons', 'https://example.com');
 *   }
 * 
 *   /**
 *    * Create person (POST https://example.com/api/persons).
 *    * @param {FormData} formData
 *    *\/
 *   async createPerson(formData) {
 *     return this.client.post('/', formData);
 *   }
 * 
 *   /**
 *    * Update person (PUT https://example.com/api/persons/:id).
 *    * @param {number} personId
 *    * @param {FormData} formData
 *    *\/
 *   async updatePerson(personId, formData) {
 *     return this.client.put(`/${personId}`, formData);
 *   }
 * 
 *   /**
 *    * Get person (GET https://example.com/api/persons/:id).
 *    * @param {number} personId
 *    *\/
 *   async getPerson(personId) {
 *     return this.client.get(`/${personId}`);
 *   }
 * 
 *   /**
 *    * Delete person (DELETE https://example.com/api/persons/:id).
 *    * @param {number} personId
 *    *\/
 *   async deletePerson(personId) {
 *     return this.client.delete(`/${personId}`);
 *   }
 * }
 * 
 * // Create an API client instance.
 * const personApi = new PersonApi();
 * 
 * // Get person.
 * const personId = 1;
 * await personApi.get(personId);
 * ```
 */
export default class Api {
  /**
   * Axios Instance.
   * @type {axios.AxiosInstance}
   */
  protected client: AxiosInstance;

  /**
   * Create a new instance of the API class.
   * @param {string} path Base path of the request URL. For example, "/person".
   * @param {string} origin? Request URL origin. For example, "https://example.com". Default is the current origin (location.origin).
   * @param {axios.AxiosRequestConfig} options? Request Config.
   */
  public constructor(path: string, origin?: string, options?: AxiosRequestConfig) {
    // If the origin is unspecified, set the current origin.
    if (!origin)
      origin = location.origin;

    // Initialize options.
    options = merge({
      baseURL: `${origin.replace(/\/$/, '')}/${path.replace(/^\//, '')}`,
      timeout: 60000,
      // NOTE: If the request data is FormData, do not specify Content-Type in the header and leave it to Axios because some frameworks cannot receive data if Content-Type is specified in the header.
      // headers: {
      //   'accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   'X-Requested-With': 'XMLHttpRequest'
      // },
      responseType: 'json',
      // transformRequest: [
      //   (data, headers) => {
      //     return data;
      //   }
      // ],
      withCredentials: true,
    }, options);

    // Client instance.
    this.client = axios.create(options);

    // Hook before sending a request.
    this.client.interceptors.request.use((config: AxiosRequestConfig) => {
      // if (config.data instanceof FormData)
      //   config.headers['Content-Type'] = 'multipart/form-data';
      this.beforeRequestHook(config);
      return config;
    });
 
    // Hook the response.
    this.client.interceptors.response.use(
      (res: AxiosResponse): AxiosResponse => {
        this.afterResponseHook(res);
        return res;
      },
      (error: AxiosError) => {
        const httpStatusCode = error.response?.status || 0;
        console.error(`Response error. Status: ${httpStatusCode}`);
        this.errorHook(httpStatusCode, error);
        return Promise.reject(error);
      });
  }

  /**
   * Called just before the request.
   * This function receives the request configuration object (axios.AxiosRequestConfig).
   * @param {axios.AxiosRequestConfig} config Request Config.
   * @example
   * ```js
   * beforeRequestHook(config) {
   *   // Set a token in the request header.
   *   config.headers.Authorization = 'Bearer AbCdEf123456';
   * }
   * ```
   */
  protected beforeRequestHook(config: AxiosRequestConfig): void {}

  /**
   * Called immediately after the response.
   * The function receives the response object (axios.AxiosResponse).
   * @param {axios.AxiosResponse} res Response object.
   * @example
   * ```js
   * afterResponseHook(res) {
   *   if (response.status === 401)
   *     // Alerts when an authentication error occurs.
   *     alert('You are not authorized');
   * }
   * ```
   */
  protected afterResponseHook(res: AxiosResponse): void {}

  /**
   * Called on request errors.
   * This function receives a request error object (axios.AxiosError).
   * @param {number} httpStatusCode HTTP status code.
   * @param {axios.AxiosError} error Request error object.
   * @example
   * ```js
   * errorHook(httpStatusCode, error) {
   *   if (httpStatusCode === 403)
   *     // Redirect in case of authentication error (403).
   *     location.replace('/');
   * }
   * ```
   */
  protected errorHook(httpStatusCode: number, error: AxiosError): void {}

  /**
   * Get a token to cancel the request.
   * @return {axios.CancelTokenSource} A cancellation token.
   */
  public getCancelToken(): CancelTokenSource {
    const CancelToken = axios.CancelToken;
    return CancelToken.source();
  }

  /**
   * Checks the RequestError object to see if the error is due to the request being canceled.
   * @param {any} thrown Request Error object.
   * @return {boolean} True if the error is due to cancellation of the request.
   */
  public isCancel(thrown: any): boolean {
    return axios.isCancel(thrown) === true;
  }
}