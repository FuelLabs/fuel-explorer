import { GraphQLError, print } from 'graphql';
import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Address: { input: string; output: string };
  AssetId: { input: string; output: string };
  BlockId: { input: string; output: string };
  Bytes32: { input: string; output: string };
  ContractId: { input: string; output: string };
  HexString: { input: string; output: string };
  Nonce: { input: string; output: string };
  RelayedTransactionId: { input: string; output: string };
  Salt: { input: string; output: string };
  Signature: { input: string; output: string };
  Tai64Timestamp: { input: string; output: string };
  TransactionId: { input: string; output: string };
  TxPointer: { input: string; output: string };
  U16: { input: string; output: string };
  U32: { input: string; output: string };
  U64: { input: string; output: string };
  UtxoId: { input: string; output: string };
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
  utxos?: Maybe<Array<Maybe<UtxoItem>>>;
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
  height: Scalars['U32']['output'];
  id: Scalars['BlockId']['output'];
  producer?: Maybe<Scalars['Address']['output']>;
  time?: Maybe<ParsedTime>;
  totalGasUsed?: Maybe<Scalars['U64']['output']>;
  transactions: Array<Transaction>;
  version: BlockVersion;
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

export enum BlockVersion {
  V1 = 'V1',
}

/** Breakpoint, defined as a tuple of contract ID and relative PC offset inside it */
export type Breakpoint = {
  contract: Scalars['ContractId']['input'];
  pc: Scalars['U64']['input'];
};

export type ChainInfo = {
  __typename: 'ChainInfo';
  consensusParameters: ConsensusParameters;
  daHeight: Scalars['U64']['output'];
  gasCosts: GasCosts;
  latestBlock: Block;
  name: Scalars['String']['output'];
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
  /** TxPointer - the height of the block this coin was created in */
  blockCreated: Scalars['U32']['output'];
  owner: Scalars['Address']['output'];
  /** TxPointer - the index of the transaction that created this coin */
  txCreatedIdx: Scalars['U16']['output'];
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

/** The schema analog of the [`coins::CoinType`]. */
export type CoinType = Coin | MessageCoin;

export type Consensus = Genesis | PoAConsensus;

export type ConsensusParameters = {
  __typename: 'ConsensusParameters';
  baseAssetId: Scalars['AssetId']['output'];
  blockGasLimit: Scalars['U64']['output'];
  chainId: Scalars['U64']['output'];
  contractParams: ContractParameters;
  feeParams: FeeParameters;
  gasCosts: GasCosts;
  predicateParams: PredicateParameters;
  privilegedAddress: Scalars['Address']['output'];
  scriptParams: ScriptParameters;
  txParams: TxParameters;
  version: ConsensusParametersVersion;
};

export type ConsensusParametersPurpose = {
  __typename: 'ConsensusParametersPurpose';
  checksum: Scalars['Bytes32']['output'];
  witnessIndex: Scalars['U16']['output'];
};

export enum ConsensusParametersVersion {
  V1 = 'V1',
}

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
  contract: Scalars['ContractId']['output'];
  stateRoot: Scalars['Bytes32']['output'];
};

export type ContractOutput = {
  __typename: 'ContractOutput';
  balanceRoot: Scalars['Bytes32']['output'];
  inputIndex: Scalars['U16']['output'];
  stateRoot: Scalars['Bytes32']['output'];
};

export type ContractParameters = {
  __typename: 'ContractParameters';
  contractMaxSize: Scalars['U64']['output'];
  maxStorageSlots: Scalars['U64']['output'];
  version: ContractParametersVersion;
};

export enum ContractParametersVersion {
  V1 = 'V1',
}

export type DependentCost = HeavyOperation | LightOperation;

export type DryRunFailureStatus = {
  __typename: 'DryRunFailureStatus';
  programState?: Maybe<ProgramState>;
  reason: Scalars['String']['output'];
  receipts: Array<Receipt>;
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
};

export type DryRunSuccessStatus = {
  __typename: 'DryRunSuccessStatus';
  programState?: Maybe<ProgramState>;
  receipts: Array<Receipt>;
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
};

export type DryRunTransactionExecutionStatus = {
  __typename: 'DryRunTransactionExecutionStatus';
  id: Scalars['TransactionId']['output'];
  receipts: Array<Receipt>;
  status: DryRunTransactionStatus;
};

export type DryRunTransactionStatus = DryRunFailureStatus | DryRunSuccessStatus;

export type EstimateGasPrice = {
  __typename: 'EstimateGasPrice';
  gasPrice: Scalars['U64']['output'];
};

export type ExcludeInput = {
  /** Messages to exclude from the selection. */
  messages: Array<Scalars['Nonce']['input']>;
  /** Utxos to exclude from the selection. */
  utxos: Array<Scalars['UtxoId']['input']>;
};

export type FailureStatus = {
  __typename: 'FailureStatus';
  block: Block;
  programState?: Maybe<ProgramState>;
  reason: Scalars['String']['output'];
  receipts: Array<Receipt>;
  time: Scalars['Tai64Timestamp']['output'];
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
  transactionId: Scalars['TransactionId']['output'];
};

export type FeeParameters = {
  __typename: 'FeeParameters';
  gasPerByte: Scalars['U64']['output'];
  gasPriceFactor: Scalars['U64']['output'];
  version: FeeParametersVersion;
};

export enum FeeParametersVersion {
  V1 = 'V1',
}

export type GasCosts = {
  __typename: 'GasCosts';
  add: Scalars['U64']['output'];
  addi: Scalars['U64']['output'];
  aloc: Scalars['U64']['output'];
  alocDependentCost: DependentCost;
  and: Scalars['U64']['output'];
  andi: Scalars['U64']['output'];
  bal: Scalars['U64']['output'];
  bhei: Scalars['U64']['output'];
  bhsh: Scalars['U64']['output'];
  burn: Scalars['U64']['output'];
  call: DependentCost;
  cb: Scalars['U64']['output'];
  ccp: DependentCost;
  cfe: DependentCost;
  cfei: Scalars['U64']['output'];
  cfeiDependentCost: DependentCost;
  cfsi: Scalars['U64']['output'];
  contractRoot: DependentCost;
  croo: DependentCost;
  csiz: DependentCost;
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
  k256: DependentCost;
  lb: Scalars['U64']['output'];
  ldc: DependentCost;
  log: Scalars['U64']['output'];
  logd: DependentCost;
  lt: Scalars['U64']['output'];
  lw: Scalars['U64']['output'];
  mcl: DependentCost;
  mcli: DependentCost;
  mcp: DependentCost;
  mcpi: DependentCost;
  meq: DependentCost;
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
  retd: DependentCost;
  rvrt: Scalars['U64']['output'];
  s256: DependentCost;
  sb: Scalars['U64']['output'];
  scwq: DependentCost;
  sll: Scalars['U64']['output'];
  slli: Scalars['U64']['output'];
  smo: DependentCost;
  srl: Scalars['U64']['output'];
  srli: Scalars['U64']['output'];
  srw: Scalars['U64']['output'];
  srwq: DependentCost;
  stateRoot: DependentCost;
  sub: Scalars['U64']['output'];
  subi: Scalars['U64']['output'];
  sw: Scalars['U64']['output'];
  sww: Scalars['U64']['output'];
  swwq: DependentCost;
  time: Scalars['U64']['output'];
  tr: Scalars['U64']['output'];
  tro: Scalars['U64']['output'];
  version: GasCostsVersion;
  vmInitialization: DependentCost;
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

export enum GasCostsVersion {
  V1 = 'V1',
}

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
  /** The Binary Merkle Tree root of all processed transaction ids. */
  transactionsRoot: Scalars['Bytes32']['output'];
};

export type GroupedInput = {
  __typename: 'GroupedInput';
  assetId?: Maybe<Scalars['AssetId']['output']>;
  contractId?: Maybe<Scalars['ContractId']['output']>;
  data?: Maybe<Scalars['HexString']['output']>;
  inputs?: Maybe<Array<Maybe<Input>>>;
  owner?: Maybe<Scalars['Address']['output']>;
  recipient?: Maybe<Scalars['Address']['output']>;
  sender?: Maybe<Scalars['Address']['output']>;
  totalAmount?: Maybe<Scalars['U64']['output']>;
  type?: Maybe<GroupedInputType>;
};

export enum GroupedInputType {
  InputCoin = 'InputCoin',
  InputContract = 'InputContract',
  InputMessage = 'InputMessage',
}

export type GroupedOutput = {
  __typename: 'GroupedOutput';
  assetId?: Maybe<Scalars['AssetId']['output']>;
  contractId?: Maybe<Scalars['ContractId']['output']>;
  inputIndex?: Maybe<Scalars['Int']['output']>;
  outputs?: Maybe<Array<Maybe<Output>>>;
  recipient?: Maybe<Scalars['Address']['output']>;
  to?: Maybe<Scalars['Address']['output']>;
  totalAmount?: Maybe<Scalars['U64']['output']>;
  type?: Maybe<GroupedOutputType>;
};

export enum GroupedOutputType {
  ChangeOutput = 'ChangeOutput',
  CoinOutput = 'CoinOutput',
  ContractCreated = 'ContractCreated',
  ContractOutput = 'ContractOutput',
  MessageOutput = 'MessageOutput',
  VariableOutput = 'VariableOutput',
}

export type Header = {
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
  version: HeaderVersion;
};

export enum HeaderVersion {
  V1 = 'V1',
}

export type HeavyOperation = {
  __typename: 'HeavyOperation';
  base: Scalars['U64']['output'];
  gasPerUnit: Scalars['U64']['output'];
};

export type Input = InputCoin | InputContract | InputMessage;

export type InputCoin = {
  __typename: 'InputCoin';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  owner: Scalars['Address']['output'];
  predicate: Scalars['HexString']['output'];
  predicateData: Scalars['HexString']['output'];
  predicateGasUsed: Scalars['U64']['output'];
  txPointer: Scalars['TxPointer']['output'];
  utxoId: Scalars['UtxoId']['output'];
  witnessIndex: Scalars['Int']['output'];
};

export type InputContract = {
  __typename: 'InputContract';
  balanceRoot: Scalars['Bytes32']['output'];
  contractId: Scalars['ContractId']['output'];
  stateRoot: Scalars['Bytes32']['output'];
  txPointer: Scalars['TxPointer']['output'];
  utxoId: Scalars['UtxoId']['output'];
};

