import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { FuelToken } from 'app-commons';
import { TOKENS } from 'app-commons';
import { type BN, bn } from 'fuels';
import { useCallback, useEffect, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import {
  stakeNewDialogMachine,
  stakeNewDialogMachineSelectors,
} from '../machines/stakeNewDialogMachine';
import { useSharedSequencerBalance } from '../services/useSharedSequencerBalance';
import { useTokenBalance } from '../services/useTokenBalance';
import { useStakeForm } from './useStakeForm';
import { useValidatorsList } from './useValidatorsList';

const v2 = TOKENS[FuelToken.V2];
const { token, decimals } = v2;

export function useStakeNewDialog({
  validator: validatorInput,
}: { validator: SequencerValidatorAddress }) {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();

  const { data: tokens } = useTokenBalance(token, account);
  const { data: sequencerBalance } = useSharedSequencerBalance(account);
  const tokenBalance = useFormatBalance(tokens, decimals);

  const { validators } = useValidatorsList();
  const filteredValidators = useMemo(() => {
    return validators?.filter((validator) => {
      return validator.operator_address !== validatorInput;
    });
  }, [validators, validatorInput]);

  const isReady = !!walletClient;

  const service = useInterpret(stakeNewDialogMachine);

  // useEffect(() => {
  //   if (totalDelegated) {
  //     service.send({
  //       type: 'SET_STAKED_AMOUNT',
  //       stakedAmount: bn(totalDelegated),
  //     });
  //   }
  // }, [totalDelegated, service]);

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
        type: 'SET_VALIDATOR',
        validator: validatorInput,
      });
    }
  }, [validatorInput, service]);

  useEffect(() => {
    if (tokenBalance.amount) {
      service.send({
        type: 'SET_BALANCE_L1',
        balanceL1: tokenBalance.amount,
      });
    }
  }, [tokenBalance.amount, service]);

  useEffect(() => {
    if (sequencerBalance?.amount) {
      service.send({
        type: 'SET_BALANCE_SEQUENCER',
        balanceSequencer: bn(sequencerBalance?.amount),
      });
    }
  }, [sequencerBalance?.amount, service]);

  const totalBalance = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getTotalBalance(state.context),
  );

  const { control } = useStakeForm(totalBalance);
  const amountController = useController({ control, name: 'amount' });
  const validatorController = useController({
    control,
    name: 'validator',
  });

  const amountValue: BN | null = amountController.field.value as BN | null;

  useEffect(() => {
    service.send({
      type: 'SET_AMOUNT',
      amount: amountValue,
    });
  }, [amountValue, service]);

  // Watch validatorController value and send SET_TO_VALIDATOR event when it changes
  const validatorValue = validatorController.field.value;
  useEffect(() => {
    if (validatorValue) {
      service.send({
        type: 'SET_VALIDATOR',
        validator: validatorValue,
      });
    }
  }, [validatorValue, service]);

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
    stakeNewDialogMachineSelectors.isSubmitting(state),
  );

  const isReviewing = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isReviewing(state),
  );

  const isWaitingForAmount = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isWaitingForAmount(state),
  );

  const isReviewPage = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isReviewPage(state),
  );

  const isApprovalPage = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isApprovalPage(state),
  );

  const stakeError = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getStakeError(state.context),
  );
  const formError = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getFormError(state.context),
  );

  const ethAccount = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getEthAccount(state.context),
  );
  const isGettingReviewDetails = useSelector(
    service,
    stakeNewDialogMachineSelectors.isGettingReviewDetails,
  );
  const amountFromSequencer = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getAmountFromSequencer(state.context),
  );
  const amountFromL1 = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getAmountFromL1(state.context),
  );
  const fee = useSelector(service, (state) => state.context.fee);
  const rates = useSelector(service, (state) => state.context.rates);
  const validator = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getValidator(state.context),
  );
  const needsApproval = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.needsApproval(state.context),
  );
  const goBackToAmount = useCallback(() => {
    service.send({ type: 'BACK_TO_AMOUNT' });
  }, [service]);
  const goBackToReview = useCallback(() => {
    service.send({ type: 'BACK_TO_REVIEW' });
  }, [service]);

  const goToApproval = useCallback(() => {
    service.send({ type: 'GO_TO_APPROVAL' });
  }, [service]);

  const isApprovalCompleted = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isApprovalCompleted(state.context),
  );

  // Add onApprove function to trigger the APPROVE event
  const onApprove = useCallback(() => {
    service.send({ type: 'APPROVE' });
  }, [service]);

  // Get fromAccount - this is already available as ethAccount
  const fromAccount = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getEthAccount(state.context),
  );
  const isLoadingApproval = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isLoadingApproval(state),
  );
  const approvalError = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.approvalError(state.context),
  );
  const isReadyToConfirm = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isReadyToConfirm(state.context),
  );

  const navigationDirection = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.navigationDirection(state.context),
  );

  const isBlocked = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.isBlocked(state.context),
  );
  const blockingMessage = useSelector(service, (state) =>
    stakeNewDialogMachineSelectors.getBlockingMessage(state.context),
  );

  return {
    state: useSelector(service, (state) => state),
    send: service.send,
    amount: amountValue,
    totalBalance,
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
    stakeError,
    formError,
    goBackToAmount,
    goBackToReview,
    validator,
    validators: filteredValidators,
    validatorController,
    amountFromSequencer,
    amountFromL1,
    needsApproval,
    goToApproval,
    isApprovalPage,
    isApprovalCompleted,
    onApprove,
    fromAccount,
    isLoadingApproval,
    approvalError,
    isReadyToConfirm,
    navigationDirection,
    isBlocked,
    blockingMessage,
  };
}
