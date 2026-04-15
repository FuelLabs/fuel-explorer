import L1ReorgSentinel from './L1ReorgSentinel';

const loggerMock = { debug: jest.fn(), error: jest.fn(), warn: jest.fn() };

jest.mock('~/config', () => ({
  env: { get: (k: string) => (k === 'FUEL_CHAIN' ? 'mainnet' : 'test-key') },
}));

jest.mock('~/core/Logger', () => ({
  logger: {
    debug: (...args: any[]) => loggerMock.debug(...args),
    error: (...args: any[]) => loggerMock.error(...args),
    warn: (...args: any[]) => loggerMock.warn(...args),
  },
}));

const queryMock = jest.fn();
jest.mock('~/infra/database/DatabaseConnection', () => ({
  DatabaseConnection: { getInstance: () => ({ query: queryMock }) },
}));

jest.mock('node:timers/promises', () => ({
  setTimeout: jest.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
  loggerMock.error.mockClear();
  loggerMock.debug.mockClear();
  queryMock.mockReset();
});

function makeSentinel(provider: any) {
  class TestSentinel extends L1ReorgSentinel {
    protected createProvider() {
      return provider;
    }
  }
  return new TestSentinel();
}

describe('L1ReorgSentinel', () => {
  it('does not log an error when stored hashes match canonical', async () => {
    queryMock.mockResolvedValue([
      { block_height: 100, stored_hash: '0xaaa', contract_hash: '0xc1' },
      { block_height: 101, stored_hash: '0xbbb', contract_hash: '0xc1' },
    ]);
    const provider = {
      getBlock: jest.fn(async (n: number) => ({
        number: n,
        hash: n === 100 ? '0xaaa' : '0xbbb',
      })),
    };

    await makeSentinel(provider).checkOnce();

    expect(loggerMock.error).not.toHaveBeenCalled();
  });

  it('logs a structured error when a stored hash diverges from canonical', async () => {
    queryMock.mockResolvedValue([
      {
        block_height: 200,
        stored_hash: '0xstale',
        contract_hash: '0xcontract',
      },
    ]);
    const provider = {
      getBlock: jest.fn(async () => ({ number: 200, hash: '0xcanonical' })),
    };

    await makeSentinel(provider).checkOnce();

    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    const [tag, message, payload] = loggerMock.error.mock.calls[0];
    expect(tag).toBe('L1ReorgSentinel');
    expect(message).toBe('Reorg detected');
    expect(payload).toEqual({
      block_height: 200,
      stored_hash: '0xstale',
      canonical_hash: '0xcanonical',
      contract_hash: '0xcontract',
    });
  });

  it('logs a debug line and does not throw when the provider errors', async () => {
    queryMock.mockResolvedValue([
      { block_height: 300, stored_hash: '0xaaa', contract_hash: '0xc1' },
    ]);
    const provider = {
      getBlock: jest.fn().mockRejectedValue(new Error('rpc failed')),
    };

    await expect(makeSentinel(provider).checkOnce()).resolves.not.toThrow();
    expect(loggerMock.debug).toHaveBeenCalled();
  });
});
