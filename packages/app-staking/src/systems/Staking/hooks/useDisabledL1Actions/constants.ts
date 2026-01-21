import {
  PendingSequencerOperationType,
  PendingTransactionTypeL1,
} from '~staking/systems/Core/hooks/usePendingTransactions';

export type SequencerOperationProgressStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'timeout';

/**
 * BLOCKING RULES DOCUMENTATION
 *
 * When New Staking (Delegate):
 * - can't: new staking, withdraw
 * - can: claim on any validator, redelegate, undelegate
 *
 * When Claim Rewards:
 * - can: new staking, withdraw, redelegate, undelegate
 * - can't: claim on same validator (validator-specific rule)
 * - can: claim on other validators
 *
 * When Redelegate:
 * - can: new staking, withdraw, claim on any validator
 * - can't: redelegate on any validator, undelegate on any validator
 *
 * When Undelegate:
 * - can: new staking, withdraw, claim on any validator
 * - can't: undelegate on any validator
 * - can't: redelegate on same validator (validator-specific rule)
 * - can: redelegate on other validators
 *
 * When Withdraw:
 * - can't: new staking, withdraw
 * - can: claim, redelegate, undelegate
 */

// If there's a pending transaction of this type, will disable the following actions globally
export const GLOBAL_DISABLED_ACTIONS: Partial<
  Record<
    PendingTransactionTypeL1 | PendingSequencerOperationType,
    Partial<Record<PendingTransactionTypeL1, boolean>>
  >
> = {
  // When Withdraw is pending
  [PendingTransactionTypeL1.WithdrawStart]: {
    [PendingTransactionTypeL1.WithdrawStart]: true,
    [PendingTransactionTypeL1.Delegate]: true,
  },
  [PendingTransactionTypeL1.PendingWithdraw]: {
    [PendingTransactionTypeL1.WithdrawStart]: true,
    [PendingTransactionTypeL1.Delegate]: true,
  },
  [PendingTransactionTypeL1.WithdrawFinalize]: {
    [PendingTransactionTypeL1.WithdrawStart]: true,
    [PendingTransactionTypeL1.Delegate]: true,
  },

  // When Migrate is pending
  [PendingTransactionTypeL1.Migrate]: {
    [PendingTransactionTypeL1.Migrate]: true,
  },

  // When New Staking (Delegate) is pending
  // Can't: new staking, withdraw
  // Can: claim on any validator, redelegate, undelegate
  [PendingTransactionTypeL1.Delegate]: {
    [PendingTransactionTypeL1.Delegate]: true,
    [PendingTransactionTypeL1.WithdrawStart]: true,
  },

  // When Claim Rewards is pending
  // Can: new staking, withdraw, redelegate, undelegate, claim on other validators
  // Can't: claim on same validator (handled in VALIDATOR_SPECIFIC_DISABLED_ACTIONS)
  [PendingTransactionTypeL1.ClaimReward]: {
    // No global blocks - only validator-specific block for same validator claim
  },

  // When Redelegate is pending
  // Can: new staking, withdraw, claim on any validator
  // Can't: redelegate on any validator, undelegate on any validator
  [PendingTransactionTypeL1.Redelegate]: {
    [PendingTransactionTypeL1.Undelegate]: true,
    [PendingTransactionTypeL1.Redelegate]: true,
  },

  // When Undelegate is pending (L1 or Sequencer - both have same enum value 'UNDELEGATE')
  // Can: new staking, withdraw, claim on any validator
  // Can't: undelegate on any validator
  // Redelegate on same validator is handled in VALIDATOR_SPECIFIC_DISABLED_ACTIONS
  // Note: PendingSequencerOperationType.Undelegate has same value, so this covers both
  [PendingTransactionTypeL1.Undelegate]: {
    [PendingTransactionTypeL1.Undelegate]: true,
  },

  // Sequencer operation: Claim Rewards processing
  // Same rules as L1 ClaimReward - only validator-specific block
  [PendingSequencerOperationType.WithdrawDelegatorReward]: {
    // No global blocks - only validator-specific block for same validator claim
  },

  // Sequencer operation: Redelegate processing
  // Can: new staking, withdraw, claim on any validator
  // Can't: redelegate on any validator, undelegate on any validator
  [PendingSequencerOperationType.BeginRedelegate]: {
    [PendingTransactionTypeL1.Undelegate]: true,
    [PendingTransactionTypeL1.Redelegate]: true,
  },

  // Sequencer operation: Withdraw processing
  // Same rules as L1 Withdraw
  [PendingSequencerOperationType.Withdraw]: {
    [PendingTransactionTypeL1.WithdrawStart]: true,
    [PendingTransactionTypeL1.Delegate]: true,
  },

  // Sequencer operation: Delegate processing
  // Same rules as L1 Delegate
  [PendingSequencerOperationType.Delegate]: {
    [PendingTransactionTypeL1.Delegate]: true,
    [PendingTransactionTypeL1.WithdrawStart]: true,
  },
};

