import type { GQLAccountNode, GQLAsset, GQLAssetNetworkEthereum, GQLAssetNetworkFuel, GQLBalance, GQLBalanceConnection, GQLBalanceEdge, GQLBalanceFilterInput, GQLBlock, GQLBlockConnection, GQLBlockEdge, GQLBlocksDashboard, GQLBlocksDashboardConnection, GQLBreakpoint, GQLChainInfo, GQLChangeOutput, GQLCoin, GQLCoinConnection, GQLCoinEdge, GQLCoinFilterInput, GQLCoinOutput, GQLConsensusParameters, GQLConsensusParametersPurpose, GQLContract, GQLContractBalance, GQLContractBalanceConnection, GQLContractBalanceEdge, GQLContractBalanceFilterInput, GQLContractConnection, GQLContractCreated, GQLContractOutput, GQLContractParameters, GQLDryRunFailureStatus, GQLDryRunSuccessStatus, GQLDryRunTransactionExecutionStatus, GQLEstimateGasPrice, GQLExcludeInput, GQLFailureStatus, GQLFeeParameters, GQLGasCosts, GQLGenesis, GQLGroupedInputCoin, GQLGroupedInputContract, GQLGroupedInputMessage, GQLGroupedOutputChanged, GQLGroupedOutputCoin, GQLGroupedOutputContractCreated, GQLHeader, GQLHeavyOperation, GQLInputCoin, GQLInputContract, GQLInputMessage, GQLLatestGasPrice, GQLLightOperation, GQLMerkleProof, GQLMessage, GQLMessageCoin, GQLMessageConnection, GQLMessageEdge, GQLMessageProof, GQLMessageStatus, GQLMutation, GQLNodeInfo, GQLOperation, GQLOperationReceipt, GQLOperationsFilterInput, GQLOutputBreakpoint, GQLPageInfo, GQLPaginatedAccountConnection, GQLParsedTime, GQLPeerInfo, GQLPoAConsensus, GQLPolicies, GQLPredicateItem, GQLPredicateParameters, GQLProgramState, GQLQuery, GQLReceipt, GQLRelayedTransactionFailed, GQLRunResult, GQLScriptParameters, GQLSearchAccount, GQLSearchBlock, GQLSearchContract, GQLSearchResult, GQLSearchTransaction, GQLSpendQueryElementInput, GQLSqueezedOutStatus, GQLStateTransitionPurpose, GQLSubmittedStatus, GQLSubscription, GQLSuccessStatus, GQLTps, GQLTpsConnection, GQLTransaction, GQLTransactionConnection, GQLTransactionEdge, GQLTransactionGasCosts, GQLTxParameters, GQLUtxoItem, GQLVariableOutput, GQLBlockVersion, GQLConsensusParametersVersion, GQLContractParametersVersion, GQLFeeParametersVersion, GQLGasCostsVersion, GQLGroupedInputType, GQLGroupedOutputType, GQLHeaderVersion, GQLMessageState, GQLOperationType, GQLPredicateParametersVersion, GQLReceiptType, GQLReturnType, GQLRunState, GQLScriptParametersVersion, GQLTxParametersVersion } from './sdk';

export const anAccountNode = (overrides?: Partial<GQLAccountNode>): { __typename: 'AccountNode' } & GQLAccountNode => {
    return {
        __typename: 'AccountNode',
        account_id: overrides && overrides.hasOwnProperty('account_id') ? overrides.account_id! : 'illo',
        balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : 'dolore',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '303700b4-6ccd-4b9c-bbfb-b798703382be',
        transaction_count: overrides && overrides.hasOwnProperty('transaction_count') ? overrides.transaction_count! : 8132,
    };
};

export const anAsset = (overrides?: Partial<GQLAsset>): { __typename: 'Asset' } & GQLAsset => {
    return {
        __typename: 'Asset',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'laboriosam',
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : 'corrupti',
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : '0x4',
        icon: overrides && overrides.hasOwnProperty('icon') ? overrides.icon! : 'explicabo',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'dolorem',
        networks: overrides && overrides.hasOwnProperty('networks') ? overrides.networks! : [anAssetNetworkEthereum()],
        subId: overrides && overrides.hasOwnProperty('subId') ? overrides.subId! : 'omnis',
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : 'quaerat',
        verified: overrides && overrides.hasOwnProperty('verified') ? overrides.verified! : false,
    };
};

export const anAssetNetworkEthereum = (overrides?: Partial<GQLAssetNetworkEthereum>): { __typename: 'AssetNetworkEthereum' } & GQLAssetNetworkEthereum => {
    return {
        __typename: 'AssetNetworkEthereum',
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'porro',
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : '0xf',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'commodi',
    };
};

export const anAssetNetworkFuel = (overrides?: Partial<GQLAssetNetworkFuel>): { __typename: 'AssetNetworkFuel' } & GQLAssetNetworkFuel => {
    return {
        __typename: 'AssetNetworkFuel',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'placeat',
        chainId: overrides && overrides.hasOwnProperty('chainId') ? overrides.chainId! : '0x8',
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : 'maiores',
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : '0x2',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'minima',
    };
};

export const aBalance = (overrides?: Partial<GQLBalance>): { __typename: 'Balance' } & GQLBalance => {
    return {
        __typename: 'Balance',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0x0',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'a0f8od7pvhhubad7x3hz9o0zn7xp5j23',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'tx4go3g6en5w03qjzwnt6ugwv26qrm5q9mwtq5lp',
        utxos: overrides && overrides.hasOwnProperty('utxos') ? overrides.utxos! : [anUtxoItem()],
    };
};

export const aBalanceConnection = (overrides?: Partial<GQLBalanceConnection>): { __typename: 'BalanceConnection' } & GQLBalanceConnection => {
    return {
        __typename: 'BalanceConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aBalanceEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aBalance()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aBalanceEdge = (overrides?: Partial<GQLBalanceEdge>): { __typename: 'BalanceEdge' } & GQLBalanceEdge => {
    return {
        __typename: 'BalanceEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'tenetur',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aBalance(),
    };
};

export const aBalanceFilterInput = (overrides?: Partial<GQLBalanceFilterInput>): GQLBalanceFilterInput => {
    return {
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : '9nrgo4xy0vszugxxsuu7t7k4heqvx2it46ns6n49',
    };
};

export const aBlock = (overrides?: Partial<GQLBlock>): { __typename: 'Block' } & GQLBlock => {
    return {
        __typename: 'Block',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : 5272,
        consensus: overrides && overrides.hasOwnProperty('consensus') ? overrides.consensus! : aGenesis(),
        header: overrides && overrides.hasOwnProperty('header') ? overrides.header! : aHeader(),
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 'cupiditate',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'fuga',
        producer: overrides && overrides.hasOwnProperty('producer') ? overrides.producer! : 'tf26peb03uo1z0i4l6d7yfnvuzumd2fiukebb742',
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : aParsedTime(),
        totalGasUsed: overrides && overrides.hasOwnProperty('totalGasUsed') ? overrides.totalGasUsed! : '0x1',
        transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aTransaction()],
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLBlockVersion),
    };
};

export const aBlockConnection = (overrides?: Partial<GQLBlockConnection>): { __typename: 'BlockConnection' } & GQLBlockConnection => {
    return {
        __typename: 'BlockConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aBlockEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aBlock()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aBlockEdge = (overrides?: Partial<GQLBlockEdge>): { __typename: 'BlockEdge' } & GQLBlockEdge => {
    return {
        __typename: 'BlockEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'id',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aBlock(),
    };
};

export const aBlocksDashboard = (overrides?: Partial<GQLBlocksDashboard>): { __typename: 'BlocksDashboard' } & GQLBlocksDashboard => {
    return {
        __typename: 'BlocksDashboard',
        blockNo: overrides && overrides.hasOwnProperty('blockNo') ? overrides.blockNo! : '0xc',
        gasUsed: overrides && overrides.hasOwnProperty('gasUsed') ? overrides.gasUsed! : '0x5',
        producer: overrides && overrides.hasOwnProperty('producer') ? overrides.producer! : 'error',
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : '0x8',
    };
};

export const aBlocksDashboardConnection = (overrides?: Partial<GQLBlocksDashboardConnection>): { __typename: 'BlocksDashboardConnection' } & GQLBlocksDashboardConnection => {
    return {
        __typename: 'BlocksDashboardConnection',
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aBlocksDashboard()],
    };
};

export const aBreakpoint = (overrides?: Partial<GQLBreakpoint>): GQLBreakpoint => {
    return {
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : 'spxsyh8uujdpzc8kg4t7lkz0r7qmcdsb',
        pc: overrides && overrides.hasOwnProperty('pc') ? overrides.pc! : '0xa',
    };
};

export const aChainInfo = (overrides?: Partial<GQLChainInfo>): { __typename: 'ChainInfo' } & GQLChainInfo => {
    return {
        __typename: 'ChainInfo',
        consensusParameters: overrides && overrides.hasOwnProperty('consensusParameters') ? overrides.consensusParameters! : aConsensusParameters(),
        daHeight: overrides && overrides.hasOwnProperty('daHeight') ? overrides.daHeight! : '0xE',
        gasCosts: overrides && overrides.hasOwnProperty('gasCosts') ? overrides.gasCosts! : aGasCosts(),
        latestBlock: overrides && overrides.hasOwnProperty('latestBlock') ? overrides.latestBlock! : aBlock(),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'autem',
    };
};

export const aChangeOutput = (overrides?: Partial<GQLChangeOutput>): { __typename: 'ChangeOutput' } & GQLChangeOutput => {
    return {
        __typename: 'ChangeOutput',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xD',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'e0jf4dwzgypv3lmvt8yed3ebs8sco6xm',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'dhi4r4fhri7jpmudxj1zxawwhmvmg15ehun33smn',
    };
};

