/**
 * Fetched as DataURL using canvas.
 */
export default async (url: string): Promise<string> => {
  const img: HTMLImageElement = new Image();
  img.crossOrigin = 'use-credentials';
  img.src = url;
  await new Promise(rslv => img.addEventListener('load', rslv));
  const canvas = document.createElement('canvas');
  canvas.width  = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const mimeType = url.split('.').pop(); 
  return canvas.toDataURL(`image/${mimeType}`, 1);
}