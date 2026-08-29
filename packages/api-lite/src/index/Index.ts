import Database from 'better-sqlite3';
import { concat, hash } from 'fuels';
import type {
  GQLBlock,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS blocks(height INTEGER PRIMARY KEY, block_hash BLOB NOT NULL UNIQUE, time INTEGER NOT NULL, tx_count INTEGER NOT NULL, gas_used INTEGER NOT NULL DEFAULT 0, total_fee INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS blocks_time ON blocks(time);
CREATE TABLE IF NOT EXISTS txs(height INTEGER NOT NULL, tx_index INTEGER NOT NULL, tx_hash BLOB NOT NULL, PRIMARY KEY(height, tx_index)) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS txs_hash ON txs(tx_hash);
CREATE TABLE IF NOT EXISTS tx_accounts(account BLOB NOT NULL, height INTEGER NOT NULL, tx_index INTEGER NOT NULL, PRIMARY KEY(account, height DESC, tx_index DESC)) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS tx_accounts_height ON tx_accounts(height);
CREATE TABLE IF NOT EXISTS predicates(address BLOB PRIMARY KEY, bytecode BLOB NOT NULL) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS assets(asset_id BLOB PRIMARY KEY, contract_id BLOB NOT NULL, sub_id BLOB NOT NULL, height INTEGER NOT NULL) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS assets_contract ON assets(contract_id, height DESC);
CREATE TABLE IF NOT EXISTS contracts(contract_id BLOB PRIMARY KEY, height INTEGER NOT NULL) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS contracts_height ON contracts(height DESC);
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT NOT NULL);
`;

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

  constructor(path: string) {
    this.path = path;
    this.db = new Database(path);
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
      tx: this.db.prepare(
        'INSERT OR IGNORE INTO txs(height, tx_index, tx_hash) VALUES (?, ?, ?)',
      ),
      acct: this.db.prepare(
        'INSERT OR IGNORE INTO tx_accounts(account, height, tx_index) VALUES (?, ?, ?)',
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
      heightForTx: this.db.prepare(
        'SELECT height, tx_index FROM txs WHERE tx_hash = ? LIMIT 1',
      ),
      heightForBlock: this.db.prepare(
        'SELECT height FROM blocks WHERE block_hash = ?',
      ),
      acctExists: this.db.prepare(
        'SELECT 1 FROM tx_accounts WHERE account = ? LIMIT 1',
      ),
      acctCount: this.db.prepare(
        'SELECT count(*) AS c FROM (SELECT 1 FROM tx_accounts WHERE account = ? LIMIT ?)',
      ),
      acctNewerCount: this.db.prepare(
        'SELECT count(*) AS c FROM (SELECT 1 FROM tx_accounts WHERE account = ? AND (height > ? OR (height = ? AND tx_index > ?)) LIMIT ?)',
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
      this.stmts.block.run(
        height,
        blob(block.id),
        time,
        block.transactions.length,
        Number(gasUsed),
        Number(totalFee),
      );
      block.transactions.forEach((tx, i) => {
        this.stmts.tx.run(height, i, blob(tx.id));
        for (const a of accountsOf(tx)) this.stmts.acct.run(blob(a), height, i);
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
    const row = this.stmts.heightForTx.get(blob(hashHex)) as
      | { height: number; tx_index: number }
      | undefined;
    return row ? { height: row.height, txIndex: row.tx_index } : null;
  }
  heightForBlock(hashHex: string) {
    const row = this.stmts.heightForBlock.get(blob(hashHex)) as
      | { height: number }
      | undefined;
    return row ? row.height : null;
  }
  accountExists(account: string) {
    return this.stmts.acctExists.get(blob(account)) != null;
  }
  countForAccount(account: string, cap: number) {
    return (this.stmts.acctCount.get(blob(account), cap) as { c: number }).c;
  }

  txsForAccount(
    account: string,
    opts: { before?: string; after?: string; limit: number },
  ) {
    if (opts.after) {
      const c = parseTxCursor(opts.after);
      const rows = this.db
        .prepare(
          'SELECT height, tx_index FROM tx_accounts WHERE account = ? AND (height > ? OR (height = ? AND tx_index > ?)) ORDER BY height ASC, tx_index ASC LIMIT ?',
        )
        .all(blob(account), c.height, c.height, c.txIndex, opts.limit) as {
        height: number;
        tx_index: number;
      }[];
      return rows
        .reverse()
        .map((r) => ({ height: r.height, txIndex: r.tx_index }));
    }
    let sql = 'SELECT height, tx_index FROM tx_accounts WHERE account = ?';
    const args: unknown[] = [blob(account)];
    if (opts.before) {
      const c = parseTxCursor(opts.before);
      sql += ' AND (height < ? OR (height = ? AND tx_index < ?))';
      args.push(c.height, c.height, c.txIndex);
    }
    sql += ' ORDER BY height DESC, tx_index DESC LIMIT ?';
    args.push(opts.limit);
    return (
      this.db.prepare(sql).all(...args) as {
        height: number;
        tx_index: number;
      }[]
    ).map((r) => ({ height: r.height, txIndex: r.tx_index }));
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

  // assets, contracts and predicates are one-row-per-creation tables (tiny
  // even after months of uptime), so they're excluded from the retention
  // window and grow forever from first boot instead of aging out with the
  // 48h-ish blocks/txs/tx_accounts window.
  deleteBelow(height: number): number {
    const run = this.db.transaction(() => {
      let n = 0;
      for (const t of ['blocks', 'txs', 'tx_accounts'])
        n += this.db
          .prepare(`DELETE FROM ${t} WHERE height < ?`)
          .run(height).changes;
      const r = this.range();
      if (r.from != null && r.from < height)
        this.stmts.metaSet.run('indexed_from', String(height));
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
      for (const t of ['blocks', 'txs', 'tx_accounts', 'assets'])
        n += this.db
          .prepare(`DELETE FROM ${t} WHERE height > ?`)
          .run(to).changes;
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

  fileBytes(): number {
    if (this.path === ':memory:') return 0;
    const page = this.db.pragma('page_size', { simple: true }) as number;
    const count = this.db.pragma('page_count', { simple: true }) as number;
    return page * count;
  }

  vacuum(): void {
    if (this.path !== ':memory:') this.db.pragma('incremental_vacuum');
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
    return (
      this.stmts.acctNewerCount.get(
        blob(account),
        ref.height,
        ref.height,
        ref.txIndex,
        cap,
      ) as { c: number }
    ).c;
  }

  close() {
    this.db.close();
  }
}
