import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getChainName, useFuelAccountConnection } from '~portal/systems/Chains';

import { BRIDGE_ACCEPT_TOS_STORAGE_KEY, BridgeStatus } from '../machines';

import { useToast } from '@fuels/ui';
import { useVerifySelectedChain } from 'app-commons';
import { useBridge } from './useBridge';

// A function, not a module-level map: '../machines' and this hook import each
// other, so BridgeStatus is still undefined while this module loads.
function statusKey(status: BridgeStatus) {
  switch (status) {
    case BridgeStatus.waitingNetworkFrom:
      return 'portal.bridge_button.select_network_from';
    case BridgeStatus.waitingNetworkTo:
      return 'portal.bridge_button.select_network_to';
    case BridgeStatus.waitingConnectFrom:
    case BridgeStatus.waitingConnectTo:
      return 'portal.bridge_button.connect_wallet';
    case BridgeStatus.waitingAsset:
      return 'portal.bridge_button.pick_asset';
    case BridgeStatus.waitingAssetAmount:
      return 'portal.bridge_button.enter_amount';
    case BridgeStatus.insufficientBalance:
      return 'portal.bridge_button.insufficient_funds';
    case BridgeStatus.ready:
      return 'portal.bridge.deposit';
    default:
      return undefined;
  }
}

export function useBridgeButton() {
  const { t } = useTranslation();
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
          text: t('portal.bridge_button.connect_wallet', {
            chain: getChainName(fromNetwork),
          }),
          isLoading: isLoadingConnectFrom,
          action: handlers.connectFrom,
        };
      case BridgeStatus.waitingConnectTo:
        return {
          text: t('portal.bridge_button.connect_wallet', {
            chain: getChainName(toNetwork),
          }),
          isLoading: isLoadingConnectTo,
          action: handlers.connectTo,
        };
      case BridgeStatus.ready:
        if (!isChainSupported) {
          return {
            text: t('portal.wallet.switch_network'),
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
            text: t('portal.bridge.withdraw'),
            isLoading,
            action: handlers.startBridging,
            isDisabled: !agree,
          };
        }

        if (allowance.isInvalidAllowance || allowance.requiresAllowance) {
          return {
            text: balance?.eq(0)
              ? t('portal.bridge_button.bridge_anyway')
              : t('portal.bridge_button.approve'),
            isDisabled: allowance.isInvalidAllowance || !agree,
            isLoading: allowance.isLoadingAllowance,
            loadingText: t('portal.bridge_button.loading_allowance'),
            action: handlers.startBridging,
          };
        }

        return {
          text:
            !!ethAssetAddress && balance?.eq(0)
              ? t('portal.bridge_button.bridge_anyway')
              : t('portal.bridge.deposit'),
          isLoading,
          loadingText: t('portal.bridge_button.loading_submit'),
          action: handlers.startBridging,
          isDisabled: !agree,
        };
      case BridgeStatus.waitingAssetAmount:
        return {
          text: t('portal.bridge_button.enter_amount'),
          isDisabled: true,
        };
      default: {
        const key = statusKey(status);
        return {
          text: key ? t(key) : status,
          isDisabled: true,
        };
      }
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
    t,
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
