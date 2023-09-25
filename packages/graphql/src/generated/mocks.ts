import {
  Account,
  Balance,
  BalanceConnection,
  BalanceEdge,
  BalanceFilterInput,
  Block,
  BlockConnection,
  BlockEdge,
  ChainInfo,
  ChangeOutput,
  Coin,
  CoinConnection,
  CoinEdge,
  CoinFilterInput,
  CoinOutput,
  ConsensusParameters,
  Contract,
  ContractBalance,
  ContractBalanceConnection,
  ContractBalanceEdge,
  ContractBalanceFilterInput,
  ContractCreated,
  ContractOutput,
  ExcludeInput,
  FailureStatus,
  Genesis,
  Header,
  InputCoin,
  InputContract,
  InputMessage,
  Message,
  MessageConnection,
  MessageEdge,
  MessageOutput,
  MessageProof,
  Mutation,
  NodeInfo,
  PageInfo,
  PoAConsensus,
  ProgramState,
  Query,
  Receipt,
  SpendQueryElementInput,
  SqueezedOutStatus,
  SubmittedStatus,
  Subscription,
  SuccessStatus,
  TimeParameters,
  Token,
  Transaction,
  TransactionConnection,
  TransactionEdge,
  VariableOutput,
  CoinStatus,
  MessageStatus,
  ReceiptType,
  _ReturnType as ReturnType,
  TransactionStatusType,
  TransactionTitle,
} from './graphql';

export const anAccount = (
  overrides?: Partial<Account>,
): { __typename: 'Account' } & Account => {
  return {
    __typename: 'Account',
    address:
      overrides && overrides.hasOwnProperty('address')
        ? overrides.address!
        : 'quam',
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
    url:
      overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'cumque',
  };
};

export const aBalance = (
  overrides?: Partial<Balance>,
): { __typename: 'Balance' } & Balance => {
  return {
    __typename: 'Balance',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'eaque',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'ullam',
    owner:
      overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'qui',
  };
};

export const aBalanceConnection = (
  overrides?: Partial<BalanceConnection>,
): { __typename: 'BalanceConnection' } & BalanceConnection => {
  return {
    __typename: 'BalanceConnection',
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [aBalanceEdge()],
    nodes:
      overrides && overrides.hasOwnProperty('nodes')
        ? overrides.nodes!
        : [aBalance()],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : aPageInfo(),
  };
};

export const aBalanceEdge = (
  overrides?: Partial<BalanceEdge>,
): { __typename: 'BalanceEdge' } & BalanceEdge => {
  return {
    __typename: 'BalanceEdge',
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'rerum',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : aBalance(),
  };
};

export const aBalanceFilterInput = (
  overrides?: Partial<BalanceFilterInput>,
): BalanceFilterInput => {
  return {
    owner:
      overrides && overrides.hasOwnProperty('owner')
        ? overrides.owner!
        : 'minima',
  };
};

export const aBlock = (
  overrides?: Partial<Block>,
): { __typename: 'Block' } & Block => {
  return {
    __typename: 'Block',
    consensus:
      overrides && overrides.hasOwnProperty('consensus')
        ? overrides.consensus!
        : aGenesis(),
    header:
      overrides && overrides.hasOwnProperty('header')
        ? overrides.header!
        : aHeader(),
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'nobis',
    transactions:
      overrides && overrides.hasOwnProperty('transactions')
        ? overrides.transactions!
        : [aTransaction()],
  };
};

export const aBlockConnection = (
  overrides?: Partial<BlockConnection>,
): { __typename: 'BlockConnection' } & BlockConnection => {
  return {
    __typename: 'BlockConnection',
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [aBlockEdge()],
    nodes:
      overrides && overrides.hasOwnProperty('nodes')
        ? overrides.nodes!
        : [aBlock()],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : aPageInfo(),
  };
};

export const aBlockEdge = (
  overrides?: Partial<BlockEdge>,
): { __typename: 'BlockEdge' } & BlockEdge => {
  return {
    __typename: 'BlockEdge',
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'distinctio',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : aBlock(),
  };
};

export const aChainInfo = (
  overrides?: Partial<ChainInfo>,
): { __typename: 'ChainInfo' } & ChainInfo => {
  return {
    __typename: 'ChainInfo',
    baseChainHeight:
      overrides && overrides.hasOwnProperty('baseChainHeight')
        ? overrides.baseChainHeight!
        : 'similique',
    consensusParameters:
      overrides && overrides.hasOwnProperty('consensusParameters')
        ? overrides.consensusParameters!
        : aConsensusParameters(),
    latestBlock:
      overrides && overrides.hasOwnProperty('latestBlock')
        ? overrides.latestBlock!
        : aBlock(),
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'quam',
    peerCount:
      overrides && overrides.hasOwnProperty('peerCount')
        ? overrides.peerCount!
        : 4337,
  };
};

