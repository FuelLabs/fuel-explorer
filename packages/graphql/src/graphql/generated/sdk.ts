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

export type GQLBalance = {
  __typename: 'Balance';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  owner: Scalars['Address']['output'];
  utxos?: Maybe<Array<Maybe<GQLUtxoItem>>>;
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

export type GQLBlock = {
  __typename: 'Block';
  _id?: Maybe<Scalars['Int']['output']>;
  consensus: GQLConsensus;
  header: GQLHeader;
  height: Scalars['U32']['output'];
  id: Scalars['BlockId']['output'];
  producer?: Maybe<Scalars['Address']['output']>;
  time?: Maybe<GQLParsedTime>;
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

/** Breakpoint, defined as a tuple of contract ID and relative PC offset inside it */
export type GQLBreakpoint = {
  contract: Scalars['ContractId']['input'];
  pc: Scalars['U64']['input'];
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
  assetId: Scalars['AssetId']['output'];
  to: Scalars['Address']['output'];
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
  assetId: Scalars['AssetId']['output'];
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
  assetId: Scalars['AssetId']['output'];
  contract: Scalars['ContractId']['output'];
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
  assetId: Scalars['AssetId']['output'];
  owner: Scalars['Address']['output'];
  predicate: Scalars['HexString']['output'];
  predicateData: Scalars['HexString']['output'];
  predicateGasUsed: Scalars['U64']['output'];
  txPointer: Scalars['TxPointer']['output'];
  utxoId: Scalars['UtxoId']['output'];
  witnessIndex: Scalars['U16']['output'];
};

export type GQLInputContract = {
  __typename: 'InputContract';
  balanceRoot: Scalars['Bytes32']['output'];
  contractId: Scalars['ContractId']['output'];
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
  FromContract = 'FROM_CONTRACT'
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

/** Information about pagination in a connection */
export type GQLPageInfo = {
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
  balance: GQLBalance;
  balances: GQLBalanceConnection;
  block?: Maybe<GQLBlock>;
  blocks: GQLBlockConnection;
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
  transaction?: Maybe<GQLTransaction>;
  transactions: GQLTransactionConnection;
  transactionsByBlockId: GQLTransactionConnection;
  transactionsByOwner: GQLTransactionConnection;
};


export type GQLQueryBalanceArgs = {
  assetId: Scalars['AssetId']['input'];
  owner: Scalars['Address']['input'];
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
};

export type GQLReceipt = {
  __typename: 'Receipt';
  amount?: Maybe<Scalars['U64']['output']>;
  assetId?: Maybe<Scalars['AssetId']['output']>;
  /** Set in the case of a Panic receipt to indicate a missing contract input id */
  contractId?: Maybe<Scalars['ContractId']['output']>;
  data?: Maybe<Scalars['HexString']['output']>;
  digest?: Maybe<Scalars['Bytes32']['output']>;
  gas?: Maybe<Scalars['U64']['output']>;
  gasUsed?: Maybe<Scalars['U64']['output']>;
  id?: Maybe<Scalars['ContractId']['output']>;
  is?: Maybe<Scalars['U64']['output']>;
  len?: Maybe<Scalars['U64']['output']>;
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

export type GQLSearchResult = {
  __typename: 'SearchResult';
  account?: Maybe<GQLSearchAccount>;
  block?: Maybe<GQLSearchBlock>;
  contract?: Maybe<GQLSearchContract>;
  transaction?: Maybe<GQLSearchTransaction>;
};

export type GQLSearchTransaction = {
  __typename: 'SearchTransaction';
  id?: Maybe<Scalars['TransactionId']['output']>;
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

export type GQLStateTransitionPurpose = {
  __typename: 'StateTransitionPurpose';
  root: Scalars['Bytes32']['output'];
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
  mintAssetId?: Maybe<Scalars['AssetId']['output']>;
  mintGasPrice?: Maybe<Scalars['U64']['output']>;
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
  gasUsed?: Maybe<Scalars['U64']['output']>;
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
  assetId: Scalars['AssetId']['output'];
  to: Scalars['Address']['output'];
};

export type GQLBalanceItemFragment = { __typename: 'Balance', amount: string, assetId: string, owner: string, utxos?: Array<{ __typename: 'UtxoItem', amount: string, blockCreated?: string | null, txCreatedIdx?: string | null, utxoId: string } | null> | null };

export type GQLBalancesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLBalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLBalancesQuery = { __typename: 'Query', balances: { __typename: 'BalanceConnection', nodes: Array<{ __typename: 'Balance', amount: string, assetId: string, owner: string, utxos?: Array<{ __typename: 'UtxoItem', amount: string, blockCreated?: string | null, txCreatedIdx?: string | null, utxoId: string } | null> | null }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type GQLBlockFragment = { __typename: 'Block', id: string, producer?: string | null, consensus: { __typename: 'Genesis' } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', transactionsCount: string }, time?: { __typename: 'ParsedTime', full?: string | null, fromNow?: string | null, rawUnix?: string | null } | null, transactions: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null } | null }> };

export type GQLBlockQueryVariables = Exact<{
  height?: InputMaybe<Scalars['U32']['input']>;
  id?: InputMaybe<Scalars['BlockId']['input']>;
}>;


export type GQLBlockQuery = { __typename: 'Query', block?: { __typename: 'Block', id: string, producer?: string | null, consensus: { __typename: 'Genesis' } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', transactionsCount: string }, time?: { __typename: 'ParsedTime', full?: string | null, fromNow?: string | null, rawUnix?: string | null } | null, transactions: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null } | null }> } | null };

export type GQLChainQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLChainQuery = { __typename: 'Query', chain: { __typename: 'ChainInfo', daHeight: string, name: string, consensusParameters: { __typename: 'ConsensusParameters', baseAssetId: string, blockGasLimit: string, chainId: string, privilegedAddress: string, contractParams: { __typename: 'ContractParameters', contractMaxSize: string, maxStorageSlots: string }, feeParams: { __typename: 'FeeParameters', gasPerByte: string, gasPriceFactor: string }, gasCosts: { __typename: 'GasCosts', add: string, addi: string, aloc: string, and: string, andi: string, bal: string, bhei: string, bhsh: string, burn: string, cb: string, cfei: string, cfsi: string, div: string, divi: string, eck1: string, ecr1: string, ed19: string, eq: string, exp: string, expi: string, flag: string, gm: string, gt: string, gtf: string, ji: string, jmp: string, jmpb: string, jmpf: string, jne: string, jneb: string, jnef: string, jnei: string, jnzb: string, jnzf: string, jnzi: string, lb: string, log: string, lt: string, lw: string, mint: string, mldv: string, mlog: string, modOp: string, modi: string, moveOp: string, movi: string, mroo: string, mul: string, muli: string, newStoragePerByte: string, noop: string, not: string, or: string, ori: string, poph: string, popl: string, pshh: string, pshl: string, ret: string, rvrt: string, sb: string, sll: string, slli: string, srl: string, srli: string, srw: string, sub: string, subi: string, sw: string, sww: string, time: string, tr: string, tro: string, wdam: string, wdcm: string, wddv: string, wdmd: string, wdml: string, wdmm: string, wdop: string, wqam: string, wqcm: string, wqdv: string, wqmd: string, wqml: string, wqmm: string, wqop: string, xor: string, xori: string, call: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ccp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, contractRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, croo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, csiz: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, k256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ldc: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, logd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcl: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcli: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcpi: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, meq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, retd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, s256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, scwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, smo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, srwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, stateRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, swwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, vmInitialization: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string } }, predicateParams: { __typename: 'PredicateParameters', maxGasPerPredicate: string, maxMessageDataLength: string, maxPredicateDataLength: string, maxPredicateLength: string }, scriptParams: { __typename: 'ScriptParameters', maxScriptDataLength: string, maxScriptLength: string }, txParams: { __typename: 'TxParameters', maxBytecodeSubsections: string, maxGasPerTx: string, maxInputs: string, maxOutputs: string, maxSize: string, maxWitnesses: string } }, gasCosts: { __typename: 'GasCosts', add: string, addi: string, aloc: string, and: string, andi: string, bal: string, bhei: string, bhsh: string, burn: string, cb: string, cfei: string, cfsi: string, div: string, divi: string, eck1: string, ecr1: string, ed19: string, eq: string, exp: string, expi: string, flag: string, gm: string, gt: string, gtf: string, ji: string, jmp: string, jmpb: string, jmpf: string, jne: string, jneb: string, jnef: string, jnei: string, jnzb: string, jnzf: string, jnzi: string, lb: string, log: string, lt: string, lw: string, mint: string, mldv: string, mlog: string, modOp: string, modi: string, moveOp: string, movi: string, mroo: string, mul: string, muli: string, newStoragePerByte: string, noop: string, not: string, or: string, ori: string, poph: string, popl: string, pshh: string, pshl: string, ret: string, rvrt: string, sb: string, sll: string, slli: string, srl: string, srli: string, srw: string, sub: string, subi: string, sw: string, sww: string, time: string, tr: string, tro: string, wdam: string, wdcm: string, wddv: string, wdmd: string, wdml: string, wdmm: string, wdop: string, wqam: string, wqcm: string, wqdv: string, wqmd: string, wqml: string, wqmm: string, wqop: string, xor: string, xori: string, call: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ccp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, contractRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, croo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, csiz: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, k256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, ldc: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, logd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcl: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcli: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcp: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, mcpi: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, meq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, retd: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, s256: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, scwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, smo: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, srwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, stateRoot: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, swwq: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string }, vmInitialization: { __typename: 'HeavyOperation', base: string, gasPerUnit: string } | { __typename: 'LightOperation', base: string, unitsPerGas: string } }, latestBlock: { __typename: 'Block', height: string, id: string, consensus: { __typename: 'Genesis', chainConfigHash: string, coinsRoot: string, contractsRoot: string, messagesRoot: string, transactionsRoot: string } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', applicationHash: string, consensusParametersVersion: string, daHeight: string, eventInboxRoot: string, height: string, id: string, messageOutboxRoot: string, messageReceiptCount: string, prevRoot: string, stateTransitionBytecodeVersion: string, time: string, transactionsCount: string, transactionsRoot: string }, transactions: Array<{ __typename: 'Transaction', bytecodeRoot?: string | null, bytecodeWitnessIndex?: string | null, id: string, inputAssetIds?: Array<string> | null, inputContracts?: Array<string> | null, isCreate: boolean, isMint: boolean, isScript: boolean, isUpgrade: boolean, isUpload: boolean, maturity?: string | null, mintAmount?: string | null, mintAssetId?: string | null, mintGasPrice?: string | null, proofSet?: Array<string> | null, rawPayload: string, receiptsRoot?: string | null, salt?: string | null, script?: string | null, scriptData?: string | null, scriptGasLimit?: string | null, storageSlots?: Array<string> | null, subsectionIndex?: string | null, subsectionsNumber?: string | null, txPointer?: string | null, witnesses?: Array<string> | null, inputContract?: { __typename: 'InputContract', balanceRoot: string, contractId: string, stateRoot: string, txPointer: string, utxoId: string } | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, assetId: string, owner: string, predicate: string, predicateData: string, predicateGasUsed: string, txPointer: string, utxoId: string, witnessIndex: string } | { __typename: 'InputContract', balanceRoot: string, contractId: string, stateRoot: string, txPointer: string, utxoId: string } | { __typename: 'InputMessage', amount: string, data: string, nonce: string, predicate: string, predicateData: string, predicateGasUsed: string, recipient: string, sender: string, witnessIndex: string }> | null, outputContract?: { __typename: 'ContractOutput', balanceRoot: string, inputIndex: string, stateRoot: string } | null, outputs: Array<{ __typename: 'ChangeOutput', amount: string, assetId: string, to: string } | { __typename: 'CoinOutput', amount: string, assetId: string, to: string } | { __typename: 'ContractCreated', contract: string, stateRoot: string } | { __typename: 'ContractOutput', balanceRoot: string, inputIndex: string, stateRoot: string } | { __typename: 'VariableOutput', amount: string, assetId: string, to: string }>, policies?: { __typename: 'Policies', maturity?: string | null, maxFee?: string | null, tip?: string | null, witnessLimit?: string | null } | null, status?: { __typename: 'FailureStatus', reason: string, time: string, totalFee: string, totalGas: string, transactionId: string, block: { __typename: 'Block', height: string, id: string, consensus: { __typename: 'Genesis', chainConfigHash: string, coinsRoot: string, contractsRoot: string, messagesRoot: string, transactionsRoot: string } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', applicationHash: string, consensusParametersVersion: string, daHeight: string, eventInboxRoot: string, height: string, id: string, messageOutboxRoot: string, messageReceiptCount: string, prevRoot: string, stateTransitionBytecodeVersion: string, time: string, transactionsCount: string, transactionsRoot: string }, transactions: Array<{ __typename: 'Transaction', bytecodeRoot?: string | null, bytecodeWitnessIndex?: string | null, id: string, inputAssetIds?: Array<string> | null, inputContracts?: Array<string> | null, isCreate: boolean, isMint: boolean, isScript: boolean, isUpgrade: boolean, isUpload: boolean, maturity?: string | null, mintAmount?: string | null, mintAssetId?: string | null, mintGasPrice?: string | null, proofSet?: Array<string> | null, rawPayload: string, receiptsRoot?: string | null, salt?: string | null, script?: string | null, scriptData?: string | null, scriptGasLimit?: string | null, storageSlots?: Array<string> | null, subsectionIndex?: string | null, subsectionsNumber?: string | null, txPointer?: string | null, witnesses?: Array<string> | null, inputContract?: { __typename: 'InputContract', balanceRoot: string, contractId: string, stateRoot: string, txPointer: string, utxoId: string } | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, assetId: string, owner: string, predicate: string, predicateData: string, predicateGasUsed: string, txPointer: string, utxoId: string, witnessIndex: string } | { __typename: 'InputContract', balanceRoot: string, contractId: string, stateRoot: string, txPointer: string, utxoId: string } | { __typename: 'InputMessage', amount: string, data: string, nonce: string, predicate: string, predicateData: string, predicateGasUsed: string, recipient: string, sender: string, witnessIndex: string }> | null, outputContract?: { __typename: 'ContractOutput', balanceRoot: string, inputIndex: string, stateRoot: string } | null, outputs: Array<{ __typename: 'ChangeOutput', amount: string, assetId: string, to: string } | { __typename: 'CoinOutput', amount: string, assetId: string, to: string } | { __typename: 'ContractCreated', contract: string, stateRoot: string } | { __typename: 'ContractOutput', balanceRoot: string, inputIndex: string, stateRoot: string } | { __typename: 'VariableOutput', amount: string, assetId: string, to: string }>, policies?: { __typename: 'Policies', maturity?: string | null, maxFee?: string | null, tip?: string | null, witnessLimit?: string | null } | null, status?: { __typename: 'FailureStatus', reason: string, time: string, totalFee: string, totalGas: string, transactionId: string } | { __typename: 'SqueezedOutStatus', reason: string } | { __typename: 'SubmittedStatus', time: string } | { __typename: 'SuccessStatus', time: string, totalFee: string, totalGas: string, transactionId: string } | null, upgradePurpose?: { __typename: 'ConsensusParametersPurpose', checksum: string, witnessIndex: string } | { __typename: 'StateTransitionPurpose', root: string } | null }> }, programState?: { __typename: 'ProgramState', data: string, returnType: GQLReturnType } | null, receipts: Array<{ __typename: 'Receipt', amount?: string | null, assetId?: string | null, contractId?: string | null, data?: string | null, digest?: string | null, gas?: string | null, gasUsed?: string | null, id?: string | null, is?: string | null, len?: string | null, nonce?: string | null, param1?: string | null, param2?: string | null, pc?: string | null, ptr?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, reason?: string | null, receiptType: GQLReceiptType, recipient?: string | null, result?: string | null, sender?: string | null, subId?: string | null, to?: string | null, toAddress?: string | null, val?: string | null }> } | { __typename: 'SqueezedOutStatus', reason: string } | { __typename: 'SubmittedStatus', time: string } | { __typename: 'SuccessStatus', time: string, totalFee: string, totalGas: string, transactionId: string, block: { __typename: 'Block', height: string, id: string, consensus: { __typename: 'Genesis', chainConfigHash: string, coinsRoot: string, contractsRoot: string, messagesRoot: string, transactionsRoot: string } | { __typename: 'PoAConsensus', signature: string }, header: { __typename: 'Header', applicationHash: string, consensusParametersVersion: string, daHeight: string, eventInboxRoot: string, height: string, id: string, messageOutboxRoot: string, messageReceiptCount: string, prevRoot: string, stateTransitionBytecodeVersion: string, time: string, transactionsCount: string, transactionsRoot: string }, transactions: Array<{ __typename: 'Transaction', bytecodeRoot?: string | null, bytecodeWitnessIndex?: string | null, id: string, inputAssetIds?: Array<string> | null, inputContracts?: Array<string> | null, isCreate: boolean, isMint: boolean, isScript: boolean, isUpgrade: boolean, isUpload: boolean, maturity?: string | null, mintAmount?: string | null, mintAssetId?: string | null, mintGasPrice?: string | null, proofSet?: Array<string> | null, rawPayload: string, receiptsRoot?: string | null, salt?: string | null, script?: string | null, scriptData?: string | null, scriptGasLimit?: string | null, storageSlots?: Array<string> | null, subsectionIndex?: string | null, subsectionsNumber?: string | null, txPointer?: string | null, witnesses?: Array<string> | null, inputContract?: { __typename: 'InputContract', balanceRoot: string, contractId: string, stateRoot: string, txPointer: string, utxoId: string } | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, assetId: string, owner: string, predicate: string, predicateData: string, predicateGasUsed: string, txPointer: string, utxoId: string, witnessIndex: string } | { __typename: 'InputContract', balanceRoot: string, contractId: string, stateRoot: string, txPointer: string, utxoId: string } | { __typename: 'InputMessage', amount: string, data: string, nonce: string, predicate: string, predicateData: string, predicateGasUsed: string, recipient: string, sender: string, witnessIndex: string }> | null, outputContract?: { __typename: 'ContractOutput', balanceRoot: string, inputIndex: string, stateRoot: string } | null, outputs: Array<{ __typename: 'ChangeOutput', amount: string, assetId: string, to: string } | { __typename: 'CoinOutput', amount: string, assetId: string, to: string } | { __typename: 'ContractCreated', contract: string, stateRoot: string } | { __typename: 'ContractOutput', balanceRoot: string, inputIndex: string, stateRoot: string } | { __typename: 'VariableOutput', amount: string, assetId: string, to: string }>, policies?: { __typename: 'Policies', maturity?: string | null, maxFee?: string | null, tip?: string | null, witnessLimit?: string | null } | null, status?: { __typename: 'FailureStatus', reason: string, time: string, totalFee: string, totalGas: string, transactionId: string } | { __typename: 'SqueezedOutStatus', reason: string } | { __typename: 'SubmittedStatus', time: string } | { __typename: 'SuccessStatus', time: string, totalFee: string, totalGas: string, transactionId: string } | null, upgradePurpose?: { __typename: 'ConsensusParametersPurpose', checksum: string, witnessIndex: string } | { __typename: 'StateTransitionPurpose', root: string } | null }> }, programState?: { __typename: 'ProgramState', data: string, returnType: GQLReturnType } | null, receipts: Array<{ __typename: 'Receipt', amount?: string | null, assetId?: string | null, contractId?: string | null, data?: string | null, digest?: string | null, gas?: string | null, gasUsed?: string | null, id?: string | null, is?: string | null, len?: string | null, nonce?: string | null, param1?: string | null, param2?: string | null, pc?: string | null, ptr?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, reason?: string | null, receiptType: GQLReceiptType, recipient?: string | null, result?: string | null, sender?: string | null, subId?: string | null, to?: string | null, toAddress?: string | null, val?: string | null }> } | null, upgradePurpose?: { __typename: 'ConsensusParametersPurpose', checksum: string, witnessIndex: string } | { __typename: 'StateTransitionPurpose', root: string } | null }> } } };

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

export type GQLContractBalanceNodeFragment = { __typename: 'ContractBalance', amount: string, assetId: string };

export type GQLContractBalanceConnectionNodeFragment = { __typename: 'ContractBalanceConnection', edges: Array<{ __typename: 'ContractBalanceEdge', cursor: string, node: { __typename: 'ContractBalance', amount: string, assetId: string } }>, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null } };

export type GQLContractBalancesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter: GQLContractBalanceFilterInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLContractBalancesQuery = { __typename: 'Query', contractBalances: { __typename: 'ContractBalanceConnection', edges: Array<{ __typename: 'ContractBalanceEdge', cursor: string, node: { __typename: 'ContractBalance', amount: string, assetId: string } }>, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null } } };

