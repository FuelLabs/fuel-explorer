import type { PublicClient, WalletClient } from 'viem';
import { Services, store } from '~/store';

import type { AssetsMachineState } from '../machines/assetsMachine';

const selectors = {
  assets: (query?: string) => (state: AssetsMachineState) => {
    if (query) {
      const queriedAssets = state.context.assets?.filter(
        (asset) =>
          asset.symbol?.toLowerCase().startsWith(query.toLowerCase()) ||
          asset.name?.toLowerCase().startsWith(query.toLowerCase())
      );

      return queriedAssets;
    }

    return state.context.assets;
  },
  isLoading: (state: AssetsMachineState) => {
    return state.hasTag('loading');
  },
  isLoadingFaucet: (state: AssetsMachineState) => {
    return state.hasTag('loadingFaucet');
  },
};

type UseAssetParams = {
  assetQuery: string;
};

export const useAssets = (params?: UseAssetParams) => {
  const { assetQuery } = params || {};
  const assetList = store.useSelector(Services.assets, selectors.assets());
  const filteredAssetList = store.useSelector(
    Services.assets,
    selectors.assets(assetQuery)
  );
  const isLoading = store.useSelector(Services.assets, selectors.isLoading);
  const isLoadingFaucet = store.useSelector(
    Services.assets,
    selectors.isLoadingFaucet
  );
  function faucetErc20({
    address,
    walletClient,
    publicClient,
  }: {
    address?: string;
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  }) {
    store.faucetErc20({ address, walletClient, publicClient });
  }

  const isSearchResultsEmpty =
    !!assetList?.length &&
    !filteredAssetList?.length &&
    assetQuery &&
    !isLoading;
  const showAssetList = assetList?.length && !isLoading;

  return {
    assets: filteredAssetList || [],
    handlers: {
      faucetErc20,
    },
    isLoading,
    isLoadingFaucet,
    isSearchResultsEmpty,
    showAssetList,
  };
};
