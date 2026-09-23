// Small localStorage cache for decoding inputs (projects list, ABIs, account
// checks), so a page refresh decodes without network requests. Storage can
// be full, disabled or cleared at any time; every call falls back to a miss.
const PREFIX = 'fuel-explorer:decode:v1:';

type Entry<T> = { savedAt: number; value: T };

export function readCache<T>(key: string): Entry<T> | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as Entry<T>) : null;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, value: T) {
  try {
    const entry: Entry<T> = { savedAt: Date.now(), value };
    localStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    // Quota or privacy mode: the in-memory caches still work.
  }
}

// A URL pinned to a full git commit never changes, so it can be cached
// without revalidation.
export function isImmutableUrl(url: string) {
  return /\/[0-9a-f]{40}\//.test(url);
}
