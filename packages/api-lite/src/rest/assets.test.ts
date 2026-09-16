import { ValidationError } from '../errors';
import { buildAssetBody } from './assets';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const CHAIN_ID = 9889;
const BASE_ASSET = hex(0);

const ETH = {
  name: 'Ethereum',
  symbol: 'ETH',
  icon: 'https://verified-assets.fuel.network/images/eth.svg',
  networks: [
    { type: 'fuel', chainId: CHAIN_ID, assetId: BASE_ASSET, decimals: 9 },
  ],
};
const USDC = {
  name: 'USDC',
  symbol: 'USDC',
  icon: 'https://verified-assets.fuel.network/images/usdc.svg',
  networks: [
    {
      type: 'fuel',
      chainId: CHAIN_ID,
      assetId: hex(1),
      contractId: hex(10),
      subId: hex(100),
      decimals: 6,
    },
  ],
};
const REGISTRY = [ETH, USDC];

function ctx(
  opts: {
    local?: Record<string, { contractId: string; subId: string }>;
    totalSupply?: string;
  } = {},
) {
  return {
    chain: { chainId: CHAIN_ID, baseAssetId: BASE_ASSET },
    index: { asset: (id: string) => opts.local?.[id] ?? null },
    client: {
      assetDetails: jest.fn(async (id: string) => {
        const local = opts.local?.[id];
        return local
          ? { ...local, totalSupply: opts.totalSupply ?? '1000' }
          : null;
      }),
    },
    price: { usd: jest.fn(async () => 2500) },
  } as any;
}

const noNft = () => ({ get: jest.fn(async () => null) });
const FUEL_PUMPS =
  '0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c';

describe('buildAssetBody', () => {
  it('rejects a malformed asset id with a ValidationError', async () => {
    await expect(
      buildAssetBody('0x123', ctx(), noNft(), REGISTRY),
    ).rejects.toThrow(ValidationError);
  });

  it('returns null for an asset neither fuel-core nor the registry knows', async () => {
    expect(await buildAssetBody(hex(999), ctx(), noNft(), REGISTRY)).toBeNull();
  });

  it('prices the base asset with the ETH rate and includes its registry networks', async () => {
    const body = await buildAssetBody(BASE_ASSET, ctx(), noNft(), REGISTRY);
    expect(body).toEqual({
      assetId: BASE_ASSET,
      contractId: null,
      subId: null,
      name: 'Ethereum',
      symbol: 'ETH',
      icon: ETH.icon,
      decimals: 9,
      verified: true,
      suspicious: false,
      networks: ETH.networks,
      totalSupply: null,
      isNFT: false,
      collection: null,
      metadata: {},
      rate: 2500,
    });
  });

  it('leaves rate null for a verified non-ETH asset and reports its supply', async () => {
    const c = ctx({
      local: { [hex(1)]: { contractId: hex(10), subId: hex(100) } },
      totalSupply: '5000000',
    });
    const body = await buildAssetBody(hex(1), c, noNft(), REGISTRY);
    expect(body).toMatchObject({
      symbol: 'USDC',
      decimals: 6,
      totalSupply: '5000000',
      isNFT: false,
      rate: null,
    });
    expect(c.price.usd).not.toHaveBeenCalled();
  });

  it('flags an unverified single-supply contract asset as an NFT', async () => {
    const c = ctx({
      local: { [hex(2)]: { contractId: hex(20), subId: hex(200) } },
      totalSupply: '1',
    });
    const body = await buildAssetBody(hex(2), c, noNft(), REGISTRY);
    expect(body).toMatchObject({
      verified: false,
      name: null,
      totalSupply: '1',
      isNFT: true,
      networks: [],
      rate: null,
    });
  });

  it('adds collection metadata for an NFT from a known collection', async () => {
    const c = ctx({
      local: { [hex(3)]: { contractId: FUEL_PUMPS, subId: hex(7) } },
      totalSupply: '1',
    });
    const metadata = { name: 'Fuel Pumps #7', image: 'https://x/7.png' };
    const nft = { get: jest.fn(async () => metadata) };
    const body = await buildAssetBody(hex(3), c, nft, REGISTRY);
    expect(nft.get).toHaveBeenCalledWith(FUEL_PUMPS, hex(7));
    expect(body).toMatchObject({
      isNFT: true,
      collection: 'Fuel Pumps',
      metadata,
    });
  });

  it('answers without metadata when the collection fetch outlasts the wait', async () => {
    jest.useFakeTimers();
    try {
      const c = ctx({
        local: { [hex(3)]: { contractId: FUEL_PUMPS, subId: hex(7) } },
        totalSupply: '1',
      });
      const nft = { get: jest.fn(() => new Promise<null>(() => {})) };
      const pending = buildAssetBody(hex(3), c, nft, REGISTRY);
      await jest.advanceTimersByTimeAsync(1000);
      expect(await pending).toMatchObject({
        isNFT: true,
        collection: 'Fuel Pumps',
        metadata: {},
      });
    } finally {
      jest.useRealTimers();
    }
  });
});
