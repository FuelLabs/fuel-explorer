import { HotKeys } from './hot/HotKeys';
import { Index } from './index/Index';
import { createApp } from './server';

function fakeCtx(overrides: Partial<Parameters<typeof createApp>[0]> = {}) {
  const index = new Index(':memory:');
  return {
    store: {} as any,
    index,
    tip: { servedTip: 5, fuelCoreTip: 5, fuelCoreUp: true } as any,
    client: {} as any,
    chain: { chainId: 0, baseAssetId: '0x00' },
    price: {} as any,
    hot: new HotKeys(':memory:'),
    ...overrides,
  };
}

describe('createApp health()', () => {
  it('reports the configured block source', () => {
    const { health } = createApp(fakeCtx({ blockSource: 'rpc' }));
    expect(health().blockSource).toBe('rpc');
  });

  it('defaults blockSource to s3 when not provided', () => {
    const { health } = createApp(fakeCtx());
    expect(health().blockSource).toBe('s3');
  });

  it('reports hot key counts per kind', () => {
    const hot = new HotKeys(':memory:');
    hot.hit('account', '0x1');
    hot.hit('tx', '0x1');
    hot.hit('tx', '0x2');
    hot.flush();
    const { health } = createApp(fakeCtx({ hot }));
    expect(health().hot).toEqual({ accounts: 1, txs: 2, blocks: 0 });
  });
});

describe('createApp maskedErrors', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  async function queryPredicateWithThrowingIndex() {
    const throwingIndex = {
      predicate: () => {
        throw new Error('leaked-secret-detail');
      },
    } as any;
    const { yoga } = createApp(fakeCtx({ index: throwingIndex }));
    const res = await yoga.fetch('http://x/graphql', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: '{ predicate(address: "0x00") { address } }',
      }),
    });
    return res.json();
  }

  it('does not leak the original resolver error message in production', async () => {
    process.env.NODE_ENV = 'production';
    const json = await queryPredicateWithThrowingIndex();
    expect(JSON.stringify(json.errors)).not.toContain('leaked-secret-detail');
  });

  it('surfaces the original resolver error message outside production', async () => {
    process.env.NODE_ENV = 'test';
    const json = await queryPredicateWithThrowingIndex();
    expect(JSON.stringify(json.errors)).toContain('leaked-secret-detail');
  });
});