export const aChangeOutput = (
  overrides?: Partial<ChangeOutput>,
): { __typename: 'ChangeOutput' } & ChangeOutput => {
  return {
    __typename: 'ChangeOutput',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'officiis',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'ea',
    to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'commodi',
  };
};

export const aCoin = (
  overrides?: Partial<Coin>,
): { __typename: 'Coin' } & Coin => {
  return {
    __typename: 'Coin',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'officiis',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'aut',
    blockCreated:
      overrides && overrides.hasOwnProperty('blockCreated')
        ? overrides.blockCreated!
        : 'ipsa',
    maturity:
      overrides && overrides.hasOwnProperty('maturity')
        ? overrides.maturity!
        : 'odit',
    owner:
      overrides && overrides.hasOwnProperty('owner')
        ? overrides.owner!
        : 'nobis',
    status:
      overrides && overrides.hasOwnProperty('status')
        ? overrides.status!
        : CoinStatus.Spent,
    utxoId:
      overrides && overrides.hasOwnProperty('utxoId')
        ? overrides.utxoId!
        : 'non',
  };
};

export const aCoinConnection = (
  overrides?: Partial<CoinConnection>,
): { __typename: 'CoinConnection' } & CoinConnection => {
  return {
    __typename: 'CoinConnection',
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [aCoinEdge()],
    nodes:
      overrides && overrides.hasOwnProperty('nodes')
        ? overrides.nodes!
        : [aCoin()],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : aPageInfo(),
  };
};

export const aCoinEdge = (
  overrides?: Partial<CoinEdge>,
): { __typename: 'CoinEdge' } & CoinEdge => {
  return {
    __typename: 'CoinEdge',
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'similique',
    node:
      overrides && overrides.hasOwnProperty('node') ? overrides.node! : aCoin(),
  };
};

export const aCoinFilterInput = (
  overrides?: Partial<CoinFilterInput>,
): CoinFilterInput => {
  return {
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'sunt',
    owner:
      overrides && overrides.hasOwnProperty('owner')
        ? overrides.owner!
        : 'voluptatem',
  };
};

export const aCoinOutput = (
  overrides?: Partial<CoinOutput>,
): { __typename: 'CoinOutput' } & CoinOutput => {
  return {
    __typename: 'CoinOutput',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'et',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'illum',
    to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'magnam',
  };
};

export const aConsensusParameters = (
  overrides?: Partial<ConsensusParameters>,
): { __typename: 'ConsensusParameters' } & ConsensusParameters => {
  return {
    __typename: 'ConsensusParameters',
    contractMaxSize:
      overrides && overrides.hasOwnProperty('contractMaxSize')
        ? overrides.contractMaxSize!
        : 'recusandae',
    gasPerByte:
      overrides && overrides.hasOwnProperty('gasPerByte')
        ? overrides.gasPerByte!
        : 'quibusdam',
    gasPriceFactor:
      overrides && overrides.hasOwnProperty('gasPriceFactor')
        ? overrides.gasPriceFactor!
        : 'et',
    maxGasPerTx:
      overrides && overrides.hasOwnProperty('maxGasPerTx')
        ? overrides.maxGasPerTx!
        : 'maiores',
    maxInputs:
      overrides && overrides.hasOwnProperty('maxInputs')
        ? overrides.maxInputs!
        : 'error',
    maxMessageDataLength:
      overrides && overrides.hasOwnProperty('maxMessageDataLength')
        ? overrides.maxMessageDataLength!
        : 'ut',
    maxOutputs:
      overrides && overrides.hasOwnProperty('maxOutputs')
        ? overrides.maxOutputs!
        : 'voluptate',
    maxPredicateDataLength:
      overrides && overrides.hasOwnProperty('maxPredicateDataLength')
        ? overrides.maxPredicateDataLength!
        : 'quis',
    maxPredicateLength:
      overrides && overrides.hasOwnProperty('maxPredicateLength')
        ? overrides.maxPredicateLength!
        : 'ex',
    maxScriptDataLength:
      overrides && overrides.hasOwnProperty('maxScriptDataLength')
        ? overrides.maxScriptDataLength!
        : 'nobis',
    maxScriptLength:
      overrides && overrides.hasOwnProperty('maxScriptLength')
        ? overrides.maxScriptLength!
        : 'aut',
    maxStorageSlots:
      overrides && overrides.hasOwnProperty('maxStorageSlots')
        ? overrides.maxStorageSlots!
        : 'qui',
    maxWitnesses:
      overrides && overrides.hasOwnProperty('maxWitnesses')
        ? overrides.maxWitnesses!
        : 'quisquam',
  };
};

export const aContract = (
  overrides?: Partial<Contract>,
): { __typename: 'Contract' } & Contract => {
  return {
    __typename: 'Contract',
    bytecode:
      overrides && overrides.hasOwnProperty('bytecode')
        ? overrides.bytecode!
        : 'ipsam',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'sequi',
    salt:
      overrides && overrides.hasOwnProperty('salt')
        ? overrides.salt!
        : 'fugiat',
  };
};

