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
  } catch {}
}

export function isCommitPinnedUrl(url: string) {
  return /\/[0-9a-f]{40}\//.test(url);
}
