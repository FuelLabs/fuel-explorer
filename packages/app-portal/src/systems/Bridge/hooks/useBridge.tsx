import type { BN } from 'fuels';
import { bn, DECIMAL_UNITS } from 'fuels';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Services, store } from '~/store';
import type { SupportedChain } from '~/systems/Chains';
import {
  useFuelAccountConnection,
  useEthAccountConnection,
  isEthChain,
  isFuelChain,
  ETH_CHAIN,
  FUEL_CHAIN,
} from '~/systems/Chains';
import { Pages } from '~/types';

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
      fuelAccount?: string;
      assetBalance?: BN;
    }) =>
    (state: BridgeMachineState) => {
      const { fromNetwork, toNetwork } = state.context;

      if (!fromNetwork) return BridgeStatus.waitingNetworkFrom;
      if (!toNetwork) return BridgeStatus.waitingNetworkTo;
      if (
        (isEthChain(fromNetwork) && !ethAccount) ||
        (isFuelChain(fromNetwork) && !fuelAccount)
      )
        return BridgeStatus.waitingConnectFrom;
      if (
        (isEthChain(toNetwork) && !ethAccount) ||
        (isFuelChain(toNetwork) && !fuelAccount)
      )
        return BridgeStatus.waitingConnectTo;

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
  assetAddress: (state: BridgeMachineState) => state.context?.assetAddress,
};

export function useBridge() {
  const fromNetwork = store.useSelector(Services.bridge, selectors.fromNetwork);
  const toNetwork = store.useSelector(Services.bridge, selectors.toNetwork);
  const isLoading = store.useSelector(Services.bridge, selectors.isLoading);
  const assetAmount = store.useSelector(Services.bridge, selectors.assetAmount);
  const assetAddress = store.useSelector(
    Services.bridge,
    selectors.assetAddress
  );

  const {
    address: ethAddress,
    handlers: ethHandlers,
    isConnecting: ethIsConnecting,
    balance: ethBalance,
    walletClient: ethWalletClient,
    publicClient: ethPublicClient,
    asset: ethAsset,
  } = useEthAccountConnection({
    erc20Address: assetAddress?.startsWith('0x')
      ? (assetAddress as `0x${string}`)
      : undefined,
  });

  const {
    account: fuelAccount,
    address: fuelAddress,
    handlers: fuelHandlers,
    isConnecting: fuelIsConnecting,
    balance: fuelBalance,
    wallet: fuelWallet,
    asset: fuelAsset,
  } = useFuelAccountConnection();

  const isDeposit = isFuelChain(toNetwork);
  const isWithdraw = isFuelChain(fromNetwork);
  const assetBalance = useMemo(() => {
    if (isEthChain(fromNetwork)) {
      if (ethBalance) {
        const [intPart, decimalPart] = ethBalance?.formatted?.split('.') || [];
        const formattedUnits = `${intPart}.${
          decimalPart?.slice(0, DECIMAL_UNITS) || '0'
        }`;
        return ethBalance ? bn.parseUnits(formattedUnits) : bn(0);
      }
    }

    if (isFuelChain(fromNetwork)) {
      return fuelBalance;
    }

    return bn(0);
  }, [ethBalance, fromNetwork, fuelBalance]);
  const status = store.useSelector(
    Services.bridge,
    selectors.status({ ethAccount: ethAddress, fuelAccount, assetBalance })
  );

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // TODO: add "to" param when we add support to other chain than eth/fuel
  const fromInput = queryParams.get('from');

  function getToInputNetwork() {
    if (!fromInputNetwork) return undefined;

    return isFuelChain(fromInputNetwork) ? ETH_CHAIN : FUEL_CHAIN;
  }
  const fromInputNetwork = getChainFromUrlParam(fromInput);
  const toInputNetwork = getToInputNetwork();

  // this effect is responsible to react to url changes (from/to params) and inform the machine that it changed
  useEffect(() => {
    if (!fromInputNetwork || !toInputNetwork) {
      goToDeposit();
    } else {
      store.changeNetworks({
        fromNetwork: fromInputNetwork,
        toNetwork: toInputNetwork,
      });
    }
  }, [fromInputNetwork, toInputNetwork]);

  function goToDeposit() {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('from', 'eth');
    searchParams.set('to', 'fuel');

    navigate({
      pathname: Pages.bridge,
      search: searchParams.toString(),
    });
  }

  function goToWithdraw() {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('from', 'fuel');
    searchParams.set('to', 'eth');

    navigate({
      pathname: Pages.bridge,
      search: searchParams.toString(),
    });
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

  function openAssetsDialog(network?: SupportedChain) {
    if (isEthChain(network)) {
      return store.openEthAssetsDialog();
    }

    if (isFuelChain(network)) {
      // TODO: implement it when include withdraw from ERC-20 token
    }

    return undefined;
  }

  function getAsset(network?: SupportedChain) {
    if (isEthChain(network)) {
      return ethAsset;
    }

    if (isFuelChain(network)) {
      return fuelAsset;
    }

    return undefined;
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
          ethAddress,
          ethAsset,
          fuelAsset,
          ethPublicClient,
        }),
      connectFrom: () => connectNetwork(fromNetwork),
      connectTo: () => connectNetwork(toNetwork),
      changeAssetAmount: store.changeAssetAmount,
      changeAssetAddress: store.changeAssetAddress,
      openAssetsDialog: () => openAssetsDialog(fromNetwork),
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
    asset: getAsset(fromNetwork),
  };
}
