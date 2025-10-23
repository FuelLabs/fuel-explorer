import { ETH_CHAIN, Routes } from 'app-commons';
import type { BN } from 'fuels';
import { DEFAULT_PRECISION, bn } from 'fuels';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Services, store } from '~portal/store';
import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import {
  getAssetEthCurrentChain,
  getAssetFuelCurrentChain,
} from '~portal/systems/Assets/utils';
import type { SupportedChain } from '~portal/systems/Chains';
import {
  isEthChain,
  isFuelChain,
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { FUEL_CHAIN, type HexAddress } from 'app-commons';
import { useBridgeAllowance } from '~portal/systems/Bridge/hooks/useBridgeAllowance';
import { useEthBalance } from '~portal/systems/Chains/eth/hooks/useEthBalance';
import { BridgeStatus } from '../machines';
import type { BridgeMachineState } from '../machines';
import { getChainFromUrlParam } from '../utils';

export const bridgeSelectors = {
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

      const isWithdraw = isFuelChain(fromNetwork);
      if (isWithdraw) {
        if (!fuelAccount) return BridgeStatus.waitingConnectFrom;
        if (!ethAccount) return BridgeStatus.waitingConnectTo;
      }
      if (!isWithdraw) {
        if (!ethAccount) return BridgeStatus.waitingConnectFrom;
        if (!fuelAccount) return BridgeStatus.waitingConnectTo;
      }

      if (!state.context?.assetAmount || state.context.assetAmount.isZero()) {
        return BridgeStatus.waitingAssetAmount;
      }

      if (state.context.assetAmount.gt(assetBalance || bn(0))) {
        return BridgeStatus.insufficientBalance;
      }

      return BridgeStatus.ready;
    },
  isLoading: (state: BridgeMachineState) => !state.matches('idle'),

  assetAmount: (state: BridgeMachineState) => state.context?.assetAmount,
  asset: (state: BridgeMachineState) => state.context?.asset,
};

export function useBridge() {
  const { asset: baseAsset } = useAsset();

  const fromNetwork = store.useSelector(
    Services.bridge,
    bridgeSelectors.fromNetwork,
  );
  const toNetwork = store.useSelector(
    Services.bridge,
    bridgeSelectors.toNetwork,
  );
  const isLoading = store.useSelector(
    Services.bridge,
    bridgeSelectors.isLoading,
  );
  const assetAmount = store.useSelector(
    Services.bridge,
    bridgeSelectors.assetAmount,
  );
  const asset = store.useSelector(Services.bridge, bridgeSelectors.asset);
  const ethAsset = useMemo(
    () => (asset ? getAssetEthCurrentChain(asset) : undefined),
    [asset],
  );
  const fuelAsset = useMemo(
    () => (asset ? getAssetFuelCurrentChain(asset) : undefined),
    [asset],
  );
  const ethAssetAddress = ethAsset?.address;
  const fuelAssetAddress = fuelAsset?.assetId;
  const {
    address: ethAddress,
    handlers: ethHandlers,
    isConnecting: ethIsConnecting,
    walletClient: ethWalletClient,
    publicClient: ethPublicClient,
  } = useEthAccountConnection();
  const { ethBalance } = useEthBalance(
    ethAssetAddress?.startsWith('0x')
      ? (ethAssetAddress as HexAddress)
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
      ? (fuelAssetAddress as HexAddress)
      : undefined,
  });

  const isDeposit = isFuelChain(toNetwork);
  const isWithdraw = isFuelChain(fromNetwork);

  const assetFormat = useMemo(() => {
    if (!asset) return undefined;

    if (isDeposit) {
      if (ethAsset?.decimals != null) {
        return {
          precision:
            // make sure we're not using more decimals than fuel supports
            ethAsset.decimals > DEFAULT_PRECISION
              ? DEFAULT_PRECISION
              : ethAsset.decimals,
          units: ethAsset.decimals,
        };
      }
    }

    if (isWithdraw) {
      return {
        units: fuelAsset?.decimals || 0,
        precision: fuelAsset?.decimals || 0,
      };
    }

    return {
      units: 0,
      precision: 0,
    };
  }, [asset, isDeposit, isWithdraw, ethAsset, fuelAsset]);

  const assetBalance = useMemo(() => {
    if (isEthChain(fromNetwork) && ethBalance) {
      return bn(ethBalance.value.toString());
    }

    if (isFuelChain(fromNetwork)) {
      return fuelBalance || bn(0);
    }

    return bn(0);
  }, [ethBalance, fromNetwork, fuelBalance]);

  const status = store.useSelector(
    Services.bridge,
    bridgeSelectors.status({
      ethAccount: ethAddress,
      fuelAccount,
      assetBalance,
    }),
  );

  const {
    isLoadingAllowance,
    isInvalidAllowance,
    requiresAllowance,
    tokensAllowance,
  } = useBridgeAllowance({
    ethAsset,
    ethAddress: ethAddress as HexAddress,
    isDeposit,
    assetAmount,
  });

  const navigate = useNavigate();
  const [params] = useSearchParams();

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
    if (!asset && baseAsset) {
      store.changeAsset({ asset: baseAsset });
    }
  }, [asset, baseAsset]);

  function goToDeposit() {
    navigate(Routes.bridgeFromTo('eth', 'fuel'), { replace: true });
  }

  function goToWithdraw() {
    navigate(Routes.bridgeFromTo('fuel', 'eth'), { replace: true });
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

  const toCustomAddress = store.useSelector(
    Services.bridge,
    (state: any) => state.context.toCustomAddress,
  );

  function startBridging() {
    store.startBridging({
      fuelAddress,
      ethWalletClient,
      fuelWallet,
      fuelProvider,
      ethAddress,
      asset,
      ethPublicClient,
      toCustomAddress,
    });
  }

  return {
    handlers: {
      goToDeposit,
      goToWithdraw,
      startBridging,
      connectFrom: () => connectNetwork(fromNetwork),
      connectTo: () => connectNetwork(toNetwork),
      changeAssetAmount: store.changeAssetAmount,
      changeAsset: store.changeAsset,
      changeToAddress: store.changeToAddress,
      openAssetsDialog: store.openAssetsDialog,
    },
    allowance: {
      isLoadingAllowance,
      isInvalidAllowance,
      requiresAllowance,
      tokensAllowance,
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
    assetFormat,
    ethAssetAddress,
    toCustomAddress,
  };
}
