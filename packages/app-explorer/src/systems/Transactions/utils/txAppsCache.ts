import { ECOSYSTEM_PROJECTS_URL } from 'app-commons';

// Only what the chip draws. A transaction's contracts never change, so an
// entry stays valid until the pinned projects list changes.
export type TxApp = { name: string; image?: string };

function createAppsCache(prefix: string, maxEntries: number) {
  const key = prefix + (ECOSYSTEM_PROJECTS_URL ?? '');
  let entries: Map<string, TxApp[]> | null = null;

  function load() {
    if (entries) return entries;
    entries = new Map();
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const stored = localStorage.key(i);
        if (stored?.startsWith(prefix) && stored !== key) {
          localStorage.removeItem(stored);
        }
      }
      const raw = localStorage.getItem(key);
      if (raw) entries = new Map(JSON.parse(raw) as [string, TxApp[]][]);
    } catch {}
    return entries;
  }

  function read(ids: string[]) {
    const cache = load();
    const hits: Record<string, TxApp[]> = {};
    const misses: string[] = [];
    for (const id of ids) {
      const apps = cache.get(id);
      if (apps) hits[id] = apps;
      else misses.push(id);
    }
    return { hits, misses };
  }

  function write(found: Record<string, TxApp[]>) {
    const cache = load();
    for (const [id, apps] of Object.entries(found)) {
      cache.delete(id);
      cache.set(id, apps);
    }
    // Map keeps insertion order, so the oldest entries go first.
    for (const id of cache.keys()) {
      if (cache.size <= maxEntries) break;
      cache.delete(id);
    }
    try {
      localStorage.setItem(key, JSON.stringify([...cache]));
    } catch {}
  }

  return { read, write };
}

const txApps = createAppsCache('fuel-explorer:tx-apps:v1:', 2000);
export const readTxApps = txApps.read;
export const writeTxApps = txApps.write;

// A block's contracts never change either. The panel only keeps the newest
// few, so the cap is the recent window plus a short overlap across refreshes.
const blockApps = createAppsCache('fuel-explorer:block-apps:v1:', 200);
export const readBlockApps = blockApps.read;
export const writeBlockApps = blockApps.write;
