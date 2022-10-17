/**
 * Get the Mime type from the URL.
 */
export default (url: string): string|null => {
  if (url.indexOf('.') === -1)
    return null;
  const ext = url.split('.').pop()?.toLocaleLowerCase();
  return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
}