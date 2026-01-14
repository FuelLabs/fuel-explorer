import { QUERY_KEYS as BASE_QUERY_KEYS } from '@fuels/react';
import type { QueryKey } from '@tanstack/react-query';
import type { Address } from 'viem';

const QUERY_PREFIX: QueryKey = BASE_QUERY_KEYS.base.concat('staking');

// TanStack Query invalidates queries based on key structure and order.
// Hence optional keys should always be added at the end.

const createQueryKey = (
  segments: Array<string>,
  optionals: Array<string | undefined>,
) => {
  const key = QUERY_PREFIX.concat(segments);
  for (const opt of optionals) {
    if (opt) key.push(opt);
  }
  return key;
};

const createAccountQueryKey = (
  segments: Array<string>,
  optionals: Array<string> = [],
  address = '',
) => {
  return createQueryKey(['account', ...segments], [address, ...optionals]);
};

export const SHARED_KEYS = { validators: ['validators'], rewards: ['rewards'] };

export const QUERY_KEYS = {
  unbondingDelegations: (address: string) =>
    createQueryKey(['unbondingDelegations'], [address]),
  lastEthBlockSynced: createQueryKey(['cosmosBlockPool'], []),
  cosmosParams: createQueryKey(['cosmosParams'], []),
  cosmosTx: (txHash: string | undefined) =>
    createQueryKey(['cosmosTx'], [txHash]),
  lastEthBlockSyncTime: createQueryKey(['cosmosBlockPoolTime'], []),
  sequencerCommitmentInclusionProof: (
    height: number | undefined,
    txIndex: number | undefined,
    start: BigInt | number | undefined,
    end: BigInt | number | undefined,
  ) => {
    return createQueryKey(
      ['cosmosBlockPool'],
      [
        height?.toString(),
        txIndex?.toString(),
        start?.toString(),
        end?.toString(),
      ],
    );
  },
  pool: createQueryKey(['pool'], []),
  cometUrl: createQueryKey(['cometUrl'], []),

  validators: (page?: string) => createQueryKey(SHARED_KEYS.validators, [page]),

  sequencerAccount: (address = '') =>
    createAccountQueryKey(['sequencerAccount'], [], address),

  pendingWithdrawals: (address = '') =>
    createAccountQueryKey(['pendingWithdrawals'], [], address),

  validator: (address = '') =>
    createAccountQueryKey(SHARED_KEYS.validators, [], address),

  accountValidators: (address = '') =>
    createAccountQueryKey(SHARED_KEYS.validators, [], address),
  accountValidatorDelegations: (address = '', validator = '') =>
    createAccountQueryKey(
      SHARED_KEYS.validators.concat(['delegations']),
      [validator],
      address,
    ),
  accountDelegations: (address = '') =>
    createAccountQueryKey(
      SHARED_KEYS.validators.concat(['delegations']),
      [],
      address,
    ),

  sequencerBalance: (address = '') =>
    createAccountQueryKey(['sequencer', 'balance'], [], address),

  rewards: (address = '') =>
    createAccountQueryKey(SHARED_KEYS.rewards, [], address),
  validatorRewards: (validator = '', address = '') =>
    createAccountQueryKey(
      SHARED_KEYS.validators.concat(SHARED_KEYS.rewards),
      [validator],
      address,
    ),

  stakingEvents: (
    address: Address | undefined,
    before: number | undefined,
    after: number | undefined,
    itemsPerPage: number | undefined,
  ): QueryKey => {
    const baseKey = QUERY_PREFIX.concat(['events']);
    if (address || before || after || itemsPerPage)
      baseKey.push({ address, before, after, itemsPerPage });
    return baseKey;
  },

  pendingTransactions: (address?: string) =>
    createAccountQueryKey(['pending', 'transactions'], [], address),
  withdrawals: (address?: string) =>
    createAccountQueryKey(['withdrawals'], [], address),
} as const;

/**
 * Helper to add a pending L1 transaction from XState machines (non-hook context)
 */
export const addPendingL1Transaction = (
  queryClient: { getQueryData: any; setQueryData: any; invalidateQueries: any },
  address: string,
  transaction: Record<string, unknown>,
) => {
  const queryKey = QUERY_KEYS.pendingTransactions(address);
  const queryData = queryClient.getQueryData<any[]>(queryKey) ?? [];
  queryClient.setQueryData(queryKey, [
    ...queryData,
    { ...transaction, displayed: false, completed: false },
  ]);
  queryClient.invalidateQueries({ queryKey });
};
