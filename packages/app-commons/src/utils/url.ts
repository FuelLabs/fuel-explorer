const DELIMITER_PATH = '/';
const trimRegex = /^\/|\/$/g;
const trimPath = (path = '') => path.replace(trimRegex, '');

// Helper function to safely access environment variables
const getEnvVar = (key: string): string | undefined => {
  // In browser environment with Vite, use import.meta.env
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const env = import.meta.env as unknown as Record<
      string,
      string | undefined
    >;
    return env[key];
  }
  // In Node.js environment, use process.env via globalThis
  const nodeProcess = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;
  if (nodeProcess?.env) {
    return nodeProcess.env[key];
  }
  return undefined;
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

function ensureLeadingSlash(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

export function relativeUrl(path: string) {
  const basePath = getEnvVar('VITE_BASE_PATH') ?? getEnvVar('BASE_PATH');

  return ensureLeadingSlash(urlJoin(basePath, path));
}

export function parseUrl(url: string) {
  return url.replace(/http(s?):\/\//, '');
}