export const aCoin = (overrides?: Partial<GQLCoin>): { __typename: 'Coin' } & GQLCoin => {
    return {
        __typename: 'Coin',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xD',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'vl8kx5cac3pojox0cdisfofoyu6smapv',
        blockCreated: overrides && overrides.hasOwnProperty('blockCreated') ? overrides.blockCreated! : 'doloremque',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'on6sn7qh1ssgeb35sg0so4u4lp3izj4yafvrlk8x',
        txCreatedIdx: overrides && overrides.hasOwnProperty('txCreatedIdx') ? overrides.txCreatedIdx! : '0x7',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : '78r15xdj851q7w4q6k0tqeof9vlk0gns',
    };
};

export const aCoinConnection = (overrides?: Partial<GQLCoinConnection>): { __typename: 'CoinConnection' } & GQLCoinConnection => {
    return {
        __typename: 'CoinConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aCoinEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aCoin()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aCoinEdge = (overrides?: Partial<GQLCoinEdge>): { __typename: 'CoinEdge' } & GQLCoinEdge => {
    return {
        __typename: 'CoinEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'excepturi',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aCoin(),
    };
};

export const aCoinFilterInput = (overrides?: Partial<GQLCoinFilterInput>): GQLCoinFilterInput => {
    return {
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'kudfhe4l01ysp8358vb8xz1k8veh59hy',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'baoj8afcxig6c9huma1wloyvmbchd8yi7qa85afh',
    };
};

export const aCoinOutput = (overrides?: Partial<GQLCoinOutput>): { __typename: 'CoinOutput' } & GQLCoinOutput => {
    return {
        __typename: 'CoinOutput',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xD',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 't153mt7lkdbnhho3wb4ukkb48qhhudy7',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : '9olpk2xb6cjl4kyy3he3py3yu0bkm85chtuggo6i',
    };
};

export const aConsensusParameters = (overrides?: Partial<GQLConsensusParameters>): { __typename: 'ConsensusParameters' } & GQLConsensusParameters => {
    return {
        __typename: 'ConsensusParameters',
        baseAssetId: overrides && overrides.hasOwnProperty('baseAssetId') ? overrides.baseAssetId! : 'l2lmmdg42iyd8pb2v79vqcg6fnko5egl',
        blockGasLimit: overrides && overrides.hasOwnProperty('blockGasLimit') ? overrides.blockGasLimit! : '0x6',
        chainId: overrides && overrides.hasOwnProperty('chainId') ? overrides.chainId! : '0x3',
        contractParams: overrides && overrides.hasOwnProperty('contractParams') ? overrides.contractParams! : aContractParameters(),
        feeParams: overrides && overrides.hasOwnProperty('feeParams') ? overrides.feeParams! : aFeeParameters(),
        gasCosts: overrides && overrides.hasOwnProperty('gasCosts') ? overrides.gasCosts! : aGasCosts(),
        predicateParams: overrides && overrides.hasOwnProperty('predicateParams') ? overrides.predicateParams! : aPredicateParameters(),
        privilegedAddress: overrides && overrides.hasOwnProperty('privilegedAddress') ? overrides.privilegedAddress! : 'q75p0hw9intf5cnh3dm5h0xvqvb8pm7b2sdf6tb9',
        scriptParams: overrides && overrides.hasOwnProperty('scriptParams') ? overrides.scriptParams! : aScriptParameters(),
        txParams: overrides && overrides.hasOwnProperty('txParams') ? overrides.txParams! : aTxParameters(),
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLConsensusParametersVersion),
    };
};

export const aConsensusParametersPurpose = (overrides?: Partial<GQLConsensusParametersPurpose>): { __typename: 'ConsensusParametersPurpose' } & GQLConsensusParametersPurpose => {
    return {
        __typename: 'ConsensusParametersPurpose',
        checksum: overrides && overrides.hasOwnProperty('checksum') ? overrides.checksum! : 'repudiandae',
        witnessIndex: overrides && overrides.hasOwnProperty('witnessIndex') ? overrides.witnessIndex! : '0x0',
    };
};

export const aContract = (overrides?: Partial<GQLContract>): { __typename: 'Contract' } & GQLContract => {
    return {
        __typename: 'Contract',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : 6814,
        bytecode: overrides && overrides.hasOwnProperty('bytecode') ? overrides.bytecode! : '0x6092A6C7eb64c9b1A755Df9bE83fC7Bd5bFF2c090Df255Da243CAB4811Fc2016D2a2Ae93CFEDE4FD8d99ab3Dca0DDdAbc7CF1ba3FbAA761e3eC17f8d1609fD5e46BEFFD6886EB1BCA208bB2AE8bEDADF',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '51d28wg0iw33x467k5qd81kn5b9wnrtg',
        salt: overrides && overrides.hasOwnProperty('salt') ? overrides.salt! : 'repellendus',
    };
};

export const aContractBalance = (overrides?: Partial<GQLContractBalance>): { __typename: 'ContractBalance' } & GQLContractBalance => {
    return {
        __typename: 'ContractBalance',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xc',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'm1on4nvj5caxtv0dkued0ncku5ydtsxu',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : '7bdxyt98z950w2en4wp4kh5fxekvlzqv',
    };
};

