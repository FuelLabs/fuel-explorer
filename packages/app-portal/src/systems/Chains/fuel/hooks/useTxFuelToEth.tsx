import {
  MessageProof,
  ReceiptType,
  fromTai64ToUnix,
  getReceiptsMessageOut,
  hexlify,
} from 'fuels';
import { useEffect, useMemo } from 'react';
import { store } from '~portal/store';
import { useAssets } from '~portal/systems/Assets';
import { getAssetEth } from '~portal/systems/Assets/utils';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';

import { useEthAccountConnection } from '../../eth/hooks';
import { isSameEthAddress, parseFuelAddressToEth } from '../../eth/utils';
import { distanceToNow } from '../utils';

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  BlockCommitData,
  BlockFinalizationData,
  MessageRelayedData,
  TxFuelToEthData,
  TxFuelToEthService,
} from '../services';
import { useFuelAccountConnection } from './useFuelAccountConnection';

// @TODO: Share it between bridge hooks (move to constants folder)
const LONG_POOLING_INTERVAL = 10000; // in ms

const refetchIntervalTx = (data?: TxFuelToEthData) => {
  if (data?.nonce) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

const refetchIntervalBlockCommit = (data?: BlockCommitData) => {
  if (data?.blockHashCommited) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

const refetchIntervalMessageProof = (data?: MessageProof) => {
  if (data) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

const refetchIntervalBlockFinalization = (data?: BlockFinalizationData) => {
  if (data?.isFinalized) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

const refetchIntervalMessageRelayed = (data?: MessageRelayedData) => {
  if (data) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

const refetchIntervalWaitingReceive = (data?: boolean) => {
  if (data) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

export function useTxFuelToEth({ txId }: { txId: string }) {
  const { publicClient: ethPublicClient, walletClient: ethWalletClient } =
    useEthAccountConnection();
  const { provider: fuelProvider } = useFuelAccountConnection();
  const { assets } = useAssets();
  const { href: explorerLink } = useExplorerLink({
    network: 'fuel',
    providerUrl: fuelProvider?.url || '',
    id: txId,
  });

  // @TODO: Move it to "queries" folder
  const { data: tx, isLoading: isLoadingTxResult } = useQuery({
    queryKey: ['bridgeTxs', 'detail', txId],
    queryFn: () => {
      return TxFuelToEthService.waitTxResult({
        fuelTxId: txId,
        fuelProvider,
      });
    },
    enabled: !!txId && !!fuelProvider,
    refetchInterval: refetchIntervalTx,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // @TODO: Move it to "queries" folder
  const { data: blockCommit } = useQuery({
    queryKey: ['bridgeTxs', 'detail', txId, 'blockCommit'],
    queryFn: () => {
      return TxFuelToEthService.waitBlockCommit({
        fuelWithdrawBlockId: tx?.txResult?.blockId,
        ethPublicClient,
        fuelProvider,
      });
    },
    enabled: !!tx?.txResult?.blockId && !!ethPublicClient && !!fuelProvider,
    refetchInterval: refetchIntervalBlockCommit,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // @TODO: Move it to "queries" folder
  const { data: messageProof } = useQuery({
    queryKey: ['bridgeTxs', 'detail', txId, 'messageProof'],
    queryFn: () => {
      return TxFuelToEthService.getMessageProof({
        fuelTxId: txId,
        nonce: tx?.nonce,
        fuelBlockHashCommited: blockCommit?.blockHashCommited,
        fuelProvider,
      });
    },
    enabled:
      !!txId &&
      !!tx?.nonce &&
      !!blockCommit?.blockHashCommited &&
      !!fuelProvider,
    refetchInterval: refetchIntervalMessageProof,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // @TODO: Move it to "queries" folder
  const { data: blockFinalization } = useQuery({
    queryKey: ['bridgeTxs', 'detail', txId, 'blockFinalization'],
    queryFn: () => {
      return TxFuelToEthService.waitBlockFinalization({
        messageProof,
        ethPublicClient,
        fuelBlockHashCommited: blockCommit?.blockHashCommited,
        fuelProvider,
      });
    },
    enabled:
      !!messageProof &&
      !!blockCommit?.blockHashCommited &&
      !!ethPublicClient &&
      !!fuelProvider,
    refetchInterval: refetchIntervalBlockFinalization,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // @TODO: Move it to "queries" folder
  const { data: messageRelayed } = useQuery({
    queryKey: ['bridgeTxs', 'detail', txId, 'messageRelayed'],
    queryFn: () => {
      return TxFuelToEthService.getMessageRelayed({
        messageProof,
        messageId: tx?.messageId,
        ethPublicClient,
      });
    },
    enabled:
      !!blockFinalization &&
      !!messageProof &&
      !!ethWalletClient &&
      !!tx?.messageId,
    refetchInterval: refetchIntervalMessageRelayed,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // @TODO: Move it to "queries" folder
  const { data: waitingReceive } = useQuery({
    queryKey: ['bridgeTxs', 'detail', txId, 'waitingReceive'],
    queryFn: () => {
      return TxFuelToEthService.waitTxMessageRelayed({
        txHash: messageRelayed?.transactionHash,
        ethPublicClient,
      });
    },
    enabled: !!ethPublicClient && !!messageRelayed?.transactionHash,
    refetchInterval: refetchIntervalWaitingReceive,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // @TODO: Move it to "mutations" folder
  // @TODO: Replace it from state machine call
  const { mutate: relayMessageFromFuelBlock } = useMutation({
    mutationFn: TxFuelToEthService.relayMessageFromFuelBlock,
  });

  const fuelTxResult = tx?.txResult;

  useEffect(() => {
    console.group('TxFuelToEth', txId);
    console.log('1. fuelTxResult', tx?.txResult);
    console.log('2. blockCommit', blockCommit);
    console.log('3. messageProof', messageProof);
    console.log('4. blockFinalization', blockFinalization);
    console.log('5. messageRelayed', messageRelayed);
    console.log('6. waitingReceive', waitingReceive);
    console.groupEnd();
  }, [
    txId,
    tx,
    blockCommit,
    messageProof,
    blockFinalization,
    messageRelayed,
    waitingReceive,
  ]);

  const status = useMemo(() => {
    // @TODO: Detect these status correctly
    /**
     * 1. isSubmitToBridgeLoading, isSubmitToBridgeSelected
     * 1. waitingBlockCommit
     * 2. checkingMessageProof
     * 3. waitingBlockFinalization
     * 4. checkingRelayed
     */

    return {
      isSubmitToBridgeLoading: true,
      isSubmitToBridgeSelected: true,
      isSubmitToBridgeDone: false,
      isSettlementLoading: false,
      isSettlementSelected: false,
      isSettlementDone: false,
      isConfirmTransactionSelected: false,
      isConfirmTransactionLoading: false,
      isConfirmTransactionDone: false,
      isWaitingEthWalletApproval:
        messageRelayed && !messageRelayed.transactionHash,
      isReceiveLoading: false,
      isReceiveSelected: false,
      isReceiveDone: false,
    };
  }, [tx, blockCommit, messageProof, blockFinalization, messageRelayed]);

  const estimatedTimeRemaining = useMemo<string | null>(() => {
    if (!blockCommit?.estimatedFinishDate) return null;
    return distanceToNow(blockCommit.estimatedFinishDate);
  }, [blockCommit?.estimatedFinishDate]);

  const steps = useMemo(() => {
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
  }, [status, estimatedTimeRemaining]);

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
    estimatedTimeRemaining,
    explorerLink,
  };
}
