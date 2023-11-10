/**
 * Get the fetched result as an Image object.
 * @param {string} url URL.
 * @return {Promise<HTMLImageElement>} Image object.
 * @example
 * ```js
 * import {utils} from 'metronic-extension';
 *
 * await utils.fetchImage('/img/1.png');// -> <img crossorigin="use-credentials" src="/img/1.png">
 * ```
 */
declare const _default: (url: string) => Promise<HTMLImageElement>;
export default _default;
