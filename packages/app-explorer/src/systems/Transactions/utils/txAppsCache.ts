import { ECOSYSTEM_PROJECTS_URL } from 'app-commons';

// Only what the chip draws. A transaction's contracts never change, so an
// entry stays valid until the pinned projects list changes.
export type TxApp = {
  name: string;
  image?: string;
  url?: string;
  /** Transactions in this block that called the app. */
  count?: number;
};

function createAppsCache(family: string, maxEntries: number) {
  const key = `${family}v3:${ECOSYSTEM_PROJECTS_URL ?? ''}`;
  let entries: Map<string, TxApp[]> | null = null;

  function load() {
    if (entries) return entries;
    entries = new Map();
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const stored = localStorage.key(i);
        if (stored?.startsWith(family) && stored !== key) {
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

  function list() {
    return [...load().values()];
  }

  return { read, write, list };
}

const txApps = createAppsCache('fuel-explorer:tx-apps:', 2000);
export const readTxApps = txApps.read;
export const writeTxApps = txApps.write;

// Each block is stored once. Top Apps sums every block saved while the
// homepage has been open, up to this cap (about 20 minutes at a 30s refresh).
const blockApps = createAppsCache('fuel-explorer:block-apps:', 200);
export const readBlockApps = blockApps.read;
export const writeBlockApps = blockApps.write;
export const listBlockApps = blockApps.list;