export type GQLPredicateQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GQLPredicateQuery = { __typename: 'Query', predicate?: { __typename: 'PredicateItem', address?: string | null, bytecode?: string | null } | null };

export type GQLRecentTransactionFragment = { __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null } | null };

export type GQLRecentTransactionsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GQLRecentTransactionsQuery = { __typename: 'Query', transactions: { __typename: 'TransactionConnection', nodes: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null } | null }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type GQLSearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GQLSearchQuery = { __typename: 'Query', search?: { __typename: 'SearchResult', account?: { __typename: 'SearchAccount', address?: string | null, transactions?: Array<{ __typename: 'SearchTransaction', id?: string | null } | null> | null } | null, block?: { __typename: 'SearchBlock', height?: string | null, id?: string | null } | null, contract?: { __typename: 'SearchContract', id?: string | null } | null, transaction?: { __typename: 'SearchTransaction', id?: string | null } | null } | null };

export type GQLTransactionDetailsQueryVariables = Exact<{
  id: Scalars['TransactionId']['input'];
}>;


export type GQLTransactionDetailsQuery = { __typename: 'Query', transaction?: { __typename: 'Transaction', id: string, blockHeight?: string | null, hasPredicate?: boolean | null, statusType?: string | null, title: string, maturity?: string | null, txPointer?: string | null, isScript: boolean, isCreate: boolean, isMint: boolean, witnesses?: Array<string> | null, receiptsRoot?: string | null, script?: string | null, scriptData?: string | null, bytecodeWitnessIndex?: string | null, salt?: string | null, storageSlots?: Array<string> | null, rawPayload: string, mintAmount?: string | null, mintAssetId?: string | null, inputAssetIds?: Array<string> | null, inputContracts?: Array<string> | null, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, gasUsed?: string | null } | null, groupedInputs: Array<{ __typename: 'GroupedInputCoin', type?: GQLGroupedInputType | null, totalAmount?: string | null, owner?: string | null, assetId?: string | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, utxoId: string } | { __typename: 'InputContract' } | { __typename: 'InputMessage' }> | null } | { __typename: 'GroupedInputContract', type?: GQLGroupedInputType | null, contractId?: string | null } | { __typename: 'GroupedInputMessage', type?: GQLGroupedInputType | null, sender?: string | null, data?: string | null, recipient?: string | null }>, groupedOutputs: Array<{ __typename: 'GroupedOutputChanged', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputCoin', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputContractCreated', type?: GQLGroupedOutputType | null, contractId?: string | null }>, operations?: Array<{ __typename: 'Operation', type?: GQLOperationType | null, receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null }> | null, receipts?: Array<{ __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null }> | null, time: { __typename: 'ParsedTime', fromNow?: string | null, full?: string | null, rawUnix?: string | null }, inputContract?: { __typename: 'InputContract', contractId: string } | null, outputContract?: { __typename: 'ContractOutput', inputIndex: string } | null, status?: { __typename: 'FailureStatus', time: string, programState?: { __typename: 'ProgramState', data: string } | null } | { __typename: 'SqueezedOutStatus', reason: string } | { __typename: 'SubmittedStatus', time: string } | { __typename: 'SuccessStatus', time: string, block: { __typename: 'Block', id: string, header: { __typename: 'Header', id: string, height: string, daHeight: string, applicationHash: string, messageReceiptCount: string, time: string } }, programState?: { __typename: 'ProgramState', data: string } | null } | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, assetId: string, owner: string, predicate: string, predicateData: string, txPointer: string, utxoId: string, witnessIndex: string } | { __typename: 'InputContract', utxoId: string, balanceRoot: string, txPointer: string, contractId: string } | { __typename: 'InputMessage', sender: string, recipient: string, amount: string, nonce: string, data: string, predicate: string, predicateData: string }> | null, outputs: Array<{ __typename: 'ChangeOutput', to: string, amount: string, assetId: string } | { __typename: 'CoinOutput', to: string, amount: string, assetId: string } | { __typename: 'ContractCreated', contract: string } | { __typename: 'ContractOutput', inputIndex: string, balanceRoot: string } | { __typename: 'VariableOutput', to: string, amount: string, assetId: string }> } | null };

export type GQLTransactionsByBlockIdQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  blockId: Scalars['String']['input'];
}>;


export type GQLTransactionsByBlockIdQuery = { __typename: 'Query', transactionsByBlockId: { __typename: 'TransactionConnection', nodes: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null } | null }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type GQLTransactionsByOwnerQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  owner: Scalars['Address']['input'];
}>;


export type GQLTransactionsByOwnerQuery = { __typename: 'Query', transactionsByOwner: { __typename: 'TransactionConnection', nodes: Array<{ __typename: 'Transaction', _id?: string | null, id: string, title: string, statusType?: string | null, time: { __typename: 'ParsedTime', fromNow?: string | null, rawUnix?: string | null }, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null } | null }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

type GQLTransactionStatus_FailureStatus_Fragment = { __typename: 'FailureStatus', time: string, programState?: { __typename: 'ProgramState', data: string } | null };

type GQLTransactionStatus_SqueezedOutStatus_Fragment = { __typename: 'SqueezedOutStatus', reason: string };

type GQLTransactionStatus_SubmittedStatus_Fragment = { __typename: 'SubmittedStatus', time: string };

type GQLTransactionStatus_SuccessStatus_Fragment = { __typename: 'SuccessStatus', time: string, block: { __typename: 'Block', id: string, header: { __typename: 'Header', id: string, height: string, daHeight: string, applicationHash: string, messageReceiptCount: string, time: string } }, programState?: { __typename: 'ProgramState', data: string } | null };

export type GQLTransactionStatusFragment = GQLTransactionStatus_FailureStatus_Fragment | GQLTransactionStatus_SqueezedOutStatus_Fragment | GQLTransactionStatus_SubmittedStatus_Fragment | GQLTransactionStatus_SuccessStatus_Fragment;

type GQLTransactionInput_InputCoin_Fragment = { __typename: 'InputCoin', amount: string, assetId: string, owner: string, predicate: string, predicateData: string, txPointer: string, utxoId: string, witnessIndex: string };

type GQLTransactionInput_InputContract_Fragment = { __typename: 'InputContract', utxoId: string, balanceRoot: string, txPointer: string, contractId: string };

type GQLTransactionInput_InputMessage_Fragment = { __typename: 'InputMessage', sender: string, recipient: string, amount: string, nonce: string, data: string, predicate: string, predicateData: string };

export type GQLTransactionInputFragment = GQLTransactionInput_InputCoin_Fragment | GQLTransactionInput_InputContract_Fragment | GQLTransactionInput_InputMessage_Fragment;

type GQLTransactionOutput_ChangeOutput_Fragment = { __typename: 'ChangeOutput', to: string, amount: string, assetId: string };

type GQLTransactionOutput_CoinOutput_Fragment = { __typename: 'CoinOutput', to: string, amount: string, assetId: string };

type GQLTransactionOutput_ContractCreated_Fragment = { __typename: 'ContractCreated', contract: string };

type GQLTransactionOutput_ContractOutput_Fragment = { __typename: 'ContractOutput', inputIndex: string, balanceRoot: string };

type GQLTransactionOutput_VariableOutput_Fragment = { __typename: 'VariableOutput', to: string, amount: string, assetId: string };

export type GQLTransactionOutputFragment = GQLTransactionOutput_ChangeOutput_Fragment | GQLTransactionOutput_CoinOutput_Fragment | GQLTransactionOutput_ContractCreated_Fragment | GQLTransactionOutput_ContractOutput_Fragment | GQLTransactionOutput_VariableOutput_Fragment;

export type GQLTransactionReceiptFragment = { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null };

export type GQLInnerReceiptItemFragment = { __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null };

export type GQLOperationReceiptItemFragment = { __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null };

export type GQLOperationItemFragment = { __typename: 'Operation', type?: GQLOperationType | null, receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null };

export type GQLTxDetailsGroupedInputCoinFragment = { __typename: 'GroupedInputCoin', type?: GQLGroupedInputType | null, totalAmount?: string | null, owner?: string | null, assetId?: string | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, utxoId: string } | { __typename: 'InputContract' } | { __typename: 'InputMessage' }> | null };

