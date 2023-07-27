/**
 * Fetch as DataURL.
 */
export default async (url: string): Promise<string> => {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`${url} cannot be loaded`);
  const isSvg = /..*\.svg(\?.*)?$/i.test(url);
  if (!isSvg)
    return new Promise<string>(async (rslv, rej) => {
      const reader = new FileReader();
      reader.onload = () => rslv(reader.result as string);
      reader.onerror = () => rej(reader.error);
      reader.readAsDataURL(await res.blob());
    });
  else {
    const base64 = encodeURIComponent(await res.text());
    return `data:image/svg+xml;utf8,${base64}`;
  }
}