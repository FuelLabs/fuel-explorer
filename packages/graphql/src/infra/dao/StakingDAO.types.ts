export type SequencerEventItem = {
  _id: number;
  tx_hash: string;
  signature: string;
  block_height: number;
  timestamp: Date;
  decoded_args: {
    data: string;
  };
};

export type QueryItem = {
  id: number;
  tx_hash: string;
  block_height: string;
  timestamp: Date;
  event_index: number;
  event_type: string;
  event_key: string;
  event_value: string;
};

export type WithdrawEvent = {
  type: string;
  amount: {
    amount: string;
    denom: string;
  };
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

export type ComosTx<T> = {
  height: string;
  txHash: string;
  timestamp: Date;
  events: Array<T>;
  event: T;
};

export type CommitQueryItem = {
  cosmos_block_number: string;
  timestamp: Date;
  tx_hash: string;
  eth_block_height: string;
};

export type ProccessedWithdrawQueryItem = {
  block_height: string;
  timestamp: Date;
  tx_hash: string;
};

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

type EthTxStatusInfo = {
  height: string;
  txHash: string;
  timestamp: Date;
};
type SequencerTxStatusInfo = {
  height: string;
  txHash: string;
  timestamp: Date;
};

type BaseStatusInfo = {
  [BaseStatusType.TransactionSent]?: {
    ethTx?: EthTxStatusInfo;
  };
  [BaseStatusType.WaitingSync]?: {
    dateExpectedToComplete?: Date;
    sequencerTx?: SequencerTxStatusInfo;
  };
  [BaseStatusType.Skipped]?: {
    message: string;
  };
  [BaseStatusType.Finalized]?: {};
};

export type WithdrawResponse = StakingHistoryRow & {
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
      proof?: string;
      ethTx?: EthTxStatusInfo;
    };
  };
  nonce?: string;
};

export type UndelegateResponse = StakingHistoryRow & {
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

export type DelegateResponse = StakingHistoryRow & {
  type: ResponseType.Stake;
  from: string;
  amount: string;
  validator: string;
  status: BaseStatusType;
  statusInfo: BaseStatusInfo;
};

export type RedelegateResponse = StakingHistoryRow & {
  type: ResponseType.ReDelegate;
  from: string;
  amount: string;
  toValidator: string;
  fromValidator: string;
  status: BaseStatusType;
  statusInfo: BaseStatusInfo;
};

export type ClaimRewardsResponse = StakingHistoryRow & {
  type: ResponseType.ClaimRewards;
  from: string;
  validator: string;
  status: BaseStatusType;
  statusInfo: BaseStatusInfo;
};

type StakingHistoryRow = {
  id: number;
  timestampToFinish?: string;
};

export type StakingHistory = Array<
  StakingHistoryRow &
    (
      | WithdrawResponse
      | DelegateResponse
      | RedelegateResponse
      | UndelegateResponse
      | ClaimRewardsResponse
    )
>;

export type PrefetchedData = {
  withdrawEvents?: ComosTx<WithdrawEvent>[];
  delegateEvents?: ComosTx<any>[];
  undelegateEvents?: ComosTx<UndelegateEvent>[];
  withdrawRewardsEvents?: ComosTx<any>[];
  lastCommittedBlock?: CommitQueryItem & { commit_period: number };
  contractTimeToFinalizeInMinutes?: number;
};
