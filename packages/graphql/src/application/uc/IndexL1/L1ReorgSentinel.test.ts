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
  loggerMock.warn.mockClear();
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
    // Alert prefix must be present so log-routing tooling can key on it.
    expect(message).toMatch(/\[L1_REORG_ALERT\]/);
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

  it('warns when the provider returns no canonical block for a height we have stored rows for', async () => {
    queryMock.mockResolvedValue([
      { block_height: 400, stored_hash: '0xsomething', contract_hash: '0xc1' },
    ]);
    const provider = {
      getBlock: jest.fn().mockResolvedValue(null),
    };

    await makeSentinel(provider).checkOnce();

    expect(loggerMock.warn).toHaveBeenCalledTimes(1);
    const [tag, message] = loggerMock.warn.mock.calls[0];
    expect(tag).toBe('L1ReorgSentinel');
    expect(message).toMatch(/no block at finalized-depth height 400/);
    expect(loggerMock.error).not.toHaveBeenCalled();
  });

  it('samples per contract (not just globally) so a busy contract cannot monopolize the window', async () => {
    // Verify the SQL takes a per-contract partition approach (row_number() OVER partition).
    queryMock.mockResolvedValue([]);
    const provider = { getBlock: jest.fn() };
    await makeSentinel(provider).checkOnce();
    expect(queryMock).toHaveBeenCalledTimes(1);
    const sql = queryMock.mock.calls[0][0] as string;
    expect(sql).toMatch(/partition by [\w.]*contract_hash/i);
    expect(sql).toMatch(/row_number\(\)/i);
  });

  it('scopes the sample to active contracts for the current network', async () => {
    queryMock.mockResolvedValue([]);
    const provider = { getBlock: jest.fn() };
    await makeSentinel(provider).checkOnce();
    const sql = queryMock.mock.calls[0][0] as string;
    const params = queryMock.mock.calls[0][1] as unknown[];
    expect(sql).toMatch(/indexer\.contract_l1_index/);
    expect(sql).toMatch(/status = 'active'/);
    expect(sql).toMatch(/network = \$1/);
    // First param must be the current FUEL_CHAIN — mocked to 'mainnet'.
    expect(params[0]).toBe('mainnet');
  });
});
