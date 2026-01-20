import type { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Address: { input: string; output: string; }
  AssetId: { input: string; output: string; }
  BlockId: { input: string; output: string; }
  Bytes32: { input: string; output: string; }
  ContractId: { input: string; output: string; }
  Date: { input: string; output: string; }
  HexString: { input: string; output: string; }
  Nonce: { input: string; output: string; }
  RelayedTransactionId: { input: string; output: string; }
  Salt: { input: string; output: string; }
  Signature: { input: string; output: string; }
  Tai64Timestamp: { input: string; output: string; }
  TransactionId: { input: string; output: string; }
  TxPointer: { input: string; output: string; }
  U16: { input: string; output: string; }
  U32: { input: string; output: string; }
  U64: { input: string; output: string; }
  UtxoId: { input: string; output: string; }
};

export type GQLAsset = {
  __typename: 'Asset';
  assetId?: Maybe<Scalars['String']['output']>;
  contractId?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  networks?: Maybe<Array<Maybe<GQLAssetNetwork>>>;
  rate?: Maybe<Scalars['U64']['output']>;
  subId?: Maybe<Scalars['String']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type GQLAssetNetwork = GQLAssetNetworkEthereum | GQLAssetNetworkFuel;

export type GQLAssetNetworkEthereum = {
  __typename: 'AssetNetworkEthereum';
  address?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type GQLAssetNetworkFuel = {
  __typename: 'AssetNetworkFuel';
  assetId?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['U64']['output']>;
  contractId?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type GQLAssetsContractConnection = {
  __typename: 'AssetsContractConnection';
  nodes: Array<GQLAsset>;
  pageInfo: GQLPageInfo;
};

export type GQLBalance = {
  __typename: 'Balance';
  amount: Scalars['U64']['output'];
  amountInUsd?: Maybe<Scalars['String']['output']>;
  assetId: Scalars['AssetId']['output'];
  collection?: Maybe<Scalars['String']['output']>;
  contractId?: Maybe<Scalars['ContractId']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner: Scalars['Address']['output'];
  rate?: Maybe<Scalars['U64']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  totalSupply?: Maybe<Scalars['String']['output']>;
  utxos?: Maybe<Array<Maybe<GQLUtxoItem>>>;
};

export type GQLBalanceByBlockHeight = {
  __typename: 'BalanceByBlockHeight';
  accountHash?: Maybe<Scalars['Address']['output']>;
  assetId?: Maybe<Scalars['AssetId']['output']>;
  balance?: Maybe<Scalars['String']['output']>;
  balanceInUsd?: Maybe<Scalars['String']['output']>;
  blockHeight?: Maybe<Scalars['Int']['output']>;
};

export type GQLBalanceConnection = {
  __typename: 'BalanceConnection';
  /** A list of edges. */
  edges: Array<GQLBalanceEdge>;
  /** A list of nodes. */
  nodes: Array<GQLBalance>;
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo;
};

/** An edge in a connection. */
export type GQLBalanceEdge = {
  __typename: 'BalanceEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: GQLBalance;
};

export type GQLBalanceFilterInput = {
  /** Filter coins based on the `owner` field */
  owner: Scalars['Address']['input'];
};

export type GQLBaseStatusInfo = {
  __typename: 'BaseStatusInfo';
  Finalized?: Maybe<GQLFinalizedInfo>;
  Skipped?: Maybe<GQLSkippedInfo>;
  TransactionSent?: Maybe<GQLTransactionSentInfo>;
  WaitingSync?: Maybe<GQLWaitingSyncInfo>;
};

export type GQLBlock = {
  __typename: 'Block';
  _id?: Maybe<Scalars['Int']['output']>;
  consensus: GQLConsensus;
  header: GQLHeader;
  height: Scalars['U32']['output'];
  id: Scalars['BlockId']['output'];
  producer?: Maybe<Scalars['Address']['output']>;
  time?: Maybe<GQLParsedTime>;
  totalFee?: Maybe<Scalars['U64']['output']>;
  totalGasUsed?: Maybe<Scalars['U64']['output']>;
  transactions: Array<GQLTransaction>;
  version: GQLBlockVersion;
};

export type GQLBlockConnection = {
  __typename: 'BlockConnection';
  /** A list of edges. */
  edges: Array<GQLBlockEdge>;
  /** A list of nodes. */
  nodes: Array<GQLBlock>;
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo;
};

/** An edge in a connection. */
export type GQLBlockEdge = {
  __typename: 'BlockEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: GQLBlock;
};

export enum GQLBlockVersion {
  V1 = 'V1'
}

export type GQLBlocksDashboard = {
  __typename: 'BlocksDashboard';
  blockHash?: Maybe<Scalars['String']['output']>;
  blockNo: Scalars['U64']['output'];
  gasUsed: Scalars['U64']['output'];
  gasUsedInUsd?: Maybe<Scalars['String']['output']>;
  producer?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['U64']['output'];
  totalFee: Scalars['U64']['output'];
  totalFeeInUsd?: Maybe<Scalars['String']['output']>;
};

export type GQLBlocksDashboardConnection = {
  __typename: 'BlocksDashboardConnection';
  nodes: Array<GQLBlocksDashboard>;
};

/** Breakpoint, defined as a tuple of contract ID and relative PC offset inside it */
export type GQLBreakpoint = {
  contract: Scalars['ContractId']['input'];
  pc: Scalars['U64']['input'];
};

export type GQLBridgeCommitQueryItem = {
  __typename: 'BridgeCommitQueryItem';
  eth_block_height?: Maybe<Scalars['String']['output']>;
  fuel_block_hash?: Maybe<Scalars['String']['output']>;
  fuel_block_height?: Maybe<Scalars['String']['output']>;
  is_finalized?: Maybe<Scalars['Boolean']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  tx_hash?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgeDepositEvent = GQLBridgeEventRow & GQLBridgeMessageDecoded & {
  __typename: 'BridgeDepositEvent';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  tx_hash?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GQLBridgeDepositQueryType>;
};

export enum GQLBridgeDepositQueryType {
  Erc_20 = 'ERC_20',
  Eth = 'ETH'
}

export type GQLBridgeDepositResponse = GQLBridgeEventRow & {
  __typename: 'BridgeDepositResponse';
  amount?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  ethAssetId?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  status?: Maybe<GQLBridgeDepositStatusType>;
  statusInfo?: Maybe<GQLBridgeDepositStatusInfo>;
  to?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GQLBridgeResponseType>;
};

export type GQLBridgeDepositStatusInfo = {
  __typename: 'BridgeDepositStatusInfo';
  Finalized?: Maybe<GQLBridgeFinalizedStatus>;
  ReadyToProcessDeposit?: Maybe<GQLBridgeReadyToProcessDepositStatus>;
  TransactionSent?: Maybe<GQLBridgeDepositTransactionSentStatus>;
  WaitingSync?: Maybe<GQLBridgeWaitingSyncStatus>;
};

export enum GQLBridgeDepositStatusType {
  Finalized = 'Finalized',
  ReadyToProcessDeposit = 'ReadyToProcessDeposit',
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync'
}

export type GQLBridgeDepositTransactionSentStatus = {
  __typename: 'BridgeDepositTransactionSentStatus';
  ethTx?: Maybe<GQLBridgeFuelTransaction>;
};

export type GQLBridgeEthTransaction = {
  __typename: 'BridgeEthTransaction';
  height?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgeEventRow = {
  event_id?: Maybe<Scalars['String']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgeFinalizedStatus = {
  __typename: 'BridgeFinalizedStatus';
  ethTx?: Maybe<GQLBridgeEthTransaction>;
};

export type GQLBridgeFuelTransaction = {
  __typename: 'BridgeFuelTransaction';
  height?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgeMessageDecoded = {
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgePageInfo = {
  __typename: 'BridgePageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
};

export type GQLBridgeReadyToProcessDepositStatus = {
  __typename: 'BridgeReadyToProcessDepositStatus';
  nonce?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgeReadyToProcessWithdrawStatus = {
  __typename: 'BridgeReadyToProcessWithdrawStatus';
  commitBlockHeight?: Maybe<Scalars['String']['output']>;
  commitBlockId?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['String']['output']>;
  transactionId?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgeResponse = GQLBridgeDepositResponse | GQLBridgeWithdrawResponse;

export enum GQLBridgeResponseType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw'
}

export type GQLBridgeWaitingCommittingToL1Status = {
  __typename: 'BridgeWaitingCommittingToL1Status';
  dateExpectedToComplete?: Maybe<Scalars['Date']['output']>;
};

export type GQLBridgeWaitingFinalizationStatus = {
  __typename: 'BridgeWaitingFinalizationStatus';
  dateExpectedToComplete?: Maybe<Scalars['Date']['output']>;
  ethTx?: Maybe<GQLBridgeEthTransaction>;
};

export type GQLBridgeWaitingSyncStatus = {
  __typename: 'BridgeWaitingSyncStatus';
  dateExpectedToComplete?: Maybe<Scalars['Date']['output']>;
};

export type GQLBridgeWithdrawEvent = GQLBridgeEventRow & {
  __typename: 'BridgeWithdrawEvent';
  amount?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  ethAssetId?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  tx_hash?: Maybe<Scalars['String']['output']>;
};

export type GQLBridgeWithdrawResponse = GQLBridgeEventRow & {
  __typename: 'BridgeWithdrawResponse';
  amount?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  ethAssetId?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  status?: Maybe<GQLBridgeWithdrawStatusType>;
  statusInfo?: Maybe<GQLBridgeWithdrawStatusInfo>;
  to?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GQLBridgeResponseType>;
};

export type GQLBridgeWithdrawStatusInfo = {
  __typename: 'BridgeWithdrawStatusInfo';
  Finalized?: Maybe<GQLBridgeFinalizedStatus>;
  ReadyToProcessWithdraw?: Maybe<GQLBridgeReadyToProcessWithdrawStatus>;
  TransactionSent?: Maybe<GQLBridgeWithdrawTransactionSentStatus>;
  WaitingCommittingToL1?: Maybe<GQLBridgeWaitingCommittingToL1Status>;
  WaitingFinalization?: Maybe<GQLBridgeWaitingFinalizationStatus>;
};

export enum GQLBridgeWithdrawStatusType {
  Finalized = 'Finalized',
  ReadyToProcessWithdraw = 'ReadyToProcessWithdraw',
  TransactionSent = 'TransactionSent',
  WaitingCommittingToL1 = 'WaitingCommittingToL1',
  WaitingFinalization = 'WaitingFinalization'
}

export type GQLBridgeWithdrawTransactionSentStatus = {
  __typename: 'BridgeWithdrawTransactionSentStatus';
  fuelTx?: Maybe<GQLBridgeFuelTransaction>;
};

export type GQLChainInfo = {
  __typename: 'ChainInfo';
  consensusParameters: GQLConsensusParameters;
  daHeight: Scalars['U64']['output'];
  gasCosts: GQLGasCosts;
  latestBlock: GQLBlock;
  name: Scalars['String']['output'];
};

export type GQLChangeOutput = {
  __typename: 'ChangeOutput';
  amount: Scalars['U64']['output'];
  amountInUsd?: Maybe<Scalars['String']['output']>;
  assetId: Scalars['AssetId']['output'];
  contractId?: Maybe<Scalars['ContractId']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['U64']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  to: Scalars['Address']['output'];
};

export type GQLClaimRewardsResponse = {
  __typename: 'ClaimRewardsResponse';
  from: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statusInfo: GQLBaseStatusInfo;
  type: GQLResponseType;
  validator: Scalars['String']['output'];
};

export type GQLCoin = {
  __typename: 'Coin';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  /** TxPointer - the height of the block this coin was created in */
  blockCreated: Scalars['U32']['output'];
  owner: Scalars['Address']['output'];
  /** TxPointer - the index of the transaction that created this coin */
  txCreatedIdx: Scalars['U16']['output'];
  utxoId: Scalars['UtxoId']['output'];
};

export type GQLCoinConnection = {
  __typename: 'CoinConnection';
  /** A list of edges. */
  edges: Array<GQLCoinEdge>;
  /** A list of nodes. */
  nodes: Array<GQLCoin>;
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo;
};

/** An edge in a connection. */
export type GQLCoinEdge = {
  __typename: 'CoinEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: GQLCoin;
};

export type GQLCoinFilterInput = {
  /** Returns coins only with `asset_id`. */
  assetId?: InputMaybe<Scalars['AssetId']['input']>;
  /** Returns coins owned by the `owner`. */
  owner: Scalars['Address']['input'];
};

export type GQLCoinOutput = {
  __typename: 'CoinOutput';
  amount: Scalars['U64']['output'];
  amountInUsd?: Maybe<Scalars['String']['output']>;
  assetId: Scalars['AssetId']['output'];
  contractId?: Maybe<Scalars['ContractId']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['U64']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  to: Scalars['Address']['output'];
};

/** The schema analog of the [`coins::CoinType`]. */
export type GQLCoinType = GQLCoin | GQLMessageCoin;

export type GQLConsensus = GQLGenesis | GQLPoAConsensus;

export type GQLConsensusParameters = {
  __typename: 'ConsensusParameters';
  baseAssetId: Scalars['AssetId']['output'];
  blockGasLimit: Scalars['U64']['output'];
  chainId: Scalars['U64']['output'];
  contractParams: GQLContractParameters;
  feeParams: GQLFeeParameters;
  gasCosts: GQLGasCosts;
  predicateParams: GQLPredicateParameters;
  privilegedAddress: Scalars['Address']['output'];
  scriptParams: GQLScriptParameters;
  txParams: GQLTxParameters;
  version: GQLConsensusParametersVersion;
};

export type GQLConsensusParametersPurpose = {
  __typename: 'ConsensusParametersPurpose';
  checksum: Scalars['Bytes32']['output'];
  witnessIndex: Scalars['U16']['output'];
};

export enum GQLConsensusParametersVersion {
  V1 = 'V1'
}

export type GQLContract = {
  __typename: 'Contract';
  _id?: Maybe<Scalars['Int']['output']>;
  bytecode: Scalars['HexString']['output'];
  id: Scalars['ContractId']['output'];
  salt: Scalars['Salt']['output'];
};

export type GQLContractBalance = {
  __typename: 'ContractBalance';
  amount: Scalars['U64']['output'];
  amountInUsd?: Maybe<Scalars['String']['output']>;
  assetId: Scalars['AssetId']['output'];
  contract: Scalars['ContractId']['output'];
  decimals?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type GQLContractBalance2 = {
  __typename: 'ContractBalance2';
  amount?: Maybe<Scalars['U64']['output']>;
  asset?: Maybe<GQLAsset>;
  assetId?: Maybe<Scalars['String']['output']>;
};

export type GQLContractBalanceConnection = {
  __typename: 'ContractBalanceConnection';
  /** A list of edges. */
  edges: Array<GQLContractBalanceEdge>;
  /** A list of nodes. */
  nodes: Array<GQLContractBalance>;
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo;
};

/** An edge in a connection. */
export type GQLContractBalanceEdge = {
  __typename: 'ContractBalanceEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: GQLContractBalance;
};

export type GQLContractBalanceFilterInput = {
  /** Filter assets based on the `contractId` field */
  contract: Scalars['ContractId']['input'];
};

export type GQLContractConnection = {
  __typename: 'ContractConnection';
  nodes?: Maybe<Array<Maybe<GQLContract>>>;
  pageInfo: GQLPageInfo;
};

export type GQLContractCreated = {
  __typename: 'ContractCreated';
  contract: Scalars['ContractId']['output'];
  stateRoot: Scalars['Bytes32']['output'];
};

export type GQLContractOutput = {
  __typename: 'ContractOutput';
  balanceRoot: Scalars['Bytes32']['output'];
  inputIndex: Scalars['U16']['output'];
  stateRoot: Scalars['Bytes32']['output'];
};

export type GQLContractParameters = {
  __typename: 'ContractParameters';
  contractMaxSize: Scalars['U64']['output'];
  maxStorageSlots: Scalars['U64']['output'];
  version: GQLContractParametersVersion;
};

export enum GQLContractParametersVersion {
  V1 = 'V1'
}

export type GQLDelegateResponse = {
  __typename: 'DelegateResponse';
  amount: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statusInfo: GQLBaseStatusInfo;
  type: GQLResponseType;
  validator: Scalars['String']['output'];
};

export type GQLDependentCost = GQLHeavyOperation | GQLLightOperation;

export type GQLDryRunFailureStatus = {
  __typename: 'DryRunFailureStatus';
  programState?: Maybe<GQLProgramState>;
  reason: Scalars['String']['output'];
  receipts: Array<GQLReceipt>;
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
};

export type GQLDryRunSuccessStatus = {
  __typename: 'DryRunSuccessStatus';
  programState?: Maybe<GQLProgramState>;
  receipts: Array<GQLReceipt>;
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
};

export type GQLDryRunTransactionExecutionStatus = {
  __typename: 'DryRunTransactionExecutionStatus';
  id: Scalars['TransactionId']['output'];
  receipts: Array<GQLReceipt>;
  status: GQLDryRunTransactionStatus;
};

export type GQLDryRunTransactionStatus = GQLDryRunFailureStatus | GQLDryRunSuccessStatus;

export type GQLEstimateGasPrice = {
  __typename: 'EstimateGasPrice';
  gasPrice: Scalars['U64']['output'];
};

export type GQLEthTx = {
  __typename: 'EthTx';
  height: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};

export type GQLExcludeInput = {
  /** Messages to exclude from the selection. */
  messages: Array<Scalars['Nonce']['input']>;
  /** Utxos to exclude from the selection. */
  utxos: Array<Scalars['UtxoId']['input']>;
};

export type GQLFailureStatus = {
  __typename: 'FailureStatus';
  block: GQLBlock;
  programState?: Maybe<GQLProgramState>;
  reason: Scalars['String']['output'];
  receipts: Array<GQLReceipt>;
  time: Scalars['Tai64Timestamp']['output'];
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
  transactionId: Scalars['TransactionId']['output'];
};

export type GQLFeeParameters = {
  __typename: 'FeeParameters';
  gasPerByte: Scalars['U64']['output'];
  gasPriceFactor: Scalars['U64']['output'];
  version: GQLFeeParametersVersion;
};

export enum GQLFeeParametersVersion {
  V1 = 'V1'
}

export type GQLFinalizedInfo = {
  __typename: 'FinalizedInfo';
  ethTx?: Maybe<GQLEthTx>;
  sequencerTx?: Maybe<GQLSequencerTx>;
};

export type GQLGasCosts = {
  __typename: 'GasCosts';
  add: Scalars['U64']['output'];
  addi: Scalars['U64']['output'];
  aloc: Scalars['U64']['output'];
  alocDependentCost: GQLDependentCost;
  and: Scalars['U64']['output'];
  andi: Scalars['U64']['output'];
  bal: Scalars['U64']['output'];
  bhei: Scalars['U64']['output'];
  bhsh: Scalars['U64']['output'];
  burn: Scalars['U64']['output'];
  call: GQLDependentCost;
  cb: Scalars['U64']['output'];
  ccp: GQLDependentCost;
  cfei: Scalars['U64']['output'];
  cfsi: Scalars['U64']['output'];
  contractRoot: GQLDependentCost;
  croo: GQLDependentCost;
  csiz: GQLDependentCost;
  div: Scalars['U64']['output'];
  divi: Scalars['U64']['output'];
  eck1: Scalars['U64']['output'];
  ecr1: Scalars['U64']['output'];
  ed19: Scalars['U64']['output'];
  eq: Scalars['U64']['output'];
  exp: Scalars['U64']['output'];
  expi: Scalars['U64']['output'];
  flag: Scalars['U64']['output'];
  gm: Scalars['U64']['output'];
  gt: Scalars['U64']['output'];
  gtf: Scalars['U64']['output'];
  ji: Scalars['U64']['output'];
  jmp: Scalars['U64']['output'];
  jmpb: Scalars['U64']['output'];
  jmpf: Scalars['U64']['output'];
  jne: Scalars['U64']['output'];
  jneb: Scalars['U64']['output'];
  jnef: Scalars['U64']['output'];
  jnei: Scalars['U64']['output'];
  jnzb: Scalars['U64']['output'];
  jnzf: Scalars['U64']['output'];
  jnzi: Scalars['U64']['output'];
  k256: GQLDependentCost;
  lb: Scalars['U64']['output'];
  ldc: GQLDependentCost;
  log: Scalars['U64']['output'];
  logd: GQLDependentCost;
  lt: Scalars['U64']['output'];
  lw: Scalars['U64']['output'];
  mcl: GQLDependentCost;
  mcli: GQLDependentCost;
  mcp: GQLDependentCost;
  mcpi: GQLDependentCost;
  meq: GQLDependentCost;
  mint: Scalars['U64']['output'];
  mldv: Scalars['U64']['output'];
  mlog: Scalars['U64']['output'];
  modOp: Scalars['U64']['output'];
  modi: Scalars['U64']['output'];
  moveOp: Scalars['U64']['output'];
  movi: Scalars['U64']['output'];
  mroo: Scalars['U64']['output'];
  mul: Scalars['U64']['output'];
  muli: Scalars['U64']['output'];
  newStoragePerByte: Scalars['U64']['output'];
  noop: Scalars['U64']['output'];
  not: Scalars['U64']['output'];
  or: Scalars['U64']['output'];
  ori: Scalars['U64']['output'];
  poph: Scalars['U64']['output'];
  popl: Scalars['U64']['output'];
  pshh: Scalars['U64']['output'];
  pshl: Scalars['U64']['output'];
  ret: Scalars['U64']['output'];
  retd: GQLDependentCost;
  rvrt: Scalars['U64']['output'];
  s256: GQLDependentCost;
  sb: Scalars['U64']['output'];
  scwq: GQLDependentCost;
  sll: Scalars['U64']['output'];
  slli: Scalars['U64']['output'];
  smo: GQLDependentCost;
  srl: Scalars['U64']['output'];
  srli: Scalars['U64']['output'];
  srw: Scalars['U64']['output'];
  srwq: GQLDependentCost;
  stateRoot: GQLDependentCost;
  sub: Scalars['U64']['output'];
  subi: Scalars['U64']['output'];
  sw: Scalars['U64']['output'];
  sww: Scalars['U64']['output'];
  swwq: GQLDependentCost;
  time: Scalars['U64']['output'];
  tr: Scalars['U64']['output'];
  tro: Scalars['U64']['output'];
  version: GQLGasCostsVersion;
  vmInitialization: GQLDependentCost;
  wdam: Scalars['U64']['output'];
  wdcm: Scalars['U64']['output'];
  wddv: Scalars['U64']['output'];
  wdmd: Scalars['U64']['output'];
  wdml: Scalars['U64']['output'];
  wdmm: Scalars['U64']['output'];
  wdop: Scalars['U64']['output'];
  wqam: Scalars['U64']['output'];
  wqcm: Scalars['U64']['output'];
  wqdv: Scalars['U64']['output'];
  wqmd: Scalars['U64']['output'];
  wqml: Scalars['U64']['output'];
  wqmm: Scalars['U64']['output'];
  wqop: Scalars['U64']['output'];
  xor: Scalars['U64']['output'];
  xori: Scalars['U64']['output'];
};

export enum GQLGasCostsVersion {
  V1 = 'V1'
}

export enum GQLGenericStatusType {
  Finalized = 'Finalized',
  Skipped = 'Skipped',
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync'
}

export type GQLGenesis = {
  __typename: 'Genesis';
  /**
   * The chain configs define what consensus type to use, what settlement layer to use,
   * rules of block validity, etc.
   */
  chainConfigHash: Scalars['Bytes32']['output'];
  /** The Binary Merkle Tree root of all genesis coins. */
  coinsRoot: Scalars['Bytes32']['output'];
  /** The Binary Merkle Tree root of state, balances, contracts code hash of each contract. */
  contractsRoot: Scalars['Bytes32']['output'];
  /** The Binary Merkle Tree root of all genesis messages. */
  messagesRoot: Scalars['Bytes32']['output'];
  /** The Binary Merkle Tree root of all processed transaction ids. */
  transactionsRoot: Scalars['Bytes32']['output'];
};

export type GQLGraphQlBridgeResponse = {
  __typename: 'GraphQLBridgeResponse';
  nodes?: Maybe<Array<Maybe<GQLBridgeResponse>>>;
  pageInfo?: Maybe<GQLBridgePageInfo>;
};

export type GQLGroupedInput = GQLGroupedInputCoin | GQLGroupedInputContract | GQLGroupedInputMessage;

export type GQLGroupedInputCoin = {
  __typename: 'GroupedInputCoin';
  assetId?: Maybe<Scalars['AssetId']['output']>;
  inputs?: Maybe<Array<GQLInput>>;
  owner?: Maybe<Scalars['Address']['output']>;
  totalAmount?: Maybe<Scalars['U64']['output']>;
  type?: Maybe<GQLGroupedInputType>;
};

export type GQLGroupedInputContract = {
  __typename: 'GroupedInputContract';
  contractId?: Maybe<Scalars['ContractId']['output']>;
  inputs?: Maybe<Array<GQLInput>>;
  type?: Maybe<GQLGroupedInputType>;
};

export type GQLGroupedInputMessage = {
  __typename: 'GroupedInputMessage';
  data?: Maybe<Scalars['HexString']['output']>;
  inputs?: Maybe<Array<GQLInput>>;
  recipient?: Maybe<Scalars['Address']['output']>;
  sender?: Maybe<Scalars['Address']['output']>;
  type?: Maybe<GQLGroupedInputType>;
};

export enum GQLGroupedInputType {
  InputCoin = 'InputCoin',
  InputContract = 'InputContract',
  InputMessage = 'InputMessage'
}

export type GQLGroupedOutput = GQLGroupedOutputChanged | GQLGroupedOutputCoin | GQLGroupedOutputContractCreated;

export type GQLGroupedOutputChanged = {
  __typename: 'GroupedOutputChanged';
  assetId?: Maybe<Scalars['AssetId']['output']>;
  outputs?: Maybe<Array<Maybe<GQLOutput>>>;
  to?: Maybe<Scalars['Address']['output']>;
  totalAmount?: Maybe<Scalars['U64']['output']>;
  type?: Maybe<GQLGroupedOutputType>;
};

export type GQLGroupedOutputCoin = {
  __typename: 'GroupedOutputCoin';
  assetId?: Maybe<Scalars['AssetId']['output']>;
  outputs?: Maybe<Array<Maybe<GQLOutput>>>;
  to?: Maybe<Scalars['Address']['output']>;
  totalAmount?: Maybe<Scalars['U64']['output']>;
  type?: Maybe<GQLGroupedOutputType>;
};

export type GQLGroupedOutputContractCreated = {
  __typename: 'GroupedOutputContractCreated';
  contractId?: Maybe<Scalars['ContractId']['output']>;
  outputs?: Maybe<Array<Maybe<GQLOutput>>>;
  type?: Maybe<GQLGroupedOutputType>;
};

export enum GQLGroupedOutputType {
  OutputChanged = 'OutputChanged',
  OutputCoin = 'OutputCoin',
  OutputContractCreated = 'OutputContractCreated'
}

export type GQLHeader = {
  __typename: 'Header';
  /** Hash of the application header. */
  applicationHash: Scalars['Bytes32']['output'];
  /** The version of the consensus parameters used to create this block. */
  consensusParametersVersion: Scalars['U32']['output'];
  /** The layer 1 height of messages and events to include since the last layer 1 block number. */
  daHeight: Scalars['U64']['output'];
  /** Merkle root of inbox events in this block. */
  eventInboxRoot: Scalars['Bytes32']['output'];
  /** Fuel block height. */
  height: Scalars['U32']['output'];
  /** Hash of the header */
  id: Scalars['BlockId']['output'];
  /** Merkle root of message receipts in this block. */
  messageOutboxRoot: Scalars['Bytes32']['output'];
  /** Number of message receipts in this block. */
  messageReceiptCount: Scalars['U32']['output'];
  /** Merkle root of all previous block header hashes. */
  prevRoot: Scalars['Bytes32']['output'];
  /** The version of the state transition bytecode used to create this block. */
  stateTransitionBytecodeVersion: Scalars['U32']['output'];
  /** The block producer time. */
  time: Scalars['Tai64Timestamp']['output'];
  /** Number of transactions in this block. */
  transactionsCount: Scalars['U16']['output'];
  /** Merkle root of transactions. */
  transactionsRoot: Scalars['Bytes32']['output'];
  /** Version of the header */
  version: GQLHeaderVersion;
};

export enum GQLHeaderVersion {
  V1 = 'V1'
}

export type GQLHeavyOperation = {
  __typename: 'HeavyOperation';
  base: Scalars['U64']['output'];
  gasPerUnit: Scalars['U64']['output'];
};

export type GQLInput = GQLInputCoin | GQLInputContract | GQLInputMessage;

export type GQLInputCoin = {
  __typename: 'InputCoin';
  amount: Scalars['U64']['output'];
  amountInUsd?: Maybe<Scalars['String']['output']>;
  assetId: Scalars['AssetId']['output'];
  contractId?: Maybe<Scalars['ContractId']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner: Scalars['Address']['output'];
  predicate: Scalars['HexString']['output'];
  predicateData: Scalars['HexString']['output'];
  predicateGasUsed: Scalars['U64']['output'];
  rate?: Maybe<Scalars['U64']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  txPointer: Scalars['TxPointer']['output'];
  utxoId: Scalars['UtxoId']['output'];
  witnessIndex: Scalars['U16']['output'];
};

export type GQLInputContract = {
  __typename: 'InputContract';
  balanceRoot: Scalars['Bytes32']['output'];
  contractId?: Maybe<Scalars['ContractId']['output']>;
  stateRoot: Scalars['Bytes32']['output'];
  txPointer: Scalars['TxPointer']['output'];
  utxoId: Scalars['UtxoId']['output'];
};

export type GQLInputMessage = {
  __typename: 'InputMessage';
  amount: Scalars['U64']['output'];
  data: Scalars['HexString']['output'];
  nonce: Scalars['Nonce']['output'];
  predicate: Scalars['HexString']['output'];
  predicateData: Scalars['HexString']['output'];
  predicateGasUsed: Scalars['U64']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
  witnessIndex: Scalars['U16']['output'];
};

export type GQLLatestGasPrice = {
  __typename: 'LatestGasPrice';
  blockHeight: Scalars['U32']['output'];
  gasPrice: Scalars['U64']['output'];
};

export type GQLLightOperation = {
  __typename: 'LightOperation';
  base: Scalars['U64']['output'];
  unitsPerGas: Scalars['U64']['output'];
};

export type GQLMerkleProof = {
  __typename: 'MerkleProof';
  proofIndex: Scalars['U64']['output'];
  proofSet: Array<Scalars['Bytes32']['output']>;
};

export type GQLMessage = {
  __typename: 'Message';
  amount: Scalars['U64']['output'];
  daHeight: Scalars['U64']['output'];
  data: Scalars['HexString']['output'];
  nonce: Scalars['Nonce']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
};

export type GQLMessageCoin = {
  __typename: 'MessageCoin';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  daHeight: Scalars['U64']['output'];
  nonce: Scalars['Nonce']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
};

export type GQLMessageConnection = {
  __typename: 'MessageConnection';
  /** A list of edges. */
  edges: Array<GQLMessageEdge>;
  /** A list of nodes. */
  nodes: Array<GQLMessage>;
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo;
};

/** An edge in a connection. */
export type GQLMessageEdge = {
  __typename: 'MessageEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: GQLMessage;
};

export type GQLMessageProof = {
  __typename: 'MessageProof';
  amount: Scalars['U64']['output'];
  blockProof: GQLMerkleProof;
  commitBlockHeader: GQLHeader;
  data: Scalars['HexString']['output'];
  messageBlockHeader: GQLHeader;
  messageProof: GQLMerkleProof;
  nonce: Scalars['Nonce']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
};

export enum GQLMessageState {
  NotFound = 'NOT_FOUND',
  Spent = 'SPENT',
  Unspent = 'UNSPENT'
}

export type GQLMessageStatus = {
  __typename: 'MessageStatus';
  state: GQLMessageState;
};

export type GQLMutation = {
  __typename: 'Mutation';
  /**
   * Resume execution of the VM instance after a breakpoint.
   * Runs until the next breakpoint or until the transaction completes.
   */
  continueTx: GQLRunResult;
  /** Execute a dry-run of multiple transactions using a fork of current state, no changes are committed. */
  dryRun: Array<GQLDryRunTransactionExecutionStatus>;
  /** End debugger session. */
  endSession: Scalars['Boolean']['output'];
  /** Execute a single fuel-asm instruction. */
  execute: Scalars['Boolean']['output'];
  /**
   * Sequentially produces `blocks_to_produce` blocks. The first block starts with
   * `start_timestamp`. If the block production in the [`crate::service::Config`] is
   * `Trigger::Interval { block_time }`, produces blocks with `block_time ` intervals between
   * them. The `start_timestamp` is the timestamp in seconds.
   */
  produceBlocks: Scalars['U32']['output'];
  /** Reset the VM instance to the initial state. */
  reset: Scalars['Boolean']['output'];
  /** Set a breakpoint for a VM instance. */
  setBreakpoint: Scalars['Boolean']['output'];
  /** Set single-stepping mode for the VM instance. */
  setSingleStepping: Scalars['Boolean']['output'];
  /**
   * Initialize a new debugger session, returning its ID.
   * A new VM instance is spawned for each session.
   * The session is run in a separate database transaction,
   * on top of the most recent node state.
   */
  startSession: Scalars['ID']['output'];
  /**
   * Run a single transaction in given session until it
   * hits a breakpoint or completes.
   */
  startTx: GQLRunResult;
  /**
   * Submits transaction to the `TxPool`.
   *
   * Returns submitted transaction if the transaction is included in the `TxPool` without problems.
   */
  submit: GQLTransaction;
};


export type GQLMutationContinueTxArgs = {
  id: Scalars['ID']['input'];
};


export type GQLMutationDryRunArgs = {
  gasPrice?: InputMaybe<Scalars['U64']['input']>;
  txs: Array<Scalars['HexString']['input']>;
  utxoValidation?: InputMaybe<Scalars['Boolean']['input']>;
};


export type GQLMutationEndSessionArgs = {
  id: Scalars['ID']['input'];
};


export type GQLMutationExecuteArgs = {
  id: Scalars['ID']['input'];
  op: Scalars['String']['input'];
};


export type GQLMutationProduceBlocksArgs = {
  blocksToProduce: Scalars['U32']['input'];
  startTimestamp?: InputMaybe<Scalars['Tai64Timestamp']['input']>;
};


export type GQLMutationResetArgs = {
  id: Scalars['ID']['input'];
};


export type GQLMutationSetBreakpointArgs = {
  breakpoint: GQLBreakpoint;
  id: Scalars['ID']['input'];
};


export type GQLMutationSetSingleSteppingArgs = {
  enable: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};


export type GQLMutationStartTxArgs = {
  id: Scalars['ID']['input'];
  txJson: Scalars['String']['input'];
};


export type GQLMutationSubmitArgs = {
  tx: Scalars['HexString']['input'];
};

export type GQLNodeInfo = {
  __typename: 'NodeInfo';
  maxDepth: Scalars['U64']['output'];
  maxTx: Scalars['U64']['output'];
  nodeVersion: Scalars['String']['output'];
  peers: Array<GQLPeerInfo>;
  utxoValidation: Scalars['Boolean']['output'];
  vmBacktrace: Scalars['Boolean']['output'];
};

export type GQLOperation = {
  __typename: 'Operation';
  _id?: Maybe<Scalars['String']['output']>;
  receipts?: Maybe<Array<GQLOperationReceipt>>;
  type?: Maybe<GQLOperationType>;
};

export type GQLOperationReceipt = {
  __typename: 'OperationReceipt';
  item?: Maybe<GQLReceipt>;
  receipts?: Maybe<Array<GQLOperationReceipt>>;
};

export enum GQLOperationType {
  FinalResult = 'FINAL_RESULT',
  FromAccount = 'FROM_ACCOUNT',
  FromContract = 'FROM_CONTRACT',
  Rootless = 'ROOTLESS'
}

export type GQLOperationsFilterInput = {
  transactionHash: Scalars['String']['input'];
};

export type GQLOutput = GQLChangeOutput | GQLCoinOutput | GQLContractCreated | GQLContractOutput | GQLVariableOutput;

/**
 * A separate `Breakpoint` type to be used as an output, as a single
 * type cannot act as both input and output type in async-graphql
 */
export type GQLOutputBreakpoint = {
  __typename: 'OutputBreakpoint';
  contract: Scalars['ContractId']['output'];
  pc: Scalars['U64']['output'];
};

/**
 * Specifies the type of owner for filtering transactions.
 * ACCOUNT filters to only externally owned accounts (EOAs).
 * CONTRACT filters to only contract accounts.
 */
export enum GQLOwnerType {
  Account = 'ACCOUNT',
  Contract = 'CONTRACT'
}

/** Information about pagination in a connection */
export type GQLPageInfo = {
  __typename: 'PageInfo';
  endCount?: Maybe<Scalars['Int']['output']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  startCount?: Maybe<Scalars['Int']['output']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type GQLParsedTime = {
  __typename: 'ParsedTime';
  fromNow?: Maybe<Scalars['String']['output']>;
  full?: Maybe<Scalars['String']['output']>;
  rawTai64?: Maybe<Scalars['String']['output']>;
  rawUnix?: Maybe<Scalars['String']['output']>;
};

export type GQLPeerInfo = {
  __typename: 'PeerInfo';
  /** The advertised multi-addrs that can be used to connect to this peer */
  addresses: Array<Scalars['String']['output']>;
  /** The internal fuel p2p reputation of this peer */
  appScore: Scalars['Float']['output'];
  /** The last reported height of the peer */
  blockHeight?: Maybe<Scalars['U32']['output']>;
  /** The self-reported version of the client the peer is using */
  clientVersion?: Maybe<Scalars['String']['output']>;
  /** The libp2p peer id */
  id: Scalars['String']['output'];
  /** The last heartbeat from this peer in unix epoch time ms */
  lastHeartbeatMs: Scalars['U64']['output'];
};

export type GQLPoAConsensus = {
  __typename: 'PoAConsensus';
  /** Gets the signature of the block produced by `PoA` consensus. */
  signature: Scalars['Signature']['output'];
};

export type GQLPolicies = {
  __typename: 'Policies';
  maturity?: Maybe<Scalars['U32']['output']>;
  maxFee?: Maybe<Scalars['U64']['output']>;
  /**
   * The Owner policy (PolicyType 32) designates which input index is the transaction owner.
   * This field will be null if the Owner policy is not set.
   */
  ownerInputIndex?: Maybe<Scalars['U16']['output']>;
  tip?: Maybe<Scalars['U64']['output']>;
  witnessLimit?: Maybe<Scalars['U64']['output']>;
};

export type GQLPredicateItem = {
  __typename: 'PredicateItem';
  address?: Maybe<Scalars['Address']['output']>;
  bytecode?: Maybe<Scalars['String']['output']>;
};

export type GQLPredicateParameters = {
  __typename: 'PredicateParameters';
  maxGasPerPredicate: Scalars['U64']['output'];
  maxMessageDataLength: Scalars['U64']['output'];
  maxPredicateDataLength: Scalars['U64']['output'];
  maxPredicateLength: Scalars['U64']['output'];
  version: GQLPredicateParametersVersion;
};

export enum GQLPredicateParametersVersion {
  V1 = 'V1'
}

export type GQLProgramState = {
  __typename: 'ProgramState';
  data: Scalars['HexString']['output'];
  returnType: GQLReturnType;
};

export type GQLQuery = {
  __typename: 'Query';
  asset?: Maybe<GQLAsset>;
  assetsByContract: GQLAssetsContractConnection;
  balance: GQLBalance;
  balanceByBlockHeight?: Maybe<GQLBalanceByBlockHeight>;
  balances: GQLBalanceConnection;
  block?: Maybe<GQLBlock>;
  blocks: GQLBlockConnection;
  bridgeEvent?: Maybe<GQLBridgeResponse>;
  bridgeEvents?: Maybe<GQLGraphQlBridgeResponse>;
  chain: GQLChainInfo;
  /** Gets the coin by `utxo_id`. */
  coin?: Maybe<GQLCoin>;
  /** Gets all unspent coins of some `owner` maybe filtered with by `asset_id` per page. */
  coins: GQLCoinConnection;
  /**
   * For each `query_per_asset`, get some spendable coins(of asset specified by the query) owned by
   * `owner` that add up at least the query amount. The returned coins can be spent.
   * The number of coins is optimized to prevent dust accumulation.
   *
   * The query supports excluding and maximum the number of coins.
   *
   * Returns:
   * The list of spendable coins per asset from the query. The length of the result is
   * the same as the length of `query_per_asset`. The ordering of assets and `query_per_asset`
   * is the same.
   */
  coinsToSpend: Array<Array<GQLCoinType>>;
  contract?: Maybe<GQLContract>;
  contractBalance: GQLContractBalance;
  contractBalances: GQLContractBalanceConnection;
  contracts: GQLContractConnection;
  estimateGasPrice: GQLEstimateGasPrice;
  /** Estimate the predicate gas for the provided transaction */
  estimatePredicates: GQLTransaction;
  getBlocksDashboard: GQLBlocksDashboardConnection;
  /** Returns true when the GraphQL API is serving requests. */
  health: Scalars['Boolean']['output'];
  latestGasPrice: GQLLatestGasPrice;
  /** Read read a range of memory bytes. */
  memory: Scalars['String']['output'];
  message?: Maybe<GQLMessage>;
  messageProof?: Maybe<GQLMessageProof>;
  messageStatus: GQLMessageStatus;
  messages: GQLMessageConnection;
  nodeInfo: GQLNodeInfo;
  predicate?: Maybe<GQLPredicateItem>;
  /** Read register value by index. */
  register: Scalars['U64']['output'];
  relayedTransactionStatus?: Maybe<GQLRelayedTransactionStatus>;
  search?: Maybe<GQLSearchResult>;
  searchFast?: Maybe<GQLSearchFastResult>;
  searchSlow?: Maybe<GQLSearchSlowResult>;
  stakingAPY?: Maybe<GQLStakingApy>;
  stakingEvent?: Maybe<GQLStakingEventResponse>;
  stakingEvents?: Maybe<GQLStakingEventsResult>;
  statistics: GQLStatisticsConnection;
  tps: GQLTpsConnection;
  transaction?: Maybe<GQLTransaction>;
  transactions: GQLTransactionConnection;
  transactionsByBlockId: GQLTransactionConnection;
  transactionsByOwner: GQLTransactionConnection;
};


export type GQLQueryAssetArgs = {
  assetId: Scalars['String']['input'];
};


export type GQLQueryAssetsByContractArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  contractId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryBalanceArgs = {
  assetId: Scalars['AssetId']['input'];
  owner: Scalars['Address']['input'];
};


export type GQLQueryBalanceByBlockHeightArgs = {
  accountHash: Scalars['Address']['input'];
  assetId: Scalars['AssetId']['input'];
  blockHeight?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryBalancesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLBalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryBlockArgs = {
  height?: InputMaybe<Scalars['U32']['input']>;
  id?: InputMaybe<Scalars['BlockId']['input']>;
};


export type GQLQueryBlocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryBridgeEventArgs = {
  eventId: Scalars['Int']['input'];
  eventType: Scalars['String']['input'];
};


export type GQLQueryBridgeEventsArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryCoinArgs = {
  utxoId: Scalars['UtxoId']['input'];
};


export type GQLQueryCoinsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLCoinFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryCoinsToSpendArgs = {
  excludedIds?: InputMaybe<GQLExcludeInput>;
  owner: Scalars['Address']['input'];
  queryPerAsset: Array<GQLSpendQueryElementInput>;
};


export type GQLQueryContractArgs = {
  id: Scalars['ContractId']['input'];
};


export type GQLQueryContractBalanceArgs = {
  asset: Scalars['AssetId']['input'];
  contract: Scalars['ContractId']['input'];
};


export type GQLQueryContractBalancesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLContractBalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryContractsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryEstimateGasPriceArgs = {
  blockHorizon?: InputMaybe<Scalars['U32']['input']>;
};


export type GQLQueryEstimatePredicatesArgs = {
  tx: Scalars['HexString']['input'];
};


export type GQLQueryMemoryArgs = {
  id: Scalars['ID']['input'];
  size: Scalars['U32']['input'];
  start: Scalars['U32']['input'];
};


export type GQLQueryMessageArgs = {
  nonce: Scalars['Nonce']['input'];
};


export type GQLQueryMessageProofArgs = {
  commitBlockHeight?: InputMaybe<Scalars['U32']['input']>;
  commitBlockId?: InputMaybe<Scalars['BlockId']['input']>;
  nonce: Scalars['Nonce']['input'];
  transactionId: Scalars['TransactionId']['input'];
};


export type GQLQueryMessageStatusArgs = {
  nonce: Scalars['Nonce']['input'];
};


export type GQLQueryMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['Address']['input']>;
};


export type GQLQueryPredicateArgs = {
  address: Scalars['String']['input'];
};


export type GQLQueryRegisterArgs = {
  id: Scalars['ID']['input'];
  register: Scalars['U32']['input'];
};


export type GQLQueryRelayedTransactionStatusArgs = {
  id: Scalars['RelayedTransactionId']['input'];
};


export type GQLQuerySearchArgs = {
  query: Scalars['String']['input'];
};


export type GQLQuerySearchFastArgs = {
  query: Scalars['String']['input'];
};


export type GQLQuerySearchSlowArgs = {
  query: Scalars['String']['input'];
};


export type GQLQueryStakingEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type GQLQueryStakingEventsArgs = {
  address: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryTransactionArgs = {
  id: Scalars['TransactionId']['input'];
};


export type GQLQueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryTransactionsByBlockIdArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  blockId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryTransactionsByOwnerArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  owner: Scalars['Address']['input'];
  ownerType?: InputMaybe<GQLOwnerType>;
};

export type GQLReDelegateResponse = {
  __typename: 'ReDelegateResponse';
  amount: Scalars['String']['output'];
  from: Scalars['String']['output'];
  fromValidator: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statusInfo: GQLBaseStatusInfo;
  toValidator: Scalars['String']['output'];
  type: GQLResponseType;
};

export type GQLReadyToProcessWithdrawInfo = {
  __typename: 'ReadyToProcessWithdrawInfo';
  proof: Scalars['String']['output'];
};

export type GQLReceipt = {
  __typename: 'Receipt';
  amount?: Maybe<Scalars['U64']['output']>;
  assetId?: Maybe<Scalars['AssetId']['output']>;
  /** Set in the case of a Panic receipt to indicate a missing contract input id */
  contractId?: Maybe<Scalars['ContractId']['output']>;
  data?: Maybe<Scalars['HexString']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  digest?: Maybe<Scalars['Bytes32']['output']>;
  gas?: Maybe<Scalars['U64']['output']>;
  gasUsed?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ContractId']['output']>;
  is?: Maybe<Scalars['U64']['output']>;
  len?: Maybe<Scalars['U64']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['Nonce']['output']>;
  param1?: Maybe<Scalars['U64']['output']>;
  param2?: Maybe<Scalars['U64']['output']>;
  pc?: Maybe<Scalars['U64']['output']>;
  ptr?: Maybe<Scalars['U64']['output']>;
  ra?: Maybe<Scalars['U64']['output']>;
  rb?: Maybe<Scalars['U64']['output']>;
  rc?: Maybe<Scalars['U64']['output']>;
  rd?: Maybe<Scalars['U64']['output']>;
  reason?: Maybe<Scalars['U64']['output']>;
  receiptType: GQLReceiptType;
  recipient?: Maybe<Scalars['Address']['output']>;
  result?: Maybe<Scalars['U64']['output']>;
  sender?: Maybe<Scalars['Address']['output']>;
  subId?: Maybe<Scalars['Bytes32']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['ContractId']['output']>;
  toAddress?: Maybe<Scalars['Address']['output']>;
  val?: Maybe<Scalars['U64']['output']>;
};

export enum GQLReceiptType {
  Burn = 'BURN',
  Call = 'CALL',
  Log = 'LOG',
  LogData = 'LOG_DATA',
  MessageOut = 'MESSAGE_OUT',
  Mint = 'MINT',
  Panic = 'PANIC',
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT',
  ScriptResult = 'SCRIPT_RESULT',
  Transfer = 'TRANSFER',
  TransferOut = 'TRANSFER_OUT'
}

export type GQLRelayedTransactionFailed = {
  __typename: 'RelayedTransactionFailed';
  blockHeight: Scalars['U32']['output'];
  failure: Scalars['String']['output'];
};

export type GQLRelayedTransactionStatus = GQLRelayedTransactionFailed;

export enum GQLResponseType {
  ClaimRewards = 'ClaimRewards',
  Delegate = 'Delegate',
  ReDelegate = 'ReDelegate',
  Undelegate = 'Undelegate',
  Withdraw = 'Withdraw'
}

export enum GQLReturnType {
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT'
}

export type GQLRunResult = {
  __typename: 'RunResult';
  breakpoint?: Maybe<GQLOutputBreakpoint>;
  jsonReceipts: Array<Scalars['String']['output']>;
  state: GQLRunState;
};

export enum GQLRunState {
  /** Stopped on a breakpoint */
  Breakpoint = 'BREAKPOINT',
  /** All breakpoints have been processed, and the program has terminated */
  Completed = 'COMPLETED'
}

export type GQLScriptParameters = {
  __typename: 'ScriptParameters';
  maxScriptDataLength: Scalars['U64']['output'];
  maxScriptLength: Scalars['U64']['output'];
  version: GQLScriptParametersVersion;
};

export enum GQLScriptParametersVersion {
  V1 = 'V1'
}

export type GQLSearchAccount = {
  __typename: 'SearchAccount';
  address?: Maybe<Scalars['Address']['output']>;
  transactions?: Maybe<Array<Maybe<GQLSearchTransaction>>>;
};

export type GQLSearchBlock = {
  __typename: 'SearchBlock';
  height?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BlockId']['output']>;
};

export type GQLSearchContract = {
  __typename: 'SearchContract';
  id?: Maybe<Scalars['ContractId']['output']>;
};

export type GQLSearchFastResult = {
  __typename: 'SearchFastResult';
  block?: Maybe<GQLSearchBlock>;
  contract?: Maybe<GQLSearchContract>;
  predicate?: Maybe<GQLPredicateItem>;
  transaction?: Maybe<GQLSearchTransaction>;
};

export type GQLSearchResult = {
  __typename: 'SearchResult';
  account?: Maybe<GQLSearchAccount>;
  block?: Maybe<GQLSearchBlock>;
  contract?: Maybe<GQLSearchContract>;
  predicate?: Maybe<GQLPredicateItem>;
  transaction?: Maybe<GQLSearchTransaction>;
};

export type GQLSearchSlowResult = {
  __typename: 'SearchSlowResult';
  account?: Maybe<GQLSearchAccount>;
  asset?: Maybe<GQLAsset>;
};

export type GQLSearchTransaction = {
  __typename: 'SearchTransaction';
  id?: Maybe<Scalars['TransactionId']['output']>;
};

export type GQLSequencerTx = {
  __typename: 'SequencerTx';
  height: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};

export type GQLSkippedInfo = {
  __typename: 'SkippedInfo';
  message: Scalars['String']['output'];
};

export type GQLSpendQueryElementInput = {
  /** Target amount for the query. */
  amount: Scalars['U64']['input'];
  /** Identifier of the asset to spend. */
  assetId: Scalars['AssetId']['input'];
  /** The maximum number of currencies for selection. */
  max?: InputMaybe<Scalars['U32']['input']>;
};

export type GQLSqueezedOutStatus = {
  __typename: 'SqueezedOutStatus';
  reason: Scalars['String']['output'];
};

export type GQLStakingApy = {
  __typename: 'StakingAPY';
  amount?: Maybe<Scalars['U32']['output']>;
};

export type GQLStakingEventResponse = GQLClaimRewardsResponse | GQLDelegateResponse | GQLReDelegateResponse | GQLUndelegateResponse | GQLWithdrawResponse;

export type GQLStakingEventsResult = {
  __typename: 'StakingEventsResult';
  nodes?: Maybe<Array<Maybe<GQLStakingEventResponse>>>;
  pageInfo?: Maybe<GQLPageInfo>;
};

export type GQLStateTransitionPurpose = {
  __typename: 'StateTransitionPurpose';
  root: Scalars['Bytes32']['output'];
};

export type GQLStatistics = {
  __typename: 'Statistics';
  averageGasUsed?: Maybe<Array<Maybe<GQLStatisticsDetails>>>;
  averageTps?: Maybe<Array<Maybe<GQLStatisticsDetails>>>;
  maxGasUsed?: Maybe<Array<Maybe<GQLStatisticsDetails>>>;
  maxTps?: Maybe<Array<Maybe<GQLStatisticsDetails>>>;
  totalFee?: Maybe<Array<Maybe<GQLStatisticsTotalFeeDetails>>>;
  totalFee24hrs?: Maybe<Scalars['String']['output']>;
  totalGasUsed?: Maybe<Array<Maybe<GQLStatisticsDetails>>>;
  totalTps?: Maybe<Array<Maybe<GQLStatisticsDetails>>>;
};

export type GQLStatisticsConnection = {
  __typename: 'StatisticsConnection';
  nodes?: Maybe<GQLStatistics>;
};

export type GQLStatisticsDetails = {
  __typename: 'StatisticsDetails';
  date?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['U64']['output']>;
};

export type GQLStatisticsTotalFeeDetails = {
  __typename: 'StatisticsTotalFeeDetails';
  date?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['U64']['output']>;
  valueInUsd?: Maybe<Scalars['String']['output']>;
};

export type GQLSubmittedStatus = {
  __typename: 'SubmittedStatus';
  time: Scalars['Tai64Timestamp']['output'];
};

export type GQLSubscription = {
  __typename: 'Subscription';
  /**
   * Returns a stream of status updates for the given transaction id.
   * If the current status is [`TransactionStatus::Success`], [`TransactionStatus::SqueezedOut`]
   * or [`TransactionStatus::Failed`] the stream will return that and end immediately.
   * If the current status is [`TransactionStatus::Submitted`] this will be returned
   * and the stream will wait for a future update.
   *
   * This stream will wait forever so it's advised to use within a timeout.
   *
   * It is possible for the stream to miss an update if it is polled slower
   * then the updates arrive. In such a case the stream will close without
   * a status. If this occurs the stream can simply be restarted to return
   * the latest status.
   */
  statusChange: GQLTransactionStatus;
  /** Submits transaction to the `TxPool` and await either confirmation or failure. */
  submitAndAwait: GQLTransactionStatus;
};


export type GQLSubscriptionStatusChangeArgs = {
  id: Scalars['TransactionId']['input'];
};


export type GQLSubscriptionSubmitAndAwaitArgs = {
  tx: Scalars['HexString']['input'];
};

export type GQLSuccessStatus = {
  __typename: 'SuccessStatus';
  block: GQLBlock;
  programState?: Maybe<GQLProgramState>;
  receipts: Array<GQLReceipt>;
  time: Scalars['Tai64Timestamp']['output'];
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
  transactionId: Scalars['TransactionId']['output'];
};

export type GQLTps = {
  __typename: 'TPS';
  end?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
  totalGas: Scalars['U64']['output'];
  txCount: Scalars['U64']['output'];
};

export type GQLTpsConnection = {
  __typename: 'TPSConnection';
  nodes: Array<GQLTps>;
};

export type GQLTransaction = {
  __typename: 'Transaction';
  _id?: Maybe<Scalars['String']['output']>;
  blockHeight?: Maybe<Scalars['U32']['output']>;
  bytecodeRoot?: Maybe<Scalars['Bytes32']['output']>;
  bytecodeWitnessIndex?: Maybe<Scalars['U16']['output']>;
  gasCosts?: Maybe<GQLTransactionGasCosts>;
  groupedInputs: Array<GQLGroupedInput>;
  groupedOutputs: Array<GQLGroupedOutput>;
  hasPredicate?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['TransactionId']['output'];
  inputAssetIds?: Maybe<Array<Scalars['AssetId']['output']>>;
  inputContract?: Maybe<GQLInputContract>;
  inputContracts?: Maybe<Array<Scalars['ContractId']['output']>>;
  inputs?: Maybe<Array<GQLInput>>;
  isCreate: Scalars['Boolean']['output'];
  isMint: Scalars['Boolean']['output'];
  isScript: Scalars['Boolean']['output'];
  isUpgrade: Scalars['Boolean']['output'];
  isUpload: Scalars['Boolean']['output'];
  maturity?: Maybe<Scalars['U32']['output']>;
  mintAmount?: Maybe<Scalars['U64']['output']>;
  mintAmountUsd: Scalars['String']['output'];
  mintAssetId?: Maybe<Scalars['AssetId']['output']>;
  mintGasPrice?: Maybe<Scalars['U64']['output']>;
  mintedAsset?: Maybe<GQLAsset>;
  operations?: Maybe<Array<GQLOperation>>;
  outputContract?: Maybe<GQLContractOutput>;
  outputs: Array<GQLOutput>;
  policies?: Maybe<GQLPolicies>;
  proofSet?: Maybe<Array<Scalars['Bytes32']['output']>>;
  /** Return the transaction bytes using canonical encoding */
  rawPayload: Scalars['HexString']['output'];
  receipts?: Maybe<Array<GQLReceipt>>;
  receiptsRoot?: Maybe<Scalars['Bytes32']['output']>;
  salt?: Maybe<Scalars['Salt']['output']>;
  script?: Maybe<Scalars['HexString']['output']>;
  scriptData?: Maybe<Scalars['HexString']['output']>;
  scriptGasLimit?: Maybe<Scalars['U64']['output']>;
  status?: Maybe<GQLTransactionStatus>;
  statusType?: Maybe<Scalars['String']['output']>;
  storageSlots?: Maybe<Array<Scalars['HexString']['output']>>;
  subsectionIndex?: Maybe<Scalars['U16']['output']>;
  subsectionsNumber?: Maybe<Scalars['U16']['output']>;
  time: GQLParsedTime;
  title: Scalars['String']['output'];
  txPointer?: Maybe<Scalars['TxPointer']['output']>;
  upgradePurpose?: Maybe<GQLUpgradePurpose>;
  witnesses?: Maybe<Array<Scalars['HexString']['output']>>;
};

export type GQLTransactionConnection = {
  __typename: 'TransactionConnection';
  /** A list of edges. */
  edges: Array<GQLTransactionEdge>;
  /** A list of nodes. */
  nodes: Array<GQLTransaction>;
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo;
};

/** An edge in a connection. */
export type GQLTransactionEdge = {
  __typename: 'TransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: GQLTransaction;
};

export type GQLTransactionGasCosts = {
  __typename: 'TransactionGasCosts';
  fee?: Maybe<Scalars['U64']['output']>;
  feeInUsd?: Maybe<Scalars['String']['output']>;
  gasUsed?: Maybe<Scalars['U64']['output']>;
};

export type GQLTransactionSentInfo = {
  __typename: 'TransactionSentInfo';
  ethTx: GQLEthTx;
};

export type GQLTransactionStatus = GQLFailureStatus | GQLSqueezedOutStatus | GQLSubmittedStatus | GQLSuccessStatus;

export type GQLTxParameters = {
  __typename: 'TxParameters';
  maxBytecodeSubsections: Scalars['U16']['output'];
  maxGasPerTx: Scalars['U64']['output'];
  maxInputs: Scalars['U16']['output'];
  maxOutputs: Scalars['U16']['output'];
  maxSize: Scalars['U64']['output'];
  maxWitnesses: Scalars['U32']['output'];
  version: GQLTxParametersVersion;
};

export enum GQLTxParametersVersion {
  V1 = 'V1'
}

export type GQLUndelegateResponse = {
  __typename: 'UndelegateResponse';
  amount: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statusInfo: GQLUndelegateStatusInfo;
  type: GQLResponseType;
  validator: Scalars['String']['output'];
};

export type GQLUndelegateStatusInfo = {
  __typename: 'UndelegateStatusInfo';
  Finalized?: Maybe<GQLFinalizedInfo>;
  Skipped?: Maybe<GQLSkippedInfo>;
  TransactionSent?: Maybe<GQLTransactionSentInfo>;
  WaitingSync?: Maybe<GQLWaitingSyncInfo>;
  WaitingUnbonding?: Maybe<GQLWaitingSyncInfo>;
};

export enum GQLUndelegateStatusType {
  Finalized = 'Finalized',
  Skipped = 'Skipped',
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync',
  WaitingUnbonding = 'WaitingUnbonding'
}

export type GQLUpgradePurpose = GQLConsensusParametersPurpose | GQLStateTransitionPurpose;

export type GQLUtxoItem = {
  __typename: 'UtxoItem';
  amount: Scalars['U64']['output'];
  blockCreated?: Maybe<Scalars['U32']['output']>;
  txCreatedIdx?: Maybe<Scalars['U64']['output']>;
  utxoId: Scalars['UtxoId']['output'];
};

export type GQLVariableOutput = {
  __typename: 'VariableOutput';
  amount: Scalars['U64']['output'];
  amountInUsd?: Maybe<Scalars['String']['output']>;
  assetId: Scalars['AssetId']['output'];
  contractId?: Maybe<Scalars['ContractId']['output']>;
  decimals?: Maybe<Scalars['U64']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['U64']['output']>;
  suspicious?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  to: Scalars['Address']['output'];
};

export type GQLWaitingCommittingToL1gInfo = {
  __typename: 'WaitingCommittingToL1gInfo';
  dateExpectedToComplete: Scalars['String']['output'];
  sequencerTx: GQLSequencerTx;
};

export type GQLWaitingFinalizationInfo = {
  __typename: 'WaitingFinalizationInfo';
  dateExpectedToComplete: Scalars['String']['output'];
  ethTx?: Maybe<GQLEthTx>;
};

export type GQLWaitingSyncInfo = {
  __typename: 'WaitingSyncInfo';
  dateExpectedToComplete: Scalars['String']['output'];
};

export type GQLWithdrawResponse = {
  __typename: 'WithdrawResponse';
  amount: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  nonce?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  statusInfo: GQLWithdrawStatusInfo;
  to: Scalars['String']['output'];
  type: GQLResponseType;
};

export type GQLWithdrawStatusInfo = {
  __typename: 'WithdrawStatusInfo';
  Finalized?: Maybe<GQLFinalizedInfo>;
  ReadyToProcessWithdraw?: Maybe<GQLReadyToProcessWithdrawInfo>;
  Skipped?: Maybe<GQLSkippedInfo>;
  TransactionSent?: Maybe<GQLTransactionSentInfo>;
  WaitingCommittingToL1?: Maybe<GQLWaitingCommittingToL1gInfo>;
  WaitingFinalization?: Maybe<GQLWaitingFinalizationInfo>;
  WaitingSync?: Maybe<GQLWaitingSyncInfo>;
};

export enum GQLWithdrawStatusType {
  Finalized = 'Finalized',
  ReadyToProcessWithdraw = 'ReadyToProcessWithdraw',
  Skipped = 'Skipped',
  TransactionSent = 'TransactionSent',
  WaitingCommittingToL1 = 'WaitingCommittingToL1',
  WaitingFinalization = 'WaitingFinalization',
  WaitingSync = 'WaitingSync'
}

export type GQLAssetQueryVariables = Exact<{
  assetId: Scalars['String']['input'];
}>;


export type GQLAssetQuery = { __typename: 'Query', asset?: { __typename: 'Asset', assetId?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, decimals?: string | null, icon?: string | null, verified?: boolean | null, suspicious?: boolean | null } | null };

export type GQLAssetsByContractQueryVariables = Exact<{
  contractId: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLAssetsByContractQuery = { __typename: 'Query', assetsByContract: { __typename: 'AssetsContractConnection', nodes: Array<{ __typename: 'Asset', assetId?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, decimals?: string | null, suspicious?: boolean | null, rate?: string | null, symbol?: string | null, icon?: string | null, verified?: boolean | null }>, pageInfo: { __typename: 'PageInfo', startCount?: number | null, endCount?: number | null, totalCount?: number | null, startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type GQLBalanceByBlockHeightQueryVariables = Exact<{
  assetId: Scalars['AssetId']['input'];
  accountHash: Scalars['Address']['input'];
  blockHeight: Scalars['Int']['input'];
}>;


export type GQLBalanceByBlockHeightQuery = { __typename: 'Query', balanceByBlockHeight?: { __typename: 'BalanceByBlockHeight', balance?: string | null, balanceInUsd?: string | null, assetId?: string | null, accountHash?: string | null, blockHeight?: number | null } | null };

export type GQLBalanceItemFragment = { __typename: 'Balance', amount: string, assetId: string, owner: string, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, totalSupply?: string | null, collection?: string | null, suspicious?: boolean | null, contractId?: string | null, metadata?: string | null, amountInUsd?: string | null, utxos?: Array<{ __typename: 'UtxoItem', amount: string, blockCreated?: string | null, txCreatedIdx?: string | null, utxoId: string } | null> | null };

export type GQLBalancesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLBalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLBalancesQuery = { __typename: 'Query', balances: { __typename: 'BalanceConnection', nodes: Array<{ __typename: 'Balance', amount: string, assetId: string, owner: string, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, totalSupply?: string | null, collection?: string | null, suspicious?: boolean | null, contractId?: string | null, metadata?: string | null, amountInUsd?: string | null, utxos?: Array<{ __typename: 'UtxoItem', amount: string, blockCreated?: string | null, txCreatedIdx?: string | null, utxoId: string } | null> | null }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type GQLBlockFragment = { __typename: 'Block', id: string, height: string, producer?: string | null, consensus: { __typename: 'Genesis' } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', transactionsCount: string }, time?: { __typename: 'ParsedTime', full?: string | null, fromNow?: string | null, rawUnix?: string | null } | null, transactions: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null, full?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null } | null }> };

export type GQLBlockQueryVariables = Exact<{
  height?: InputMaybe<Scalars['U32']['input']>;
  id?: InputMaybe<Scalars['BlockId']['input']>;
}>;


export type GQLBlockQuery = { __typename: 'Query', block?: { __typename: 'Block', id: string, height: string, producer?: string | null, consensus: { __typename: 'Genesis' } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', transactionsCount: string }, time?: { __typename: 'ParsedTime', full?: string | null, fromNow?: string | null, rawUnix?: string | null } | null, transactions: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null, full?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null } | null }> } | null };

export type GQLBlockItemFragment = { __typename: 'Block', totalGasUsed?: string | null, totalFee?: string | null, producer?: string | null, id: string, time?: { __typename: 'ParsedTime', fromNow?: string | null, full?: string | null, rawTai64?: string | null, rawUnix?: string | null } | null, consensus: { __typename: 'Genesis' } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', id: string, height: string, time: string, transactionsCount: string }, transactions: Array<{ __typename: 'Transaction', isMint: boolean, mintAmount?: string | null }> };

export type GQLBlocksQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLBlocksQuery = { __typename: 'Query', blocks: { __typename: 'BlockConnection', pageInfo: { __typename: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean }, edges: Array<{ __typename: 'BlockEdge', node: { __typename: 'Block', totalGasUsed?: string | null, totalFee?: string | null, producer?: string | null, id: string, time?: { __typename: 'ParsedTime', fromNow?: string | null, full?: string | null, rawTai64?: string | null, rawUnix?: string | null } | null, consensus: { __typename: 'Genesis' } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', id: string, height: string, time: string, transactionsCount: string }, transactions: Array<{ __typename: 'Transaction', isMint: boolean, mintAmount?: string | null }> } }> } };

export type GQLChainQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLChainQuery = { __typename: 'Query', chain: { __typename: 'ChainInfo', daHeight: string, name: string, consensusParameters: { __typename: 'ConsensusParameters', baseAssetId: string, blockGasLimit: string, chainId: string, privilegedAddress: string, contractParams: { __typename: 'ContractParameters', contractMaxSize: string, maxStorageSlots: string }, feeParams: { __typename: 'FeeParameters', gasPerByte: string, gasPriceFactor: string }, gasCosts: { __typename: 'GasCosts', add: string, addi: string, aloc: string, and: string, andi: string, bal: string, bhei: string, bhsh: string, burn: string, cb: string, cfei: string, cfsi: string, div: string, divi: string, eck1: string, ecr1: string, ed19: string, eq: string, exp: string, expi: string, flag: string, gm: string, gt: string, gtf: string, ji: string, jmp: string, jmpb: string, jmpf: string, jne: string, jneb: string, jnef: string, jnei: string, jnzb: string, jnzf: string, jnzi: string, lb: string, log: string, lt: string, lw: string, mint: string, mldv: string, mlog: string, modOp: string, modi: string, moveOp: string, movi: string, mroo: string, mul: string, muli: string, newStoragePerByte: string, noop: string, not: string, or: string, ori: string, poph: string, popl: string, pshh: string, pshl: string, ret: string, rvrt: string, sb: string, sll: string, slli: string, srl: string, srli: string, srw: string, sub: string, subi: string, sw: string, sww: string, time: string, tr: string, tro: string, wdam: string, wdcm: string, wddv: string, wdmd: string, wdml: string, wdmm: string, wdop: string, wqam: string, wqcm: string, wqdv: string, wqmd: string, wqml: string, wqmm: string, wqop: string, xor: string, xori: string, call: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ccp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, contractRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, croo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, csiz: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, k256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ldc: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, logd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcl: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcli: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcpi: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, meq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, retd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, s256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, scwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, smo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, srwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, stateRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, swwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, vmInitialization: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string } }, predicateParams: { __typename: 'PredicateParameters', maxGasPerPredicate: string, maxMessageDataLength: string, maxPredicateDataLength: string, maxPredicateLength: string }, scriptParams: { __typename: 'ScriptParameters', maxScriptDataLength: string, maxScriptLength: string }, txParams: { __typename: 'TxParameters', maxBytecodeSubsections: string, maxGasPerTx: string, maxInputs: string, maxOutputs: string, maxSize: string, maxWitnesses: string } }, gasCosts: { __typename: 'GasCosts', add: string, addi: string, aloc: string, and: string, andi: string, bal: string, bhei: string, bhsh: string, burn: string, cb: string, cfei: string, cfsi: string, div: string, divi: string, eck1: string, ecr1: string, ed19: string, eq: string, exp: string, expi: string, flag: string, gm: string, gt: string, gtf: string, ji: string, jmp: string, jmpb: string, jmpf: string, jne: string, jneb: string, jnef: string, jnei: string, jnzb: string, jnzf: string, jnzi: string, lb: string, log: string, lt: string, lw: string, mint: string, mldv: string, mlog: string, modOp: string, modi: string, moveOp: string, movi: string, mroo: string, mul: string, muli: string, newStoragePerByte: string, noop: string, not: string, or: string, ori: string, poph: string, popl: string, pshh: string, pshl: string, ret: string, rvrt: string, sb: string, sll: string, slli: string, srl: string, srli: string, srw: string, sub: string, subi: string, sw: string, sww: string, time: string, tr: string, tro: string, wdam: string, wdcm: string, wddv: string, wdmd: string, wdml: string, wdmm: string, wdop: string, wqam: string, wqcm: string, wqdv: string, wqmd: string, wqml: string, wqmm: string, wqop: string, xor: string, xori: string, call: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ccp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, contractRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, croo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, csiz: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, k256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ldc: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, logd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcl: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcli: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcpi: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, meq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, retd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, s256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, scwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, smo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, srwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, stateRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, swwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, vmInitialization: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string } } } };

export type GQLCoinsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLCoinFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLCoinsQuery = { __typename: 'Query', coins: { __typename: 'CoinConnection', edges: Array<{ __typename: 'CoinEdge', cursor: string, node: { __typename: 'Coin', amount: string, assetId: string, blockCreated: string, owner: string, txCreatedIdx: string, utxoId: string } }>, nodes: Array<{ __typename: 'Coin', amount: string, assetId: string, blockCreated: string, owner: string, txCreatedIdx: string, utxoId: string }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type GQLContractQueryVariables = Exact<{
  id: Scalars['ContractId']['input'];
}>;


export type GQLContractQuery = { __typename: 'Query', contract?: { __typename: 'Contract', bytecode: string } | null };

export type GQLContractBalanceNodeFragment = { __typename: 'ContractBalance', amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, decimals?: string | null, suspicious?: boolean | null, icon?: string | null };

export type GQLContractBalanceConnectionNodeFragment = { __typename: 'ContractBalanceConnection', edges: Array<{ __typename: 'ContractBalanceEdge', cursor: string, node: { __typename: 'ContractBalance', amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, decimals?: string | null, suspicious?: boolean | null, icon?: string | null } }>, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null } };

export type GQLContractBalancesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLContractBalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLContractBalancesQuery = { __typename: 'Query', contractBalances: { __typename: 'ContractBalanceConnection', edges: Array<{ __typename: 'ContractBalanceEdge', cursor: string, node: { __typename: 'ContractBalance', amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, decimals?: string | null, suspicious?: boolean | null, icon?: string | null } }>, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null } } };

export type GQLGetBlocksDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLGetBlocksDashboardQuery = { __typename: 'Query', getBlocksDashboard: { __typename: 'BlocksDashboardConnection', nodes: Array<{ __typename: 'BlocksDashboard', timestamp: string, gasUsed: string, gasUsedInUsd?: string | null, totalFee: string, totalFeeInUsd?: string | null, blockNo: string, producer?: string | null, blockHash?: string | null }> } };

export type GQLPredicateQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GQLPredicateQuery = { __typename: 'Query', predicate?: { __typename: 'PredicateItem', address?: string | null, bytecode?: string | null } | null };

export type GQLRecentTransactionFragment = { __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null, full?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null } | null };

export type GQLRecentTransactionsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLRecentTransactionsQuery = { __typename: 'Query', transactions: { __typename: 'TransactionConnection', nodes: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null, full?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null } | null }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type GQLSearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GQLSearchQuery = { __typename: 'Query', search?: { __typename: 'SearchResult', account?: { __typename: 'SearchAccount', address?: string | null, transactions?: Array<{ __typename: 'SearchTransaction', id?: string | null } | null> | null } | null, block?: { __typename: 'SearchBlock', height?: string | null, id?: string | null } | null, contract?: { __typename: 'SearchContract', id?: string | null } | null, transaction?: { __typename: 'SearchTransaction', id?: string | null } | null, predicate?: { __typename: 'PredicateItem', address?: string | null, bytecode?: string | null } | null } | null };

export type GQLStakingApyQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLStakingApyQuery = { __typename: 'Query', stakingAPY?: { __typename: 'StakingAPY', amount?: string | null } | null };

export type GQLStakingEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type GQLStakingEventQuery = { __typename: 'Query', stakingEvent?: { __typename: 'ClaimRewardsResponse', id: number, type: GQLResponseType, from: string, validator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } } | { __typename: 'DelegateResponse', id: number, type: GQLResponseType, from: string, amount: string, validator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } } | { __typename: 'ReDelegateResponse', id: number, type: GQLResponseType, from: string, amount: string, toValidator: string, fromValidator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } } | { __typename: 'UndelegateResponse', status: string, statusInfo: { __typename: 'UndelegateStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, WaitingUnbonding?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', timestamp: string, txHash: string } | null } | null } } | { __typename: 'WithdrawResponse', id: number, type: GQLResponseType, from: string, to: string, amount: string, nonce?: string | null, status: string, statusInfo: { __typename: 'WithdrawStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, WaitingCommittingToL1?: { __typename: 'WaitingCommittingToL1gInfo', dateExpectedToComplete: string, sequencerTx: { __typename: 'SequencerTx', txHash: string, timestamp: string } } | null, ReadyToProcessWithdraw?: { __typename: 'ReadyToProcessWithdrawInfo', proof: string } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null } } | null };

export type GQLStakingEventsQueryVariables = Exact<{
  address: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLStakingEventsQuery = { __typename: 'Query', stakingEvents?: { __typename: 'StakingEventsResult', nodes?: Array<{ __typename: 'ClaimRewardsResponse', id: number, type: GQLResponseType, from: string, validator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } } | { __typename: 'DelegateResponse', id: number, type: GQLResponseType, from: string, amount: string, validator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } } | { __typename: 'ReDelegateResponse', id: number, type: GQLResponseType, from: string, amount: string, toValidator: string, fromValidator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } } | { __typename: 'UndelegateResponse', status: string, statusInfo: { __typename: 'UndelegateStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, WaitingUnbonding?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', timestamp: string, txHash: string } | null } | null } } | { __typename: 'WithdrawResponse', id: number, type: GQLResponseType, from: string, to: string, amount: string, nonce?: string | null, status: string, statusInfo: { __typename: 'WithdrawStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, WaitingCommittingToL1?: { __typename: 'WaitingCommittingToL1gInfo', dateExpectedToComplete: string, sequencerTx: { __typename: 'SequencerTx', txHash: string, timestamp: string } } | null, ReadyToProcessWithdraw?: { __typename: 'ReadyToProcessWithdrawInfo', proof: string } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null } } | null> | null, pageInfo?: { __typename: 'PageInfo', endCount?: number | null, startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } | null } | null };

export type GQLBaseStatusInfoFragmentFragment = { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null };

type GQLStakingResponseFragment_ClaimRewardsResponse_Fragment = { __typename: 'ClaimRewardsResponse', id: number, type: GQLResponseType, from: string, validator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } };

type GQLStakingResponseFragment_DelegateResponse_Fragment = { __typename: 'DelegateResponse', id: number, type: GQLResponseType, from: string, amount: string, validator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } };

type GQLStakingResponseFragment_ReDelegateResponse_Fragment = { __typename: 'ReDelegateResponse', id: number, type: GQLResponseType, from: string, amount: string, toValidator: string, fromValidator: string, status: string, statusInfo: { __typename: 'BaseStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null } };

type GQLStakingResponseFragment_UndelegateResponse_Fragment = { __typename: 'UndelegateResponse', status: string, statusInfo: { __typename: 'UndelegateStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, WaitingUnbonding?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', timestamp: string, txHash: string } | null } | null } };

type GQLStakingResponseFragment_WithdrawResponse_Fragment = { __typename: 'WithdrawResponse', id: number, type: GQLResponseType, from: string, to: string, amount: string, nonce?: string | null, status: string, statusInfo: { __typename: 'WithdrawStatusInfo', TransactionSent?: { __typename: 'TransactionSentInfo', ethTx: { __typename: 'EthTx', txHash: string, timestamp: string, height: string } } | null, WaitingSync?: { __typename: 'WaitingSyncInfo', dateExpectedToComplete: string } | null, WaitingCommittingToL1?: { __typename: 'WaitingCommittingToL1gInfo', dateExpectedToComplete: string, sequencerTx: { __typename: 'SequencerTx', txHash: string, timestamp: string } } | null, ReadyToProcessWithdraw?: { __typename: 'ReadyToProcessWithdrawInfo', proof: string } | null, Skipped?: { __typename: 'SkippedInfo', message: string } | null, Finalized?: { __typename: 'FinalizedInfo', sequencerTx?: { __typename: 'SequencerTx', txHash: string, timestamp: string } | null, ethTx?: { __typename: 'EthTx', txHash: string, timestamp: string } | null } | null } };

export type GQLStakingResponseFragmentFragment = GQLStakingResponseFragment_ClaimRewardsResponse_Fragment | GQLStakingResponseFragment_DelegateResponse_Fragment | GQLStakingResponseFragment_ReDelegateResponse_Fragment | GQLStakingResponseFragment_UndelegateResponse_Fragment | GQLStakingResponseFragment_WithdrawResponse_Fragment;

export type GQLStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLStatisticsQuery = { __typename: 'Query', statistics: { __typename: 'StatisticsConnection', nodes?: { __typename: 'Statistics', totalFee24hrs?: string | null, totalTps?: Array<{ __typename: 'StatisticsDetails', date?: string | null, value?: string | null } | null> | null, averageTps?: Array<{ __typename: 'StatisticsDetails', date?: string | null, value?: string | null } | null> | null, maxTps?: Array<{ __typename: 'StatisticsDetails', date?: string | null, value?: string | null } | null> | null, totalGasUsed?: Array<{ __typename: 'StatisticsDetails', date?: string | null, value?: string | null } | null> | null, averageGasUsed?: Array<{ __typename: 'StatisticsDetails', date?: string | null, value?: string | null } | null> | null, maxGasUsed?: Array<{ __typename: 'StatisticsDetails', date?: string | null, value?: string | null } | null> | null, totalFee?: Array<{ __typename: 'StatisticsTotalFeeDetails', date?: string | null, value?: string | null, valueInUsd?: string | null } | null> | null } | null } };

export type GQLTpsQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLTpsQuery = { __typename: 'Query', tps: { __typename: 'TPSConnection', nodes: Array<{ __typename: 'TPS', start?: string | null, end?: string | null, txCount: string, totalGas: string }> } };

export type GQLTransactionDetailsQueryVariables = Exact<{
  id: Scalars['TransactionId']['input'];
}>;


export type GQLTransactionDetailsQuery = { __typename: 'Query', transaction?: { __typename: 'Transaction', id: string, blockHeight?: string | null, hasPredicate?: boolean | null, statusType?: string | null, title: string, maturity?: string | null, txPointer?: string | null, isScript: boolean, isCreate: boolean, isMint: boolean, witnesses?: Array<string> | null, receiptsRoot?: string | null, script?: string | null, scriptData?: string | null, bytecodeWitnessIndex?: string | null, salt?: string | null, storageSlots?: Array<string> | null, rawPayload: string, mintAmount?: string | null, mintAmountUsd: string, mintAssetId?: string | null, inputAssetIds?: Array<string> | null, inputContracts?: Array<string> | null, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null, gasUsed?: string | null } | null, groupedInputs: Array<{ __typename: 'GroupedInputCoin', type?: GQLGroupedInputType | null, totalAmount?: string | null, owner?: string | null, assetId?: string | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, utxoId: string } | { __typename: 'InputContract' } | { __typename: 'InputMessage' }> | null } | { __typename: 'GroupedInputContract', type?: GQLGroupedInputType | null, contractId?: string | null } | { __typename: 'GroupedInputMessage', type?: GQLGroupedInputType | null, sender?: string | null, data?: string | null, recipient?: string | null }>, groupedOutputs: Array<{ __typename: 'GroupedOutputChanged', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputCoin', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputContractCreated', type?: GQLGroupedOutputType | null, contractId?: string | null }>, operations?: Array<{ __typename: 'Operation', type?: GQLOperationType | null, receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null }> | null, receipts?: Array<{ __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null }> | null, time: { __typename: 'ParsedTime', fromNow?: string | null, full?: string | null, rawUnix?: string | null }, mintedAsset?: { __typename: 'Asset', assetId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, subId?: string | null } | null, policies?: { __typename: 'Policies', tip?: string | null, witnessLimit?: string | null, maturity?: string | null, maxFee?: string | null, ownerInputIndex?: string | null } | null, inputContract?: { __typename: 'InputContract', contractId?: string | null } | null, outputContract?: { __typename: 'ContractOutput', inputIndex: string } | null, status?: { __typename: 'FailureStatus', totalFee: string, totalGas: string, time: string, programState?: { __typename: 'ProgramState', data: string } | null } | { __typename: 'SqueezedOutStatus', reason: string } | { __typename: 'SubmittedStatus', time: string } | { __typename: 'SuccessStatus', time: string, block: { __typename: 'Block', id: string, header: { __typename: 'Header', id: string, height: string, daHeight: string, applicationHash: string, messageReceiptCount: string, time: string } }, programState?: { __typename: 'ProgramState', data: string } | null } | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, amountInUsd?: string | null, assetId: string, owner: string, predicate: string, predicateData: string, txPointer: string, utxoId: string, witnessIndex: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null } | { __typename: 'InputContract', utxoId: string, balanceRoot: string, txPointer: string, contractId?: string | null } | { __typename: 'InputMessage', sender: string, recipient: string, amount: string, nonce: string, data: string, predicate: string, predicateData: string }> | null, outputs: Array<{ __typename: 'ChangeOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null } | { __typename: 'CoinOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null } | { __typename: 'ContractCreated', contract: string } | { __typename: 'ContractOutput', inputIndex: string, balanceRoot: string } | { __typename: 'VariableOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null }> } | null };

export type GQLTransactionExistsQueryVariables = Exact<{
  id: Scalars['TransactionId']['input'];
}>;


export type GQLTransactionExistsQuery = { __typename: 'Query', transaction?: { __typename: 'Transaction', id: string } | null };

export type GQLTransactionsByBlockIdQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  blockId: Scalars['String']['input'];
}>;


export type GQLTransactionsByBlockIdQuery = { __typename: 'Query', transactionsByBlockId: { __typename: 'TransactionConnection', nodes: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null, full?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null } | null }>, pageInfo: { __typename: 'PageInfo', startCount?: number | null, endCount?: number | null, totalCount?: number | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type GQLTransactionsByOwnerQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  owner: Scalars['Address']['input'];
  ownerType?: InputMaybe<GQLOwnerType>;
}>;


export type GQLTransactionsByOwnerQuery = { __typename: 'Query', transactionsByOwner: { __typename: 'TransactionConnection', nodes: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null, full?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null } | null }>, pageInfo: { __typename: 'PageInfo', startCount?: number | null, endCount?: number | null, totalCount?: number | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

type GQLTransactionStatus_FailureStatus_Fragment = { __typename: 'FailureStatus', totalFee: string, totalGas: string, time: string, programState?: { __typename: 'ProgramState', data: string } | null };

type GQLTransactionStatus_SqueezedOutStatus_Fragment = { __typename: 'SqueezedOutStatus', reason: string };

type GQLTransactionStatus_SubmittedStatus_Fragment = { __typename: 'SubmittedStatus', time: string };

type GQLTransactionStatus_SuccessStatus_Fragment = { __typename: 'SuccessStatus', time: string, block: { __typename: 'Block', id: string, header: { __typename: 'Header', id: string, height: string, daHeight: string, applicationHash: string, messageReceiptCount: string, time: string } }, programState?: { __typename: 'ProgramState', data: string } | null };

export type GQLTransactionStatusFragment = GQLTransactionStatus_FailureStatus_Fragment | GQLTransactionStatus_SqueezedOutStatus_Fragment | GQLTransactionStatus_SubmittedStatus_Fragment | GQLTransactionStatus_SuccessStatus_Fragment;

type GQLTransactionInput_InputCoin_Fragment = { __typename: 'InputCoin', amount: string, amountInUsd?: string | null, assetId: string, owner: string, predicate: string, predicateData: string, txPointer: string, utxoId: string, witnessIndex: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null };

type GQLTransactionInput_InputContract_Fragment = { __typename: 'InputContract', utxoId: string, balanceRoot: string, txPointer: string, contractId?: string | null };

type GQLTransactionInput_InputMessage_Fragment = { __typename: 'InputMessage', sender: string, recipient: string, amount: string, nonce: string, data: string, predicate: string, predicateData: string };

export type GQLTransactionInputFragment = GQLTransactionInput_InputCoin_Fragment | GQLTransactionInput_InputContract_Fragment | GQLTransactionInput_InputMessage_Fragment;

type GQLTransactionOutput_ChangeOutput_Fragment = { __typename: 'ChangeOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null };

type GQLTransactionOutput_CoinOutput_Fragment = { __typename: 'CoinOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null };

type GQLTransactionOutput_ContractCreated_Fragment = { __typename: 'ContractCreated', contract: string };

type GQLTransactionOutput_ContractOutput_Fragment = { __typename: 'ContractOutput', inputIndex: string, balanceRoot: string };

type GQLTransactionOutput_VariableOutput_Fragment = { __typename: 'VariableOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null };

export type GQLTransactionOutputFragment = GQLTransactionOutput_ChangeOutput_Fragment | GQLTransactionOutput_CoinOutput_Fragment | GQLTransactionOutput_ContractCreated_Fragment | GQLTransactionOutput_ContractOutput_Fragment | GQLTransactionOutput_VariableOutput_Fragment;

export type GQLTransactionReceiptFragment = { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null };

export type GQLInnerReceiptItemFragment = { __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null };

export type GQLOperationReceiptItemFragment = { __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null };

export type GQLOperationItemFragment = { __typename: 'Operation', type?: GQLOperationType | null, receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null };

export type GQLTxDetailsGroupedInputCoinFragment = { __typename: 'GroupedInputCoin', type?: GQLGroupedInputType | null, totalAmount?: string | null, owner?: string | null, assetId?: string | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, utxoId: string } | { __typename: 'InputContract' } | { __typename: 'InputMessage' }> | null };

export type GQLTxDetailsGroupedInputMessageFragment = { __typename: 'GroupedInputMessage', type?: GQLGroupedInputType | null, sender?: string | null, data?: string | null, recipient?: string | null };

export type GQLTxDetailsGroupedInputContractFragment = { __typename: 'GroupedInputContract', type?: GQLGroupedInputType | null, contractId?: string | null };

export type GQLTxDetailsGroupedOutputCoinFragment = { __typename: 'GroupedOutputCoin', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null };

export type GQLTxDetailsGroupedOutputChangedFragment = { __typename: 'GroupedOutputChanged', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null };

export type GQLTxDetailsGroupedOutputContractCreatedFragment = { __typename: 'GroupedOutputContractCreated', type?: GQLGroupedOutputType | null, contractId?: string | null };

export type GQLTransactionItemFragment = { __typename: 'Transaction', id: string, blockHeight?: string | null, hasPredicate?: boolean | null, statusType?: string | null, title: string, maturity?: string | null, txPointer?: string | null, isScript: boolean, isCreate: boolean, isMint: boolean, witnesses?: Array<string> | null, receiptsRoot?: string | null, script?: string | null, scriptData?: string | null, bytecodeWitnessIndex?: string | null, salt?: string | null, storageSlots?: Array<string> | null, rawPayload: string, mintAmount?: string | null, mintAmountUsd: string, mintAssetId?: string | null, inputAssetIds?: Array<string> | null, inputContracts?: Array<string> | null, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, feeInUsd?: string | null, gasUsed?: string | null } | null, groupedInputs: Array<{ __typename: 'GroupedInputCoin', type?: GQLGroupedInputType | null, totalAmount?: string | null, owner?: string | null, assetId?: string | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, utxoId: string } | { __typename: 'InputContract' } | { __typename: 'InputMessage' }> | null } | { __typename: 'GroupedInputContract', type?: GQLGroupedInputType | null, contractId?: string | null } | { __typename: 'GroupedInputMessage', type?: GQLGroupedInputType | null, sender?: string | null, data?: string | null, recipient?: string | null }>, groupedOutputs: Array<{ __typename: 'GroupedOutputChanged', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputCoin', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputContractCreated', type?: GQLGroupedOutputType | null, contractId?: string | null }>, operations?: Array<{ __typename: 'Operation', type?: GQLOperationType | null, receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null } | null }> | null }> | null, receipts?: Array<{ __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, decimals?: string | null, suspicious?: boolean | null }> | null, time: { __typename: 'ParsedTime', fromNow?: string | null, full?: string | null, rawUnix?: string | null }, mintedAsset?: { __typename: 'Asset', assetId?: string | null, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, subId?: string | null } | null, policies?: { __typename: 'Policies', tip?: string | null, witnessLimit?: string | null, maturity?: string | null, maxFee?: string | null, ownerInputIndex?: string | null } | null, inputContract?: { __typename: 'InputContract', contractId?: string | null } | null, outputContract?: { __typename: 'ContractOutput', inputIndex: string } | null, status?: { __typename: 'FailureStatus', totalFee: string, totalGas: string, time: string, programState?: { __typename: 'ProgramState', data: string } | null } | { __typename: 'SqueezedOutStatus', reason: string } | { __typename: 'SubmittedStatus', time: string } | { __typename: 'SuccessStatus', time: string, block: { __typename: 'Block', id: string, header: { __typename: 'Header', id: string, height: string, daHeight: string, applicationHash: string, messageReceiptCount: string, time: string } }, programState?: { __typename: 'ProgramState', data: string } | null } | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, amountInUsd?: string | null, assetId: string, owner: string, predicate: string, predicateData: string, txPointer: string, utxoId: string, witnessIndex: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null } | { __typename: 'InputContract', utxoId: string, balanceRoot: string, txPointer: string, contractId?: string | null } | { __typename: 'InputMessage', sender: string, recipient: string, amount: string, nonce: string, data: string, predicate: string, predicateData: string }> | null, outputs: Array<{ __typename: 'ChangeOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null } | { __typename: 'CoinOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null } | { __typename: 'ContractCreated', contract: string } | { __typename: 'ContractOutput', inputIndex: string, balanceRoot: string } | { __typename: 'VariableOutput', to: string, amount: string, amountInUsd?: string | null, assetId: string, name?: string | null, symbol?: string | null, icon?: string | null, contractId?: string | null, decimals?: string | null, suspicious?: boolean | null }> };

export const BalanceItemFragmentDoc = gql`
    fragment BalanceItem on Balance {
  amount
  assetId
  owner
  name
  symbol
  icon
  decimals
  totalSupply
  collection
  suspicious
  contractId
  metadata
  amountInUsd
  utxos {
    amount
    blockCreated
    txCreatedIdx
    utxoId
  }
}
    `;
export const RecentTransactionFragmentDoc = gql`
    fragment RecentTransaction on Transaction {
  _id
  id
  title
  statusType
  time {
    fromNow
    rawUnix
    full
  }
  gasCosts {
    fee
    feeInUsd
  }
}
    `;
export const BlockFragmentDoc = gql`
    fragment Block on Block {
  id
  height
  producer
  consensus {
    __typename
    ... on PoAConsensus {
      signature
    }
  }
  header {
    transactionsCount
  }
  time {
    full
    fromNow
    rawUnix
  }
  transactions {
    ...RecentTransaction
  }
}
    ${RecentTransactionFragmentDoc}`;
export const BlockItemFragmentDoc = gql`
    fragment BlockItem on Block {
  time {
    fromNow
    full
    rawTai64
    rawUnix
  }
  totalGasUsed
  totalFee
  producer
  id
  consensus {
    __typename
    ... on PoAConsensus {
      signature
    }
  }
  header {
    id
    height
    time
    transactionsCount
  }
  transactions {
    isMint
    mintAmount
  }
}
    `;
export const ContractBalanceNodeFragmentDoc = gql`
    fragment ContractBalanceNode on ContractBalance {
  amount
  amountInUsd
  assetId
  name
  symbol
  decimals
  suspicious
  icon
}
    `;
export const ContractBalanceConnectionNodeFragmentDoc = gql`
    fragment ContractBalanceConnectionNode on ContractBalanceConnection {
  edges {
    cursor
    node {
      ...ContractBalanceNode
    }
  }
  pageInfo {
    hasNextPage
    hasPreviousPage
    endCursor
    startCursor
  }
}
    ${ContractBalanceNodeFragmentDoc}`;
export const BaseStatusInfoFragmentFragmentDoc = gql`
    fragment BaseStatusInfoFragment on BaseStatusInfo {
  TransactionSent {
    ethTx {
      txHash
      timestamp
      height
    }
  }
  WaitingSync {
    dateExpectedToComplete
  }
  Finalized {
    sequencerTx {
      txHash
      timestamp
    }
    ethTx {
      txHash
      timestamp
    }
  }
  Skipped {
    message
  }
}
    `;
export const StakingResponseFragmentFragmentDoc = gql`
    fragment StakingResponseFragment on StakingEventResponse {
  __typename
  ... on WithdrawResponse {
    id
    type
    from
    to
    amount
    nonce
    status
    statusInfo {
      TransactionSent {
        ethTx {
          txHash
          timestamp
          height
        }
      }
      WaitingSync {
        dateExpectedToComplete
      }
      WaitingCommittingToL1 {
        sequencerTx {
          txHash
          timestamp
        }
        dateExpectedToComplete
      }
      ReadyToProcessWithdraw {
        proof
      }
      Skipped {
        message
      }
      Finalized {
        sequencerTx {
          txHash
          timestamp
        }
        ethTx {
          txHash
          timestamp
        }
      }
    }
  }
  ... on UndelegateResponse {
    status
    statusInfo {
      TransactionSent {
        ethTx {
          txHash
          timestamp
          height
        }
      }
      WaitingSync {
        dateExpectedToComplete
      }
      WaitingUnbonding {
        dateExpectedToComplete
      }
      Finalized {
        sequencerTx {
          timestamp
          txHash
        }
      }
    }
  }
  ... on DelegateResponse {
    id
    type
    from
    amount
    validator
    status
    statusInfo {
      ...BaseStatusInfoFragment
    }
  }
  ... on ReDelegateResponse {
    id
    type
    from
    amount
    toValidator
    fromValidator
    status
    statusInfo {
      ...BaseStatusInfoFragment
    }
  }
  ... on ClaimRewardsResponse {
    id
    type
    from
    validator
    status
    statusInfo {
      ...BaseStatusInfoFragment
    }
  }
}
    ${BaseStatusInfoFragmentFragmentDoc}`;
export const TxDetailsGroupedInputContractFragmentDoc = gql`
    fragment TxDetailsGroupedInputContract on GroupedInputContract {
  type
  contractId
}
    `;
export const TxDetailsGroupedInputCoinFragmentDoc = gql`
    fragment TxDetailsGroupedInputCoin on GroupedInputCoin {
  type
  totalAmount
  owner
  assetId
  inputs {
    ... on InputCoin {
      amount
      utxoId
    }
  }
}
    `;
export const TxDetailsGroupedInputMessageFragmentDoc = gql`
    fragment TxDetailsGroupedInputMessage on GroupedInputMessage {
  type
  sender
  data
  recipient
}
    `;
export const TxDetailsGroupedOutputCoinFragmentDoc = gql`
    fragment TxDetailsGroupedOutputCoin on GroupedOutputCoin {
  type
  assetId
  totalAmount
  to
  outputs {
    __typename
  }
}
    `;
export const TxDetailsGroupedOutputChangedFragmentDoc = gql`
    fragment TxDetailsGroupedOutputChanged on GroupedOutputChanged {
  type
  assetId
  totalAmount
  to
  outputs {
    __typename
  }
}
    `;
export const TxDetailsGroupedOutputContractCreatedFragmentDoc = gql`
    fragment TxDetailsGroupedOutputContractCreated on GroupedOutputContractCreated {
  type
  contractId
}
    `;
export const TransactionReceiptFragmentDoc = gql`
    fragment TransactionReceipt on Receipt {
  __typename
  id
  to
  pc
  is
  toAddress
  amount
  assetId
  gas
  param1
  param2
  val
  ptr
  digest
  reason
  ra
  rb
  rc
  rd
  len
  receiptType
  result
  gasUsed
  data
  sender
  recipient
  nonce
  contractId
  subId
  name
  symbol
  icon
  decimals
  suspicious
}
    `;
export const InnerReceiptItemFragmentDoc = gql`
    fragment InnerReceiptItem on OperationReceipt {
  item {
    ...TransactionReceipt
  }
}
    ${TransactionReceiptFragmentDoc}`;
export const OperationReceiptItemFragmentDoc = gql`
    fragment OperationReceiptItem on OperationReceipt {
  ...InnerReceiptItem
  receipts {
    ...InnerReceiptItem
    receipts {
      ...InnerReceiptItem
      receipts {
        ...InnerReceiptItem
      }
    }
  }
}
    ${InnerReceiptItemFragmentDoc}`;
export const OperationItemFragmentDoc = gql`
    fragment OperationItem on Operation {
  __typename
  type
  receipts {
    ...OperationReceiptItem
    receipts {
      ...OperationReceiptItem
      receipts {
        ...OperationReceiptItem
        receipts {
          ...OperationReceiptItem
          receipts {
            ...OperationReceiptItem
          }
        }
      }
    }
  }
}
    ${OperationReceiptItemFragmentDoc}`;
export const TransactionStatusFragmentDoc = gql`
    fragment TransactionStatus on TransactionStatus {
  __typename
  ... on SqueezedOutStatus {
    reason
  }
  ... on SuccessStatus {
    time
    block {
      id
      header {
        id
        height
        daHeight
        applicationHash
        messageReceiptCount
        time
      }
    }
    programState {
      data
    }
  }
  ... on FailureStatus {
    totalFee
    totalGas
    time
    programState {
      data
    }
  }
  ... on SubmittedStatus {
    time
  }
}
    `;
export const TransactionInputFragmentDoc = gql`
    fragment TransactionInput on Input {
  __typename
  ... on InputCoin {
    amount
    amountInUsd
    assetId
    owner
    predicate
    predicateData
    txPointer
    utxoId
    witnessIndex
    name
    symbol
    icon
    contractId
    decimals
    suspicious
  }
  ... on InputContract {
    utxoId
    balanceRoot
    txPointer
    contractId
  }
  ... on InputMessage {
    sender
    recipient
    amount
    nonce
    data
    predicate
    predicateData
  }
}
    `;
export const TransactionOutputFragmentDoc = gql`
    fragment TransactionOutput on Output {
  __typename
  ... on CoinOutput {
    to
    amount
    amountInUsd
    assetId
    name
    symbol
    icon
    contractId
    decimals
    suspicious
  }
  ... on ContractOutput {
    inputIndex
    balanceRoot
  }
  ... on ChangeOutput {
    to
    amount
    amountInUsd
    assetId
    name
    symbol
    icon
    contractId
    decimals
    suspicious
  }
  ... on VariableOutput {
    to
    amount
    amountInUsd
    assetId
    name
    symbol
    icon
    contractId
    decimals
    suspicious
  }
  ... on ContractCreated {
    contract
  }
}
    `;
export const TransactionItemFragmentDoc = gql`
    fragment TransactionItem on Transaction {
  id
  blockHeight
  gasCosts {
    fee
    feeInUsd
    gasUsed
  }
  groupedInputs {
    __typename
    ...TxDetailsGroupedInputContract
    ...TxDetailsGroupedInputCoin
    ...TxDetailsGroupedInputMessage
  }
  groupedOutputs {
    __typename
    ...TxDetailsGroupedOutputCoin
    ...TxDetailsGroupedOutputChanged
    ...TxDetailsGroupedOutputContractCreated
  }
  operations {
    ...OperationItem
  }
  receipts {
    ...TransactionReceipt
  }
  hasPredicate
  statusType
  title
  time {
    fromNow
    full
    rawUnix
  }
  __typename
  maturity
  txPointer
  isScript
  isCreate
  isMint
  mintedAsset {
    assetId
    name
    symbol
    icon
    contractId
    subId
  }
  policies {
    tip
    witnessLimit
    maturity
    maxFee
    ownerInputIndex
  }
  witnesses
  receiptsRoot
  script
  scriptData
  bytecodeWitnessIndex
  salt
  storageSlots
  rawPayload
  mintAmount
  mintAmountUsd
  mintAssetId
  inputContract {
    contractId
  }
  outputContract {
    inputIndex
  }
  status {
    ...TransactionStatus
  }
  inputAssetIds
  inputContracts
  inputs {
    ...TransactionInput
  }
  outputs {
    ...TransactionOutput
  }
}
    ${TxDetailsGroupedInputContractFragmentDoc}
${TxDetailsGroupedInputCoinFragmentDoc}
${TxDetailsGroupedInputMessageFragmentDoc}
${TxDetailsGroupedOutputCoinFragmentDoc}
${TxDetailsGroupedOutputChangedFragmentDoc}
${TxDetailsGroupedOutputContractCreatedFragmentDoc}
${OperationItemFragmentDoc}
${TransactionReceiptFragmentDoc}
${TransactionStatusFragmentDoc}
${TransactionInputFragmentDoc}
${TransactionOutputFragmentDoc}`;
export const AssetDocument = gql`
    query asset($assetId: String!) {
  asset(assetId: $assetId) {
    assetId
    contractId
    subId
    name
    symbol
    decimals
    icon
    verified
    suspicious
  }
}
    `;
export const AssetsByContractDocument = gql`
    query assetsByContract($contractId: String!, $after: String, $before: String, $first: Int, $last: Int) {
  assetsByContract(
    contractId: $contractId
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    nodes {
      assetId
      contractId
      subId
      name
      decimals
      suspicious
      rate
      symbol
      icon
      verified
    }
    pageInfo {
      startCount
      endCount
      totalCount
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;
export const BalanceByBlockHeightDocument = gql`
    query balanceByBlockHeight($assetId: AssetId!, $accountHash: Address!, $blockHeight: Int!) {
  balanceByBlockHeight(
    assetId: $assetId
    accountHash: $accountHash
    blockHeight: $blockHeight
  ) {
    balance
    balanceInUsd
    assetId
    accountHash
    blockHeight
  }
}
    `;
export const BalancesDocument = gql`
    query balances($after: String, $before: String, $filter: BalanceFilterInput!, $first: Int, $last: Int) {
  balances(
    after: $after
    before: $before
    filter: $filter
    first: $first
    last: $last
  ) {
    nodes {
      ...BalanceItem
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    ${BalanceItemFragmentDoc}`;
export const BlockDocument = gql`
    query block($height: U32, $id: BlockId) {
  block(height: $height, id: $id) {
    ...Block
  }
}
    ${BlockFragmentDoc}`;
export const BlocksDocument = gql`
    query blocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        ...BlockItem
      }
    }
  }
}
    ${BlockItemFragmentDoc}`;
export const ChainDocument = gql`
    query chain {
  chain {
    consensusParameters {
      baseAssetId
      blockGasLimit
      chainId
      contractParams {
        contractMaxSize
        maxStorageSlots
      }
      feeParams {
        gasPerByte
        gasPriceFactor
      }
      gasCosts {
        add
        addi
        aloc
        and
        andi
        bal
        bhei
        bhsh
        burn
        call {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        cb
        ccp {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        cfei
        cfsi
        contractRoot {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        croo {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        csiz {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        div
        divi
        eck1
        ecr1
        ed19
        eq
        exp
        expi
        flag
        gm
        gt
        gtf
        ji
        jmp
        jmpb
        jmpf
        jne
        jneb
        jnef
        jnei
        jnzb
        jnzf
        jnzi
        k256 {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        lb
        ldc {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        log
        logd {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        lt
        lw
        mcl {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        mcli {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        mcp {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        mcpi {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        meq {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        mint
        mldv
        mlog
        modOp
        modi
        moveOp
        movi
        mroo
        mul
        muli
        newStoragePerByte
        noop
        not
        or
        ori
        poph
        popl
        pshh
        pshl
        ret
        retd {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        rvrt
        s256 {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        sb
        scwq {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        sll
        slli
        smo {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        srl
        srli
        srw
        srwq {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        stateRoot {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        sub
        subi
        sw
        sww
        swwq {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        time
        tr
        tro
        vmInitialization {
          __typename
          ... on HeavyOperation {
            base
            gasPerUnit
          }
          ... on LightOperation {
            base
            unitsPerGas
          }
        }
        wdam
        wdcm
        wddv
        wdmd
        wdml
        wdmm
        wdop
        wqam
        wqcm
        wqdv
        wqmd
        wqml
        wqmm
        wqop
        xor
        xori
      }
      predicateParams {
        maxGasPerPredicate
        maxMessageDataLength
        maxPredicateDataLength
        maxPredicateLength
      }
      privilegedAddress
      scriptParams {
        maxScriptDataLength
        maxScriptLength
      }
      txParams {
        maxBytecodeSubsections
        maxGasPerTx
        maxInputs
        maxOutputs
        maxSize
        maxWitnesses
      }
    }
    daHeight
    gasCosts {
      add
      addi
      aloc
      and
      andi
      bal
      bhei
      bhsh
      burn
      call {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      cb
      ccp {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      cfei
      cfsi
      contractRoot {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      croo {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      csiz {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      div
      divi
      eck1
      ecr1
      ed19
      eq
      exp
      expi
      flag
      gm
      gt
      gtf
      ji
      jmp
      jmpb
      jmpf
      jne
      jneb
      jnef
      jnei
      jnzb
      jnzf
      jnzi
      k256 {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      lb
      ldc {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      log
      logd {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      lt
      lw
      mcl {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      mcli {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      mcp {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      mcpi {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      meq {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      mint
      mldv
      mlog
      modOp
      modi
      moveOp
      movi
      mroo
      mul
      muli
      newStoragePerByte
      noop
      not
      or
      ori
      poph
      popl
      pshh
      pshl
      ret
      retd {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      rvrt
      s256 {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      sb
      scwq {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      sll
      slli
      smo {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      srl
      srli
      srw
      srwq {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      stateRoot {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      sub
      subi
      sw
      sww
      swwq {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      time
      tr
      tro
      vmInitialization {
        __typename
        ... on HeavyOperation {
          base
          gasPerUnit
        }
        ... on LightOperation {
          base
          unitsPerGas
        }
      }
      wdam
      wdcm
      wddv
      wdmd
      wdml
      wdmm
      wdop
      wqam
      wqcm
      wqdv
      wqmd
      wqml
      wqmm
      wqop
      xor
      xori
    }
    name
  }
}
    `;
export const CoinsDocument = gql`
    query coins($after: String, $before: String, $filter: CoinFilterInput!, $first: Int, $last: Int) {
  coins(
    after: $after
    before: $before
    filter: $filter
    first: $first
    last: $last
  ) {
    edges {
      cursor
      node {
        amount
        assetId
        blockCreated
        owner
        txCreatedIdx
        utxoId
      }
    }
    nodes {
      amount
      assetId
      blockCreated
      owner
      txCreatedIdx
      utxoId
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `;
export const ContractDocument = gql`
    query contract($id: ContractId!) {
  contract(id: $id) {
    bytecode
  }
}
    `;
export const ContractBalancesDocument = gql`
    query contractBalances($after: String, $before: String, $filter: ContractBalanceFilterInput!, $first: Int, $last: Int) {
  contractBalances(
    after: $after
    before: $before
    filter: $filter
    first: $first
    last: $last
  ) {
    ...ContractBalanceConnectionNode
  }
}
    ${ContractBalanceConnectionNodeFragmentDoc}`;
export const GetBlocksDashboardDocument = gql`
    query getBlocksDashboard {
  getBlocksDashboard {
    nodes {
      timestamp
      gasUsed
      gasUsedInUsd
      totalFee
      totalFeeInUsd
      blockNo
      producer
      blockHash
    }
  }
}
    `;
export const PredicateDocument = gql`
    query predicate($address: String!) {
  predicate(address: $address) {
    address
    bytecode
  }
}
    `;
export const RecentTransactionsDocument = gql`
    query recentTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    nodes {
      ...RecentTransaction
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    ${RecentTransactionFragmentDoc}`;
export const SearchDocument = gql`
    query search($query: String!) {
  search(query: $query) {
    account {
      address
      transactions {
        id
      }
    }
    block {
      height
      id
    }
    contract {
      id
    }
    transaction {
      id
    }
    predicate {
      address
      bytecode
    }
  }
}
    `;
export const StakingApyDocument = gql`
    query stakingAPY {
  stakingAPY {
    amount
  }
}
    `;
export const StakingEventDocument = gql`
    query stakingEvent($eventId: Int!) {
  stakingEvent(eventId: $eventId) {
    ...StakingResponseFragment
  }
}
    ${StakingResponseFragmentFragmentDoc}`;
export const StakingEventsDocument = gql`
    query StakingEvents($address: String!, $after: String, $before: String, $first: Int, $last: Int) {
  stakingEvents(
    address: $address
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    nodes {
      ...StakingResponseFragment
    }
    pageInfo {
      endCount
      startCursor
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
    ${StakingResponseFragmentFragmentDoc}`;
export const StatisticsDocument = gql`
    query statistics {
  statistics {
    nodes {
      totalTps {
        date
        value
      }
      averageTps {
        date
        value
      }
      maxTps {
        date
        value
      }
      totalGasUsed {
        date
        value
      }
      averageGasUsed {
        date
        value
      }
      maxGasUsed {
        date
        value
      }
      totalFee {
        date
        value
        valueInUsd
      }
      totalFee24hrs
    }
  }
}
    `;
export const TpsDocument = gql`
    query tps {
  tps {
    nodes {
      start
      end
      txCount
      totalGas
    }
  }
}
    `;
export const TransactionDetailsDocument = gql`
    query transactionDetails($id: TransactionId!) {
  transaction(id: $id) {
    ...TransactionItem
  }
}
    ${TransactionItemFragmentDoc}`;
export const TransactionExistsDocument = gql`
    query transactionExists($id: TransactionId!) {
  transaction(id: $id) {
    id
  }
}
    `;
export const TransactionsByBlockIdDocument = gql`
    query transactionsByBlockId($after: String, $before: String, $first: Int, $last: Int, $blockId: String!) {
  transactionsByBlockId(
    after: $after
    before: $before
    first: $first
    last: $last
    blockId: $blockId
  ) {
    nodes {
      ...RecentTransaction
    }
    pageInfo {
      startCount
      endCount
      totalCount
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    ${RecentTransactionFragmentDoc}`;
export const TransactionsByOwnerDocument = gql`
    query transactionsByOwner($after: String, $before: String, $first: Int, $last: Int, $owner: Address!, $ownerType: OwnerType) {
  transactionsByOwner(
    after: $after
    before: $before
    first: $first
    last: $last
    owner: $owner
    ownerType: $ownerType
  ) {
    nodes {
      ...RecentTransaction
    }
    pageInfo {
      startCount
      endCount
      totalCount
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    ${RecentTransactionFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const AssetDocumentString = print(AssetDocument);
const AssetsByContractDocumentString = print(AssetsByContractDocument);
const BalanceByBlockHeightDocumentString = print(BalanceByBlockHeightDocument);
const BalancesDocumentString = print(BalancesDocument);
const BlockDocumentString = print(BlockDocument);
const BlocksDocumentString = print(BlocksDocument);
const ChainDocumentString = print(ChainDocument);
const CoinsDocumentString = print(CoinsDocument);
const ContractDocumentString = print(ContractDocument);
const ContractBalancesDocumentString = print(ContractBalancesDocument);
const GetBlocksDashboardDocumentString = print(GetBlocksDashboardDocument);
const PredicateDocumentString = print(PredicateDocument);
const RecentTransactionsDocumentString = print(RecentTransactionsDocument);
const SearchDocumentString = print(SearchDocument);
const StakingApyDocumentString = print(StakingApyDocument);
const StakingEventDocumentString = print(StakingEventDocument);
const StakingEventsDocumentString = print(StakingEventsDocument);
const StatisticsDocumentString = print(StatisticsDocument);
const TpsDocumentString = print(TpsDocument);
const TransactionDetailsDocumentString = print(TransactionDetailsDocument);
const TransactionExistsDocumentString = print(TransactionExistsDocument);
const TransactionsByBlockIdDocumentString = print(TransactionsByBlockIdDocument);
const TransactionsByOwnerDocumentString = print(TransactionsByOwnerDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    asset(variables: GQLAssetQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLAssetQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLAssetQuery>(AssetDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'asset', 'query', variables);
    },
    assetsByContract(variables: GQLAssetsByContractQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLAssetsByContractQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLAssetsByContractQuery>(AssetsByContractDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'assetsByContract', 'query', variables);
    },
    balanceByBlockHeight(variables: GQLBalanceByBlockHeightQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLBalanceByBlockHeightQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLBalanceByBlockHeightQuery>(BalanceByBlockHeightDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'balanceByBlockHeight', 'query', variables);
    },
    balances(variables: GQLBalancesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLBalancesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLBalancesQuery>(BalancesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'balances', 'query', variables);
    },
    block(variables?: GQLBlockQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLBlockQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLBlockQuery>(BlockDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'block', 'query', variables);
    },
    blocks(variables?: GQLBlocksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLBlocksQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLBlocksQuery>(BlocksDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'blocks', 'query', variables);
    },
    chain(variables?: GQLChainQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLChainQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLChainQuery>(ChainDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'chain', 'query', variables);
    },
    coins(variables: GQLCoinsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLCoinsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLCoinsQuery>(CoinsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'coins', 'query', variables);
    },
    contract(variables: GQLContractQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLContractQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLContractQuery>(ContractDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'contract', 'query', variables);
    },
    contractBalances(variables: GQLContractBalancesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLContractBalancesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLContractBalancesQuery>(ContractBalancesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'contractBalances', 'query', variables);
    },
    getBlocksDashboard(variables?: GQLGetBlocksDashboardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLGetBlocksDashboardQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLGetBlocksDashboardQuery>(GetBlocksDashboardDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlocksDashboard', 'query', variables);
    },
    predicate(variables: GQLPredicateQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLPredicateQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLPredicateQuery>(PredicateDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'predicate', 'query', variables);
    },
    recentTransactions(variables?: GQLRecentTransactionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLRecentTransactionsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLRecentTransactionsQuery>(RecentTransactionsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'recentTransactions', 'query', variables);
    },
    search(variables: GQLSearchQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLSearchQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLSearchQuery>(SearchDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'search', 'query', variables);
    },
    stakingAPY(variables?: GQLStakingApyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLStakingApyQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLStakingApyQuery>(StakingApyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stakingAPY', 'query', variables);
    },
    stakingEvent(variables: GQLStakingEventQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLStakingEventQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLStakingEventQuery>(StakingEventDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stakingEvent', 'query', variables);
    },
    StakingEvents(variables: GQLStakingEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLStakingEventsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLStakingEventsQuery>(StakingEventsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakingEvents', 'query', variables);
    },
    statistics(variables?: GQLStatisticsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLStatisticsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLStatisticsQuery>(StatisticsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'statistics', 'query', variables);
    },
    tps(variables?: GQLTpsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLTpsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLTpsQuery>(TpsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tps', 'query', variables);
    },
    transactionDetails(variables: GQLTransactionDetailsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLTransactionDetailsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLTransactionDetailsQuery>(TransactionDetailsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactionDetails', 'query', variables);
    },
    transactionExists(variables: GQLTransactionExistsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLTransactionExistsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLTransactionExistsQuery>(TransactionExistsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactionExists', 'query', variables);
    },
    transactionsByBlockId(variables: GQLTransactionsByBlockIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLTransactionsByBlockIdQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLTransactionsByBlockIdQuery>(TransactionsByBlockIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactionsByBlockId', 'query', variables);
    },
    transactionsByOwner(variables: GQLTransactionsByOwnerQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLTransactionsByOwnerQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLTransactionsByOwnerQuery>(TransactionsByOwnerDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactionsByOwner', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;