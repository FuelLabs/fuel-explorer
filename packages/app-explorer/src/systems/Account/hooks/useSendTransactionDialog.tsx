import { useEffect, useMemo, useState, useTransition } from 'react';

import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { useBalance, useWallet } from '@fuels/react';
import { type BN, bn, isB256 } from 'fuels';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'wagmi/query';
import { Routes } from '~/routes';
import { useTransactionStatus } from '~/systems/Transaction/hooks/useTransactionStatus';
import { createTransfer } from '../utils/transaction';

type UseSendTransactionDialogProps = {
  balances: GQLBalanceItemFragment[];
};

export function useSendTransactionDialog({
  balances,
}: UseSendTransactionDialogProps) {
  const [isBuildingTransactionPage, startTransition] = useTransition();

  const [assetId, setAssetId] = useState(balances[0]?.assetId);
  const [destinyAddress, setDestinyAddress] = useState('');
  const [amount, setAmount] = useState<BN | undefined>();
  const navigate = useNavigate();

  const { wallet } = useWallet();
  const { balance } = useBalance({
    assetId,
    address: wallet?.address.toString(),
    query: {
      refetchInterval: 3000,
    },
  });

  const asset = useMemo(() => {
    return balances.find((balance) => balance.assetId === assetId);
  }, [balances, assetId]);

  const assetFormat = useMemo(() => {
    const asset = balances?.find((b) => b.assetId === assetId);

    return {
      units: Number.parseInt(asset?.decimals || '0'),
      precision: Number.parseInt(asset?.decimals || '0'),
    };
  }, [assetId, balances]);

  const isInsufficientBalance = useMemo(() => {
    return amount?.gt(balance || 0);
  }, [balance, amount]);

  const isValidTransactionInput = useMemo(() => {
    return (
      assetId &&
      destinyAddress &&
      isB256(destinyAddress) &&
      isB256(assetId) &&
      amount?.gt(0) &&
      !isInsufficientBalance
    );
  }, [destinyAddress, assetId, amount, isInsufficientBalance]);

  const isUsingMaxBalance = amount?.eq(bn(balance));

  const {
    mutate,
    data,
    isPending: isSubmittingTransaction,
  } = useMutation({
    mutationFn: async () => {
      if (!isValidTransactionInput) return;

      // only validated on condition above, only use if to fix "?." typing
      if (!wallet) return;
      if (!amount) return;
      if (!balance) return;

      try {
        const transferTxRequest = await createTransfer({
          amount,
          feeDiscount: 400,
          destinyAddress,
          assetId,
          wallet,
          balance,
          isUsingMaxBalance: !!isUsingMaxBalance,
        });

        // send the transaction
        const txResponse = await wallet.sendTransaction(transferTxRequest);
        return txResponse;
      } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
      }
    },
  });

  const { data: txStatus } = useTransactionStatus({
    txId: data?.id,
  });

  const isConfirmingTransaction = useMemo<boolean>(() => {
    if (!data?.id) return false;
    return !txStatus || txStatus?.isStatusPending;
  }, [txStatus, data]);

  const handleSendTransaction = () => {
    mutate();
  };

  function handleSelectAsset(assetId: string) {
    setAmount(undefined);
    setAssetId(assetId);
  }

  const hasMultipleAssets = balances.length > 1;

  useEffect(() => {
    if (txStatus?.isStatusSuccess) {
      startTransition(() => {
        navigate(Routes.txSimple(txStatus.id));
      });
    }
  }, [txStatus, navigate]);

  return {
    data: {
      hasMultipleAssets,
      balance,
      assetFormat,
      amount,
      assetId,
      asset,
      isUsingMaxBalance,
      isInsufficientBalance,
      wallet,
      destinyAddress,
      isValidTransactionInput,
      isSubmittingTransaction,
      isConfirmingTransaction,
      isBuildingTransactionPage,
    },
    handlers: {
      handleSendTransaction,
      handleSelectAsset,
      setAmount,
      setDestinyAddress,
    },
  };
}
