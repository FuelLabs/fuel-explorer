import { Account, Balance, BalanceConnection, BalanceEdge, BalanceFilterInput, Block, BlockConnection, BlockEdge, Breakpoint, ChainInfo, ChangeOutput, Coin, CoinConnection, CoinEdge, CoinFilterInput, CoinOutput, ConsensusParameters, Contract, ContractBalance, ContractBalanceConnection, ContractBalanceEdge, ContractBalanceFilterInput, ContractCreated, ContractOutput, ContractParameters, ExcludeInput, FailureStatus, FeeParameters, GasCosts, Genesis, GroupedInput, GroupedOutput, Header, HeavyOperation, InputCoin, InputContract, InputMessage, LightOperation, MerkleProof, Message, MessageCoin, MessageConnection, MessageEdge, MessageProof, MessageStatus, Mutation, NodeInfo, Operation, OperationReceipt, OutputBreakpoint, PageInfo, ParsedTime, PeerInfo, PoAConsensus, Policies, Predicate, PredicateParameters, ProgramState, Query, Receipt, RunResult, ScriptParameters, SearchAccount, SearchBlock, SearchContract, SearchResult, SearchTransaction, SpendQueryElementInput, SqueezedOutStatus, SubmittedStatus, Subscription, SuccessStatus, Token, Transaction, TransactionAccount, TransactionConnection, TransactionEdge, TxParameters, UtxoItem, VariableOutput, GroupedInputType, GroupedOutputType, MessageState, OperationType, ReceiptType, _ReturnType as ReturnType, RunState, TransactionAccountType, TransactionStatusType } from './types';

export const anAccount = (overrides?: Partial<Account>): { __typename: 'Account' } & Account => {
    return {
        __typename: 'Account',
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'autem',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'nostrum',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'rerum',
    };
};

export const aBalance = (overrides?: Partial<Balance>): { __typename: 'Balance' } & Balance => {
    return {
        __typename: 'Balance',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0x0',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'a0f8od7pvhhubad7x3hz9o0zn7xp5j23',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'tx4go3g6en5w03qjzwnt6ugwv26qrm5q9mwtq5lp',
        utxos: overrides && overrides.hasOwnProperty('utxos') ? overrides.utxos! : [anUtxoItem()],
    };
};