export const aContractBalanceConnection = (overrides?: Partial<GQLContractBalanceConnection>): { __typename: 'ContractBalanceConnection' } & GQLContractBalanceConnection => {
    return {
        __typename: 'ContractBalanceConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aContractBalanceEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aContractBalance()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aContractBalanceEdge = (overrides?: Partial<GQLContractBalanceEdge>): { __typename: 'ContractBalanceEdge' } & GQLContractBalanceEdge => {
    return {
        __typename: 'ContractBalanceEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nesciunt',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aContractBalance(),
    };
};

export const aContractBalanceFilterInput = (overrides?: Partial<GQLContractBalanceFilterInput>): GQLContractBalanceFilterInput => {
    return {
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : 'lly4yjylzlm1dnmj5lwzlk0tbb9no5sx',
    };
};

export const aContractConnection = (overrides?: Partial<GQLContractConnection>): { __typename: 'ContractConnection' } & GQLContractConnection => {
    return {
        __typename: 'ContractConnection',
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aContract()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aContractCreated = (overrides?: Partial<GQLContractCreated>): { __typename: 'ContractCreated' } & GQLContractCreated => {
    return {
        __typename: 'ContractCreated',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : 'muu7slc0omdipgx0q3uoxsppeprkgeqq',
        stateRoot: overrides && overrides.hasOwnProperty('stateRoot') ? overrides.stateRoot! : 'dolores',
    };
};

export const aContractOutput = (overrides?: Partial<GQLContractOutput>): { __typename: 'ContractOutput' } & GQLContractOutput => {
    return {
        __typename: 'ContractOutput',
        balanceRoot: overrides && overrides.hasOwnProperty('balanceRoot') ? overrides.balanceRoot! : 'architecto',
        inputIndex: overrides && overrides.hasOwnProperty('inputIndex') ? overrides.inputIndex! : '0x7',
        stateRoot: overrides && overrides.hasOwnProperty('stateRoot') ? overrides.stateRoot! : 'animi',
    };
};

export const aContractParameters = (overrides?: Partial<GQLContractParameters>): { __typename: 'ContractParameters' } & GQLContractParameters => {
    return {
        __typename: 'ContractParameters',
        contractMaxSize: overrides && overrides.hasOwnProperty('contractMaxSize') ? overrides.contractMaxSize! : '0xA',
        maxStorageSlots: overrides && overrides.hasOwnProperty('maxStorageSlots') ? overrides.maxStorageSlots! : '0x0',
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLContractParametersVersion),
    };
};

export const aDryRunFailureStatus = (overrides?: Partial<GQLDryRunFailureStatus>): { __typename: 'DryRunFailureStatus' } & GQLDryRunFailureStatus => {
    return {
        __typename: 'DryRunFailureStatus',
        programState: overrides && overrides.hasOwnProperty('programState') ? overrides.programState! : aProgramState(),
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'omnis',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        totalFee: overrides && overrides.hasOwnProperty('totalFee') ? overrides.totalFee! : '0xf',
        totalGas: overrides && overrides.hasOwnProperty('totalGas') ? overrides.totalGas! : '0x4',
    };
};

export const aDryRunSuccessStatus = (overrides?: Partial<GQLDryRunSuccessStatus>): { __typename: 'DryRunSuccessStatus' } & GQLDryRunSuccessStatus => {
    return {
        __typename: 'DryRunSuccessStatus',
        programState: overrides && overrides.hasOwnProperty('programState') ? overrides.programState! : aProgramState(),
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        totalFee: overrides && overrides.hasOwnProperty('totalFee') ? overrides.totalFee! : '0x5',
        totalGas: overrides && overrides.hasOwnProperty('totalGas') ? overrides.totalGas! : '0x3',
    };
};

export const aDryRunTransactionExecutionStatus = (overrides?: Partial<GQLDryRunTransactionExecutionStatus>): { __typename: 'DryRunTransactionExecutionStatus' } & GQLDryRunTransactionExecutionStatus => {
    return {
        __typename: 'DryRunTransactionExecutionStatus',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '00y7p18vf94i6dgxo8hlvnn90de4b0hx',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : aDryRunFailureStatus(),
    };
};

export const anEstimateGasPrice = (overrides?: Partial<GQLEstimateGasPrice>): { __typename: 'EstimateGasPrice' } & GQLEstimateGasPrice => {
    return {
        __typename: 'EstimateGasPrice',
        gasPrice: overrides && overrides.hasOwnProperty('gasPrice') ? overrides.gasPrice! : '0x7',
    };
};

export const anExcludeInput = (overrides?: Partial<GQLExcludeInput>): GQLExcludeInput => {
    return {
        messages: overrides && overrides.hasOwnProperty('messages') ? overrides.messages! : ['facilis'],
        utxos: overrides && overrides.hasOwnProperty('utxos') ? overrides.utxos! : ['rjjvinnn08hy31jzmpuci05byajz8wme'],
    };
};

export const aFailureStatus = (overrides?: Partial<GQLFailureStatus>): { __typename: 'FailureStatus' } & GQLFailureStatus => {
    return {
        __typename: 'FailureStatus',
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : aBlock(),
        programState: overrides && overrides.hasOwnProperty('programState') ? overrides.programState! : aProgramState(),
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'corporis',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'itaque',
        totalFee: overrides && overrides.hasOwnProperty('totalFee') ? overrides.totalFee! : '0xC',
        totalGas: overrides && overrides.hasOwnProperty('totalGas') ? overrides.totalGas! : '0xf',
        transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : 'y3992yk84ltlkuu5f6glx6r5iitmdig8',
    };
};

export const aFeeParameters = (overrides?: Partial<GQLFeeParameters>): { __typename: 'FeeParameters' } & GQLFeeParameters => {
    return {
        __typename: 'FeeParameters',
        gasPerByte: overrides && overrides.hasOwnProperty('gasPerByte') ? overrides.gasPerByte! : '0xA',
        gasPriceFactor: overrides && overrides.hasOwnProperty('gasPriceFactor') ? overrides.gasPriceFactor! : '0xb',
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLFeeParametersVersion),
    };
};

export const aGasCosts = (overrides?: Partial<GQLGasCosts>): { __typename: 'GasCosts' } & GQLGasCosts => {
    return {
        __typename: 'GasCosts',
        add: overrides && overrides.hasOwnProperty('add') ? overrides.add! : '0xd',
        addi: overrides && overrides.hasOwnProperty('addi') ? overrides.addi! : '0x4',
        aloc: overrides && overrides.hasOwnProperty('aloc') ? overrides.aloc! : '0x5',
        alocDependentCost: overrides && overrides.hasOwnProperty('alocDependentCost') ? overrides.alocDependentCost! : aHeavyOperation(),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : '0xE',
        andi: overrides && overrides.hasOwnProperty('andi') ? overrides.andi! : '0x1',
        bal: overrides && overrides.hasOwnProperty('bal') ? overrides.bal! : '0xf',
        bhei: overrides && overrides.hasOwnProperty('bhei') ? overrides.bhei! : '0xC',
        bhsh: overrides && overrides.hasOwnProperty('bhsh') ? overrides.bhsh! : '0x7',
        burn: overrides && overrides.hasOwnProperty('burn') ? overrides.burn! : '0x6',
        call: overrides && overrides.hasOwnProperty('call') ? overrides.call! : aHeavyOperation(),
        cb: overrides && overrides.hasOwnProperty('cb') ? overrides.cb! : '0x2',
        ccp: overrides && overrides.hasOwnProperty('ccp') ? overrides.ccp! : aHeavyOperation(),
        cfei: overrides && overrides.hasOwnProperty('cfei') ? overrides.cfei! : '0xc',
        cfsi: overrides && overrides.hasOwnProperty('cfsi') ? overrides.cfsi! : '0xB',
        contractRoot: overrides && overrides.hasOwnProperty('contractRoot') ? overrides.contractRoot! : aHeavyOperation(),
        croo: overrides && overrides.hasOwnProperty('croo') ? overrides.croo! : aHeavyOperation(),
        csiz: overrides && overrides.hasOwnProperty('csiz') ? overrides.csiz! : aHeavyOperation(),
        div: overrides && overrides.hasOwnProperty('div') ? overrides.div! : '0x5',
        divi: overrides && overrides.hasOwnProperty('divi') ? overrides.divi! : '0xB',
        eck1: overrides && overrides.hasOwnProperty('eck1') ? overrides.eck1! : '0x4',
        ecr1: overrides && overrides.hasOwnProperty('ecr1') ? overrides.ecr1! : '0x4',
        ed19: overrides && overrides.hasOwnProperty('ed19') ? overrides.ed19! : '0xE',
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : '0xa',
        exp: overrides && overrides.hasOwnProperty('exp') ? overrides.exp! : '0x6',
        expi: overrides && overrides.hasOwnProperty('expi') ? overrides.expi! : '0x5',
        flag: overrides && overrides.hasOwnProperty('flag') ? overrides.flag! : '0xa',
        gm: overrides && overrides.hasOwnProperty('gm') ? overrides.gm! : '0x6',
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : '0x8',
        gtf: overrides && overrides.hasOwnProperty('gtf') ? overrides.gtf! : '0xc',
        ji: overrides && overrides.hasOwnProperty('ji') ? overrides.ji! : '0xF',
        jmp: overrides && overrides.hasOwnProperty('jmp') ? overrides.jmp! : '0xD',
        jmpb: overrides && overrides.hasOwnProperty('jmpb') ? overrides.jmpb! : '0xc',
        jmpf: overrides && overrides.hasOwnProperty('jmpf') ? overrides.jmpf! : '0x8',
        jne: overrides && overrides.hasOwnProperty('jne') ? overrides.jne! : '0x0',
        jneb: overrides && overrides.hasOwnProperty('jneb') ? overrides.jneb! : '0x0',
        jnef: overrides && overrides.hasOwnProperty('jnef') ? overrides.jnef! : '0x4',
        jnei: overrides && overrides.hasOwnProperty('jnei') ? overrides.jnei! : '0xB',
        jnzb: overrides && overrides.hasOwnProperty('jnzb') ? overrides.jnzb! : '0x1',
        jnzf: overrides && overrides.hasOwnProperty('jnzf') ? overrides.jnzf! : '0xB',
        jnzi: overrides && overrides.hasOwnProperty('jnzi') ? overrides.jnzi! : '0x0',
        k256: overrides && overrides.hasOwnProperty('k256') ? overrides.k256! : aHeavyOperation(),
        lb: overrides && overrides.hasOwnProperty('lb') ? overrides.lb! : '0xA',
        ldc: overrides && overrides.hasOwnProperty('ldc') ? overrides.ldc! : aHeavyOperation(),
        log: overrides && overrides.hasOwnProperty('log') ? overrides.log! : '0x6',
        logd: overrides && overrides.hasOwnProperty('logd') ? overrides.logd! : aHeavyOperation(),
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : '0xC',
        lw: overrides && overrides.hasOwnProperty('lw') ? overrides.lw! : '0xD',
        mcl: overrides && overrides.hasOwnProperty('mcl') ? overrides.mcl! : aHeavyOperation(),
        mcli: overrides && overrides.hasOwnProperty('mcli') ? overrides.mcli! : aHeavyOperation(),
        mcp: overrides && overrides.hasOwnProperty('mcp') ? overrides.mcp! : aHeavyOperation(),
        mcpi: overrides && overrides.hasOwnProperty('mcpi') ? overrides.mcpi! : aHeavyOperation(),
        meq: overrides && overrides.hasOwnProperty('meq') ? overrides.meq! : aHeavyOperation(),
        mint: overrides && overrides.hasOwnProperty('mint') ? overrides.mint! : '0x1',
        mldv: overrides && overrides.hasOwnProperty('mldv') ? overrides.mldv! : '0xF',
        mlog: overrides && overrides.hasOwnProperty('mlog') ? overrides.mlog! : '0x8',
        modOp: overrides && overrides.hasOwnProperty('modOp') ? overrides.modOp! : '0xF',
        modi: overrides && overrides.hasOwnProperty('modi') ? overrides.modi! : '0xA',
        moveOp: overrides && overrides.hasOwnProperty('moveOp') ? overrides.moveOp! : '0x4',
        movi: overrides && overrides.hasOwnProperty('movi') ? overrides.movi! : '0xF',
        mroo: overrides && overrides.hasOwnProperty('mroo') ? overrides.mroo! : '0xA',
        mul: overrides && overrides.hasOwnProperty('mul') ? overrides.mul! : '0xE',
        muli: overrides && overrides.hasOwnProperty('muli') ? overrides.muli! : '0xE',
        newStoragePerByte: overrides && overrides.hasOwnProperty('newStoragePerByte') ? overrides.newStoragePerByte! : '0xA',
        noop: overrides && overrides.hasOwnProperty('noop') ? overrides.noop! : '0x3',
        not: overrides && overrides.hasOwnProperty('not') ? overrides.not! : '0xc',
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : '0xC',
        ori: overrides && overrides.hasOwnProperty('ori') ? overrides.ori! : '0xE',
        poph: overrides && overrides.hasOwnProperty('poph') ? overrides.poph! : '0x9',
        popl: overrides && overrides.hasOwnProperty('popl') ? overrides.popl! : '0x7',
        pshh: overrides && overrides.hasOwnProperty('pshh') ? overrides.pshh! : '0xD',
        pshl: overrides && overrides.hasOwnProperty('pshl') ? overrides.pshl! : '0x9',
        ret: overrides && overrides.hasOwnProperty('ret') ? overrides.ret! : '0xa',
        retd: overrides && overrides.hasOwnProperty('retd') ? overrides.retd! : aHeavyOperation(),
        rvrt: overrides && overrides.hasOwnProperty('rvrt') ? overrides.rvrt! : '0xD',
        s256: overrides && overrides.hasOwnProperty('s256') ? overrides.s256! : aHeavyOperation(),
        sb: overrides && overrides.hasOwnProperty('sb') ? overrides.sb! : '0x8',
        scwq: overrides && overrides.hasOwnProperty('scwq') ? overrides.scwq! : aHeavyOperation(),
        sll: overrides && overrides.hasOwnProperty('sll') ? overrides.sll! : '0xF',
        slli: overrides && overrides.hasOwnProperty('slli') ? overrides.slli! : '0xb',
        smo: overrides && overrides.hasOwnProperty('smo') ? overrides.smo! : aHeavyOperation(),
        srl: overrides && overrides.hasOwnProperty('srl') ? overrides.srl! : '0xe',
        srli: overrides && overrides.hasOwnProperty('srli') ? overrides.srli! : '0xB',
        srw: overrides && overrides.hasOwnProperty('srw') ? overrides.srw! : '0x2',
        srwq: overrides && overrides.hasOwnProperty('srwq') ? overrides.srwq! : aHeavyOperation(),
        stateRoot: overrides && overrides.hasOwnProperty('stateRoot') ? overrides.stateRoot! : aHeavyOperation(),
        sub: overrides && overrides.hasOwnProperty('sub') ? overrides.sub! : '0xa',
        subi: overrides && overrides.hasOwnProperty('subi') ? overrides.subi! : '0xE',
        sw: overrides && overrides.hasOwnProperty('sw') ? overrides.sw! : '0xa',
        sww: overrides && overrides.hasOwnProperty('sww') ? overrides.sww! : '0x8',
        swwq: overrides && overrides.hasOwnProperty('swwq') ? overrides.swwq! : aHeavyOperation(),
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : '0x1',
        tr: overrides && overrides.hasOwnProperty('tr') ? overrides.tr! : '0x3',
        tro: overrides && overrides.hasOwnProperty('tro') ? overrides.tro! : '0x0',
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLGasCostsVersion),
        vmInitialization: overrides && overrides.hasOwnProperty('vmInitialization') ? overrides.vmInitialization! : aHeavyOperation(),
        wdam: overrides && overrides.hasOwnProperty('wdam') ? overrides.wdam! : '0xf',
        wdcm: overrides && overrides.hasOwnProperty('wdcm') ? overrides.wdcm! : '0xD',
        wddv: overrides && overrides.hasOwnProperty('wddv') ? overrides.wddv! : '0xe',
        wdmd: overrides && overrides.hasOwnProperty('wdmd') ? overrides.wdmd! : '0xB',
        wdml: overrides && overrides.hasOwnProperty('wdml') ? overrides.wdml! : '0xe',
        wdmm: overrides && overrides.hasOwnProperty('wdmm') ? overrides.wdmm! : '0x6',
        wdop: overrides && overrides.hasOwnProperty('wdop') ? overrides.wdop! : '0x0',
        wqam: overrides && overrides.hasOwnProperty('wqam') ? overrides.wqam! : '0xF',
        wqcm: overrides && overrides.hasOwnProperty('wqcm') ? overrides.wqcm! : '0xA',
        wqdv: overrides && overrides.hasOwnProperty('wqdv') ? overrides.wqdv! : '0xD',
        wqmd: overrides && overrides.hasOwnProperty('wqmd') ? overrides.wqmd! : '0x3',
        wqml: overrides && overrides.hasOwnProperty('wqml') ? overrides.wqml! : '0x5',
        wqmm: overrides && overrides.hasOwnProperty('wqmm') ? overrides.wqmm! : '0xE',
        wqop: overrides && overrides.hasOwnProperty('wqop') ? overrides.wqop! : '0xA',
        xor: overrides && overrides.hasOwnProperty('xor') ? overrides.xor! : '0x1',
        xori: overrides && overrides.hasOwnProperty('xori') ? overrides.xori! : '0xb',
    };
};

