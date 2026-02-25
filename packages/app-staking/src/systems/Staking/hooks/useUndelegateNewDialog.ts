import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import type { BN } from 'fuels';
import { bn } from 'fuels';
import { useCallback, useEffect } from 'react';
import { useController } from 'react-hook-form';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  undelegateNewDialogMachine,
  undelegateNewDialogMachineSelectors,
} from '~staking/systems/Staking/machines/undelegateNewDialogMachine';
import { useAccountValidatorDelegations } from '../services/useAccountValidatorDelegations';
import { useWithdrawForm } from './useWithdrawForm';

export function useUndelegateNewDialog({
  validator,
}: { validator: SequencerValidatorAddress }) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  // const { data: sequencerBalance } = useSharedSequencerBalance(account);
  const queryClient = useQueryClient();
  const { data: totalDelegated, isLoading: isLoadingStakedAmount } =
    useAccountValidatorDelegations({
      address,
      validator,
      options: {
        select: (data) => data?.delegation_response?.balance?.amount,
      },
    });

  const isReady = !!walletClient;

  const service = useInterpret(undelegateNewDialogMachine);

  useEffect(() => {
    if (validator) {
      service.send({
        type: 'SET_VALIDATOR',
        validator,
      });
    }
  }, [validator, service]);

  useEffect(() => {
    if (totalDelegated) {
      service.send({
        type: 'SET_STAKED_AMOUNT',
        stakedAmount: bn(totalDelegated),
      });
    }
  }, [totalDelegated, service]);

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
    useSelector(service, (state) => state.context.stakedAmount),
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
    undelegateNewDialogMachineSelectors.isSubmitting(state),
  );

  const isReviewing = useSelector(service, (state) =>
    undelegateNewDialogMachineSelectors.isReviewing(state),
  );

  const isWaitingForAmount = useSelector(service, (state) =>
    undelegateNewDialogMachineSelectors.isWaitingForAmount(state),
  );

  const isReviewPage = useSelector(service, (state) =>
    undelegateNewDialogMachineSelectors.isReviewPage(state),
  );

  const undelegateError = useSelector(service, (state) =>
    undelegateNewDialogMachineSelectors.getUndelegateError(state.context),
  );
  const formError = useSelector(service, (state) =>
    undelegateNewDialogMachineSelectors.getFormError(state.context),
  );

  const stakedAmount = useSelector(
    service,
    (state) => state.context.stakedAmount,
  );
  const isGettingReviewDetails = useSelector(
    service,
    undelegateNewDialogMachineSelectors.isGettingReviewDetails,
  );

  const fee = useSelector(service, (state) => state.context.fee);
  const rates = useSelector(service, (state) => state.context.rates);

  const goBackToAmount = useCallback(() => {
    service.send({ type: 'BACK_TO_AMOUNT' });
  }, [service]);

  const isBlocked = useSelector(service, (state) =>
    undelegateNewDialogMachineSelectors.isBlocked(state.context),
  );
  const blockingMessage = useSelector(service, (state) =>
    undelegateNewDialogMachineSelectors.getBlockingMessage(state.context),
  );

  return {
    state: useSelector(service, (state) => state),
    finalizationPeriod: useSelector(service, (state) =>
      undelegateNewDialogMachineSelectors.getFinalizationPeriod(state.context),
    ),
    send: service.send,
    amount: amountValue,
    stakedAmount,
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
    undelegateError,
    formError,
    goBackToAmount,
    isLoadingStakedAmount,
    isBlocked,
    blockingMessage,
  };
}
