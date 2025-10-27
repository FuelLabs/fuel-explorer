import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { GetSequencerCommitmentInclusionProofResponse } from '~staking/systems/Withdraw/types/proof';

export type ServiceOptions<TQueryData, TError, TData> = Omit<
  UseQueryOptions<TQueryData, TError, TData>,
  'queryFn' | 'queryKey'
>;

export type Withdraw = {
  TxHash: string;
  Nonce: string;
  FromAddress: string;
  Denom: string;
  Amount: string;
  IsProvable: boolean;
};

export const WithdrawStatusLabels = {
  [GQLWithdrawStatusType.TransactionSent]: 'Withdraw sent',
  [GQLWithdrawStatusType.WaitingSync]: 'Synchronizing with Sequencer',
  [GQLWithdrawStatusType.WaitingCommittingToL1]: 'Sequencer committing to L1',
  [GQLWithdrawStatusType.WaitingFinalization]: 'Waiting for finalization',
  [GQLWithdrawStatusType.ReadyToProcessWithdraw]: 'Ready for withdrawal',
  [GQLWithdrawStatusType.Finalized]: 'Finalized',
  [GQLWithdrawStatusType.Skipped]: 'Skipped',
};

export type StakingTransaction = {
  from: string;
  amount: string;
  nonce?: string;
  proof?: GetSequencerCommitmentInclusionProofResponse;
  status: StatusWithETA;
  totalTimeToFinalize: number;
};

export type StatusWithETA = {
  current: keyof typeof GQLWithdrawStatusType;
  dateExpectedToFinalize: Date;
  error?: boolean;
  all: Partial<Record<keyof typeof GQLWithdrawStatusType, StatusStep>>;
};

export type StatusStep = {
  ethTx?: {
    height: string;
    txHash: string;
    timestamp: number;
  };
  sequencerTx?: {
    height: string;
    txHash: string;
    timestamp: number;
  };
  dateExpectedToComplete?: Date;
};
