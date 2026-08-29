import {
  amountInUsd,
  findExactMatch,
  isImpersonating,
  resolveAsset,
} from './assetEnrich';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const CHAIN_ID = 0;
const BASE_ASSET = hex(0);

const ETH = {
  name: 'Ethereum',
  symbol: 'ETH',
  icon: 'https://verified-assets.fuel.network/images/eth.svg',
  networks: [{ type: 'fuel', chainId: 0, assetId: BASE_ASSET, decimals: 9 }],
};
const UW_FUEL = {
  name: 'uwFUEL',
  symbol: 'uwFUEL',
  icon: 'https://verified-assets.fuel.network/images/fuel.svg',
  networks: [
    {
      type: 'fuel',
      chainId: 0,
      assetId: hex(1),
      contractId: hex(10),
      subId: hex(100),
      decimals: 9,
    },
    {
      type: 'fuel',
      chainId: 9889,
      assetId: hex(2),
      contractId: hex(11),
      subId: hex(100),
      decimals: 9,
    },
  ],
};
// Registered only on mainnet, matching the real uwXAUT registry entry -- no
// testnet network row.
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
const REGISTRY = [ETH, UW_FUEL, UW_XAUT];

describe('findExactMatch', () => {
  it('matches by chainId + assetId on a fuel network entry', () => {
    const m = findExactMatch(REGISTRY, CHAIN_ID, hex(1));
    expect(m?.asset.symbol).toBe('uwFUEL');
    expect(m?.network.decimals).toBe(9);
  });

  it('returns null when no fuel network entry matches this chain', () => {
    expect(findExactMatch(REGISTRY, CHAIN_ID, hex(3))).toBeNull();
  });

  it('returns null for an assetId not present anywhere in the registry', () => {
    expect(findExactMatch(REGISTRY, CHAIN_ID, hex(999))).toBeNull();
  });
});

describe('isImpersonating', () => {
  it('is true when the subId matches a registry asset on a different chain', () => {
    // uwXAUT's testnet mint reuses the mainnet subId (0x...200) under a
    // different (testnet-only) contract -- the real row-17 case.
    expect(isImpersonating(REGISTRY, hex(200))).toBe(true);
  });

  it('is false for a subId that matches nothing in the registry', () => {
    expect(isImpersonating(REGISTRY, hex(999))).toBe(false);
  });

  it('is false when subId is null', () => {
    expect(isImpersonating(REGISTRY, null)).toBe(false);
  });
});

describe('amountInUsd', () => {
  // Synchronous and takes an already-resolved `usd` price -- callers that
  // enrich a whole list of nodes fetch the price once and pass it in, rather
  // than each node re-awaiting ctx.price.usd() in a per-node loop.

  it('formats the base asset amount using the live ETH price', () => {
    const out = amountInUsd(BASE_ASSET, 2437.5, BASE_ASSET, '629535219', 9);
    expect(out).toBe('$1,534.49');
  });

  it('is null for a non-base asset regardless of price', () => {
    expect(amountInUsd(BASE_ASSET, 2000, hex(1), '1000000000', 9)).toBeNull();
  });

  it('is null when the price is unavailable', () => {
    expect(amountInUsd(BASE_ASSET, null, BASE_ASSET, '1', 9)).toBeNull();
  });

  it('is "$0" (not null) for a zero amount when a price is available', () => {
    expect(amountInUsd(BASE_ASSET, 2000, BASE_ASSET, '0', 9)).toBe('$0');
  });

  it('matches the base asset regardless of hex casing (mirrors transactions.ts)', () => {
    const lowerBase = hex(0xabc123);
    const upper = `0x${lowerBase.slice(2).toUpperCase()}`;
    const out = amountInUsd(lowerBase, 2000, upper, '1000000000', 9);
    expect(out).toBe('$2,000.00');
  });

  it('falls back to 9 decimals when decimals is unknown', () => {
    const withDecimals = amountInUsd(
      BASE_ASSET,
      2000,
      BASE_ASSET,
      '1000000000',
      9,
    );
    const withoutDecimals = amountInUsd(
      BASE_ASSET,
      2000,
      BASE_ASSET,
      '1000000000',
      null,
    );
    expect(withoutDecimals).toBe(withDecimals);
  });
});

describe('resolveAsset', () => {
  function ctx(overrides: Record<string, unknown> = {}) {
    return {
      chain: { chainId: CHAIN_ID, baseAssetId: BASE_ASSET },
      index: { asset: () => null },
      client: { assetDetails: async () => null },
      ...overrides,
    } as any;
  }

  it('returns null when the index, fuel-core and registry all miss', async () => {
    expect(await resolveAsset(hex(999), ctx(), [])).toBeNull();
  });

  it('serves a local-index hit, enriched from the registry', async () => {
    const found = await resolveAsset(
      hex(1),
      ctx({
        index: { asset: () => ({ contractId: hex(10), subId: hex(100) }) },
      }),
      REGISTRY,
    );
    expect(found).toMatchObject({
      assetId: hex(1),
      contractId: hex(10),
      subId: hex(100),
      name: 'uwFUEL',
      symbol: 'uwFUEL',
      decimals: 9,
      verified: true,
      suspicious: false,
    });
  });

  it('falls back to fuel-core assetDetails on an index miss (a mint older than the retained window)', async () => {
    const found = await resolveAsset(
      hex(1),
      ctx({
        client: {
          assetDetails: async () => ({
            contractId: hex(10),
            subId: hex(100),
            totalSupply: '1',
          }),
        },
      }),
      REGISTRY,
    );
    expect(found).toMatchObject({
      contractId: hex(10),
      subId: hex(100),
      name: 'uwFUEL',
      verified: true,
    });
  });

  it('serves the base asset from the registry even though fuel-core has no mint record for it', async () => {
    const found = await resolveAsset(BASE_ASSET, ctx(), REGISTRY);
    expect(found).toMatchObject({
      assetId: BASE_ASSET,
      contractId: null,
      subId: null,
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 9,
      verified: true,
      suspicious: false,
    });
  });

  it('flags suspicious for a fuel-core-known asset sharing subId with a registry asset on another chain', async () => {
    const found = await resolveAsset(
      hex(3),
      ctx({
        client: {
          assetDetails: async () => ({
            contractId: hex(99),
            subId: hex(200),
            totalSupply: '1',
          }),
        },
      }),
      REGISTRY,
    );
    expect(found).toMatchObject({
      contractId: hex(99),
      subId: hex(200),
      name: null,
      verified: false,
      suspicious: true,
    });
  });

  it('is not suspicious for a fuel-core-known asset with no registry relationship at all', async () => {
    const found = await resolveAsset(
      hex(500),
      ctx({
        client: {
          assetDetails: async () => ({
            contractId: hex(99),
            subId: hex(501),
            totalSupply: '1',
          }),
        },
      }),
      REGISTRY,
    );
    expect(found).toMatchObject({ verified: false, suspicious: false });
  });
});
