import type VerifiedAssets from '~/infra/cache/VerifiedAssets';
import type { Index } from '../index/Index';

// The registry only carries contractId/subId on a "fuel" network entry for an
// SRC20 asset minted by a contract (e.g. the universal-wrapper tokens) --
// bridged base-layer assets like ETH have neither, so they're skipped here
// and served instead by the asset(assetId) resolver's registry-exact-match
// fallback (see assetEnrich.resolveAsset).
export function seedableAssets(
  registry: unknown[],
  chainId: number,
): { assetId: string; contractId: string; subId: string }[] {
  const out: { assetId: string; contractId: string; subId: string }[] = [];
  for (const asset of registry as {
    networks?: {
      type?: string;
      chainId?: number;
      assetId?: string;
      contractId?: string;
      subId?: string;
    }[];
  }[]) {
    for (const network of asset.networks ?? []) {
      if (
        network.type === 'fuel' &&
        network.chainId === chainId &&
        network.assetId &&
        network.contractId &&
        network.subId
      ) {
        out.push({
          assetId: network.assetId,
          contractId: network.contractId,
          subId: network.subId,
        });
      }
    }
  }
  return out;
}

// Backfills every registry-known SRC20 asset for this chain into the local
// assets table at boot, ahead of ever observing its MINT receipt live, so
// assetsByContract/asset can serve contracts deployed before this process
// started (row 13 in the parity report). INSERT OR IGNORE, so this only
// fills gaps -- it never overwrites an asset already recorded from a real
// MINT receipt.
export async function seedVerifiedAssets(
  index: Pick<Index, 'seedAsset'>,
  verifiedAssets: Pick<VerifiedAssets, 'fetch'>,
  chainId: number,
): Promise<number> {
  let registry: unknown[] = [];
  try {
    registry = (await verifiedAssets.fetch()) ?? [];
  } catch {
    return 0;
  }
  const seedable = seedableAssets(registry, chainId);
  for (const a of seedable) index.seedAsset(a.assetId, a.contractId, a.subId);
  return seedable.length;
}
