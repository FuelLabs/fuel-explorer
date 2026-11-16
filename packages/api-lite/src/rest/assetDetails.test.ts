import { ValidationError } from '../errors';
import type { VerifiedAsset } from '../graphql/resolvers/assetEnrich';
import { buildAssetDetails } from './assetDetails';

const BASE = `0x${'f8'.repeat(32)}`;
const USDC_ID = `0x${'28'.repeat(32)}`;
const chain = { chainId: 9889, baseAssetId: BASE };

const registry: VerifiedAsset[] = [
  {
    name: 'USD Coin',
    symbol: 'USDC',
    icon: null,
    networks: [{ type: 'fuel', chainId: 9889, assetId: USDC_ID, decimals: 6 }],
  },
];

function client() {
  return { get: jest.fn().mockResolvedValue({ market_cap: 1 }) };
}

describe('buildAssetDetails', () => {
  it('passes a symbol straight through, as o2 sends it', async () => {
    const c = client();
    await buildAssetDetails('USDC', { chain }, c, registry);
    expect(c.get).toHaveBeenCalledWith('USDC');
  });

  it('decodes url-encoded symbols', async () => {
    const c = client();
    await buildAssetDetails('Mantle%20mETH', { chain }, c, registry);
    expect(c.get).toHaveBeenCalledWith('Mantle mETH');
  });

  it('resolves the base asset id to ETH', async () => {
    const c = client();
    await buildAssetDetails(
      BASE.toUpperCase().replace('0X', '0x'),
      { chain },
      c,
      registry,
    );
    expect(c.get).toHaveBeenCalledWith('ETH');
  });

  it('resolves a verified asset id to its symbol', async () => {
    const c = client();
    await buildAssetDetails(USDC_ID, { chain }, c, registry);
    expect(c.get).toHaveBeenCalledWith('USDC');
  });

  it('returns null for an unverified asset id without asking the client', async () => {
    const c = client();
    expect(
      await buildAssetDetails(`0x${'ab'.repeat(32)}`, { chain }, c, registry),
    ).toBeNull();
    expect(c.get).not.toHaveBeenCalled();
  });

  it('does not match an asset id registered on another chain', async () => {
    const c = client();
    expect(
      await buildAssetDetails(
        USDC_ID,
        { chain: { ...chain, chainId: 0 } },
        c,
        registry,
      ),
    ).toBeNull();
  });

  it('rejects malformed percent-encoding with a ValidationError', async () => {
    await expect(
      buildAssetDetails('%E0', { chain }, client(), registry),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