export const aContractBalance = (
  overrides?: Partial<ContractBalance>,
): { __typename: 'ContractBalance' } & ContractBalance => {
  return {
    __typename: 'ContractBalance',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'culpa',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'et',
    contract:
      overrides && overrides.hasOwnProperty('contract')
        ? overrides.contract!
        : 'eius',
  };
};

export const aContractBalanceConnection = (
  overrides?: Partial<ContractBalanceConnection>,
): { __typename: 'ContractBalanceConnection' } & ContractBalanceConnection => {
  return {
    __typename: 'ContractBalanceConnection',
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [aContractBalanceEdge()],
    nodes:
      overrides && overrides.hasOwnProperty('nodes')
        ? overrides.nodes!
        : [aContractBalance()],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : aPageInfo(),
  };
};

export const aContractBalanceEdge = (
  overrides?: Partial<ContractBalanceEdge>,
): { __typename: 'ContractBalanceEdge' } & ContractBalanceEdge => {
  return {
    __typename: 'ContractBalanceEdge',
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'velit',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : aContractBalance(),
  };
};

export const aContractBalanceFilterInput = (
  overrides?: Partial<ContractBalanceFilterInput>,
): ContractBalanceFilterInput => {
  return {
    contract:
      overrides && overrides.hasOwnProperty('contract')
        ? overrides.contract!
        : 'officia',
  };
};

export const aContractCreated = (
  overrides?: Partial<ContractCreated>,
): { __typename: 'ContractCreated' } & ContractCreated => {
  return {
    __typename: 'ContractCreated',
    contract:
      overrides && overrides.hasOwnProperty('contract')
        ? overrides.contract!
        : aContract(),
    stateRoot:
      overrides && overrides.hasOwnProperty('stateRoot')
        ? overrides.stateRoot!
        : 'ipsum',
  };
};

export const aContractOutput = (
  overrides?: Partial<ContractOutput>,
): { __typename: 'ContractOutput' } & ContractOutput => {
  return {
    __typename: 'ContractOutput',
    balanceRoot:
      overrides && overrides.hasOwnProperty('balanceRoot')
        ? overrides.balanceRoot!
        : 'aut',
    inputIndex:
      overrides && overrides.hasOwnProperty('inputIndex')
        ? overrides.inputIndex!
        : 3397,
    stateRoot:
      overrides && overrides.hasOwnProperty('stateRoot')
        ? overrides.stateRoot!
        : 'et',
  };
};

export const anExcludeInput = (
  overrides?: Partial<ExcludeInput>,
): ExcludeInput => {
  return {
    messages:
      overrides && overrides.hasOwnProperty('messages')
        ? overrides.messages!
        : ['nihil'],
    utxos:
      overrides && overrides.hasOwnProperty('utxos')
        ? overrides.utxos!
        : ['est'],
  };
};

export const aFailureStatus = (
  overrides?: Partial<FailureStatus>,
): { __typename: 'FailureStatus' } & FailureStatus => {
  return {
    __typename: 'FailureStatus',
    block:
      overrides && overrides.hasOwnProperty('block')
        ? overrides.block!
        : aBlock(),
    programState:
      overrides && overrides.hasOwnProperty('programState')
        ? overrides.programState!
        : aProgramState(),
    reason:
      overrides && overrides.hasOwnProperty('reason')
        ? overrides.reason!
        : 'commodi',
    time:
      overrides && overrides.hasOwnProperty('time')
        ? overrides.time!
        : 1365172147,
  };
};

export const aGenesis = (
  overrides?: Partial<Genesis>,
): { __typename: 'Genesis' } & Genesis => {
  return {
    __typename: 'Genesis',
    chainConfigHash:
      overrides && overrides.hasOwnProperty('chainConfigHash')
        ? overrides.chainConfigHash!
        : 'nemo',
    coinsRoot:
      overrides && overrides.hasOwnProperty('coinsRoot')
        ? overrides.coinsRoot!
        : 'veritatis',
    contractsRoot:
      overrides && overrides.hasOwnProperty('contractsRoot')
        ? overrides.contractsRoot!
        : 'non',
    messagesRoot:
      overrides && overrides.hasOwnProperty('messagesRoot')
        ? overrides.messagesRoot!
        : 'possimus',
  };
};

