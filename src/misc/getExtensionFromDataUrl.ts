/**
  * Get extension from data URL.
  */
export default (dataUrl: string): string|null => {
  const matches = dataUrl.match(/data:\w+\/([\w-+\d.]+)(?=;|,)/);
  if (!matches)
    return null;
  let extension = matches[1].toLowerCase();
  if (extension === 'jpeg')
    extension = 'jpg';
  else if (extension === 'svg+xml')
    extension = 'svg';
  return extension;
}
