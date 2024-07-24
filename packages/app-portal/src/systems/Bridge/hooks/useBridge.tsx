import type { BN } from 'fuels';
import { DECIMAL_FUEL, bn } from 'fuels';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Routes } from '~portal/routes';
import { Services, store } from '~portal/store';
import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import { getAssetEth, getAssetFuel } from '~portal/systems/Assets/utils';
import type { SupportedChain } from '~portal/systems/Chains';
import {
  ETH_CHAIN,
  isEthChain,
  isFuelChain,
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { FUEL_CHAIN } from 'app-commons';
import { useEthBalance } from '~portal/systems/Chains/eth/hooks/useEthBalance';
import { useSyncEthWallets } from '~portal/systems/Chains/eth/hooks/useSyncEthWallets';
import { BridgeStatus } from '../machines';
import type { BridgeMachineState } from '../machines';
import { getChainFromUrlParam } from '../utils';

const selectors = {
  fromNetwork: (state: BridgeMachineState) => state.context?.fromNetwork,
  toNetwork: (state: BridgeMachineState) => state.context?.toNetwork,
  status:
    ({
      ethAccount,
      fuelAccount,
      assetBalance,
    }: {
      ethAccount?: string;
      fuelAccount?: string | null;
      assetBalance?: BN;
    }) =>
    (state: BridgeMachineState) => {
      const { fromNetwork, toNetwork } = state.context;

      if (!fromNetwork) return BridgeStatus.waitingNetworkFrom;
      if (!toNetwork) return BridgeStatus.waitingNetworkTo;
      if (!fuelAccount) {
        if (isFuelChain(fromNetwork)) return BridgeStatus.waitingConnectFrom;
        return BridgeStatus.waitingConnectTo;
      }
      if (!ethAccount) {
        if (isEthChain(toNetwork)) return BridgeStatus.waitingConnectTo;
        return BridgeStatus.waitingConnectFrom;
      }

      if (!state.context?.assetAmount || state.context.assetAmount.isZero()) {
        return BridgeStatus.waitingAssetAmount;
      }

      if (state.context.assetAmount.gt(assetBalance || bn(0))) {
        return BridgeStatus.insufficientBalance;
      }

      return BridgeStatus.ready;
    },
  isLoading: (state: BridgeMachineState) => state.matches('bridging'),
  assetAmount: (state: BridgeMachineState) => state.context?.assetAmount,
  asset: (state: BridgeMachineState) => state.context?.asset,
};

export function useBridge() {
  const { asset: ethAsset } = useAsset();
  const fromNetwork = store.useSelector(Services.bridge, selectors.fromNetwork);
  const toNetwork = store.useSelector(Services.bridge, selectors.toNetwork);
  const isLoading = store.useSelector(Services.bridge, selectors.isLoading);
  const assetAmount = store.useSelector(Services.bridge, selectors.assetAmount);
  const asset = store.useSelector(Services.bridge, selectors.asset);

  const ethAssetAddress = asset ? getAssetEth(asset).address : undefined;
  const fuelAssetAddress = asset ? getAssetFuel(asset).assetId : undefined;

  useSyncEthWallets();
  const {
    address: ethAddress,
    handlers: ethHandlers,
    isConnecting: ethIsConnecting,
    walletClient: ethWalletClient,
    publicClient: ethPublicClient,
  } = useEthAccountConnection();
  const { ethBalance } = useEthBalance(
    ethAssetAddress?.startsWith('0x')
      ? (ethAssetAddress as `0x${string}`)
      : undefined,
  );

  const {
    account: fuelAccount,
    address: fuelAddress,
    handlers: fuelHandlers,
    isConnecting: fuelIsConnecting,
    balance: fuelBalance,
    wallet: fuelWallet,
    provider: fuelProvider,
  } = useFuelAccountConnection({
    assetId: fuelAssetAddress?.startsWith('0x')
      ? (fuelAssetAddress as `0x${string}`)
      : undefined,
  });

  const isDeposit = isFuelChain(toNetwork);
  const isWithdraw = isFuelChain(fromNetwork);
  const assetBalance = useMemo(() => {
    if (isEthChain(fromNetwork)) {
      if (ethBalance) {
        const [intPart, decimalPart] = ethBalance?.formatted?.split('.') || [];
        const formattedUnits = `${intPart}.${
          decimalPart?.slice(0, DECIMAL_FUEL) || '0'
        }`;
        return bn.parseUnits(formattedUnits);
      }
    }

    if (isFuelChain(fromNetwork)) {
      return fuelBalance || bn(0);
    }

    return bn(0);
  }, [ethBalance, fromNetwork, fuelBalance]);

  const status = store.useSelector(
    Services.bridge,
    selectors.status({ ethAccount: ethAddress, fuelAccount, assetBalance }),
  );

  const router = useRouter();
  const params = useSearchParams();

  // console.log(params);
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // TODO: add "to" param when we add support to other chain than eth/fuel
  const fromInput = params.get('from');

  function getToInputNetwork() {
    if (!fromInputNetwork) return undefined;

    return isFuelChain(fromInputNetwork) ? ETH_CHAIN : FUEL_CHAIN;
  }
  const fromInputNetwork = getChainFromUrlParam(fromInput);
  const toInputNetwork = getToInputNetwork();

  // this effect is responsible to react to url changes (from/to params) and inform the machine that it changed
  useEffect(() => {
    if (!asset) return;

    if (!fromInputNetwork || !toInputNetwork) {
      goToDeposit();
    } else {
      store.changeNetworks({
        fromNetwork: fromInputNetwork,
        toNetwork: toInputNetwork,
      });
    }
  }, [asset, fromInputNetwork, toInputNetwork]);

  // this effect is responsible for setting the initial asset
  useEffect(() => {
    if (!asset && ethAsset) {
      store.changeAsset({ asset: ethAsset });
    }
  }, [asset, ethAsset]);

  function goToDeposit() {
    router.replace(Routes.bridgeFromTo('eth', 'fuel'));
  }

  function goToWithdraw() {
    router.replace(Routes.bridgeFromTo('fuel', 'eth'));
  }

  function connectNetwork(network?: SupportedChain) {
    if (isEthChain(network)) {
      ethHandlers.connect();
    }

    if (isFuelChain(network)) {
      fuelHandlers.connect();
    }
  }

  function isLoadingConnectNetwork(network?: SupportedChain) {
    if (isEthChain(network)) {
      return ethIsConnecting;
    }

    if (isFuelChain(network)) {
      return fuelIsConnecting;
    }

    return false;
  }

  return {
    handlers: {
      goToDeposit,
      goToWithdraw,
      startBridging: () =>
        store.startBridging({
          fuelAddress,
          ethWalletClient,
          fuelWallet,
          fuelProvider,
          ethAddress,
          asset,
          ethPublicClient,
        }),
      connectFrom: () => connectNetwork(fromNetwork),
      connectTo: () => connectNetwork(toNetwork),
      changeAssetAmount: store.changeAssetAmount,
      changeAsset: store.changeAsset,
      openAssetsDialog: store.openAssetsDialog,
    },
    fuelAddress,
    ethAddress,
    fromNetwork,
    toNetwork,
    isLoading,
    isLoadingConnectFrom: isLoadingConnectNetwork(fromNetwork),
    isLoadingConnectTo: isLoadingConnectNetwork(toNetwork),
    isDeposit,
    isWithdraw,
    status,
    assetAmount,
    assetBalance,
    asset,
  };
}
