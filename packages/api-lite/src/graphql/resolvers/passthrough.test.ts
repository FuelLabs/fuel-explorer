import VerifiedAssets from '~/infra/cache/VerifiedAssets';
import { passthroughResolvers } from './passthrough';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const CHAIN_ID = 0;
const BASE_ASSET = hex(0);

// Mainnet-only registry entry, no testnet network row -- the real uwXAUT shape
// from raw row 17 (packages/api-lite/../parity/raw/prod_cb.json).
const UW_XAUT = {
  name: 'Universal Wrapped XAUT',
  symbol: 'uwXAUT',
  icon: null,
  networks: [
    {
      type: 'fuel',
      chainId: 9889,
      assetId: hex(3),
      contractId: hex(12),
      subId: hex(200),
      decimals: 9,
    },
  ],
};
const ETH = {
  name: 'Ethereum',
  symbol: 'ETH',
  icon: 'https://verified-assets.fuel.network/images/eth.svg',
  networks: [
    { type: 'fuel', chainId: CHAIN_ID, assetId: BASE_ASSET, decimals: 9 },
  ],
};

function fakeCtx(overrides: Record<string, unknown> = {}) {
  return {
    chain: { chainId: CHAIN_ID, baseAssetId: BASE_ASSET },
    client: {
      query: async () => ({}),
      assetDetails: async () => null,
    },
    price: { usd: async () => 2000 },
    ...overrides,
  } as any;
}

describe('passthrough: balances/contractBalances enrichment', () => {
  const original = (VerifiedAssets as any).instance;
  afterEach(() => {
    (VerifiedAssets as any).instance = original;
  });
  function withRegistry(assets: unknown[]) {
    (VerifiedAssets as any).instance = { fetch: async () => assets };
  }

  it('contractBalances flags suspicious:true for the uwXAUT case from raw row 17', async () => {
    withRegistry([UW_XAUT]);
    const ctx = fakeCtx({
      client: {
        query: async () => ({
          contractBalances: {
            edges: [
              {
                cursor: hex(3),
                node: { amount: '0', assetId: hex(3) },
              },
            ],
          },
        }),
        assetDetails: async () => ({
          contractId: hex(99),
          subId: hex(200),
          totalSupply: '1',
        }),
      },
    });
    const result = await passthroughResolvers.Query.contractBalances(
      null,
      { filter: { contract: hex(99) } },
      ctx,
    );
    expect(result.edges[0].node.suspicious).toBe(true);
    expect(result.edges[0].node.verified).toBeUndefined();
  });

  it('contractBalances does not flag an asset with no registry relationship', async () => {
    withRegistry([UW_XAUT]);
    const ctx = fakeCtx({
      client: {
        query: async () => ({
          contractBalances: {
            edges: [{ cursor: hex(4), node: { amount: '0', assetId: hex(4) } }],
          },
        }),
        assetDetails: async () => ({
          contractId: hex(99),
          subId: hex(999),
          totalSupply: '1',
        }),
      },
    });
    const result = await passthroughResolvers.Query.contractBalances(
      null,
      { filter: { contract: hex(99) } },
      ctx,
    );
    expect(result.edges[0].node.suspicious).toBe(false);
  });

  it('balances amountInUsd is the live-price conversion for the base asset', async () => {
    withRegistry([ETH]);
    const ctx = fakeCtx({
      client: {
        query: async () => ({
          balances: {
            nodes: [{ amount: '629535219', assetId: BASE_ASSET }],
          },
        }),
      },
      price: { usd: async () => 2437.5 },
    });
    const result = await passthroughResolvers.Query.balances(null, {}, ctx);
    expect(result.nodes[0].amountInUsd).toBe('$1,534.49');
  });

  it('balances amountInUsd stays null for a non-base asset even with a registry match', async () => {
    withRegistry([
      {
        name: 'uwFUEL',
        symbol: 'uwFUEL',
        icon: null,
        networks: [
          {
            type: 'fuel',
            chainId: CHAIN_ID,
            assetId: hex(1),
            contractId: hex(10),
            subId: hex(100),
            decimals: 9,
          },
        ],
      },
    ]);
    const ctx = fakeCtx({
      client: {
        query: async () => ({
          balances: { nodes: [{ amount: '1000', assetId: hex(1) }] },
        }),
      },
    });
    const result = await passthroughResolvers.Query.balances(null, {}, ctx);
    expect(result.nodes[0].amountInUsd).toBeNull();
    expect(result.nodes[0].name).toBe('uwFUEL');
  });

  it('balances amountInUsd is null when the price is unavailable', async () => {
    withRegistry([ETH]);
    const ctx = fakeCtx({
      client: {
        query: async () => ({
          balances: { nodes: [{ amount: '1000', assetId: BASE_ASSET }] },
        }),
      },
      price: { usd: async () => null },
    });
    const result = await passthroughResolvers.Query.balances(null, {}, ctx);
    expect(result.nodes[0].amountInUsd).toBeNull();
  });

  it('calls ctx.price.usd() exactly once for a whole page, not once per node', async () => {
    withRegistry([ETH]);
    let priceCalls = 0;
    const nodes = Array.from({ length: 5 }, (_, i) => ({
      amount: '1000',
      assetId: hex(100 + i),
    }));
    const ctx = fakeCtx({
      client: {
        query: async () => ({ balances: { nodes } }),
        assetDetails: async () => null,
      },
      price: {
        usd: async () => {
          priceCalls += 1;
          return 2000;
        },
      },
    });
    await passthroughResolvers.Query.balances(null, {}, ctx);
    expect(priceCalls).toBe(1);
  });

  it('bounds concurrent assetDetails lookups to 20 for a page full of unlisted assets', async () => {
    withRegistry([]);
    let inFlight = 0;
    let maxInFlight = 0;
    const nodes = Array.from({ length: 60 }, (_, i) => ({
      amount: '0',
      assetId: hex(200 + i),
    }));
    const ctx = fakeCtx({
      client: {
        query: async () => ({ contractBalances: { nodes } }),
        assetDetails: async () => {
          inFlight += 1;
          maxInFlight = Math.max(maxInFlight, inFlight);
          await new Promise((resolve) => setTimeout(resolve, 5));
          inFlight -= 1;
          return null;
        },
      },
    });
    const result = await passthroughResolvers.Query.contractBalances(
      null,
      {},
      ctx,
    );
    expect(result.nodes).toHaveLength(60);
    expect(maxInFlight).toBeLessThanOrEqual(20);
    expect(maxInFlight).toBeGreaterThan(1);
  });
});
