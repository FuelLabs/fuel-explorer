import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';

// If there's a pending transaction of this type, will disable the following actions globally
export const GLOBAL_DISABLED_ACTIONS: Partial<
  Record<
    PendingTransactionTypeL1,
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
};

// Disables actions for a specific validator
export const VALIDATOR_SPECIFIC_DISABLED_ACTIONS: Partial<
  Record<
    PendingTransactionTypeL1,
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
};
