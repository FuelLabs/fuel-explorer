import { ETH_CHAIN, FUEL_CHAIN } from 'app-commons';
import {
  type Asset,
  type AssetEth,
  type AssetFuel,
  type NetworkEthereum,
  type NetworkFuel,
  getAssetEth,
  getAssetFuel,
} from 'fuels';
import type { WalletClient } from 'viem';

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

export const getAssetEthCurrentChain = (asset: Asset): AssetEth => {
  const { networks: _, ...assetRest } = asset;
  const UNKNOWN_ETH_NETWORK_ASSET: NetworkEthereum = {
    type: 'ethereum',
    chainId: ETH_CHAIN.id,
    decimals: 18,
  };
  const assetNetwork: NetworkEthereum =
    getAssetEth(asset, ETH_CHAIN.id) || UNKNOWN_ETH_NETWORK_ASSET;

  return {
    ...assetRest,
    ...assetNetwork,
  };
};

export const switchEthAssetNetworkIfNeeded = async (
  asset: Asset | undefined,
  walletClient: WalletClient | undefined,
) => {
  if (!asset) throw new Error('Asset required to check network');
  if (!walletClient) throw new Error('WalletClient required to check network');

  const expectedChainId = getAssetEthCurrentChain(asset).chainId;
  const walletChainId = await walletClient.getChainId();
  if (expectedChainId !== walletChainId) {
    await walletClient.switchChain({ id: expectedChainId });
  }
};

export const getAssetFuelCurrentChain = (asset: Asset): AssetFuel => {
  const { networks: _, ...assetRest } = asset;
  const UNKNOWN_FUEL_NETWORK_ASSET: NetworkFuel = {
    type: 'fuel',
    chainId: FUEL_CHAIN.id,
    decimals: 0,
    assetId: '',
  };
  const assetNetwork =
    getAssetFuel(asset, FUEL_CHAIN.id) || UNKNOWN_FUEL_NETWORK_ASSET;

  return {
    ...assetRest,
    ...assetNetwork,
  };
};
