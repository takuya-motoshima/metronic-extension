import isString from '~/utils/isString';

/**
 * Get the fetched result as a Data URL.
 * @param {string|URL} url URL string or URL object.
 * @return {Promise<string>} Data URL.
 * @example
 * ```js
 * import {fetchDataUrl} from 'metronic-extension';
 * 
 * await fetchDataUrl('/img/sample.png');// -> data:image/png;base64,iVBORw0K...
 * await fetchDataUrl('/img/sample.svg');// -> data:image/svg+xml;utf8,%3Csvg...
 * ```
 */
export default async (url: string|URL): Promise<string> => {
  // Send request.
  const res = await fetch(url);
  if (!res.ok)
    // Returns an error in case of request failure.
    throw new Error(`Fetch error (Status: ${res.status||0}, URL: ${isString(url) ? url as string : (url as URL).href})`);
  if (!/..*\.svg(\?.*)?$/i.test(isString(url) ? url as string : (url as URL).href))
    // If the resource is not SVG, use the FileReader API to generate a Data URL.
    return new Promise<string>(async (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(await res.blob());
    });
  else {
    // If the resource is SVG, Data URL is generated from text data.
    const b64 = encodeURIComponent(await res.text());
    return `data:image/svg+xml;utf8,${b64}`;
  }
}