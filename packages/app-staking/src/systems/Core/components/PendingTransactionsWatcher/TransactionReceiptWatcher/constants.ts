import type { QueryKey } from '@tanstack/react-query';
import { FuelToken, TOKENS } from 'app-commons';
import { readContractQueryKey } from 'wagmi/query';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import { PendingTransactionTypeL1 } from '../../../hooks/usePendingTransactions';
import type { ModularQueryKey } from './types';

const v1 = TOKENS[FuelToken.V1];
const v2 = TOKENS[FuelToken.V2];

export const transactionTypeLabel: Record<PendingTransactionTypeL1, string> = {
  [PendingTransactionTypeL1.Migrate]: 'Migration',
  [PendingTransactionTypeL1.ClaimReward]: 'Reward Claim',
  [PendingTransactionTypeL1.ClaimVesting]: 'Vesting Claim',
  [PendingTransactionTypeL1.Delegate]: 'Delegation',
  [PendingTransactionTypeL1.Undelegate]: 'Undelegation',
  [PendingTransactionTypeL1.Redelegate]: 'Redelegation',
  [PendingTransactionTypeL1.Allowance]: 'Token Approval',
  [PendingTransactionTypeL1.WithdrawStart]: 'Withdraw',
  [PendingTransactionTypeL1.WithdrawFinalize]: 'Withdraw',
  [PendingTransactionTypeL1.PendingWithdraw]: 'Withdraw',
};

export const transactionTypeInvalidations: Partial<
  Record<PendingTransactionTypeL1, Array<QueryKey>>
> = {
  [PendingTransactionTypeL1.Migrate]: [
    readContractQueryKey({
      functionName: 'allowance',
      address: v1.token,
    }),
    readContractQueryKey({
      functionName: 'balanceOf',
      address: v1.token,
    }),
    readContractQueryKey({
      functionName: 'balanceOf',
      address: v2.token,
    }),
  ],
  [PendingTransactionTypeL1.ClaimReward]: [
    readContractQueryKey({
      functionName: 'balanceOf',
      address: v2.token,
    }),
  ],
  [PendingTransactionTypeL1.ClaimVesting]: [
    readContractQueryKey({ functionName: 'accrued' }),
    readContractQueryKey({ functionName: 'unpaid' }),
    readContractQueryKey({ functionName: 's_releases' }),
    readContractQueryKey({
      functionName: 'balanceOf',
      address: v1.token,
    }),
  ],
  [PendingTransactionTypeL1.Delegate]: [
    readContractQueryKey({
      functionName: 'allowance',
      address: v2.token,
    }),
    readContractQueryKey({
      functionName: 'balanceOf',
      address: v2.token,
    }),
  ],
  [PendingTransactionTypeL1.Undelegate]: [
    readContractQueryKey({
      functionName: 'allowance',
      address: v1.token,
    }),
    readContractQueryKey({
      functionName: 'allowance',
      address: v2.token,
    }),
  ],
  [PendingTransactionTypeL1.Redelegate]: [
    readContractQueryKey({
      functionName: 'allowance',
      address: v1.token,
    }),
    readContractQueryKey({
      functionName: 'allowance',
      address: v2.token,
    }),
  ],
  [PendingTransactionTypeL1.Allowance]: [
    readContractQueryKey({
      functionName: 'allowance',
      address: v1.token,
    }),
    readContractQueryKey({
      functionName: 'allowance',
      address: v2.token,
    }),
  ],
  [PendingTransactionTypeL1.WithdrawFinalize]: [
    readContractQueryKey({
      functionName: 'balanceOf',
      address: v2.token,
    }),
  ],
};

export const transactionsToRemoveImmediately: Partial<
  Record<PendingTransactionTypeL1, boolean>
> = {
  [PendingTransactionTypeL1.Allowance]: true,
  [PendingTransactionTypeL1.WithdrawStart]: true,
};

export const cosmosInvalidations: Partial<
  Record<PendingTransactionTypeL1, ModularQueryKey>
> = {
  [PendingTransactionTypeL1.Redelegate]: ({ address }) => [
    QUERY_KEYS.validators(),
    QUERY_KEYS.pool,
    QUERY_KEYS.accountValidators(address),
    QUERY_KEYS.sequencerBalance(address),
    QUERY_KEYS.validatorRewards(undefined, address),
    QUERY_KEYS.rewards(address),
    QUERY_KEYS.accountValidatorDelegations(address),
    QUERY_KEYS.accountDelegations(address),
  ],
  [PendingTransactionTypeL1.Undelegate]: ({ address }) => [
    QUERY_KEYS.validators(),
    QUERY_KEYS.pool,
    QUERY_KEYS.accountValidators(address),
    QUERY_KEYS.sequencerBalance(address),
    QUERY_KEYS.validatorRewards(undefined, address),
    QUERY_KEYS.rewards(address),
    QUERY_KEYS.accountValidatorDelegations(address),
    QUERY_KEYS.accountDelegations(address),
  ],
  [PendingTransactionTypeL1.Delegate]: ({ address }) => [
    QUERY_KEYS.validators(),
    QUERY_KEYS.pool,
    QUERY_KEYS.accountValidators(address),
    QUERY_KEYS.sequencerBalance(address),
    QUERY_KEYS.validatorRewards(undefined, address),
    QUERY_KEYS.rewards(address),
    QUERY_KEYS.accountValidatorDelegations(address),
    QUERY_KEYS.accountDelegations(address),
  ],
  [PendingTransactionTypeL1.ClaimReward]: ({ address }) => [
    QUERY_KEYS.validators(),
    QUERY_KEYS.accountValidators(address),
    QUERY_KEYS.sequencerBalance(address),
    QUERY_KEYS.validatorRewards(undefined, address),
    QUERY_KEYS.rewards(address),
    QUERY_KEYS.accountDelegations(address),
  ],
  [PendingTransactionTypeL1.Migrate]: ({ address }) => [
    QUERY_KEYS.validators(),
    QUERY_KEYS.pool,
    QUERY_KEYS.accountValidators(address),
    QUERY_KEYS.sequencerBalance(address),
    QUERY_KEYS.validatorRewards(undefined, address),
    QUERY_KEYS.rewards(address),
    QUERY_KEYS.accountValidatorDelegations(address),
    QUERY_KEYS.accountDelegations(address),
  ],
  [PendingTransactionTypeL1.WithdrawStart]: ({ address }) => [
    QUERY_KEYS.sequencerBalance(address),
    QUERY_KEYS.pendingWithdrawals(address),
    QUERY_KEYS.accountDelegations(address),
  ],
  [PendingTransactionTypeL1.WithdrawFinalize]: ({ address }) => [
    QUERY_KEYS.validators(),
    QUERY_KEYS.pool,
    QUERY_KEYS.accountValidators(address),
    QUERY_KEYS.sequencerBalance(address),
    QUERY_KEYS.pendingWithdrawals(address),
    QUERY_KEYS.accountDelegations(address),
    readContractQueryKey({
      functionName: 'balanceOf',
      address: v2.token,
    }),
  ],
};