export type GQLTxDetailsGroupedInputMessageFragment = { __typename: 'GroupedInputMessage', type?: GQLGroupedInputType | null, sender?: string | null, data?: string | null, recipient?: string | null };

export type GQLTxDetailsGroupedInputContractFragment = { __typename: 'GroupedInputContract', type?: GQLGroupedInputType | null, contractId?: string | null };

export type GQLTxDetailsGroupedOutputCoinFragment = { __typename: 'GroupedOutputCoin', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null };

export type GQLTxDetailsGroupedOutputChangedFragment = { __typename: 'GroupedOutputChanged', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null };

export type GQLTxDetailsGroupedOutputContractCreatedFragment = { __typename: 'GroupedOutputContractCreated', type?: GQLGroupedOutputType | null, contractId?: string | null };

export type GQLTransactionItemFragment = { __typename: 'Transaction', id: string, blockHeight?: string | null, hasPredicate?: boolean | null, statusType?: string | null, title: string, maturity?: string | null, txPointer?: string | null, isScript: boolean, isCreate: boolean, isMint: boolean, witnesses?: Array<string> | null, receiptsRoot?: string | null, script?: string | null, scriptData?: string | null, bytecodeWitnessIndex?: string | null, salt?: string | null, storageSlots?: Array<string> | null, rawPayload: string, mintAmount?: string | null, mintAssetId?: string | null, inputAssetIds?: Array<string> | null, inputContracts?: Array<string> | null, gasCosts?: { __typename: 'TransactionGasCosts', fee?: string | null, gasUsed?: string | null } | null, groupedInputs: Array<{ __typename: 'GroupedInputCoin', type?: GQLGroupedInputType | null, totalAmount?: string | null, owner?: string | null, assetId?: string | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, utxoId: string } | { __typename: 'InputContract' } | { __typename: 'InputMessage' }> | null } | { __typename: 'GroupedInputContract', type?: GQLGroupedInputType | null, contractId?: string | null } | { __typename: 'GroupedInputMessage', type?: GQLGroupedInputType | null, sender?: string | null, data?: string | null, recipient?: string | null }>, groupedOutputs: Array<{ __typename: 'GroupedOutputChanged', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputCoin', type?: GQLGroupedOutputType | null, assetId?: string | null, totalAmount?: string | null, to?: string | null, outputs?: Array<{ __typename: 'ChangeOutput' } | { __typename: 'CoinOutput' } | { __typename: 'ContractCreated' } | { __typename: 'ContractOutput' } | { __typename: 'VariableOutput' } | null> | null } | { __typename: 'GroupedOutputContractCreated', type?: GQLGroupedOutputType | null, contractId?: string | null }>, operations?: Array<{ __typename: 'Operation', type?: GQLOperationType | null, receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', receipts?: Array<{ __typename: 'OperationReceipt', item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null, item?: { __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null } | null }> | null }> | null, receipts?: Array<{ __typename: 'Receipt', id?: string | null, to?: string | null, pc?: string | null, is?: string | null, toAddress?: string | null, amount?: string | null, assetId?: string | null, gas?: string | null, param1?: string | null, param2?: string | null, val?: string | null, ptr?: string | null, digest?: string | null, reason?: string | null, ra?: string | null, rb?: string | null, rc?: string | null, rd?: string | null, len?: string | null, receiptType: GQLReceiptType, result?: string | null, gasUsed?: string | null, data?: string | null, sender?: string | null, recipient?: string | null, nonce?: string | null, contractId?: string | null, subId?: string | null }> | null, time: { __typename: 'ParsedTime', fromNow?: string | null, full?: string | null, rawUnix?: string | null }, inputContract?: { __typename: 'InputContract', contractId: string } | null, outputContract?: { __typename: 'ContractOutput', inputIndex: string } | null, status?: { __typename: 'FailureStatus', time: string, programState?: { __typename: 'ProgramState', data: string } | null } | { __typename: 'SqueezedOutStatus', reason: string } | { __typename: 'SubmittedStatus', time: string } | { __typename: 'SuccessStatus', time: string, block: { __typename: 'Block', id: string, header: { __typename: 'Header', id: string, height: string, daHeight: string, applicationHash: string, messageReceiptCount: string, time: string } }, programState?: { __typename: 'ProgramState', data: string } | null } | null, inputs?: Array<{ __typename: 'InputCoin', amount: string, assetId: string, owner: string, predicate: string, predicateData: string, txPointer: string, utxoId: string, witnessIndex: string } | { __typename: 'InputContract', utxoId: string, balanceRoot: string, txPointer: string, contractId: string } | { __typename: 'InputMessage', sender: string, recipient: string, amount: string, nonce: string, data: string, predicate: string, predicateData: string }> | null, outputs: Array<{ __typename: 'ChangeOutput', to: string, amount: string, assetId: string } | { __typename: 'CoinOutput', to: string, amount: string, assetId: string } | { __typename: 'ContractCreated', contract: string } | { __typename: 'ContractOutput', inputIndex: string, balanceRoot: string } | { __typename: 'VariableOutput', to: string, amount: string, assetId: string }> };

