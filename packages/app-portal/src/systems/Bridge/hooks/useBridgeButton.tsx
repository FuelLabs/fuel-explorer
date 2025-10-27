import { useMemo, useRef, useState } from 'react';
import { getChainName, useFuelAccountConnection } from '~portal/systems/Chains';

import { BRIDGE_ACCEPT_TOS_STORAGE_KEY, BridgeStatus } from '../machines';

import { useToast } from '@fuels/ui';
import { useVerifySelectedChain } from 'app-commons';
import { useBridge } from './useBridge';

export function useBridgeButton() {
  const { toast } = useToast();

  const { balance } = useFuelAccountConnection();
  const {
    handlers,
    fromNetwork,
    toNetwork,
    status,
    isLoading,
    isDeposit,
    isWithdraw,
    isLoadingConnectFrom,
    isLoadingConnectTo,
    allowance,
    ethAssetAddress,
  } = useBridge();

  const hasAcceptedTerms = useRef(
    Boolean(localStorage.getItem(BRIDGE_ACCEPT_TOS_STORAGE_KEY)),
  );
  const [agree, setAgree] = useState(hasAcceptedTerms.current);

  const { isChainSupported, validateChain } = useVerifySelectedChain();

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
        if (!isChainSupported) {
          return {
            text: 'Switch Network',
            isLoading: false,
            action: async () => {
              try {
                await validateChain();
              } catch (e) {
                toast({
                  title: (e as Error).message,
                  variant: 'error',
                });

                return;
              }
            },
          };
        }

        if (isWithdraw) {
          return {
            text: 'Withdraw',
            isLoading,
            action: handlers.startBridging,
            isDisabled: !agree,
          };
        }

        if (allowance.isInvalidAllowance || allowance.requiresAllowance) {
          return {
            text: balance?.eq(0) ? 'Bridge asset anyway' : 'Approve',
            isDisabled: allowance.isInvalidAllowance || !agree,
            isLoading: allowance.isLoadingAllowance,
            loadingText: 'Getting token allowance...',
            action: handlers.startBridging,
          };
        }

        return {
          text:
            !!ethAssetAddress && balance?.eq(0)
              ? 'Bridge asset anyway'
              : 'Deposit',
          isLoading,
          loadingText: 'Submitting Transaction...',
          action: handlers.startBridging,
          isDisabled: !agree,
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
    allowance.isInvalidAllowance,
    allowance.requiresAllowance,
    allowance.isLoadingAllowance,
    isDeposit,
    isWithdraw,
    isLoading,
    status,
    ethAssetAddress,
    fromNetwork,
    toNetwork,
    balance,
    handlers.startBridging,
    handlers.connectFrom,
    handlers.connectTo,
    isLoadingConnectFrom,
    isLoadingConnectTo,
    isChainSupported,
    toast,
    validateChain,
    agree,
  ]);

  const { action, ...bridgeButton } = button;

  return {
    ...bridgeButton,
    isLoading,
    agree,
    hasAcceptedTerms: hasAcceptedTerms.current,
    handlers: {
      action,
      setAgree,
    },
  };
}
