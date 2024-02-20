import { useMemo } from 'react';
import { getAssetEth } from '~portal/systems/Assets/utils';
import { getChainName, useFuelAccountConnection } from '~portal/systems/Chains';

import { BridgeStatus } from '../machines';

import { useBridge } from './useBridge';

export function useBridgeButton() {
  const {
    handlers,
    fromNetwork,
    toNetwork,
    status,
    isLoading,
    isDeposit,
    isLoadingConnectFrom,
    isLoadingConnectTo,
    asset,
  } = useBridge();
  const { balance } = useFuelAccountConnection();
  const ethAssetAddress = asset ? getAssetEth(asset)?.address : undefined;

  const button = useMemo(() => {
    switch (status) {
      case BridgeStatus.waitingConnectFrom:
        return {
          text: status.replace('From', getChainName(fromNetwork)),
          isLoading: isLoadingConnectFrom,
          action: handlers.connectFrom,
        };
      case BridgeStatus.waitingConnectTo:
        return {
          text: status.replace('To', getChainName(toNetwork)),
          isLoading: isLoadingConnectTo,
          action: handlers.connectTo,
        };
      case BridgeStatus.ready:
        return {
          text:
            !!ethAssetAddress && balance?.eq(0) && isDeposit
              ? 'Bridge asset anyway'
              : isDeposit
                ? 'Deposit'
                : 'Withdraw',
          isLoading,
          action: handlers.startBridging,
        };
      case BridgeStatus.waitingAssetAmount:
        return {
          text: isDeposit
            ? status.replace('operation', 'deposit')
            : status.replace('operation', 'withdraw'),
          isDisabled: true,
        };
      default:
        return {
          text: status,
          isDisabled: true,
        };
    }
  }, [
    status,
    fromNetwork,
    toNetwork,
    handlers.startBridging,
    handlers.connectFrom,
    handlers.connectTo,
    isLoadingConnectFrom,
    isLoadingConnectTo,
  ]);

  const { action, ...bridgeButton } = button;

  return {
    ...bridgeButton,
    handlers: {
      action,
    },
  };
}
