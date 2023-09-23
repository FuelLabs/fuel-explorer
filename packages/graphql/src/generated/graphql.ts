import type { GraphQLClient } from 'graphql-request';
import type { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Address: { input: any; output: any; }
  AssetId: { input: any; output: any; }
  BlockId: { input: any; output: any; }
  Bytes32: { input: any; output: any; }
  ContractId: { input: any; output: any; }
  HexString: { input: any; output: any; }
  MessageId: { input: any; output: any; }
  Salt: { input: any; output: any; }
  Signature: { input: any; output: any; }
  Tai64Timestamp: { input: any; output: any; }
  TransactionId: { input: any; output: any; }
  TxPointer: { input: any; output: any; }
  U64: { input: any; output: any; }
  UtxoId: { input: any; output: any; }
};

export type Account = {
  __typename: 'Account';
  address: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Balance = {
  __typename: 'Balance';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  owner: Scalars['Address']['output'];
};

export type BalanceConnection = {
  __typename: 'BalanceConnection';
  /** A list of edges. */
  edges: Array<BalanceEdge>;
  /** A list of nodes. */
  nodes: Array<Balance>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BalanceEdge = {
  __typename: 'BalanceEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Balance;
};

export type BalanceFilterInput = {
  /** Filter coins based on the `owner` field */
  owner: Scalars['Address']['input'];
};

export type Block = {
  __typename: 'Block';
  consensus: Consensus;
  header: Header;
  id: Scalars['BlockId']['output'];
  transactions: Array<Transaction>;
};

export type BlockConnection = {
  __typename: 'BlockConnection';
  /** A list of edges. */
  edges: Array<BlockEdge>;
  /** A list of nodes. */
  nodes: Array<Block>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BlockEdge = {
  __typename: 'BlockEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Block;
};

export type ChainInfo = {
  __typename: 'ChainInfo';
  baseChainHeight: Scalars['U64']['output'];
  consensusParameters: ConsensusParameters;
  latestBlock: Block;
  name: Scalars['String']['output'];
  peerCount: Scalars['Int']['output'];
};

export type ChangeOutput = {
  __typename: 'ChangeOutput';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  to: Scalars['Address']['output'];
};

export type Coin = {
  __typename: 'Coin';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  blockCreated: Scalars['U64']['output'];
  maturity: Scalars['U64']['output'];
  owner: Scalars['Address']['output'];
  status: CoinStatus;
  utxoId: Scalars['UtxoId']['output'];
};

export type CoinConnection = {
  __typename: 'CoinConnection';
  /** A list of edges. */
  edges: Array<CoinEdge>;
  /** A list of nodes. */
  nodes: Array<Coin>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CoinEdge = {
  __typename: 'CoinEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Coin;
};

export type CoinFilterInput = {
  /** Returns coins only with `asset_id`. */
  assetId?: InputMaybe<Scalars['AssetId']['input']>;
  /** Returns coins owned by the `owner`. */
  owner: Scalars['Address']['input'];
};

export type CoinOutput = {
  __typename: 'CoinOutput';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  to: Scalars['Address']['output'];
};

export enum CoinStatus {
  Spent = 'SPENT',
  Unspent = 'UNSPENT'
}

export type Consensus = Genesis | PoAConsensus;

export type ConsensusParameters = {
  __typename: 'ConsensusParameters';
  contractMaxSize: Scalars['U64']['output'];
  gasPerByte: Scalars['U64']['output'];
  gasPriceFactor: Scalars['U64']['output'];
  maxGasPerTx: Scalars['U64']['output'];
  maxInputs: Scalars['U64']['output'];
  maxMessageDataLength: Scalars['U64']['output'];
  maxOutputs: Scalars['U64']['output'];
  maxPredicateDataLength: Scalars['U64']['output'];
  maxPredicateLength: Scalars['U64']['output'];
  maxScriptDataLength: Scalars['U64']['output'];
  maxScriptLength: Scalars['U64']['output'];
  maxStorageSlots: Scalars['U64']['output'];
  maxWitnesses: Scalars['U64']['output'];
};

export type Contract = {
  __typename: 'Contract';
  bytecode: Scalars['HexString']['output'];
  id: Scalars['ContractId']['output'];
  salt: Scalars['Salt']['output'];
};

export type ContractBalance = {
  __typename: 'ContractBalance';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  contract: Scalars['ContractId']['output'];
};

export type ContractBalanceConnection = {
  __typename: 'ContractBalanceConnection';
  /** A list of edges. */
  edges: Array<ContractBalanceEdge>;
  /** A list of nodes. */
  nodes: Array<ContractBalance>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContractBalanceEdge = {
  __typename: 'ContractBalanceEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: ContractBalance;
};

export type ContractBalanceFilterInput = {
  /** Filter assets based on the `contractId` field */
  contract: Scalars['ContractId']['input'];
};

export type ContractCreated = {
  __typename: 'ContractCreated';
  contract: Contract;
  stateRoot: Scalars['Bytes32']['output'];
};

export type ContractOutput = {
  __typename: 'ContractOutput';
  balanceRoot: Scalars['Bytes32']['output'];
  inputIndex: Scalars['Int']['output'];
  stateRoot: Scalars['Bytes32']['output'];
};

export type ExcludeInput = {
  /** Messages to exclude from the selection. */
  messages: Array<Scalars['MessageId']['input']>;
  /** Utxos to exclude from the selection. */
  utxos: Array<Scalars['UtxoId']['input']>;
};

export type FailureStatus = {
  __typename: 'FailureStatus';
  block: Block;
  programState?: Maybe<ProgramState>;
  reason: Scalars['String']['output'];
  time: Scalars['Tai64Timestamp']['output'];
};

export type Genesis = {
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
};

export type Header = {
  __typename: 'Header';
  /** Hash of the application header. */
  applicationHash: Scalars['Bytes32']['output'];
  /** The layer 1 height of messages and events to include since the last layer 1 block number. */
  daHeight: Scalars['U64']['output'];
  /** Fuel block height. */
  height: Scalars['U64']['output'];
  /** Hash of the header */
  id: Scalars['BlockId']['output'];
  /** Number of output messages in this block. */
  outputMessagesCount: Scalars['U64']['output'];
  /** Merkle root of messages in this block. */
  outputMessagesRoot: Scalars['Bytes32']['output'];
  /** Merkle root of all previous block header hashes. */
  prevRoot: Scalars['Bytes32']['output'];
  /** The block producer time. */
  time: Scalars['Tai64Timestamp']['output'];
  /** Number of transactions in this block. */
  transactionsCount: Scalars['U64']['output'];
  /** Merkle root of transactions. */
  transactionsRoot: Scalars['Bytes32']['output'];
};

export type Input = InputCoin | InputContract | InputMessage;

export type InputCoin = {
  __typename: 'InputCoin';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  maturity: Scalars['U64']['output'];
  owner: Scalars['Address']['output'];
  predicate: Scalars['HexString']['output'];
  predicateData: Scalars['HexString']['output'];
  txPointer: Scalars['TxPointer']['output'];
  utxoId: Scalars['UtxoId']['output'];
  witnessIndex: Scalars['Int']['output'];
};

export type InputContract = {
  __typename: 'InputContract';
  balanceRoot: Scalars['Bytes32']['output'];
  contract: Contract;
  stateRoot: Scalars['Bytes32']['output'];
  txPointer: Scalars['TxPointer']['output'];
  utxoId: Scalars['UtxoId']['output'];
};

export type InputMessage = {
  __typename: 'InputMessage';
  amount: Scalars['U64']['output'];
  data: Scalars['HexString']['output'];
  messageId: Scalars['MessageId']['output'];
  nonce: Scalars['U64']['output'];
  predicate: Scalars['HexString']['output'];
  predicateData: Scalars['HexString']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
  witnessIndex: Scalars['Int']['output'];
};

export type Message = {
  __typename: 'Message';
  amount: Scalars['U64']['output'];
  daHeight: Scalars['U64']['output'];
  data: Scalars['HexString']['output'];
  messageId: Scalars['MessageId']['output'];
  nonce: Scalars['U64']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
  status: MessageStatus;
};

export type MessageConnection = {
  __typename: 'MessageConnection';
  /** A list of edges. */
  edges: Array<MessageEdge>;
  /** A list of nodes. */
  nodes: Array<Message>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MessageEdge = {
  __typename: 'MessageEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Message;
};

export type MessageOutput = {
  __typename: 'MessageOutput';
  amount: Scalars['U64']['output'];
  recipient: Scalars['Address']['output'];
};

export type MessageProof = {
  __typename: 'MessageProof';
  amount: Scalars['U64']['output'];
  data: Scalars['HexString']['output'];
  header: Header;
  nonce: Scalars['Bytes32']['output'];
  proofIndex: Scalars['U64']['output'];
  proofSet: Array<Scalars['Bytes32']['output']>;
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
  signature: Scalars['Signature']['output'];
};

export enum MessageStatus {
  Spent = 'SPENT',
  Unspent = 'UNSPENT'
}

export type Mutation = {
  __typename: 'Mutation';
  /** Execute a dry-run of the transaction using a fork of current state, no changes are committed. */
  dryRun: Array<Receipt>;
  produceBlocks: Scalars['U64']['output'];
  /** Submits transaction to the txpool */
  submit: Transaction;
};


export type MutationDryRunArgs = {
  tx: Scalars['HexString']['input'];
  utxoValidation?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationProduceBlocksArgs = {
  blocksToProduce: Scalars['U64']['input'];
  time?: InputMaybe<TimeParameters>;
};


export type MutationSubmitArgs = {
  tx: Scalars['HexString']['input'];
};

export type NodeInfo = {
  __typename: 'NodeInfo';
  maxDepth: Scalars['U64']['output'];
  maxTx: Scalars['U64']['output'];
  minGasPrice: Scalars['U64']['output'];
  nodeVersion: Scalars['String']['output'];
  utxoValidation: Scalars['Boolean']['output'];
  vmBacktrace: Scalars['Boolean']['output'];
};

export type Output = ChangeOutput | CoinOutput | ContractCreated | ContractOutput | MessageOutput | VariableOutput;

/** Information about pagination in a connection */
export type PageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PoAConsensus = {
  __typename: 'PoAConsensus';
  /** Gets the signature of the block produced by `PoA` consensus. */
  signature: Scalars['Signature']['output'];
};

export type ProgramState = {
  __typename: 'ProgramState';
  data: Scalars['HexString']['output'];
  returnType: _ReturnType;
};

export type Query = {
  __typename: 'Query';
  accounts: Array<Account>;
  balance: Balance;
  balances: BalanceConnection;
  block?: Maybe<Block>;
  blocks: BlockConnection;
  chain: ChainInfo;
  /** Gets the coin by `utxo_id`. */
  coin?: Maybe<Coin>;
  /**
   * Gets all coins of some `owner` maybe filtered with by `asset_id` per page.
   * It includes `CoinStatus::Spent` and `CoinStatus::Unspent` coins.
   */
  coins: CoinConnection;
  contract?: Maybe<Contract>;
  contractBalance: ContractBalance;
  contractBalances: ContractBalanceConnection;
  /** Returns true when the GraphQL API is serving requests. */
  health: Scalars['Boolean']['output'];
  messageProof?: Maybe<MessageProof>;
  messages: MessageConnection;
  nodeInfo: NodeInfo;
  /**
   * For each `query_per_asset`, get some spendable resources(of asset specified by the query) owned by
   * `owner` that add up at least the query amount. The returned resources are actual resources
   * that can be spent. The number of resources is optimized to prevent dust accumulation.
   * Max number of resources and excluded resources can also be specified.
   *
   * Returns:
   * The list of spendable resources per asset from the query. The length of the result is
   * the same as the length of `query_per_asset`. The ordering of assets and `query_per_asset`
   * is the same.
   */
  resourcesToSpend: Array<Array<Resource>>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: TransactionConnection;
  transactionsByOwner: TransactionConnection;
};


export type QueryAccountsArgs = {
  addresses: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryBalanceArgs = {
  assetId: Scalars['AssetId']['input'];
  owner: Scalars['Address']['input'];
};


export type QueryBalancesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: BalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBlockArgs = {
  height?: InputMaybe<Scalars['U64']['input']>;
  id?: InputMaybe<Scalars['BlockId']['input']>;
};


export type QueryBlocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCoinArgs = {
  utxoId: Scalars['UtxoId']['input'];
};


export type QueryCoinsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: CoinFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryContractArgs = {
  id: Scalars['ContractId']['input'];
};


export type QueryContractBalanceArgs = {
  asset: Scalars['AssetId']['input'];
  contract: Scalars['ContractId']['input'];
};


export type QueryContractBalancesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: ContractBalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMessageProofArgs = {
  messageId: Scalars['MessageId']['input'];
  transactionId: Scalars['TransactionId']['input'];
};


export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['Address']['input']>;
};


export type QueryResourcesToSpendArgs = {
  excludedIds?: InputMaybe<ExcludeInput>;
  owner: Scalars['Address']['input'];
  queryPerAsset: Array<SpendQueryElementInput>;
};


export type QueryTokensArgs = {
  assetsId: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryTransactionArgs = {
  id: Scalars['TransactionId']['input'];
};


export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTransactionsByOwnerArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  owner: Scalars['Address']['input'];
};

export type Receipt = {
  __typename: 'Receipt';
  amount?: Maybe<Scalars['U64']['output']>;
  assetId?: Maybe<Scalars['AssetId']['output']>;
  contract?: Maybe<Contract>;
  contractId?: Maybe<Scalars['ContractId']['output']>;
  data?: Maybe<Scalars['HexString']['output']>;
  digest?: Maybe<Scalars['Bytes32']['output']>;
  gas?: Maybe<Scalars['U64']['output']>;
  gasUsed?: Maybe<Scalars['U64']['output']>;
  is?: Maybe<Scalars['U64']['output']>;
  len?: Maybe<Scalars['U64']['output']>;
  messageId?: Maybe<Scalars['MessageId']['output']>;
  nonce?: Maybe<Scalars['Bytes32']['output']>;
  param1?: Maybe<Scalars['U64']['output']>;
  param2?: Maybe<Scalars['U64']['output']>;
  pc?: Maybe<Scalars['U64']['output']>;
  ptr?: Maybe<Scalars['U64']['output']>;
  ra?: Maybe<Scalars['U64']['output']>;
  rawPayload: Scalars['HexString']['output'];
  rb?: Maybe<Scalars['U64']['output']>;
  rc?: Maybe<Scalars['U64']['output']>;
  rd?: Maybe<Scalars['U64']['output']>;
  reason?: Maybe<Scalars['U64']['output']>;
  receiptType: ReceiptType;
  recipient?: Maybe<Scalars['Address']['output']>;
  result?: Maybe<Scalars['U64']['output']>;
  sender?: Maybe<Scalars['Address']['output']>;
  to?: Maybe<Contract>;
  toAddress?: Maybe<Scalars['Address']['output']>;
  val?: Maybe<Scalars['U64']['output']>;
};

export enum ReceiptType {
  Call = 'CALL',
  Log = 'LOG',
  LogData = 'LOG_DATA',
  MessageOut = 'MESSAGE_OUT',
  Panic = 'PANIC',
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT',
  ScriptResult = 'SCRIPT_RESULT',
  Transfer = 'TRANSFER',
  TransferOut = 'TRANSFER_OUT'
}

/** The schema analog of the [`resource::Resource`]. */
export type Resource = Coin | Message;

export enum _ReturnType {
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT'
}

export type SpendQueryElementInput = {
  /** Target amount for the query. */
  amount: Scalars['U64']['input'];
  /** Identifier of the asset to spend. */
  assetId: Scalars['AssetId']['input'];
  /** The maximum number of currencies for selection. */
  max?: InputMaybe<Scalars['U64']['input']>;
};

export type SqueezedOutStatus = {
  __typename: 'SqueezedOutStatus';
  reason: Scalars['String']['output'];
};

export type SubmittedStatus = {
  __typename: 'SubmittedStatus';
  time: Scalars['Tai64Timestamp']['output'];
};

export type Subscription = {
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
  statusChange: TransactionStatus;
};


export type SubscriptionStatusChangeArgs = {
  id: Scalars['TransactionId']['input'];
};

export type SuccessStatus = {
  __typename: 'SuccessStatus';
  block: Block;
  programState?: Maybe<ProgramState>;
  time: Scalars['Tai64Timestamp']['output'];
};

export type TimeParameters = {
  /** The time interval between subsequent blocks */
  blockTimeInterval: Scalars['U64']['input'];
  /** The time to set on the first block */
  startTime: Scalars['U64']['input'];
};

export type Token = {
  __typename: 'Token';
  assetId: Scalars['String']['output'];
  decimals: Scalars['U64']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  totalAssets?: Maybe<Scalars['U64']['output']>;
  totalSupply?: Maybe<Scalars['U64']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Transaction = {
  __typename: 'Transaction';
  blockHeight?: Maybe<Scalars['String']['output']>;
  bytecodeLength?: Maybe<Scalars['U64']['output']>;
  bytecodeWitnessIndex?: Maybe<Scalars['Int']['output']>;
  gasLimit?: Maybe<Scalars['U64']['output']>;
  gasPrice?: Maybe<Scalars['U64']['output']>;
  gasUsed?: Maybe<Scalars['U64']['output']>;
  id: Scalars['TransactionId']['output'];
  inputAssetIds?: Maybe<Array<Scalars['AssetId']['output']>>;
  inputContracts?: Maybe<Array<Contract>>;
  inputs?: Maybe<Array<Input>>;
  isCreate: Scalars['Boolean']['output'];
  isMint: Scalars['Boolean']['output'];
  isScript: Scalars['Boolean']['output'];
  maturity?: Maybe<Scalars['U64']['output']>;
  outputs: Array<Output>;
  /** Return the transaction bytes using canonical encoding */
  rawPayload: Scalars['HexString']['output'];
  receipts?: Maybe<Array<Receipt>>;
  receiptsRoot?: Maybe<Scalars['Bytes32']['output']>;
  salt?: Maybe<Scalars['Salt']['output']>;
  script?: Maybe<Scalars['HexString']['output']>;
  scriptData?: Maybe<Scalars['HexString']['output']>;
  status?: Maybe<TransactionStatus>;
  statusType?: Maybe<TransactionStatusType>;
  storageSlots?: Maybe<Array<Scalars['HexString']['output']>>;
  time?: Maybe<Scalars['String']['output']>;
  title?: Maybe<TransactionTitle>;
  totalAccounts?: Maybe<Scalars['Int']['output']>;
  totalAssets?: Maybe<Scalars['Int']['output']>;
  totalOperations?: Maybe<Scalars['Int']['output']>;
  txPointer?: Maybe<Scalars['TxPointer']['output']>;
  witnesses?: Maybe<Array<Scalars['HexString']['output']>>;
};

export type TransactionConnection = {
  __typename: 'TransactionConnection';
  accounts?: Maybe<Array<Maybe<Account>>>;
  /** A list of edges. */
  edges: Array<TransactionEdge>;
  /** A list of nodes. */
  nodes: Array<Transaction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  tokens?: Maybe<Array<Maybe<Token>>>;
};

/** An edge in a connection. */
export type TransactionEdge = {
  __typename: 'TransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Transaction;
};

export type TransactionStatus = FailureStatus | SqueezedOutStatus | SubmittedStatus | SuccessStatus;

export enum TransactionStatusType {
  Failure = 'Failure',
  Submitted = 'Submitted',
  Success = 'Success'
}

export enum TransactionTitle {
  Burn = 'Burn',
  ContractCall = 'ContractCall',
  Mint = 'Mint'
}

export type VariableOutput = {
  __typename: 'VariableOutput';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  to: Scalars['Address']['output'];
};

export type ContractItemFragment = { __typename: 'Contract', id: any };

type TransactionStatus_FailureStatus_Fragment = { __typename: 'FailureStatus', time: any };

type TransactionStatus_SqueezedOutStatus_Fragment = { __typename: 'SqueezedOutStatus' };

type TransactionStatus_SubmittedStatus_Fragment = { __typename: 'SubmittedStatus', time: any };

type TransactionStatus_SuccessStatus_Fragment = { __typename: 'SuccessStatus', time: any, block: { __typename: 'Block', id: any } };

export type TransactionStatusFragment = TransactionStatus_FailureStatus_Fragment | TransactionStatus_SqueezedOutStatus_Fragment | TransactionStatus_SubmittedStatus_Fragment | TransactionStatus_SuccessStatus_Fragment;

type TransactionInput_InputCoin_Fragment = { __typename: 'InputCoin', owner: any, amount: any, assetId: any, predicate: any, predicateData: any };

type TransactionInput_InputContract_Fragment = { __typename: 'InputContract', contract: { __typename: 'Contract', id: any } };

type TransactionInput_InputMessage_Fragment = { __typename: 'InputMessage', messageId: any, sender: any, recipient: any, amount: any, nonce: any, data: any, predicate: any, predicateData: any };

export type TransactionInputFragment = TransactionInput_InputCoin_Fragment | TransactionInput_InputContract_Fragment | TransactionInput_InputMessage_Fragment;

type TransactionOutput_ChangeOutput_Fragment = { __typename: 'ChangeOutput', to: any, amount: any, assetId: any };

type TransactionOutput_CoinOutput_Fragment = { __typename: 'CoinOutput', to: any, amount: any, assetId: any };

type TransactionOutput_ContractCreated_Fragment = { __typename: 'ContractCreated', contract: { __typename: 'Contract', id: any } };

type TransactionOutput_ContractOutput_Fragment = { __typename: 'ContractOutput' };

type TransactionOutput_MessageOutput_Fragment = { __typename: 'MessageOutput', recipient: any, amount: any };

type TransactionOutput_VariableOutput_Fragment = { __typename: 'VariableOutput', to: any, amount: any, assetId: any };

export type TransactionOutputFragment = TransactionOutput_ChangeOutput_Fragment | TransactionOutput_CoinOutput_Fragment | TransactionOutput_ContractCreated_Fragment | TransactionOutput_ContractOutput_Fragment | TransactionOutput_MessageOutput_Fragment | TransactionOutput_VariableOutput_Fragment;

export type TransactionReceiptFragment = { __typename: 'Receipt', data?: any | null, toAddress?: any | null, amount?: any | null, assetId?: any | null, param1?: any | null, param2?: any | null, receiptType: ReceiptType, gas?: any | null, gasUsed?: any | null, messageId?: any | null, sender?: any | null, recipient?: any | null, contractId?: any | null, contract?: { __typename: 'Contract', id: any } | null, to?: { __typename: 'Contract', id: any } | null };

export type TransactionItemFragment = { __typename: 'Transaction', id: any, title?: TransactionTitle | null, time?: string | null, blockHeight?: string | null, statusType?: TransactionStatusType | null, totalAccounts?: number | null, totalAssets?: number | null, totalOperations?: number | null, gasUsed?: any | null, isScript: boolean, isMint: boolean, isCreate: boolean, gasPrice?: any | null, gasLimit?: any | null, inputAssetIds?: Array<any> | null, status?: { __typename: 'FailureStatus', time: any } | { __typename: 'SqueezedOutStatus' } | { __typename: 'SubmittedStatus', time: any } | { __typename: 'SuccessStatus', time: any, block: { __typename: 'Block', id: any } } | null, inputContracts?: Array<{ __typename: 'Contract', id: any }> | null, inputs?: Array<{ __typename: 'InputCoin', owner: any, amount: any, assetId: any, predicate: any, predicateData: any } | { __typename: 'InputContract', contract: { __typename: 'Contract', id: any } } | { __typename: 'InputMessage', messageId: any, sender: any, recipient: any, amount: any, nonce: any, data: any, predicate: any, predicateData: any }> | null, outputs: Array<{ __typename: 'ChangeOutput', to: any, amount: any, assetId: any } | { __typename: 'CoinOutput', to: any, amount: any, assetId: any } | { __typename: 'ContractCreated', contract: { __typename: 'Contract', id: any } } | { __typename: 'ContractOutput' } | { __typename: 'MessageOutput', recipient: any, amount: any } | { __typename: 'VariableOutput', to: any, amount: any, assetId: any }>, receipts?: Array<{ __typename: 'Receipt', data?: any | null, toAddress?: any | null, amount?: any | null, assetId?: any | null, param1?: any | null, param2?: any | null, receiptType: ReceiptType, gas?: any | null, gasUsed?: any | null, messageId?: any | null, sender?: any | null, recipient?: any | null, contractId?: any | null, contract?: { __typename: 'Contract', id: any } | null, to?: { __typename: 'Contract', id: any } | null }> | null };

export type GetLastTransactionsQueryVariables = Exact<{
  last: Scalars['Int']['input'];
}>;


export type GetLastTransactionsQuery = { __typename: 'Query', transactions: { __typename: 'TransactionConnection', nodes: Array<{ __typename: 'Transaction', id: any, title?: TransactionTitle | null, time?: string | null, blockHeight?: string | null, statusType?: TransactionStatusType | null, totalAccounts?: number | null, totalAssets?: number | null, totalOperations?: number | null, gasUsed?: any | null, isScript: boolean, isMint: boolean, isCreate: boolean, gasPrice?: any | null, gasLimit?: any | null, inputAssetIds?: Array<any> | null, status?: { __typename: 'FailureStatus', time: any } | { __typename: 'SqueezedOutStatus' } | { __typename: 'SubmittedStatus', time: any } | { __typename: 'SuccessStatus', time: any, block: { __typename: 'Block', id: any } } | null, inputContracts?: Array<{ __typename: 'Contract', id: any }> | null, inputs?: Array<{ __typename: 'InputCoin', owner: any, amount: any, assetId: any, predicate: any, predicateData: any } | { __typename: 'InputContract', contract: { __typename: 'Contract', id: any } } | { __typename: 'InputMessage', messageId: any, sender: any, recipient: any, amount: any, nonce: any, data: any, predicate: any, predicateData: any }> | null, outputs: Array<{ __typename: 'ChangeOutput', to: any, amount: any, assetId: any } | { __typename: 'CoinOutput', to: any, amount: any, assetId: any } | { __typename: 'ContractCreated', contract: { __typename: 'Contract', id: any } } | { __typename: 'ContractOutput' } | { __typename: 'MessageOutput', recipient: any, amount: any } | { __typename: 'VariableOutput', to: any, amount: any, assetId: any }>, receipts?: Array<{ __typename: 'Receipt', data?: any | null, toAddress?: any | null, amount?: any | null, assetId?: any | null, param1?: any | null, param2?: any | null, receiptType: ReceiptType, gas?: any | null, gasUsed?: any | null, messageId?: any | null, sender?: any | null, recipient?: any | null, contractId?: any | null, contract?: { __typename: 'Contract', id: any } | null, to?: { __typename: 'Contract', id: any } | null }> | null }> } };

export const TransactionStatusFragmentDoc = gql`
    fragment TransactionStatus on TransactionStatus {
  __typename
  ... on SuccessStatus {
    time
    block {
      id
    }
  }
  ... on FailureStatus {
    time
  }
  ... on SubmittedStatus {
    time
  }
}
    `;
export const ContractItemFragmentDoc = gql`
    fragment ContractItem on Contract {
  __typename
  id
}
    `;
export const TransactionInputFragmentDoc = gql`
    fragment TransactionInput on Input {
  __typename
  ... on InputContract {
    contract {
      ...ContractItem
    }
  }
  ... on InputCoin {
    owner
    amount
    assetId
    predicate
    predicateData
  }
  ... on InputMessage {
    messageId
    sender
    recipient
    amount
    nonce
    data
    predicate
    predicateData
  }
}
    ${ContractItemFragmentDoc}`;
export const TransactionOutputFragmentDoc = gql`
    fragment TransactionOutput on Output {
  __typename
  ... on CoinOutput {
    to
    amount
    assetId
  }
  ... on MessageOutput {
    recipient
    amount
  }
  ... on ChangeOutput {
    to
    amount
    assetId
  }
  ... on VariableOutput {
    to
    amount
    assetId
  }
  ... on ContractCreated {
    contract {
      ...ContractItem
    }
  }
}
    ${ContractItemFragmentDoc}`;
export const TransactionReceiptFragmentDoc = gql`
    fragment TransactionReceipt on Receipt {
  __typename
  contract {
    ...ContractItem
  }
  to {
    ...ContractItem
  }
  data
  toAddress
  amount
  assetId
  param1
  param2
  receiptType
  gas
  gasUsed
  messageId
  sender
  recipient
  contractId
}
    ${ContractItemFragmentDoc}`;
export const TransactionItemFragmentDoc = gql`
    fragment TransactionItem on Transaction {
  __typename
  id
  title
  time
  blockHeight
  statusType
  totalAccounts
  totalAssets
  totalOperations
  gasUsed
  isScript
  isMint
  isCreate
  gasPrice
  gasLimit
  status {
    ...TransactionStatus
  }
  inputAssetIds
  inputContracts {
    ...ContractItem
  }
  inputs {
    ...TransactionInput
  }
  outputs {
    ...TransactionOutput
  }
  receipts {
    ...TransactionReceipt
  }
}
    ${TransactionStatusFragmentDoc}
${ContractItemFragmentDoc}
${TransactionInputFragmentDoc}
${TransactionOutputFragmentDoc}
${TransactionReceiptFragmentDoc}`;
export const GetLastTransactionsDocument = gql`
    query getLastTransactions($last: Int!) {
  transactions(last: $last) {
    nodes {
      ...TransactionItem
    }
  }
}
    ${TransactionItemFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetLastTransactionsDocumentString = print(GetLastTransactionsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getLastTransactions(variables: GetLastTransactionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetLastTransactionsQuery; extensions?: any; headers: any; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetLastTransactionsQuery>(GetLastTransactionsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLastTransactions', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;