export const aHeader = (
  overrides?: Partial<Header>,
): { __typename: 'Header' } & Header => {
  return {
    __typename: 'Header',
    applicationHash:
      overrides && overrides.hasOwnProperty('applicationHash')
        ? overrides.applicationHash!
        : 'sunt',
    daHeight:
      overrides && overrides.hasOwnProperty('daHeight')
        ? overrides.daHeight!
        : 'molestias',
    height:
      overrides && overrides.hasOwnProperty('height')
        ? overrides.height!
        : 'ut',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'eos',
    outputMessagesCount:
      overrides && overrides.hasOwnProperty('outputMessagesCount')
        ? overrides.outputMessagesCount!
        : 'cum',
    outputMessagesRoot:
      overrides && overrides.hasOwnProperty('outputMessagesRoot')
        ? overrides.outputMessagesRoot!
        : 'excepturi',
    prevRoot:
      overrides && overrides.hasOwnProperty('prevRoot')
        ? overrides.prevRoot!
        : 'dignissimos',
    time:
      overrides && overrides.hasOwnProperty('time')
        ? overrides.time!
        : 871463606,
    transactionsCount:
      overrides && overrides.hasOwnProperty('transactionsCount')
        ? overrides.transactionsCount!
        : 'perferendis',
    transactionsRoot:
      overrides && overrides.hasOwnProperty('transactionsRoot')
        ? overrides.transactionsRoot!
        : 'expedita',
  };
};

export const anInputCoin = (
  overrides?: Partial<InputCoin>,
): { __typename: 'InputCoin' } & InputCoin => {
  return {
    __typename: 'InputCoin',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'assumenda',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'ut',
    maturity:
      overrides && overrides.hasOwnProperty('maturity')
        ? overrides.maturity!
        : 'minima',
    owner:
      overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'aut',
    predicate:
      overrides && overrides.hasOwnProperty('predicate')
        ? overrides.predicate!
        : 'dolores',
    predicateData:
      overrides && overrides.hasOwnProperty('predicateData')
        ? overrides.predicateData!
        : 'nemo',
    txPointer:
      overrides && overrides.hasOwnProperty('txPointer')
        ? overrides.txPointer!
        : 'rerum',
    utxoId:
      overrides && overrides.hasOwnProperty('utxoId')
        ? overrides.utxoId!
        : 'fugit',
    witnessIndex:
      overrides && overrides.hasOwnProperty('witnessIndex')
        ? overrides.witnessIndex!
        : 8295,
  };
};

export const anInputContract = (
  overrides?: Partial<InputContract>,
): { __typename: 'InputContract' } & InputContract => {
  return {
    __typename: 'InputContract',
    balanceRoot:
      overrides && overrides.hasOwnProperty('balanceRoot')
        ? overrides.balanceRoot!
        : 'iure',
    contract:
      overrides && overrides.hasOwnProperty('contract')
        ? overrides.contract!
        : aContract(),
    stateRoot:
      overrides && overrides.hasOwnProperty('stateRoot')
        ? overrides.stateRoot!
        : 'aperiam',
    txPointer:
      overrides && overrides.hasOwnProperty('txPointer')
        ? overrides.txPointer!
        : 'et',
    utxoId:
      overrides && overrides.hasOwnProperty('utxoId')
        ? overrides.utxoId!
        : 'sit',
  };
};

export const anInputMessage = (
  overrides?: Partial<InputMessage>,
): { __typename: 'InputMessage' } & InputMessage => {
  return {
    __typename: 'InputMessage',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'ut',
    data:
      overrides && overrides.hasOwnProperty('data') ? overrides.data! : 'nihil',
    messageId:
      overrides && overrides.hasOwnProperty('messageId')
        ? overrides.messageId!
        : 'unde',
    nonce:
      overrides && overrides.hasOwnProperty('nonce')
        ? overrides.nonce!
        : 'quis',
    predicate:
      overrides && overrides.hasOwnProperty('predicate')
        ? overrides.predicate!
        : 'amet',
    predicateData:
      overrides && overrides.hasOwnProperty('predicateData')
        ? overrides.predicateData!
        : 'voluptatem',
    recipient:
      overrides && overrides.hasOwnProperty('recipient')
        ? overrides.recipient!
        : 'ad',
    sender:
      overrides && overrides.hasOwnProperty('sender')
        ? overrides.sender!
        : 'voluptatibus',
    witnessIndex:
      overrides && overrides.hasOwnProperty('witnessIndex')
        ? overrides.witnessIndex!
        : 4160,
  };
};

export const aMessage = (
  overrides?: Partial<Message>,
): { __typename: 'Message' } & Message => {
  return {
    __typename: 'Message',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'cumque',
    daHeight:
      overrides && overrides.hasOwnProperty('daHeight')
        ? overrides.daHeight!
        : 'debitis',
    data:
      overrides && overrides.hasOwnProperty('data') ? overrides.data! : 'est',
    messageId:
      overrides && overrides.hasOwnProperty('messageId')
        ? overrides.messageId!
        : 'est',
    nonce:
      overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'a',
    recipient:
      overrides && overrides.hasOwnProperty('recipient')
        ? overrides.recipient!
        : 'voluptates',
    sender:
      overrides && overrides.hasOwnProperty('sender')
        ? overrides.sender!
        : 'nobis',
    status:
      overrides && overrides.hasOwnProperty('status')
        ? overrides.status!
        : MessageStatus.Spent,
  };
};

