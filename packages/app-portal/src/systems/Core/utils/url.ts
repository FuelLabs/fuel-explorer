const DELIMITER_PATH = '/';
const trimRegex = /^\/|\/$/g;
const trimPath = (path = '') => path.replace(trimRegex, '');

export const getUrlHostName = (url: string) => {
  try {
    return new URL(url || 'https://#').hostname;
  } catch (_e) {
    return '';
  }
};

export function urlJoin(
  baseUrl: string | undefined,
  ...paths: Array<string>
): string {
  const hasBaseUrl = baseUrl !== null && baseUrl !== undefined;
  const rootPath = baseUrl?.[0] === '/' && baseUrl.length > 1;
  const allPaths = [baseUrl, ...paths].filter(Boolean).map(trimPath);
  if (rootPath && hasBaseUrl) {
    allPaths.unshift('');
  }
  return allPaths.join(DELIMITER_PATH);
}

export function relativeUrl(path: string) {
  return urlJoin(process.env.BASE_URL, path);
}

export function parseUrl(url: string) {
  return url.replace(/http(s?):\/\//, '');
}
