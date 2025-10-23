import type { PublicClient, WalletClient } from 'viem';
import { Services, store } from '~portal/store';

import { toast } from '@fuels/ui';
import {
  type Asset,
  type CoinQuantity,
  DECIMAL_WEI,
  type NetworkEthereum,
  type NetworkFuel,
  bn,
} from 'fuels';
import { useMemo } from 'react';
import type { AlchemyAssetBalance } from '~portal/systems/Assets/types';
import {
  getAssetEthCurrentChain,
  getAssetFuelCurrentChain,
} from '~portal/systems/Assets/utils';
import { useFuelAccountConnection } from '~portal/systems/Chains';
import type { AssetsMachineState } from '../machines/assetsMachine';

export const DEFAULT_EMPTY_BALANCE = '0.000';

const selectors = {
  assets:
    (query?: string) =>
    (state: AssetsMachineState): Array<Asset> | undefined => {
      if (query) {
        const queriedAssets = state.context.assets?.filter(
          (asset) =>
            asset.symbol?.toLowerCase().includes(query.toLowerCase()) ||
            asset.name?.toLowerCase().includes(query.toLowerCase()),
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
  balances?: AlchemyAssetBalance[] | CoinQuantity[];
  isEthereumNetwork?: boolean;
};

export const useAssets = (params?: UseAssetParams) => {
  const { assetQuery, balances, isEthereumNetwork } = params || {};

  const {
    handlers: { addAsset: addAssetFuel },
  } = useFuelAccountConnection();
  const assetList = store.useSelector(Services.assets, selectors.assets());
  const filteredAssetList = store.useSelector(
    Services.assets,
    selectors.assets(assetQuery),
  ) as Array<Asset> | undefined;
  const isLoading = store.useSelector(Services.assets, selectors.isLoading);
  const isLoadingFaucet = store.useSelector(
    Services.assets,
    selectors.isLoadingFaucet,
  );

  const orderedAssetsWithBalances = useMemo(() => {
    // Divide and sort by main token (e.g. wstETH -> ETHwst during sorting)
    const getSortKey = (name: string) => {
      const match = name.match(/^(.*)([A-Z])(.*)$/);
      return match
        ? (match[2] ?? '') + (match[3] ?? '') + (match[1] ?? '')
        : name;
    };

    return (
      filteredAssetList
        ?.map((asset) => {
          const balance = balances?.find((balance) =>
            asset.networks.find((network: NetworkFuel | NetworkEthereum) => {
              if (network?.type === 'fuel') {
                const networkData = network as NetworkFuel;
                return networkData.assetId === balance?.assetId;
              }

              return balance && network.address === balance?.assetId;
            }),
          );

          if (!balance)
            return { ...asset, balance: undefined, balanceAmount: undefined };

          const assetChainGetter = isEthereumNetwork
            ? getAssetEthCurrentChain
            : getAssetFuelCurrentChain;
          const decimals = assetChainGetter(asset)?.decimals;

          if (decimals == null)
            return { ...asset, balance: undefined, balanceAmount: undefined };

          const standardizedBalance =
            balance.amount == null || typeof balance.amount === 'bigint'
              ? bn(balance?.amount?.toString() || '0')
              : balance.amount;

          const stringifiedBalance =
            standardizedBalance.format({
              units: decimals,
              precision: 3,
            }) ?? DEFAULT_EMPTY_BALANCE;

          return {
            ...asset,
            balance: stringifiedBalance,
            // Standardizing decimal cases, numeric representation of balance used for ordering
            balanceAmount: bn.parseUnits(stringifiedBalance, DECIMAL_WEI),
            // Warning: This will throw if you try to process amount from a token with more than 18 decimals
          };
        })
        .sort((a, b) => {
          if (a.balanceAmount != null && b.balanceAmount == null) return -1;
          if (a.balanceAmount == null && b.balanceAmount != null) return 1;
          if (b.balanceAmount != null && a.balanceAmount?.gt(b.balanceAmount))
            return -1;
          if (a.balanceAmount != null && b.balanceAmount?.gt(a.balanceAmount))
            return 1;
          // Fallback to sort alphabetically
          return getSortKey(a.name).localeCompare(getSortKey(b.name));
        }) ?? []
    );
  }, [balances, isEthereumNetwork, filteredAssetList]);

  function faucetErc20({
    asset,
    address,
    walletClient,
    publicClient,
  }: {
    asset?: Asset;
    address?: string;
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  }) {
    store.faucetErc20({ address, walletClient, publicClient, asset });
  }

  async function addAssetToWallet(asset: Asset) {
    try {
      await addAssetFuel(asset);
    } catch (_e) {
      toast.error('Failed to add asset to wallet');
    }
  }

  const isSearchResultsEmpty =
    !!assetList?.length &&
    !filteredAssetList?.length &&
    assetQuery &&
    !isLoading;
  const showAssetList = !!assetList?.length;

  return {
    assets: orderedAssetsWithBalances || [],
    handlers: {
      faucetErc20,
      addAssetToWallet,
    },
    isLoading,
    isLoadingFaucet,
    isSearchResultsEmpty,
    showAssetList,
  };
};