export const aMessageConnection = (
  overrides?: Partial<MessageConnection>,
): { __typename: 'MessageConnection' } & MessageConnection => {
  return {
    __typename: 'MessageConnection',
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [aMessageEdge()],
    nodes:
      overrides && overrides.hasOwnProperty('nodes')
        ? overrides.nodes!
        : [aMessage()],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : aPageInfo(),
  };
};

export const aMessageEdge = (
  overrides?: Partial<MessageEdge>,
): { __typename: 'MessageEdge' } & MessageEdge => {
  return {
    __typename: 'MessageEdge',
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'iste',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : aMessage(),
  };
};

export const aMessageOutput = (
  overrides?: Partial<MessageOutput>,
): { __typename: 'MessageOutput' } & MessageOutput => {
  return {
    __typename: 'MessageOutput',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'eaque',
    recipient:
      overrides && overrides.hasOwnProperty('recipient')
        ? overrides.recipient!
        : 'fugit',
  };
};

export const aMessageProof = (
  overrides?: Partial<MessageProof>,
): { __typename: 'MessageProof' } & MessageProof => {
  return {
    __typename: 'MessageProof',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'dolores',
    data:
      overrides && overrides.hasOwnProperty('data')
        ? overrides.data!
        : 'laboriosam',
    header:
      overrides && overrides.hasOwnProperty('header')
        ? overrides.header!
        : aHeader(),
    nonce:
      overrides && overrides.hasOwnProperty('nonce')
        ? overrides.nonce!
        : 'voluptatem',
    proofIndex:
      overrides && overrides.hasOwnProperty('proofIndex')
        ? overrides.proofIndex!
        : 'error',
    proofSet:
      overrides && overrides.hasOwnProperty('proofSet')
        ? overrides.proofSet!
        : ['aut'],
    recipient:
      overrides && overrides.hasOwnProperty('recipient')
        ? overrides.recipient!
        : 'iure',
    sender:
      overrides && overrides.hasOwnProperty('sender')
        ? overrides.sender!
        : 'hic',
    signature:
      overrides && overrides.hasOwnProperty('signature')
        ? overrides.signature!
        : 'rerum',
  };
};

export const aMutation = (
  overrides?: Partial<Mutation>,
): { __typename: 'Mutation' } & Mutation => {
  return {
    __typename: 'Mutation',
    dryRun:
      overrides && overrides.hasOwnProperty('dryRun')
        ? overrides.dryRun!
        : [aReceipt()],
    produceBlocks:
      overrides && overrides.hasOwnProperty('produceBlocks')
        ? overrides.produceBlocks!
        : 'non',
    submit:
      overrides && overrides.hasOwnProperty('submit')
        ? overrides.submit!
        : aTransaction(),
  };
};

export const aNodeInfo = (
  overrides?: Partial<NodeInfo>,
): { __typename: 'NodeInfo' } & NodeInfo => {
  return {
    __typename: 'NodeInfo',
    maxDepth:
      overrides && overrides.hasOwnProperty('maxDepth')
        ? overrides.maxDepth!
        : 'optio',
    maxTx:
      overrides && overrides.hasOwnProperty('maxTx')
        ? overrides.maxTx!
        : 'quia',
    minGasPrice:
      overrides && overrides.hasOwnProperty('minGasPrice')
        ? overrides.minGasPrice!
        : 'quia',
    nodeVersion:
      overrides && overrides.hasOwnProperty('nodeVersion')
        ? overrides.nodeVersion!
        : 'placeat',
    utxoValidation:
      overrides && overrides.hasOwnProperty('utxoValidation')
        ? overrides.utxoValidation!
        : false,
    vmBacktrace:
      overrides && overrides.hasOwnProperty('vmBacktrace')
        ? overrides.vmBacktrace!
        : false,
  };
};

export const aPageInfo = (
  overrides?: Partial<PageInfo>,
): { __typename: 'PageInfo' } & PageInfo => {
  return {
    __typename: 'PageInfo',
    endCursor:
      overrides && overrides.hasOwnProperty('endCursor')
        ? overrides.endCursor!
        : 'id',
    hasNextPage:
      overrides && overrides.hasOwnProperty('hasNextPage')
        ? overrides.hasNextPage!
        : true,
    hasPreviousPage:
      overrides && overrides.hasOwnProperty('hasPreviousPage')
        ? overrides.hasPreviousPage!
        : false,
    startCursor:
      overrides && overrides.hasOwnProperty('startCursor')
        ? overrides.startCursor!
        : 'eum',
  };
};

export const aPoAConsensus = (
  overrides?: Partial<PoAConsensus>,
): { __typename: 'PoAConsensus' } & PoAConsensus => {
  return {
    __typename: 'PoAConsensus',
    signature:
      overrides && overrides.hasOwnProperty('signature')
        ? overrides.signature!
        : 'labore',
  };
};

