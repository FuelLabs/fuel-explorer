import IndexL1 from './IndexL1';

jest.mock('~/config', () => ({
  env: { get: (k: string) => (k === 'FUEL_CHAIN' ? 'mainnet' : 'test-key') },
}));

jest.mock('~/core/Logger', () => ({
  logger: { debug: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

const queryMock = jest.fn().mockResolvedValue([]);
jest.mock('~/infra/database/DatabaseConnection', () => ({
  DatabaseConnection: {
    getInstance: () => ({
      query: (...args: any[]) => queryMock(...args),
    }),
  },
}));

jest.mock('node:timers/promises', () => ({
  setTimeout: jest.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
  queryMock.mockReset();
  queryMock.mockResolvedValue([]);
});

describe('IndexL1', () => {
  it('fetches the finalized block (not latest) to drive indexing window', async () => {
    const getBlock = jest
      .fn()
      .mockImplementation(async (tag: string | number) => {
        if (tag === 'finalized')
          return { number: 1000, hash: '0xabc', timestamp: 1 };
        return { number: tag as number, hash: '0xdef', timestamp: 2 };
      });
    const getLogs = jest.fn().mockResolvedValue([]);
    const getBlockNumber = jest.fn().mockResolvedValue(9999);

    const fakeProvider: any = { getBlock, getLogs, getBlockNumber };

    class TestIndexL1 extends IndexL1 {
      protected createProvider() {
        return fakeProvider;
      }
    }

    const indexer = new TestIndexL1();
    await indexer.syncContract({
      _id: 1,
      block_height: 500,
      contract_hash: '0x0000000000000000000000000000000000000000',
      name: 'FuelMessagePortal',
    });

    expect(getBlock).toHaveBeenCalledWith('finalized');
    expect(getBlockNumber).not.toHaveBeenCalled();
  });

  it('does not request logs past the finalized block (no +1 off-by-one)', async () => {
    const finalizedNumber = 1000;
    const getBlock = jest
      .fn()
      .mockImplementation(async (tag: string | number) => {
        if (tag === 'finalized')
          return { number: finalizedNumber, hash: '0xabc', timestamp: 1 };
        return { number: tag as number, hash: '0xdef', timestamp: 2 };
      });
    const getLogs = jest.fn().mockResolvedValue([]);
    const fakeProvider: any = { getBlock, getLogs, getBlockNumber: jest.fn() };

    class TestIndexL1 extends IndexL1 {
      protected createProvider() {
        return fakeProvider;
      }
    }

    // block_height is close to finalized so the window clamps against finalized (not the +1000 cap)
    await new TestIndexL1().syncContract({
      _id: 1,
      block_height: finalizedNumber - 5,
      contract_hash: '0x0000000000000000000000000000000000000000',
      name: 'FuelMessagePortal',
    });

    if (getLogs.mock.calls.length > 0) {
      const { toBlock } = getLogs.mock.calls[0][0];
      expect(toBlock).toBeLessThanOrEqual(finalizedNumber);
    }
  });

  it('advances cursor to toBlock + 1 after a cycle (next cycle fromBlock is the next unprocessed block)', async () => {
    const finalizedNumber = 1000;
    const getBlock = jest
      .fn()
      .mockImplementation(async (tag: string | number) => {
        if (tag === 'finalized')
          return { number: finalizedNumber, hash: '0xabc', timestamp: 1 };
        return { number: tag as number, hash: '0xdef', timestamp: 2 };
      });
    const getLogs = jest.fn().mockResolvedValue([]);
    const fakeProvider: any = { getBlock, getLogs, getBlockNumber: jest.fn() };

    class TestIndexL1 extends IndexL1 {
      protected createProvider() {
        return fakeProvider;
      }
    }

    // Choose block_height close to finalized so toBlock clamps to finalizedNumber.
    await new TestIndexL1().syncContract({
      _id: 42,
      block_height: finalizedNumber - 5,
      contract_hash: '0x0000000000000000000000000000000000000000',
      name: 'FuelMessagePortal',
    });

    // Find the UPDATE call that advances the cursor in contract_l1_index.
    const updateCall = queryMock.mock.calls.find(
      (c) =>
        typeof c[0] === 'string' &&
        c[0].includes('update indexer.contract_l1_index'),
    );
    expect(updateCall).toBeDefined();
    // Cursor must advance to toBlock + 1 = finalizedNumber + 1.
    expect(updateCall?.[1]).toEqual([finalizedNumber + 1, 42]);
  });

  it('skips the cycle when the finalized block cannot be fetched', async () => {
    const getBlock = jest.fn().mockRejectedValue(new Error('rpc down'));
    const getLogs = jest.fn();
    const fakeProvider: any = { getBlock, getLogs, getBlockNumber: jest.fn() };

    class TestIndexL1 extends IndexL1 {
      protected createProvider() {
        return fakeProvider;
      }
    }

    const indexer = new TestIndexL1();
    await indexer.syncContract({
      _id: 1,
      block_height: 500,
      contract_hash: '0x0000000000000000000000000000000000000000',
      name: 'FuelMessagePortal',
    });

    expect(getLogs).not.toHaveBeenCalled();
  });
});
