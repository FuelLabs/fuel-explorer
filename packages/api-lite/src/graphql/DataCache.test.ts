import DataCache from '~/infra/cache/DataCache';

// api-lite's transactions resolver keys one DataCache entry per
// (owner, direction, size, cursor) fuel-core page it fetches -- an unbounded
// key space over the process lifetime, unlike the rest of this shared
// cache's callers, which each use a small fixed set of keys. DataCache only
// hides an expired value on read; it never removes anything on its own, so
// without a cap the distinct-key count (and memory) grows forever.
describe('DataCache', () => {
  const MAX_ENTRIES = 1000;

  beforeEach(() => {
    // DataCache is a private-constructor singleton with no reset method;
    // clearing the static instance isolates each test's key space.
    (DataCache as unknown as { instance: DataCache | undefined }).instance =
      undefined;
  });

  it('bounds the number of live entries: saving past the cap evicts the least-recently-used key instead of growing forever', () => {
    const cache = DataCache.getInstance();
    for (let i = 0; i < MAX_ENTRIES; i++) {
      cache.save(`fcPage:acct:${i}`, 60_000, { page: i });
    }
    cache.save('fcPage:acct:overflow', 60_000, { page: 'overflow' });

    // Key 0 was the least recently used and must be evicted, not just left
    // to accumulate alongside everything else.
    expect(cache.get('fcPage:acct:0')).toBeUndefined();
    expect(cache.get('fcPage:acct:overflow')).toEqual({ page: 'overflow' });
    expect(cache.get('fcPage:acct:1')).toEqual({ page: 1 });
  });

  it('reading a key refreshes its recency, so a hot key outlives an untouched one across evictions', () => {
    const cache = DataCache.getInstance();
    cache.save('lru:hot', 60_000, 'hot');
    for (let i = 0; i < MAX_ENTRIES - 1; i++) {
      cache.save(`lru:filler:${i}`, 60_000, i);
    }
    // Touch the hot key so it's no longer the least-recently-used entry.
    cache.get('lru:hot');
    // One more insert evicts the actual LRU entry (filler:0), not the
    // just-touched hot key.
    cache.save('lru:new', 60_000, 'new');
    expect(cache.get('lru:hot')).toBe('hot');
    expect(cache.get('lru:filler:0')).toBeUndefined();
  });

  it('still expires a value by TTL regardless of the bound (unchanged behavior)', () => {
    const cache = DataCache.getInstance();
    cache.save('ttl:key', -1, 'stale');
    expect(cache.get('ttl:key')).toBeUndefined();
  });
});
