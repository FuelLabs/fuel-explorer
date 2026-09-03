import { L1Index } from '../l1/L1Index';
import { BridgeStore } from './BridgeStore';

const PORTAL = '0xAEB0c00D0125A8a788956ade4f4F12Ead9f65DDf';
const CHAIN_STATE = '0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3';
const RECIPIENT =
  '0x000000000000000000000000000000000000000000000000000000000000abcd';
const PREDICATE =
  '0x000000000000000000000000000000000000000000000000000000000000ffff';

function makeIndex() {
  return new L1Index(':memory:');
}

function insertMessageSent(
  l1Index: L1Index,
  overrides: {
    recipient: string;
    data?: string;
    nonce?: string;
    txHash: string;
    blockHeight: number;
    logIndex?: number;
    timestamp: string;
    topics?: string[];
    contractHash?: string;
  },
) {
  const decodedArgs = {
    sender: '0x00000000000000000000000000000000000000000000000000000000000001',
    recipient: overrides.recipient,
    nonce: overrides.nonce ?? '1',
    amount: '100',
    data: overrides.data ?? '0x',
  };
  l1Index.insertLogs([
    {
      contractHash: overrides.contractHash ?? PORTAL,
      blockHeight: overrides.blockHeight,
      txHash: overrides.txHash,
      event: 'MessageSent',
      signature: 'MessageSent(bytes32,bytes32,uint256,uint64,bytes)',
      rawLog: JSON.stringify({
        blockHash: `0xblock${overrides.blockHeight}`,
        topics: overrides.topics ?? ['0xtopic0', overrides.recipient],
        data: `0xrawdata${overrides.blockHeight}`,
        transactionHash: overrides.txHash,
      }),
      decodedArgs: JSON.stringify(decodedArgs),
      decodedData: '{}',
      timestamp: overrides.timestamp,
      logIndex: overrides.logIndex ?? 0,
      args: decodedArgs,
    },
  ]);
}

function insertCommitSubmitted(
  l1Index: L1Index,
  overrides: {
    commitHeight: string;
    fuelBlockHash: string;
    ethBlockHash: string;
    txHash: string;
    blockHeight: number;
    logIndex?: number;
    timestamp: string;
    contractHash?: string;
  },
) {
  const decodedArgs = {
    commitHeight: overrides.commitHeight,
    blockHash: overrides.fuelBlockHash,
  };
  l1Index.insertLogs([
    {
      contractHash: overrides.contractHash ?? CHAIN_STATE,
      blockHeight: overrides.blockHeight,
      txHash: overrides.txHash,
      event: 'CommitSubmitted',
      signature: 'CommitSubmitted(uint256,bytes32)',
      rawLog: JSON.stringify({ blockHash: overrides.ethBlockHash }),
      decodedArgs: JSON.stringify(decodedArgs),
      decodedData: '{}',
      timestamp: overrides.timestamp,
      logIndex: overrides.logIndex ?? 0,
      args: decodedArgs,
    },
  ]);
}

function insertMessageRelayed(
  l1Index: L1Index,
  overrides: {
    messageId: string;
    txHash: string;
    blockHeight: number;
    logIndex?: number;
    timestamp: string;
    contractHash?: string;
  },
) {
  const decodedArgs = {
    messageId: overrides.messageId,
    sender: '0x0001',
    recipient: '0x0002',
    amount: '5',
  };
  l1Index.insertLogs([
    {
      contractHash: overrides.contractHash ?? PORTAL,
      blockHeight: overrides.blockHeight,
      txHash: overrides.txHash,
      event: 'MessageRelayed',
      signature: 'MessageRelayed(bytes32,bytes32,bytes32,uint64)',
      rawLog: JSON.stringify({ blockHash: `0xblock${overrides.blockHeight}` }),
      decodedArgs: JSON.stringify(decodedArgs),
      decodedData: '{}',
      timestamp: overrides.timestamp,
      logIndex: overrides.logIndex ?? 0,
      args: decodedArgs,
    },
  ]);
}

