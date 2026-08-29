// Max distinct keys retained at once. Existing callers each use a small,
// fixed set of keys (one per asset/block/etc.), so this bound is only ever
// exercised by a caller keying entries per (account, cursor, size) -- e.g.
// api-lite's fuel-core page cache -- which would otherwise grow unbounded
// for the life of the process (get() only hides expired values on read, it
// never removes them).
const MAX_ENTRIES = 1000;

type Entry = { date: Date; expiresIn: number; value: any };

export default class DataCache {
  // Map preserves insertion order, so re-inserting a key on every access
  // keeps it last -- the head of iteration order is always the least
  // recently used entry, which is what gets evicted once size > MAX_ENTRIES.
  private cache: Map<string, Entry> = new Map();
  static instance: DataCache;

  private constructor() {}

  save(type: string, expiresIn: number, value: any) {
    this.cache.delete(type);
    this.cache.set(type, { date: new Date(), expiresIn, value });
    while (this.cache.size > MAX_ENTRIES) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey === undefined) break;
      this.cache.delete(oldestKey);
    }
  }

  get(type: string) {
    const data = this.cache.get(type);
    if (!data) {
      return;
    }
    const currentDate = new Date();
    const diff = currentDate.getTime() - data.date.getTime();
    if (diff > data.expiresIn) {
      this.cache.delete(type);
      return;
    }
    this.cache.delete(type);
    this.cache.set(type, data);
    return data.value;
  }

  static getInstance() {
    if (!DataCache.instance) {
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }
}