// Disables actions for a specific validator
// These rules only apply when the pending operation's validator matches the target validator
export const VALIDATOR_SPECIFIC_DISABLED_ACTIONS: Partial<
  Record<
    PendingTransactionTypeL1 | PendingSequencerOperationType,
    Partial<Record<PendingTransactionTypeL1, boolean>>
  >
> = {
  // When Claim Rewards is pending on a validator
  // Can't: claim on same validator
  // Can: claim on other validators (no global block)
  [PendingTransactionTypeL1.ClaimReward]: {
    [PendingTransactionTypeL1.ClaimReward]: true,
  },

  // When Undelegate is pending on a validator (L1 or Sequencer - same enum value)
  // Can't: redelegate on same validator
  // Can: redelegate on other validators
  // Note: Undelegate on any validator is already blocked globally
  // Note: PendingSequencerOperationType.Undelegate has same value, so this covers both
  [PendingTransactionTypeL1.Undelegate]: {
    [PendingTransactionTypeL1.Redelegate]: true,
  },

  // When Allowance is pending
  [PendingTransactionTypeL1.Allowance]: {
    [PendingTransactionTypeL1.Delegate]: true,
  },

  // Sequencer operation blocking rules (validator-specific)
  [PendingSequencerOperationType.WithdrawCommission]: {
    [PendingTransactionTypeL1.ClaimReward]: true,
  },

  // When Claim Rewards is processing on sequencer for a validator
  // Can't: claim on same validator
  // Can: claim on other validators
  [PendingSequencerOperationType.WithdrawDelegatorReward]: {
    [PendingTransactionTypeL1.ClaimReward]: true,
  },
};

/**
 * Human-readable labels for sequencer operation types
 */
const sequencerOperationLabel: Record<PendingSequencerOperationType, string> = {
  [PendingSequencerOperationType.WithdrawDelegatorReward]: 'Claim Rewards',
  [PendingSequencerOperationType.WithdrawCommission]: 'Withdraw Commission',
  [PendingSequencerOperationType.BeginRedelegate]: 'Redelegate',
  [PendingSequencerOperationType.Delegate]: 'Delegate',
  [PendingSequencerOperationType.Undelegate]: 'Undelegate',
  [PendingSequencerOperationType.Withdraw]: 'Withdraw',
};

/**
 * Generate blocking reason message based on operation type and status.
 * Provides clear UI feedback about why an action is disabled.
 */
export const getBlockingReason = (
  operationType: PendingSequencerOperationType,
  status: SequencerOperationProgressStatus,
): string => {
  const operationName = sequencerOperationLabel[operationType] || 'operation';

  switch (status) {
    case 'pending':
      return `Waiting for ${operationName} transaction to be confirmed on Ethereum.`;
    case 'processing':
      return `Your ${operationName} is being processed by the sequencer. Please wait (usually 1-3 minutes).`;
    case 'timeout':
      return `${operationName} is taking longer than expected. Please refresh to check status.`;
    default:
      return `${operationName} operation is in progress.`;
  }
};
