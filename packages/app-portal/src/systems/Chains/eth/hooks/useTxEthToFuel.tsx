import type { FuelWalletLocked as FuelWallet } from '@fuel-wallet/sdk';
import { useMemo } from 'react';
import { store } from '~portal/store';
import { getAssetEth, getAssetFuel } from '~portal/systems/Assets/utils';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';

import { useQuery } from '@tanstack/react-query';
import { useAsset } from '../../../Assets/hooks/useAsset';
import { useFuelAccountConnection } from '../../fuel';
import { TxEthToFuelService } from '../services';
import { isErc20Address } from '../utils';
import { useEthAccountConnection } from './useEthAccountConnection';

export function useTxEthToFuel({ id }: { id: string }) {
  const { publicClient: ethPublicClient } = useEthAccountConnection();
  const { provider: fuelProvider, wallet: fuelWallet } =
    useFuelAccountConnection();

  const txId = id.startsWith('0x') ? (id as `0x${string}`) : undefined;
  const { href: explorerLink } = useExplorerLink({
    network: 'ethereum',
    id: txId,
  });

  // @TODO: Move it to "queries" folder
  const { data: tx, isLoading: isLoadingReceipts } = useQuery({
    queryKey: ['bridgeTxs', id],
    queryFn: () => {
      return TxEthToFuelService.getReceiptsInfo({
        ethTxId: txId,
        ethPublicClient,
      });
    },
    enabled: !!txId && !!ethPublicClient,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // @TODO: Add long pooling to it and stop when it gets settled
  const { data: message } = useQuery({
    queryKey: ['bridgeTxs', id, 'message'],
    queryFn: () => {
      return TxEthToFuelService.getFuelMessageStatus({
        fuelProvider,
        ethTxNonce: tx?.nonce,
      });
    },
    enabled: !!fuelProvider && !!tx?.nonce,
  });

  const status = useMemo(() => {
    const isMessageSpent = message?.state === 'SPENT';
    const isUnspent = message?.state === 'UNSPENT';
    const _isMessageUnspentEth = isUnspent && !tx?.erc20Token;
    const _isMessageUnspentErc20 = isUnspent && !!tx?.erc20Token;

    // @TODO: Detect these status correctly
    return {
      isSettlementLoading: true,
      isSettlementSelected: true,
      isSettlementDone: false,
      isConfirmTransactionLoading: false,
      isConfirmTransactionSelected: false,
      isReceiveDone: isMessageSpent,
      isWaitingFuelWalletApproval: false,
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
        // TODO: remove this workaround when we get versions organized and using the same version
        fuelWallet: fuelWallet as unknown as FuelWallet,
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
