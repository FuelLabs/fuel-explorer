import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils';
import { QUERY_KEYS } from '../utils/query';

export enum PendingTransactionTypeL1 {
  Migrate = 'MIGRATE',
  ClaimReward = 'CLAIM_REWARD',
  ClaimVesting = 'CLAIM_VESTING',
  Delegate = 'DELEGATE',
  Undelegate = 'UNDELEGATE',
  Redelegate = 'REDELEGATE',
  Allowance = 'ALLOWANCE',
  WithdrawStart = 'WITHDRAW_START',
  PendingWithdraw = 'PENDING_WITHDRAW',
  WithdrawFinalize = 'WITHDRAW_FINALIZE',
}

export enum PendingSequencerOperationType {
  WithdrawDelegatorReward = 'WITHDRAW_DELEGATOR_REWARD',
  WithdrawCommission = 'WITHDRAW_COMMISSION',
  BeginRedelegate = 'BEGIN_REDELEGATE',
  Delegate = 'DELEGATE',
  Undelegate = 'UNDELEGATE',
  Withdraw = 'WITHDRAW', // Sequencer withdraw operation (not claim rewards)
}

/**
 * Maps L1 transaction types to their corresponding sequencer operation types.
 * Used to create sequencer operation tracking when L1 transactions are confirmed.
 * Some L1 types don't have a corresponding sequencer operation (e.g., Allowance).
 */
export const L1_TO_SEQUENCER_TYPE_MAP: Partial<
  Record<PendingTransactionTypeL1, PendingSequencerOperationType>
> = {
  [PendingTransactionTypeL1.Delegate]: PendingSequencerOperationType.Delegate,
  [PendingTransactionTypeL1.Undelegate]:
    PendingSequencerOperationType.Undelegate,
  [PendingTransactionTypeL1.Redelegate]:
    PendingSequencerOperationType.BeginRedelegate,
  [PendingTransactionTypeL1.ClaimReward]:
    PendingSequencerOperationType.WithdrawDelegatorReward,
  [PendingTransactionTypeL1.WithdrawStart]:
    PendingSequencerOperationType.Withdraw,
};

type PendingTransactionBase = {
  hash: Address;
  token: Address;
  symbol: string;
  sequencerHash?: string;
  formatted: string;
  validator?: SequencerValidatorAddress;
  amount?: bigint;
  decimals?: number;
  displayed: boolean;
  completed?: boolean;
};

export interface PendingTransactionL1 extends PendingTransactionBase {
  type: PendingTransactionTypeL1;
  layer: 'l1';
  eta?: string;
}

export interface PendingSequencerOperation extends PendingTransactionBase {
  type: PendingSequencerOperationType;
  layer: 'sequencer';
  sequencerHash: string;
  eta?: string;
  startedAt?: number; // Timestamp when the operation was initiated
}

export type PendingTransaction =
  | PendingTransactionL1
  | PendingSequencerOperation;

export const isPendingTransactionL1 = (
  pendingTransaction: PendingTransaction,
): pendingTransaction is PendingTransactionL1 => {
  return pendingTransaction.layer === 'l1';
};

export const isPendingSequencerOperation = (
  pendingTransaction: PendingTransaction,
): pendingTransaction is PendingSequencerOperation => {
  return pendingTransaction.layer === 'sequencer';
};

// Static reference object to avoid creating a new one on each render
const EMPTY_ARRAY: Array<PendingTransaction> = [];

// TTL for pending transactions: 7 days
const PENDING_TX_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const isStale = (tx: PendingTransaction): boolean => {
  // Check if transaction has a timestamp and is older than TTL
  // For L1 transactions, we use hash as identifier
  // For sequencer operations, startedAt is available
  if (tx.layer === 'sequencer' && tx.startedAt) {
    return Date.now() - tx.startedAt > PENDING_TX_TTL_MS;
  }
  // For L1 transactions without explicit timestamp, we can't determine age
  // They should be cleaned up when completed or via other mechanisms
  return false;
};

export const usePendingTransactions = () => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const queryKey = QUERY_KEYS.pendingTransactions(account?.address);
  const hasMigratedRef = useRef(false);

  const query = useQuery({
    queryKey,
    // This hook is currently managed through "setQueryData" when user is making transactions
    // In the future we might need to fetch it automatically from an indexer
    // It's also being cached in local storage, so it's stable between page reloads
    queryFn: () =>
      queryClient.getQueryData<Array<PendingTransaction>>(queryKey) ??
      EMPTY_ARRAY,
    gcTime: Number.POSITIVE_INFINITY,
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    meta: {
      persist: true,
    },
  });

  // Migrate case-insensitive keys
  useEffect(() => {
    if (!account?.address || hasMigratedRef.current) return;

    const currentAddress = account.address;
    const normalizedCurrent = currentAddress.toLowerCase();

    const allEntries = queryClient.getQueriesData<Array<PendingTransaction>>({
      queryKey: QUERY_KEYS.pendingTransactions(),
    });

    const merged = new Map<string, PendingTransaction>();

    for (const [key, data] of allEntries) {
      const keyParts = Array.isArray(key) ? key : [];
      const keyAddress =
        typeof keyParts[keyParts.length - 1] === 'string'
          ? (keyParts[keyParts.length - 1] as string)
          : '';

      if (!keyAddress || keyAddress.toLowerCase() !== normalizedCurrent) {
        continue;
      }

      for (const tx of data ?? []) {
        const uniqueKey = `${tx.hash}:${tx.sequencerHash ?? ''}`;
        if (!merged.has(uniqueKey)) {
          merged.set(uniqueKey, tx);
        }
      }
    }

    if (merged.size > 0) {
      queryClient.setQueryData<PendingTransaction[]>(queryKey, () => {
        return Array.from(merged.values());
      });
      queryClient.invalidateQueries({ queryKey });
    }

    hasMigratedRef.current = true;
  }, [account?.address, queryClient, queryKey]);

  // Cleanup stale transactions (completed transactions are filtered in blocking checks)
  useEffect(() => {
    if (!account?.address || !query.data) return;

    const valid = query.data.filter((tx) => !isStale(tx));
    if (valid.length !== query.data.length) {
      queryClient.setQueryData<PendingTransaction[]>(queryKey, valid);
      queryClient.invalidateQueries({ queryKey });
    }
  }, [account?.address, query.data, queryClient, queryKey]);

  const filteredData = useMemo(() => {
    return query.data?.filter((tx) => {
      if (isPendingTransactionL1(tx)) {
        return (
          tx.type !== PendingTransactionTypeL1.WithdrawStart &&
          tx.type !== PendingTransactionTypeL1.WithdrawFinalize &&
          tx.type !== PendingTransactionTypeL1.PendingWithdraw
        );
      }
      return true;
    });
  }, [query.data]);

  return {
    ...query,
    data: filteredData,
  };
};
