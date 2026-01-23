import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { type BN, bn } from 'fuels';
import { useCallback, useEffect } from 'react';
import { useController } from 'react-hook-form';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { useWithdrawForm } from '~staking/systems/Staking/hooks/useWithdrawForm';
import {
  withdrawNewDialogMachine,
  withdrawNewDialogMachineSelectors,
} from '../machines/withdrawNewDialogMachine';
import { useSharedSequencerBalance } from '../services/useSharedSequencerBalance';

export function useWithdrawNewDialog() {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { data: sequencerBalance } = useSharedSequencerBalance(account);
  const queryClient = useQueryClient();
  const isReady = !!walletClient;

  const service = useInterpret(withdrawNewDialogMachine);

  useEffect(() => {
    if (sequencerBalance) {
      service.send({
        type: 'SET_BALANCE',
        balance: bn(sequencerBalance.amount),
      });
    }
  }, [sequencerBalance, service]);

  useEffect(() => {
    if (account) {
      service.send({
        type: 'SET_ETH_ACCOUNT',
        ethAccount: account,
      });
    }
  }, [account, service]);

  useEffect(() => {
    if (publicClient && walletClient && queryClient) {
      service.send({
        type: 'SET_CLIENTS',
        publicClient,
        walletClient,
        queryClient,
      });
    }
  }, [publicClient, walletClient, service, queryClient]);

  const { control } = useWithdrawForm(
    useSelector(service, (state) => state.context.balance),
  );
  const amountController = useController({ control, name: 'amount' });

  const amountValue: BN | null = amountController.field.value as BN | null;

  useEffect(() => {
    service.send({
      type: 'SET_AMOUNT',
      amount: amountValue,
    });
  }, [amountValue, service]);

  const onAmountChange = useCallback(
    (value: BN | null) => {
      amountController.field.onChange(value);
    },
    [amountController.field],
  );

  const goToReview = useCallback(() => {
    service.send({ type: 'REVIEW' });
  }, [service]);

  const onConfirm = useCallback(() => {
    service.send({ type: 'CONFIRM' });
  }, [service]);

  const isSubmitting = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.isSubmitting(state),
  );

  const isWaitingForAmount = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.isWaitingForAmount(state),
  );

  const isReviewing = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.isReviewing(state),
  );

  const isReviewPage = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.isReviewPage(state),
  );

  const withdrawError = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.getWithdrawError(state.context),
  );
  const formError = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.getFormError(state.context),
  );

  const balance = useSelector(service, (state) => state.context.balance);
  const ethAccount = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.getEthAccount(state.context),
  );
  const isGettingReviewDetails = useSelector(
    service,
    withdrawNewDialogMachineSelectors.isGettingReviewDetails,
  );

  const fee = useSelector(service, (state) => state.context.fee);
  const rates = useSelector(service, (state) => state.context.rates);

  const goBackToAmount = useCallback(() => {
    service.send({ type: 'BACK_TO_AMOUNT' });
  }, [service]);

  const isBlocked = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.isBlocked(state.context),
  );
  const blockingMessage = useSelector(service, (state) =>
    withdrawNewDialogMachineSelectors.getBlockingMessage(state.context),
  );

  return {
    state: useSelector(service, (state) => state),
    send: service.send,
    amount: amountValue,
    balance,
    ethAccount,
    isReady,
    isSubmitting,
    isReviewing,
    isWaitingForAmount,
    isReviewPage,
    isGettingReviewDetails,
    goToReview,
    onConfirm,
    onAmountChange,
    fee,
    rates,
    onClose: () => service.send({ type: 'CLOSE' }),
    withdrawError,
    formError,
    goBackToAmount,
    isBlocked,
    blockingMessage,
  };
}