export const aProgramState = (
  overrides?: Partial<ProgramState>,
): { __typename: 'ProgramState' } & ProgramState => {
  return {
    __typename: 'ProgramState',
    data:
      overrides && overrides.hasOwnProperty('data') ? overrides.data! : 'et',
    returnType:
      overrides && overrides.hasOwnProperty('returnType')
        ? overrides.returnType!
        : ReturnType.Return,
  };
};

export const aQuery = (
  overrides?: Partial<Query>,
): { __typename: 'Query' } & Query => {
  return {
    __typename: 'Query',
    accounts:
      overrides && overrides.hasOwnProperty('accounts')
        ? overrides.accounts!
        : [anAccount()],
    balance:
      overrides && overrides.hasOwnProperty('balance')
        ? overrides.balance!
        : aBalance(),
    balances:
      overrides && overrides.hasOwnProperty('balances')
        ? overrides.balances!
        : aBalanceConnection(),
    block:
      overrides && overrides.hasOwnProperty('block')
        ? overrides.block!
        : aBlock(),
    blocks:
      overrides && overrides.hasOwnProperty('blocks')
        ? overrides.blocks!
        : aBlockConnection(),
    chain:
      overrides && overrides.hasOwnProperty('chain')
        ? overrides.chain!
        : aChainInfo(),
    coin:
      overrides && overrides.hasOwnProperty('coin') ? overrides.coin! : aCoin(),
    coins:
      overrides && overrides.hasOwnProperty('coins')
        ? overrides.coins!
        : aCoinConnection(),
    contract:
      overrides && overrides.hasOwnProperty('contract')
        ? overrides.contract!
        : aContract(),
    contractBalance:
      overrides && overrides.hasOwnProperty('contractBalance')
        ? overrides.contractBalance!
        : aContractBalance(),
    contractBalances:
      overrides && overrides.hasOwnProperty('contractBalances')
        ? overrides.contractBalances!
        : aContractBalanceConnection(),
    health:
      overrides && overrides.hasOwnProperty('health')
        ? overrides.health!
        : false,
    messageProof:
      overrides && overrides.hasOwnProperty('messageProof')
        ? overrides.messageProof!
        : aMessageProof(),
    messages:
      overrides && overrides.hasOwnProperty('messages')
        ? overrides.messages!
        : aMessageConnection(),
    nodeInfo:
      overrides && overrides.hasOwnProperty('nodeInfo')
        ? overrides.nodeInfo!
        : aNodeInfo(),
    resourcesToSpend:
      overrides && overrides.hasOwnProperty('resourcesToSpend')
        ? overrides.resourcesToSpend!
        : [[aCoin()]],
    tokens:
      overrides && overrides.hasOwnProperty('tokens')
        ? overrides.tokens!
        : [aToken()],
    transaction:
      overrides && overrides.hasOwnProperty('transaction')
        ? overrides.transaction!
        : aTransaction(),
    transactions:
      overrides && overrides.hasOwnProperty('transactions')
        ? overrides.transactions!
        : aTransactionConnection(),
    transactionsByOwner:
      overrides && overrides.hasOwnProperty('transactionsByOwner')
        ? overrides.transactionsByOwner!
        : aTransactionConnection(),
  };
};

export const aReceipt = (
  overrides?: Partial<Receipt>,
): { __typename: 'Receipt' } & Receipt => {
  return {
    __typename: 'Receipt',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'illum',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'maiores',
    contract:
      overrides && overrides.hasOwnProperty('contract')
        ? overrides.contract!
        : aContract(),
    contractId:
      overrides && overrides.hasOwnProperty('contractId')
        ? overrides.contractId!
        : 'ut',
    data:
      overrides && overrides.hasOwnProperty('data')
        ? overrides.data!
        : 'tempore',
    digest:
      overrides && overrides.hasOwnProperty('digest')
        ? overrides.digest!
        : 'aut',
    gas: overrides && overrides.hasOwnProperty('gas') ? overrides.gas! : 'sed',
    gasUsed:
      overrides && overrides.hasOwnProperty('gasUsed')
        ? overrides.gasUsed!
        : 'explicabo',
    is: overrides && overrides.hasOwnProperty('is') ? overrides.is! : 'sint',
    len: overrides && overrides.hasOwnProperty('len') ? overrides.len! : 'quo',
    messageId:
      overrides && overrides.hasOwnProperty('messageId')
        ? overrides.messageId!
        : 'vero',
    nonce:
      overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'et',
    param1:
      overrides && overrides.hasOwnProperty('param1')
        ? overrides.param1!
        : 'nihil',
    param2:
      overrides && overrides.hasOwnProperty('param2')
        ? overrides.param2!
        : 'facilis',
    pc: overrides && overrides.hasOwnProperty('pc') ? overrides.pc! : 'animi',
    ptr: overrides && overrides.hasOwnProperty('ptr') ? overrides.ptr! : 'quis',
    ra: overrides && overrides.hasOwnProperty('ra') ? overrides.ra! : 'placeat',
    rawPayload:
      overrides && overrides.hasOwnProperty('rawPayload')
        ? overrides.rawPayload!
        : 'et',
    rb: overrides && overrides.hasOwnProperty('rb') ? overrides.rb! : 'animi',
    rc:
      overrides && overrides.hasOwnProperty('rc')
        ? overrides.rc!
        : 'aspernatur',
    rd: overrides && overrides.hasOwnProperty('rd') ? overrides.rd! : 'a',
    reason:
      overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'a',
    receiptType:
      overrides && overrides.hasOwnProperty('receiptType')
        ? overrides.receiptType!
        : ReceiptType.Call,
    recipient:
      overrides && overrides.hasOwnProperty('recipient')
        ? overrides.recipient!
        : 'est',
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : 'ipsa',
    sender:
      overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : 'a',
    to:
      overrides && overrides.hasOwnProperty('to') ? overrides.to! : aContract(),
    toAddress:
      overrides && overrides.hasOwnProperty('toAddress')
        ? overrides.toAddress!
        : 'sed',
    val:
      overrides && overrides.hasOwnProperty('val') ? overrides.val! : 'nobis',
  };
};

