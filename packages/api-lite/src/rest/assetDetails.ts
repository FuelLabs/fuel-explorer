import { ValidationError } from '../errors';
import type { AssetDetails } from '../fuelcore/AssetDetailsClient';
import type { AppContext } from '../graphql/context';
import {
  type VerifiedAsset,
  findExactMatch,
  loadVerifiedAssets,
} from '../graphql/resolvers/assetEnrich';

const ASSET_ID_RE = /^0x[0-9a-fA-F]{64}$/;

export async function buildAssetDetails(
  rawRef: string,
  ctx: Pick<AppContext, 'chain'>,
  client: { get: (symbol: string) => Promise<AssetDetails | null> },
  verified?: VerifiedAsset[],
): Promise<AssetDetails | null> {
  let ref: string;
  try {
    ref = decodeURIComponent(rawRef);
  } catch {
    throw new ValidationError('Invalid asset symbol');
  }

  if (!ASSET_ID_RE.test(ref)) return client.get(ref);

  if (ref.toLowerCase() === ctx.chain.baseAssetId.toLowerCase()) {
    return client.get('ETH');
  }
  const registry = verified ?? (await loadVerifiedAssets());
  const symbol = findExactMatch(registry, ctx.chain.chainId, ref)?.asset.symbol;
  return symbol ? client.get(symbol) : null;
}
