export type EventRow = {
  event_id: string;
  event_type: string;
};

export type CommitQueryItem = {
  timestamp: Date;
  tx_hash: string;
  eth_block_height: string;
  fuel_block_height: string;
  fuel_block_hash: string;
  is_finalized: boolean;
};

export enum ResponseType {
  Withdraw = 'Withdraw',
  Deposit = 'Deposit',
}

export enum WithdrawStatusType {
  TransactionSent = 'TransactionSent',
  WaitingCommittingToL1 = 'WaitingCommittingToL1',
  WaitingFinalization = 'WaitingFinalization',
  ReadyToProcessWithdraw = 'ReadyToProcessWithdraw',
  Finalized = 'Finalized',
}

export enum DepositStatusType {
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync',
  ReadyToProcessDeposit = 'ReadyToProcessDeposit',
  Finalized = 'Finalized',
}

export type MessageDecoded = {
  address: string;
  assetId: string;
  sender: string;
  recipient: string;
  amount: string;
  decimals: number;
};

export type MessageSpent = {
  tx_hash: string;
  block_height: string;
  timestamp: Date;
  nonce: string;
};

export enum DepositQueryType {
  ERC_20 = 'ERC_20',
  ETH = 'ETH',
}

export type DepositEvent = MessageDecoded & {
  tx_hash: string;
  block_height: string;
  timestamp: Date;
  nonce: string;
  type: DepositQueryType;
};

export type WithdrawEvent = {
  tx_hash: string;
  block_height: string;
  timestamp: Date;
  data: string;
  messageId: string;
  sender: string;
  recipient: string;
  amount: string;
  assetId: string;
  ethAssetId: string;
};

export type WithdrawResponse = {
  type: ResponseType.Withdraw;
  from: string;
  to: string;
  amount: string;
  assetId: string;
  ethAssetId: string;
  status: WithdrawStatusType;
  statusInfo: {
    [WithdrawStatusType.TransactionSent]?: {
      fuelTx: {
        height: string;
        txHash: string;
        timestamp: Date;
      };
    };
    [WithdrawStatusType.WaitingCommittingToL1]?: {
      dateExpectedToComplete: Date;
    };
    [WithdrawStatusType.WaitingFinalization]?: {
      dateExpectedToComplete: Date;
      ethTx: {
        height: string;
        txHash: string;
        timestamp: Date;
      };
    };
    [WithdrawStatusType.ReadyToProcessWithdraw]?: {
      transactionId: string;
      nonce: string;
      commitBlockId: string;
      commitBlockHeight: string;
    };
    [WithdrawStatusType.Finalized]?: {
      ethTx: {
        height: string;
        txHash: string;
        timestamp: Date;
      };
    };
  };
};

export type DepositResponse = {
  type: ResponseType.Deposit;
  from: string;
  to: string;
  amount: string;
  assetId: string;
  ethAssetId: string;
  status: DepositStatusType;
  statusInfo: {
    [DepositStatusType.TransactionSent]?: {
      ethTx: {
        height: string;
        txHash: string;
        timestamp: Date;
      };
    };
    [DepositStatusType.WaitingSync]?: {
      dateExpectedToComplete: Date;
    };
    [DepositStatusType.ReadyToProcessDeposit]?: {
      nonce: string;
    };
    [DepositStatusType.Finalized]?: {};
  };
};

export type BridgeDepositResponse = EventRow & DepositResponse;
export type BridgeWithdrawResponse = EventRow & WithdrawResponse;
export type BridgeResponse = BridgeDepositResponse | BridgeWithdrawResponse;
export type GraphQLBridgeResponse = {
  nodes: BridgeResponse[];
  pageInfo: {
    limit: number;
    offset: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};
