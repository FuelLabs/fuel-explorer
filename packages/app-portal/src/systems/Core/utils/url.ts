export const removeTrailingSlash = (url: string) => {
  return url.replace(/\/+$/, '');
};

export const getUrlHostName = (url: string) => {
  try {
    return new URL(url || 'https://#').hostname;
  } catch (e) {
    return '';
  }
};