export const aGenesis = (overrides?: Partial<GQLGenesis>): { __typename: 'Genesis' } & GQLGenesis => {
    return {
        __typename: 'Genesis',
        chainConfigHash: overrides && overrides.hasOwnProperty('chainConfigHash') ? overrides.chainConfigHash! : 'aliquam',
        coinsRoot: overrides && overrides.hasOwnProperty('coinsRoot') ? overrides.coinsRoot! : 'quae',
        contractsRoot: overrides && overrides.hasOwnProperty('contractsRoot') ? overrides.contractsRoot! : 'voluptatum',
        messagesRoot: overrides && overrides.hasOwnProperty('messagesRoot') ? overrides.messagesRoot! : 'eligendi',
        transactionsRoot: overrides && overrides.hasOwnProperty('transactionsRoot') ? overrides.transactionsRoot! : 'excepturi',
    };
};

export const aGroupedInputCoin = (overrides?: Partial<GQLGroupedInputCoin>): { __typename: 'GroupedInputCoin' } & GQLGroupedInputCoin => {
    return {
        __typename: 'GroupedInputCoin',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : '2eku5pheqqmbpqebc24pvd6uan2fi351',
        inputs: overrides && overrides.hasOwnProperty('inputs') ? overrides.inputs! : [anInputCoin()],
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'hs5uyvd5zn2ejpebktph8qyshqmoj6zhc7l75vka',
        totalAmount: overrides && overrides.hasOwnProperty('totalAmount') ? overrides.totalAmount! : '0x2',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ('InputCoin' as GQLGroupedInputType),
    };
};

export const aGroupedInputContract = (overrides?: Partial<GQLGroupedInputContract>): { __typename: 'GroupedInputContract' } & GQLGroupedInputContract => {
    return {
        __typename: 'GroupedInputContract',
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : 'u4yzde85fwxgwjbch1eg56cf4rfl0j7l',
        inputs: overrides && overrides.hasOwnProperty('inputs') ? overrides.inputs! : [anInputCoin()],
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ('InputCoin' as GQLGroupedInputType),
    };
};

export const aGroupedInputMessage = (overrides?: Partial<GQLGroupedInputMessage>): { __typename: 'GroupedInputMessage' } & GQLGroupedInputMessage => {
    return {
        __typename: 'GroupedInputMessage',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0xB42BD20B5dCC0E2AC5A5aBA5FeEDd6aEbDE530a6C4DFeEEB6e0de0FDCE20013e078BFbCa0dD4D8A7EE1823E0D2C9a41FEb1a4CDDCF493F2Ce6E9FC4eC18469e98c4e9b15eeBddd2fB51E7410EF638aAB',
        inputs: overrides && overrides.hasOwnProperty('inputs') ? overrides.inputs! : [anInputCoin()],
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : 'rd3no2a6fhhtrgqqxwd68gi0s9w7c8ji9yu234t9',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : '01zhrvf8sff222ylldswxm6ffeukwu6531kym2vo',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ('InputCoin' as GQLGroupedInputType),
    };
};

export const aGroupedOutputChanged = (overrides?: Partial<GQLGroupedOutputChanged>): { __typename: 'GroupedOutputChanged' } & GQLGroupedOutputChanged => {
    return {
        __typename: 'GroupedOutputChanged',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 's1382qlklm0ybq8so8c6jpcfx5bbvc9z',
        outputs: overrides && overrides.hasOwnProperty('outputs') ? overrides.outputs! : [aChangeOutput()],
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'qjc5crtqj6eei6yeg7tn9941fxo9za5l403ky59c',
        totalAmount: overrides && overrides.hasOwnProperty('totalAmount') ? overrides.totalAmount! : '0xd',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ('OutputChanged' as GQLGroupedOutputType),
    };
};

export const aGroupedOutputCoin = (overrides?: Partial<GQLGroupedOutputCoin>): { __typename: 'GroupedOutputCoin' } & GQLGroupedOutputCoin => {
    return {
        __typename: 'GroupedOutputCoin',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'ww0b52u8bqv5k2lv1z6bko1h67lb8jf9',
        outputs: overrides && overrides.hasOwnProperty('outputs') ? overrides.outputs! : [aChangeOutput()],
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : '6jrf57bo24ccwu7z8lx1rmh0hdpcdku17n5fesm0',
        totalAmount: overrides && overrides.hasOwnProperty('totalAmount') ? overrides.totalAmount! : '0xC',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ('OutputChanged' as GQLGroupedOutputType),
    };
};

export const aGroupedOutputContractCreated = (overrides?: Partial<GQLGroupedOutputContractCreated>): { __typename: 'GroupedOutputContractCreated' } & GQLGroupedOutputContractCreated => {
    return {
        __typename: 'GroupedOutputContractCreated',
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : 'na7y6c1bwktuwdxfc445ry9bgdr6lmsv',
        outputs: overrides && overrides.hasOwnProperty('outputs') ? overrides.outputs! : [aChangeOutput()],
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ('OutputChanged' as GQLGroupedOutputType),
    };
};

export const aHeader = (overrides?: Partial<GQLHeader>): { __typename: 'Header' } & GQLHeader => {
    return {
        __typename: 'Header',
        applicationHash: overrides && overrides.hasOwnProperty('applicationHash') ? overrides.applicationHash! : 'sint',
        consensusParametersVersion: overrides && overrides.hasOwnProperty('consensusParametersVersion') ? overrides.consensusParametersVersion! : 'sint',
        daHeight: overrides && overrides.hasOwnProperty('daHeight') ? overrides.daHeight! : '0xb',
        eventInboxRoot: overrides && overrides.hasOwnProperty('eventInboxRoot') ? overrides.eventInboxRoot! : 'natus',
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 'saepe',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'pariatur',
        messageOutboxRoot: overrides && overrides.hasOwnProperty('messageOutboxRoot') ? overrides.messageOutboxRoot! : 'exercitationem',
        messageReceiptCount: overrides && overrides.hasOwnProperty('messageReceiptCount') ? overrides.messageReceiptCount! : 'illo',
        prevRoot: overrides && overrides.hasOwnProperty('prevRoot') ? overrides.prevRoot! : 'reprehenderit',
        stateTransitionBytecodeVersion: overrides && overrides.hasOwnProperty('stateTransitionBytecodeVersion') ? overrides.stateTransitionBytecodeVersion! : 'molestiae',
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'perspiciatis',
        transactionsCount: overrides && overrides.hasOwnProperty('transactionsCount') ? overrides.transactionsCount! : '0x0',
        transactionsRoot: overrides && overrides.hasOwnProperty('transactionsRoot') ? overrides.transactionsRoot! : 'animi',
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLHeaderVersion),
    };
};

export const aHeavyOperation = (overrides?: Partial<GQLHeavyOperation>): { __typename: 'HeavyOperation' } & GQLHeavyOperation => {
    return {
        __typename: 'HeavyOperation',
        base: overrides && overrides.hasOwnProperty('base') ? overrides.base! : '0xE',
        gasPerUnit: overrides && overrides.hasOwnProperty('gasPerUnit') ? overrides.gasPerUnit! : '0xF',
    };
};

