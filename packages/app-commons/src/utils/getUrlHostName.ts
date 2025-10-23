export const getUrlHostName = (url: string) => {
  try {
    const { hostname } = new URL(url || 'https://#');
    if (hostname.startsWith('www.')) {
      return hostname.replace('www.', '');
    }

    return hostname;
  } catch (_e) {
    return '';
  }
};