export const aSpendQueryElementInput = (
  overrides?: Partial<SpendQueryElementInput>,
): SpendQueryElementInput => {
  return {
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'deserunt',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'voluptas',
    max: overrides && overrides.hasOwnProperty('max') ? overrides.max! : 'qui',
  };
};

export const aSqueezedOutStatus = (
  overrides?: Partial<SqueezedOutStatus>,
): { __typename: 'SqueezedOutStatus' } & SqueezedOutStatus => {
  return {
    __typename: 'SqueezedOutStatus',
    reason:
      overrides && overrides.hasOwnProperty('reason')
        ? overrides.reason!
        : 'aut',
  };
};

export const aSubmittedStatus = (
  overrides?: Partial<SubmittedStatus>,
): { __typename: 'SubmittedStatus' } & SubmittedStatus => {
  return {
    __typename: 'SubmittedStatus',
    time:
      overrides && overrides.hasOwnProperty('time')
        ? overrides.time!
        : 904647984,
  };
};

export const aSubscription = (
  overrides?: Partial<Subscription>,
): { __typename: 'Subscription' } & Subscription => {
  return {
    __typename: 'Subscription',
    statusChange:
      overrides && overrides.hasOwnProperty('statusChange')
        ? overrides.statusChange!
        : aFailureStatus(),
  };
};

export const aSuccessStatus = (
  overrides?: Partial<SuccessStatus>,
): { __typename: 'SuccessStatus' } & SuccessStatus => {
  return {
    __typename: 'SuccessStatus',
    block:
      overrides && overrides.hasOwnProperty('block')
        ? overrides.block!
        : aBlock(),
    programState:
      overrides && overrides.hasOwnProperty('programState')
        ? overrides.programState!
        : aProgramState(),
    time:
      overrides && overrides.hasOwnProperty('time')
        ? overrides.time!
        : 388335830,
  };
};

export const aTimeParameters = (
  overrides?: Partial<TimeParameters>,
): TimeParameters => {
  return {
    blockTimeInterval:
      overrides && overrides.hasOwnProperty('blockTimeInterval')
        ? overrides.blockTimeInterval!
        : 'est',
    startTime:
      overrides && overrides.hasOwnProperty('startTime')
        ? overrides.startTime!
        : 'amet',
  };
};

export const aToken = (
  overrides?: Partial<Token>,
): { __typename: 'Token' } & Token => {
  return {
    __typename: 'Token',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'culpa',
    decimals:
      overrides && overrides.hasOwnProperty('decimals')
        ? overrides.decimals!
        : 'nostrum',
    name:
      overrides && overrides.hasOwnProperty('name')
        ? overrides.name!
        : 'repudiandae',
    symbol:
      overrides && overrides.hasOwnProperty('symbol')
        ? overrides.symbol!
        : 'deleniti',
    totalAssets:
      overrides && overrides.hasOwnProperty('totalAssets')
        ? overrides.totalAssets!
        : 'vel',
    totalSupply:
      overrides && overrides.hasOwnProperty('totalSupply')
        ? overrides.totalSupply!
        : 'labore',
    url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'non',
  };
};

