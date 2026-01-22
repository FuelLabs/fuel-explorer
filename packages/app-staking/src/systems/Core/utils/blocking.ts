import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  PendingSequencerOperationType,
  type PendingTransaction,
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

const SEQUENCER_BLOCKING_MESSAGES: Partial<
  Record<PendingSequencerOperationType, string>
> = {
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
};

const L1_BLOCKING_MESSAGES: Partial<Record<PendingTransactionTypeL1, string>> =
  {
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

function getBlockingMessage(tx: PendingTransaction): string {
  if (tx.layer === 'sequencer') {
    return (
      SEQUENCER_BLOCKING_MESSAGES[tx.type] ??
      'You have a pending operation being processed.'
    );
  }

  return (
    L1_BLOCKING_MESSAGES[tx.type] ??
    'You have a pending operation being processed.'
  );
}

/**
 * Pure function to check if an operation is blocked by pending transactions.
 * This can be used both in React hooks and in XState machines.
 */
export function checkOperationBlocking(
  pendingTransactions: Array<PendingTransaction> | undefined | null,
  action: PendingTransactionTypeL1,
  validatorAddress?: SequencerValidatorAddress,
): OperationBlockingInfo {
  if (!pendingTransactions) {
    return { isBlocked: false };
  }

  const normalizedValidator = validatorAddress?.toLowerCase();

  for (const tx of pendingTransactions) {
    if (tx.completed) {
      continue;
    }

    const globalRules = (
      GLOBAL_DISABLED_ACTIONS as Record<
        string,
        Partial<Record<PendingTransactionTypeL1, boolean>> | undefined
      >
    )[tx.type];
    if (globalRules?.[action]) {
      return {
        isBlocked: true,
        blockingOperation: tx.type,
        blockingMessage: getBlockingMessage(tx),
      };
    }

    // Check validator-specific blocking rules
    const txValidator = tx.validator?.toLowerCase();
    if (
      normalizedValidator &&
      txValidator &&
      normalizedValidator === txValidator
    ) {
      const validatorRules = (
        VALIDATOR_SPECIFIC_DISABLED_ACTIONS as Record<
          string,
          Partial<Record<PendingTransactionTypeL1, boolean>> | undefined
        >
      )[tx.type];
      if (validatorRules?.[action]) {
        return {
          isBlocked: true,
          blockingOperation: tx.type,
          blockingMessage: getBlockingMessage(tx),
          validator: tx.validator,
        };
      }
    }
  }

  return { isBlocked: false };
}
