import { useMemo } from 'react';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  PendingSequencerOperationType,
  type PendingTransactionTypeL1,
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  GLOBAL_DISABLED_ACTIONS,
  VALIDATOR_SPECIFIC_DISABLED_ACTIONS,
} from './useDisabledL1Actions/constants';

export interface SequencerOperationBlockingInfo {
  isBlocked: boolean;
  blockingOperation?: PendingSequencerOperationType;
  blockingMessage?: string;
  validator?: SequencerValidatorAddress;
}

/**
 * Hook to check if sequencer operations are blocking a specific L1 action.
 * Returns blocking information and a user-friendly message.
 *
 * Example:
 * const { isBlocked, blockingMessage } = useCheckSequencerOperationBlocking(
 *   PendingTransactionTypeL1.ClaimReward,
 *   validator
 * );
 */
export const useCheckSequencerOperationBlocking = (
  action: PendingTransactionTypeL1,
  validatorAddress?: SequencerValidatorAddress,
): SequencerOperationBlockingInfo => {
  const { data: pendingTransactions } = usePendingTransactions();

  return useMemo(() => {
    if (!pendingTransactions) {
      return { isBlocked: false };
    }

    for (const tx of pendingTransactions) {
      if (tx.completed) continue;
      if (!isPendingSequencerOperation(tx)) continue;

      // Check global blocking rules
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

/**
 * Get a user-friendly message for why an action is blocked by a sequencer operation
 */
function getBlockingMessage(
  operation: PendingSequencerOperationType,
  validator?: SequencerValidatorAddress,
): string {
  switch (operation) {
    case PendingSequencerOperationType.WithdrawDelegatorReward:
      return `Your claim rewards transaction is being processed. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to proceed.${validator ? ` (Validator: ${validator})` : ''}`;
    case PendingSequencerOperationType.WithdrawCommission:
      return `Your commission withdrawal is being processed. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to claim rewards.${validator ? ` (Validator: ${validator})` : ''}`;
    case PendingSequencerOperationType.BeginRedelegate:
      return `Your redelegation is being finalized. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to make other delegation changes.${validator ? ` (Validator: ${validator})` : ''}`;
    case PendingSequencerOperationType.Undelegate:
      return `Your undelegation is being finalized. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to delegate or undelegate again.${validator ? ` (Validator: ${validator})` : ''}`;
    case PendingSequencerOperationType.Withdraw:
      return `Your withdrawal is being processed. Once confirmed on the sequencer (usually 1-3 minutes), you'll be able to proceed.`;
    default:
      return `A pending sequencer operation is being processed. Once confirmed (usually 1-3 minutes), you'll be able to proceed.`;
  }
}