export const anInputCoin = (overrides?: Partial<GQLInputCoin>): { __typename: 'InputCoin' } & GQLInputCoin => {
    return {
        __typename: 'InputCoin',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xA',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'y27xk4sns2byxqyzgpcy513i3crqms8m',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'vamcamah4e8u1v6tw4ldf49gn6i4nhcxuhztvd8f',
        predicate: overrides && overrides.hasOwnProperty('predicate') ? overrides.predicate! : '0xa67Faa70dBB8BFe84AeA310BFCb62991Ad08F6635BBeFeafAe7abac62E8BdeeB4cefB8E74f0dB67569E5f42cCdc9EBfA64c4326ED6Df8B3583E50A790F441b29BDD613D18e7D9eF2d42fE1F8C7dd4ee3',
        predicateData: overrides && overrides.hasOwnProperty('predicateData') ? overrides.predicateData! : '0x63CCab6C200Cade6C4B7d1689bB2964b3BD8CaAb96C1AcBba1CED702F09b342f40d10F36824275eDba5BD55B657b71CF409Aeee963C126Bb2dEb80bDEeB57DF6c1dEdDC65389f3FAc6c72910319aBF2B',
        predicateGasUsed: overrides && overrides.hasOwnProperty('predicateGasUsed') ? overrides.predicateGasUsed! : '0xd',
        txPointer: overrides && overrides.hasOwnProperty('txPointer') ? overrides.txPointer! : 'officia',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : '37d3ah19hr1fh00b5j2qsz0tjfhyjk5f',
        witnessIndex: overrides && overrides.hasOwnProperty('witnessIndex') ? overrides.witnessIndex! : '0xC',
    };
};

export const anInputContract = (overrides?: Partial<GQLInputContract>): { __typename: 'InputContract' } & GQLInputContract => {
    return {
        __typename: 'InputContract',
        balanceRoot: overrides && overrides.hasOwnProperty('balanceRoot') ? overrides.balanceRoot! : 'laboriosam',
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : 'seqb72kgrhepf625ihirc199aurbjqyo',
        stateRoot: overrides && overrides.hasOwnProperty('stateRoot') ? overrides.stateRoot! : 'voluptatem',
        txPointer: overrides && overrides.hasOwnProperty('txPointer') ? overrides.txPointer! : 'natus',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : 'bdooy2lb4df6d1qrjvhul62w3u6t7zu9',
    };
};

export const anInputMessage = (overrides?: Partial<GQLInputMessage>): { __typename: 'InputMessage' } & GQLInputMessage => {
    return {
        __typename: 'InputMessage',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0x5',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0xffd6Fc68D8c1a4DffacF63db8CEb7FFfA2db2593cDEbFb1De88bF3ebDabFb9813db7bd45DE53dd24d4FCCfD7005D63fb806A0574dcba040c4bdFAdB5d8b66BffeAC2D282A0D6305AbDcaAaBB1479AF9f',
        nonce: overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'labore',
        predicate: overrides && overrides.hasOwnProperty('predicate') ? overrides.predicate! : '0x44db0eAA0a6aBD6a0b2e1bAee42Bb2aD2dcDA8eAE1A3aF9A13EBfBE852d8E4D5450A3712bDe127A27Bd8dC149965Bde13Abee6Ddbb6aDcfE4420c53eCbe01B6d268A85eC2fffA1d9264CEDbD3d8ADCfF',
        predicateData: overrides && overrides.hasOwnProperty('predicateData') ? overrides.predicateData! : '0x33CfF8399c2AE8debdB30dE8bBeCD90C9dEbdcA005444F492CcF5DF0B8E9d5a1EBDBf405Af0Beabe45aF6C05C888BFEd8789e0ed3aEadBAafaF83D60fDF6E48A9ceBc1aebc5EcDacf3cD297c7ab02D1D',
        predicateGasUsed: overrides && overrides.hasOwnProperty('predicateGasUsed') ? overrides.predicateGasUsed! : '0x5',
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : '9zwmg9jnt78zbvx3yxpdmav9do29us3xpjekgh1w',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : 'zhhyn3xw7xjv92a6r70t4cxh0hrjaj1r2jqekoag',
        witnessIndex: overrides && overrides.hasOwnProperty('witnessIndex') ? overrides.witnessIndex! : '0x9',
    };
};

export const aLatestGasPrice = (overrides?: Partial<GQLLatestGasPrice>): { __typename: 'LatestGasPrice' } & GQLLatestGasPrice => {
    return {
        __typename: 'LatestGasPrice',
        blockHeight: overrides && overrides.hasOwnProperty('blockHeight') ? overrides.blockHeight! : 'commodi',
        gasPrice: overrides && overrides.hasOwnProperty('gasPrice') ? overrides.gasPrice! : '0xF',
    };
};

export const aLightOperation = (overrides?: Partial<GQLLightOperation>): { __typename: 'LightOperation' } & GQLLightOperation => {
    return {
        __typename: 'LightOperation',
        base: overrides && overrides.hasOwnProperty('base') ? overrides.base! : '0x2',
        unitsPerGas: overrides && overrides.hasOwnProperty('unitsPerGas') ? overrides.unitsPerGas! : '0xC',
    };
};

export const aMerkleProof = (overrides?: Partial<GQLMerkleProof>): { __typename: 'MerkleProof' } & GQLMerkleProof => {
    return {
        __typename: 'MerkleProof',
        proofIndex: overrides && overrides.hasOwnProperty('proofIndex') ? overrides.proofIndex! : '0x8',
        proofSet: overrides && overrides.hasOwnProperty('proofSet') ? overrides.proofSet! : ['voluptatem'],
    };
};

export const aMessage = (overrides?: Partial<GQLMessage>): { __typename: 'Message' } & GQLMessage => {
    return {
        __typename: 'Message',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xf',
        daHeight: overrides && overrides.hasOwnProperty('daHeight') ? overrides.daHeight! : '0xD',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0xec2db5aad31B91F403b8bcFA5dD8F6845C6514DaDeea2436cCE1E06CE58B5296Daab472Bb836847ecf6847729Afd2DefC48F9d07b8cb8DfFC165aF23df8c9BcaB436a215F43a7fab959115dDb0dB4e1a',
        nonce: overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'sapiente',
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : 'wcevmsvhv80welag1jy7xwl2tpov1t6j49u8cpu8',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : 'o6quj8u98g4443vfmjfvuul2fxj1vjjhpubzjg0d',
    };
};

export const aMessageCoin = (overrides?: Partial<GQLMessageCoin>): { __typename: 'MessageCoin' } & GQLMessageCoin => {
    return {
        __typename: 'MessageCoin',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xE',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'jpsgc82trduth738qdx4lhs5i49bkjtd',
        daHeight: overrides && overrides.hasOwnProperty('daHeight') ? overrides.daHeight! : '0xD',
        nonce: overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'modi',
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : '9ihbzqa03yfdgtw7q44azh77epkfzyjvoq58ldsc',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : '285w90pyy72x8y114624t9i328lyqmeno2nbs7qk',
    };
};

