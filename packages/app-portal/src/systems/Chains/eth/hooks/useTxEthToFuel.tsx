import { useMemo } from 'react';
import { store } from '~portal/store';
import { getAssetEth, getAssetFuel } from '~portal/systems/Assets/utils';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';

import { useQuery } from '@tanstack/react-query';
import { MessageStatus } from 'fuels';
import { useAsset } from '../../../Assets/hooks/useAsset';
import { useFuelAccountConnection } from '../../fuel';
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

const refetchIntervalMsg = (data?: MessageStatus) => {
  if (data && ['SPENT', 'UNSPENT'].includes(data.state)) {
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
    queryKey: ['bridgeTxs', 'detail', id],
    queryFn: () => {
      return TxEthToFuelService.getReceiptsInfo({
        ethTxId: txId,
        ethPublicClient,
      });
    },
    enabled: !!txId && !!ethPublicClient,
    refetchInterval: refetchIntervalTx,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const { data: message } = useQuery({
    queryKey: ['bridgeTxs', id, 'message'],
    queryFn: () => {
      return TxEthToFuelService.getFuelMessageStatus({
        fuelProvider,
        ethTxNonce: tx?.nonce,
      });
    },
    refetchInterval: refetchIntervalMsg,
    enabled: !!fuelProvider && !!tx?.nonce,
  });

  const status = useMemo(() => {
    const isUnspent = message?.state === 'UNSPENT';

    // if message is spent, assume it's done as message has arrived and already spent
    const isSpent = message?.state === 'SPENT';

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
  }, [tx, message]);

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

    store.relayMessageEthToFuel({
      input: {
        fuelWallet,
      },
      ethTxId,
    });
  }

  const shouldShowConfirmButton =
    isErc20Address(erc20Token?.address) &&
    (status?.isWaitingFuelWalletApproval ||
      status?.isConfirmTransactionLoading);

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
