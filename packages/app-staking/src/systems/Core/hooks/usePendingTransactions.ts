import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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
  Undelegate = 'UNDELEGATE',
}

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

export const usePendingTransactions = () => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const queryKey = QUERY_KEYS.pendingTransactions(account?.address);

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

  return {
    ...query,
    data: query.data?.filter((tx) => {
      if (isPendingTransactionL1(tx)) {
        return (
          tx.type !== PendingTransactionTypeL1.WithdrawStart &&
          tx.type !== PendingTransactionTypeL1.WithdrawFinalize &&
          tx.type !== PendingTransactionTypeL1.PendingWithdraw
        );
      }
      return true;
    }),
  };
};