export const aMessageConnection = (overrides?: Partial<GQLMessageConnection>): { __typename: 'MessageConnection' } & GQLMessageConnection => {
    return {
        __typename: 'MessageConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aMessageEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aMessage()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aMessageEdge = (overrides?: Partial<GQLMessageEdge>): { __typename: 'MessageEdge' } & GQLMessageEdge => {
    return {
        __typename: 'MessageEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'quas',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aMessage(),
    };
};

export const aMessageProof = (overrides?: Partial<GQLMessageProof>): { __typename: 'MessageProof' } & GQLMessageProof => {
    return {
        __typename: 'MessageProof',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xa',
        blockProof: overrides && overrides.hasOwnProperty('blockProof') ? overrides.blockProof! : aMerkleProof(),
        commitBlockHeader: overrides && overrides.hasOwnProperty('commitBlockHeader') ? overrides.commitBlockHeader! : aHeader(),
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0x7d92f23a7d82BaAC7beA88Ba6DD85fFB85c368D7984bf87D32b5DcBb79B877d0b20acE4c41F7f3e601BBBeEAA34BbeeA9AAF4F58E3cc2997e42fDA2d9cb6AFBaec43fa33adDe7F458Eda8c9d318f86aA',
        messageBlockHeader: overrides && overrides.hasOwnProperty('messageBlockHeader') ? overrides.messageBlockHeader! : aHeader(),
        messageProof: overrides && overrides.hasOwnProperty('messageProof') ? overrides.messageProof! : aMerkleProof(),
        nonce: overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'enim',
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : 'dgpdudd1bdvc6wt4rkqjkvi4ycbkxoo9bcn17xof',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : 'yp1myonssz56zhe7fe1iakhvo22x2n8nek77r1lo',
    };
};

export const aMessageStatus = (overrides?: Partial<GQLMessageStatus>): { __typename: 'MessageStatus' } & GQLMessageStatus => {
    return {
        __typename: 'MessageStatus',
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : ('NOT_FOUND' as GQLMessageState),
    };
};

export const aMutation = (overrides?: Partial<GQLMutation>): { __typename: 'Mutation' } & GQLMutation => {
    return {
        __typename: 'Mutation',
        continueTx: overrides && overrides.hasOwnProperty('continueTx') ? overrides.continueTx! : aRunResult(),
        dryRun: overrides && overrides.hasOwnProperty('dryRun') ? overrides.dryRun! : [aDryRunTransactionExecutionStatus()],
        endSession: overrides && overrides.hasOwnProperty('endSession') ? overrides.endSession! : false,
        execute: overrides && overrides.hasOwnProperty('execute') ? overrides.execute! : true,
        produceBlocks: overrides && overrides.hasOwnProperty('produceBlocks') ? overrides.produceBlocks! : 'voluptatum',
        reset: overrides && overrides.hasOwnProperty('reset') ? overrides.reset! : false,
        setBreakpoint: overrides && overrides.hasOwnProperty('setBreakpoint') ? overrides.setBreakpoint! : true,
        setSingleStepping: overrides && overrides.hasOwnProperty('setSingleStepping') ? overrides.setSingleStepping! : false,
        startSession: overrides && overrides.hasOwnProperty('startSession') ? overrides.startSession! : '41a96a12-468a-4440-92ca-9eb4da4141a5',
        startTx: overrides && overrides.hasOwnProperty('startTx') ? overrides.startTx! : aRunResult(),
        submit: overrides && overrides.hasOwnProperty('submit') ? overrides.submit! : aTransaction(),
    };
};

export const aNodeInfo = (overrides?: Partial<GQLNodeInfo>): { __typename: 'NodeInfo' } & GQLNodeInfo => {
    return {
        __typename: 'NodeInfo',
        maxDepth: overrides && overrides.hasOwnProperty('maxDepth') ? overrides.maxDepth! : '0xf',
        maxTx: overrides && overrides.hasOwnProperty('maxTx') ? overrides.maxTx! : '0x2',
        nodeVersion: overrides && overrides.hasOwnProperty('nodeVersion') ? overrides.nodeVersion! : 'nobis',
        peers: overrides && overrides.hasOwnProperty('peers') ? overrides.peers! : [aPeerInfo()],
        utxoValidation: overrides && overrides.hasOwnProperty('utxoValidation') ? overrides.utxoValidation! : true,
        vmBacktrace: overrides && overrides.hasOwnProperty('vmBacktrace') ? overrides.vmBacktrace! : true,
    };
};

export const anOperation = (overrides?: Partial<GQLOperation>): { __typename: 'Operation' } & GQLOperation => {
    return {
        __typename: 'Operation',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : 'vel',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [anOperationReceipt()],
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ('FINAL_RESULT' as GQLOperationType),
    };
};

export const anOperationReceipt = (overrides?: Partial<GQLOperationReceipt>): { __typename: 'OperationReceipt' } & GQLOperationReceipt => {
    return {
        __typename: 'OperationReceipt',
        item: overrides && overrides.hasOwnProperty('item') ? overrides.item! : aReceipt(),
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [anOperationReceipt()],
    };
};

export const anOperationsFilterInput = (overrides?: Partial<GQLOperationsFilterInput>): GQLOperationsFilterInput => {
    return {
        transactionHash: overrides && overrides.hasOwnProperty('transactionHash') ? overrides.transactionHash! : 'asperiores',
    };
};

export const anOutputBreakpoint = (overrides?: Partial<GQLOutputBreakpoint>): { __typename: 'OutputBreakpoint' } & GQLOutputBreakpoint => {
    return {
        __typename: 'OutputBreakpoint',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : '6ghwqlax5rq8vz7bbvxhn3nex1uoqjwo',
        pc: overrides && overrides.hasOwnProperty('pc') ? overrides.pc! : '0xf',
    };
};

export const aPageInfo = (overrides?: Partial<GQLPageInfo>): { __typename: 'PageInfo' } & GQLPageInfo => {
    return {
        __typename: 'PageInfo',
        endCursor: overrides && overrides.hasOwnProperty('endCursor') ? overrides.endCursor! : 'cum',
        hasNextPage: overrides && overrides.hasOwnProperty('hasNextPage') ? overrides.hasNextPage! : false,
        hasPreviousPage: overrides && overrides.hasOwnProperty('hasPreviousPage') ? overrides.hasPreviousPage! : true,
        startCursor: overrides && overrides.hasOwnProperty('startCursor') ? overrides.startCursor! : 'repellendus',
    };
};

export const aPaginatedAccountConnection = (overrides?: Partial<GQLPaginatedAccountConnection>): { __typename: 'PaginatedAccountConnection' } & GQLPaginatedAccountConnection => {
    return {
        __typename: 'PaginatedAccountConnection',
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [anAccountNode()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aParsedTime = (overrides?: Partial<GQLParsedTime>): { __typename: 'ParsedTime' } & GQLParsedTime => {
    return {
        __typename: 'ParsedTime',
        fromNow: overrides && overrides.hasOwnProperty('fromNow') ? overrides.fromNow! : 'amet',
        full: overrides && overrides.hasOwnProperty('full') ? overrides.full! : 'beatae',
        rawTai64: overrides && overrides.hasOwnProperty('rawTai64') ? overrides.rawTai64! : 'esse',
        rawUnix: overrides && overrides.hasOwnProperty('rawUnix') ? overrides.rawUnix! : 'quis',
    };
};

export const aPeerInfo = (overrides?: Partial<GQLPeerInfo>): { __typename: 'PeerInfo' } & GQLPeerInfo => {
    return {
        __typename: 'PeerInfo',
        addresses: overrides && overrides.hasOwnProperty('addresses') ? overrides.addresses! : ['iusto'],
        appScore: overrides && overrides.hasOwnProperty('appScore') ? overrides.appScore! : 0.8,
        blockHeight: overrides && overrides.hasOwnProperty('blockHeight') ? overrides.blockHeight! : 'magni',
        clientVersion: overrides && overrides.hasOwnProperty('clientVersion') ? overrides.clientVersion! : 'vero',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'nesciunt',
        lastHeartbeatMs: overrides && overrides.hasOwnProperty('lastHeartbeatMs') ? overrides.lastHeartbeatMs! : '0x9',
    };
};

export const aPoAConsensus = (overrides?: Partial<GQLPoAConsensus>): { __typename: 'PoAConsensus' } & GQLPoAConsensus => {
    return {
        __typename: 'PoAConsensus',
        signature: overrides && overrides.hasOwnProperty('signature') ? overrides.signature! : 'consectetur',
    };
};

export const aPolicies = (overrides?: Partial<GQLPolicies>): { __typename: 'Policies' } & GQLPolicies => {
    return {
        __typename: 'Policies',
        maturity: overrides && overrides.hasOwnProperty('maturity') ? overrides.maturity! : 'ex',
        maxFee: overrides && overrides.hasOwnProperty('maxFee') ? overrides.maxFee! : '0x8',
        tip: overrides && overrides.hasOwnProperty('tip') ? overrides.tip! : '0xF',
        witnessLimit: overrides && overrides.hasOwnProperty('witnessLimit') ? overrides.witnessLimit! : '0xb',
    };
};

export const aPredicateItem = (overrides?: Partial<GQLPredicateItem>): { __typename: 'PredicateItem' } & GQLPredicateItem => {
    return {
        __typename: 'PredicateItem',
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'ox7pg9io73m8gcks4s0p2qrr3sfsvhyndkpdkqqr',
        bytecode: overrides && overrides.hasOwnProperty('bytecode') ? overrides.bytecode! : 'ex',
    };
};

export const aPredicateParameters = (overrides?: Partial<GQLPredicateParameters>): { __typename: 'PredicateParameters' } & GQLPredicateParameters => {
    return {
        __typename: 'PredicateParameters',
        maxGasPerPredicate: overrides && overrides.hasOwnProperty('maxGasPerPredicate') ? overrides.maxGasPerPredicate! : '0x0',
        maxMessageDataLength: overrides && overrides.hasOwnProperty('maxMessageDataLength') ? overrides.maxMessageDataLength! : '0xe',
        maxPredicateDataLength: overrides && overrides.hasOwnProperty('maxPredicateDataLength') ? overrides.maxPredicateDataLength! : '0xE',
        maxPredicateLength: overrides && overrides.hasOwnProperty('maxPredicateLength') ? overrides.maxPredicateLength! : '0x8',
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLPredicateParametersVersion),
    };
};

export const aProgramState = (overrides?: Partial<GQLProgramState>): { __typename: 'ProgramState' } & GQLProgramState => {
    return {
        __typename: 'ProgramState',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0xE8f2fDf6aF89644c89Ca7eC89Bd1Aab8B95c114F2eE3fBF8b1C10AC6ccCe9EafA5dCeFaC56832ED898dC230295bc996bBCa7b21Fb0F614b0B2C28e964C2aA9f0F1C1808c9B9cB0ab60EAD68F8E07Baa2',
        returnType: overrides && overrides.hasOwnProperty('returnType') ? overrides.returnType! : ('RETURN' as GQLReturnType),
    };
};

export const aQuery = (overrides?: Partial<GQLQuery>): { __typename: 'Query' } & GQLQuery => {
    return {
        __typename: 'Query',
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : anAsset(),
        balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : aBalance(),
        balances: overrides && overrides.hasOwnProperty('balances') ? overrides.balances! : aBalanceConnection(),
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : aBlock(),
        blocks: overrides && overrides.hasOwnProperty('blocks') ? overrides.blocks! : aBlockConnection(),
        chain: overrides && overrides.hasOwnProperty('chain') ? overrides.chain! : aChainInfo(),
        coin: overrides && overrides.hasOwnProperty('coin') ? overrides.coin! : aCoin(),
        coins: overrides && overrides.hasOwnProperty('coins') ? overrides.coins! : aCoinConnection(),
        coinsToSpend: overrides && overrides.hasOwnProperty('coinsToSpend') ? overrides.coinsToSpend! : [[aCoin()]],
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : aContract(),
        contractBalance: overrides && overrides.hasOwnProperty('contractBalance') ? overrides.contractBalance! : aContractBalance(),
        contractBalances: overrides && overrides.hasOwnProperty('contractBalances') ? overrides.contractBalances! : aContractBalanceConnection(),
        contracts: overrides && overrides.hasOwnProperty('contracts') ? overrides.contracts! : aContractConnection(),
        estimateGasPrice: overrides && overrides.hasOwnProperty('estimateGasPrice') ? overrides.estimateGasPrice! : anEstimateGasPrice(),
        estimatePredicates: overrides && overrides.hasOwnProperty('estimatePredicates') ? overrides.estimatePredicates! : aTransaction(),
        getBlocksDashboard: overrides && overrides.hasOwnProperty('getBlocksDashboard') ? overrides.getBlocksDashboard! : aBlocksDashboardConnection(),
        health: overrides && overrides.hasOwnProperty('health') ? overrides.health! : true,
        latestGasPrice: overrides && overrides.hasOwnProperty('latestGasPrice') ? overrides.latestGasPrice! : aLatestGasPrice(),
        memory: overrides && overrides.hasOwnProperty('memory') ? overrides.memory! : 'id',
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : aMessage(),
        messageProof: overrides && overrides.hasOwnProperty('messageProof') ? overrides.messageProof! : aMessageProof(),
        messageStatus: overrides && overrides.hasOwnProperty('messageStatus') ? overrides.messageStatus! : aMessageStatus(),
        messages: overrides && overrides.hasOwnProperty('messages') ? overrides.messages! : aMessageConnection(),
        nodeInfo: overrides && overrides.hasOwnProperty('nodeInfo') ? overrides.nodeInfo! : aNodeInfo(),
        paginatedAccounts: overrides && overrides.hasOwnProperty('paginatedAccounts') ? overrides.paginatedAccounts! : aPaginatedAccountConnection(),
        predicate: overrides && overrides.hasOwnProperty('predicate') ? overrides.predicate! : aPredicateItem(),
        register: overrides && overrides.hasOwnProperty('register') ? overrides.register! : '0x3',
        relayedTransactionStatus: overrides && overrides.hasOwnProperty('relayedTransactionStatus') ? overrides.relayedTransactionStatus! : aRelayedTransactionFailed(),
        search: overrides && overrides.hasOwnProperty('search') ? overrides.search! : aSearchResult(),
        tps: overrides && overrides.hasOwnProperty('tps') ? overrides.tps! : aTpsConnection(),
        transaction: overrides && overrides.hasOwnProperty('transaction') ? overrides.transaction! : aTransaction(),
        transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : aTransactionConnection(),
        transactionsByBlockId: overrides && overrides.hasOwnProperty('transactionsByBlockId') ? overrides.transactionsByBlockId! : aTransactionConnection(),
        transactionsByOwner: overrides && overrides.hasOwnProperty('transactionsByOwner') ? overrides.transactionsByOwner! : aTransactionConnection(),
    };
};

export const aReceipt = (overrides?: Partial<GQLReceipt>): { __typename: 'Receipt' } & GQLReceipt => {
    return {
        __typename: 'Receipt',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xB',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'z58vuwpyp5fwi1yhwzlqj9ka232t9a8r',
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : '9d382ivp4mteisohn79svut91p9msibm',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0xe2b353aAEa5e7E1Ff6fc4Da5bf9c0af8c0DcEe5ECD206ba852cDf1C7285F1fbd9eCbE4ba1AFCb6f9f4ef2Ce96c1a8f1DFE4AcD2FaD74D82eB1DFBFeFE3fc2F8EADBeeCDEE0ebF41E3ba0682aaa8Fa59A',
        digest: overrides && overrides.hasOwnProperty('digest') ? overrides.digest! : 'architecto',
        gas: overrides && overrides.hasOwnProperty('gas') ? overrides.gas! : '0x4',
        gasUsed: overrides && overrides.hasOwnProperty('gasUsed') ? overrides.gasUsed! : '0x2',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'reo93p7ao7a7vbjgwe4zokw7iw1tt5p9',
        is: overrides && overrides.hasOwnProperty('is') ? overrides.is! : '0xb',
        len: overrides && overrides.hasOwnProperty('len') ? overrides.len! : '0xf',
        nonce: overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'mollitia',
        param1: overrides && overrides.hasOwnProperty('param1') ? overrides.param1! : '0xf',
        param2: overrides && overrides.hasOwnProperty('param2') ? overrides.param2! : '0xe',
        pc: overrides && overrides.hasOwnProperty('pc') ? overrides.pc! : '0xd',
        ptr: overrides && overrides.hasOwnProperty('ptr') ? overrides.ptr! : '0x8',
        ra: overrides && overrides.hasOwnProperty('ra') ? overrides.ra! : '0xA',
        rb: overrides && overrides.hasOwnProperty('rb') ? overrides.rb! : '0xd',
        rc: overrides && overrides.hasOwnProperty('rc') ? overrides.rc! : '0x2',
        rd: overrides && overrides.hasOwnProperty('rd') ? overrides.rd! : '0xF',
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : '0xF',
        receiptType: overrides && overrides.hasOwnProperty('receiptType') ? overrides.receiptType! : ('BURN' as GQLReceiptType),
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : 'q7mhlsz9na9drlzwtj38y91r243dzrsfdkzsyxiq',
        result: overrides && overrides.hasOwnProperty('result') ? overrides.result! : '0x0',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : 'ysjl9jycalt7pupoecumgfg3l76d5g22g2yy181x',
        subId: overrides && overrides.hasOwnProperty('subId') ? overrides.subId! : 'quam',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'qlna7hjcuqu3yun5jqzky8dn9wag39kd',
        toAddress: overrides && overrides.hasOwnProperty('toAddress') ? overrides.toAddress! : '40v7wkyreg1nryfbtnbhw09swv0ciohkdcfloi6w',
        val: overrides && overrides.hasOwnProperty('val') ? overrides.val! : '0xf',
    };
};

export const aRelayedTransactionFailed = (overrides?: Partial<GQLRelayedTransactionFailed>): { __typename: 'RelayedTransactionFailed' } & GQLRelayedTransactionFailed => {
    return {
        __typename: 'RelayedTransactionFailed',
        blockHeight: overrides && overrides.hasOwnProperty('blockHeight') ? overrides.blockHeight! : 'velit',
        failure: overrides && overrides.hasOwnProperty('failure') ? overrides.failure! : 'cumque',
    };
};

export const aRunResult = (overrides?: Partial<GQLRunResult>): { __typename: 'RunResult' } & GQLRunResult => {
    return {
        __typename: 'RunResult',
        breakpoint: overrides && overrides.hasOwnProperty('breakpoint') ? overrides.breakpoint! : anOutputBreakpoint(),
        jsonReceipts: overrides && overrides.hasOwnProperty('jsonReceipts') ? overrides.jsonReceipts! : ['esse'],
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : ('BREAKPOINT' as GQLRunState),
    };
};

export const aScriptParameters = (overrides?: Partial<GQLScriptParameters>): { __typename: 'ScriptParameters' } & GQLScriptParameters => {
    return {
        __typename: 'ScriptParameters',
        maxScriptDataLength: overrides && overrides.hasOwnProperty('maxScriptDataLength') ? overrides.maxScriptDataLength! : '0x9',
        maxScriptLength: overrides && overrides.hasOwnProperty('maxScriptLength') ? overrides.maxScriptLength! : '0x8',
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLScriptParametersVersion),
    };
};

export const aSearchAccount = (overrides?: Partial<GQLSearchAccount>): { __typename: 'SearchAccount' } & GQLSearchAccount => {
    return {
        __typename: 'SearchAccount',
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'fxjjhq8rar88egu9vnil1ab5e9xsldm8tl3aii4l',
        transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aSearchTransaction()],
    };
};

export const aSearchBlock = (overrides?: Partial<GQLSearchBlock>): { __typename: 'SearchBlock' } & GQLSearchBlock => {
    return {
        __typename: 'SearchBlock',
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 'ea',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'necessitatibus',
    };
};

export const aSearchContract = (overrides?: Partial<GQLSearchContract>): { __typename: 'SearchContract' } & GQLSearchContract => {
    return {
        __typename: 'SearchContract',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'cal06fr6xavgycxm6euv9zube4yuy9v6',
    };
};

export const aSearchResult = (overrides?: Partial<GQLSearchResult>): { __typename: 'SearchResult' } & GQLSearchResult => {
    return {
        __typename: 'SearchResult',
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : aSearchAccount(),
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : aSearchBlock(),
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : aSearchContract(),
        transaction: overrides && overrides.hasOwnProperty('transaction') ? overrides.transaction! : aSearchTransaction(),
    };
};

export const aSearchTransaction = (overrides?: Partial<GQLSearchTransaction>): { __typename: 'SearchTransaction' } & GQLSearchTransaction => {
    return {
        __typename: 'SearchTransaction',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ikjck0dx2w0q8gftmk41pxgde8kadbzf',
    };
};

export const aSpendQueryElementInput = (overrides?: Partial<GQLSpendQueryElementInput>): GQLSpendQueryElementInput => {
    return {
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xd',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'uf0lsb3kvot747ow9j0nv0mh9tf7zsgw',
        max: overrides && overrides.hasOwnProperty('max') ? overrides.max! : 'odit',
    };
};

export const aSqueezedOutStatus = (overrides?: Partial<GQLSqueezedOutStatus>): { __typename: 'SqueezedOutStatus' } & GQLSqueezedOutStatus => {
    return {
        __typename: 'SqueezedOutStatus',
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'voluptatibus',
    };
};

export const aStateTransitionPurpose = (overrides?: Partial<GQLStateTransitionPurpose>): { __typename: 'StateTransitionPurpose' } & GQLStateTransitionPurpose => {
    return {
        __typename: 'StateTransitionPurpose',
        root: overrides && overrides.hasOwnProperty('root') ? overrides.root! : 'quibusdam',
    };
};

export const aSubmittedStatus = (overrides?: Partial<GQLSubmittedStatus>): { __typename: 'SubmittedStatus' } & GQLSubmittedStatus => {
    return {
        __typename: 'SubmittedStatus',
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'natus',
    };
};

export const aSubscription = (overrides?: Partial<GQLSubscription>): { __typename: 'Subscription' } & GQLSubscription => {
    return {
        __typename: 'Subscription',
        statusChange: overrides && overrides.hasOwnProperty('statusChange') ? overrides.statusChange! : aFailureStatus(),
        submitAndAwait: overrides && overrides.hasOwnProperty('submitAndAwait') ? overrides.submitAndAwait! : aFailureStatus(),
    };
};

export const aSuccessStatus = (overrides?: Partial<GQLSuccessStatus>): { __typename: 'SuccessStatus' } & GQLSuccessStatus => {
    return {
        __typename: 'SuccessStatus',
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : aBlock(),
        programState: overrides && overrides.hasOwnProperty('programState') ? overrides.programState! : aProgramState(),
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'modi',
        totalFee: overrides && overrides.hasOwnProperty('totalFee') ? overrides.totalFee! : '0x2',
        totalGas: overrides && overrides.hasOwnProperty('totalGas') ? overrides.totalGas! : '0x0',
        transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : '7yxyr87uqpfquupe4qq7bmmlpvtejjdv',
    };
};

export const aTps = (overrides?: Partial<GQLTps>): { __typename: 'TPS' } & GQLTps => {
    return {
        __typename: 'TPS',
        end: overrides && overrides.hasOwnProperty('end') ? overrides.end! : 'unde',
        start: overrides && overrides.hasOwnProperty('start') ? overrides.start! : 'rerum',
        totalGas: overrides && overrides.hasOwnProperty('totalGas') ? overrides.totalGas! : '0x9',
        txCount: overrides && overrides.hasOwnProperty('txCount') ? overrides.txCount! : '0xA',
    };
};

export const aTpsConnection = (overrides?: Partial<GQLTpsConnection>): { __typename: 'TPSConnection' } & GQLTpsConnection => {
    return {
        __typename: 'TPSConnection',
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aTps()],
    };
};

