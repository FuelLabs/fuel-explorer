import VerifiedAssets from '~/infra/cache/VerifiedAssets';
import { stubResolvers } from './stubs';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const CHAIN_ID = 0;

const UW_FUEL = {
  name: 'uwFUEL',
  symbol: 'uwFUEL',
  icon: 'https://verified-assets.fuel.network/images/fuel.svg',
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
};
// Mainnet-only registry entry, no testnet network row -- the real uwXAUT shape.
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

function fakeCtx(overrides: Record<string, unknown> = {}) {
  return {
    chain: { chainId: CHAIN_ID, baseAssetId: hex(0) },
    index: {
      asset: () => null,
      assetsByContract: () => [],
      countByContract: () => 0,
    },
    client: { assetDetails: async () => null },
    ...overrides,
  } as any;
}

describe('stub resolvers: asset and assetsByContract', () => {
  const original = (VerifiedAssets as any).instance;
  afterEach(() => {
    (VerifiedAssets as any).instance = original;
  });

  function withRegistry(assets: unknown[]) {
    (VerifiedAssets as any).instance = { fetch: async () => assets };
  }

  it('asset falls back to fuel-core and never returns null for an asset fuel-core knows', async () => {
    withRegistry([]);
    const ctx = fakeCtx({
      client: {
        assetDetails: async () => ({
          contractId: hex(10),
          subId: hex(100),
          totalSupply: '1',
        }),
      },
    });
    const result = await stubResolvers.Query.asset(
      null,
      { assetId: hex(1) },
      ctx,
    );
    expect(result).not.toBeNull();
    expect(result).toMatchObject({ contractId: hex(10), subId: hex(100) });
  });

  it('asset enriches name/symbol/decimals/verified from the registry on an exact match', async () => {
    withRegistry([UW_FUEL]);
    const ctx = fakeCtx({
      index: { asset: () => ({ contractId: hex(10), subId: hex(100) }) },
    });
    const result = await stubResolvers.Query.asset(
      null,
      { assetId: hex(1) },
      ctx,
    );
    expect(result).toMatchObject({
      name: 'uwFUEL',
      symbol: 'uwFUEL',
      decimals: 9,
      verified: true,
      suspicious: false,
    });
  });

  it('assetsByContract reproduces the uwXAUT suspicious:true finding from raw row 17', async () => {
    withRegistry([UW_XAUT]);
    const ctx = fakeCtx({
      index: {
        assetsByContract: () => [
          { assetId: hex(3), subId: hex(200), height: 100 },
        ],
        countByContract: () => 1,
      },
    });
    const result = await stubResolvers.Query.assetsByContract(
      null,
      { contractId: hex(12), first: 10 },
      ctx,
    );
    expect(result.nodes[0]).toMatchObject({
      assetId: hex(3),
      suspicious: true,
      verified: false,
    });
  });

  it('assetsByContract does not flag an asset with no registry relationship at all', async () => {
    withRegistry([UW_XAUT]);
    const ctx = fakeCtx({
      index: {
        assetsByContract: () => [
          { assetId: hex(4), subId: hex(999), height: 100 },
        ],
        countByContract: () => 1,
      },
    });
    const result = await stubResolvers.Query.assetsByContract(
      null,
      { contractId: hex(12), first: 10 },
      ctx,
    );
    expect(result.nodes[0]).toMatchObject({
      suspicious: false,
      verified: false,
    });
  });

  it('assetsByContract reports real totalCount/startCount/endCount instead of null', async () => {
    withRegistry([]);
    const rows = Array.from({ length: 5 }, (_, i) => ({
      assetId: hex(20 + i),
      subId: hex(200 + i),
      height: 100 + i,
    }));
    const ctx = fakeCtx({
      index: {
        assetsByContract: () => rows,
        countByContract: () => rows.length,
      },
    });
    const first = await stubResolvers.Query.assetsByContract(
      null,
      { contractId: hex(12), first: 2 },
      ctx,
    );
    expect(first.pageInfo).toMatchObject({
      totalCount: 5,
      startCount: 1,
      endCount: 2,
      hasNextPage: false,
      hasPreviousPage: true,
    });
    const next = await stubResolvers.Query.assetsByContract(
      null,
      { contractId: hex(12), first: 2, before: first.pageInfo.endCursor },
      ctx,
    );
    expect(next.nodes.map((n: any) => n.assetId)).toEqual([hex(22), hex(23)]);
    expect(next.pageInfo).toMatchObject({ startCount: 3, endCount: 4 });
  });

  it('assetsByContract returns an empty connection with a zero totalCount when the contract has no assets', async () => {
    withRegistry([]);
    const result = await stubResolvers.Query.assetsByContract(
      null,
      { contractId: hex(12), first: 10 },
      fakeCtx(),
    );
    expect(result.nodes).toEqual([]);
    expect(result.pageInfo.totalCount).toBe(0);
  });
});
