import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { type BN, bn } from 'fuels';
import { useCallback, useEffect, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import {
  redelegateNewDialogMachine,
  redelegateNewDialogMachineSelectors,
} from '../machines/redelegateNewDialogMachine';
import { useAccountValidatorDelegations } from '../services/useAccountValidatorDelegations';
import { useRedelegateForm } from './useRedelegateForm';
import { useValidatorsList } from './useValidatorsList';

export function useRedelegateNewDialog({
  validator: validatorInput,
}: { validator: SequencerValidatorAddress }) {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();

  const { data: totalDelegated } = useAccountValidatorDelegations({
    address: account,
    validator: validatorInput,
    options: {
      select: (data) => data?.delegation_response?.balance?.amount,
    },
  });
  const { validators } = useValidatorsList();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filteredValidators = useMemo(() => {
    return validators?.filter((validator) => {
      return validator.operator_address !== validatorInput;
    });
  }, [validators, validatorInput]);

  const isReady = !!walletClient;

  const service = useInterpret(redelegateNewDialogMachine);

  useEffect(() => {
    if (totalDelegated) {
      service.send({
        type: 'SET_STAKED_AMOUNT',
        stakedAmount: bn(totalDelegated),
      });
    }
  }, [totalDelegated, service]);

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

  useEffect(() => {
    if (validatorInput) {
      service.send({
        type: 'SET_FROM_VALIDATOR',
        validator: validatorInput,
      });
    }
  }, [validatorInput, service]);

  const { control } = useRedelegateForm(
    useSelector(service, (state) => state.context.stakedAmount),
  );
  const amountController = useController({ control, name: 'amount' });
  const toValidatorController = useController({
    control,
    name: 'toValidator',
  });

  const amountValue: BN | null = amountController.field.value as BN | null;

  useEffect(() => {
    service.send({
      type: 'SET_AMOUNT',
      amount: amountValue,
    });
  }, [amountValue, service]);

  // Watch toValidatorController value and send SET_TO_VALIDATOR event when it changes
  const toValidatorValue = toValidatorController.field.value;
  useEffect(() => {
    if (toValidatorValue) {
      service.send({
        type: 'SET_TO_VALIDATOR',
        validator: toValidatorValue,
      });
    }
  }, [toValidatorValue, service]);

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
    redelegateNewDialogMachineSelectors.isSubmitting(state),
  );

  const isReviewing = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.isReviewing(state),
  );

  const isWaitingForAmount = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.isWaitingForAmount(state),
  );

  const isReviewPage = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.isReviewPage(state),
  );

  const redelegateError = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.getRedelegateError(state.context),
  );
  const formError = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.getFormError(state.context),
  );

  const stakedAmount = useSelector(
    service,
    (state) => state.context.stakedAmount,
  );
  const ethAccount = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.getEthAccount(state.context),
  );
  const isGettingReviewDetails = useSelector(
    service,
    redelegateNewDialogMachineSelectors.isGettingReviewDetails,
  );

  const fee = useSelector(service, (state) => state.context.fee);
  const rates = useSelector(service, (state) => state.context.rates);
  const fromValidator = useSelector(
    service,
    redelegateNewDialogMachineSelectors.getFromValidator,
  );
  const toValidator = useSelector(
    service,
    redelegateNewDialogMachineSelectors.getToValidator,
  );

  const goBackToAmount = useCallback(() => {
    service.send({ type: 'BACK_TO_AMOUNT' });
  }, [service]);

  const isBlocked = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.isBlocked(state.context),
  );
  const blockingMessage = useSelector(service, (state) =>
    redelegateNewDialogMachineSelectors.getBlockingMessage(state.context),
  );

  return {
    state: useSelector(service, (state) => state),
    send: service.send,
    amount: amountValue,
    stakedAmount,
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
    redelegateError,
    formError,
    goBackToAmount,
    fromValidator,
    toValidator,
    validators: filteredValidators,
    toValidatorController,
    isBlocked,
    blockingMessage,
  };
}
