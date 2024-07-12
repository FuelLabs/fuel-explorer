import type { Asset, NetworkEthereum, NetworkFuel } from '@fuel-ts/account';
import { ETH_CHAIN } from '~portal/systems/Chains';

type Network = NetworkEthereum | NetworkFuel; // Assuming Ethereum and Fuel are your types
export type NetworkTypes = NetworkEthereum['type'] | NetworkFuel['type'];
type NetworkTypeToNetwork<T> = T extends 'ethereum'
  ? NetworkEthereum
  : T extends 'fuel'
    ? NetworkFuel
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

export type AssetEth = Omit<Asset, 'networks'> & NetworkEthereum;
export type AssetFuel = Omit<Asset, 'networks'> & NetworkFuel;

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

export const getAssetFuel = (asset: Asset, chainId = 0): AssetFuel => {
  const { networks: _, ...assetRest } = asset;
  const assetNetwork = getAssetNetwork({
    asset,
    chainId,
    networkType: 'fuel',
  });

  return {
    ...assetRest,
    ...assetNetwork,
  };
};