export const aTransaction = (
  overrides?: Partial<Transaction>,
): { __typename: 'Transaction' } & Transaction => {
  return {
    __typename: 'Transaction',
    blockHeight:
      overrides && overrides.hasOwnProperty('blockHeight')
        ? overrides.blockHeight!
        : 'magnam',
    bytecodeLength:
      overrides && overrides.hasOwnProperty('bytecodeLength')
        ? overrides.bytecodeLength!
        : 'minima',
    bytecodeWitnessIndex:
      overrides && overrides.hasOwnProperty('bytecodeWitnessIndex')
        ? overrides.bytecodeWitnessIndex!
        : 9379,
    gasLimit:
      overrides && overrides.hasOwnProperty('gasLimit')
        ? overrides.gasLimit!
        : 'totam',
    gasPrice:
      overrides && overrides.hasOwnProperty('gasPrice')
        ? overrides.gasPrice!
        : 'rerum',
    gasUsed:
      overrides && overrides.hasOwnProperty('gasUsed')
        ? overrides.gasUsed!
        : 'ut',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'quidem',
    inputAssetIds:
      overrides && overrides.hasOwnProperty('inputAssetIds')
        ? overrides.inputAssetIds!
        : ['excepturi'],
    inputContracts:
      overrides && overrides.hasOwnProperty('inputContracts')
        ? overrides.inputContracts!
        : [aContract()],
    inputs:
      overrides && overrides.hasOwnProperty('inputs')
        ? overrides.inputs!
        : [anInputCoin()],
    isCreate:
      overrides && overrides.hasOwnProperty('isCreate')
        ? overrides.isCreate!
        : false,
    isMint:
      overrides && overrides.hasOwnProperty('isMint')
        ? overrides.isMint!
        : true,
    isScript:
      overrides && overrides.hasOwnProperty('isScript')
        ? overrides.isScript!
        : false,
    maturity:
      overrides && overrides.hasOwnProperty('maturity')
        ? overrides.maturity!
        : 'porro',
    outputs:
      overrides && overrides.hasOwnProperty('outputs')
        ? overrides.outputs!
        : [aChangeOutput()],
    rawPayload:
      overrides && overrides.hasOwnProperty('rawPayload')
        ? overrides.rawPayload!
        : 'qui',
    receipts:
      overrides && overrides.hasOwnProperty('receipts')
        ? overrides.receipts!
        : [aReceipt()],
    receiptsRoot:
      overrides && overrides.hasOwnProperty('receiptsRoot')
        ? overrides.receiptsRoot!
        : 'saepe',
    salt:
      overrides && overrides.hasOwnProperty('salt') ? overrides.salt! : 'nobis',
    script:
      overrides && overrides.hasOwnProperty('script')
        ? overrides.script!
        : 'perspiciatis',
    scriptData:
      overrides && overrides.hasOwnProperty('scriptData')
        ? overrides.scriptData!
        : 'voluptatum',
    status:
      overrides && overrides.hasOwnProperty('status')
        ? overrides.status!
        : aFailureStatus(),
    statusType:
      overrides && overrides.hasOwnProperty('statusType')
        ? overrides.statusType!
        : TransactionStatusType.Failure,
    storageSlots:
      overrides && overrides.hasOwnProperty('storageSlots')
        ? overrides.storageSlots!
        : ['ducimus'],
    time:
      overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'quia',
    title:
      overrides && overrides.hasOwnProperty('title')
        ? overrides.title!
        : TransactionTitle.Burn,
    totalAccounts:
      overrides && overrides.hasOwnProperty('totalAccounts')
        ? overrides.totalAccounts!
        : 206,
    totalAssets:
      overrides && overrides.hasOwnProperty('totalAssets')
        ? overrides.totalAssets!
        : 4943,
    totalOperations:
      overrides && overrides.hasOwnProperty('totalOperations')
        ? overrides.totalOperations!
        : 1611,
    txPointer:
      overrides && overrides.hasOwnProperty('txPointer')
        ? overrides.txPointer!
        : 'impedit',
    witnesses:
      overrides && overrides.hasOwnProperty('witnesses')
        ? overrides.witnesses!
        : ['iure'],
  };
};

export const aTransactionConnection = (
  overrides?: Partial<TransactionConnection>,
): { __typename: 'TransactionConnection' } & TransactionConnection => {
  return {
    __typename: 'TransactionConnection',
    accounts:
      overrides && overrides.hasOwnProperty('accounts')
        ? overrides.accounts!
        : [anAccount()],
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [aTransactionEdge()],
    nodes:
      overrides && overrides.hasOwnProperty('nodes')
        ? overrides.nodes!
        : [aTransaction()],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : aPageInfo(),
    tokens:
      overrides && overrides.hasOwnProperty('tokens')
        ? overrides.tokens!
        : [aToken()],
  };
};

export const aTransactionEdge = (
  overrides?: Partial<TransactionEdge>,
): { __typename: 'TransactionEdge' } & TransactionEdge => {
  return {
    __typename: 'TransactionEdge',
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'dolor',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : aTransaction(),
  };
};

export const aVariableOutput = (
  overrides?: Partial<VariableOutput>,
): { __typename: 'VariableOutput' } & VariableOutput => {
  return {
    __typename: 'VariableOutput',
    amount:
      overrides && overrides.hasOwnProperty('amount')
        ? overrides.amount!
        : 'unde',
    assetId:
      overrides && overrides.hasOwnProperty('assetId')
        ? overrides.assetId!
        : 'deleniti',
    to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'fugit',
  };
};
