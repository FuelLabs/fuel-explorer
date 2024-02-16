import type { Ethereum, Fuel } from '@fuels/assets';
import { ETH_CHAIN, FUEL_CHAIN } from '~portal/systems/Chains';

import type { Asset } from '../services';

type Network = Ethereum | Fuel; // Assuming Ethereum and Fuel are your types
export type NetworkTypes = Ethereum['type'] | Fuel['type'];
type NetworkTypeToNetwork<T> = T extends 'ethereum'
  ? Ethereum
  : T extends 'fuel'
    ? Fuel
    : Network;

export type GetAssetNetworkParams<T extends NetworkTypes | undefined> = {
  asset: Asset;
  chainId: number;
  networkType?: T;
};

export const getAssetNetwork = <T extends NetworkTypes | undefined>({
  asset,
  chainId,
  networkType,
}: GetAssetNetworkParams<T>): NetworkTypeToNetwork<T> => {
  const network = asset.networks.find(
    (network) => network.chainId === chainId && network.type === networkType,
  ) as NetworkTypeToNetwork<T>;

  return network;
};

export type AssetEth = Omit<Asset, 'networks'> & Ethereum;
export type AssetFuel = Omit<Asset, 'networks'> & Fuel;

export const getAssetEth = (asset: Asset): AssetEth => {
  const { networks: _, ...assetRest } = asset;
  const assetNetwork = getAssetNetwork({
    asset,
    chainId: ETH_CHAIN.id,
    networkType: 'ethereum',
  });

  return {
    ...assetRest,
    ...assetNetwork,
  };
};

export const getAssetFuel = (asset: Asset): AssetFuel => {
  const { networks: _, ...assetRest } = asset;
  const assetNetwork = getAssetNetwork({
    asset,
    chainId: FUEL_CHAIN.id,
    networkType: 'fuel',
  });

  return {
    ...assetRest,
    ...assetNetwork,
  };
};
