import { L1Index } from './L1Index';
import { L1_CONTRACTS } from './contracts';

function mainnetSeed() {
  const c = L1_CONTRACTS.find((c) => c.network === 'mainnet');
  if (!c) throw new Error('fixture bug: no mainnet seed contract');
  return c;
}

function makeLogRow(
  overrides: Partial<Parameters<L1Index['insertLogs']>[0][number]> = {},
) {
  return {
    contractHash: '0xAEB0c00D0125A8a788956ade4f4F12Ead9f65DDf',
    blockHeight: 100,
    txHash: '0xdeadbeef',
    event: 'MessageSent',
    signature: 'MessageSent(bytes32,bytes32,uint256,uint64,bytes)',
    rawLog: '{"topics":[]}',
    decodedArgs: '{"amount":"1"}',
    decodedData: '{}',
    timestamp: '2026-01-01T00:00:00.000Z',
    logIndex: 0,
    args: { amount: '1' },
    ...overrides,
  };
}

describe('L1Index', () => {
  it('seed() inserts the seven mainnet contracts with their migration-013 start blocks', () => {
    const idx = new L1Index(':memory:');
    idx.seed('mainnet');
    const rows = idx.contracts('mainnet');
    expect(rows).toHaveLength(7);
    const mainnetSeeds = L1_CONTRACTS.filter((c) => c.network === 'mainnet');
    for (const seedContract of mainnetSeeds) {
      const row = rows.find(
        (r) => r.contract_hash === seedContract.contractHash,
      );
      expect(row).toBeDefined();
      expect(row?.block_height).toBe(seedContract.blockHeight);
      expect(row?.name).toBe(seedContract.name);
    }
    idx.close();
  });

  it('seed() applies L1_START_BLOCK as the start height for every contract when given', () => {
    const idx = new L1Index(':memory:');
    idx.seed('testnet', 6000000);
    const rows = idx.contracts('testnet');
    expect(rows).toHaveLength(7);
    expect(rows.every((r) => r.block_height === 6000000)).toBe(true);
    idx.close();
  });

  it('seed() does not overwrite an existing cursor on re-seed (INSERT OR IGNORE)', () => {
    const idx = new L1Index(':memory:');
    idx.seed('mainnet');
    const contractHash = mainnetSeed().contractHash;
    idx.advance(contractHash, 999999);
    idx.seed('mainnet');
    expect(idx.cursor(contractHash)).toBe(999999);
    idx.close();
  });

  it('cursor()/advance() round trip, cursor() is null for an unknown contract', () => {
    const idx = new L1Index(':memory:');
    idx.seed('mainnet');
    const seed = mainnetSeed();
    expect(idx.cursor(seed.contractHash)).toBe(seed.blockHeight);
    const contractHash = seed.contractHash;
    idx.advance(contractHash, 21300000);
    expect(idx.cursor(contractHash)).toBe(21300000);
    expect(idx.cursor('0xunknown')).toBeNull();
    idx.close();
  });

  it('insertLogs() writes contract_l1_logs and one contract_l1_args row per key in a single transaction', () => {
    const idx = new L1Index(':memory:');
    idx.insertLogs([makeLogRow()]);
    const rows = idx.queryLogs({
      contractHash: '0xAEB0c00D0125A8a788956ade4f4F12Ead9f65DDf',
    });
    expect(rows).toHaveLength(1);
    expect(rows[0].event).toBe('MessageSent');
    const argRows = idx.queryLogs({ argKey: 'amount', argValue: '1' });
    expect(argRows).toHaveLength(1);
    idx.close();
  });

  it('insertLogs() dedupes on (block_height, log_index, tx_hash) without throwing', () => {
    const idx = new L1Index(':memory:');
    idx.insertLogs([makeLogRow()]);
    idx.insertLogs([makeLogRow()]);
    const rows = idx.queryLogs({
      contractHash: '0xAEB0c00D0125A8a788956ade4f4F12Ead9f65DDf',
    });
    expect(rows).toHaveLength(1);
    idx.close();
  });

  it('insertLogs() binds bigint and boolean arg values as strings instead of throwing', () => {
    const idx = new L1Index(':memory:');
    idx.insertLogs([
      makeLogRow({
        args: { amount: 12345678901234567890n, relayed: true },
      }),
    ]);
    const byAmount = idx.queryLogs({
      argKey: 'amount',
      argValue: '12345678901234567890',
    });
    expect(byAmount).toHaveLength(1);
    const byBool = idx.queryLogs({ argKey: 'relayed', argValue: 'true' });
    expect(byBool).toHaveLength(1);
    idx.close();
  });

  it('queryLogs() filters by fromBlock and respects limit', () => {
    const idx = new L1Index(':memory:');
    idx.insertLogs([
      makeLogRow({ blockHeight: 100, logIndex: 0, txHash: '0xa' }),
      makeLogRow({ blockHeight: 200, logIndex: 0, txHash: '0xb' }),
      makeLogRow({ blockHeight: 300, logIndex: 0, txHash: '0xc' }),
    ]);
    const fromBlock = idx.queryLogs({ fromBlock: 200 });
    expect(fromBlock.map((r) => r.block_height).sort()).toEqual([200, 300]);
    const limited = idx.queryLogs({ limit: 1 });
    expect(limited).toHaveLength(1);
    idx.close();
  });

  describe('staking query methods', () => {
    const ADDRESS = '0xAbC0000000000000000000000000000000dEaD';
    const OTHER_ADDRESS = '0x0000000000000000000000000000000000beef';

    function seedStakingLogs(idx: L1Index) {
      idx.insertLogs([
        makeLogRow({
          blockHeight: 100,
          logIndex: 0,
          txHash: '0xd1',
          event: 'Delegate',
          signature: 'Delegate(address,address,uint256)',
          args: { delegator: ADDRESS, validator: '0xvalidator', amount: '1' },
        }),
        makeLogRow({
          blockHeight: 200,
          logIndex: 0,
          txHash: '0xw1',
          event: 'Withdraw',
          signature: 'Withdraw(address,address,uint256)',
          args: { sender: ADDRESS, recipient: '0xrecipient', amount: '2' },
        }),
        makeLogRow({
          blockHeight: 300,
          logIndex: 0,
          txHash: '0xother',
          event: 'Delegate',
          signature: 'Delegate(address,address,uint256)',
          args: { delegator: OTHER_ADDRESS, validator: '0xv', amount: '3' },
        }),
        // Same signature family but not a staking action signature at all:
        // must never match either branch of the OR condition.
        makeLogRow({
          blockHeight: 400,
          logIndex: 0,
          txHash: '0xunrelated',
          event: 'MessageSent',
          signature: 'MessageSent(bytes32,bytes32,uint256,uint64,bytes)',
          args: { sender: ADDRESS },
        }),
      ]);
    }

    it('queryStakingEvents() matches sender OR delegator by signature family, newest first by default', () => {
      const idx = new L1Index(':memory:');
      seedStakingLogs(idx);
      const rows = idx.queryStakingEvents(ADDRESS, {
        cursor: null,
        direction: 'before',
        limit: 10,
      });
      expect(rows.map((r) => r.tx_hash)).toEqual(['0xw1', '0xd1']);
      idx.close();
    });

    it('queryStakingEvents() respects the cursor and direction (after/asc, before/desc)', () => {
      const idx = new L1Index(':memory:');
      seedStakingLogs(idx);
      const all = idx.queryStakingEvents(ADDRESS, {
        cursor: null,
        direction: 'before',
        limit: 10,
      });
      const delegateId = all.find((r) => r.tx_hash === '0xd1')?._id as number;
      const after = idx.queryStakingEvents(ADDRESS, {
        cursor: delegateId,
        direction: 'after',
        limit: 10,
      });
      expect(after.map((r) => r.tx_hash)).toEqual(['0xw1']);
      idx.close();
    });

    it('hasStakingEventBeyond() reports existence past a boundary _id', () => {
      const idx = new L1Index(':memory:');
      seedStakingLogs(idx);
      const rows = idx.queryStakingEvents(ADDRESS, {
        cursor: null,
        direction: 'before',
        limit: 10,
      });
      const [newest, oldest] = [rows[0]._id, rows[rows.length - 1]._id];
      expect(idx.hasStakingEventBeyond(ADDRESS, oldest, '<')).toBe(false);
      expect(idx.hasStakingEventBeyond(ADDRESS, newest, '>')).toBe(false);
      expect(idx.hasStakingEventBeyond(ADDRESS, oldest, '>')).toBe(true);
      idx.close();
    });

    it('stakingEventById() left-joins the sender/delegator arg by signature', () => {
      const idx = new L1Index(':memory:');
      seedStakingLogs(idx);
      const rows = idx.queryStakingEvents(ADDRESS, {
        cursor: null,
        direction: 'before',
        limit: 10,
      });
      const delegateRow = rows.find((r) => r.tx_hash === '0xd1');
      const withdrawRow = rows.find((r) => r.tx_hash === '0xw1');
      expect(idx.stakingEventById(delegateRow?._id as number)?.value).toBe(
        ADDRESS,
      );
      expect(idx.stakingEventById(withdrawRow?._id as number)?.value).toBe(
        ADDRESS,
      );
      idx.close();
    });

    it('stakingEventById() returns undefined for a non-staking signature', () => {
      const idx = new L1Index(':memory:');
      seedStakingLogs(idx);
      const unrelated = idx.queryLogs({ event: 'MessageSent' })[0];
      expect(idx.stakingEventById(unrelated._id)).toBeUndefined();
      idx.close();
    });

    it('recentArgLogs() returns the newest N logs carrying a given arg key', () => {
      const idx = new L1Index(':memory:');
      idx.insertLogs([
        makeLogRow({
          blockHeight: 1,
          logIndex: 0,
          txHash: '0xc1',
          event: 'HeadUpdate',
          signature: 'HeadUpdate(uint256,uint256)',
          timestamp: '2026-01-01T00:00:00.000Z',
          args: { blockNumber: '10' },
        }),
        makeLogRow({
          blockHeight: 2,
          logIndex: 0,
          txHash: '0xc2',
          event: 'HeadUpdate',
          signature: 'HeadUpdate(uint256,uint256)',
          timestamp: '2026-01-02T00:00:00.000Z',
          args: { blockNumber: '20' },
        }),
      ]);
      const rows = idx.recentArgLogs('blockNumber', 10);
      expect(rows.map((r) => r.value)).toEqual(['20', '10']);
      idx.close();
    });

    it('firstArgLogAtOrAfter() returns the earliest-by-timestamp log with an arg value >= minValue', () => {
      const idx = new L1Index(':memory:');
      idx.insertLogs([
        makeLogRow({
          blockHeight: 1,
          logIndex: 0,
          txHash: '0xc1',
          event: 'HeadUpdate',
          signature: 'HeadUpdate(uint256,uint256)',
          timestamp: '2026-01-02T00:00:00.000Z',
          args: { blockNumber: '50' },
        }),
        makeLogRow({
          blockHeight: 2,
          logIndex: 0,
          txHash: '0xc2',
          event: 'HeadUpdate',
          signature: 'HeadUpdate(uint256,uint256)',
          timestamp: '2026-01-01T00:00:00.000Z',
          args: { blockNumber: '30' },
        }),
      ]);
      const row = idx.firstArgLogAtOrAfter('blockNumber', 40);
      expect(row?.txHash).toBe('0xc1');
      expect(idx.firstArgLogAtOrAfter('blockNumber', 1000)).toBeUndefined();
      idx.close();
    });
  });
});
