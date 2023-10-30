/**
 * Get the fetched result as an Image object.
 * @param {string} url URL.
 * @return {Promise<HTMLImageElement>} Image object.
 * @example
 * ```js
 * import {fetchImage} from 'metronic-extension';
 * 
 * await fetchImage('/img/1.png');// -> <img crossorigin="use-credentials" src="/img/1.png">
 * ```
 */
export default async (url: string): Promise<HTMLImageElement> => {
  // New image object.
  const image: HTMLImageElement = new Image();

  // Send cookies, client certificates, and authentication headers, even cross-origin.
  image.crossOrigin  = 'use-credentials';

  // Set the URL of the resource to be loaded into the image.
  image.src = url;

  // Returns the loaded image.
  await new Promise(resolve => $(image).on('load', resolve));
  return image;
}