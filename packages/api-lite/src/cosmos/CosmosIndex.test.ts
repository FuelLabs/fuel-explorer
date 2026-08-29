import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type Database from 'better-sqlite3';
import { CosmosIndex } from './CosmosIndex';

describe('CosmosIndex', () => {
  let index: CosmosIndex;

  beforeEach(() => {
    index = new CosmosIndex(':memory:');
  });
  afterEach(() => {
    index.close();
  });

  describe('cursor', () => {
    it('is null before it is ever set', () => {
      expect(index.cursor()).toBeNull();
    });

    it('setCursor persists and cursor reads it back', () => {
      index.setCursor(100);
      expect(index.cursor()).toBe(100);
    });

    it('setCursor overwrites a previous value', () => {
      index.setCursor(100);
      index.setCursor(101);
      expect(index.cursor()).toBe(101);
    });
  });

  describe('insertResponse', () => {
    it('inserts a response and its events in one call', () => {
      index.insertResponse(
        {
          blockHeight: 10,
          txHash: 'AAA',
          data: '{}',
          timestamp: '2026-01-01T00:00:00Z',
        },
        [
          { type: 'delegate', key: 'delegator', value: 'fuel1abc', index: 0 },
          { type: 'delegate', key: 'amount', value: '100ufuel', index: 0 },
        ],
      );
      const events = index.queryEvents({ type: 'delegate' });
      expect(events).toHaveLength(2);
      expect(events[0]).toMatchObject({
        type: 'delegate',
        key: 'delegator',
        value: 'fuel1abc',
        index: 0,
        blockHeight: 10,
        txHash: 'AAA',
      });
    });

    it('is idempotent when the same tx_hash is inserted twice (no duplicate events)', () => {
      const row = {
        blockHeight: 10,
        txHash: 'AAA',
        data: '{}',
        timestamp: null,
      };
      const events = [
        { type: 'delegate', key: 'delegator', value: 'x', index: 0 },
      ];
      index.insertResponse(row, events);
      index.insertResponse(row, events);
      expect(index.queryEvents({ type: 'delegate' })).toHaveLength(1);
    });

    it('handles a response with zero events', () => {
      index.insertResponse(
        { blockHeight: 11, txHash: 'BBB', data: '{}', timestamp: null },
        [],
      );
      expect(index.queryEvents({})).toHaveLength(0);
    });
  });

  it('sets a busy_timeout on a file-backed database, so a concurrent writer waits instead of throwing SQLITE_BUSY', () => {
    const dir = mkdtempSync(join(tmpdir(), 'cosmos-index-'));
    const dbPath = join(dir, 'index.db');
    const fileIndex = new CosmosIndex(dbPath);
    try {
      const db = (fileIndex as unknown as { db: Database.Database }).db;
      expect(db.pragma('busy_timeout', { simple: true })).toBe(5000);
    } finally {
      fileIndex.close();
      rmSync(dir, { recursive: true, force: true });
    }
  });

  describe('queryEvents', () => {
    beforeEach(() => {
      index.insertResponse(
        { blockHeight: 10, txHash: 'AAA', data: '{}', timestamp: null },
        [
          { type: 'delegate', key: 'delegator', value: 'fuel1abc', index: 0 },
          { type: 'delegate', key: 'amount', value: '100ufuel', index: 0 },
        ],
      );
      index.insertResponse(
        { blockHeight: 12, txHash: 'BBB', data: '{}', timestamp: null },
        [
          {
            type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
            key: 'block_number',
            value: '"500"',
            index: 0,
          },
        ],
      );
      index.insertResponse(
        { blockHeight: 14, txHash: 'CCC', data: '{}', timestamp: null },
        [{ type: 'unbond', key: 'amount', value: '50ufuel', index: 1 }],
      );
    });

    it('filters by type', () => {
      const events = index.queryEvents({ type: 'unbond' });
      expect(events).toHaveLength(1);
      expect(events[0].value).toBe('50ufuel');
    });

    it('filters by type, key, and value', () => {
      const events = index.queryEvents({
        type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
        key: 'block_number',
        value: '"500"',
      });
      expect(events).toHaveLength(1);
      expect(events[0].blockHeight).toBe(12);
    });

    it('filters by fromHeight and toHeight', () => {
      const events = index.queryEvents({ fromHeight: 11, toHeight: 13 });
      expect(events).toHaveLength(1);
      expect(events[0].blockHeight).toBe(12);
    });

    it('respects limit', () => {
      const events = index.queryEvents({ limit: 1 });
      expect(events).toHaveLength(1);
    });

    it('orders by block height ascending', () => {
      const events = index.queryEvents({});
      const heights = events.map((e) => e.blockHeight);
      expect(heights).toEqual([...heights].sort((a, b) => a - b));
    });
  });

  describe('blockSyncedAfter', () => {
    beforeEach(() => {
      index.insertResponse(
        { blockHeight: 20, txHash: 'SYNC1', data: '{}', timestamp: null },
        [
          {
            type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
            key: 'block_number',
            value: '"21220900"',
            index: 0,
          },
        ],
      );
    });

    it('is true once a synced block_number greater than the given height is indexed', () => {
      expect(index.blockSyncedAfter(21220899)).toBe(true);
    });

    it('is false for a height at or beyond the highest synced block_number', () => {
      expect(index.blockSyncedAfter(21220900)).toBe(false);
      expect(index.blockSyncedAfter(21220901)).toBe(false);
    });
  });

  describe('queryEventsSyncedToEthBlock', () => {
    const ETH_BLOCK = 21220900;

    beforeEach(() => {
      // cosmos block 100 is the one that reports syncing eth block 21220900
      index.insertResponse(
        { blockHeight: 99, txHash: 'PRE', data: '{}', timestamp: null },
        [
          {
            type: 'delegate',
            key: 'delegator',
            value: 'fuel1abc',
            index: 0,
          },
        ],
      );
      index.insertResponse(
        { blockHeight: 100, txHash: 'SYNC', data: '{}', timestamp: null },
        [
          {
            type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
            key: 'block_number',
            value: `"${ETH_BLOCK}"`,
            index: 0,
          },
        ],
      );
      index.insertResponse(
        {
          blockHeight: 100,
          txHash: 'DELEGATE',
          data: '{}',
          timestamp: '2026-01-01T00:00:00Z',
        },
        [
          { type: 'delegate', key: 'delegator', value: '0xabc', index: 0 },
          { type: 'delegate', key: 'amount', value: '100ufuel', index: 0 },
        ],
      );
    });

    it('returns every event of a tx in the synced cosmos block that matches one of the queries', () => {
      const rows = index.queryEventsSyncedToEthBlock(ETH_BLOCK, [
        { type: 'delegate', key: 'delegator', value: '0xabc' },
      ]);
      expect(rows.map((r) => r.tx_hash)).toEqual(['DELEGATE', 'DELEGATE']);
      expect(rows.map((r) => r.event_key).sort()).toEqual([
        'amount',
        'delegator',
      ]);
    });

    it('is case-insensitive on the value match', () => {
      const rows = index.queryEventsSyncedToEthBlock(ETH_BLOCK, [
        { type: 'delegate', key: 'delegator', value: '0xABC' },
      ]);
      expect(rows).toHaveLength(2);
    });

    it('ignores a tx in a cosmos block not associated with the eth block', () => {
      const rows = index.queryEventsSyncedToEthBlock(ETH_BLOCK, [
        { type: 'delegate', key: 'delegator', value: 'fuel1abc' },
      ]);
      expect(rows).toHaveLength(0);
    });

    it('returns nothing for an eth block that was never synced', () => {
      const rows = index.queryEventsSyncedToEthBlock(999, [
        { type: 'delegate', key: 'delegator', value: '0xabc' },
      ]);
      expect(rows).toHaveLength(0);
    });
  });
});
