import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  type PendingSequencerOperation,
  PendingSequencerOperationType,
  type PendingTransaction,
  type PendingTransactionL1,
  PendingTransactionTypeL1,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  GLOBAL_DISABLED_ACTIONS,
  VALIDATOR_SPECIFIC_DISABLED_ACTIONS,
} from '~staking/systems/Staking/hooks/useDisabledL1Actions/constants';

export interface OperationBlockingInfo {
  isBlocked: boolean;
  blockingOperation?: PendingSequencerOperationType | PendingTransactionTypeL1;
  blockingMessage?: string;
  /** The validator address if this is a validator-specific block */
  validator?: SequencerValidatorAddress;
}

const BLOCKING_MESSAGES: Record<string, string> = {
  // Sequencer operations (20-30 minutes)
  [PendingSequencerOperationType.WithdrawDelegatorReward]:
    'You have a pending claim rewards operation being processed. This typically takes 20-30 minutes.',
  [PendingSequencerOperationType.WithdrawCommission]:
    'You have a pending commission withdrawal being processed. This typically takes 20-30 minutes.',
  [PendingSequencerOperationType.BeginRedelegate]:
    'You have a pending redelegation being processed. This typically takes 20-30 minutes.',
  [PendingSequencerOperationType.Delegate]:
    'You have a pending delegation being processed. This typically takes 20-30 minutes.',
  [PendingSequencerOperationType.Undelegate]:
    'You have a pending undelegation being processed. This typically takes 20-30 minutes.',
  [PendingSequencerOperationType.Withdraw]:
    'You have a pending withdrawal being processed. This typically takes 20-30 minutes.',
  // L1 transactions (pending confirmation)
  [PendingTransactionTypeL1.Delegate]:
    'You have a pending delegation awaiting Ethereum confirmation.',
  [PendingTransactionTypeL1.Undelegate]:
    'You have a pending undelegation awaiting Ethereum confirmation.',
  [PendingTransactionTypeL1.Redelegate]:
    'You have a pending redelegation awaiting Ethereum confirmation.',
  [PendingTransactionTypeL1.ClaimReward]:
    'You have a pending claim rewards transaction awaiting Ethereum confirmation.',
  [PendingTransactionTypeL1.WithdrawStart]:
    'You have a pending withdrawal awaiting Ethereum confirmation.',
  [PendingTransactionTypeL1.WithdrawFinalize]:
    'You have a pending withdrawal finalization awaiting Ethereum confirmation.',
  [PendingTransactionTypeL1.PendingWithdraw]:
    'You have a pending withdrawal awaiting Ethereum confirmation.',
  [PendingTransactionTypeL1.Migrate]:
    'You have a pending migration awaiting Ethereum confirmation.',
};

function getBlockingMessage(
  operation: PendingSequencerOperationType | PendingTransactionTypeL1,
): string {
  return (
    BLOCKING_MESSAGES[operation] ??
    'You have a pending operation being processed.'
  );
}

/**
 * Pure function to check if an operation is blocked by pending transactions.
 * This can be used both in React hooks and in XState machines.
 */
export function checkOperationBlocking(
  pendingTransactions:
    | Array<
        PendingTransaction | PendingTransactionL1 | PendingSequencerOperation
      >
    | undefined
    | null,
  action: PendingTransactionTypeL1,
  validatorAddress?: SequencerValidatorAddress,
): OperationBlockingInfo {
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
          blockingMessage: getBlockingMessage(tx.type),
          validator: tx.validator,
        };
      }
    }
  }

  return { isBlocked: false };
}