export type InputMessage = {
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

export type LatestGasPrice = {
  __typename: 'LatestGasPrice';
  blockHeight: Scalars['U32']['output'];
  gasPrice: Scalars['U64']['output'];
};

export type LightOperation = {
  __typename: 'LightOperation';
  base: Scalars['U64']['output'];
  unitsPerGas: Scalars['U64']['output'];
};

export type MerkleProof = {
  __typename: 'MerkleProof';
  proofIndex: Scalars['U64']['output'];
  proofSet: Array<Scalars['Bytes32']['output']>;
};

export type Message = {
  __typename: 'Message';
  amount: Scalars['U64']['output'];
  daHeight: Scalars['U64']['output'];
  data: Scalars['HexString']['output'];
  nonce: Scalars['Nonce']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
};

export type MessageCoin = {
  __typename: 'MessageCoin';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  daHeight: Scalars['U64']['output'];
  nonce: Scalars['Nonce']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
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

export type MessageProof = {
  __typename: 'MessageProof';
  amount: Scalars['U64']['output'];
  blockProof: MerkleProof;
  commitBlockHeader: Header;
  data: Scalars['HexString']['output'];
  messageBlockHeader: Header;
  messageProof: MerkleProof;
  nonce: Scalars['Nonce']['output'];
  recipient: Scalars['Address']['output'];
  sender: Scalars['Address']['output'];
};

export enum MessageState {
  NotFound = 'NOT_FOUND',
  Spent = 'SPENT',
  Unspent = 'UNSPENT',
}

export type MessageStatus = {
  __typename: 'MessageStatus';
  state: MessageState;
};

export type Mutation = {
  __typename: 'Mutation';
  /**
   * Resume execution of the VM instance after a breakpoint.
   * Runs until the next breakpoint or until the transaction completes.
   */
  continueTx: RunResult;
  /** Execute a dry-run of multiple transactions using a fork of current state, no changes are committed. */
  dryRun: Array<DryRunTransactionExecutionStatus>;
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
  startTx: RunResult;
  /**
   * Submits transaction to the `TxPool`.
   *
   * Returns submitted transaction if the transaction is included in the `TxPool` without problems.
   */
  submit: Transaction;
};

export type MutationContinueTxArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDryRunArgs = {
  gasPrice?: InputMaybe<Scalars['U64']['input']>;
  txs: Array<Scalars['HexString']['input']>;
  utxoValidation?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationEndSessionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationExecuteArgs = {
  id: Scalars['ID']['input'];
  op: Scalars['String']['input'];
};

export type MutationProduceBlocksArgs = {
  blocksToProduce: Scalars['U32']['input'];
  startTimestamp?: InputMaybe<Scalars['Tai64Timestamp']['input']>;
};

export type MutationResetArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSetBreakpointArgs = {
  breakpoint: Breakpoint;
  id: Scalars['ID']['input'];
};

export type MutationSetSingleSteppingArgs = {
  enable: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type MutationStartTxArgs = {
  id: Scalars['ID']['input'];
  txJson: Scalars['String']['input'];
};

export type MutationSubmitArgs = {
  tx: Scalars['HexString']['input'];
};

export type NodeInfo = {
  __typename: 'NodeInfo';
  maxDepth: Scalars['U64']['output'];
  maxTx: Scalars['U64']['output'];
  nodeVersion: Scalars['String']['output'];
  peers: Array<PeerInfo>;
  utxoValidation: Scalars['Boolean']['output'];
  vmBacktrace: Scalars['Boolean']['output'];
};

export type Operation = {
  __typename: 'Operation';
  receipts?: Maybe<Array<Maybe<OperationReceipt>>>;
  type?: Maybe<OperationType>;
};

export type OperationReceipt = {
  __typename: 'OperationReceipt';
  item?: Maybe<Receipt>;
  receipts?: Maybe<Array<Maybe<OperationReceipt>>>;
};

export enum OperationType {
  FinalResult = 'FINAL_RESULT',
  FromAccount = 'FROM_ACCOUNT',
  FromContract = 'FROM_CONTRACT',
}

export type Output =
  | ChangeOutput
  | CoinOutput
  | ContractCreated
  | ContractOutput
  | VariableOutput;

/**
 * A separate `Breakpoint` type to be used as an output, as a single
 * type cannot act as both input and output type in async-graphql
 */
export type OutputBreakpoint = {
  __typename: 'OutputBreakpoint';
  contract: Scalars['ContractId']['output'];
  pc: Scalars['U64']['output'];
};

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

export type ParsedTime = {
  __typename: 'ParsedTime';
  fromNow?: Maybe<Scalars['String']['output']>;
  full?: Maybe<Scalars['String']['output']>;
  rawTai64?: Maybe<Scalars['String']['output']>;
  rawUnix?: Maybe<Scalars['String']['output']>;
};

export type PeerInfo = {
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

export type PoAConsensus = {
  __typename: 'PoAConsensus';
  /** Gets the signature of the block produced by `PoA` consensus. */
  signature: Scalars['Signature']['output'];
};

export type Policies = {
  __typename: 'Policies';
  maturity?: Maybe<Scalars['U32']['output']>;
  maxFee?: Maybe<Scalars['U64']['output']>;
  tip?: Maybe<Scalars['U64']['output']>;
  witnessLimit?: Maybe<Scalars['U64']['output']>;
};

export type Predicate = {
  __typename: 'Predicate';
  bytecode: Scalars['HexString']['output'];
  id: Scalars['Address']['output'];
};

export type PredicateParameters = {
  __typename: 'PredicateParameters';
  maxGasPerPredicate: Scalars['U64']['output'];
  maxMessageDataLength: Scalars['U64']['output'];
  maxPredicateDataLength: Scalars['U64']['output'];
  maxPredicateLength: Scalars['U64']['output'];
  version: PredicateParametersVersion;
};

export enum PredicateParametersVersion {
  V1 = 'V1',
}

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
  /** Gets all unspent coins of some `owner` maybe filtered with by `asset_id` per page. */
  coins: CoinConnection;
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
  coinsToSpend: Array<Array<CoinType>>;
  contract?: Maybe<Contract>;
  contractBalance: ContractBalance;
  contractBalances: ContractBalanceConnection;
  estimateGasPrice: EstimateGasPrice;
  /** Estimate the predicate gas for the provided transaction */
  estimatePredicates: Transaction;
  /** Returns true when the GraphQL API is serving requests. */
  health: Scalars['Boolean']['output'];
  latestGasPrice: LatestGasPrice;
  /** Read read a range of memory bytes. */
  memory: Scalars['String']['output'];
  message?: Maybe<Message>;
  messageProof?: Maybe<MessageProof>;
  messageStatus: MessageStatus;
  messages: MessageConnection;
  nodeInfo: NodeInfo;
  predicate?: Maybe<Predicate>;
  /** Read register value by index. */
  register: Scalars['U64']['output'];
  relayedTransactionStatus?: Maybe<RelayedTransactionStatus>;
  search?: Maybe<SearchResult>;
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
  height?: InputMaybe<Scalars['U32']['input']>;
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

export type QueryCoinsToSpendArgs = {
  excludedIds?: InputMaybe<ExcludeInput>;
  owner: Scalars['Address']['input'];
  queryPerAsset: Array<SpendQueryElementInput>;
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

export type QueryEstimateGasPriceArgs = {
  blockHorizon?: InputMaybe<Scalars['U32']['input']>;
};

export type QueryEstimatePredicatesArgs = {
  tx: Scalars['HexString']['input'];
};

export type QueryMemoryArgs = {
  id: Scalars['ID']['input'];
  size: Scalars['U32']['input'];
  start: Scalars['U32']['input'];
};

export type QueryMessageArgs = {
  nonce: Scalars['Nonce']['input'];
};

export type QueryMessageProofArgs = {
  commitBlockHeight?: InputMaybe<Scalars['U32']['input']>;
  commitBlockId?: InputMaybe<Scalars['BlockId']['input']>;
  nonce: Scalars['Nonce']['input'];
  transactionId: Scalars['TransactionId']['input'];
};

export type QueryMessageStatusArgs = {
  nonce: Scalars['Nonce']['input'];
};

export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['Address']['input']>;
};

export type QueryPredicateArgs = {
  address: Scalars['Address']['input'];
};

export type QueryRegisterArgs = {
  id: Scalars['ID']['input'];
  register: Scalars['U32']['input'];
};

export type QueryRelayedTransactionStatusArgs = {
  id: Scalars['RelayedTransactionId']['input'];
};

export type QuerySearchArgs = {
  query: Scalars['String']['input'];
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
  receiptType: ReceiptType;
  recipient?: Maybe<Scalars['Address']['output']>;
  result?: Maybe<Scalars['U64']['output']>;
  sender?: Maybe<Scalars['Address']['output']>;
  subId?: Maybe<Scalars['Bytes32']['output']>;
  to?: Maybe<Scalars['ContractId']['output']>;
  toAddress?: Maybe<Scalars['Address']['output']>;
  val?: Maybe<Scalars['U64']['output']>;
};

export enum ReceiptType {
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
  TransferOut = 'TRANSFER_OUT',
}

export type RelayedTransactionFailed = {
  __typename: 'RelayedTransactionFailed';
  blockHeight: Scalars['U32']['output'];
  failure: Scalars['String']['output'];
};

export type RelayedTransactionStatus = RelayedTransactionFailed;

export enum _ReturnType {
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT',
}

export type RunResult = {
  __typename: 'RunResult';
  breakpoint?: Maybe<OutputBreakpoint>;
  jsonReceipts: Array<Scalars['String']['output']>;
  state: RunState;
};

export enum RunState {
  /** Stopped on a breakpoint */
  Breakpoint = 'BREAKPOINT',
  /** All breakpoints have been processed, and the program has terminated */
  Completed = 'COMPLETED',
}

export type ScriptParameters = {
  __typename: 'ScriptParameters';
  maxScriptDataLength: Scalars['U64']['output'];
  maxScriptLength: Scalars['U64']['output'];
  version: ScriptParametersVersion;
};

export enum ScriptParametersVersion {
  V1 = 'V1',
}

export type SearchAccount = {
  __typename: 'SearchAccount';
  address?: Maybe<Scalars['Address']['output']>;
  transactions?: Maybe<Array<Maybe<SearchTransaction>>>;
};

export type SearchBlock = {
  __typename: 'SearchBlock';
  height?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BlockId']['output']>;
};

export type SearchContract = {
  __typename: 'SearchContract';
  id?: Maybe<Scalars['ContractId']['output']>;
};

export type SearchResult = {
  __typename: 'SearchResult';
  account?: Maybe<SearchAccount>;
  block?: Maybe<SearchBlock>;
  contract?: Maybe<SearchContract>;
  transaction?: Maybe<SearchTransaction>;
};

export type SearchTransaction = {
  __typename: 'SearchTransaction';
  id?: Maybe<Scalars['TransactionId']['output']>;
};

export type SpendQueryElementInput = {
  /** Target amount for the query. */
  amount: Scalars['U64']['input'];
  /** Identifier of the asset to spend. */
  assetId: Scalars['AssetId']['input'];
  /** The maximum number of currencies for selection. */
  max?: InputMaybe<Scalars['U32']['input']>;
};

export type SqueezedOutStatus = {
  __typename: 'SqueezedOutStatus';
  reason: Scalars['String']['output'];
};

export type StateTransitionPurpose = {
  __typename: 'StateTransitionPurpose';
  root: Scalars['Bytes32']['output'];
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
  /** Submits transaction to the `TxPool` and await either confirmation or failure. */
  submitAndAwait: TransactionStatus;
};

export type SubscriptionStatusChangeArgs = {
  id: Scalars['TransactionId']['input'];
};

export type SubscriptionSubmitAndAwaitArgs = {
  tx: Scalars['HexString']['input'];
};

export type SuccessStatus = {
  __typename: 'SuccessStatus';
  block: Block;
  programState?: Maybe<ProgramState>;
  receipts: Array<Receipt>;
  time: Scalars['Tai64Timestamp']['output'];
  totalFee: Scalars['U64']['output'];
  totalGas: Scalars['U64']['output'];
  transactionId: Scalars['TransactionId']['output'];
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
  accountsInvolved?: Maybe<Array<Maybe<TransactionAccount>>>;
  blockHeight?: Maybe<Scalars['String']['output']>;
  bytecodeRoot?: Maybe<Scalars['Bytes32']['output']>;
  bytecodeWitnessIndex?: Maybe<Scalars['U16']['output']>;
  fee?: Maybe<Scalars['U64']['output']>;
  gasUsed?: Maybe<Scalars['U64']['output']>;
  groupedInputs?: Maybe<Array<Maybe<GroupedInput>>>;
  groupedOutputs?: Maybe<Array<Maybe<GroupedOutput>>>;
  id: Scalars['TransactionId']['output'];
  inputAssetIds?: Maybe<Array<Scalars['AssetId']['output']>>;
  inputContract?: Maybe<InputContract>;
  inputContracts?: Maybe<Array<Scalars['ContractId']['output']>>;
  inputs?: Maybe<Array<Input>>;
  isCreate: Scalars['Boolean']['output'];
  isMint: Scalars['Boolean']['output'];
  isPredicate?: Maybe<Scalars['Boolean']['output']>;
  isScript: Scalars['Boolean']['output'];
  isUpgrade: Scalars['Boolean']['output'];
  isUpload: Scalars['Boolean']['output'];
  maturity?: Maybe<Scalars['U32']['output']>;
  mintAmount?: Maybe<Scalars['U64']['output']>;
  mintAssetId?: Maybe<Scalars['AssetId']['output']>;
  mintGasPrice?: Maybe<Scalars['U64']['output']>;
  operations?: Maybe<Array<Maybe<Operation>>>;
  outputContract?: Maybe<ContractOutput>;
  outputs: Array<Output>;
  policies?: Maybe<Policies>;
  proofSet?: Maybe<Array<Scalars['Bytes32']['output']>>;
  /** Return the transaction bytes using canonical encoding */
  rawPayload: Scalars['HexString']['output'];
  receiptsRoot?: Maybe<Scalars['Bytes32']['output']>;
  salt?: Maybe<Scalars['Salt']['output']>;
  script?: Maybe<Scalars['HexString']['output']>;
  scriptData?: Maybe<Scalars['HexString']['output']>;
  scriptGasLimit?: Maybe<Scalars['U64']['output']>;
  status?: Maybe<TransactionStatus>;
  statusType?: Maybe<TransactionStatusType>;
  storageSlots?: Maybe<Array<Scalars['HexString']['output']>>;
  subsectionIndex?: Maybe<Scalars['U16']['output']>;
  subsectionsNumber?: Maybe<Scalars['U16']['output']>;
  time?: Maybe<ParsedTime>;
  title?: Maybe<Scalars['String']['output']>;
  totalAccounts?: Maybe<Scalars['Int']['output']>;
  totalAssets?: Maybe<Scalars['Int']['output']>;
  totalOperations?: Maybe<Scalars['Int']['output']>;
  txPointer?: Maybe<Scalars['TxPointer']['output']>;
  upgradePurpose?: Maybe<UpgradePurpose>;
  witnesses?: Maybe<Array<Scalars['HexString']['output']>>;
};

export type TransactionAccount = {
  __typename: 'TransactionAccount';
  id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<TransactionAccountType>;
};

export enum TransactionAccountType {
  Contract = 'Contract',
  Predicate = 'Predicate',
  Wallet = 'Wallet',
}

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

export type TransactionStatus =
  | FailureStatus
  | SqueezedOutStatus
  | SubmittedStatus
  | SuccessStatus;

export enum TransactionStatusType {
  Failure = 'Failure',
  Submitted = 'Submitted',
  Success = 'Success',
}

export type TxParameters = {
  __typename: 'TxParameters';
  maxBytecodeSubsections: Scalars['U16']['output'];
  maxGasPerTx: Scalars['U64']['output'];
  maxInputs: Scalars['U16']['output'];
  maxOutputs: Scalars['U16']['output'];
  maxSize: Scalars['U64']['output'];
  maxWitnesses: Scalars['U32']['output'];
  version: TxParametersVersion;
};

export enum TxParametersVersion {
  V1 = 'V1',
}

export type UpgradePurpose =
  | ConsensusParametersPurpose
  | StateTransitionPurpose;

export type UtxoItem = {
  __typename: 'UtxoItem';
  amount: Scalars['U64']['output'];
  blockCreated?: Maybe<Scalars['U32']['output']>;
  txCreatedIdx?: Maybe<Scalars['U64']['output']>;
  utxoId: Scalars['UtxoId']['output'];
};

export type VariableOutput = {
  __typename: 'VariableOutput';
  amount: Scalars['U64']['output'];
  assetId: Scalars['AssetId']['output'];
  to: Scalars['Address']['output'];
};

export type ContractItemFragment = {
  __typename: 'Contract';
  id: string;
  bytecode: string;
  salt: string;
};

export type ContractBalanceItemFragment = {
  __typename: 'ContractBalance';
  contract: string;
  amount: string;
  assetId: string;
};

export type ContractBalanceConnectionItemFragment = {
  __typename: 'ContractBalanceConnection';
  pageInfo: {
    __typename: 'PageInfo';
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor?: string | null;
    startCursor?: string | null;
  };
  edges: Array<{
    __typename: 'ContractBalanceEdge';
    cursor: string;
    node: {
      __typename: 'ContractBalance';
      contract: string;
      amount: string;
      assetId: string;
    };
  }>;
};

export type GetAccountTransactionsQueryVariables = Exact<{
  owner: Scalars['Address']['input'];
}>;

export type GetAccountTransactionsQuery = {
  __typename: 'Query';
  transactions: {
    __typename: 'TransactionConnection';
    pageInfo: {
      __typename: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor?: string | null;
      startCursor?: string | null;
    };
    edges: Array<{
      __typename: 'TransactionEdge';
      cursor: string;
      node: {
        __typename: 'Transaction';
        id: string;
        title?: string | null;
        isPredicate?: boolean | null;
        blockHeight?: string | null;
        statusType?: TransactionStatusType | null;
        totalAccounts?: number | null;
        totalAssets?: number | null;
        totalOperations?: number | null;
        gasUsed?: string | null;
        fee?: string | null;
        maturity?: string | null;
        txPointer?: string | null;
        isScript: boolean;
        isCreate: boolean;
        isMint: boolean;
        witnesses?: Array<string> | null;
        receiptsRoot?: string | null;
        script?: string | null;
        scriptData?: string | null;
        bytecodeWitnessIndex?: string | null;
        salt?: string | null;
        storageSlots?: Array<string> | null;
        rawPayload: string;
        mintAmount?: string | null;
        mintAssetId?: string | null;
        inputAssetIds?: Array<string> | null;
        inputContracts?: Array<string> | null;
        time?: {
          __typename: 'ParsedTime';
          fromNow?: string | null;
          full?: string | null;
          rawTai64?: string | null;
          rawUnix?: string | null;
        } | null;
        groupedInputs?: Array<{
          __typename: 'GroupedInput';
          type?: GroupedInputType | null;
          totalAmount?: string | null;
          contractId?: string | null;
          assetId?: string | null;
          sender?: string | null;
          recipient?: string | null;
          data?: string | null;
          owner?: string | null;
          inputs?: Array<
            | {
                __typename: 'InputCoin';
                amount: string;
                assetId: string;
                owner: string;
                predicate: string;
                predicateData: string;
                txPointer: string;
                utxoId: string;
                witnessIndex: number;
              }
            | {
                __typename: 'InputContract';
                utxoId: string;
                balanceRoot: string;
                txPointer: string;
                contractId: string;
              }
            | {
                __typename: 'InputMessage';
                sender: string;
                recipient: string;
                amount: string;
                nonce: string;
                data: string;
                predicate: string;
                predicateData: string;
              }
            | null
          > | null;
        } | null> | null;
        groupedOutputs?: Array<{
          __typename: 'GroupedOutput';
          to?: string | null;
          type?: GroupedOutputType | null;
          totalAmount?: string | null;
          contractId?: string | null;
          assetId?: string | null;
          inputIndex?: number | null;
          recipient?: string | null;
          outputs?: Array<
            | {
                __typename: 'ChangeOutput';
                to: string;
                amount: string;
                assetId: string;
              }
            | {
                __typename: 'CoinOutput';
                to: string;
                amount: string;
                assetId: string;
              }
            | { __typename: 'ContractCreated'; contract: string }
            | {
                __typename: 'ContractOutput';
                inputIndex: string;
                balanceRoot: string;
              }
            | {
                __typename: 'VariableOutput';
                to: string;
                amount: string;
                assetId: string;
              }
            | null
          > | null;
        } | null> | null;
        accountsInvolved?: Array<{
          __typename: 'TransactionAccount';
          id?: string | null;
          type?: TransactionAccountType | null;
        } | null> | null;
        operations?: Array<{
          __typename: 'Operation';
          type?: OperationType | null;
          receipts?: Array<{
            __typename: 'OperationReceipt';
            receipts?: Array<{
              __typename: 'OperationReceipt';
              receipts?: Array<{
                __typename: 'OperationReceipt';
                receipts?: Array<{
                  __typename: 'OperationReceipt';
                  receipts?: Array<{
                    __typename: 'OperationReceipt';
                    item?: {
                      __typename: 'Receipt';
                      id?: string | null;
                      to?: string | null;
                      pc?: string | null;
                      is?: string | null;
                      toAddress?: string | null;
                      amount?: string | null;
                      assetId?: string | null;
                      gas?: string | null;
                      param1?: string | null;
                      param2?: string | null;
                      val?: string | null;
                      ptr?: string | null;
                      digest?: string | null;
                      reason?: string | null;
                      ra?: string | null;
                      rb?: string | null;
                      rc?: string | null;
                      rd?: string | null;
                      len?: string | null;
                      receiptType: ReceiptType;
                      result?: string | null;
                      gasUsed?: string | null;
                      data?: string | null;
                      sender?: string | null;
                      recipient?: string | null;
                      nonce?: string | null;
                      contractId?: string | null;
                      subId?: string | null;
                    } | null;
                  } | null> | null;
                  item?: {
                    __typename: 'Receipt';
                    id?: string | null;
                    to?: string | null;
                    pc?: string | null;
                    is?: string | null;
                    toAddress?: string | null;
                    amount?: string | null;
                    assetId?: string | null;
                    gas?: string | null;
                    param1?: string | null;
                    param2?: string | null;
                    val?: string | null;
                    ptr?: string | null;
                    digest?: string | null;
                    reason?: string | null;
                    ra?: string | null;
                    rb?: string | null;
                    rc?: string | null;
                    rd?: string | null;
                    len?: string | null;
                    receiptType: ReceiptType;
                    result?: string | null;
                    gasUsed?: string | null;
                    data?: string | null;
                    sender?: string | null;
                    recipient?: string | null;
                    nonce?: string | null;
                    contractId?: string | null;
                    subId?: string | null;
                  } | null;
                } | null> | null;
                item?: {
                  __typename: 'Receipt';
                  id?: string | null;
                  to?: string | null;
                  pc?: string | null;
                  is?: string | null;
                  toAddress?: string | null;
                  amount?: string | null;
                  assetId?: string | null;
                  gas?: string | null;
                  param1?: string | null;
                  param2?: string | null;
                  val?: string | null;
                  ptr?: string | null;
                  digest?: string | null;
                  reason?: string | null;
                  ra?: string | null;
                  rb?: string | null;
                  rc?: string | null;
                  rd?: string | null;
                  len?: string | null;
                  receiptType: ReceiptType;
                  result?: string | null;
                  gasUsed?: string | null;
                  data?: string | null;
                  sender?: string | null;
                  recipient?: string | null;
                  nonce?: string | null;
                  contractId?: string | null;
                  subId?: string | null;
                } | null;
              } | null> | null;
              item?: {
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              } | null;
            } | null> | null;
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
        } | null> | null;
        inputContract?: {
          __typename: 'InputContract';
          contractId: string;
        } | null;
        outputContract?: {
          __typename: 'ContractOutput';
          inputIndex: string;
        } | null;
        status?:
          | {
              __typename: 'FailureStatus';
              time: string;
              programState?: {
                __typename: 'ProgramState';
                data: string;
              } | null;
            }
          | { __typename: 'SqueezedOutStatus'; reason: string }
          | { __typename: 'SubmittedStatus'; time: string }
          | {
              __typename: 'SuccessStatus';
              time: string;
              block: {
                __typename: 'Block';
                id: string;
                header: {
                  __typename: 'Header';
                  id: string;
                  height: string;
                  daHeight: string;
                  applicationHash: string;
                  messageReceiptCount: string;
                  time: string;
                };
              };
              receipts: Array<{
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              }>;
              programState?: {
                __typename: 'ProgramState';
                data: string;
              } | null;
            }
          | null;
        inputs?: Array<
          | {
              __typename: 'InputCoin';
              amount: string;
              assetId: string;
              owner: string;
              predicate: string;
              predicateData: string;
              txPointer: string;
              utxoId: string;
              witnessIndex: number;
            }
          | {
              __typename: 'InputContract';
              utxoId: string;
              balanceRoot: string;
              txPointer: string;
              contractId: string;
            }
          | {
              __typename: 'InputMessage';
              sender: string;
              recipient: string;
              amount: string;
              nonce: string;
              data: string;
              predicate: string;
              predicateData: string;
            }
        > | null;
        outputs: Array<
          | {
              __typename: 'ChangeOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | {
              __typename: 'CoinOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | { __typename: 'ContractCreated'; contract: string }
          | {
              __typename: 'ContractOutput';
              inputIndex: string;
              balanceRoot: string;
            }
          | {
              __typename: 'VariableOutput';
              to: string;
              amount: string;
              assetId: string;
            }
        >;
      };
    }>;
  };
};

export type AccountBalanceFragment = {
  __typename: 'Balance';
  assetId: string;
  amount: string;
  owner: string;
  utxos?: Array<{
    __typename: 'UtxoItem';
    utxoId: string;
    amount: string;
    txCreatedIdx?: string | null;
    blockCreated?: string | null;
  } | null> | null;
};

export type GetBalancesQueryVariables = Exact<{
  owner: Scalars['Address']['input'];
}>;

export type GetBalancesQuery = {
  __typename: 'Query';
  balances: {
    __typename: 'BalanceConnection';
    nodes: Array<{
      __typename: 'Balance';
      assetId: string;
      amount: string;
      owner: string;
      utxos?: Array<{
        __typename: 'UtxoItem';
        utxoId: string;
        amount: string;
        txCreatedIdx?: string | null;
        blockCreated?: string | null;
      } | null> | null;
    }>;
  };
};

export type BlockItemFragment = {
  __typename: 'Block';
  totalGasUsed?: string | null;
  id: string;
  time?: {
    __typename: 'ParsedTime';
    fromNow?: string | null;
    full?: string | null;
    rawTai64?: string | null;
    rawUnix?: string | null;
  } | null;
  consensus:
    | { __typename: 'Genesis' }
    | { __typename: 'PoAConsensus'; signature: string };
  header: { __typename: 'Header'; transactionsCount: string; time: string };
  transactions: Array<{
    __typename: 'Transaction';
    id: string;
    title?: string | null;
    isPredicate?: boolean | null;
    blockHeight?: string | null;
    statusType?: TransactionStatusType | null;
    totalAccounts?: number | null;
    totalAssets?: number | null;
    totalOperations?: number | null;
    gasUsed?: string | null;
    fee?: string | null;
    maturity?: string | null;
    txPointer?: string | null;
    isScript: boolean;
    isCreate: boolean;
    isMint: boolean;
    witnesses?: Array<string> | null;
    receiptsRoot?: string | null;
    script?: string | null;
    scriptData?: string | null;
    bytecodeWitnessIndex?: string | null;
    salt?: string | null;
    storageSlots?: Array<string> | null;
    rawPayload: string;
    mintAmount?: string | null;
    mintAssetId?: string | null;
    inputAssetIds?: Array<string> | null;
    inputContracts?: Array<string> | null;
    time?: {
      __typename: 'ParsedTime';
      fromNow?: string | null;
      full?: string | null;
      rawTai64?: string | null;
      rawUnix?: string | null;
    } | null;
    groupedInputs?: Array<{
      __typename: 'GroupedInput';
      type?: GroupedInputType | null;
      totalAmount?: string | null;
      contractId?: string | null;
      assetId?: string | null;
      sender?: string | null;
      recipient?: string | null;
      data?: string | null;
      owner?: string | null;
      inputs?: Array<
        | {
            __typename: 'InputCoin';
            amount: string;
            assetId: string;
            owner: string;
            predicate: string;
            predicateData: string;
            txPointer: string;
            utxoId: string;
            witnessIndex: number;
          }
        | {
            __typename: 'InputContract';
            utxoId: string;
            balanceRoot: string;
            txPointer: string;
            contractId: string;
          }
        | {
            __typename: 'InputMessage';
            sender: string;
            recipient: string;
            amount: string;
            nonce: string;
            data: string;
            predicate: string;
            predicateData: string;
          }
        | null
      > | null;
    } | null> | null;
    groupedOutputs?: Array<{
      __typename: 'GroupedOutput';
      to?: string | null;
      type?: GroupedOutputType | null;
      totalAmount?: string | null;
      contractId?: string | null;
      assetId?: string | null;
      inputIndex?: number | null;
      recipient?: string | null;
      outputs?: Array<
        | {
            __typename: 'ChangeOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | {
            __typename: 'CoinOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | { __typename: 'ContractCreated'; contract: string }
        | {
            __typename: 'ContractOutput';
            inputIndex: string;
            balanceRoot: string;
          }
        | {
            __typename: 'VariableOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | null
      > | null;
    } | null> | null;
    accountsInvolved?: Array<{
      __typename: 'TransactionAccount';
      id?: string | null;
      type?: TransactionAccountType | null;
    } | null> | null;
    operations?: Array<{
      __typename: 'Operation';
      type?: OperationType | null;
      receipts?: Array<{
        __typename: 'OperationReceipt';
        receipts?: Array<{
          __typename: 'OperationReceipt';
          receipts?: Array<{
            __typename: 'OperationReceipt';
            receipts?: Array<{
              __typename: 'OperationReceipt';
              receipts?: Array<{
                __typename: 'OperationReceipt';
                item?: {
                  __typename: 'Receipt';
                  id?: string | null;
                  to?: string | null;
                  pc?: string | null;
                  is?: string | null;
                  toAddress?: string | null;
                  amount?: string | null;
                  assetId?: string | null;
                  gas?: string | null;
                  param1?: string | null;
                  param2?: string | null;
                  val?: string | null;
                  ptr?: string | null;
                  digest?: string | null;
                  reason?: string | null;
                  ra?: string | null;
                  rb?: string | null;
                  rc?: string | null;
                  rd?: string | null;
                  len?: string | null;
                  receiptType: ReceiptType;
                  result?: string | null;
                  gasUsed?: string | null;
                  data?: string | null;
                  sender?: string | null;
                  recipient?: string | null;
                  nonce?: string | null;
                  contractId?: string | null;
                  subId?: string | null;
                } | null;
              } | null> | null;
              item?: {
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              } | null;
            } | null> | null;
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
          item?: {
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          } | null;
        } | null> | null;
        item?: {
          __typename: 'Receipt';
          id?: string | null;
          to?: string | null;
          pc?: string | null;
          is?: string | null;
          toAddress?: string | null;
          amount?: string | null;
          assetId?: string | null;
          gas?: string | null;
          param1?: string | null;
          param2?: string | null;
          val?: string | null;
          ptr?: string | null;
          digest?: string | null;
          reason?: string | null;
          ra?: string | null;
          rb?: string | null;
          rc?: string | null;
          rd?: string | null;
          len?: string | null;
          receiptType: ReceiptType;
          result?: string | null;
          gasUsed?: string | null;
          data?: string | null;
          sender?: string | null;
          recipient?: string | null;
          nonce?: string | null;
          contractId?: string | null;
          subId?: string | null;
        } | null;
      } | null> | null;
    } | null> | null;
    inputContract?: { __typename: 'InputContract'; contractId: string } | null;
    outputContract?: {
      __typename: 'ContractOutput';
      inputIndex: string;
    } | null;
    status?:
      | {
          __typename: 'FailureStatus';
          time: string;
          programState?: { __typename: 'ProgramState'; data: string } | null;
        }
      | { __typename: 'SqueezedOutStatus'; reason: string }
      | { __typename: 'SubmittedStatus'; time: string }
      | {
          __typename: 'SuccessStatus';
          time: string;
          block: {
            __typename: 'Block';
            id: string;
            header: {
              __typename: 'Header';
              id: string;
              height: string;
              daHeight: string;
              applicationHash: string;
              messageReceiptCount: string;
              time: string;
            };
          };
          receipts: Array<{
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          }>;
          programState?: { __typename: 'ProgramState'; data: string } | null;
        }
      | null;
    inputs?: Array<
      | {
          __typename: 'InputCoin';
          amount: string;
          assetId: string;
          owner: string;
          predicate: string;
          predicateData: string;
          txPointer: string;
          utxoId: string;
          witnessIndex: number;
        }
      | {
          __typename: 'InputContract';
          utxoId: string;
          balanceRoot: string;
          txPointer: string;
          contractId: string;
        }
      | {
          __typename: 'InputMessage';
          sender: string;
          recipient: string;
          amount: string;
          nonce: string;
          data: string;
          predicate: string;
          predicateData: string;
        }
    > | null;
    outputs: Array<
      | {
          __typename: 'ChangeOutput';
          to: string;
          amount: string;
          assetId: string;
        }
      | {
          __typename: 'CoinOutput';
          to: string;
          amount: string;
          assetId: string;
        }
      | { __typename: 'ContractCreated'; contract: string }
      | {
          __typename: 'ContractOutput';
          inputIndex: string;
          balanceRoot: string;
        }
      | {
          __typename: 'VariableOutput';
          to: string;
          amount: string;
          assetId: string;
        }
    >;
  }>;
};

export type GetBlockByHeightQueryVariables = Exact<{
  height?: InputMaybe<Scalars['U32']['input']>;
}>;

export type GetBlockByHeightQuery = {
  __typename: 'Query';
  block?: {
    __typename: 'Block';
    totalGasUsed?: string | null;
    id: string;
    time?: {
      __typename: 'ParsedTime';
      fromNow?: string | null;
      full?: string | null;
      rawTai64?: string | null;
      rawUnix?: string | null;
    } | null;
    consensus:
      | { __typename: 'Genesis' }
      | { __typename: 'PoAConsensus'; signature: string };
    header: { __typename: 'Header'; transactionsCount: string; time: string };
    transactions: Array<{
      __typename: 'Transaction';
      id: string;
      title?: string | null;
      isPredicate?: boolean | null;
      blockHeight?: string | null;
      statusType?: TransactionStatusType | null;
      totalAccounts?: number | null;
      totalAssets?: number | null;
      totalOperations?: number | null;
      gasUsed?: string | null;
      fee?: string | null;
      maturity?: string | null;
      txPointer?: string | null;
      isScript: boolean;
      isCreate: boolean;
      isMint: boolean;
      witnesses?: Array<string> | null;
      receiptsRoot?: string | null;
      script?: string | null;
      scriptData?: string | null;
      bytecodeWitnessIndex?: string | null;
      salt?: string | null;
      storageSlots?: Array<string> | null;
      rawPayload: string;
      mintAmount?: string | null;
      mintAssetId?: string | null;
      inputAssetIds?: Array<string> | null;
      inputContracts?: Array<string> | null;
      time?: {
        __typename: 'ParsedTime';
        fromNow?: string | null;
        full?: string | null;
        rawTai64?: string | null;
        rawUnix?: string | null;
      } | null;
      groupedInputs?: Array<{
        __typename: 'GroupedInput';
        type?: GroupedInputType | null;
        totalAmount?: string | null;
        contractId?: string | null;
        assetId?: string | null;
        sender?: string | null;
        recipient?: string | null;
        data?: string | null;
        owner?: string | null;
        inputs?: Array<
          | {
              __typename: 'InputCoin';
              amount: string;
              assetId: string;
              owner: string;
              predicate: string;
              predicateData: string;
              txPointer: string;
              utxoId: string;
              witnessIndex: number;
            }
          | {
              __typename: 'InputContract';
              utxoId: string;
              balanceRoot: string;
              txPointer: string;
              contractId: string;
            }
          | {
              __typename: 'InputMessage';
              sender: string;
              recipient: string;
              amount: string;
              nonce: string;
              data: string;
              predicate: string;
              predicateData: string;
            }
          | null
        > | null;
      } | null> | null;
      groupedOutputs?: Array<{
        __typename: 'GroupedOutput';
        to?: string | null;
        type?: GroupedOutputType | null;
        totalAmount?: string | null;
        contractId?: string | null;
        assetId?: string | null;
        inputIndex?: number | null;
        recipient?: string | null;
        outputs?: Array<
          | {
              __typename: 'ChangeOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | {
              __typename: 'CoinOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | { __typename: 'ContractCreated'; contract: string }
          | {
              __typename: 'ContractOutput';
              inputIndex: string;
              balanceRoot: string;
            }
          | {
              __typename: 'VariableOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | null
        > | null;
      } | null> | null;
      accountsInvolved?: Array<{
        __typename: 'TransactionAccount';
        id?: string | null;
        type?: TransactionAccountType | null;
      } | null> | null;
      operations?: Array<{
        __typename: 'Operation';
        type?: OperationType | null;
        receipts?: Array<{
          __typename: 'OperationReceipt';
          receipts?: Array<{
            __typename: 'OperationReceipt';
            receipts?: Array<{
              __typename: 'OperationReceipt';
              receipts?: Array<{
                __typename: 'OperationReceipt';
                receipts?: Array<{
                  __typename: 'OperationReceipt';
                  item?: {
                    __typename: 'Receipt';
                    id?: string | null;
                    to?: string | null;
                    pc?: string | null;
                    is?: string | null;
                    toAddress?: string | null;
                    amount?: string | null;
                    assetId?: string | null;
                    gas?: string | null;
                    param1?: string | null;
                    param2?: string | null;
                    val?: string | null;
                    ptr?: string | null;
                    digest?: string | null;
                    reason?: string | null;
                    ra?: string | null;
                    rb?: string | null;
                    rc?: string | null;
                    rd?: string | null;
                    len?: string | null;
                    receiptType: ReceiptType;
                    result?: string | null;
                    gasUsed?: string | null;
                    data?: string | null;
                    sender?: string | null;
                    recipient?: string | null;
                    nonce?: string | null;
                    contractId?: string | null;
                    subId?: string | null;
                  } | null;
                } | null> | null;
                item?: {
                  __typename: 'Receipt';
                  id?: string | null;
                  to?: string | null;
                  pc?: string | null;
                  is?: string | null;
                  toAddress?: string | null;
                  amount?: string | null;
                  assetId?: string | null;
                  gas?: string | null;
                  param1?: string | null;
                  param2?: string | null;
                  val?: string | null;
                  ptr?: string | null;
                  digest?: string | null;
                  reason?: string | null;
                  ra?: string | null;
                  rb?: string | null;
                  rc?: string | null;
                  rd?: string | null;
                  len?: string | null;
                  receiptType: ReceiptType;
                  result?: string | null;
                  gasUsed?: string | null;
                  data?: string | null;
                  sender?: string | null;
                  recipient?: string | null;
                  nonce?: string | null;
                  contractId?: string | null;
                  subId?: string | null;
                } | null;
              } | null> | null;
              item?: {
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              } | null;
            } | null> | null;
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
          item?: {
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          } | null;
        } | null> | null;
      } | null> | null;
      inputContract?: {
        __typename: 'InputContract';
        contractId: string;
      } | null;
      outputContract?: {
        __typename: 'ContractOutput';
        inputIndex: string;
      } | null;
      status?:
        | {
            __typename: 'FailureStatus';
            time: string;
            programState?: { __typename: 'ProgramState'; data: string } | null;
          }
        | { __typename: 'SqueezedOutStatus'; reason: string }
        | { __typename: 'SubmittedStatus'; time: string }
        | {
            __typename: 'SuccessStatus';
            time: string;
            block: {
              __typename: 'Block';
              id: string;
              header: {
                __typename: 'Header';
                id: string;
                height: string;
                daHeight: string;
                applicationHash: string;
                messageReceiptCount: string;
                time: string;
              };
            };
            receipts: Array<{
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            }>;
            programState?: { __typename: 'ProgramState'; data: string } | null;
          }
        | null;
      inputs?: Array<
        | {
            __typename: 'InputCoin';
            amount: string;
            assetId: string;
            owner: string;
            predicate: string;
            predicateData: string;
            txPointer: string;
            utxoId: string;
            witnessIndex: number;
          }
        | {
            __typename: 'InputContract';
            utxoId: string;
            balanceRoot: string;
            txPointer: string;
            contractId: string;
          }
        | {
            __typename: 'InputMessage';
            sender: string;
            recipient: string;
            amount: string;
            nonce: string;
            data: string;
            predicate: string;
            predicateData: string;
          }
      > | null;
      outputs: Array<
        | {
            __typename: 'ChangeOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | {
            __typename: 'CoinOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | { __typename: 'ContractCreated'; contract: string }
        | {
            __typename: 'ContractOutput';
            inputIndex: string;
            balanceRoot: string;
          }
        | {
            __typename: 'VariableOutput';
            to: string;
            amount: string;
            assetId: string;
          }
      >;
    }>;
  } | null;
};

export type GetBlockByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['BlockId']['input']>;
}>;

export type GetBlockByIdQuery = {
  __typename: 'Query';
  block?: {
    __typename: 'Block';
    totalGasUsed?: string | null;
    id: string;
    time?: {
      __typename: 'ParsedTime';
      fromNow?: string | null;
      full?: string | null;
      rawTai64?: string | null;
      rawUnix?: string | null;
    } | null;
    consensus:
      | { __typename: 'Genesis' }
      | { __typename: 'PoAConsensus'; signature: string };
    header: { __typename: 'Header'; transactionsCount: string; time: string };
    transactions: Array<{
      __typename: 'Transaction';
      id: string;
      title?: string | null;
      isPredicate?: boolean | null;
      blockHeight?: string | null;
      statusType?: TransactionStatusType | null;
      totalAccounts?: number | null;
      totalAssets?: number | null;
      totalOperations?: number | null;
      gasUsed?: string | null;
      fee?: string | null;
      maturity?: string | null;
      txPointer?: string | null;
      isScript: boolean;
      isCreate: boolean;
      isMint: boolean;
      witnesses?: Array<string> | null;
      receiptsRoot?: string | null;
      script?: string | null;
      scriptData?: string | null;
      bytecodeWitnessIndex?: string | null;
      salt?: string | null;
      storageSlots?: Array<string> | null;
      rawPayload: string;
      mintAmount?: string | null;
      mintAssetId?: string | null;
      inputAssetIds?: Array<string> | null;
      inputContracts?: Array<string> | null;
      time?: {
        __typename: 'ParsedTime';
        fromNow?: string | null;
        full?: string | null;
        rawTai64?: string | null;
        rawUnix?: string | null;
      } | null;
      groupedInputs?: Array<{
        __typename: 'GroupedInput';
        type?: GroupedInputType | null;
        totalAmount?: string | null;
        contractId?: string | null;
        assetId?: string | null;
        sender?: string | null;
        recipient?: string | null;
        data?: string | null;
        owner?: string | null;
        inputs?: Array<
          | {
              __typename: 'InputCoin';
              amount: string;
              assetId: string;
              owner: string;
              predicate: string;
              predicateData: string;
              txPointer: string;
              utxoId: string;
              witnessIndex: number;
            }
          | {
              __typename: 'InputContract';
              utxoId: string;
              balanceRoot: string;
              txPointer: string;
              contractId: string;
            }
          | {
              __typename: 'InputMessage';
              sender: string;
              recipient: string;
              amount: string;
              nonce: string;
              data: string;
              predicate: string;
              predicateData: string;
            }
          | null
        > | null;
      } | null> | null;
      groupedOutputs?: Array<{
        __typename: 'GroupedOutput';
        to?: string | null;
        type?: GroupedOutputType | null;
        totalAmount?: string | null;
        contractId?: string | null;
        assetId?: string | null;
        inputIndex?: number | null;
        recipient?: string | null;
        outputs?: Array<
          | {
              __typename: 'ChangeOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | {
              __typename: 'CoinOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | { __typename: 'ContractCreated'; contract: string }
          | {
              __typename: 'ContractOutput';
              inputIndex: string;
              balanceRoot: string;
            }
          | {
              __typename: 'VariableOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | null
        > | null;
      } | null> | null;
      accountsInvolved?: Array<{
        __typename: 'TransactionAccount';
        id?: string | null;
        type?: TransactionAccountType | null;
      } | null> | null;
      operations?: Array<{
        __typename: 'Operation';
        type?: OperationType | null;
        receipts?: Array<{
          __typename: 'OperationReceipt';
          receipts?: Array<{
            __typename: 'OperationReceipt';
            receipts?: Array<{
              __typename: 'OperationReceipt';
              receipts?: Array<{
                __typename: 'OperationReceipt';
                receipts?: Array<{
                  __typename: 'OperationReceipt';
                  item?: {
                    __typename: 'Receipt';
                    id?: string | null;
                    to?: string | null;
                    pc?: string | null;
                    is?: string | null;
                    toAddress?: string | null;
                    amount?: string | null;
                    assetId?: string | null;
                    gas?: string | null;
                    param1?: string | null;
                    param2?: string | null;
                    val?: string | null;
                    ptr?: string | null;
                    digest?: string | null;
                    reason?: string | null;
                    ra?: string | null;
                    rb?: string | null;
                    rc?: string | null;
                    rd?: string | null;
                    len?: string | null;
                    receiptType: ReceiptType;
                    result?: string | null;
                    gasUsed?: string | null;
                    data?: string | null;
                    sender?: string | null;
                    recipient?: string | null;
                    nonce?: string | null;
                    contractId?: string | null;
                    subId?: string | null;
                  } | null;
                } | null> | null;
                item?: {
                  __typename: 'Receipt';
                  id?: string | null;
                  to?: string | null;
                  pc?: string | null;
                  is?: string | null;
                  toAddress?: string | null;
                  amount?: string | null;
                  assetId?: string | null;
                  gas?: string | null;
                  param1?: string | null;
                  param2?: string | null;
                  val?: string | null;
                  ptr?: string | null;
                  digest?: string | null;
                  reason?: string | null;
                  ra?: string | null;
                  rb?: string | null;
                  rc?: string | null;
                  rd?: string | null;
                  len?: string | null;
                  receiptType: ReceiptType;
                  result?: string | null;
                  gasUsed?: string | null;
                  data?: string | null;
                  sender?: string | null;
                  recipient?: string | null;
                  nonce?: string | null;
                  contractId?: string | null;
                  subId?: string | null;
                } | null;
              } | null> | null;
              item?: {
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              } | null;
            } | null> | null;
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
          item?: {
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          } | null;
        } | null> | null;
      } | null> | null;
      inputContract?: {
        __typename: 'InputContract';
        contractId: string;
      } | null;
      outputContract?: {
        __typename: 'ContractOutput';
        inputIndex: string;
      } | null;
      status?:
        | {
            __typename: 'FailureStatus';
            time: string;
            programState?: { __typename: 'ProgramState'; data: string } | null;
          }
        | { __typename: 'SqueezedOutStatus'; reason: string }
        | { __typename: 'SubmittedStatus'; time: string }
        | {
            __typename: 'SuccessStatus';
            time: string;
            block: {
              __typename: 'Block';
              id: string;
              header: {
                __typename: 'Header';
                id: string;
                height: string;
                daHeight: string;
                applicationHash: string;
                messageReceiptCount: string;
                time: string;
              };
            };
            receipts: Array<{
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            }>;
            programState?: { __typename: 'ProgramState'; data: string } | null;
          }
        | null;
      inputs?: Array<
        | {
            __typename: 'InputCoin';
            amount: string;
            assetId: string;
            owner: string;
            predicate: string;
            predicateData: string;
            txPointer: string;
            utxoId: string;
            witnessIndex: number;
          }
        | {
            __typename: 'InputContract';
            utxoId: string;
            balanceRoot: string;
            txPointer: string;
            contractId: string;
          }
        | {
            __typename: 'InputMessage';
            sender: string;
            recipient: string;
            amount: string;
            nonce: string;
            data: string;
            predicate: string;
            predicateData: string;
          }
      > | null;
      outputs: Array<
        | {
            __typename: 'ChangeOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | {
            __typename: 'CoinOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | { __typename: 'ContractCreated'; contract: string }
        | {
            __typename: 'ContractOutput';
            inputIndex: string;
            balanceRoot: string;
          }
        | {
            __typename: 'VariableOutput';
            to: string;
            amount: string;
            assetId: string;
          }
      >;
    }>;
  } | null;
};

export type GetContractQueryVariables = Exact<{
  id: Scalars['ContractId']['input'];
}>;

export type GetContractQuery = {
  __typename: 'Query';
  contract?: {
    __typename: 'Contract';
    id: string;
    bytecode: string;
    salt: string;
  } | null;
};

export type GetContractBalancesQueryVariables = Exact<{
  id: Scalars['ContractId']['input'];
}>;

export type GetContractBalancesQuery = {
  __typename: 'Query';
  contractBalances: {
    __typename: 'ContractBalanceConnection';
    pageInfo: {
      __typename: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor?: string | null;
      startCursor?: string | null;
    };
    edges: Array<{
      __typename: 'ContractBalanceEdge';
      cursor: string;
      node: {
        __typename: 'ContractBalance';
        contract: string;
        amount: string;
        assetId: string;
      };
    }>;
  };
};

export type GetLastTransactionsQueryVariables = Exact<{
  last?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetLastTransactionsQuery = {
  __typename: 'Query';
  transactions: {
    __typename: 'TransactionConnection';
    pageInfo: {
      __typename: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor?: string | null;
      startCursor?: string | null;
    };
    edges: Array<{
      __typename: 'TransactionEdge';
      cursor: string;
      node: {
        __typename: 'Transaction';
        id: string;
        title?: string | null;
        isPredicate?: boolean | null;
        blockHeight?: string | null;
        statusType?: TransactionStatusType | null;
        totalAccounts?: number | null;
        totalAssets?: number | null;
        totalOperations?: number | null;
        gasUsed?: string | null;
        fee?: string | null;
        maturity?: string | null;
        txPointer?: string | null;
        isScript: boolean;
        isCreate: boolean;
        isMint: boolean;
        witnesses?: Array<string> | null;
        receiptsRoot?: string | null;
        script?: string | null;
        scriptData?: string | null;
        bytecodeWitnessIndex?: string | null;
        salt?: string | null;
        storageSlots?: Array<string> | null;
        rawPayload: string;
        mintAmount?: string | null;
        mintAssetId?: string | null;
        inputAssetIds?: Array<string> | null;
        inputContracts?: Array<string> | null;
        time?: {
          __typename: 'ParsedTime';
          fromNow?: string | null;
          full?: string | null;
          rawTai64?: string | null;
          rawUnix?: string | null;
        } | null;
        groupedInputs?: Array<{
          __typename: 'GroupedInput';
          type?: GroupedInputType | null;
          totalAmount?: string | null;
          contractId?: string | null;
          assetId?: string | null;
          sender?: string | null;
          recipient?: string | null;
          data?: string | null;
          owner?: string | null;
          inputs?: Array<
            | {
                __typename: 'InputCoin';
                amount: string;
                assetId: string;
                owner: string;
                predicate: string;
                predicateData: string;
                txPointer: string;
                utxoId: string;
                witnessIndex: number;
              }
            | {
                __typename: 'InputContract';
                utxoId: string;
                balanceRoot: string;
                txPointer: string;
                contractId: string;
              }
            | {
                __typename: 'InputMessage';
                sender: string;
                recipient: string;
                amount: string;
                nonce: string;
                data: string;
                predicate: string;
                predicateData: string;
              }
            | null
          > | null;
        } | null> | null;
        groupedOutputs?: Array<{
          __typename: 'GroupedOutput';
          to?: string | null;
          type?: GroupedOutputType | null;
          totalAmount?: string | null;
          contractId?: string | null;
          assetId?: string | null;
          inputIndex?: number | null;
          recipient?: string | null;
          outputs?: Array<
            | {
                __typename: 'ChangeOutput';
                to: string;
                amount: string;
                assetId: string;
              }
            | {
                __typename: 'CoinOutput';
                to: string;
                amount: string;
                assetId: string;
              }
            | { __typename: 'ContractCreated'; contract: string }
            | {
                __typename: 'ContractOutput';
                inputIndex: string;
                balanceRoot: string;
              }
            | {
                __typename: 'VariableOutput';
                to: string;
                amount: string;
                assetId: string;
              }
            | null
          > | null;
        } | null> | null;
        accountsInvolved?: Array<{
          __typename: 'TransactionAccount';
          id?: string | null;
          type?: TransactionAccountType | null;
        } | null> | null;
        operations?: Array<{
          __typename: 'Operation';
          type?: OperationType | null;
          receipts?: Array<{
            __typename: 'OperationReceipt';
            receipts?: Array<{
              __typename: 'OperationReceipt';
              receipts?: Array<{
                __typename: 'OperationReceipt';
                receipts?: Array<{
                  __typename: 'OperationReceipt';
                  receipts?: Array<{
                    __typename: 'OperationReceipt';
                    item?: {
                      __typename: 'Receipt';
                      id?: string | null;
                      to?: string | null;
                      pc?: string | null;
                      is?: string | null;
                      toAddress?: string | null;
                      amount?: string | null;
                      assetId?: string | null;
                      gas?: string | null;
                      param1?: string | null;
                      param2?: string | null;
                      val?: string | null;
                      ptr?: string | null;
                      digest?: string | null;
                      reason?: string | null;
                      ra?: string | null;
                      rb?: string | null;
                      rc?: string | null;
                      rd?: string | null;
                      len?: string | null;
                      receiptType: ReceiptType;
                      result?: string | null;
                      gasUsed?: string | null;
                      data?: string | null;
                      sender?: string | null;
                      recipient?: string | null;
                      nonce?: string | null;
                      contractId?: string | null;
                      subId?: string | null;
                    } | null;
                  } | null> | null;
                  item?: {
                    __typename: 'Receipt';
                    id?: string | null;
                    to?: string | null;
                    pc?: string | null;
                    is?: string | null;
                    toAddress?: string | null;
                    amount?: string | null;
                    assetId?: string | null;
                    gas?: string | null;
                    param1?: string | null;
                    param2?: string | null;
                    val?: string | null;
                    ptr?: string | null;
                    digest?: string | null;
                    reason?: string | null;
                    ra?: string | null;
                    rb?: string | null;
                    rc?: string | null;
                    rd?: string | null;
                    len?: string | null;
                    receiptType: ReceiptType;
                    result?: string | null;
                    gasUsed?: string | null;
                    data?: string | null;
                    sender?: string | null;
                    recipient?: string | null;
                    nonce?: string | null;
                    contractId?: string | null;
                    subId?: string | null;
                  } | null;
                } | null> | null;
                item?: {
                  __typename: 'Receipt';
                  id?: string | null;
                  to?: string | null;
                  pc?: string | null;
                  is?: string | null;
                  toAddress?: string | null;
                  amount?: string | null;
                  assetId?: string | null;
                  gas?: string | null;
                  param1?: string | null;
                  param2?: string | null;
                  val?: string | null;
                  ptr?: string | null;
                  digest?: string | null;
                  reason?: string | null;
                  ra?: string | null;
                  rb?: string | null;
                  rc?: string | null;
                  rd?: string | null;
                  len?: string | null;
                  receiptType: ReceiptType;
                  result?: string | null;
                  gasUsed?: string | null;
                  data?: string | null;
                  sender?: string | null;
                  recipient?: string | null;
                  nonce?: string | null;
                  contractId?: string | null;
                  subId?: string | null;
                } | null;
              } | null> | null;
              item?: {
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              } | null;
            } | null> | null;
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
        } | null> | null;
        inputContract?: {
          __typename: 'InputContract';
          contractId: string;
        } | null;
        outputContract?: {
          __typename: 'ContractOutput';
          inputIndex: string;
        } | null;
        status?:
          | {
              __typename: 'FailureStatus';
              time: string;
              programState?: {
                __typename: 'ProgramState';
                data: string;
              } | null;
            }
          | { __typename: 'SqueezedOutStatus'; reason: string }
          | { __typename: 'SubmittedStatus'; time: string }
          | {
              __typename: 'SuccessStatus';
              time: string;
              block: {
                __typename: 'Block';
                id: string;
                header: {
                  __typename: 'Header';
                  id: string;
                  height: string;
                  daHeight: string;
                  applicationHash: string;
                  messageReceiptCount: string;
                  time: string;
                };
              };
              receipts: Array<{
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              }>;
              programState?: {
                __typename: 'ProgramState';
                data: string;
              } | null;
            }
          | null;
        inputs?: Array<
          | {
              __typename: 'InputCoin';
              amount: string;
              assetId: string;
              owner: string;
              predicate: string;
              predicateData: string;
              txPointer: string;
              utxoId: string;
              witnessIndex: number;
            }
          | {
              __typename: 'InputContract';
              utxoId: string;
              balanceRoot: string;
              txPointer: string;
              contractId: string;
            }
          | {
              __typename: 'InputMessage';
              sender: string;
              recipient: string;
              amount: string;
              nonce: string;
              data: string;
              predicate: string;
              predicateData: string;
            }
        > | null;
        outputs: Array<
          | {
              __typename: 'ChangeOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | {
              __typename: 'CoinOutput';
              to: string;
              amount: string;
              assetId: string;
            }
          | { __typename: 'ContractCreated'; contract: string }
          | {
              __typename: 'ContractOutput';
              inputIndex: string;
              balanceRoot: string;
            }
          | {
              __typename: 'VariableOutput';
              to: string;
              amount: string;
              assetId: string;
            }
        >;
      };
    }>;
  };
};

export type GetPredicateQueryVariables = Exact<{
  address: Scalars['Address']['input'];
}>;

export type GetPredicateQuery = {
  __typename: 'Query';
  predicate?: { __typename: 'Predicate'; id: string; bytecode: string } | null;
};

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['TransactionId']['input'];
}>;

export type GetTransactionQuery = {
  __typename: 'Query';
  transaction?: {
    __typename: 'Transaction';
    id: string;
    title?: string | null;
    isPredicate?: boolean | null;
    blockHeight?: string | null;
    statusType?: TransactionStatusType | null;
    totalAccounts?: number | null;
    totalAssets?: number | null;
    totalOperations?: number | null;
    gasUsed?: string | null;
    fee?: string | null;
    maturity?: string | null;
    txPointer?: string | null;
    isScript: boolean;
    isCreate: boolean;
    isMint: boolean;
    witnesses?: Array<string> | null;
    receiptsRoot?: string | null;
    script?: string | null;
    scriptData?: string | null;
    bytecodeWitnessIndex?: string | null;
    salt?: string | null;
    storageSlots?: Array<string> | null;
    rawPayload: string;
    mintAmount?: string | null;
    mintAssetId?: string | null;
    inputAssetIds?: Array<string> | null;
    inputContracts?: Array<string> | null;
    time?: {
      __typename: 'ParsedTime';
      fromNow?: string | null;
      full?: string | null;
      rawTai64?: string | null;
      rawUnix?: string | null;
    } | null;
    groupedInputs?: Array<{
      __typename: 'GroupedInput';
      type?: GroupedInputType | null;
      totalAmount?: string | null;
      contractId?: string | null;
      assetId?: string | null;
      sender?: string | null;
      recipient?: string | null;
      data?: string | null;
      owner?: string | null;
      inputs?: Array<
        | {
            __typename: 'InputCoin';
            amount: string;
            assetId: string;
            owner: string;
            predicate: string;
            predicateData: string;
            txPointer: string;
            utxoId: string;
            witnessIndex: number;
          }
        | {
            __typename: 'InputContract';
            utxoId: string;
            balanceRoot: string;
            txPointer: string;
            contractId: string;
          }
        | {
            __typename: 'InputMessage';
            sender: string;
            recipient: string;
            amount: string;
            nonce: string;
            data: string;
            predicate: string;
            predicateData: string;
          }
        | null
      > | null;
    } | null> | null;
    groupedOutputs?: Array<{
      __typename: 'GroupedOutput';
      to?: string | null;
      type?: GroupedOutputType | null;
      totalAmount?: string | null;
      contractId?: string | null;
      assetId?: string | null;
      inputIndex?: number | null;
      recipient?: string | null;
      outputs?: Array<
        | {
            __typename: 'ChangeOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | {
            __typename: 'CoinOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | { __typename: 'ContractCreated'; contract: string }
        | {
            __typename: 'ContractOutput';
            inputIndex: string;
            balanceRoot: string;
          }
        | {
            __typename: 'VariableOutput';
            to: string;
            amount: string;
            assetId: string;
          }
        | null
      > | null;
    } | null> | null;
    accountsInvolved?: Array<{
      __typename: 'TransactionAccount';
      id?: string | null;
      type?: TransactionAccountType | null;
    } | null> | null;
    operations?: Array<{
      __typename: 'Operation';
      type?: OperationType | null;
      receipts?: Array<{
        __typename: 'OperationReceipt';
        receipts?: Array<{
          __typename: 'OperationReceipt';
          receipts?: Array<{
            __typename: 'OperationReceipt';
            receipts?: Array<{
              __typename: 'OperationReceipt';
              receipts?: Array<{
                __typename: 'OperationReceipt';
                item?: {
                  __typename: 'Receipt';
                  id?: string | null;
                  to?: string | null;
                  pc?: string | null;
                  is?: string | null;
                  toAddress?: string | null;
                  amount?: string | null;
                  assetId?: string | null;
                  gas?: string | null;
                  param1?: string | null;
                  param2?: string | null;
                  val?: string | null;
                  ptr?: string | null;
                  digest?: string | null;
                  reason?: string | null;
                  ra?: string | null;
                  rb?: string | null;
                  rc?: string | null;
                  rd?: string | null;
                  len?: string | null;
                  receiptType: ReceiptType;
                  result?: string | null;
                  gasUsed?: string | null;
                  data?: string | null;
                  sender?: string | null;
                  recipient?: string | null;
                  nonce?: string | null;
                  contractId?: string | null;
                  subId?: string | null;
                } | null;
              } | null> | null;
              item?: {
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              } | null;
            } | null> | null;
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
          item?: {
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          } | null;
        } | null> | null;
        item?: {
          __typename: 'Receipt';
          id?: string | null;
          to?: string | null;
          pc?: string | null;
          is?: string | null;
          toAddress?: string | null;
          amount?: string | null;
          assetId?: string | null;
          gas?: string | null;
          param1?: string | null;
          param2?: string | null;
          val?: string | null;
          ptr?: string | null;
          digest?: string | null;
          reason?: string | null;
          ra?: string | null;
          rb?: string | null;
          rc?: string | null;
          rd?: string | null;
          len?: string | null;
          receiptType: ReceiptType;
          result?: string | null;
          gasUsed?: string | null;
          data?: string | null;
          sender?: string | null;
          recipient?: string | null;
          nonce?: string | null;
          contractId?: string | null;
          subId?: string | null;
        } | null;
      } | null> | null;
    } | null> | null;
    inputContract?: { __typename: 'InputContract'; contractId: string } | null;
    outputContract?: {
      __typename: 'ContractOutput';
      inputIndex: string;
    } | null;
    status?:
      | {
          __typename: 'FailureStatus';
          time: string;
          programState?: { __typename: 'ProgramState'; data: string } | null;
        }
      | { __typename: 'SqueezedOutStatus'; reason: string }
      | { __typename: 'SubmittedStatus'; time: string }
      | {
          __typename: 'SuccessStatus';
          time: string;
          block: {
            __typename: 'Block';
            id: string;
            header: {
              __typename: 'Header';
              id: string;
              height: string;
              daHeight: string;
              applicationHash: string;
              messageReceiptCount: string;
              time: string;
            };
          };
          receipts: Array<{
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          }>;
          programState?: { __typename: 'ProgramState'; data: string } | null;
        }
      | null;
    inputs?: Array<
      | {
          __typename: 'InputCoin';
          amount: string;
          assetId: string;
          owner: string;
          predicate: string;
          predicateData: string;
          txPointer: string;
          utxoId: string;
          witnessIndex: number;
        }
      | {
          __typename: 'InputContract';
          utxoId: string;
          balanceRoot: string;
          txPointer: string;
          contractId: string;
        }
      | {
          __typename: 'InputMessage';
          sender: string;
          recipient: string;
          amount: string;
          nonce: string;
          data: string;
          predicate: string;
          predicateData: string;
        }
    > | null;
    outputs: Array<
      | {
          __typename: 'ChangeOutput';
          to: string;
          amount: string;
          assetId: string;
        }
      | {
          __typename: 'CoinOutput';
          to: string;
          amount: string;
          assetId: string;
        }
      | { __typename: 'ContractCreated'; contract: string }
      | {
          __typename: 'ContractOutput';
          inputIndex: string;
          balanceRoot: string;
        }
      | {
          __typename: 'VariableOutput';
          to: string;
          amount: string;
          assetId: string;
        }
    >;
  } | null;
};

export type SearchQueryQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;

export type SearchQueryQuery = {
  __typename: 'Query';
  search?: {
    __typename: 'SearchResult';
    account?: {
      __typename: 'SearchAccount';
      address?: string | null;
      transactions?: Array<{
        __typename: 'SearchTransaction';
        id?: string | null;
      } | null> | null;
    } | null;
    contract?: { __typename: 'SearchContract'; id?: string | null } | null;
    block?: {
      __typename: 'SearchBlock';
      id?: string | null;
      height?: string | null;
    } | null;
    transaction?: {
      __typename: 'SearchTransaction';
      id?: string | null;
    } | null;
  } | null;
};

type TransactionStatus_FailureStatus_Fragment = {
  __typename: 'FailureStatus';
  time: string;
  programState?: { __typename: 'ProgramState'; data: string } | null;
};

type TransactionStatus_SqueezedOutStatus_Fragment = {
  __typename: 'SqueezedOutStatus';
  reason: string;
};

type TransactionStatus_SubmittedStatus_Fragment = {
  __typename: 'SubmittedStatus';
  time: string;
};

type TransactionStatus_SuccessStatus_Fragment = {
  __typename: 'SuccessStatus';
  time: string;
  block: {
    __typename: 'Block';
    id: string;
    header: {
      __typename: 'Header';
      id: string;
      height: string;
      daHeight: string;
      applicationHash: string;
      messageReceiptCount: string;
      time: string;
    };
  };
  receipts: Array<{
    __typename: 'Receipt';
    id?: string | null;
    to?: string | null;
    pc?: string | null;
    is?: string | null;
    toAddress?: string | null;
    amount?: string | null;
    assetId?: string | null;
    gas?: string | null;
    param1?: string | null;
    param2?: string | null;
    val?: string | null;
    ptr?: string | null;
    digest?: string | null;
    reason?: string | null;
    ra?: string | null;
    rb?: string | null;
    rc?: string | null;
    rd?: string | null;
    len?: string | null;
    receiptType: ReceiptType;
    result?: string | null;
    gasUsed?: string | null;
    data?: string | null;
    sender?: string | null;
    recipient?: string | null;
    nonce?: string | null;
    contractId?: string | null;
    subId?: string | null;
  }>;
  programState?: { __typename: 'ProgramState'; data: string } | null;
};

export type TransactionStatusFragment =
  | TransactionStatus_FailureStatus_Fragment
  | TransactionStatus_SqueezedOutStatus_Fragment
  | TransactionStatus_SubmittedStatus_Fragment
  | TransactionStatus_SuccessStatus_Fragment;

type TransactionInput_InputCoin_Fragment = {
  __typename: 'InputCoin';
  amount: string;
  assetId: string;
  owner: string;
  predicate: string;
  predicateData: string;
  txPointer: string;
  utxoId: string;
  witnessIndex: number;
};

type TransactionInput_InputContract_Fragment = {
  __typename: 'InputContract';
  utxoId: string;
  balanceRoot: string;
  txPointer: string;
  contractId: string;
};

type TransactionInput_InputMessage_Fragment = {
  __typename: 'InputMessage';
  sender: string;
  recipient: string;
  amount: string;
  nonce: string;
  data: string;
  predicate: string;
  predicateData: string;
};

export type TransactionInputFragment =
  | TransactionInput_InputCoin_Fragment
  | TransactionInput_InputContract_Fragment
  | TransactionInput_InputMessage_Fragment;

type TransactionOutput_ChangeOutput_Fragment = {
  __typename: 'ChangeOutput';
  to: string;
  amount: string;
  assetId: string;
};

type TransactionOutput_CoinOutput_Fragment = {
  __typename: 'CoinOutput';
  to: string;
  amount: string;
  assetId: string;
};

type TransactionOutput_ContractCreated_Fragment = {
  __typename: 'ContractCreated';
  contract: string;
};

type TransactionOutput_ContractOutput_Fragment = {
  __typename: 'ContractOutput';
  inputIndex: string;
  balanceRoot: string;
};

type TransactionOutput_VariableOutput_Fragment = {
  __typename: 'VariableOutput';
  to: string;
  amount: string;
  assetId: string;
};

export type TransactionOutputFragment =
  | TransactionOutput_ChangeOutput_Fragment
  | TransactionOutput_CoinOutput_Fragment
  | TransactionOutput_ContractCreated_Fragment
  | TransactionOutput_ContractOutput_Fragment
  | TransactionOutput_VariableOutput_Fragment;

export type TransactionReceiptFragment = {
  __typename: 'Receipt';
  id?: string | null;
  to?: string | null;
  pc?: string | null;
  is?: string | null;
  toAddress?: string | null;
  amount?: string | null;
  assetId?: string | null;
  gas?: string | null;
  param1?: string | null;
  param2?: string | null;
  val?: string | null;
  ptr?: string | null;
  digest?: string | null;
  reason?: string | null;
  ra?: string | null;
  rb?: string | null;
  rc?: string | null;
  rd?: string | null;
  len?: string | null;
  receiptType: ReceiptType;
  result?: string | null;
  gasUsed?: string | null;
  data?: string | null;
  sender?: string | null;
  recipient?: string | null;
  nonce?: string | null;
  contractId?: string | null;
  subId?: string | null;
};

export type InnerReceiptItemFragment = {
  __typename: 'OperationReceipt';
  item?: {
    __typename: 'Receipt';
    id?: string | null;
    to?: string | null;
    pc?: string | null;
    is?: string | null;
    toAddress?: string | null;
    amount?: string | null;
    assetId?: string | null;
    gas?: string | null;
    param1?: string | null;
    param2?: string | null;
    val?: string | null;
    ptr?: string | null;
    digest?: string | null;
    reason?: string | null;
    ra?: string | null;
    rb?: string | null;
    rc?: string | null;
    rd?: string | null;
    len?: string | null;
    receiptType: ReceiptType;
    result?: string | null;
    gasUsed?: string | null;
    data?: string | null;
    sender?: string | null;
    recipient?: string | null;
    nonce?: string | null;
    contractId?: string | null;
    subId?: string | null;
  } | null;
};

export type OperationReceiptItemFragment = {
  __typename: 'OperationReceipt';
  receipts?: Array<{
    __typename: 'OperationReceipt';
    receipts?: Array<{
      __typename: 'OperationReceipt';
      receipts?: Array<{
        __typename: 'OperationReceipt';
        item?: {
          __typename: 'Receipt';
          id?: string | null;
          to?: string | null;
          pc?: string | null;
          is?: string | null;
          toAddress?: string | null;
          amount?: string | null;
          assetId?: string | null;
          gas?: string | null;
          param1?: string | null;
          param2?: string | null;
          val?: string | null;
          ptr?: string | null;
          digest?: string | null;
          reason?: string | null;
          ra?: string | null;
          rb?: string | null;
          rc?: string | null;
          rd?: string | null;
          len?: string | null;
          receiptType: ReceiptType;
          result?: string | null;
          gasUsed?: string | null;
          data?: string | null;
          sender?: string | null;
          recipient?: string | null;
          nonce?: string | null;
          contractId?: string | null;
          subId?: string | null;
        } | null;
      } | null> | null;
      item?: {
        __typename: 'Receipt';
        id?: string | null;
        to?: string | null;
        pc?: string | null;
        is?: string | null;
        toAddress?: string | null;
        amount?: string | null;
        assetId?: string | null;
        gas?: string | null;
        param1?: string | null;
        param2?: string | null;
        val?: string | null;
        ptr?: string | null;
        digest?: string | null;
        reason?: string | null;
        ra?: string | null;
        rb?: string | null;
        rc?: string | null;
        rd?: string | null;
        len?: string | null;
        receiptType: ReceiptType;
        result?: string | null;
        gasUsed?: string | null;
        data?: string | null;
        sender?: string | null;
        recipient?: string | null;
        nonce?: string | null;
        contractId?: string | null;
        subId?: string | null;
      } | null;
    } | null> | null;
    item?: {
      __typename: 'Receipt';
      id?: string | null;
      to?: string | null;
      pc?: string | null;
      is?: string | null;
      toAddress?: string | null;
      amount?: string | null;
      assetId?: string | null;
      gas?: string | null;
      param1?: string | null;
      param2?: string | null;
      val?: string | null;
      ptr?: string | null;
      digest?: string | null;
      reason?: string | null;
      ra?: string | null;
      rb?: string | null;
      rc?: string | null;
      rd?: string | null;
      len?: string | null;
      receiptType: ReceiptType;
      result?: string | null;
      gasUsed?: string | null;
      data?: string | null;
      sender?: string | null;
      recipient?: string | null;
      nonce?: string | null;
      contractId?: string | null;
      subId?: string | null;
    } | null;
  } | null> | null;
  item?: {
    __typename: 'Receipt';
    id?: string | null;
    to?: string | null;
    pc?: string | null;
    is?: string | null;
    toAddress?: string | null;
    amount?: string | null;
    assetId?: string | null;
    gas?: string | null;
    param1?: string | null;
    param2?: string | null;
    val?: string | null;
    ptr?: string | null;
    digest?: string | null;
    reason?: string | null;
    ra?: string | null;
    rb?: string | null;
    rc?: string | null;
    rd?: string | null;
    len?: string | null;
    receiptType: ReceiptType;
    result?: string | null;
    gasUsed?: string | null;
    data?: string | null;
    sender?: string | null;
    recipient?: string | null;
    nonce?: string | null;
    contractId?: string | null;
    subId?: string | null;
  } | null;
};

export type OperationItemFragment = {
  __typename: 'Operation';
  type?: OperationType | null;
  receipts?: Array<{
    __typename: 'OperationReceipt';
    receipts?: Array<{
      __typename: 'OperationReceipt';
      receipts?: Array<{
        __typename: 'OperationReceipt';
        receipts?: Array<{
          __typename: 'OperationReceipt';
          receipts?: Array<{
            __typename: 'OperationReceipt';
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
          item?: {
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          } | null;
        } | null> | null;
        item?: {
          __typename: 'Receipt';
          id?: string | null;
          to?: string | null;
          pc?: string | null;
          is?: string | null;
          toAddress?: string | null;
          amount?: string | null;
          assetId?: string | null;
          gas?: string | null;
          param1?: string | null;
          param2?: string | null;
          val?: string | null;
          ptr?: string | null;
          digest?: string | null;
          reason?: string | null;
          ra?: string | null;
          rb?: string | null;
          rc?: string | null;
          rd?: string | null;
          len?: string | null;
          receiptType: ReceiptType;
          result?: string | null;
          gasUsed?: string | null;
          data?: string | null;
          sender?: string | null;
          recipient?: string | null;
          nonce?: string | null;
          contractId?: string | null;
          subId?: string | null;
        } | null;
      } | null> | null;
      item?: {
        __typename: 'Receipt';
        id?: string | null;
        to?: string | null;
        pc?: string | null;
        is?: string | null;
        toAddress?: string | null;
        amount?: string | null;
        assetId?: string | null;
        gas?: string | null;
        param1?: string | null;
        param2?: string | null;
        val?: string | null;
        ptr?: string | null;
        digest?: string | null;
        reason?: string | null;
        ra?: string | null;
        rb?: string | null;
        rc?: string | null;
        rd?: string | null;
        len?: string | null;
        receiptType: ReceiptType;
        result?: string | null;
        gasUsed?: string | null;
        data?: string | null;
        sender?: string | null;
        recipient?: string | null;
        nonce?: string | null;
        contractId?: string | null;
        subId?: string | null;
      } | null;
    } | null> | null;
    item?: {
      __typename: 'Receipt';
      id?: string | null;
      to?: string | null;
      pc?: string | null;
      is?: string | null;
      toAddress?: string | null;
      amount?: string | null;
      assetId?: string | null;
      gas?: string | null;
      param1?: string | null;
      param2?: string | null;
      val?: string | null;
      ptr?: string | null;
      digest?: string | null;
      reason?: string | null;
      ra?: string | null;
      rb?: string | null;
      rc?: string | null;
      rd?: string | null;
      len?: string | null;
      receiptType: ReceiptType;
      result?: string | null;
      gasUsed?: string | null;
      data?: string | null;
      sender?: string | null;
      recipient?: string | null;
      nonce?: string | null;
      contractId?: string | null;
      subId?: string | null;
    } | null;
  } | null> | null;
};

export type TransactionItemFragment = {
  __typename: 'Transaction';
  id: string;
  title?: string | null;
  isPredicate?: boolean | null;
  blockHeight?: string | null;
  statusType?: TransactionStatusType | null;
  totalAccounts?: number | null;
  totalAssets?: number | null;
  totalOperations?: number | null;
  gasUsed?: string | null;
  fee?: string | null;
  maturity?: string | null;
  txPointer?: string | null;
  isScript: boolean;
  isCreate: boolean;
  isMint: boolean;
  witnesses?: Array<string> | null;
  receiptsRoot?: string | null;
  script?: string | null;
  scriptData?: string | null;
  bytecodeWitnessIndex?: string | null;
  salt?: string | null;
  storageSlots?: Array<string> | null;
  rawPayload: string;
  mintAmount?: string | null;
  mintAssetId?: string | null;
  inputAssetIds?: Array<string> | null;
  inputContracts?: Array<string> | null;
  time?: {
    __typename: 'ParsedTime';
    fromNow?: string | null;
    full?: string | null;
    rawTai64?: string | null;
    rawUnix?: string | null;
  } | null;
  groupedInputs?: Array<{
    __typename: 'GroupedInput';
    type?: GroupedInputType | null;
    totalAmount?: string | null;
    contractId?: string | null;
    assetId?: string | null;
    sender?: string | null;
    recipient?: string | null;
    data?: string | null;
    owner?: string | null;
    inputs?: Array<
      | {
          __typename: 'InputCoin';
          amount: string;
          assetId: string;
          owner: string;
          predicate: string;
          predicateData: string;
          txPointer: string;
          utxoId: string;
          witnessIndex: number;
        }
      | {
          __typename: 'InputContract';
          utxoId: string;
          balanceRoot: string;
          txPointer: string;
          contractId: string;
        }
      | {
          __typename: 'InputMessage';
          sender: string;
          recipient: string;
          amount: string;
          nonce: string;
          data: string;
          predicate: string;
          predicateData: string;
        }
      | null
    > | null;
  } | null> | null;
  groupedOutputs?: Array<{
    __typename: 'GroupedOutput';
    to?: string | null;
    type?: GroupedOutputType | null;
    totalAmount?: string | null;
    contractId?: string | null;
    assetId?: string | null;
    inputIndex?: number | null;
    recipient?: string | null;
    outputs?: Array<
      | {
          __typename: 'ChangeOutput';
          to: string;
          amount: string;
          assetId: string;
        }
      | {
          __typename: 'CoinOutput';
          to: string;
          amount: string;
          assetId: string;
        }
      | { __typename: 'ContractCreated'; contract: string }
      | {
          __typename: 'ContractOutput';
          inputIndex: string;
          balanceRoot: string;
        }
      | {
          __typename: 'VariableOutput';
          to: string;
          amount: string;
          assetId: string;
        }
      | null
    > | null;
  } | null> | null;
  accountsInvolved?: Array<{
    __typename: 'TransactionAccount';
    id?: string | null;
    type?: TransactionAccountType | null;
  } | null> | null;
  operations?: Array<{
    __typename: 'Operation';
    type?: OperationType | null;
    receipts?: Array<{
      __typename: 'OperationReceipt';
      receipts?: Array<{
        __typename: 'OperationReceipt';
        receipts?: Array<{
          __typename: 'OperationReceipt';
          receipts?: Array<{
            __typename: 'OperationReceipt';
            receipts?: Array<{
              __typename: 'OperationReceipt';
              item?: {
                __typename: 'Receipt';
                id?: string | null;
                to?: string | null;
                pc?: string | null;
                is?: string | null;
                toAddress?: string | null;
                amount?: string | null;
                assetId?: string | null;
                gas?: string | null;
                param1?: string | null;
                param2?: string | null;
                val?: string | null;
                ptr?: string | null;
                digest?: string | null;
                reason?: string | null;
                ra?: string | null;
                rb?: string | null;
                rc?: string | null;
                rd?: string | null;
                len?: string | null;
                receiptType: ReceiptType;
                result?: string | null;
                gasUsed?: string | null;
                data?: string | null;
                sender?: string | null;
                recipient?: string | null;
                nonce?: string | null;
                contractId?: string | null;
                subId?: string | null;
              } | null;
            } | null> | null;
            item?: {
              __typename: 'Receipt';
              id?: string | null;
              to?: string | null;
              pc?: string | null;
              is?: string | null;
              toAddress?: string | null;
              amount?: string | null;
              assetId?: string | null;
              gas?: string | null;
              param1?: string | null;
              param2?: string | null;
              val?: string | null;
              ptr?: string | null;
              digest?: string | null;
              reason?: string | null;
              ra?: string | null;
              rb?: string | null;
              rc?: string | null;
              rd?: string | null;
              len?: string | null;
              receiptType: ReceiptType;
              result?: string | null;
              gasUsed?: string | null;
              data?: string | null;
              sender?: string | null;
              recipient?: string | null;
              nonce?: string | null;
              contractId?: string | null;
              subId?: string | null;
            } | null;
          } | null> | null;
          item?: {
            __typename: 'Receipt';
            id?: string | null;
            to?: string | null;
            pc?: string | null;
            is?: string | null;
            toAddress?: string | null;
            amount?: string | null;
            assetId?: string | null;
            gas?: string | null;
            param1?: string | null;
            param2?: string | null;
            val?: string | null;
            ptr?: string | null;
            digest?: string | null;
            reason?: string | null;
            ra?: string | null;
            rb?: string | null;
            rc?: string | null;
            rd?: string | null;
            len?: string | null;
            receiptType: ReceiptType;
            result?: string | null;
            gasUsed?: string | null;
            data?: string | null;
            sender?: string | null;
            recipient?: string | null;
            nonce?: string | null;
            contractId?: string | null;
            subId?: string | null;
          } | null;
        } | null> | null;
        item?: {
          __typename: 'Receipt';
          id?: string | null;
          to?: string | null;
          pc?: string | null;
          is?: string | null;
          toAddress?: string | null;
          amount?: string | null;
          assetId?: string | null;
          gas?: string | null;
          param1?: string | null;
          param2?: string | null;
          val?: string | null;
          ptr?: string | null;
          digest?: string | null;
          reason?: string | null;
          ra?: string | null;
          rb?: string | null;
          rc?: string | null;
          rd?: string | null;
          len?: string | null;
          receiptType: ReceiptType;
          result?: string | null;
          gasUsed?: string | null;
          data?: string | null;
          sender?: string | null;
          recipient?: string | null;
          nonce?: string | null;
          contractId?: string | null;
          subId?: string | null;
        } | null;
      } | null> | null;
      item?: {
        __typename: 'Receipt';
        id?: string | null;
        to?: string | null;
        pc?: string | null;
        is?: string | null;
        toAddress?: string | null;
        amount?: string | null;
        assetId?: string | null;
        gas?: string | null;
        param1?: string | null;
        param2?: string | null;
        val?: string | null;
        ptr?: string | null;
        digest?: string | null;
        reason?: string | null;
        ra?: string | null;
        rb?: string | null;
        rc?: string | null;
        rd?: string | null;
        len?: string | null;
        receiptType: ReceiptType;
        result?: string | null;
        gasUsed?: string | null;
        data?: string | null;
        sender?: string | null;
        recipient?: string | null;
        nonce?: string | null;
        contractId?: string | null;
        subId?: string | null;
      } | null;
    } | null> | null;
  } | null> | null;
  inputContract?: { __typename: 'InputContract'; contractId: string } | null;
  outputContract?: { __typename: 'ContractOutput'; inputIndex: string } | null;
  status?:
    | {
        __typename: 'FailureStatus';
        time: string;
        programState?: { __typename: 'ProgramState'; data: string } | null;
      }
    | { __typename: 'SqueezedOutStatus'; reason: string }
    | { __typename: 'SubmittedStatus'; time: string }
    | {
        __typename: 'SuccessStatus';
        time: string;
        block: {
          __typename: 'Block';
          id: string;
          header: {
            __typename: 'Header';
            id: string;
            height: string;
            daHeight: string;
            applicationHash: string;
            messageReceiptCount: string;
            time: string;
          };
        };
        receipts: Array<{
          __typename: 'Receipt';
          id?: string | null;
          to?: string | null;
          pc?: string | null;
          is?: string | null;
          toAddress?: string | null;
          amount?: string | null;
          assetId?: string | null;
          gas?: string | null;
          param1?: string | null;
          param2?: string | null;
          val?: string | null;
          ptr?: string | null;
          digest?: string | null;
          reason?: string | null;
          ra?: string | null;
          rb?: string | null;
          rc?: string | null;
          rd?: string | null;
          len?: string | null;
          receiptType: ReceiptType;
          result?: string | null;
          gasUsed?: string | null;
          data?: string | null;
          sender?: string | null;
          recipient?: string | null;
          nonce?: string | null;
          contractId?: string | null;
          subId?: string | null;
        }>;
        programState?: { __typename: 'ProgramState'; data: string } | null;
      }
    | null;
  inputs?: Array<
    | {
        __typename: 'InputCoin';
        amount: string;
        assetId: string;
        owner: string;
        predicate: string;
        predicateData: string;
        txPointer: string;
        utxoId: string;
        witnessIndex: number;
      }
    | {
        __typename: 'InputContract';
        utxoId: string;
        balanceRoot: string;
        txPointer: string;
        contractId: string;
      }
    | {
        __typename: 'InputMessage';
        sender: string;
        recipient: string;
        amount: string;
        nonce: string;
        data: string;
        predicate: string;
        predicateData: string;
      }
  > | null;
  outputs: Array<
    | {
        __typename: 'ChangeOutput';
        to: string;
        amount: string;
        assetId: string;
      }
    | { __typename: 'CoinOutput'; to: string; amount: string; assetId: string }
    | { __typename: 'ContractCreated'; contract: string }
    | { __typename: 'ContractOutput'; inputIndex: string; balanceRoot: string }
    | {
        __typename: 'VariableOutput';
        to: string;
        amount: string;
        assetId: string;
      }
  >;
};

export const ContractItemFragmentDoc = gql`
    fragment ContractItem on Contract {
  id
  bytecode
  salt
}
    `;
export const ContractBalanceItemFragmentDoc = gql`
    fragment ContractBalanceItem on ContractBalance {
  contract
  amount
  assetId
}
    `;
export const ContractBalanceConnectionItemFragmentDoc = gql`
    fragment ContractBalanceConnectionItem on ContractBalanceConnection {
  pageInfo {
    hasNextPage
    hasPreviousPage
    endCursor
    startCursor
  }
  edges {
    cursor
    node {
      ...ContractBalanceItem
    }
  }
}
    ${ContractBalanceItemFragmentDoc}`;
export const AccountBalanceFragmentDoc = gql`
    fragment AccountBalance on Balance {
  __typename
  assetId
  amount
  owner
  utxos {
    __typename
    utxoId
    amount
    txCreatedIdx
    blockCreated
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
    receipts {
      ...TransactionReceipt
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
    ${TransactionReceiptFragmentDoc}`;
export const TransactionItemFragmentDoc = gql`
    fragment TransactionItem on Transaction {
  id
  title
  time {
    fromNow
    full
    rawTai64
    rawUnix
  }
  groupedInputs {
    type
    totalAmount
    inputs {
      ...TransactionInput
    }
    contractId
    assetId
    sender
    recipient
    data
    owner
  }
  groupedOutputs {
    to
    type
    totalAmount
    outputs {
      ...TransactionOutput
    }
    contractId
    assetId
    inputIndex
    recipient
  }
  accountsInvolved {
    id
    type
  }
  operations {
    ...OperationItem
  }
  isPredicate
  blockHeight
  statusType
  totalAccounts
  totalAssets
  totalOperations
  gasUsed
  fee
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
    ${TransactionInputFragmentDoc}
${TransactionOutputFragmentDoc}
${OperationItemFragmentDoc}
${TransactionStatusFragmentDoc}`;
export const BlockItemFragmentDoc = gql`
    fragment BlockItem on Block {
  time {
    fromNow
    full
    rawTai64
    rawUnix
  }
  totalGasUsed
  id
  consensus {
    __typename
    ... on PoAConsensus {
      signature
    }
  }
  header {
    transactionsCount
    time
  }
  transactions {
    ...TransactionItem
  }
}
    ${TransactionItemFragmentDoc}`;
export const GetAccountTransactionsDocument = gql`
    query getAccountTransactions($owner: Address!) {
  transactions: transactionsByOwner(first: 30, owner: $owner) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        ...TransactionItem
      }
    }
  }
}
    ${TransactionItemFragmentDoc}`;
export const GetBalancesDocument = gql`
    query getBalances($owner: Address!) {
  balances(first: 100, filter: {owner: $owner}) {
    nodes {
      ...AccountBalance
    }
  }
}
    ${AccountBalanceFragmentDoc}`;
export const GetBlockByHeightDocument = gql`
    query getBlockByHeight($height: U32) {
  block(height: $height) {
    ...BlockItem
  }
}
    ${BlockItemFragmentDoc}`;
export const GetBlockByIdDocument = gql`
    query getBlockById($id: BlockId) {
  block(id: $id) {
    ...BlockItem
  }
}
    ${BlockItemFragmentDoc}`;
export const GetContractDocument = gql`
    query getContract($id: ContractId!) {
  contract(id: $id) {
    ...ContractItem
  }
}
    ${ContractItemFragmentDoc}`;
export const GetContractBalancesDocument = gql`
    query getContractBalances($id: ContractId!) {
  contractBalances(filter: {contract: $id}, first: 1000) {
    ...ContractBalanceConnectionItem
  }
}
    ${ContractBalanceConnectionItemFragmentDoc}`;
export const GetLastTransactionsDocument = gql`
    query getLastTransactions($last: Int, $first: Int, $after: String, $before: String) {
  transactions(last: $last, first: $first, after: $after, before: $before) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        ...TransactionItem
      }
    }
  }
}
    ${TransactionItemFragmentDoc}`;
export const GetPredicateDocument = gql`
    query getPredicate($address: Address!) {
  predicate(address: $address) {
    id
    bytecode
  }
}
    `;
export const GetTransactionDocument = gql`
    query getTransaction($id: TransactionId!) {
  transaction(id: $id) {
    ...TransactionItem
  }
}
    ${TransactionItemFragmentDoc}`;
export const SearchQueryDocument = gql`
    query searchQuery($search: String!) {
  search(query: $search) {
    account {
      address
      transactions {
        id
      }
    }
    contract {
      id
    }
    block {
      id
      height
    }
    transaction {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();
const GetAccountTransactionsDocumentString = print(
  GetAccountTransactionsDocument,
);
const GetBalancesDocumentString = print(GetBalancesDocument);
const GetBlockByHeightDocumentString = print(GetBlockByHeightDocument);
const GetBlockByIdDocumentString = print(GetBlockByIdDocument);
const GetContractDocumentString = print(GetContractDocument);
const GetContractBalancesDocumentString = print(GetContractBalancesDocument);
const GetLastTransactionsDocumentString = print(GetLastTransactionsDocument);
const GetPredicateDocumentString = print(GetPredicateDocument);
const GetTransactionDocumentString = print(GetTransactionDocument);
const SearchQueryDocumentString = print(SearchQueryDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    getAccountTransactions(
      variables: GetAccountTransactionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetAccountTransactionsQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetAccountTransactionsQuery>(
            GetAccountTransactionsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getAccountTransactions',
        'query',
        variables,
      );
    },
    getBalances(
      variables: GetBalancesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetBalancesQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetBalancesQuery>(
            GetBalancesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getBalances',
        'query',
        variables,
      );
    },
    getBlockByHeight(
      variables?: GetBlockByHeightQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetBlockByHeightQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetBlockByHeightQuery>(
            GetBlockByHeightDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getBlockByHeight',
        'query',
        variables,
      );
    },
    getBlockById(
      variables?: GetBlockByIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetBlockByIdQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetBlockByIdQuery>(
            GetBlockByIdDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getBlockById',
        'query',
        variables,
      );
    },
    getContract(
      variables: GetContractQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetContractQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetContractQuery>(
            GetContractDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getContract',
        'query',
        variables,
      );
    },
    getContractBalances(
      variables: GetContractBalancesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetContractBalancesQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetContractBalancesQuery>(
            GetContractBalancesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getContractBalances',
        'query',
        variables,
      );
    },
    getLastTransactions(
      variables?: GetLastTransactionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetLastTransactionsQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetLastTransactionsQuery>(
            GetLastTransactionsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getLastTransactions',
        'query',
        variables,
      );
    },
    getPredicate(
      variables: GetPredicateQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetPredicateQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetPredicateQuery>(
            GetPredicateDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getPredicate',
        'query',
        variables,
      );
    },
    getTransaction(
      variables: GetTransactionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GetTransactionQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetTransactionQuery>(
            GetTransactionDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getTransaction',
        'query',
        variables,
      );
    },
    searchQuery(
      variables: SearchQueryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SearchQueryQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SearchQueryQuery>(
            SearchQueryDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'searchQuery',
        'query',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
