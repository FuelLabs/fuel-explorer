import { useEffect, useMemo } from 'react';
import { store } from '~portal/store';
import { getAssetEth, getAssetFuel } from '~portal/systems/Assets/utils';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Message, MessageStatus } from 'fuels';
import { useAsset } from '../../../Assets/hooks/useAsset';
import { useFuelAccountConnection } from '../../fuel';
import { ETH_QUERY_KEYS } from '../queries/keys';
import { GetReceiptsInfoReturn, TxEthToFuelService } from '../services';
import { isErc20Address } from '../utils';
import { useEthAccountConnection } from './useEthAccountConnection';

const LONG_POOLING_INTERVAL = 10000; // in ms

const refetchIntervalTx = (data?: GetReceiptsInfoReturn) => {
  if (data?.nonce) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

const refetchIntervalMsgStatus = (data?: MessageStatus) => {
  if (data && ['SPENT', 'UNSPENT'].includes(data.state)) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

const refetchIntervalMsg = (data?: Message) => {
  if (data?.messageId) {
    return false;
  }

  return LONG_POOLING_INTERVAL;
};

export function useTxEthToFuel({ id }: { id: string }) {
  const { publicClient: ethPublicClient } = useEthAccountConnection();
  const { provider: fuelProvider, wallet: fuelWallet } =
    useFuelAccountConnection();

  const txId = id.startsWith('0x') ? (id as `0x${string}`) : undefined;
  const { href: explorerLink } = useExplorerLink({
    network: 'ethereum',
    id: txId,
  });

  const { data: tx, isLoading: isLoadingReceipts } = useQuery({
    queryKey: ETH_QUERY_KEYS.detail(id),
    queryFn: () => {
      return TxEthToFuelService.getReceiptsInfo({
        ethTxId: txId,
        ethPublicClient,
      });
    },
    enabled: !!txId && !!ethPublicClient,
    refetchInterval: refetchIntervalTx,
  });

  const { data: messageStatus } = useQuery({
    queryKey: ETH_QUERY_KEYS.messageStatus(id),
    queryFn: () => {
      return TxEthToFuelService.getFuelMessageStatus({
        fuelProvider,
        ethTxNonce: tx?.nonce,
      });
    },
    enabled: !!fuelProvider && !!tx?.nonce,
    refetchInterval: refetchIntervalMsgStatus,
  });

  const { data: message } = useQuery({
    queryKey: ETH_QUERY_KEYS.message(id),
    queryFn: () => {
      return TxEthToFuelService.getFuelMessage({
        fuelProvider,
        ethTxNonce: tx?.nonce,
        fuelRecipient: tx?.recipient,
      });
    },
    enabled: !!fuelProvider && !!tx?.nonce && !!tx?.recipient,
    refetchInterval: refetchIntervalMsg,
  });

  const { mutate: relayMessageOnFuel } = useMutation({
    mutationFn: TxEthToFuelService.relayMessageOnFuel,
  });

  const status = useMemo(() => {
    const isUnspent = messageStatus?.state === 'UNSPENT';

    // if message is spent, assume it's done as message has arrived and already spent
    const isSpent = messageStatus?.state === 'SPENT';

    // if message is unspent for a eth deposit, it's done as message has arrived and ready to use
    const isUnspentEth = isUnspent && !tx?.erc20Token;

    // if message is unspent for a erc20 deposit, it means the predicate has the message, user needs to approve it
    const isUnspentErc20 = isUnspent && !!tx?.erc20Token;

    const isReceiveDone = isSpent || isUnspentEth;
    const isWaitingApproval = !isReceiveDone && isUnspentErc20;

    return {
      isSettlementLoading: !isReceiveDone && !isUnspentErc20,
      isSettlementSelected: !isReceiveDone && !isUnspentErc20,
      isSettlementDone: isReceiveDone || isUnspentErc20,
      isConfirmTransactionLoading: isWaitingApproval,
      isConfirmTransactionSelected: isWaitingApproval,
      isWaitingFuelWalletApproval: isWaitingApproval,
      isReceiveDone: isReceiveDone,
    };
  }, [tx, messageStatus]);

  const steps = useMemo(() => {
    const confirmTransactionText = isErc20Address(tx?.erc20Token?.address)
      ? 'Action'
      : 'Automatic';

    return [
      {
        name: 'Submit to bridge',
        status: 'Done!',
        isDone: true,
      },
      {
        name: 'Settlement',
        // @TODO: put correct time left '~XX minutes left', how?
        status: status.isSettlementDone ? 'Done!' : 'Waiting',
        isLoading: status.isSettlementLoading,
        isDone: status.isSettlementDone,
        isSelected: status.isSettlementSelected,
      },
      {
        name: 'Confirm transaction',
        status: status.isReceiveDone ? 'Done!' : confirmTransactionText,
        isLoading: status.isConfirmTransactionLoading,
        isDone: status.isReceiveDone,
        isSelected: status.isConfirmTransactionSelected,
      },
      {
        name: 'Receive on Fuel',
        status: status.isReceiveDone ? 'Done!' : 'Automatic',
        isLoading: false,
        isDone: status.isReceiveDone,
        isSelected: false,
      },
    ];
  }, [status]);

  const { amount, date, erc20Token, ethTxId } = useMemo(() => {
    if (!tx) return {};

    const amount = tx?.amount;
    const date = tx?.blockDate;
    const erc20Token = tx?.erc20Token;
    const ethTxId = txId;

    return {
      amount,
      date,
      erc20Token,
      ethTxId,
    };
  }, [tx, txId]);

  const { asset } = useAsset({
    ethTokenId: erc20Token?.address,
  });
  const assetEthNetwork = asset ? getAssetEth(asset) : undefined;
  const assetFuelNetwork = asset ? getAssetFuel(asset) : undefined;
  const formattedAmount = amount?.format({
    // if it's erc20 token, the value is bigger and we should use ETH decimals of the token
    units: erc20Token ? assetEthNetwork?.decimals : undefined,
    precision: assetFuelNetwork?.decimals,
    minPrecision: 3,
  });

  function relayMessageToFuel() {
    if (!ethTxId || !fuelWallet) return;

    relayMessageOnFuel(
      {
        fuelMessage: message,
        fuelWallet: fuelWallet,
      },
      {
        onSuccess: (data) => {
          // @TODO: Invalidate bridge
          console.log('onSuccess', 'relayMessageOnFuel');
          console.log(data);
        },
        onError: (error) => {
          console.log('onError', 'relayMessageOnFuel');
          console.log(error);
        },
      },
    );
  }

  const shouldShowConfirmButton =
    isErc20Address(erc20Token?.address) &&
    (status?.isWaitingFuelWalletApproval ||
      status?.isConfirmTransactionLoading);

  useEffect(() => {
    console.group('TxEthToFuel', txId);
    console.log('1. getReceiptsInfo', tx);
    console.log('2. messageStatus', messageStatus);
    console.log('3. message', message);
    console.groupEnd();
  }, [txId, tx, messageStatus, message]);

  return {
    handlers: {
      close: store.closeOverlay,
      openTxEthToFuel: store.openTxEthToFuel,
      relayMessageToFuel,
    },
    date,
    steps,
    status,
    shouldShowConfirmButton,
    amount: formattedAmount,
    asset,
    isLoadingReceipts,
    explorerLink,
  };
}