export const aTransaction = (overrides?: Partial<GQLTransaction>): { __typename: 'Transaction' } & GQLTransaction => {
    return {
        __typename: 'Transaction',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : 'quidem',
        blockHeight: overrides && overrides.hasOwnProperty('blockHeight') ? overrides.blockHeight! : 'non',
        bytecodeRoot: overrides && overrides.hasOwnProperty('bytecodeRoot') ? overrides.bytecodeRoot! : 'fugit',
        bytecodeWitnessIndex: overrides && overrides.hasOwnProperty('bytecodeWitnessIndex') ? overrides.bytecodeWitnessIndex! : '0xE',
        gasCosts: overrides && overrides.hasOwnProperty('gasCosts') ? overrides.gasCosts! : aTransactionGasCosts(),
        groupedInputs: overrides && overrides.hasOwnProperty('groupedInputs') ? overrides.groupedInputs! : [aGroupedInputCoin()],
        groupedOutputs: overrides && overrides.hasOwnProperty('groupedOutputs') ? overrides.groupedOutputs! : [aGroupedOutputChanged()],
        hasPredicate: overrides && overrides.hasOwnProperty('hasPredicate') ? overrides.hasPredicate! : true,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'm5skeiw541vcdt1lceitryfralzuwdw9',
        inputAssetIds: overrides && overrides.hasOwnProperty('inputAssetIds') ? overrides.inputAssetIds! : ['ivh1nwdxbmv9t9y30qbwmnpsdwxc5pao'],
        inputContract: overrides && overrides.hasOwnProperty('inputContract') ? overrides.inputContract! : anInputContract(),
        inputContracts: overrides && overrides.hasOwnProperty('inputContracts') ? overrides.inputContracts! : ['273v2irztwdqtobbwmf7mfamdjf2ieff'],
        inputs: overrides && overrides.hasOwnProperty('inputs') ? overrides.inputs! : [anInputCoin()],
        isCreate: overrides && overrides.hasOwnProperty('isCreate') ? overrides.isCreate! : true,
        isMint: overrides && overrides.hasOwnProperty('isMint') ? overrides.isMint! : false,
        isScript: overrides && overrides.hasOwnProperty('isScript') ? overrides.isScript! : true,
        isUpgrade: overrides && overrides.hasOwnProperty('isUpgrade') ? overrides.isUpgrade! : false,
        isUpload: overrides && overrides.hasOwnProperty('isUpload') ? overrides.isUpload! : false,
        maturity: overrides && overrides.hasOwnProperty('maturity') ? overrides.maturity! : 'distinctio',
        mintAmount: overrides && overrides.hasOwnProperty('mintAmount') ? overrides.mintAmount! : '0x4',
        mintAssetId: overrides && overrides.hasOwnProperty('mintAssetId') ? overrides.mintAssetId! : 'ear74yjd6jnrhxyo9jp8jbbywtajy2y7',
        mintGasPrice: overrides && overrides.hasOwnProperty('mintGasPrice') ? overrides.mintGasPrice! : '0xd',
        operations: overrides && overrides.hasOwnProperty('operations') ? overrides.operations! : [anOperation()],
        outputContract: overrides && overrides.hasOwnProperty('outputContract') ? overrides.outputContract! : aContractOutput(),
        outputs: overrides && overrides.hasOwnProperty('outputs') ? overrides.outputs! : [aChangeOutput()],
        policies: overrides && overrides.hasOwnProperty('policies') ? overrides.policies! : aPolicies(),
        proofSet: overrides && overrides.hasOwnProperty('proofSet') ? overrides.proofSet! : ['sint'],
        rawPayload: overrides && overrides.hasOwnProperty('rawPayload') ? overrides.rawPayload! : '0xCafBd5Ce4b560Aca24ffa36ce3BdFbAdbeDef78a2f072846FBE99a5FC46eFaAb7CBdFCdd25acC24Ead593EBAE0eA8Ce6CDE3fAa6FD794c53eBb332A25EdD6F86e1BD0CF857DA0DdD7bC49E162cFdE61C',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        receiptsRoot: overrides && overrides.hasOwnProperty('receiptsRoot') ? overrides.receiptsRoot! : 'debitis',
        salt: overrides && overrides.hasOwnProperty('salt') ? overrides.salt! : 'fuga',
        script: overrides && overrides.hasOwnProperty('script') ? overrides.script! : '0xb57ff0B5B7b8fddBE6BC4CF94dFccd4BA278C9b9eCddf46Ad73baBcE85d1ABEaECe392fbeB37116cFcc8E5a15C3E4Ea7356B35c70a1d4DBFe8ab0EDf83bFf6f54FCFF0e90b42b363CD4bEca9d5AB38D5',
        scriptData: overrides && overrides.hasOwnProperty('scriptData') ? overrides.scriptData! : '0xa8B9bEba75644Ef15fc7FE0ebEdc7376E6D83DF543E4218a00556f33B1cfa47D935B2cbD0CCD36D1D5074D1bbFAC059E4fCcd3d8FADbca1CcCa85DFb15cdcA817a6aD1d52dd4bbee8ae8c3A08e0dC56A',
        scriptGasLimit: overrides && overrides.hasOwnProperty('scriptGasLimit') ? overrides.scriptGasLimit! : '0xA',
        status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : aFailureStatus(),
        statusType: overrides && overrides.hasOwnProperty('statusType') ? overrides.statusType! : 'inventore',
        storageSlots: overrides && overrides.hasOwnProperty('storageSlots') ? overrides.storageSlots! : ['0x93F3d4f06033Babda85ce01DC9cbfc37cEddcBFf9bEd8DE4c4E83B5305a1DfFb3C4ef9d6E51AEAb68bf0D70eD039DCffF924C2359c5d1c0c0C41C4B2fafF6F692aD54de3a4CAace3bfef27eefe672530'],
        subsectionIndex: overrides && overrides.hasOwnProperty('subsectionIndex') ? overrides.subsectionIndex! : '0x6',
        subsectionsNumber: overrides && overrides.hasOwnProperty('subsectionsNumber') ? overrides.subsectionsNumber! : '0xE',
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : aParsedTime(),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'qui',
        txPointer: overrides && overrides.hasOwnProperty('txPointer') ? overrides.txPointer! : 'expedita',
        upgradePurpose: overrides && overrides.hasOwnProperty('upgradePurpose') ? overrides.upgradePurpose! : aConsensusParametersPurpose(),
        witnesses: overrides && overrides.hasOwnProperty('witnesses') ? overrides.witnesses! : ['0x8b5Da64f37447BECBc9A170Ab9C36D48b0D4D0FBEdc79240BE46b52AbfFc1DB1BC9deAEe64E474Ed67bf8641137b857CBCA06ea6362937913F3EDEaca7ffC1Abf45ab6a7941D8bF61Bec1B5fAB8fbb1b'],
    };
};

