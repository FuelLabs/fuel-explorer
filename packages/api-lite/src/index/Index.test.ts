import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type Database from 'better-sqlite3';
import { Index, parseTxCursor, txCursor } from './Index';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;

function block(
  height: number,
  txs: {
    id: string;
    accounts?: string[];
    contractCreated?: string;
    predicate?: [string, string];
    mint?: [string, string];
  }[],
) {
  return {
    id: hex(1000 + height),
    height: String(height),
    header: { height: String(height), time: '4611686020140000000' },
    transactions: txs.map((t) => ({
      id: t.id,
      inputs: [
        ...(t.accounts ?? []).map((a) => ({
          __typename: 'InputCoin',
          owner: a,
          predicate: t.predicate?.[0] === a ? t.predicate[1] : '0x',
        })),
      ],
      outputs: t.contractCreated
        ? [{ __typename: 'ContractCreated', contract: t.contractCreated }]
        : [],
      status: {
        __typename: 'SuccessStatus',
        receipts: t.mint
          ? [{ receiptType: 'MINT', id: t.mint[0], subId: t.mint[1] }]
          : [],
      },
    })),
  } as any;
}

describe('Index', () => {
  let idx: Index;
  beforeEach(() => {
    idx = new Index(':memory:');
  });
  afterEach(() => idx.close());

  it('sets a busy_timeout on a file-backed database, so a concurrent writer waits instead of throwing SQLITE_BUSY', () => {
    const dir = mkdtempSync(join(tmpdir(), 'index-'));
    const dbPath = join(dir, 'index.db');
    const fileIdx = new Index(dbPath);
    try {
      const db = (fileIdx as unknown as { db: Database.Database }).db;
      expect(db.pragma('busy_timeout', { simple: true })).toBe(5000);
    } finally {
      fileIdx.close();
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('cursor round trip', () => {
    expect(txCursor(5, 0)).toBe(`${'0'.repeat(31)}5-${'0'.repeat(15)}1`);
    expect(parseTxCursor(txCursor(5, 2))).toEqual({ height: 5, txIndex: 2 });
  });

  it('hash lookups', () => {
    idx.writeBlock(block(10, [{ id: hex(1) }, { id: hex(2) }]));
    expect(idx.heightForBlock(hex(1010))).toBe(10);
    expect(idx.heightForTx(hex(2))).toEqual({ height: 10, txIndex: 1 });
    expect(idx.heightForTx(hex(3))).toBeNull();
  });

  it('account history newest first with cursors', () => {
    const a = hex(77);
    idx.writeBlock(
      block(10, [
        { id: hex(1), accounts: [a] },
        { id: hex(2), accounts: [a] },
      ]),
    );
    idx.writeBlock(block(11, [{ id: hex(3), accounts: [a] }]));
    expect(idx.accountExists(a)).toBe(true);
    expect(idx.accountExists(hex(78))).toBe(false);
    expect(idx.txsForAccount(a, { limit: 10 })).toEqual([
      { height: 11, txIndex: 0 },
      { height: 10, txIndex: 1 },
      { height: 10, txIndex: 0 },
    ]);
    expect(
      idx.txsForAccount(a, { limit: 10, before: txCursor(11, 0) }),
    ).toEqual([
      { height: 10, txIndex: 1 },
      { height: 10, txIndex: 0 },
    ]);
    expect(idx.txsForAccount(a, { limit: 10, after: txCursor(10, 0) })).toEqual(
      [
        { height: 11, txIndex: 0 },
        { height: 10, txIndex: 1 },
      ],
    );
    expect(idx.countForAccount(a, 1001)).toBe(3);

    // Rows below the index window are a sparse subset, so paging skips them.
    idx.setRange(11, 11);
    expect(idx.txsForAccount(a, { limit: 10 })).toEqual([
      { height: 11, txIndex: 0 },
    ]);
    expect(
      idx.txsForAccount(a, { limit: 10, before: txCursor(11, 0) }),
    ).toEqual([]);
    expect(idx.txsForAccount(a, { limit: 10, after: txCursor(10, 0) })).toEqual(
      [{ height: 11, txIndex: 0 }],
    );
    idx.setRange(10, 11);
    expect(idx.newerCountForAccount(a, { height: 11, txIndex: 0 }, 1001)).toBe(
      0,
    );
    expect(idx.newerCountForAccount(a, { height: 10, txIndex: 1 }, 1001)).toBe(
      1,
    );
    expect(idx.newerCountForAccount(a, { height: 10, txIndex: 0 }, 1001)).toBe(
      2,
    );
    expect(
      idx.newerCountForAccount(hex(78), { height: 0, txIndex: 0 }, 1001),
    ).toBe(0);
  });

  it('global tx count and newer-than-ref count for the transactions list', () => {
    idx.writeBlock(block(10, [{ id: hex(1) }, { id: hex(2) }]));
    idx.writeBlock(block(11, [{ id: hex(3) }]));
    expect(idx.txCount(1001)).toBe(3);
    expect(idx.newerTxCount({ height: 11, txIndex: 0 }, 1001)).toBe(0);
    expect(idx.newerTxCount({ height: 10, txIndex: 1 }, 1001)).toBe(1);
    expect(idx.newerTxCount({ height: 10, txIndex: 0 }, 1001)).toBe(2);
  });

  it('caps txCount/newerTxCount like countForAccount does', () => {
    idx.writeBlock(block(10, [{ id: hex(1) }, { id: hex(2) }]));
    idx.writeBlock(block(11, [{ id: hex(3) }]));
    expect(idx.txCount(2)).toBe(2);
    expect(idx.newerTxCount({ height: 10, txIndex: 0 }, 1)).toBe(1);
  });

  it('txCount/newerTxCount only count rows inside the indexed_from..indexed_to window, not stale rows left outside it', () => {
    idx.writeBlock(block(10, [{ id: hex(1) }, { id: hex(2) }]));
    idx.writeBlock(block(11, [{ id: hex(3) }]));
    idx.writeBlock(block(12, [{ id: hex(4) }]));
    // A stale row outside the window: height 10 is below indexed_from, as if
    // a range reset/writeOnly() left it behind before the retention sweep
    // removed it. collectDown/collectUp never serve it, so the counts must
    // not either.
    idx.setRange(11, 12);
    expect(idx.txCount(1001)).toBe(2);
    expect(idx.newerTxCount({ height: 10, txIndex: 1 }, 1001)).toBe(2);
    expect(idx.newerTxCount({ height: 11, txIndex: 0 }, 1001)).toBe(1);
    idx.clearRange();
    expect(idx.txCount(1001)).toBe(4);
  });

  it('writes the same block twice without error', () => {
    idx.writeBlock(block(10, [{ id: hex(1), accounts: [hex(5)] }]));
    idx.writeBlock(block(10, [{ id: hex(1), accounts: [hex(5)] }]));
    expect(idx.countForAccount(hex(5), 10)).toBe(1);
  });

  it('predicates, contracts, assets', () => {
    const p = hex(9);
    idx.writeBlock(
      block(12, [
        {
          id: hex(1),
          accounts: [p],
          predicate: [p, '0xdeadbeef'],
          contractCreated: hex(20),
          mint: [hex(20), hex(0)],
        },
      ]),
    );
    expect(idx.predicate(p)).toBe('0xdeadbeef');
    expect(idx.predicate(hex(8))).toBeNull();
    expect(idx.contract(hex(20))).toEqual({ height: 12 });
    expect(idx.contracts({ limit: 5 })).toEqual([
      { contractId: hex(20), height: 12 },
    ]);
    const assets = idx.assetsByContract(hex(20));
    expect(assets).toHaveLength(1);
    expect(assets[0].subId).toBe(hex(0));
    expect(idx.asset(assets[0].assetId)).toEqual({
      contractId: hex(20),
      subId: hex(0),
    });
    expect(idx.countByContract(hex(20))).toBe(1);
    expect(idx.countByContract(hex(21))).toBe(0);
  });

  it('seedAsset backfills a registry asset without waiting for a live MINT receipt', () => {
    idx.seedAsset(hex(30), hex(20), hex(0));
    expect(idx.asset(hex(30))).toEqual({ contractId: hex(20), subId: hex(0) });
    expect(idx.assetsByContract(hex(20))).toEqual([
      { assetId: hex(30), subId: hex(0), height: 0 },
    ]);
    expect(idx.countByContract(hex(20))).toBe(1);
  });

  it('seedAsset never overwrites an asset already recorded from a real MINT receipt', () => {
    idx.writeBlock(block(12, [{ id: hex(1), mint: [hex(20), hex(0)] }]));
    const [before] = idx.assetsByContract(hex(20));
    idx.seedAsset(before.assetId, hex(20), hex(0));
    expect(idx.assetsByContract(hex(20))).toEqual([before]);
  });

  it('stores unix time, gas and fee, and buckets series', () => {
    const T = 1_700_000_000;
    const tai = (u: number) => (BigInt(u) + (1n << 62n) + 10n).toString();
    const blk = (h: number, u: number, gas: string, fee: string) => ({
      ...block(h, [{ id: hex(h) }]),
      header: { height: String(h), time: tai(u) },
      transactions: [
        {
          id: hex(h),
          inputs: [],
          outputs: [],
          status: {
            __typename: 'SuccessStatus',
            receipts: [],
            totalGas: gas,
            totalFee: fee,
          },
        },
      ],
    });
    idx.writeBlock(blk(1, T, '10', '5'));
    idx.writeBlock(blk(2, T + 100, '20', '7'));
    idx.writeBlock(blk(3, T + 3700, '1', '1'));
    const hours = idx.hourlySeries(T - 1);
    expect(hours).toHaveLength(2);
    expect(hours[0]).toEqual({
      bucketStart: Math.floor(T / 3600) * 3600,
      txCount: 2,
      blocks: 2,
      gasUsed: '30',
      totalFee: '12',
      // MAX(tx_count)/MAX(gas_used) across the two blocks in this bucket
      // (1 tx/10 gas at T, 1 tx/20 gas at T+100): the single busiest block,
      // not the SUM columns above.
      maxTxCount: 1,
      maxGasUsed: 20,
    });
    expect(idx.tenMinuteSeries(T - 1)).toHaveLength(2);
    // Blocks at T, T+100, T+3700: 100s and 3700s apart, so each lands in a
    // distinct 60s bucket (a straight generalization of the same bucketed
    // query hourly/tenMinute already use, just with bucketSeconds=60).
    const minutes = idx.minuteSeries(T - 1);
    expect(minutes).toHaveLength(3);
    expect(minutes.map((r) => r.txCount)).toEqual([1, 1, 1]);
    expect(minutes[0].bucketStart).toBe(Math.floor(T / 60) * 60);
    expect(idx.oldestTime()).toBe(T);
  });

  it('range and deleteBelow', () => {
    expect(idx.range()).toEqual({ from: null, to: null });
    idx.writeBlock(block(10, [{ id: hex(1), accounts: [hex(5)] }]));
    idx.writeBlock(block(11, [{ id: hex(2), accounts: [hex(5)] }]));
    idx.setRange(10, 11);
    expect(idx.range()).toEqual({ from: 10, to: 11 });
    expect(idx.deleteBelow(11)).toBeGreaterThan(0);
    expect(idx.heightForBlock(hex(1010))).toBeNull();
    expect(idx.heightForBlock(hex(1011))).toBe(11);
    expect(idx.range().from).toBe(11);
    expect(idx.fileBytes()).toBeGreaterThanOrEqual(0);
  });

  it('deleteRange removes only [lo, hi) and moves indexed_from past it', () => {
    for (let h = 10; h <= 14; h++)
      idx.writeBlock(block(h, [{ id: hex(h), accounts: [hex(5)] }]));
    idx.setRange(10, 14);
    expect(idx.minHeight()).toBe(10);
    expect(idx.deleteRange(10, 12)).toBe(2);
    expect(idx.heightForBlock(hex(1011))).toBeNull();
    expect(idx.heightForBlock(hex(1012))).toBe(12);
    expect(idx.minHeight()).toBe(12);
    expect(idx.range().from).toBe(12);
    expect(idx.deleteRange(0, 10)).toBe(0);
  });

  it('deleteBelow prunes blocks and dropExpiredPartitions prunes txs/tx_accounts, never assets, contracts or predicates', () => {
    idx.close();
    idx = new Index(':memory:', { bucketBlocks: 1 });
    idx.writeBlock(
      block(10, [
        {
          id: hex(1),
          accounts: [hex(5)],
          contractCreated: hex(20),
          predicate: [hex(5), '0xdeadbeef'],
          mint: [hex(20), hex(0)],
        },
      ]),
    );
    idx.writeBlock(block(11, [{ id: hex(2), accounts: [hex(5)] }]));
    expect(idx.deleteBelow(11)).toBeGreaterThan(0);
    expect(idx.heightForBlock(hex(1010))).toBeNull();
    expect(idx.heightForTx(hex(1))).toEqual({ height: 10, txIndex: 0 });
    expect(idx.dropExpiredPartitions(11)).toBe(1);
    expect(idx.heightForTx(hex(1))).toBeNull();
    expect(idx.heightForTx(hex(2))).toEqual({ height: 11, txIndex: 0 });
    expect(idx.accountExists(hex(5))).toBe(true);
    expect(idx.predicate(hex(5))).toBe('0xdeadbeef');
    expect(idx.contract(hex(20))).toEqual({ height: 10 });
    const assets = idx.assetsByContract(hex(20));
    expect(assets).toHaveLength(1);
    expect(idx.asset(assets[0].assetId)).toEqual({
      contractId: hex(20),
      subId: hex(0),
    });
  });

  it('deleteAboveRange keeps a stray row below from and removes a row above to', () => {
    idx.writeBlock(block(0, [{ id: hex(1) }]));
    idx.writeBlock(block(10, [{ id: hex(2) }]));
    idx.writeBlock(block(11, [{ id: hex(3) }]));
    idx.setRange(10, 11);
    expect(idx.deleteAboveRange()).toBe(0);
    idx.writeBlock(block(12, [{ id: hex(4) }]));
    expect(idx.deleteAboveRange()).toBeGreaterThan(0);
    expect(idx.heightForTx(hex(1))).toEqual({ height: 0, txIndex: 0 });
    expect(idx.heightForTx(hex(2))).toEqual({ height: 10, txIndex: 0 });
    expect(idx.heightForTx(hex(3))).toEqual({ height: 11, txIndex: 0 });
    expect(idx.heightForTx(hex(4))).toBeNull();
  });

  it('deleteAboveRange is a no-op when indexed_to is unset', () => {
    idx.writeBlock(block(0, [{ id: hex(1) }]));
    expect(idx.deleteAboveRange()).toBe(0);
    expect(idx.heightForTx(hex(1))).not.toBeNull();
  });

  it('clearRange deletes the indexed_from and indexed_to meta rows', () => {
    idx.setRange(10, 11);
    expect(idx.range()).toEqual({ from: 10, to: 11 });
    idx.clearRange();
    expect(idx.range()).toEqual({ from: null, to: null });
  });

  it('setFrom updates only indexed_from, leaving indexed_to untouched', () => {
    idx.setRange(10, 20);
    idx.setFrom(15);
    expect(idx.range()).toEqual({ from: 15, to: 20 });
  });

  it('gaps() is empty when nothing has been recorded', () => {
    expect(idx.gaps()).toEqual({ count: 0, heights: [] });
  });

  it('gaps() reads back every height recordGap wrote, in write order', () => {
    idx.recordGap(500);
    idx.recordGap(600);
    idx.recordGap(700);
    expect(idx.gaps()).toEqual({ count: 3, heights: [500, 600, 700] });
  });
  it('spans partitions for account history, cursors and counts', () => {
    idx.close();
    idx = new Index(':memory:', { bucketBlocks: 10 });
    const a = hex(77);
    idx.writeBlock(
      block(5, [
        { id: hex(1), accounts: [a] },
        { id: hex(2), accounts: [a] },
      ]),
    );
    idx.writeBlock(block(15, [{ id: hex(3), accounts: [a] }]));
    idx.writeBlock(block(25, [{ id: hex(4), accounts: [a] }]));
    idx.setRange(5, 25);
    expect(idx.partitionRanges()).toEqual([
      { start: 20, end: 29 },
      { start: 10, end: 19 },
      { start: 0, end: 9 },
    ]);
    expect(idx.heightForTx(hex(1))).toEqual({ height: 5, txIndex: 0 });
    expect(idx.heightForTx(hex(4))).toEqual({ height: 25, txIndex: 0 });
    expect(idx.heightForTx(hex(9))).toBeNull();
    expect(idx.txsForAccount(a, { limit: 3 })).toEqual([
      { height: 25, txIndex: 0 },
      { height: 15, txIndex: 0 },
      { height: 5, txIndex: 1 },
    ]);
    expect(
      idx.txsForAccount(a, { limit: 10, before: txCursor(15, 0) }),
    ).toEqual([
      { height: 5, txIndex: 1 },
      { height: 5, txIndex: 0 },
    ]);
    expect(idx.txsForAccount(a, { limit: 2, after: txCursor(5, 0) })).toEqual([
      { height: 15, txIndex: 0 },
      { height: 5, txIndex: 1 },
    ]);
    expect(idx.countForAccount(a, 1001)).toBe(4);
    expect(idx.countForAccount(a, 3)).toBe(3);
    expect(idx.newerCountForAccount(a, { height: 5, txIndex: 0 }, 1001)).toBe(
      3,
    );
    expect(idx.newerCountForAccount(a, { height: 15, txIndex: 0 }, 1001)).toBe(
      1,
    );
    expect(idx.txCount(1001)).toBe(4);
    expect(idx.newerTxCount({ height: 5, txIndex: 1 }, 1001)).toBe(2);
    expect(idx.newerTxCount({ height: 5, txIndex: 1 }, 1)).toBe(1);
  });

  it('dropExpiredPartitions drops only partitions entirely below the floor', () => {
    idx.close();
    idx = new Index(':memory:', { bucketBlocks: 10 });
    for (const h of [5, 15, 25]) idx.writeBlock(block(h, [{ id: hex(h) }]));
    expect(idx.oldestPartitionEnd()).toBe(9);
    expect(idx.dropExpiredPartitions(9)).toBe(0);
    expect(idx.dropExpiredPartitions(19)).toBe(1);
    expect(idx.partitionRanges()).toEqual([
      { start: 20, end: 29 },
      { start: 10, end: 19 },
    ]);
    expect(idx.heightForTx(hex(5))).toBeNull();
    expect(idx.heightForTx(hex(15))).toEqual({ height: 15, txIndex: 0 });
    expect(idx.dropExpiredPartitions(1000)).toBe(2);
    expect(idx.partitionRanges()).toEqual([]);
    expect(idx.oldestPartitionEnd()).toBeNull();
    idx.writeBlock(block(35, [{ id: hex(35) }]));
    expect(idx.heightForTx(hex(35))).toEqual({ height: 35, txIndex: 0 });
  });

  it('serves a pre-partition txs/tx_accounts pair as one partition and drops it once expired', () => {
    idx.close();
    const dir = mkdtempSync(join(tmpdir(), 'index-legacy-'));
    const path = join(dir, 'index.db');
    const raw = new (require('better-sqlite3') as typeof Database)(path);
    raw.exec(
      'CREATE TABLE txs(height INTEGER NOT NULL, tx_index INTEGER NOT NULL, tx_hash BLOB NOT NULL, PRIMARY KEY(height, tx_index)) WITHOUT ROWID; CREATE INDEX txs_hash ON txs(tx_hash); CREATE TABLE tx_accounts(account BLOB NOT NULL, height INTEGER NOT NULL, tx_index INTEGER NOT NULL, PRIMARY KEY(account, height DESC, tx_index DESC)) WITHOUT ROWID;',
    );
    const a = hex(77);
    const acct = Buffer.from(a.slice(2), 'hex');
    for (const h of [12, 14]) {
      raw
        .prepare('INSERT INTO txs VALUES (?, 0, ?)')
        .run(h, Buffer.from(hex(h).slice(2), 'hex'));
      raw.prepare('INSERT INTO tx_accounts VALUES (?, ?, 0)').run(acct, h);
    }
    raw.close();
    try {
      idx = new Index(path, { bucketBlocks: 10 });
      expect(idx.partitionRanges()).toEqual([{ start: 12, end: 14 }]);
      idx.writeBlock(block(13, [{ id: hex(13), accounts: [a] }]));
      idx.writeBlock(block(8, [{ id: hex(8), accounts: [a] }]));
      idx.writeBlock(block(21, [{ id: hex(21), accounts: [a] }]));
      expect(idx.partitionRanges()).toEqual([
        { start: 20, end: 29 },
        { start: 12, end: 14 },
        { start: 0, end: 9 },
      ]);
      expect(idx.txsForAccount(a, { limit: 10 })).toEqual([
        { height: 21, txIndex: 0 },
        { height: 14, txIndex: 0 },
        { height: 13, txIndex: 0 },
        { height: 12, txIndex: 0 },
        { height: 8, txIndex: 0 },
      ]);
      expect(idx.countForAccount(a, 1001)).toBe(5);
      idx.close();
      idx = new Index(path, { bucketBlocks: 10 });
      expect(idx.partitionRanges()).toEqual([
        { start: 20, end: 29 },
        { start: 12, end: 14 },
        { start: 0, end: 9 },
      ]);
      expect(idx.dropExpiredPartitions(15)).toBe(2);
      expect(idx.heightForTx(hex(13))).toBeNull();
      expect(idx.heightForTx(hex(21))).toEqual({ height: 21, txIndex: 0 });
      idx.close();
      idx = new Index(path, { bucketBlocks: 10 });
      expect(idx.partitionRanges()).toEqual([{ start: 20, end: 29 }]);
      idx.writeBlock(block(13, [{ id: hex(13), accounts: [a] }]));
      expect(idx.partitionRanges()).toEqual([
        { start: 20, end: 29 },
        { start: 10, end: 19 },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
  it('keeps the bucket size the first partition was created with when reopened', () => {
    idx.close();
    const dir = mkdtempSync(join(tmpdir(), 'index-bucket-'));
    const path = join(dir, 'index.db');
    try {
      idx = new Index(path, { bucketBlocks: 10 });
      idx.writeBlock(block(25, [{ id: hex(25) }]));
      expect(idx.partitionRanges()).toEqual([{ start: 20, end: 29 }]);
      idx.close();
      // Reopened with a different size: the stored one still applies, so the
      // existing table keeps the height range it was written with and a new
      // block in it lands in the same table.
      idx = new Index(path, { bucketBlocks: 1000 });
      expect(idx.partitionRanges()).toEqual([{ start: 20, end: 29 }]);
      idx.writeBlock(block(27, [{ id: hex(27) }]));
      expect(idx.partitionRanges()).toEqual([{ start: 20, end: 29 }]);
      expect(idx.heightForTx(hex(25))).toEqual({ height: 25, txIndex: 0 });
      expect(idx.heightForTx(hex(27))).toEqual({ height: 27, txIndex: 0 });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
