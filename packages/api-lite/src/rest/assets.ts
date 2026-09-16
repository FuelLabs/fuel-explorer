import { type NftMetadata, collectionFor } from '../assets/NftMetadata';
import { ValidationError } from '../errors';
import type { AppContext } from '../graphql/context';
import {
  type VerifiedAsset,
  findExactMatch,
  loadVerifiedAssets,
  resolveAsset,
} from '../graphql/resolvers/assetEnrich';

const ASSET_ID_RE = /^0x[0-9a-fA-F]{64}$/;

// fuels-wallet gives up on this endpoint after 2s, so a slow IPFS gateway
// can't hold the response past this; the fetch finishes into the cache for
// the wallet's next lookup.
const NFT_METADATA_WAIT_MS = 1000;

type AssetCtx = Pick<AppContext, 'chain' | 'index' | 'client' | 'price'>;

async function withinWait<T>(
  promise: Promise<T>,
  ms: number,
): Promise<T | null> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

// Body for GET /assets/:assetId, the lookup fuels-wallet makes against
// explorer-indexer-{mainnet,testnet}.fuel.network for names, icons, NFT
// metadata and the USD `rate`. Mirrors the retired indexer's
// AssetGateway.getAsset response, minus on-chain SRC20/SRC7 metadata, which
// api-lite doesn't decode. `rate` is only known for ETH, the one price
// PriceClient fetches.
export async function buildAssetBody(
  assetId: string,
  ctx: AssetCtx,
  nft: Pick<NftMetadata, 'get'>,
  verified?: VerifiedAsset[],
): Promise<Record<string, unknown> | null> {
  if (!ASSET_ID_RE.test(assetId)) {
    throw new ValidationError('Invalid asset id, expected a 0x-prefixed b256');
  }
  const registry = verified ?? (await loadVerifiedAssets());
  const asset = await resolveAsset(assetId, ctx, registry);
  if (!asset) return null;
  const match = findExactMatch(registry, ctx.chain.chainId, assetId);

  const contractId = asset.contractId as string | null;
  const subId = asset.subId as string | null;
  const details = contractId ? await ctx.client.assetDetails(assetId) : null;
  const totalSupply = details?.totalSupply ?? null;
  const decimals = asset.decimals as number | null;
  const isNFT =
    !!contractId &&
    (decimals === null || decimals === 0) &&
    totalSupply === '1';

  const isEth =
    assetId.toLowerCase() === ctx.chain.baseAssetId.toLowerCase() ||
    asset.symbol === 'ETH';
  const rate = isEth ? await ctx.price.usd() : null;

  const collection = collectionFor(contractId);
  const metadata =
    collection && contractId && subId
      ? await withinWait(nft.get(contractId, subId), NFT_METADATA_WAIT_MS)
      : null;

  const { __typename: _, ...fields } = asset;
  return {
    ...fields,
    networks: match?.asset.networks ?? [],
    totalSupply,
    isNFT,
    collection,
    metadata: metadata ?? {},
    rate,
  };
}
