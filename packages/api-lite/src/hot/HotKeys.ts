import Database from 'better-sqlite3';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS hot_keys(kind TEXT NOT NULL, key TEXT NOT NULL, hits REAL NOT NULL, last_seen INTEGER NOT NULL, PRIMARY KEY(kind, key));
CREATE INDEX IF NOT EXISTS hot_keys_kind_hits ON hot_keys(kind, hits DESC);
CREATE TABLE IF NOT EXISTS hot_meta(key TEXT PRIMARY KEY, value TEXT NOT NULL);
`;

export type HotKind = 'account' | 'tx' | 'block';

export type HotKeysOpts = {
  // Injectable clock for decay()'s 24h gate; defaults to Date.now.
  now?: () => number;
};

const FLUSH_INTERVAL_MS = 5_000;
const DECAY_PRUNE_THRESHOLD = 0.5;
const DECAY_INTERVAL_MS = 24 * 60 * 60 * 1000;
const LAST_DECAY_META_KEY = 'last_decay';

export class HotKeys {
  private readonly db: Database.Database;
  private readonly now: () => number;
  // kind -> key -> pending hit count since the last flush.
  private readonly buffer = new Map<HotKind, Map<string, number>>();
  private readonly timer: NodeJS.Timeout;
  private readonly stmts: {
    upsert: Database.Statement;
    get: Database.Statement;
    top: Database.Statement;
    count: Database.Statement;
    decayHalf: Database.Statement;
    decayPrune: Database.Statement;
    metaGet: Database.Statement;
    metaSet: Database.Statement;
  };

  constructor(path: string, opts: HotKeysOpts = {}) {
    this.now = opts.now ?? Date.now;
    this.db = new Database(path);
    if (path !== ':memory:') {
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('synchronous = NORMAL');
    }
    // index.db is shared with Index/L1Index's own connections; a busy_timeout
    // keeps a concurrent write waiting instead of failing with SQLITE_BUSY.
    this.db.pragma('busy_timeout = 5000');
    this.db.exec(SCHEMA);
    this.stmts = {
      upsert: this.db.prepare(
        `INSERT INTO hot_keys(kind, key, hits, last_seen) VALUES (@kind, @key, @hits, @lastSeen)
         ON CONFLICT(kind, key) DO UPDATE SET hits = hits + excluded.hits, last_seen = excluded.last_seen`,
      ),
      get: this.db.prepare(
        'SELECT hits FROM hot_keys WHERE kind = ? AND key = ?',
      ),
      top: this.db.prepare(
        'SELECT key, hits FROM hot_keys WHERE kind = ? ORDER BY hits DESC LIMIT ?',
      ),
      count: this.db.prepare(
        'SELECT COUNT(*) AS c FROM hot_keys WHERE kind = ?',
      ),
      decayHalf: this.db.prepare('UPDATE hot_keys SET hits = hits / 2'),
      decayPrune: this.db.prepare(
        `DELETE FROM hot_keys WHERE hits < ${DECAY_PRUNE_THRESHOLD}`,
      ),
      metaGet: this.db.prepare('SELECT value FROM hot_meta WHERE key = ?'),
      metaSet: this.db.prepare(
        'INSERT INTO hot_meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
      ),
    };
    this.timer = setInterval(() => this.flush(), FLUSH_INTERVAL_MS);
    this.timer.unref?.();
  }

  /** Records one hit for `kind`/`key`, buffered in memory until the next flush(). */
  hit(kind: HotKind, key: string): void {
    let byKey = this.buffer.get(kind);
    if (!byKey) {
      byKey = new Map();
      this.buffer.set(kind, byKey);
    }
    byKey.set(key, (byKey.get(key) ?? 0) + 1);
  }

  /**
   * Writes all buffered hits in one transaction. Runs off a 5s background
   * timer (and once more from close()); a caller on a request path never
   * awaits this, so an sqlite error here must never throw back into it —
   * it's logged and the buffered hits for this round are dropped.
   */
  flush(): void {
    if (this.buffer.size === 0) return;
    const entries: { kind: HotKind; key: string; hits: number }[] = [];
    for (const [kind, byKey] of this.buffer) {
      for (const [key, hits] of byKey) entries.push({ kind, key, hits });
    }
    this.buffer.clear();
    try {
      const lastSeen = Date.now();
      const run = this.db.transaction(() => {
        for (const e of entries) {
          this.stmts.upsert.run({ ...e, lastSeen });
        }
      });
      run();
    } catch (e) {
      console.error(
        'HotKeys.flush: sqlite write failed, dropping buffered hits',
        e,
      );
    }
  }

  /** Persisted hit count for `kind`/`key` (buffered-but-not-yet-flushed hits are not included). */
  hits(kind: HotKind, key: string): number {
    const row = this.stmts.get.get(kind, key) as { hits: number } | undefined;
    return row?.hits ?? 0;
  }

  /** The `n` persisted keys of `kind` with the most hits, highest first. */
  top(kind: HotKind, n: number): { key: string; hits: number }[] {
    return this.stmts.top.all(kind, n) as { key: string; hits: number }[];
  }

  /** Number of distinct keys currently tracked per kind (for /health). */
  counts(): { accounts: number; txs: number; blocks: number } {
    const c = (kind: HotKind) =>
      (this.stmts.count.get(kind) as { c: number }).c;
    return { accounts: c('account'), txs: c('tx'), blocks: c('block') };
  }

  /**
   * Halves every hit count and drops rows that decayed below significance,
   * but only once per 24h of wall time: `last_decay` is persisted in
   * `hot_meta` so this stays gated across restarts even though the caller
   * (main.ts) ticks it hourly. The very first call ever (no `last_decay`
   * row yet) does not halve anything -- it just plants the anchor so the
   * first real decay happens a full 24h after HotKeys started observing hits.
   */
  decay(): void {
    const now = this.now();
    const row = this.stmts.metaGet.get(LAST_DECAY_META_KEY) as
      | { value: string }
      | undefined;
    if (!row) {
      this.stmts.metaSet.run(LAST_DECAY_META_KEY, String(now));
      return;
    }
    const last = Number(row.value);
    if (now - last < DECAY_INTERVAL_MS) return;
    const run = this.db.transaction(() => {
      this.stmts.decayHalf.run();
      this.stmts.decayPrune.run();
      this.stmts.metaSet.run(LAST_DECAY_META_KEY, String(now));
    });
    run();
  }

  close(): void {
    clearInterval(this.timer);
    this.flush();
    this.db.close();
  }
}
