import VerifiedAssets from '~/infra/cache/VerifiedAssets';
import { convertToUsd } from '~/infra/dao/utils';
import type { AppContext } from '../context';

export type VerifiedNetwork = {
  type: string;
  chainId: number;
  assetId?: string;
  contractId?: string;
  subId?: string;
  decimals: number;
};
export type VerifiedAsset = {
  name: string;
  symbol: string;
  icon: string | null;
  networks: VerifiedNetwork[];
};
export type VerifiedMatch = { asset: VerifiedAsset; network: VerifiedNetwork };

export async function loadVerifiedAssets(): Promise<VerifiedAsset[]> {
  try {
    return (await VerifiedAssets.getInstance().fetch()) ?? [];
  } catch {
    return [];
  }
}

export function findExactMatch(
  verified: VerifiedAsset[],
  chainId: number,
  assetId: string,
): VerifiedMatch | null {
  const target = assetId.toLowerCase();
  for (const asset of verified) {
    const network = (asset.networks ?? []).find(
      (n) =>
        n.type === 'fuel' &&
        n.chainId === chainId &&
        n.assetId?.toLowerCase() === target,
    );
    if (network) return { asset, network };
  }
  return null;
}

// Production (AssetGateway.getAsset) flags `suspicious` by comparing the
// asset's already-decoded on-chain name/symbol against the registry.
// api-lite's index doesn't decode on-chain SRC20 metadata, so it uses the one
// signal it does have: an asset whose subId matches a registry asset's subId
// on some OTHER chain is very likely the same wrapped token minted under an
// unverified (or not-yet-registered) contract for this chain -- the uwXAUT
// case in the parity report (mainnet-only registry entry, testnet mint reuses
// its subId). This diverges from production only for the practically
// negligible case of an unrelated asset colliding on a 32-byte subId by pure
// chance.
export function isImpersonating(
  verified: VerifiedAsset[],
  subId: string | null,
): boolean {
  if (!subId) return false;
  const target = subId.toLowerCase();
  return verified.some((asset) =>
    (asset.networks ?? []).some(
      (n) => n.type === 'fuel' && n.subId?.toLowerCase() === target,
    ),
  );
}

// Synchronous and takes an already-resolved `usd` price: a caller enriching a
// whole list of nodes fetches the price once (outside any per-node loop) and
// passes it in here, instead of every node re-awaiting ctx.price.usd().
export function amountInUsd(
  baseAssetId: string,
  usd: number | null,
  assetId: string,
  amount: string,
  decimals: number | null,
): string | null {
  if (assetId.toLowerCase() !== baseAssetId.toLowerCase()) return null;
  if (!usd) return null;
  return convertToUsd(amount, decimals ?? 9, usd).formatted;
}

export async function resolveAsset(
  assetId: string,
  ctx: Pick<AppContext, 'chain' | 'index' | 'client'>,
  verified: VerifiedAsset[],
): Promise<Record<string, unknown> | null> {
  const local = ctx.index.asset(assetId.toLowerCase());
  let contractId: string | null = local?.contractId ?? null;
  let subId: string | null = local?.subId ?? null;
  let knownByCore = !!local;
  if (!local) {
    const details = await ctx.client.assetDetails(assetId);
    if (details) {
      contractId = details.contractId;
      subId = details.subId;
      knownByCore = true;
    }
  }
  const match = findExactMatch(verified, ctx.chain.chainId, assetId);
  if (!knownByCore && !match) return null;
  if (match) {
    contractId = contractId ?? match.network.contractId ?? null;
    subId = subId ?? match.network.subId ?? null;
  }
  return {
    __typename: 'Asset',
    assetId,
    contractId,
    subId,
    name: match?.asset.name ?? null,
    symbol: match?.asset.symbol ?? null,
    icon: match?.asset.icon ?? null,
    decimals: match?.network.decimals ?? null,
    verified: !!match,
    suspicious: match ? false : isImpersonating(verified, subId),
  };
}