export const aBalanceConnection = (overrides?: Partial<BalanceConnection>): { __typename: 'BalanceConnection' } & BalanceConnection => {
    return {
        __typename: 'BalanceConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aBalanceEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aBalance()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aBalanceEdge = (overrides?: Partial<BalanceEdge>): { __typename: 'BalanceEdge' } & BalanceEdge => {
    return {
        __typename: 'BalanceEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'tenetur',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aBalance(),
    };
};

export const aBalanceFilterInput = (overrides?: Partial<BalanceFilterInput>): BalanceFilterInput => {
    return {
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : '9nrgo4xy0vszugxxsuu7t7k4heqvx2it46ns6n49',
    };
};

export const aBlock = (overrides?: Partial<Block>): { __typename: 'Block' } & Block => {
    return {
        __typename: 'Block',
        consensus: overrides && overrides.hasOwnProperty('consensus') ? overrides.consensus! : aGenesis(),
        header: overrides && overrides.hasOwnProperty('header') ? overrides.header! : aHeader(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'fuga',
        producer: overrides && overrides.hasOwnProperty('producer') ? overrides.producer! : 'tf26peb03uo1z0i4l6d7yfnvuzumd2fiukebb742',
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : aParsedTime(),
        totalGasUsed: overrides && overrides.hasOwnProperty('totalGasUsed') ? overrides.totalGasUsed! : '0x1',
        transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aTransaction()],
    };
};

export const aBlockConnection = (overrides?: Partial<BlockConnection>): { __typename: 'BlockConnection' } & BlockConnection => {
    return {
        __typename: 'BlockConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aBlockEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aBlock()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aBlockEdge = (overrides?: Partial<BlockEdge>): { __typename: 'BlockEdge' } & BlockEdge => {
    return {
        __typename: 'BlockEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'id',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aBlock(),
    };
};

export const aBreakpoint = (overrides?: Partial<Breakpoint>): Breakpoint => {
    return {
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : 'spxsyh8uujdpzc8kg4t7lkz0r7qmcdsb',
        pc: overrides && overrides.hasOwnProperty('pc') ? overrides.pc! : '0xa',
    };
};

export const aChainInfo = (overrides?: Partial<ChainInfo>): { __typename: 'ChainInfo' } & ChainInfo => {
    return {
        __typename: 'ChainInfo',
        consensusParameters: overrides && overrides.hasOwnProperty('consensusParameters') ? overrides.consensusParameters! : aConsensusParameters(),
        daHeight: overrides && overrides.hasOwnProperty('daHeight') ? overrides.daHeight! : '0xE',
        gasCosts: overrides && overrides.hasOwnProperty('gasCosts') ? overrides.gasCosts! : aGasCosts(),
        latestBlock: overrides && overrides.hasOwnProperty('latestBlock') ? overrides.latestBlock! : aBlock(),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'autem',
    };
};

export const aChangeOutput = (overrides?: Partial<ChangeOutput>): { __typename: 'ChangeOutput' } & ChangeOutput => {
    return {
        __typename: 'ChangeOutput',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xD',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'e0jf4dwzgypv3lmvt8yed3ebs8sco6xm',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'dhi4r4fhri7jpmudxj1zxawwhmvmg15ehun33smn',
    };
};

export const aCoin = (overrides?: Partial<Coin>): { __typename: 'Coin' } & Coin => {
    return {
        __typename: 'Coin',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xD',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'vl8kx5cac3pojox0cdisfofoyu6smapv',
        blockCreated: overrides && overrides.hasOwnProperty('blockCreated') ? overrides.blockCreated! : 'doloremque',
        maturity: overrides && overrides.hasOwnProperty('maturity') ? overrides.maturity! : 'architecto',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'on6sn7qh1ssgeb35sg0so4u4lp3izj4yafvrlk8x',
        txCreatedIdx: overrides && overrides.hasOwnProperty('txCreatedIdx') ? overrides.txCreatedIdx! : '0x7',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : '78r15xdj851q7w4q6k0tqeof9vlk0gns',
    };
};

export const aCoinConnection = (overrides?: Partial<CoinConnection>): { __typename: 'CoinConnection' } & CoinConnection => {
    return {
        __typename: 'CoinConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aCoinEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aCoin()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aCoinEdge = (overrides?: Partial<CoinEdge>): { __typename: 'CoinEdge' } & CoinEdge => {
    return {
        __typename: 'CoinEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'excepturi',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aCoin(),
    };
};

export const aCoinFilterInput = (overrides?: Partial<CoinFilterInput>): CoinFilterInput => {
    return {
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'kudfhe4l01ysp8358vb8xz1k8veh59hy',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'baoj8afcxig6c9huma1wloyvmbchd8yi7qa85afh',
    };
};

export const aCoinOutput = (overrides?: Partial<CoinOutput>): { __typename: 'CoinOutput' } & CoinOutput => {
    return {
        __typename: 'CoinOutput',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xD',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 't153mt7lkdbnhho3wb4ukkb48qhhudy7',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : '9olpk2xb6cjl4kyy3he3py3yu0bkm85chtuggo6i',
    };
};

export const aConsensusParameters = (overrides?: Partial<ConsensusParameters>): { __typename: 'ConsensusParameters' } & ConsensusParameters => {
    return {
        __typename: 'ConsensusParameters',
        baseAssetId: overrides && overrides.hasOwnProperty('baseAssetId') ? overrides.baseAssetId! : 'l2lmmdg42iyd8pb2v79vqcg6fnko5egl',
        chainId: overrides && overrides.hasOwnProperty('chainId') ? overrides.chainId! : '0x3',
        contractParams: overrides && overrides.hasOwnProperty('contractParams') ? overrides.contractParams! : aContractParameters(),
        feeParams: overrides && overrides.hasOwnProperty('feeParams') ? overrides.feeParams! : aFeeParameters(),
        gasCosts: overrides && overrides.hasOwnProperty('gasCosts') ? overrides.gasCosts! : aGasCosts(),
        predicateParams: overrides && overrides.hasOwnProperty('predicateParams') ? overrides.predicateParams! : aPredicateParameters(),
        scriptParams: overrides && overrides.hasOwnProperty('scriptParams') ? overrides.scriptParams! : aScriptParameters(),
        txParams: overrides && overrides.hasOwnProperty('txParams') ? overrides.txParams! : aTxParameters(),
    };
};

export const aContract = (overrides?: Partial<Contract>): { __typename: 'Contract' } & Contract => {
    return {
        __typename: 'Contract',
        bytecode: overrides && overrides.hasOwnProperty('bytecode') ? overrides.bytecode! : '0x6092A6C7eb64c9b1A755Df9bE83fC7Bd5bFF2c090Df255Da243CAB4811Fc2016D2a2Ae93CFEDE4FD8d99ab3Dca0DDdAbc7CF1ba3FbAA761e3eC17f8d1609fD5e46BEFFD6886EB1BCA208bB2AE8bEDADF',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '51d28wg0iw33x467k5qd81kn5b9wnrtg',
        salt: overrides && overrides.hasOwnProperty('salt') ? overrides.salt! : 'repellendus',
    };
};

export const aContractBalance = (overrides?: Partial<ContractBalance>): { __typename: 'ContractBalance' } & ContractBalance => {
    return {
        __typename: 'ContractBalance',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xc',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'm1on4nvj5caxtv0dkued0ncku5ydtsxu',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : '7bdxyt98z950w2en4wp4kh5fxekvlzqv',
    };
};

export const aContractBalanceConnection = (overrides?: Partial<ContractBalanceConnection>): { __typename: 'ContractBalanceConnection' } & ContractBalanceConnection => {
    return {
        __typename: 'ContractBalanceConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aContractBalanceEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aContractBalance()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aContractBalanceEdge = (overrides?: Partial<ContractBalanceEdge>): { __typename: 'ContractBalanceEdge' } & ContractBalanceEdge => {
    return {
        __typename: 'ContractBalanceEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nesciunt',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aContractBalance(),
    };
};

export const aContractBalanceFilterInput = (overrides?: Partial<ContractBalanceFilterInput>): ContractBalanceFilterInput => {
    return {
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : 'lly4yjylzlm1dnmj5lwzlk0tbb9no5sx',
    };
};

export const aContractCreated = (overrides?: Partial<ContractCreated>): { __typename: 'ContractCreated' } & ContractCreated => {
    return {
        __typename: 'ContractCreated',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : aContract(),
        stateRoot: overrides && overrides.hasOwnProperty('stateRoot') ? overrides.stateRoot! : 'dolores',
    };
};

export const aContractOutput = (overrides?: Partial<ContractOutput>): { __typename: 'ContractOutput' } & ContractOutput => {
    return {
        __typename: 'ContractOutput',
        balanceRoot: overrides && overrides.hasOwnProperty('balanceRoot') ? overrides.balanceRoot! : 'architecto',
        inputIndex: overrides && overrides.hasOwnProperty('inputIndex') ? overrides.inputIndex! : 3397,
        stateRoot: overrides && overrides.hasOwnProperty('stateRoot') ? overrides.stateRoot! : 'animi',
    };
};

export const aContractParameters = (overrides?: Partial<ContractParameters>): { __typename: 'ContractParameters' } & ContractParameters => {
    return {
        __typename: 'ContractParameters',
        contractMaxSize: overrides && overrides.hasOwnProperty('contractMaxSize') ? overrides.contractMaxSize! : '0xA',
        maxStorageSlots: overrides && overrides.hasOwnProperty('maxStorageSlots') ? overrides.maxStorageSlots! : '0x0',
    };
};

export const anExcludeInput = (overrides?: Partial<ExcludeInput>): ExcludeInput => {
    return {
        messages: overrides && overrides.hasOwnProperty('messages') ? overrides.messages! : ['facilis'],
        utxos: overrides && overrides.hasOwnProperty('utxos') ? overrides.utxos! : ['rjjvinnn08hy31jzmpuci05byajz8wme'],
    };
};

export const aFailureStatus = (overrides?: Partial<FailureStatus>): { __typename: 'FailureStatus' } & FailureStatus => {
    return {
        __typename: 'FailureStatus',
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : aBlock(),
        programState: overrides && overrides.hasOwnProperty('programState') ? overrides.programState! : aProgramState(),
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'corporis',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'itaque',
        transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : 'y3992yk84ltlkuu5f6glx6r5iitmdig8',
    };
};

export const aFeeParameters = (overrides?: Partial<FeeParameters>): { __typename: 'FeeParameters' } & FeeParameters => {
    return {
        __typename: 'FeeParameters',
        gasPerByte: overrides && overrides.hasOwnProperty('gasPerByte') ? overrides.gasPerByte! : '0xA',
        gasPriceFactor: overrides && overrides.hasOwnProperty('gasPriceFactor') ? overrides.gasPriceFactor! : '0xb',
    };
};

export const aGasCosts = (overrides?: Partial<GasCosts>): { __typename: 'GasCosts' } & GasCosts => {
    return {
        __typename: 'GasCosts',
        add: overrides && overrides.hasOwnProperty('add') ? overrides.add! : '0xd',
        addi: overrides && overrides.hasOwnProperty('addi') ? overrides.addi! : '0x4',
        aloc: overrides && overrides.hasOwnProperty('aloc') ? overrides.aloc! : '0x5',
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
        croo: overrides && overrides.hasOwnProperty('croo') ? overrides.croo! : '0x4',
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

export const aGenesis = (overrides?: Partial<Genesis>): { __typename: 'Genesis' } & Genesis => {
    return {
        __typename: 'Genesis',
        chainConfigHash: overrides && overrides.hasOwnProperty('chainConfigHash') ? overrides.chainConfigHash! : 'aliquam',
        coinsRoot: overrides && overrides.hasOwnProperty('coinsRoot') ? overrides.coinsRoot! : 'quae',
        contractsRoot: overrides && overrides.hasOwnProperty('contractsRoot') ? overrides.contractsRoot! : 'voluptatum',
        messagesRoot: overrides && overrides.hasOwnProperty('messagesRoot') ? overrides.messagesRoot! : 'eligendi',
    };
};

export const aGroupedInput = (overrides?: Partial<GroupedInput>): { __typename: 'GroupedInput' } & GroupedInput => {
    return {
        __typename: 'GroupedInput',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'l599hn1ptb30dgitrqwggvyjwodfl04t',
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : '49072p4l3rka407xhz10e7gp0yszhwq0',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0x7f6727C2AF9F0Efa1b908DFBE867BAf01d77D4da3d6Bc0C3cD6b5f496C412d0fAd36cADdE0d8cADbAc6c7Df5CeFe5AAbE5C1ebF6E2E556EBc9EB3E3e1AEb3BBbBCb48FE25eD0eE14b86bAcD7d544Ac25',
        inputs: overrides && overrides.hasOwnProperty('inputs') ? overrides.inputs! : [anInputCoin()],
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : '8fkjv8kwc0jzv1xcunxejkreq92zr4t1vlxzrtta',
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : 'kvplkj85usmst9e0xjn49sgbuh9wxa35lpfkgbra',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : '6e6zaxag3v02nvh7jj6xi3gcbuv7y8zb4rr18s0n',
        totalAmount: overrides && overrides.hasOwnProperty('totalAmount') ? overrides.totalAmount! : '0xF',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : GroupedInputType.InputCoin,
    };
};

export const aGroupedOutput = (overrides?: Partial<GroupedOutput>): { __typename: 'GroupedOutput' } & GroupedOutput => {
    return {
        __typename: 'GroupedOutput',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'p8osmyjj0rnsi6vo519osau4bdzyw6l6',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : aContract(),
        inputIndex: overrides && overrides.hasOwnProperty('inputIndex') ? overrides.inputIndex! : 8778,
        outputs: overrides && overrides.hasOwnProperty('outputs') ? overrides.outputs! : [aChangeOutput()],
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : '6ybk3rig2whm9etumk6wzngk9tnu48powxck8bi9',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : '3iyq0oy3da8pvdzjktq1pkua8w8a3rx4gr4k2zzp',
        totalAmount: overrides && overrides.hasOwnProperty('totalAmount') ? overrides.totalAmount! : '0xb',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : GroupedOutputType.ChangeOutput,
    };
};

export const aHeader = (overrides?: Partial<Header>): { __typename: 'Header' } & Header => {
    return {
        __typename: 'Header',
        applicationHash: overrides && overrides.hasOwnProperty('applicationHash') ? overrides.applicationHash! : 'sint',
        daHeight: overrides && overrides.hasOwnProperty('daHeight') ? overrides.daHeight! : '0xb',
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 'saepe',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'pariatur',
        messageReceiptCount: overrides && overrides.hasOwnProperty('messageReceiptCount') ? overrides.messageReceiptCount! : '0x1',
        messageReceiptRoot: overrides && overrides.hasOwnProperty('messageReceiptRoot') ? overrides.messageReceiptRoot! : 'quas',
        prevRoot: overrides && overrides.hasOwnProperty('prevRoot') ? overrides.prevRoot! : 'reprehenderit',
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'perspiciatis',
        transactionsCount: overrides && overrides.hasOwnProperty('transactionsCount') ? overrides.transactionsCount! : '0x0',
        transactionsRoot: overrides && overrides.hasOwnProperty('transactionsRoot') ? overrides.transactionsRoot! : 'animi',
    };
};

export const aHeavyOperation = (overrides?: Partial<HeavyOperation>): { __typename: 'HeavyOperation' } & HeavyOperation => {
    return {
        __typename: 'HeavyOperation',
        base: overrides && overrides.hasOwnProperty('base') ? overrides.base! : '0xE',
        gasPerUnit: overrides && overrides.hasOwnProperty('gasPerUnit') ? overrides.gasPerUnit! : '0xF',
    };
};

export const anInputCoin = (overrides?: Partial<InputCoin>): { __typename: 'InputCoin' } & InputCoin => {
    return {
        __typename: 'InputCoin',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xA',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'y27xk4sns2byxqyzgpcy513i3crqms8m',
        maturity: overrides && overrides.hasOwnProperty('maturity') ? overrides.maturity! : 'incidunt',
        owner: overrides && overrides.hasOwnProperty('owner') ? overrides.owner! : 'vamcamah4e8u1v6tw4ldf49gn6i4nhcxuhztvd8f',
        predicate: overrides && overrides.hasOwnProperty('predicate') ? overrides.predicate! : '0xa67Faa70dBB8BFe84AeA310BFCb62991Ad08F6635BBeFeafAe7abac62E8BdeeB4cefB8E74f0dB67569E5f42cCdc9EBfA64c4326ED6Df8B3583E50A790F441b29BDD613D18e7D9eF2d42fE1F8C7dd4ee3',
        predicateData: overrides && overrides.hasOwnProperty('predicateData') ? overrides.predicateData! : '0x63CCab6C200Cade6C4B7d1689bB2964b3BD8CaAb96C1AcBba1CED702F09b342f40d10F36824275eDba5BD55B657b71CF409Aeee963C126Bb2dEb80bDEeB57DF6c1dEdDC65389f3FAc6c72910319aBF2B',
        predicateGasUsed: overrides && overrides.hasOwnProperty('predicateGasUsed') ? overrides.predicateGasUsed! : '0xd',
        txPointer: overrides && overrides.hasOwnProperty('txPointer') ? overrides.txPointer! : 'officia',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : '37d3ah19hr1fh00b5j2qsz0tjfhyjk5f',
        witnessIndex: overrides && overrides.hasOwnProperty('witnessIndex') ? overrides.witnessIndex! : 8296,
    };
};

export const anInputContract = (overrides?: Partial<InputContract>): { __typename: 'InputContract' } & InputContract => {
    return {
        __typename: 'InputContract',
        balanceRoot: overrides && overrides.hasOwnProperty('balanceRoot') ? overrides.balanceRoot! : 'laboriosam',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : aContract(),
        stateRoot: overrides && overrides.hasOwnProperty('stateRoot') ? overrides.stateRoot! : 'voluptatem',
        txPointer: overrides && overrides.hasOwnProperty('txPointer') ? overrides.txPointer! : 'natus',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : 'bdooy2lb4df6d1qrjvhul62w3u6t7zu9',
    };
};

export const anInputMessage = (overrides?: Partial<InputMessage>): { __typename: 'InputMessage' } & InputMessage => {
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
        witnessIndex: overrides && overrides.hasOwnProperty('witnessIndex') ? overrides.witnessIndex! : 4160,
    };
};

export const aLightOperation = (overrides?: Partial<LightOperation>): { __typename: 'LightOperation' } & LightOperation => {
    return {
        __typename: 'LightOperation',
        base: overrides && overrides.hasOwnProperty('base') ? overrides.base! : '0x2',
        unitsPerGas: overrides && overrides.hasOwnProperty('unitsPerGas') ? overrides.unitsPerGas! : '0xC',
    };
};

export const aMerkleProof = (overrides?: Partial<MerkleProof>): { __typename: 'MerkleProof' } & MerkleProof => {
    return {
        __typename: 'MerkleProof',
        proofIndex: overrides && overrides.hasOwnProperty('proofIndex') ? overrides.proofIndex! : '0x8',
        proofSet: overrides && overrides.hasOwnProperty('proofSet') ? overrides.proofSet! : ['voluptatem'],
    };
};

export const aMessage = (overrides?: Partial<Message>): { __typename: 'Message' } & Message => {
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

export const aMessageCoin = (overrides?: Partial<MessageCoin>): { __typename: 'MessageCoin' } & MessageCoin => {
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

export const aMessageConnection = (overrides?: Partial<MessageConnection>): { __typename: 'MessageConnection' } & MessageConnection => {
    return {
        __typename: 'MessageConnection',
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aMessageEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aMessage()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aMessageEdge = (overrides?: Partial<MessageEdge>): { __typename: 'MessageEdge' } & MessageEdge => {
    return {
        __typename: 'MessageEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'quas',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aMessage(),
    };
};

export const aMessageProof = (overrides?: Partial<MessageProof>): { __typename: 'MessageProof' } & MessageProof => {
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

export const aMessageStatus = (overrides?: Partial<MessageStatus>): { __typename: 'MessageStatus' } & MessageStatus => {
    return {
        __typename: 'MessageStatus',
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : MessageState.NotFound,
    };
};

export const aMutation = (overrides?: Partial<Mutation>): { __typename: 'Mutation' } & Mutation => {
    return {
        __typename: 'Mutation',
        continueTx: overrides && overrides.hasOwnProperty('continueTx') ? overrides.continueTx! : aRunResult(),
        dryRun: overrides && overrides.hasOwnProperty('dryRun') ? overrides.dryRun! : [aReceipt()],
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

export const aNodeInfo = (overrides?: Partial<NodeInfo>): { __typename: 'NodeInfo' } & NodeInfo => {
    return {
        __typename: 'NodeInfo',
        maxDepth: overrides && overrides.hasOwnProperty('maxDepth') ? overrides.maxDepth! : '0xf',
        maxTx: overrides && overrides.hasOwnProperty('maxTx') ? overrides.maxTx! : '0x2',
        minGasPrice: overrides && overrides.hasOwnProperty('minGasPrice') ? overrides.minGasPrice! : '0x3',
        nodeVersion: overrides && overrides.hasOwnProperty('nodeVersion') ? overrides.nodeVersion! : 'nobis',
        peers: overrides && overrides.hasOwnProperty('peers') ? overrides.peers! : [aPeerInfo()],
        utxoValidation: overrides && overrides.hasOwnProperty('utxoValidation') ? overrides.utxoValidation! : true,
        vmBacktrace: overrides && overrides.hasOwnProperty('vmBacktrace') ? overrides.vmBacktrace! : true,
    };
};

export const anOperation = (overrides?: Partial<Operation>): { __typename: 'Operation' } & Operation => {
    return {
        __typename: 'Operation',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [anOperationReceipt()],
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : OperationType.FinalResult,
    };
};

export const anOperationReceipt = (overrides?: Partial<OperationReceipt>): { __typename: 'OperationReceipt' } & OperationReceipt => {
    return {
        __typename: 'OperationReceipt',
        item: overrides && overrides.hasOwnProperty('item') ? overrides.item! : aReceipt(),
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [anOperationReceipt()],
    };
};

export const anOutputBreakpoint = (overrides?: Partial<OutputBreakpoint>): { __typename: 'OutputBreakpoint' } & OutputBreakpoint => {
    return {
        __typename: 'OutputBreakpoint',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : '6ghwqlax5rq8vz7bbvxhn3nex1uoqjwo',
        pc: overrides && overrides.hasOwnProperty('pc') ? overrides.pc! : '0xf',
    };
};

export const aPageInfo = (overrides?: Partial<PageInfo>): { __typename: 'PageInfo' } & PageInfo => {
    return {
        __typename: 'PageInfo',
        endCursor: overrides && overrides.hasOwnProperty('endCursor') ? overrides.endCursor! : 'cum',
        hasNextPage: overrides && overrides.hasOwnProperty('hasNextPage') ? overrides.hasNextPage! : false,
        hasPreviousPage: overrides && overrides.hasOwnProperty('hasPreviousPage') ? overrides.hasPreviousPage! : true,
        startCursor: overrides && overrides.hasOwnProperty('startCursor') ? overrides.startCursor! : 'repellendus',
    };
};

export const aParsedTime = (overrides?: Partial<ParsedTime>): { __typename: 'ParsedTime' } & ParsedTime => {
    return {
        __typename: 'ParsedTime',
        fromNow: overrides && overrides.hasOwnProperty('fromNow') ? overrides.fromNow! : 'amet',
        full: overrides && overrides.hasOwnProperty('full') ? overrides.full! : 'beatae',
        rawTai64: overrides && overrides.hasOwnProperty('rawTai64') ? overrides.rawTai64! : 'esse',
        rawUnix: overrides && overrides.hasOwnProperty('rawUnix') ? overrides.rawUnix! : 'quis',
    };
};

export const aPeerInfo = (overrides?: Partial<PeerInfo>): { __typename: 'PeerInfo' } & PeerInfo => {
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

export const aPoAConsensus = (overrides?: Partial<PoAConsensus>): { __typename: 'PoAConsensus' } & PoAConsensus => {
    return {
        __typename: 'PoAConsensus',
        signature: overrides && overrides.hasOwnProperty('signature') ? overrides.signature! : 'consectetur',
    };
};

export const aPolicies = (overrides?: Partial<Policies>): { __typename: 'Policies' } & Policies => {
    return {
        __typename: 'Policies',
        gasPrice: overrides && overrides.hasOwnProperty('gasPrice') ? overrides.gasPrice! : '0xc',
        maturity: overrides && overrides.hasOwnProperty('maturity') ? overrides.maturity! : 'ex',
        maxFee: overrides && overrides.hasOwnProperty('maxFee') ? overrides.maxFee! : '0x8',
        witnessLimit: overrides && overrides.hasOwnProperty('witnessLimit') ? overrides.witnessLimit! : '0xb',
    };
};

export const aPredicate = (overrides?: Partial<Predicate>): { __typename: 'Predicate' } & Predicate => {
    return {
        __typename: 'Predicate',
        bytecode: overrides && overrides.hasOwnProperty('bytecode') ? overrides.bytecode! : '0xfffe55e470BDC8afCf78D3F2Fc7A78Db29ed2a983a8487e5c920C9cAF84BAC09391A115a6E8dC6FdaEDB8ccddD9C2aAFFA88B8bBa1b24A79cE1eF1FfEb54C59Cc3dEF3abEcCFFb127D952e79fcC2aE5C',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'h8av7w6p17to88fx0fsavbp5jsx5zhikml24gqju',
    };
};

export const aPredicateParameters = (overrides?: Partial<PredicateParameters>): { __typename: 'PredicateParameters' } & PredicateParameters => {
    return {
        __typename: 'PredicateParameters',
        maxGasPerPredicate: overrides && overrides.hasOwnProperty('maxGasPerPredicate') ? overrides.maxGasPerPredicate! : '0x0',
        maxMessageDataLength: overrides && overrides.hasOwnProperty('maxMessageDataLength') ? overrides.maxMessageDataLength! : '0xe',
        maxPredicateDataLength: overrides && overrides.hasOwnProperty('maxPredicateDataLength') ? overrides.maxPredicateDataLength! : '0xE',
        maxPredicateLength: overrides && overrides.hasOwnProperty('maxPredicateLength') ? overrides.maxPredicateLength! : '0x8',
    };
};

export const aProgramState = (overrides?: Partial<ProgramState>): { __typename: 'ProgramState' } & ProgramState => {
    return {
        __typename: 'ProgramState',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0xE8f2fDf6aF89644c89Ca7eC89Bd1Aab8B95c114F2eE3fBF8b1C10AC6ccCe9EafA5dCeFaC56832ED898dC230295bc996bBCa7b21Fb0F614b0B2C28e964C2aA9f0F1C1808c9B9cB0ab60EAD68F8E07Baa2',
        returnType: overrides && overrides.hasOwnProperty('returnType') ? overrides.returnType! : ReturnType.Return,
    };
};

export const aQuery = (overrides?: Partial<Query>): { __typename: 'Query' } & Query => {
    return {
        __typename: 'Query',
        accounts: overrides && overrides.hasOwnProperty('accounts') ? overrides.accounts! : [anAccount()],
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
        estimatePredicates: overrides && overrides.hasOwnProperty('estimatePredicates') ? overrides.estimatePredicates! : aTransaction(),
        health: overrides && overrides.hasOwnProperty('health') ? overrides.health! : true,
        memory: overrides && overrides.hasOwnProperty('memory') ? overrides.memory! : 'id',
        messageProof: overrides && overrides.hasOwnProperty('messageProof') ? overrides.messageProof! : aMessageProof(),
        messageStatus: overrides && overrides.hasOwnProperty('messageStatus') ? overrides.messageStatus! : aMessageStatus(),
        messages: overrides && overrides.hasOwnProperty('messages') ? overrides.messages! : aMessageConnection(),
        nodeInfo: overrides && overrides.hasOwnProperty('nodeInfo') ? overrides.nodeInfo! : aNodeInfo(),
        predicate: overrides && overrides.hasOwnProperty('predicate') ? overrides.predicate! : aPredicate(),
        register: overrides && overrides.hasOwnProperty('register') ? overrides.register! : '0x3',
        search: overrides && overrides.hasOwnProperty('search') ? overrides.search! : aSearchResult(),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [aToken()],
        transaction: overrides && overrides.hasOwnProperty('transaction') ? overrides.transaction! : aTransaction(),
        transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : aTransactionConnection(),
        transactionsByOwner: overrides && overrides.hasOwnProperty('transactionsByOwner') ? overrides.transactionsByOwner! : aTransactionConnection(),
    };
};

export const aReceipt = (overrides?: Partial<Receipt>): { __typename: 'Receipt' } & Receipt => {
    return {
        __typename: 'Receipt',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xB',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'z58vuwpyp5fwi1yhwzlqj9ka232t9a8r',
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : aContract(),
        contractId: overrides && overrides.hasOwnProperty('contractId') ? overrides.contractId! : '9d382ivp4mteisohn79svut91p9msibm',
        data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : '0xe2b353aAEa5e7E1Ff6fc4Da5bf9c0af8c0DcEe5ECD206ba852cDf1C7285F1fbd9eCbE4ba1AFCb6f9f4ef2Ce96c1a8f1DFE4AcD2FaD74D82eB1DFBFeFE3fc2F8EADBeeCDEE0ebF41E3ba0682aaa8Fa59A',
        digest: overrides && overrides.hasOwnProperty('digest') ? overrides.digest! : 'architecto',
        gas: overrides && overrides.hasOwnProperty('gas') ? overrides.gas! : '0x4',
        gasUsed: overrides && overrides.hasOwnProperty('gasUsed') ? overrides.gasUsed! : '0x2',
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
        receiptType: overrides && overrides.hasOwnProperty('receiptType') ? overrides.receiptType! : ReceiptType.Burn,
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : 'q7mhlsz9na9drlzwtj38y91r243dzrsfdkzsyxiq',
        result: overrides && overrides.hasOwnProperty('result') ? overrides.result! : '0x0',
        sender: overrides && overrides.hasOwnProperty('sender') ? overrides.sender! : 'ysjl9jycalt7pupoecumgfg3l76d5g22g2yy181x',
        subId: overrides && overrides.hasOwnProperty('subId') ? overrides.subId! : 'quam',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : aContract(),
        toAddress: overrides && overrides.hasOwnProperty('toAddress') ? overrides.toAddress! : '40v7wkyreg1nryfbtnbhw09swv0ciohkdcfloi6w',
        val: overrides && overrides.hasOwnProperty('val') ? overrides.val! : '0xf',
    };
};

export const aRunResult = (overrides?: Partial<RunResult>): { __typename: 'RunResult' } & RunResult => {
    return {
        __typename: 'RunResult',
        breakpoint: overrides && overrides.hasOwnProperty('breakpoint') ? overrides.breakpoint! : anOutputBreakpoint(),
        jsonReceipts: overrides && overrides.hasOwnProperty('jsonReceipts') ? overrides.jsonReceipts! : ['esse'],
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : RunState.Breakpoint,
    };
};

export const aScriptParameters = (overrides?: Partial<ScriptParameters>): { __typename: 'ScriptParameters' } & ScriptParameters => {
    return {
        __typename: 'ScriptParameters',
        maxScriptDataLength: overrides && overrides.hasOwnProperty('maxScriptDataLength') ? overrides.maxScriptDataLength! : '0x9',
        maxScriptLength: overrides && overrides.hasOwnProperty('maxScriptLength') ? overrides.maxScriptLength! : '0x8',
    };
};

export const aSearchAccount = (overrides?: Partial<SearchAccount>): { __typename: 'SearchAccount' } & SearchAccount => {
    return {
        __typename: 'SearchAccount',
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'fxjjhq8rar88egu9vnil1ab5e9xsldm8tl3aii4l',
        transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aSearchTransaction()],
    };
};

export const aSearchBlock = (overrides?: Partial<SearchBlock>): { __typename: 'SearchBlock' } & SearchBlock => {
    return {
        __typename: 'SearchBlock',
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 'ea',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'necessitatibus',
    };
};

export const aSearchContract = (overrides?: Partial<SearchContract>): { __typename: 'SearchContract' } & SearchContract => {
    return {
        __typename: 'SearchContract',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'cal06fr6xavgycxm6euv9zube4yuy9v6',
    };
};

export const aSearchResult = (overrides?: Partial<SearchResult>): { __typename: 'SearchResult' } & SearchResult => {
    return {
        __typename: 'SearchResult',
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : aSearchAccount(),
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : aSearchBlock(),
        contract: overrides && overrides.hasOwnProperty('contract') ? overrides.contract! : aSearchContract(),
        transaction: overrides && overrides.hasOwnProperty('transaction') ? overrides.transaction! : aSearchTransaction(),
    };
};

export const aSearchTransaction = (overrides?: Partial<SearchTransaction>): { __typename: 'SearchTransaction' } & SearchTransaction => {
    return {
        __typename: 'SearchTransaction',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ikjck0dx2w0q8gftmk41pxgde8kadbzf',
    };
};

export const aSpendQueryElementInput = (overrides?: Partial<SpendQueryElementInput>): SpendQueryElementInput => {
    return {
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xd',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'uf0lsb3kvot747ow9j0nv0mh9tf7zsgw',
        max: overrides && overrides.hasOwnProperty('max') ? overrides.max! : 'odit',
    };
};

export const aSqueezedOutStatus = (overrides?: Partial<SqueezedOutStatus>): { __typename: 'SqueezedOutStatus' } & SqueezedOutStatus => {
    return {
        __typename: 'SqueezedOutStatus',
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'voluptatibus',
    };
};

export const aSubmittedStatus = (overrides?: Partial<SubmittedStatus>): { __typename: 'SubmittedStatus' } & SubmittedStatus => {
    return {
        __typename: 'SubmittedStatus',
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'natus',
    };
};

export const aSubscription = (overrides?: Partial<Subscription>): { __typename: 'Subscription' } & Subscription => {
    return {
        __typename: 'Subscription',
        statusChange: overrides && overrides.hasOwnProperty('statusChange') ? overrides.statusChange! : aFailureStatus(),
        submitAndAwait: overrides && overrides.hasOwnProperty('submitAndAwait') ? overrides.submitAndAwait! : aFailureStatus(),
    };
};

export const aSuccessStatus = (overrides?: Partial<SuccessStatus>): { __typename: 'SuccessStatus' } & SuccessStatus => {
    return {
        __typename: 'SuccessStatus',
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : aBlock(),
        programState: overrides && overrides.hasOwnProperty('programState') ? overrides.programState! : aProgramState(),
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : 'modi',
        transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : '7yxyr87uqpfquupe4qq7bmmlpvtejjdv',
    };
};

export const aToken = (overrides?: Partial<Token>): { __typename: 'Token' } & Token => {
    return {
        __typename: 'Token',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'occaecati',
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : '0x6',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'voluptates',
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : 'iusto',
        totalAssets: overrides && overrides.hasOwnProperty('totalAssets') ? overrides.totalAssets! : '0x8',
        totalSupply: overrides && overrides.hasOwnProperty('totalSupply') ? overrides.totalSupply! : '0x5',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'itaque',
    };
};

export const aTransaction = (overrides?: Partial<Transaction>): { __typename: 'Transaction' } & Transaction => {
    return {
        __typename: 'Transaction',
        accountsInvolved: overrides && overrides.hasOwnProperty('accountsInvolved') ? overrides.accountsInvolved! : [aTransactionAccount()],
        blockHeight: overrides && overrides.hasOwnProperty('blockHeight') ? overrides.blockHeight! : 'non',
        bytecodeLength: overrides && overrides.hasOwnProperty('bytecodeLength') ? overrides.bytecodeLength! : '0x6',
        bytecodeWitnessIndex: overrides && overrides.hasOwnProperty('bytecodeWitnessIndex') ? overrides.bytecodeWitnessIndex! : 9380,
        fee: overrides && overrides.hasOwnProperty('fee') ? overrides.fee! : '0x0',
        gasPrice: overrides && overrides.hasOwnProperty('gasPrice') ? overrides.gasPrice! : '0xD',
        gasUsed: overrides && overrides.hasOwnProperty('gasUsed') ? overrides.gasUsed! : '0xb',
        groupedInputs: overrides && overrides.hasOwnProperty('groupedInputs') ? overrides.groupedInputs! : [aGroupedInput()],
        groupedOutputs: overrides && overrides.hasOwnProperty('groupedOutputs') ? overrides.groupedOutputs! : [aGroupedOutput()],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'm5skeiw541vcdt1lceitryfralzuwdw9',
        inputAssetIds: overrides && overrides.hasOwnProperty('inputAssetIds') ? overrides.inputAssetIds! : ['ivh1nwdxbmv9t9y30qbwmnpsdwxc5pao'],
        inputContract: overrides && overrides.hasOwnProperty('inputContract') ? overrides.inputContract! : anInputContract(),
        inputContracts: overrides && overrides.hasOwnProperty('inputContracts') ? overrides.inputContracts! : [aContract()],
        inputs: overrides && overrides.hasOwnProperty('inputs') ? overrides.inputs! : [anInputCoin()],
        isCreate: overrides && overrides.hasOwnProperty('isCreate') ? overrides.isCreate! : true,
        isMint: overrides && overrides.hasOwnProperty('isMint') ? overrides.isMint! : false,
        isPredicate: overrides && overrides.hasOwnProperty('isPredicate') ? overrides.isPredicate! : false,
        isScript: overrides && overrides.hasOwnProperty('isScript') ? overrides.isScript! : true,
        maturity: overrides && overrides.hasOwnProperty('maturity') ? overrides.maturity! : 'distinctio',
        mintAmount: overrides && overrides.hasOwnProperty('mintAmount') ? overrides.mintAmount! : '0x4',
        mintAssetId: overrides && overrides.hasOwnProperty('mintAssetId') ? overrides.mintAssetId! : 'ear74yjd6jnrhxyo9jp8jbbywtajy2y7',
        operations: overrides && overrides.hasOwnProperty('operations') ? overrides.operations! : [anOperation()],
        outputContract: overrides && overrides.hasOwnProperty('outputContract') ? overrides.outputContract! : aContractOutput(),
        outputs: overrides && overrides.hasOwnProperty('outputs') ? overrides.outputs! : [aChangeOutput()],
        policies: overrides && overrides.hasOwnProperty('policies') ? overrides.policies! : aPolicies(),
        rawPayload: overrides && overrides.hasOwnProperty('rawPayload') ? overrides.rawPayload! : '0xCafBd5Ce4b560Aca24ffa36ce3BdFbAdbeDef78a2f072846FBE99a5FC46eFaAb7CBdFCdd25acC24Ead593EBAE0eA8Ce6CDE3fAa6FD794c53eBb332A25EdD6F86e1BD0CF857DA0DdD7bC49E162cFdE61C',
        receipts: overrides && overrides.hasOwnProperty('receipts') ? overrides.receipts! : [aReceipt()],
        receiptsRoot: overrides && overrides.hasOwnProperty('receiptsRoot') ? overrides.receiptsRoot! : 'debitis',
        salt: overrides && overrides.hasOwnProperty('salt') ? overrides.salt! : 'fuga',
        script: overrides && overrides.hasOwnProperty('script') ? overrides.script! : '0xb57ff0B5B7b8fddBE6BC4CF94dFccd4BA278C9b9eCddf46Ad73baBcE85d1ABEaECe392fbeB37116cFcc8E5a15C3E4Ea7356B35c70a1d4DBFe8ab0EDf83bFf6f54FCFF0e90b42b363CD4bEca9d5AB38D5',
        scriptData: overrides && overrides.hasOwnProperty('scriptData') ? overrides.scriptData! : '0xa8B9bEba75644Ef15fc7FE0ebEdc7376E6D83DF543E4218a00556f33B1cfa47D935B2cbD0CCD36D1D5074D1bbFAC059E4fCcd3d8FADbca1CcCa85DFb15cdcA817a6aD1d52dd4bbee8ae8c3A08e0dC56A',
        scriptGasLimit: overrides && overrides.hasOwnProperty('scriptGasLimit') ? overrides.scriptGasLimit! : '0xA',
        status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : aFailureStatus(),
        statusType: overrides && overrides.hasOwnProperty('statusType') ? overrides.statusType! : TransactionStatusType.Failure,
        storageSlots: overrides && overrides.hasOwnProperty('storageSlots') ? overrides.storageSlots! : ['0x93F3d4f06033Babda85ce01DC9cbfc37cEddcBFf9bEd8DE4c4E83B5305a1DfFb3C4ef9d6E51AEAb68bf0D70eD039DCffF924C2359c5d1c0c0C41C4B2fafF6F692aD54de3a4CAace3bfef27eefe672530'],
        time: overrides && overrides.hasOwnProperty('time') ? overrides.time! : aParsedTime(),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'qui',
        totalAccounts: overrides && overrides.hasOwnProperty('totalAccounts') ? overrides.totalAccounts! : 205,
        totalAssets: overrides && overrides.hasOwnProperty('totalAssets') ? overrides.totalAssets! : 4943,
        totalOperations: overrides && overrides.hasOwnProperty('totalOperations') ? overrides.totalOperations! : 1610,
        txPointer: overrides && overrides.hasOwnProperty('txPointer') ? overrides.txPointer! : 'expedita',
        witnesses: overrides && overrides.hasOwnProperty('witnesses') ? overrides.witnesses! : ['0x8b5Da64f37447BECBc9A170Ab9C36D48b0D4D0FBEdc79240BE46b52AbfFc1DB1BC9deAEe64E474Ed67bf8641137b857CBCA06ea6362937913F3EDEaca7ffC1Abf45ab6a7941D8bF61Bec1B5fAB8fbb1b'],
    };
};

export const aTransactionAccount = (overrides?: Partial<TransactionAccount>): { __typename: 'TransactionAccount' } & TransactionAccount => {
    return {
        __typename: 'TransactionAccount',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'aut',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : TransactionAccountType.Contract,
    };
};

export const aTransactionConnection = (overrides?: Partial<TransactionConnection>): { __typename: 'TransactionConnection' } & TransactionConnection => {
    return {
        __typename: 'TransactionConnection',
        accounts: overrides && overrides.hasOwnProperty('accounts') ? overrides.accounts! : [anAccount()],
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aTransactionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [aTransaction()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [aToken()],
    };
};

export const aTransactionEdge = (overrides?: Partial<TransactionEdge>): { __typename: 'TransactionEdge' } & TransactionEdge => {
    return {
        __typename: 'TransactionEdge',
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'eos',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aTransaction(),
    };
};

export const aTxParameters = (overrides?: Partial<TxParameters>): { __typename: 'TxParameters' } & TxParameters => {
    return {
        __typename: 'TxParameters',
        maxGasPerTx: overrides && overrides.hasOwnProperty('maxGasPerTx') ? overrides.maxGasPerTx! : '0xf',
        maxInputs: overrides && overrides.hasOwnProperty('maxInputs') ? overrides.maxInputs! : 'soluta',
        maxOutputs: overrides && overrides.hasOwnProperty('maxOutputs') ? overrides.maxOutputs! : 'iure',
        maxSize: overrides && overrides.hasOwnProperty('maxSize') ? overrides.maxSize! : '0x4',
        maxWitnesses: overrides && overrides.hasOwnProperty('maxWitnesses') ? overrides.maxWitnesses! : 'modi',
    };
};

export const anUtxoItem = (overrides?: Partial<UtxoItem>): { __typename: 'UtxoItem' } & UtxoItem => {
    return {
        __typename: 'UtxoItem',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xB',
        blockCreated: overrides && overrides.hasOwnProperty('blockCreated') ? overrides.blockCreated! : 'quasi',
        txCreatedIdx: overrides && overrides.hasOwnProperty('txCreatedIdx') ? overrides.txCreatedIdx! : '0xD',
        utxoId: overrides && overrides.hasOwnProperty('utxoId') ? overrides.utxoId! : 'yk6ff55bv2kpr4nl0rf5mxxuz7pelbo0',
    };
};

export const aVariableOutput = (overrides?: Partial<VariableOutput>): { __typename: 'VariableOutput' } & VariableOutput => {
    return {
        __typename: 'VariableOutput',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : '0xc',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'hq38k3ap8ok8krpquh789zkbfdd74ab6',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : '4gs9ppn7jqumdt8t0gd7u4mra5dblqlbgjy1w5bv',
    };
};
