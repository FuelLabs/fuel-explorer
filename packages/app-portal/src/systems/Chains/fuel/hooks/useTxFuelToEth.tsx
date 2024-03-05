import {
  ReceiptType,
  fromTai64ToUnix,
  getReceiptsMessageOut,
  hexlify,
} from 'fuels';
import { useMemo } from 'react';
import { store } from '~portal/store';
import { useAssets } from '~portal/systems/Assets';
import { getAssetEth } from '~portal/systems/Assets/utils';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';

import { useEthAccountConnection } from '../../eth/hooks';
import { isSameEthAddress, parseFuelAddressToEth } from '../../eth/utils';
import { distanceToNow } from '../utils';

import { useQuery } from '@tanstack/react-query';
import { TxFuelToEthService } from '../services';
import { useFuelAccountConnection } from './useFuelAccountConnection';

export function useTxFuelToEth({ txId }: { txId: string }) {
  const { walletClient: ethWalletClient } = useEthAccountConnection();
  const { provider: fuelProvider } = useFuelAccountConnection();
  const { assets } = useAssets();
  const { href: explorerLink } = useExplorerLink({
    network: 'fuel',
    providerUrl: fuelProvider?.url || '',
    id: txId,
  });

  // @TODO: Move it to "queries" folder
  const { data: tx, isLoading: isLoadingTxResult } = useQuery({
    queryKey: ['bridgeTxs', txId],
    queryFn: () => {
      return TxFuelToEthService.waitTxResult({
        fuelTxId: txId,
        fuelProvider,
      });
    },
    enabled: !!txId && !!fuelProvider,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const fuelTxResult = tx?.txResult;

  const status = useMemo(() => {
    // @TODO: Detect these status correctly
    return {
      isSubmitToBridgeLoading: false,
      isSubmitToBridgeSelected: false,
      isSubmitToBridgeDone: false,
      isSettlementLoading: false,
      isSettlementSelected: false,
      isSettlementDone: false,
      isConfirmTransactionSelected: false,
      isConfirmTransactionLoading: false,
      isConfirmTransactionDone: false,
      isWaitingEthWalletApproval: false,
      isReceiveLoading: false,
      isReceiveSelected: false,
      isReceiveDone: false,
    };
  }, []);

  const steps = useMemo(() => {
    const estimatedTimeRemaining = '@TODO';

    function getConfirmStatusText() {
      if (status.isWaitingEthWalletApproval) return 'Action required';
      if (status.isConfirmTransactionDone) return 'Done!';
      return 'Action';
    }

    function getSettlementStatusText() {
      if (status.isSettlementDone) return 'Done!';
      if (estimatedTimeRemaining) return `~${estimatedTimeRemaining} left`;
      return 'Waiting';
    }

    return [
      {
        name: 'Submit to bridge',
        // @TODO: put correct time left '~XX minutes left', how?
        status: status.isSubmitToBridgeDone ? 'Done!' : 'Waiting',
        isLoading: status.isSubmitToBridgeLoading,
        isSelected: status.isSubmitToBridgeSelected,
        isDone: status.isSubmitToBridgeDone,
      },
      {
        name: 'Settlement',
        status: getSettlementStatusText(),
        isLoading: status.isSettlementLoading,
        isDone: status.isSettlementDone,
        isSelected: status.isSettlementSelected,
      },
      {
        name: 'Confirm transaction',
        status: getConfirmStatusText(),
        isLoading: status.isConfirmTransactionLoading,
        isDone: status.isConfirmTransactionDone,
        isSelected: status.isConfirmTransactionSelected,
      },
      {
        name: 'Receive on Ethereum',
        status: status.isReceiveDone ? 'Done!' : 'Automatic',
        isLoading: status.isReceiveLoading,
        isDone: status.isReceiveDone,
        isSelected: status.isReceiveSelected,
      },
    ];
  }, [status]);

  const { asset, amount } = useMemo(() => {
    if (!fuelTxResult) return {};

    const messageOutReceipt = getReceiptsMessageOut(
      fuelTxResult?.receipts || [],
    )[0];

    if (messageOutReceipt) {
      const burnReceipt = fuelTxResult?.receipts?.find(
        (receipt) => receipt.type === ReceiptType.Burn,
      );
      if (burnReceipt) {
        const receipt = burnReceipt as Extract<
          typeof burnReceipt,
          { type: ReceiptType.Burn }
        >;
        const amount = receipt.val;
        const ethAssetId = messageOutReceipt.data
          ? parseFuelAddressToEth(
              hexlify(messageOutReceipt.data).replace('0x', '').slice(72, 136),
            )
          : undefined;
        const ethAsset = assets
          .map((asset) => ({
            asset,
            ethNetwork: getAssetEth(asset),
          }))
          .find(({ ethNetwork }) => {
            return isSameEthAddress(ethNetwork?.address, ethAssetId);
          });

        return {
          asset: ethAsset?.asset,
          amount: amount.format({
            precision: ethAsset?.ethNetwork?.decimals,
          }),
        };
      }
    }

    const asset = assets.find((asset) => asset.symbol === 'ETH');

    if (!asset) {
      return {
        asset: undefined,
        amount: undefined,
      };
    }

    const ethNetwork = getAssetEth(asset);

    return {
      asset,
      amount: messageOutReceipt?.amount?.format({
        precision: ethNetwork?.decimals,
      }),
    };
  }, [fuelTxResult, assets]);

  // @TODO: remove this conversion when sdk already returns the date in unix format
  const date = useMemo(
    () =>
      fuelTxResult?.time
        ? new Date(fromTai64ToUnix(fuelTxResult?.time) * 1000)
        : undefined,
    [fuelTxResult?.time],
  );

  function relayToEth() {
    if (!ethWalletClient) return;

    store.relayTxFuelToEth({
      input: {
        ethWalletClient,
      },
      fuelTxId: txId,
    });
  }

  return {
    handlers: {
      close: store.closeOverlay,
      relayToEth,
      openTxFuelToEth: store.openTxFuelToEth,
    },
    fuelTxResult,
    date,
    asset,
    amount,
    steps,
    status,
    isLoadingTxResult,
    // @TODO: Get this date correctly
    estimatedTimeRemaining: distanceToNow(new Date()),
    explorerLink,
  };
}
