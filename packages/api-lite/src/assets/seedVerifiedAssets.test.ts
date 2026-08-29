import { seedVerifiedAssets, seedableAssets } from './seedVerifiedAssets';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const TESTNET = 0;
const MAINNET = 9889;

// Shapes copied from the real verified-assets.fuel.network registry entries
// captured for the parity report (uwFUEL has both a testnet and a mainnet
// network row; uwXAUT has mainnet only -- no testnet contractId/subId to seed).
const ETH = {
  name: 'Ethereum',
  symbol: 'ETH',
  networks: [
    { type: 'ethereum', chainId: 11155111, decimals: 18 },
    { type: 'fuel', chainId: TESTNET, assetId: hex(0), decimals: 9 },
    { type: 'fuel', chainId: MAINNET, assetId: hex(0), decimals: 9 },
  ],
};
const UW_FUEL = {
  name: 'uwFUEL',
  symbol: 'uwFUEL',
  networks: [
    {
      type: 'fuel',
      chainId: TESTNET,
      assetId: hex(1),
      contractId: hex(10),
      subId: hex(100),
      decimals: 9,
    },
    {
      type: 'fuel',
      chainId: MAINNET,
      assetId: hex(2),
      contractId: hex(11),
      subId: hex(100),
      decimals: 9,
    },
  ],
};
const UW_XAUT = {
  name: 'Universal Wrapped XAUT',
  symbol: 'uwXAUT',
  networks: [
    {
      type: 'fuel',
      chainId: MAINNET,
      assetId: hex(3),
      contractId: hex(12),
      subId: hex(200),
      decimals: 9,
    },
  ],
};
const REGISTRY = [ETH, UW_FUEL, UW_XAUT];

describe('seedableAssets', () => {
  it('skips ETH: the registry has no contractId/subId for a bridged base asset', () => {
    expect(seedableAssets(REGISTRY, TESTNET)).toEqual([
      { assetId: hex(1), contractId: hex(10), subId: hex(100) },
    ]);
  });

  it('skips uwXAUT on testnet: the registry only lists a mainnet network row', () => {
    const seeded = seedableAssets(REGISTRY, TESTNET);
    expect(seeded.find((a) => a.assetId === hex(3))).toBeUndefined();
  });

  it('seeds both uwFUEL and uwXAUT on mainnet, where the registry lists both', () => {
    expect(seedableAssets(REGISTRY, MAINNET)).toEqual([
      { assetId: hex(2), contractId: hex(11), subId: hex(100) },
      { assetId: hex(3), contractId: hex(12), subId: hex(200) },
    ]);
  });

  it('is empty for a chain the registry has no fuel network rows for', () => {
    expect(seedableAssets(REGISTRY, 999)).toEqual([]);
  });
});

describe('seedVerifiedAssets', () => {
  it('seeds every seedable asset via index.seedAsset and returns the count', async () => {
    const seeded: [string, string, string][] = [];
    const index = {
      seedAsset: (a: string, c: string, s: string) => seeded.push([a, c, s]),
    };
    const verifiedAssets = { fetch: async () => REGISTRY };
    const count = await seedVerifiedAssets(index, verifiedAssets, TESTNET);
    expect(count).toBe(1);
    expect(seeded).toEqual([[hex(1), hex(10), hex(100)]]);
  });

  it('returns 0 without throwing when the registry is unreachable', async () => {
    const index = { seedAsset: jest.fn() };
    const verifiedAssets = {
      fetch: async () => {
        throw new Error('network down');
      },
    };
    await expect(
      seedVerifiedAssets(index, verifiedAssets, TESTNET),
    ).resolves.toBe(0);
    expect(index.seedAsset).not.toHaveBeenCalled();
  });

  // A DB error here must reject (not swallow) so main.ts's .catch is the one
  // thing standing between it and an unhandled rejection at boot.
  it('rejects when index.seedAsset throws, instead of swallowing the error', async () => {
    const index = {
      seedAsset: () => {
        throw new Error('database is locked');
      },
    };
    const verifiedAssets = { fetch: async () => REGISTRY };
    await expect(
      seedVerifiedAssets(index, verifiedAssets, TESTNET),
    ).rejects.toThrow('database is locked');
  });
});
