import {
  PendingSequencerOperationType,
  PendingTransactionTypeL1,
} from '~staking/systems/Core/hooks/usePendingTransactions';

export type SequencerOperationProgressStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'timeout';

// If there's a pending transaction of this type, will disable the following actions globally
export const GLOBAL_DISABLED_ACTIONS: Partial<
  Record<
    PendingTransactionTypeL1 | PendingSequencerOperationType,
    Partial<Record<PendingTransactionTypeL1, boolean>>
  >
> = {
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
  [PendingTransactionTypeL1.Migrate]: {
    [PendingTransactionTypeL1.Migrate]: true,
  },
  [PendingTransactionTypeL1.Delegate]: {
    [PendingTransactionTypeL1.Delegate]: true,
    [PendingTransactionTypeL1.WithdrawStart]: true,
  },
  // Sequencer operation blocking rules
  [PendingSequencerOperationType.WithdrawDelegatorReward]: {
    // Block all staking operations while rewards are being claimed on sequencer
    // This prevents users from making changes before their rewards are credited
    [PendingTransactionTypeL1.WithdrawStart]: true,
    [PendingTransactionTypeL1.Delegate]: true,
    [PendingTransactionTypeL1.Undelegate]: true,
    [PendingTransactionTypeL1.Redelegate]: true,
    [PendingTransactionTypeL1.ClaimReward]: true,
  },
  [PendingSequencerOperationType.BeginRedelegate]: {
    [PendingTransactionTypeL1.Delegate]: true,
    [PendingTransactionTypeL1.Undelegate]: true,
    [PendingTransactionTypeL1.Redelegate]: true,
  },
  [PendingSequencerOperationType.Undelegate]: {
    [PendingTransactionTypeL1.Delegate]: true,
    [PendingTransactionTypeL1.Undelegate]: true,
    [PendingTransactionTypeL1.Redelegate]: true,
  },
  [PendingSequencerOperationType.Withdraw]: {
    // Block staking operations while withdrawal is being processed on sequencer
    [PendingTransactionTypeL1.WithdrawStart]: true,
    [PendingTransactionTypeL1.Delegate]: true,
    [PendingTransactionTypeL1.Undelegate]: true,
    [PendingTransactionTypeL1.Redelegate]: true,
    [PendingTransactionTypeL1.ClaimReward]: true,
  },
};

// Disables actions for a specific validator
export const VALIDATOR_SPECIFIC_DISABLED_ACTIONS: Partial<
  Record<
    PendingTransactionTypeL1 | PendingSequencerOperationType,
    Partial<Record<PendingTransactionTypeL1, boolean>>
  >
> = {
  [PendingTransactionTypeL1.ClaimReward]: {
    [PendingTransactionTypeL1.ClaimReward]: true,
  },
  [PendingTransactionTypeL1.Undelegate]: {
    [PendingTransactionTypeL1.Redelegate]: true,
    [PendingTransactionTypeL1.Undelegate]: true,
  },

  [PendingTransactionTypeL1.Redelegate]: {
    [PendingTransactionTypeL1.Redelegate]: true,
    [PendingTransactionTypeL1.Undelegate]: true,
  },
  [PendingTransactionTypeL1.Allowance]: {
    [PendingTransactionTypeL1.Delegate]: true,
  },
  // Sequencer operation blocking rules (validator-specific)
  [PendingSequencerOperationType.WithdrawCommission]: {
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
