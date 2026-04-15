import IndexL1 from './IndexL1';

jest.mock('~/config', () => ({
  env: { get: (k: string) => (k === 'FUEL_CHAIN' ? 'mainnet' : 'test-key') },
}));

jest.mock('~/core/Logger', () => ({
  logger: { debug: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

jest.mock('~/infra/database/DatabaseConnection', () => ({
  DatabaseConnection: {
    getInstance: () => ({
      query: jest.fn().mockResolvedValue([]),
    }),
  },
}));

jest.mock('node:timers/promises', () => ({
  setTimeout: jest.fn().mockResolvedValue(undefined),
}));

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
