import Database from 'better-sqlite3';
import { concat, hash } from 'fuels';
import type {
  GQLBlock,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import { logSlowStatements } from '../sqlite/logSlowStatements';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS blocks(height INTEGER PRIMARY KEY, block_hash BLOB NOT NULL UNIQUE, time INTEGER NOT NULL, tx_count INTEGER NOT NULL, gas_used INTEGER NOT NULL DEFAULT 0, total_fee INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS blocks_time ON blocks(time);
CREATE TABLE IF NOT EXISTS predicates(address BLOB PRIMARY KEY, bytecode BLOB NOT NULL) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS assets(asset_id BLOB PRIMARY KEY, contract_id BLOB NOT NULL, sub_id BLOB NOT NULL, height INTEGER NOT NULL) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS assets_contract ON assets(contract_id, height DESC);
CREATE TABLE IF NOT EXISTS contracts(contract_id BLOB PRIMARY KEY, height INTEGER NOT NULL) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS contracts_height ON contracts(height DESC);
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT NOT NULL);
`;

// txs and tx_accounts live in one table pair per DEFAULT_BUCKET_BLOCKS heights
// (about a day on mainnet), so retention drops whole tables instead of
// deleting rows out of the account-ordered tx_accounts primary key, which
// touches random pages across the whole table.
const DEFAULT_BUCKET_BLOCKS = 86_400;
const LEGACY_RANGE_KEY = 'legacy_tx_range';

type Partition = {
  txs: string;
  accounts: string;
  start: number;
  end: number;
  legacy: boolean;
};

type PartitionStmts = {
  tx: Database.Statement;
  acct: Database.Statement;
  heightForTx: Database.Statement;
  acctExists: Database.Statement;
  acctCount: Database.Statement;
  acctNewerCount: Database.Statement;
  acctDesc: Database.Statement;
  acctBefore: Database.Statement;
  acctAfter: Database.Statement;
  txCount: Database.Statement;
  txNewerCount: Database.Statement;
  txAbove: Database.Statement;
  deleteTxAbove: Database.Statement;
  deleteAcctAbove: Database.Statement;
};

const blob = (hex: string) => Buffer.from(hex.replace(/^0x/, ''), 'hex');
const hexOf = (b: Buffer) => `0x${b.toString('hex')}`;

export function txCursor(height: number, txIndex: number): string {
  return `${String(height).padStart(32, '0')}-${String(txIndex + 1).padStart(16, '0')}`;
}
export function parseTxCursor(cursor: string): {
  height: number;
  txIndex: number;
} {
  const [h, i] = cursor.split('-');
  return { height: Number(h), txIndex: Number(i) - 1 };
}

export type SeriesRow = {
  bucketStart: number /* unix s */;
  txCount: number;
  blocks: number;
  gasUsed: string;
  totalFee: string;
  maxTxCount: number;
  maxGasUsed: number;
};

export function accountsOf(tx: GQLTransaction): string[] {
  const set = new Set<string>();
  for (const input of (tx.inputs ?? []) as any[]) {
    if (input.__typename === 'InputCoin' && input.owner) set.add(input.owner);
    if (input.__typename === 'InputMessage') {
      if (input.sender) set.add(input.sender);
      if (input.recipient) set.add(input.recipient);
    }
    if (input.__typename === 'InputContract' && input.contractId)
      set.add(input.contractId);
  }
  for (const output of (tx.outputs ?? []) as any[]) {
    if (output.to) set.add(output.to);
    if (output.__typename === 'ContractCreated' && output.contract)
      set.add(output.contract);
  }
  return [...set];
}

export class Index {
  private readonly db: Database.Database;
  private readonly path: string;
  private readonly stmts;
  private readonly bucketBlocks: number;
  // Newest first (by `end`), the order account history is read in.
  private partitions: Partition[] = [];
  private readonly partitionStmts = new Map<string, PartitionStmts>();

  constructor(path: string, opts: { bucketBlocks?: number } = {}) {
    this.path = path;
    this.bucketBlocks = opts.bucketBlocks ?? DEFAULT_BUCKET_BLOCKS;
    this.db = new Database(path);
    logSlowStatements(this.db, 'index');
    if (path !== ':memory:') {
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('synchronous = NORMAL');
      this.db.pragma('auto_vacuum = INCREMENTAL');
    }
    // Index writes to the same index.db file from up to three connections
    // (Index, L1Index, and CosmosIndex); WAL allows one writer at a time, so
    // a busy_timeout keeps a concurrent write waiting instead of failing
    // immediately with SQLITE_BUSY.
    this.db.pragma('busy_timeout = 5000');
    this.db.exec(SCHEMA);
    for (const stmt of [
      'ALTER TABLE blocks ADD COLUMN gas_used INTEGER NOT NULL DEFAULT 0',
      'ALTER TABLE blocks ADD COLUMN total_fee INTEGER NOT NULL DEFAULT 0',
    ]) {
      try {
        this.db.exec(stmt);
      } catch {
        /* column already exists */
      }
    }
    if (path !== ':memory:') {
      this.db.exec(
        'UPDATE blocks SET time = time - 4611686018427387914 WHERE time > 4000000000000000000',
      );
    }
    this.stmts = {
      block: this.db.prepare(
        'INSERT OR IGNORE INTO blocks(height, block_hash, time, tx_count, gas_used, total_fee) VALUES (?, ?, ?, ?, ?, ?)',
      ),
      pred: this.db.prepare(
        'INSERT OR IGNORE INTO predicates(address, bytecode) VALUES (?, ?)',
      ),
      asset: this.db.prepare(
        'INSERT OR IGNORE INTO assets(asset_id, contract_id, sub_id, height) VALUES (?, ?, ?, ?)',
      ),
      contract: this.db.prepare(
        'INSERT OR IGNORE INTO contracts(contract_id, height) VALUES (?, ?)',
      ),
      heightForBlock: this.db.prepare(
        'SELECT height FROM blocks WHERE block_hash = ?',
      ),
      predicate: this.db.prepare(
        'SELECT bytecode FROM predicates WHERE address = ?',
      ),
      contractGet: this.db.prepare(
        'SELECT height FROM contracts WHERE contract_id = ?',
      ),
      contractsList: this.db.prepare(
        'SELECT contract_id, height FROM contracts WHERE height < ? ORDER BY height DESC LIMIT ?',
      ),
      assetsByContract: this.db.prepare(
        'SELECT asset_id, sub_id, height FROM assets WHERE contract_id = ? ORDER BY height DESC, asset_id DESC LIMIT ?',
      ),
      assetCountByContract: this.db.prepare(
        'SELECT count(*) AS c FROM assets WHERE contract_id = ?',
      ),
      assetGet: this.db.prepare(
        'SELECT contract_id, sub_id FROM assets WHERE asset_id = ?',
      ),
      assetSeed: this.db.prepare(
        'INSERT OR IGNORE INTO assets(asset_id, contract_id, sub_id, height) VALUES (?, ?, ?, 0)',
      ),
      metaGet: this.db.prepare('SELECT value FROM meta WHERE key = ?'),
      metaSet: this.db.prepare(
        'INSERT INTO meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
      ),
      metaDel: this.db.prepare('DELETE FROM meta WHERE key = ?'),
      series: this.db.prepare(
        'SELECT CAST(time / @bucket AS INTEGER) * CAST(@bucket AS INTEGER) AS b, SUM(tx_count) AS tx, COUNT(*) AS n, SUM(gas_used) AS g, SUM(total_fee) AS f, MAX(tx_count) AS mtx, MAX(gas_used) AS mg FROM blocks WHERE time >= @since GROUP BY b ORDER BY b',
      ),
      oldestTime: this.db.prepare('SELECT MIN(time) AS t FROM blocks'),
    };
    this.loadPartitions();
  }

  private tableExists(name: string): boolean {
    return (
      this.db
        .prepare(
          "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?",
        )
        .get(name) != null
    );
  }

  // A database written before partitioning still has the single `txs` and
  // `tx_accounts` tables. They are served as one partition covering the
  // height range they held when first opened by this code, and dropped like
  // any other partition once that range ages out. Blocks inside that range
  // keep writing to it so a height never lands in two partitions.
  private loadPartitions(): void {
    const parts: Partition[] = [];
    if (this.tableExists('txs')) {
      let range = this.getMeta(LEGACY_RANGE_KEY);
      if (range == null) {
        // One aggregate per statement: SQLite only takes the min/max
        // shortcut on the primary key when the query has a single aggregate.
        const lo = (
          this.db.prepare('SELECT MIN(height) AS h FROM txs').get() as {
            h: number | null;
          }
        ).h;
        const hi = (
          this.db.prepare('SELECT MAX(height) AS h FROM txs').get() as {
            h: number | null;
          }
        ).h;
        if (lo == null || hi == null) {
          this.db.exec('DROP TABLE txs; DROP TABLE tx_accounts');
        } else {
          range = `${lo},${hi}`;
          this.setMeta(LEGACY_RANGE_KEY, range);
        }
      }
      if (range != null) {
        const [lo, hi] = range.split(',').map(Number);
        parts.push({
          txs: 'txs',
          accounts: 'tx_accounts',
          start: lo,
          end: hi,
          legacy: true,
        });
      }
    }
    const names = this.db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name LIKE 'txs_p%'",
      )
      .all() as { name: string }[];
    for (const { name } of names) {
      const bucket = Number(name.slice('txs_p'.length));
      if (Number.isInteger(bucket)) parts.push(this.bucketPartition(bucket));
    }
    this.partitions = parts.sort((a, b) => b.end - a.end);
  }

  private bucketPartition(bucket: number): Partition {
    return {
      txs: `txs_p${bucket}`,
      accounts: `tx_accounts_p${bucket}`,
      start: bucket * this.bucketBlocks,
      end: (bucket + 1) * this.bucketBlocks - 1,
      legacy: false,
    };
  }

  private partitionFor(height: number): Partition {
    const legacy = this.partitions.find(
      (p) => p.legacy && height >= p.start && height <= p.end,
    );
    if (legacy) return legacy;
    const bucket = Math.floor(height / this.bucketBlocks);
    const existing = this.partitions.find(
      (p) => !p.legacy && p.txs === `txs_p${bucket}`,
    );
    if (existing) return existing;
    const p = this.bucketPartition(bucket);
    this.db.exec(
      `CREATE TABLE IF NOT EXISTS ${p.txs}(height INTEGER NOT NULL, tx_index INTEGER NOT NULL, tx_hash BLOB NOT NULL, PRIMARY KEY(height, tx_index)) WITHOUT ROWID;
       CREATE INDEX IF NOT EXISTS ${p.txs}_hash ON ${p.txs}(tx_hash);
       CREATE TABLE IF NOT EXISTS ${p.accounts}(account BLOB NOT NULL, height INTEGER NOT NULL, tx_index INTEGER NOT NULL, PRIMARY KEY(account, height DESC, tx_index DESC)) WITHOUT ROWID;`,
    );
    this.partitions = [...this.partitions, p].sort((a, b) => b.end - a.end);
    return p;
  }

  private stmtsFor(p: Partition): PartitionStmts {
    let s = this.partitionStmts.get(p.txs);
    if (s) return s;
    const q = (sql: string) => this.db.prepare(sql);
    s = {
      tx: q(
        `INSERT OR IGNORE INTO ${p.txs}(height, tx_index, tx_hash) VALUES (?, ?, ?)`,
      ),
      acct: q(
        `INSERT OR IGNORE INTO ${p.accounts}(account, height, tx_index) VALUES (?, ?, ?)`,
      ),
      heightForTx: q(
        `SELECT height, tx_index FROM ${p.txs} WHERE tx_hash = ? LIMIT 1`,
      ),
      acctExists: q(`SELECT 1 FROM ${p.accounts} WHERE account = ? LIMIT 1`),
      acctCount: q(
        `SELECT count(*) AS c FROM (SELECT 1 FROM ${p.accounts} WHERE account = ? LIMIT ?)`,
      ),
      acctNewerCount: q(
        `SELECT count(*) AS c FROM (SELECT 1 FROM ${p.accounts} WHERE account = ? AND height >= ? AND (height > ? OR tx_index > ?) LIMIT ?)`,
      ),
      acctDesc: q(
        `SELECT height, tx_index FROM ${p.accounts} WHERE account = ? ORDER BY height DESC, tx_index DESC LIMIT ?`,
      ),
      acctBefore: q(
        `SELECT height, tx_index FROM ${p.accounts} WHERE account = ? AND height <= ? AND (height < ? OR tx_index < ?) ORDER BY height DESC, tx_index DESC LIMIT ?`,
      ),
      acctAfter: q(
        `SELECT height, tx_index FROM ${p.accounts} WHERE account = ? AND height >= ? AND (height > ? OR tx_index > ?) ORDER BY height ASC, tx_index ASC LIMIT ?`,
      ),
      txCount: q(
        `SELECT count(*) AS c FROM (SELECT 1 FROM ${p.txs} WHERE height >= ? AND height <= ? LIMIT ?)`,
      ),
      txNewerCount: q(
        `SELECT count(*) AS c FROM (SELECT 1 FROM ${p.txs} WHERE height >= ? AND height <= ? AND (height > ? OR tx_index > ?) LIMIT ?)`,
      ),
      txAbove: q(`SELECT 1 FROM ${p.txs} WHERE height > ? LIMIT 1`),
      deleteTxAbove: q(`DELETE FROM ${p.txs} WHERE height > ?`),
      deleteAcctAbove: q(`DELETE FROM ${p.accounts} WHERE height > ?`),
    };
    this.partitionStmts.set(p.txs, s);
    return s;
  }

  partitionRanges(): { start: number; end: number }[] {
    return this.partitions.map(({ start, end }) => ({ start, end }));
  }

  oldestPartitionEnd(): number | null {
    const oldest = this.partitions[this.partitions.length - 1];
    return oldest ? oldest.end : null;
  }

  // Drops every partition whose heights all lie below `floor`. Freed pages
  // stay on the freelist for the next partition's inserts, so the file does
  // not shrink and no vacuum runs.
  dropExpiredPartitions(floor: number): number {
    const expired = this.partitions.filter((p) => p.end < floor);
    for (const p of expired) {
      this.db.transaction(() => {
        this.db.exec(`DROP TABLE ${p.txs}; DROP TABLE ${p.accounts}`);
        if (p.legacy) this.stmts.metaDel.run(LEGACY_RANGE_KEY);
      })();
      this.partitionStmts.delete(p.txs);
    }
    this.partitions = this.partitions.filter((p) => p.end >= floor);
    return expired.length;
  }

  writeBlock(block: GQLBlock): void {
    const height = Number(block.height);
    const time = Number(
      BigInt((block.header as any).time) - ((1n << 62n) + 10n),
    );
    let gasUsed = 0n;
    let totalFee = 0n;
    for (const tx of block.transactions) {
      const status = tx.status as any;
      if (status?.totalGas != null) gasUsed += BigInt(status.totalGas);
      if (status?.totalFee != null) totalFee += BigInt(status.totalFee);
    }
    const run = this.db.transaction(() => {
      const part = this.stmtsFor(this.partitionFor(height));
      this.stmts.block.run(
        height,
        blob(block.id),
        time,
        block.transactions.length,
        Number(gasUsed),
        Number(totalFee),
      );
      block.transactions.forEach((tx, i) => {
        part.tx.run(height, i, blob(tx.id));
        for (const a of accountsOf(tx)) part.acct.run(blob(a), height, i);
        for (const input of (tx.inputs ?? []) as any[]) {
          if (
            input.__typename === 'InputCoin' &&
            input.predicate &&
            input.predicate !== '0x'
          )
            this.stmts.pred.run(blob(input.owner), blob(input.predicate));
        }
        for (const output of (tx.outputs ?? []) as any[]) {
          if (output.__typename === 'ContractCreated')
            this.stmts.contract.run(blob(output.contract), height);
        }
        const receipts = ((tx.status as any)?.receipts ?? []) as any[];
        for (const r of receipts) {
          if (r.receiptType === 'MINT' && r.id && r.subId) {
            const assetId = hash(concat([r.id, r.subId]));
            this.stmts.asset.run(
              blob(assetId),
              blob(r.id),
              blob(r.subId),
              height,
            );
          }
        }
      });
    });
    run();
  }

  heightForTx(hashHex: string) {
    const h = blob(hashHex);
    for (const p of this.partitions) {
      const row = this.stmtsFor(p).heightForTx.get(h) as
        | { height: number; tx_index: number }
        | undefined;
      if (row) return { height: row.height, txIndex: row.tx_index };
    }
    return null;
  }
  heightForBlock(hashHex: string) {
    const row = this.stmts.heightForBlock.get(blob(hashHex)) as
      | { height: number }
      | undefined;
    return row ? row.height : null;
  }
  accountExists(account: string) {
    const a = blob(account);
    return this.partitions.some((p) => this.stmtsFor(p).acctExists.get(a));
  }
  countForAccount(account: string, cap: number) {
    const a = blob(account);
    let n = 0;
    for (const p of this.partitions) {
      n += (this.stmtsFor(p).acctCount.get(a, cap - n) as { c: number }).c;
      if (n >= cap) break;
    }
    return n;
  }

  txsForAccount(
    account: string,
    opts: { before?: string; after?: string; limit: number },
  ) {
    const a = blob(account);
    const out: { height: number; tx_index: number }[] = [];
    const remaining = () => opts.limit - out.length;
    if (opts.after) {
      const c = parseTxCursor(opts.after);
      for (const p of [...this.partitions].reverse()) {
        if (p.end < c.height) continue;
        out.push(
          ...(this.stmtsFor(p).acctAfter.all(
            a,
            c.height,
            c.height,
            c.txIndex,
            remaining(),
          ) as typeof out),
        );
        if (remaining() <= 0) break;
      }
      out.reverse();
    } else {
      const c = opts.before ? parseTxCursor(opts.before) : null;
      for (const p of this.partitions) {
        if (c && p.start > c.height) continue;
        const s = this.stmtsFor(p);
        out.push(
          ...((c
            ? s.acctBefore.all(a, c.height, c.height, c.txIndex, remaining())
            : s.acctDesc.all(a, remaining())) as typeof out),
        );
        if (remaining() <= 0) break;
      }
    }
    return out.map((r) => ({ height: r.height, txIndex: r.tx_index }));
  }

  predicate(address: string) {
    const row = this.stmts.predicate.get(blob(address)) as
      | { bytecode: Buffer }
      | undefined;
    return row ? hexOf(row.bytecode) : null;
  }
  contract(id: string) {
    const row = this.stmts.contractGet.get(blob(id)) as
      | { height: number }
      | undefined;
    return row ? { height: row.height } : null;
  }
  contracts(opts: { before?: number; limit: number }) {
    return (
      this.stmts.contractsList.all(
        opts.before ?? Number.MAX_SAFE_INTEGER,
        opts.limit,
      ) as { contract_id: Buffer; height: number }[]
    ).map((r) => ({ contractId: hexOf(r.contract_id), height: r.height }));
  }
  assetsByContract(contractId: string, limit = 50) {
    return (
      this.stmts.assetsByContract.all(blob(contractId), limit) as {
        asset_id: Buffer;
        sub_id: Buffer;
        height: number;
      }[]
    ).map((r) => ({
      assetId: hexOf(r.asset_id),
      subId: hexOf(r.sub_id),
      height: r.height,
    }));
  }
  asset(assetId: string) {
    const row = this.stmts.assetGet.get(blob(assetId)) as
      | { contract_id: Buffer; sub_id: Buffer }
      | undefined;
    return row
      ? { contractId: hexOf(row.contract_id), subId: hexOf(row.sub_id) }
      : null;
  }
  countByContract(contractId: string): number {
    return (
      this.stmts.assetCountByContract.get(blob(contractId)) as { c: number }
    ).c;
  }
  // Backfills a known registry asset ahead of ever observing its MINT
  // receipt live, so assetsByContract/asset can serve it from boot. Height 0
  // means a later real mint observation for the same asset_id is ignored
  // (INSERT OR IGNORE keeps this row), which only affects display ordering.
  seedAsset(assetId: string, contractId: string, subId: string): void {
    this.stmts.assetSeed.run(blob(assetId), blob(contractId), blob(subId));
  }

  range() {
    const get = (k: string) => {
      const r = this.stmts.metaGet.get(k) as { value: string } | undefined;
      return r ? Number(r.value) : null;
    };
    return { from: get('indexed_from'), to: get('indexed_to') };
  }
  setRange(from: number, to: number) {
    this.stmts.metaSet.run('indexed_from', String(from));
    this.stmts.metaSet.run('indexed_to', String(to));
  }
  setFrom(from: number): void {
    this.stmts.metaSet.run('indexed_from', String(from));
  }
  clearRange(): void {
    this.stmts.metaDel.run('indexed_from');
    this.stmts.metaDel.run('indexed_to');
  }

  getMeta(key: string): string | null {
    const r = this.stmts.metaGet.get(key) as { value: string } | undefined;
    return r ? r.value : null;
  }
  setMeta(key: string, value: string): void {
    this.stmts.metaSet.run(key, value);
  }

  // Records a height skipped by backfill under the `gaps` meta key as a
  // comma-separated list, so the discontinuity is visible without a schema change.
  recordGap(height: number): void {
    const existing = this.getMeta('gaps');
    const gaps = existing ? existing.split(',') : [];
    gaps.push(String(height));
    this.setMeta('gaps', gaps.join(','));
  }

  // Reads back what recordGap wrote, so a permanently-missing historical
  // block is discoverable (e.g. via /health) instead of sitting invisible in
  // the `gaps` meta row until someone opens the sqlite file by hand.
  gaps(): { count: number; heights: number[] } {
    const existing = this.getMeta('gaps');
    const heights = existing ? existing.split(',').map(Number) : [];
    return { count: heights.length, heights };
  }

  // assets, contracts and predicates are one-row-per-creation tables (tiny
  // even after months of uptime), so they're excluded from the retention
  // window and grow forever from first boot. txs and tx_accounts age out by
  // partition (dropExpiredPartitions), not by row.
  deleteBelow(height: number): number {
    const lo = this.minHeight();
    if (lo == null || lo >= height) return 0;
    return this.deleteRange(lo, height);
  }

  minHeight(): number | null {
    const row = this.db
      .prepare('SELECT MIN(height) AS h FROM blocks')
      .get() as { h: number | null };
    return row.h ?? null;
  }

  // Deletes block rows in [lo, hi) in one short transaction, so a caller can
  // sweep a large window in slices that keep the event loop free between them.
  deleteRange(lo: number, hi: number): number {
    const run = this.db.transaction(() => {
      const n = this.db
        .prepare('DELETE FROM blocks WHERE height >= ? AND height < ?')
        .run(lo, hi).changes;
      const r = this.range();
      if (r.from != null && r.from < hi)
        this.stmts.metaSet.run('indexed_from', String(hi));
      return n;
    });
    return run();
  }

  deleteAboveRange(): number {
    const r = this.range();
    if (r.to == null) return 0;
    const to = r.to;
    const run = this.db.transaction(() => {
      let n = 0;
      for (const t of ['blocks', 'assets'])
        n += this.db
          .prepare(`DELETE FROM ${t} WHERE height > ?`)
          .run(to).changes;
      for (const p of this.partitions) {
        if (p.end <= to) continue;
        const s = this.stmtsFor(p);
        if (!s.txAbove.get(to)) continue;
        n += s.deleteTxAbove.run(to).changes;
        n += s.deleteAcctAbove.run(to).changes;
      }
      return n;
    });
    return run();
  }

  private series(bucketSeconds: number, sinceUnix: number): SeriesRow[] {
    return (
      this.stmts.series.all({ bucket: bucketSeconds, since: sinceUnix }) as {
        b: number;
        tx: number;
        n: number;
        g: number;
        f: number;
        mtx: number;
        mg: number;
      }[]
    ).map((r) => ({
      bucketStart: r.b,
      txCount: r.tx,
      blocks: r.n,
      gasUsed: String(r.g),
      totalFee: String(r.f),
      maxTxCount: r.mtx,
      maxGasUsed: r.mg,
    }));
  }
  hourlySeries(sinceUnix: number): SeriesRow[] {
    return this.series(3600, sinceUnix);
  }
  tenMinuteSeries(sinceUnix: number): SeriesRow[] {
    return this.series(600, sinceUnix);
  }
  minuteSeries(sinceUnix: number): SeriesRow[] {
    return this.series(60, sinceUnix);
  }
  oldestTime(): number | null {
    const row = this.stmts.oldestTime.get() as { t: number | null };
    return row.t ?? null;
  }

  // Bytes in use. Pages freed by dropExpiredPartitions stay in the file for
  // reuse and are not counted.
  fileBytes(): number {
    if (this.path === ':memory:') return 0;
    const page = this.db.pragma('page_size', { simple: true }) as number;
    const count = this.db.pragma('page_count', { simple: true }) as number;
    const free = this.db.pragma('freelist_count', { simple: true }) as number;
    return page * (count - free);
  }

  // Count of an account's transactions strictly newer than `ref`, capped at
  // `cap` for the same reason countForAccount is capped: a busy account's
  // true count is unbounded, and callers only need "at least cap" to know a
  // 1-based position is off the top of a capped total. Combined with
  // countForAccount(account, cap) as `total`, a ref's ascending (oldest = 1)
  // position is `total - newerCountForAccount(...)`.
  newerCountForAccount(
    account: string,
    ref: { height: number; txIndex: number },
    cap: number,
  ): number {
    const a = blob(account);
    let n = 0;
    for (const p of this.partitions) {
      if (p.end < ref.height) continue;
      n += (
        this.stmtsFor(p).acctNewerCount.get(
          a,
          ref.height,
          ref.height,
          ref.txIndex,
          cap - n,
        ) as { c: number }
      ).c;
      if (n >= cap) break;
    }
    return n;
  }

  // Total number of transactions currently in the retention window, and how
  // many of them are strictly newer than `ref`. A page's 1-based ascending
  // (oldest = 1) position is `txCount(cap) - newerTxCount(ref, cap)`. Both
  // are bounded to the indexed_from..indexed_to window so a stale row outside
  // it never counts, and capped like countForAccount so the list can share
  // its 1000+ display convention.
  txCount(cap: number): number {
    const range = this.range();
    const from = range.from ?? Number.MIN_SAFE_INTEGER;
    const to = range.to ?? Number.MAX_SAFE_INTEGER;
    let n = 0;
    for (const p of this.partitions) {
      if (p.end < from || p.start > to) continue;
      n += (this.stmtsFor(p).txCount.get(from, to, cap - n) as { c: number }).c;
      if (n >= cap) break;
    }
    return n;
  }
  newerTxCount(ref: { height: number; txIndex: number }, cap: number): number {
    const range = this.range();
    const lo = Math.max(range.from ?? Number.MIN_SAFE_INTEGER, ref.height);
    const to = range.to ?? Number.MAX_SAFE_INTEGER;
    let n = 0;
    for (const p of this.partitions) {
      if (p.end < lo || p.start > to) continue;
      n += (
        this.stmtsFor(p).txNewerCount.get(
          lo,
          to,
          ref.height,
          ref.txIndex,
          cap - n,
        ) as { c: number }
      ).c;
      if (n >= cap) break;
    }
    return n;
  }

  close() {
    this.db.close();
  }
}