describe('BridgeStore.queryLogsForRecipient', () => {
  let l1Index: L1Index;
  afterEach(() => l1Index.close());

  it('matches a direct ETH deposit by recipient, case-insensitively', () => {
    l1Index = makeIndex();
    // Stored lowercase (viem never EIP-55-checksums bytes32); query input is
    // upper-cased to prove the match is case-insensitive.
    insertMessageSent(l1Index, {
      recipient: RECIPIENT,
      txHash: '0xdirect',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryLogsForRecipient(
      PORTAL,
      RECIPIENT.toUpperCase(),
      PREDICATE,
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      recipient: RECIPIENT,
      blockHash: '0xblock100',
      topics: JSON.stringify(['0xtopic0', RECIPIENT]),
      data: '0xrawdata100',
      nonce: '1',
      transactionHash: '0xdirect',
    });
  });

  it('uses the indexed recipient argKey lookup rather than a full contract/event scan', () => {
    l1Index = makeIndex();
    const queryLogs = jest.fn(l1Index.queryLogs.bind(l1Index));
    insertMessageSent(l1Index, {
      recipient: RECIPIENT,
      txHash: '0xdirect',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    const store = new BridgeStore({ l1Index: { queryLogs } });
    store.queryLogsForRecipient(PORTAL, RECIPIENT, PREDICATE);
    expect(queryLogs).toHaveBeenCalledWith(
      expect.objectContaining({
        contractHash: PORTAL,
        event: 'MessageSent',
        argKey: 'recipient',
        argValue: RECIPIENT.toLowerCase(),
      }),
    );
    expect(queryLogs).toHaveBeenCalledWith(
      expect.objectContaining({
        contractHash: PORTAL,
        event: 'MessageSent',
        argKey: 'recipient',
        argValue: PREDICATE.toLowerCase(),
      }),
    );
    // Never a bare contract+event scan without an argKey filter.
    for (const call of queryLogs.mock.calls) {
      expect(call[0].argKey).toBe('recipient');
    }
  });

  it('returns only the log for the requested recipient among several MessageSent logs on the same contract', () => {
    l1Index = makeIndex();
    const otherRecipient1 =
      '0x0000000000000000000000000000000000000000000000000000000000001111';
    const otherRecipient2 =
      '0x0000000000000000000000000000000000000000000000000000000000002222';
    insertMessageSent(l1Index, {
      recipient: otherRecipient1,
      txHash: '0xother1',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    insertMessageSent(l1Index, {
      recipient: RECIPIENT,
      txHash: '0xwanted',
      blockHeight: 101,
      timestamp: '2026-01-01T00:01:00.000Z',
    });
    insertMessageSent(l1Index, {
      recipient: otherRecipient2,
      txHash: '0xother2',
      blockHeight: 102,
      timestamp: '2026-01-01T00:02:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryLogsForRecipient(PORTAL, RECIPIENT, PREDICATE);
    expect(result).toHaveLength(1);
    expect(result[0].transactionHash).toBe('0xwanted');
  });

  it('matches an ERC20 deposit via the predicate when data contains the recipient hex', () => {
    l1Index = makeIndex();
    const recipientHex = RECIPIENT.toLowerCase().replace('0x', '');
    insertMessageSent(l1Index, {
      recipient: PREDICATE,
      data: `0xdeadbeef${recipientHex}00`,
      txHash: '0xerc20',
      blockHeight: 101,
      timestamp: '2026-01-01T00:01:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryLogsForRecipient(PORTAL, RECIPIENT, PREDICATE);
    expect(result).toHaveLength(1);
    expect(result[0].recipient).toBe(PREDICATE);
    expect(result[0].transactionHash).toBe('0xerc20');
  });

  it('excludes a predicate-recipient log whose data does not embed the recipient hex', () => {
    l1Index = makeIndex();
    insertMessageSent(l1Index, {
      recipient: PREDICATE,
      data: '0xdeadbeef',
      txHash: '0xother',
      blockHeight: 102,
      timestamp: '2026-01-01T00:02:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryLogsForRecipient(PORTAL, RECIPIENT, PREDICATE);
    expect(result).toHaveLength(0);
  });

  it('excludes logs for a different contract or a different recipient entirely', () => {
    l1Index = makeIndex();
    insertMessageSent(l1Index, {
      recipient: RECIPIENT,
      txHash: '0xwrongcontract',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
      contractHash: CHAIN_STATE,
    });
    insertMessageSent(l1Index, {
      recipient:
        '0x0000000000000000000000000000000000000000000000000000000000009999',
      txHash: '0xwrongrecipient',
      blockHeight: 101,
      timestamp: '2026-01-01T00:01:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryLogsForRecipient(PORTAL, RECIPIENT, PREDICATE);
    expect(result).toHaveLength(0);
  });

  it('orders results by timestamp descending', () => {
    l1Index = makeIndex();
    insertMessageSent(l1Index, {
      recipient: RECIPIENT,
      txHash: '0xearlier',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    insertMessageSent(l1Index, {
      recipient: RECIPIENT,
      txHash: '0xlater',
      blockHeight: 101,
      timestamp: '2026-01-02T00:00:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryLogsForRecipient(PORTAL, RECIPIENT, PREDICATE);
    expect(result.map((r) => r.transactionHash)).toEqual([
      '0xlater',
      '0xearlier',
    ]);
  });
});

describe('BridgeStore.queryBlockHashes', () => {
  let l1Index: L1Index;
  afterEach(() => l1Index.close());

  it('returns fuel/eth block hash pairs strictly above fromBlock, ascending', () => {
    l1Index = makeIndex();
    insertCommitSubmitted(l1Index, {
      commitHeight: '1',
      fuelBlockHash: '0xfuel1',
      ethBlockHash: '0xeth1',
      txHash: '0xc1',
      blockHeight: 101,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    insertCommitSubmitted(l1Index, {
      commitHeight: '2',
      fuelBlockHash: '0xfuel2',
      ethBlockHash: '0xeth2',
      txHash: '0xc2',
      blockHeight: 150,
      timestamp: '2026-01-02T00:00:00.000Z',
    });
    // fromBlock itself is excluded (exclusive lower bound).
    insertCommitSubmitted(l1Index, {
      commitHeight: '0',
      fuelBlockHash: '0xfuel0',
      ethBlockHash: '0xeth0',
      txHash: '0xc0',
      blockHeight: 100,
      logIndex: 1,
      timestamp: '2025-12-31T00:00:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryBlockHashes(CHAIN_STATE, 100);
    expect(result).toEqual([
      { fuelBlockHash: '0xfuel1', ethBlockHash: '0xeth1' },
      { fuelBlockHash: '0xfuel2', ethBlockHash: '0xeth2' },
    ]);
  });

  it('returns an empty array when nothing is above fromBlock', () => {
    l1Index = makeIndex();
    insertCommitSubmitted(l1Index, {
      commitHeight: '1',
      fuelBlockHash: '0xfuel1',
      ethBlockHash: '0xeth1',
      txHash: '0xc1',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    expect(store.queryBlockHashes(CHAIN_STATE, 200)).toEqual([]);
  });
});

describe('BridgeStore.queryMessageRelayedTxHash', () => {
  let l1Index: L1Index;
  afterEach(() => l1Index.close());

  it('returns the transaction hash for the matching messageId', () => {
    l1Index = makeIndex();
    insertMessageRelayed(l1Index, {
      messageId: '0xmsg1',
      txHash: '0xrelayed1',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    insertMessageRelayed(l1Index, {
      messageId: '0xmsg2',
      txHash: '0xrelayed2',
      blockHeight: 101,
      timestamp: '2026-01-02T00:00:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    const result = store.queryMessageRelayedTxHash(PORTAL, '0xmsg1');
    expect(result).toEqual([{ transactionHash: '0xrelayed1' }]);
  });

  it('is case-sensitive, unlike queryLogsForRecipient', () => {
    l1Index = makeIndex();
    insertMessageRelayed(l1Index, {
      messageId: '0xMsgCase',
      txHash: '0xrelayed1',
      blockHeight: 100,
      timestamp: '2026-01-01T00:00:00.000Z',
    });
    const store = new BridgeStore({ l1Index });
    expect(store.queryMessageRelayedTxHash(PORTAL, '0xmsgcase')).toEqual([]);
  });

  it('returns an empty array when no log matches', () => {
    l1Index = makeIndex();
    const store = new BridgeStore({ l1Index });
    expect(store.queryMessageRelayedTxHash(PORTAL, '0xnope')).toEqual([]);
  });
});
