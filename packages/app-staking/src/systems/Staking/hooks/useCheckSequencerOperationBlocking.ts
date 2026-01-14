import { useMemo } from 'react';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  PendingSequencerOperationType,
  PendingTransactionTypeL1,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  GLOBAL_DISABLED_ACTIONS,
  VALIDATOR_SPECIFIC_DISABLED_ACTIONS,
} from './useDisabledL1Actions/constants';

export interface OperationBlockingInfo {
  isBlocked: boolean;
  blockingOperation?: PendingSequencerOperationType | PendingTransactionTypeL1;
  blockingMessage?: string;
  validator?: SequencerValidatorAddress;
}

export const useCheckSequencerOperationBlocking = (
  action: PendingTransactionTypeL1,
  validatorAddress?: SequencerValidatorAddress,
): OperationBlockingInfo => {
  const { data: pendingTransactions } = usePendingTransactions();

  return useMemo(() => {
    if (!pendingTransactions) {
      return { isBlocked: false };
    }

    for (const tx of pendingTransactions) {
      if (tx.completed) {
        continue;
      }

      const globalRules = GLOBAL_DISABLED_ACTIONS[tx.type];
      if (globalRules?.[action]) {
        return {
          isBlocked: true,
          blockingOperation: tx.type,
          blockingMessage: getBlockingMessage(tx.type),
        };
      }

      // Check validator-specific blocking rules
      if (validatorAddress === tx.validator) {
        const validatorRules = VALIDATOR_SPECIFIC_DISABLED_ACTIONS[tx.type];
        if (validatorRules?.[action]) {
          return {
            isBlocked: true,
            blockingOperation: tx.type,
            blockingMessage: getBlockingMessage(tx.type, validatorAddress),
            validator: tx.validator,
          };
        }
      }
    }

    return { isBlocked: false };
  }, [pendingTransactions, action, validatorAddress]);
};

function getBlockingMessage(
  operation: PendingSequencerOperationType | PendingTransactionTypeL1,
  validator?: SequencerValidatorAddress,
): string {
  const validatorSuffix = validator ? ` (Validator: ${validator})` : '';

  switch (operation) {
    case PendingSequencerOperationType.WithdrawDelegatorReward:
      return `Your claim rewards transaction is being processed. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to proceed.${validatorSuffix}`;
    case PendingSequencerOperationType.WithdrawCommission:
      return `Your commission withdrawal is being processed. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to claim rewards.${validatorSuffix}`;
    case PendingSequencerOperationType.BeginRedelegate:
      return `Your redelegation is being finalized. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to make other delegation changes.${validatorSuffix}`;
    case PendingSequencerOperationType.Undelegate:
      return `Your undelegation is being finalized. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to delegate or undelegate again.${validatorSuffix}`;
    case PendingSequencerOperationType.Withdraw:
      return `Your withdrawal is being processed. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to proceed.`;

    case PendingTransactionTypeL1.Delegate:
      return `Your delegation transaction is pending. Please wait for it to be confirmed.${validatorSuffix}`;
    case PendingTransactionTypeL1.Undelegate:
      return `Your undelegation transaction is pending. Please wait for it to be confirmed.${validatorSuffix}`;
    case PendingTransactionTypeL1.Redelegate:
      return `Your redelegation transaction is pending. Please wait for it to be confirmed.${validatorSuffix}`;
    case PendingTransactionTypeL1.ClaimReward:
      return `Your claim rewards transaction is pending. Please wait for it to be confirmed.${validatorSuffix}`;
    case PendingTransactionTypeL1.WithdrawStart:
    case PendingTransactionTypeL1.WithdrawFinalize:
    case PendingTransactionTypeL1.PendingWithdraw:
      return 'Your withdrawal transaction is pending. Please wait for it to be confirmed.';
    case PendingTransactionTypeL1.Migrate:
      return 'Your migration transaction is pending. Please wait for it to be confirmed.';

    default:
      return `A pending operation is being processed. Once confirmed, you'll be able to proceed.`;
  }
}
