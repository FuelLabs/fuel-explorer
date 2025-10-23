import type {
  GQLGenericStatusType,
  GQLUndelegateStatusType,
  GQLWithdrawStatusType,
} from '@fuel-explorer/graphql';
import type { HexAddress } from 'app-commons';
import type { Address } from 'fuels';
import type { GetSequencerCommitmentInclusionProofResponse } from '~staking/systems/Withdraw/types/proof';

export enum StakingEventType {
  Withdraw = 'Withdraw',
  Stake = 'Stake',
  ReDelegate = 'ReDelegate',
  Undelegate = 'Undelegate',
  ClaimRewards = 'ClaimRewards',
}

export enum UndelegateStatusType {
  WaitingUnbonding = 'WaitingUnbonding',
}

export type StakingEventStatus =
  | GQLGenericStatusType
  | GQLWithdrawStatusType
  | GQLUndelegateStatusType;

interface BaseStakingEvent {
  id: number;
  type: StakingEventType;
  from: Address;
  amount: string;
  status: StakingEventStatus;
  statusInfo: StatusInfo;
  timestampToFinish: string | undefined;
}

export interface StakingEventWithdraw extends BaseStakingEvent {
  type: StakingEventType.Withdraw;
  to: HexAddress;
  status: GQLWithdrawStatusType;
  nonce: string;
}

export interface StakingEventUndelegate extends BaseStakingEvent {
  type: StakingEventType.Undelegate;
  validator: HexAddress;
  status: GQLUndelegateStatusType;
}

export interface StakingEventRedelegate extends BaseStakingEvent {
  type: StakingEventType.ReDelegate;
  fromValidator: HexAddress;
  toValidator: HexAddress;
  status: GQLGenericStatusType;
}

export interface StakingEventClaimRewards extends BaseStakingEvent {
  type: StakingEventType.ClaimRewards;
  validator: HexAddress;
  status: GQLGenericStatusType;
}

export interface StakingEventStake extends BaseStakingEvent {
  type: StakingEventType.Stake;
  validator: HexAddress;
  status: GQLGenericStatusType;
}

export type StakingEvent =
  | StakingEventWithdraw
  | StakingEventStake
  | StakingEventUndelegate
  | StakingEventRedelegate
  | StakingEventClaimRewards;

export type StakingEventWithProof = {
  proof?: GetSequencerCommitmentInclusionProofResponse;
} & StakingEvent;

export type StatusInfo = {
  TransactionSent?: TransactionSentStatus;
  WaitingSync?: WaitingSyncStatus;
  WaitingCommittingToL1?: WaitingCommittingToL1Status;
  WaitingFinalization?: WaitingFinalizationStatus;
  ReadyToProcessWithdraw?: ReadyToProcessWithdrawStatus;
  Skipped?: SkippedStatus;
  Error?: ErrorStatus;
  Finalized?: FinalizedStatus;
};

export interface EthTx {
  height: string | number;
  txHash: string;
  timestamp: string;
}

export interface SequencerTx {
  height: string | number;
  txHash: string;
  timestamp: string;
}

export interface TransactionSentStatus {
  ethTx: EthTx;
}

export interface WaitingSyncStatus {
  dateExpectedToComplete: string;
}

export interface WaitingCommittingToL1Status {
  dateExpectedToComplete: string;
  sequencerTx: SequencerTx;
}

export interface WaitingFinalizationStatus {
  dateExpectedToComplete: string;
  ethTx: EthTx;
}

export interface ReadyToProcessWithdrawStatus {
  proof: string;
  ethTx: EthTx;
}

export interface SkippedStatus {
  message: string;
}

export interface ErrorStatus {
  error: string;
}

export type FinalizedStatus = {};
