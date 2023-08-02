/**
 * Fetching a image.
 */
export default async (url: string): Promise<HTMLImageElement> => {
  const img: HTMLImageElement = new Image();
  img.crossOrigin  = 'use-credentials';
  img.src = url;
  await new Promise(rslv => $(img).on('load', rslv));
  return img;
}