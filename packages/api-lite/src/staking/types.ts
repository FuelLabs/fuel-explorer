// Enum values are the wire strings app-staking matches on, so they must be
// exact -- not re-derived.

export enum ResponseType {
  Withdraw = 'Withdraw',
  Stake = 'Stake',
  ReDelegate = 'ReDelegate',
  Undelegate = 'Undelegate',
  ClaimRewards = 'ClaimRewards',
}

export enum WithdrawStatusType {
  WaitingCommittingToL1 = 'WaitingCommittingToL1',
  WaitingFinalization = 'WaitingFinalization',
  ReadyToProcessWithdraw = 'ReadyToProcessWithdraw',
}

export enum UndelegateStatusType {
  WaitingUnbonding = 'WaitingUnbonding',
}

export enum BaseStatusType {
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync',
  Finalized = 'Finalized',
  Skipped = 'Skipped',
}

export type EthTxStatusInfo = {
  height: string;
  txHash: string;
  timestamp: Date;
};

export type SequencerTxStatusInfo = {
  height: string;
  txHash: string;
  timestamp: Date;
};

export type BaseStatusInfo = {
  [BaseStatusType.TransactionSent]?: { ethTx?: EthTxStatusInfo };
  [BaseStatusType.WaitingSync]?: {
    dateExpectedToComplete?: Date;
    sequencerTx?: SequencerTxStatusInfo;
  };
  [BaseStatusType.Skipped]?: { message: string };
  // biome-ignore lint/complexity/noBannedTypes: intentionally an empty payload
  [BaseStatusType.Finalized]?: {};
};

export type StakingHistoryRowBase = {
  id: number;
  timestampToFinish: string;
};

export type WithdrawResponse = StakingHistoryRowBase & {
  type: ResponseType.Withdraw;
  from: string;
  to: string;
  amount: string;
  status: BaseStatusType | WithdrawStatusType;
  statusInfo: BaseStatusInfo & {
    [WithdrawStatusType.WaitingCommittingToL1]?: {
      dateExpectedToComplete?: Date;
      ethTx?: EthTxStatusInfo;
    };
    [WithdrawStatusType.WaitingFinalization]?: {
      dateExpectedToComplete?: Date;
      ethTx?: EthTxStatusInfo;
    };
    [WithdrawStatusType.ReadyToProcessWithdraw]?: {
      proof?: unknown;
      ethTx?: EthTxStatusInfo;
    };
  };
  nonce?: string;
};

export type UndelegateResponse = StakingHistoryRowBase & {
  type: ResponseType.Undelegate;
  from: string;
  amount: string;
  validator: string;
  status: BaseStatusType | UndelegateStatusType;
  statusInfo: BaseStatusInfo & {
    [UndelegateStatusType.WaitingUnbonding]?: {
      dateExpectedToComplete?: Date;
    };
  };
};

export type DelegateResponse = StakingHistoryRowBase & {
  type: ResponseType.Stake;
  from: string;
  amount: string;
  validator: string;
  status: BaseStatusType;
  statusInfo: BaseStatusInfo;
};

export type RedelegateResponse = StakingHistoryRowBase & {
  type: ResponseType.ReDelegate;
  from: string;
  amount: string;
  toValidator: string;
  fromValidator: string;
  status: BaseStatusType;
  statusInfo: BaseStatusInfo;
};

export type ClaimRewardsResponse = StakingHistoryRowBase & {
  type: ResponseType.ClaimRewards;
  from: string;
  validator: string;
  status: BaseStatusType;
  statusInfo: BaseStatusInfo;
};

export type StakingHistoryResponse =
  | WithdrawResponse
  | UndelegateResponse
  | DelegateResponse
  | RedelegateResponse
  | ClaimRewardsResponse;

// Rows contract_l1_logs.decoded_args parses into: L1Poller JSON.stringifies
// with bigints converted to decimal strings, so amounts and addresses read
// back out as strings.
export type SequencerEventItem = {
  _id: number;
  tx_hash: string;
  signature: string;
  block_height: number;
  timestamp: Date;
  decoded_args: Record<string, unknown>;
};

// One row of a cosmos tx's events, normalized by index (see
// normalizeCosmosQueryResponse).
export type ComosTx<T = Record<string, unknown>> = {
  height: string;
  txHash: string;
  timestamp: Date;
  events: Array<T>;
  event: T;
};

export type CommitInfo = {
  commitPeriodSeconds: number;
  timestamp: Date;
  txHash: string;
  ethBlockHeight: string;
  cosmosBlockNumber: string;
};

export type WithdrawEvent = {
  type: string;
  amount: { amount: string; denom: string };
  from: string;
  to: string;
  nonce: string;
};

export type UndelegateEvent = {
  type: string;
  validator: string;
  delegator: string;
  completion_time: string;
};

export type PaginationDirection = 'after' | 'before';

export type PaginatedEventsResult = {
  nodes: StakingHistoryResponse[];
  edges: never[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: number | '';
    startCursor: number | '';
  };
};
