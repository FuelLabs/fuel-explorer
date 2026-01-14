import { useMemo } from 'react';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  type PendingSequencerOperation,
  PendingSequencerOperationType,
  type PendingTransactionTypeL1,
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { GLOBAL_DISABLED_ACTIONS } from './useDisabledL1Actions/constants';
import { useSequencerOperationStatus } from './useSequencerOperationStatus';

export interface ProgressInfo {
  stage:
    | 'pending'
    | 'included'
    | 'confirmed'
    | 'completed'
    | 'failed'
    | 'timeout';
  progressPercentage: number;
  message: string;
  blocksSinceInclusion?: number;
  blockHeight?: string;
}

/**
 * Check if an operation blocks a specific L1 action.
 * Uses the same blocking rules as constants.ts to ensure consistency.
 */
function doesOperationBlockAction(
  operation: PendingSequencerOperationType,
  action: PendingTransactionTypeL1,
): boolean {
  return GLOBAL_DISABLED_ACTIONS[operation]?.[action] ?? false;
}

/**
 * Hook that provides detailed progress information for a specific pending operation.
 * Shows actual block confirmations and stage-specific messaging.
 *
 * @example
 * const { stage, progressPercentage, message } = useSequencerOperationProgress(
 *   PendingTransactionTypeL1.ClaimReward,
 *   validator
 * );
 */
export const useSequencerOperationProgress = (
  action: PendingTransactionTypeL1,
  validatorAddress?: SequencerValidatorAddress,
): ProgressInfo | null => {
  const { data: pendingTransactions } = usePendingTransactions();

  // Find the first incomplete sequencer operation that actually blocks this action
  const blockingOperation = useMemo(() => {
    return pendingTransactions?.find(
      (tx): tx is PendingSequencerOperation =>
        isPendingSequencerOperation(tx) &&
        !tx.completed &&
        doesOperationBlockAction(tx.type, action),
    );
  }, [pendingTransactions, action]);

  // Query the status of the blocking operation
  const { data: operationStatus } = useSequencerOperationStatus(
    blockingOperation?.sequencerHash,
  );

  return useMemo(() => {
    if (!blockingOperation || !operationStatus) {
      return null;
    }

    const {
      progressPercentage = 0,
      progressStage = 'pending',
      blocksSinceInclusion,
    } = operationStatus;

    const message = getProgressMessage(
      blockingOperation.type,
      progressStage,
      blocksSinceInclusion,
      validatorAddress,
    );

    return {
      stage: progressStage,
      progressPercentage,
      message,
      blocksSinceInclusion,
      blockHeight: operationStatus.height,
    };
  }, [blockingOperation, operationStatus, validatorAddress]);
};

/**
 * Get a progress-aware message for the user
 */
function getProgressMessage(
  operation: PendingSequencerOperationType,
  stage: string,
  blocksSinceInclusion = 0,
  validator?: SequencerValidatorAddress,
): string {
  const operationName = getOperationName(operation);
  const validatorNote = validator ? ` for validator ${validator}` : '';

  switch (stage) {
    case 'pending':
      return `⏳ Your ${operationName} is being submitted to the sequencer...${validatorNote}`;

    case 'included':
      return `📝 ${operationName} submitted (${blocksSinceInclusion}/3 confirmations)${validatorNote}`;

    case 'confirmed':
      return `✅ ${operationName} confirmed! Cleaning up...${validatorNote}`;

    case 'completed':
      return `✨ ${operationName} complete! You're all set.${validatorNote}`;

    case 'failed':
      return `❌ ${operationName} failed. Please try again.${validatorNote}`;

    default:
      return `Processing ${operationName}...${validatorNote}`;
  }
}

/**
 * Get human-readable operation name
 */
function getOperationName(operation: PendingSequencerOperationType): string {
  switch (operation) {
    case PendingSequencerOperationType.WithdrawDelegatorReward:
      return 'claim rewards';
    case PendingSequencerOperationType.WithdrawCommission:
      return 'commission withdrawal';
    case PendingSequencerOperationType.BeginRedelegate:
      return 'redelegation';
    case PendingSequencerOperationType.Undelegate:
      return 'undelegation';
    case PendingSequencerOperationType.Withdraw:
      return 'withdrawal';
    default:
      return 'operation';
  }
}