export const aTransactionConnection = (overrides?: Partial<GQLTransactionConnection>): { __typename: 'TransactionConnection' } & GQLTransactionConnection => {
    return {
        __typename: 'TransactionConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aTransactionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aTransaction()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aTransactionEdge = (overrides?: Partial<GQLTransactionEdge>): { __typename: 'TransactionEdge' } & GQLTransactionEdge => {
    return {
        __typename: 'TransactionEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'eos',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aTransaction(),
    };
};

export const aTransactionGasCosts = (overrides?: Partial<GQLTransactionGasCosts>): { __typename: 'TransactionGasCosts' } & GQLTransactionGasCosts => {
    return {
        __typename: 'TransactionGasCosts',
        fee: overrides && overrides.hasOwnProperty('fee') ? overrides.fee! : '0x8',
        gasUsed: overrides && overrides.hasOwnProperty('gasUsed') ? overrides.gasUsed! : '0xf',
    };
};

export const aTxParameters = (overrides?: Partial<GQLTxParameters>): { __typename: 'TxParameters' } & GQLTxParameters => {
    return {
        __typename: 'TxParameters',
        maxBytecodeSubsections: overrides && overrides.hasOwnProperty('maxBytecodeSubsections') ? overrides.maxBytecodeSubsections! : '0x0',
        maxGasPerTx: overrides && overrides.hasOwnProperty('maxGasPerTx') ? overrides.maxGasPerTx! : '0xf',
        maxInputs: overrides && overrides.hasOwnProperty('maxInputs') ? overrides.maxInputs! : '0xA',
        maxOutputs: overrides && overrides.hasOwnProperty('maxOutputs') ? overrides.maxOutputs! : '0x9',
        maxSize: overrides && overrides.hasOwnProperty('maxSize') ? overrides.maxSize! : '0x4',
        maxWitnesses: overrides && overrides.hasOwnProperty('maxWitnesses') ? overrides.maxWitnesses! : 'modi',
        version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : ('V1' as GQLTxParametersVersion),
    };
};

export const anUtxoItem = (overrides?: Partial<GQLUtxoItem>): { __typename: 'UtxoItem' } & GQLUtxoItem => {
    return {
        __typename: 'UtxoItem',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xB',
        blockCreated: overrides && overrides.hasOwnProperty('blockCreated') ? overrides.blockCreated! : 'quasi',
        txCreatedIdx: overrides && overrides.hasOwnProperty('txCreatedIdx') ? overrides.txCreatedIdx! : '0xD',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : 'yk6ff55bv2kpr4nl0rf5mxxuz7pelbo0',
    };
};

export const aVariableOutput = (overrides?: Partial<GQLVariableOutput>): { __typename: 'VariableOutput' } & GQLVariableOutput => {
    return {
        __typename: 'VariableOutput',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xc',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'hq38k3ap8ok8krpquh789zkbfdd74ab6',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : '4gs9ppn7jqumdt8t0gd7u4mra5dblqlbgjy1w5bv',
    };
};
