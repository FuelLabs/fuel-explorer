import type { HexAddress } from 'app-commons';
import type { Asset } from 'fuels';

export interface AlchemyAssetBalance {
  assetId: HexAddress | undefined; // ETH has no assetId
  amount: bigint;
  decimals: number;
}

export interface FilteredAsset extends Asset {
  balance: string | undefined;
}
