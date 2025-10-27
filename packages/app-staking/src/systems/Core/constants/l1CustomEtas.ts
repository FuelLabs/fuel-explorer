import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';

export const SEQUENCER_CUSTOM_ETA_TYPES: Partial<
  Record<PendingTransactionTypeL1, true>
> = {
  [PendingTransactionTypeL1.WithdrawFinalize]: true,
  [PendingTransactionTypeL1.Undelegate]: true,
};

export const SEQUENCER_CUSTOM_ETA_NEXT: Partial<
  Record<PendingTransactionTypeL1, PendingTransactionTypeL1>
> = {
  [PendingTransactionTypeL1.WithdrawStart]:
    PendingTransactionTypeL1.WithdrawFinalize,
  [PendingTransactionTypeL1.PendingWithdraw]:
    PendingTransactionTypeL1.WithdrawFinalize,
};

export const AVERAGE_BRIDGE_TIME_L1_MS = 35 * 60 * 1000; // 35 minutes
export const AVERAGE_BRIDGE_TIME_SEQUENCER_MS = 2 * 60 * 60 * 1000; // 2 hours

export const TIME_PER_TRANSACTION_MS: Record<
  | PendingTransactionTypeL1.Undelegate
  | PendingTransactionTypeL1.PendingWithdraw
  | PendingTransactionTypeL1.WithdrawStart,
  number
> = {
  [PendingTransactionTypeL1.Undelegate]: AVERAGE_BRIDGE_TIME_SEQUENCER_MS,
  [PendingTransactionTypeL1.WithdrawStart]:
    AVERAGE_BRIDGE_TIME_SEQUENCER_MS + AVERAGE_BRIDGE_TIME_L1_MS,
  [PendingTransactionTypeL1.PendingWithdraw]: AVERAGE_BRIDGE_TIME_SEQUENCER_MS,
};