export const BalanceItemFragmentDoc = gql`
    fragment BalanceItem on Balance {
  amount
  assetId
  owner
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
  }
  gasCosts {
    fee
  }
}
    `;
export const BlockFragmentDoc = gql`
    fragment Block on Block {
  id
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
export const ContractBalanceNodeFragmentDoc = gql`
    fragment ContractBalanceNode on ContractBalance {
  amount
  assetId
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
    assetId
    owner
    predicate
    predicateData
    txPointer
    utxoId
    witnessIndex
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
    assetId
  }
  ... on ContractOutput {
    inputIndex
    balanceRoot
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
  witnesses
  receiptsRoot
  script
  scriptData
  bytecodeWitnessIndex
  salt
  storageSlots
  rawPayload
  mintAmount
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
    latestBlock {
      consensus {
        __typename
        ... on Genesis {
          chainConfigHash
          coinsRoot
          contractsRoot
          messagesRoot
          transactionsRoot
        }
        ... on PoAConsensus {
          signature
        }
      }
      header {
        applicationHash
        consensusParametersVersion
        daHeight
        eventInboxRoot
        height
        id
        messageOutboxRoot
        messageReceiptCount
        prevRoot
        stateTransitionBytecodeVersion
        time
        transactionsCount
        transactionsRoot
      }
      height
      id
      transactions {
        bytecodeRoot
        bytecodeWitnessIndex
        id
        inputAssetIds
        inputContract {
          balanceRoot
          contractId
          stateRoot
          txPointer
          utxoId
        }
        inputContracts
        inputs {
          __typename
          ... on InputCoin {
            amount
            assetId
            owner
            predicate
            predicateData
            predicateGasUsed
            txPointer
            utxoId
            witnessIndex
          }
          ... on InputContract {
            balanceRoot
            contractId
            stateRoot
            txPointer
            utxoId
          }
          ... on InputMessage {
            amount
            data
            nonce
            predicate
            predicateData
            predicateGasUsed
            recipient
            sender
            witnessIndex
          }
        }
        isCreate
        isMint
        isScript
        isUpgrade
        isUpload
        maturity
        mintAmount
        mintAssetId
        mintGasPrice
        outputContract {
          balanceRoot
          inputIndex
          stateRoot
        }
        outputs {
          __typename
          ... on ChangeOutput {
            amount
            assetId
            to
          }
          ... on CoinOutput {
            amount
            assetId
            to
          }
          ... on ContractCreated {
            contract
            stateRoot
          }
          ... on ContractOutput {
            balanceRoot
            inputIndex
            stateRoot
          }
          ... on VariableOutput {
            amount
            assetId
            to
          }
        }
        policies {
          maturity
          maxFee
          tip
          witnessLimit
        }
        proofSet
        rawPayload
        receiptsRoot
        salt
        script
        scriptData
        scriptGasLimit
        status {
          __typename
          ... on FailureStatus {
            block {
              consensus {
                __typename
                ... on Genesis {
                  chainConfigHash
                  coinsRoot
                  contractsRoot
                  messagesRoot
                  transactionsRoot
                }
                ... on PoAConsensus {
                  signature
                }
              }
              header {
                applicationHash
                consensusParametersVersion
                daHeight
                eventInboxRoot
                height
                id
                messageOutboxRoot
                messageReceiptCount
                prevRoot
                stateTransitionBytecodeVersion
                time
                transactionsCount
                transactionsRoot
              }
              height
              id
              transactions {
                bytecodeRoot
                bytecodeWitnessIndex
                id
                inputAssetIds
                inputContract {
                  balanceRoot
                  contractId
                  stateRoot
                  txPointer
                  utxoId
                }
                inputContracts
                inputs {
                  __typename
                  ... on InputCoin {
                    amount
                    assetId
                    owner
                    predicate
                    predicateData
                    predicateGasUsed
                    txPointer
                    utxoId
                    witnessIndex
                  }
                  ... on InputContract {
                    balanceRoot
                    contractId
                    stateRoot
                    txPointer
                    utxoId
                  }
                  ... on InputMessage {
                    amount
                    data
                    nonce
                    predicate
                    predicateData
                    predicateGasUsed
                    recipient
                    sender
                    witnessIndex
                  }
                }
                isCreate
                isMint
                isScript
                isUpgrade
                isUpload
                maturity
                mintAmount
                mintAssetId
                mintGasPrice
                outputContract {
                  balanceRoot
                  inputIndex
                  stateRoot
                }
                outputs {
                  __typename
                  ... on ChangeOutput {
                    amount
                    assetId
                    to
                  }
                  ... on CoinOutput {
                    amount
                    assetId
                    to
                  }
                  ... on ContractCreated {
                    contract
                    stateRoot
                  }
                  ... on ContractOutput {
                    balanceRoot
                    inputIndex
                    stateRoot
                  }
                  ... on VariableOutput {
                    amount
                    assetId
                    to
                  }
                }
                policies {
                  maturity
                  maxFee
                  tip
                  witnessLimit
                }
                proofSet
                rawPayload
                receiptsRoot
                salt
                script
                scriptData
                scriptGasLimit
                status {
                  __typename
                  ... on FailureStatus {
                    reason
                    time
                    totalFee
                    totalGas
                    transactionId
                  }
                  ... on SqueezedOutStatus {
                    reason
                  }
                  ... on SubmittedStatus {
                    time
                  }
                  ... on SuccessStatus {
                    time
                    totalFee
                    totalGas
                    transactionId
                  }
                }
                storageSlots
                subsectionIndex
                subsectionsNumber
                txPointer
                upgradePurpose {
                  __typename
                  ... on ConsensusParametersPurpose {
                    checksum
                    witnessIndex
                  }
                  ... on StateTransitionPurpose {
                    root
                  }
                }
                witnesses
              }
            }
            programState {
              data
              returnType
            }
            reason
            receipts {
              amount
              assetId
              contractId
              data
              digest
              gas
              gasUsed
              id
              is
              len
              nonce
              param1
              param2
              pc
              ptr
              ra
              rb
              rc
              rd
              reason
              receiptType
              recipient
              result
              sender
              subId
              to
              toAddress
              val
            }
            time
            totalFee
            totalGas
            transactionId
          }
          ... on SqueezedOutStatus {
            reason
          }
          ... on SubmittedStatus {
            time
          }
          ... on SuccessStatus {
            block {
              consensus {
                __typename
                ... on Genesis {
                  chainConfigHash
                  coinsRoot
                  contractsRoot
                  messagesRoot
                  transactionsRoot
                }
                ... on PoAConsensus {
                  signature
                }
              }
              header {
                applicationHash
                consensusParametersVersion
                daHeight
                eventInboxRoot
                height
                id
                messageOutboxRoot
                messageReceiptCount
                prevRoot
                stateTransitionBytecodeVersion
                time
                transactionsCount
                transactionsRoot
              }
              height
              id
              transactions {
                bytecodeRoot
                bytecodeWitnessIndex
                id
                inputAssetIds
                inputContract {
                  balanceRoot
                  contractId
                  stateRoot
                  txPointer
                  utxoId
                }
                inputContracts
                inputs {
                  __typename
                  ... on InputCoin {
                    amount
                    assetId
                    owner
                    predicate
                    predicateData
                    predicateGasUsed
                    txPointer
                    utxoId
                    witnessIndex
                  }
                  ... on InputContract {
                    balanceRoot
                    contractId
                    stateRoot
                    txPointer
                    utxoId
                  }
                  ... on InputMessage {
                    amount
                    data
                    nonce
                    predicate
                    predicateData
                    predicateGasUsed
                    recipient
                    sender
                    witnessIndex
                  }
                }
                isCreate
                isMint
                isScript
                isUpgrade
                isUpload
                maturity
                mintAmount
                mintAssetId
                mintGasPrice
                outputContract {
                  balanceRoot
                  inputIndex
                  stateRoot
                }
                outputs {
                  __typename
                  ... on ChangeOutput {
                    amount
                    assetId
                    to
                  }
                  ... on CoinOutput {
                    amount
                    assetId
                    to
                  }
                  ... on ContractCreated {
                    contract
                    stateRoot
                  }
                  ... on ContractOutput {
                    balanceRoot
                    inputIndex
                    stateRoot
                  }
                  ... on VariableOutput {
                    amount
                    assetId
                    to
                  }
                }
                policies {
                  maturity
                  maxFee
                  tip
                  witnessLimit
                }
                proofSet
                rawPayload
                receiptsRoot
                salt
                script
                scriptData
                scriptGasLimit
                status {
                  __typename
                  ... on FailureStatus {
                    reason
                    time
                    totalFee
                    totalGas
                    transactionId
                  }
                  ... on SqueezedOutStatus {
                    reason
                  }
                  ... on SubmittedStatus {
                    time
                  }
                  ... on SuccessStatus {
                    time
                    totalFee
                    totalGas
                    transactionId
                  }
                }
                storageSlots
                subsectionIndex
                subsectionsNumber
                txPointer
                upgradePurpose {
                  __typename
                  ... on ConsensusParametersPurpose {
                    checksum
                    witnessIndex
                  }
                  ... on StateTransitionPurpose {
                    root
                  }
                }
                witnesses
              }
            }
            programState {
              data
              returnType
            }
            receipts {
              amount
              assetId
              contractId
              data
              digest
              gas
              gasUsed
              id
              is
              len
              nonce
              param1
              param2
              pc
              ptr
              ra
              rb
              rc
              rd
              reason
              receiptType
              recipient
              result
              sender
              subId
              to
              toAddress
              val
            }
            time
            totalFee
            totalGas
            transactionId
          }
        }
        storageSlots
        subsectionIndex
        subsectionsNumber
        txPointer
        upgradePurpose {
          __typename
          ... on ConsensusParametersPurpose {
            checksum
            witnessIndex
          }
          ... on StateTransitionPurpose {
            root
          }
        }
        witnesses
      }
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
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    ${RecentTransactionFragmentDoc}`;
export const TransactionsByOwnerDocument = gql`
    query transactionsByOwner($after: String, $before: String, $first: Int, $last: Int, $owner: Address!) {
  transactionsByOwner(
    after: $after
    before: $before
    first: $first
    last: $last
    owner: $owner
  ) {
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const BalancesDocumentString = print(BalancesDocument);
const BlockDocumentString = print(BlockDocument);
const ChainDocumentString = print(ChainDocument);
const CoinsDocumentString = print(CoinsDocument);
const ContractDocumentString = print(ContractDocument);
const ContractBalancesDocumentString = print(ContractBalancesDocument);
const PredicateDocumentString = print(PredicateDocument);
const RecentTransactionsDocumentString = print(RecentTransactionsDocument);
const SearchDocumentString = print(SearchDocument);
const TransactionDetailsDocumentString = print(TransactionDetailsDocument);
const TransactionsByBlockIdDocumentString = print(TransactionsByBlockIdDocument);
const TransactionsByOwnerDocumentString = print(TransactionsByOwnerDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    balances(variables: GQLBalancesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLBalancesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLBalancesQuery>(BalancesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'balances', 'query', variables);
    },
    block(variables?: GQLBlockQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLBlockQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLBlockQuery>(BlockDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'block', 'query', variables);
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
    predicate(variables: GQLPredicateQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLPredicateQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLPredicateQuery>(PredicateDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'predicate', 'query', variables);
    },
    recentTransactions(variables?: GQLRecentTransactionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLRecentTransactionsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLRecentTransactionsQuery>(RecentTransactionsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'recentTransactions', 'query', variables);
    },
    search(variables: GQLSearchQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLSearchQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLSearchQuery>(SearchDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'search', 'query', variables);
    },
    transactionDetails(variables: GQLTransactionDetailsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GQLTransactionDetailsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GQLTransactionDetailsQuery>(TransactionDetailsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactionDetails', 'query', variables);
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