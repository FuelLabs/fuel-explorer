import { encodeAbiParameters, encodeEventTopics, pad, toHex } from 'viem';
import { L1Index } from './L1Index';
import type { L1Client, L1Log } from './L1Poller';
import { L1Poller } from './L1Poller';
import { contract as fuelMessagePortalMainnet } from './abi/mainnet/fuelMessagePortalAbi';

const CONTRACT = {
  contract_hash: fuelMessagePortalMainnet.address,
  block_height: 21039400,
  name: 'FuelMessagePortal',
  network: 'mainnet',
};

function messageSentLog(overrides: Partial<L1Log> = {}): L1Log {
  const sender = pad(toHex(1), { size: 32 });
  const recipient = pad(toHex(2), { size: 32 });
  const nonce = 7n;
  // contractId (32 bytes) + messageType != DEPOSIT_WITH_DATA (32 bytes), the
  // shape decodeMessage() reads for the plain (non-deposit-with-data) case.
  const messagePayload = `0x${'11'.repeat(32)}${'00'.repeat(32)}` as const;
  const topics = encodeEventTopics({
    abi: fuelMessagePortalMainnet.abi,
    eventName: 'MessageSent',
    args: { sender, recipient, nonce },
  });
  const data = encodeAbiParameters(
    [{ type: 'uint64' }, { type: 'bytes' }],
    [123n, messagePayload],
  );
  return {
    address: fuelMessagePortalMainnet.address,
    topics: topics as string[],
    data,
    blockNumber: 21039450n,
    blockHash: '0xblockhashaaaa',
    transactionHash: '0xaaaa',
    logIndex: 0,
    ...overrides,
  };
}

function unknownTopicLog(): L1Log {
  return {
    address: fuelMessagePortalMainnet.address,
    topics: [`0x${'ff'.repeat(32)}`],
    data: '0x',
    blockNumber: 21039450n,
    blockHash: '0xblockhashbbbb',
    transactionHash: '0xbbbb',
    logIndex: 1,
  };
}

function fakeClient(logs: L1Log[], finalized = 21039450n): L1Client {
  return {
    getFinalizedBlockNumber: jest.fn().mockResolvedValue(finalized),
    getLogs: jest.fn().mockResolvedValue(logs),
    getBlockTimestamp: jest.fn().mockResolvedValue(1_700_000_000),
  };
}

// A single-contract index double, so a tick's getLogs call count is exact
// (a real seeded network would multiply every window by 7 contracts).
function singleContractStub(startBlock: number) {
  let height = startBlock;
  return {
    index: {
      cursor: (_hash: string) => height,
      advance: (_hash: string, h: number) => {
        height = h;
      },
      insertLogs: (_rows: unknown[]) => {},
      contracts: (_network?: 'mainnet' | 'testnet') => [
        {
          contract_hash: CONTRACT.contract_hash,
          block_height: height,
          name: CONTRACT.name,
          network: CONTRACT.network,
        },
      ],
    },
    getHeight: () => height,
  };
}

describe('L1Poller', () => {
  it('writes one row (with args and decoded message data) for the decodable log, skips the undecodable one, and advances the cursor', async () => {
    const index = new L1Index(':memory:');
    index.seed('mainnet', CONTRACT.block_height);
    const client = fakeClient([messageSentLog(), unknownTopicLog()]);
    const onLog = jest.fn();
    const poller = new L1Poller({ index, client, network: 'mainnet', onLog });

    await poller.syncContract(CONTRACT);

    const rows = index.queryLogs({ contractHash: CONTRACT.contract_hash });
    expect(rows).toHaveLength(1);
    expect(rows[0].event).toBe('MessageSent');
    expect(rows[0].signature).toBe(
      'MessageSent(bytes32,bytes32,uint256,uint64,bytes)',
    );
    expect(rows[0].tx_hash).toBe('0xaaaa');
    expect(JSON.parse(rows[0].decoded_args).nonce).toBe('7');
    expect(JSON.parse(rows[0].decoded_data).contractId).toBe(
      `0x${'11'.repeat(32)}`,
    );
    // raw_log must carry blockHash.
    expect(JSON.parse(rows[0].raw_log).blockHash).toBe('0xblockhashaaaa');

    const argRows = index.queryLogs({
      contractHash: CONTRACT.contract_hash,
      argKey: 'nonce',
      argValue: '7',
    });
    expect(argRows).toHaveLength(1);

    // Cursor advances past the whole window (toBlock + 1), not just past the log.
    expect(index.cursor(CONTRACT.contract_hash)).toBe(
      Math.min(CONTRACT.block_height + 999, 21039450) + 1,
    );

    expect(onLog).toHaveBeenCalledTimes(1); // warning for the undecodable log
    index.close();
  });

  it('never requests a window wider than 1000 blocks even when the finalized tip is far ahead', async () => {
    const index = new L1Index(':memory:');
    index.seed('mainnet', CONTRACT.block_height);
    const client = fakeClient([], BigInt(CONTRACT.block_height) + 1_000_000n);
    // throttleMs: 0 - this contract now loops up to 120 windows in one call;
    // the default 1s throttle between windows would blow past Jest's timeout.
    const poller = new L1Poller({
      index,
      client,
      network: 'mainnet',
      throttleMs: 0,
    });

    await poller.syncContract(CONTRACT);

    expect(client.getLogs).toHaveBeenCalledWith({
      address: CONTRACT.contract_hash,
      fromBlock: BigInt(CONTRACT.block_height),
      toBlock: BigInt(CONTRACT.block_height + 999),
    });
    for (const [args] of (client.getLogs as jest.Mock).mock.calls) {
      expect(args.toBlock - args.fromBlock).toBeLessThanOrEqual(999n);
    }
    index.close();
  });

  it('clamps the window to the finalized tip when it is closer than 1000 blocks away', async () => {
    const index = new L1Index(':memory:');
    index.seed('mainnet', CONTRACT.block_height);
    const finalized = BigInt(CONTRACT.block_height) + 5n;
    const client = fakeClient([], finalized);
    const poller = new L1Poller({ index, client, network: 'mainnet' });

    await poller.syncContract(CONTRACT);

    expect(client.getLogs).toHaveBeenCalledWith({
      address: CONTRACT.contract_hash,
      fromBlock: BigInt(CONTRACT.block_height),
      toBlock: finalized,
    });
    expect(index.cursor(CONTRACT.contract_hash)).toBe(Number(finalized) + 1);
    index.close();
  });

  it('does not advance the cursor and retries next tick when getLogs fails', async () => {
    const index = new L1Index(':memory:');
    index.seed('mainnet', CONTRACT.block_height);
    const client: L1Client = {
      getFinalizedBlockNumber: jest.fn().mockResolvedValue(21039450n),
      getLogs: jest.fn().mockRejectedValue(new Error('rpc down')),
      getBlockTimestamp: jest.fn(),
    };
    const onLog = jest.fn();
    const poller = new L1Poller({ index, client, network: 'mainnet', onLog });

    await poller.syncContract(CONTRACT);

    expect(index.cursor(CONTRACT.contract_hash)).toBe(CONTRACT.block_height);
    expect(onLog).toHaveBeenCalled();
    index.close();
  });

  it('tick() processes every seeded contract for the network, throttled by throttleMs', async () => {
    const index = new L1Index(':memory:');
    index.seed('testnet');
    const client = fakeClient([], 100_000_000n);
    const poller = new L1Poller({
      index,
      client,
      network: 'testnet',
      throttleMs: 0,
    });

    await poller.tick();

    expect(
      (client.getFinalizedBlockNumber as jest.Mock).mock.calls.length,
    ).toBe(7);
    index.close();
  });

  it('processes consecutive windows within one tick until the cursor reaches the finalized tip', async () => {
    const start = CONTRACT.block_height;
    const tip = BigInt(start) + 3500n;
    const stub = singleContractStub(start);
    const client = fakeClient([], tip);
    const poller = new L1Poller({
      index: stub.index,
      client,
      network: 'mainnet',
      throttleMs: 0,
    });

    await poller.tick();

    const calls = (client.getLogs as jest.Mock).mock.calls;
    expect(calls).toHaveLength(4);
    let expectedFrom = BigInt(start);
    for (const [args] of calls) {
      expect(args.fromBlock).toBe(expectedFrom);
      const expectedTo = expectedFrom + 999n <= tip ? expectedFrom + 999n : tip;
      expect(args.toBlock).toBe(expectedTo);
      expectedFrom = expectedTo + 1n;
    }
    expect(calls[calls.length - 1][0].toBlock).toBe(tip);
    expect(stub.getHeight()).toBe(Number(tip) + 1);
  });

  it('caps a contract at 120 windows per tick when far behind the finalized tip, so the tick ends and the next one continues', async () => {
    const start = CONTRACT.block_height;
    const tip = BigInt(start) + 200_000n;
    const stub = singleContractStub(start);
    const client = fakeClient([], tip);
    const poller = new L1Poller({
      index: stub.index,
      client,
      network: 'mainnet',
      throttleMs: 0,
    });

    await poller.tick();

    expect((client.getLogs as jest.Mock).mock.calls).toHaveLength(120);
    expect(stub.getHeight()).toBe(start + 120 * 1000);
  });

  it('stops one contract for the tick on a getLogs failure, leaving its cursor after the last successful window, while the tick continues to the next contract', async () => {
    const start = 5_000_000;
    const index = new L1Index(':memory:');
    index.seed('testnet', start);
    const contracts = index.contracts('testnet');
    expect(contracts).toHaveLength(7);

    const tip = BigInt(start) + 2500n; // 3 windows per contract if uninterrupted
    let callCount = 0;
    const client: L1Client = {
      getFinalizedBlockNumber: jest.fn().mockResolvedValue(tip),
      getLogs: jest.fn().mockImplementation(async () => {
        callCount++;
        if (callCount === 2) throw new Error('rpc down');
        return [];
      }),
      getBlockTimestamp: jest.fn(),
    };
    const onLog = jest.fn();
    const poller = new L1Poller({
      index,
      client,
      network: 'testnet',
      throttleMs: 0,
      onLog,
    });

    await poller.tick();

    // Contract 0's 2nd window (the tick's 2nd getLogs call overall) throws:
    // its cursor stops after the 1st window, and the tick moves on.
    expect(index.cursor(contracts[0].contract_hash)).toBe(start + 1000);
    for (const c of contracts.slice(1)) {
      expect(index.cursor(c.contract_hash)).toBe(Number(tip) + 1);
    }
    expect((client.getLogs as jest.Mock).mock.calls.length).toBe(
      2 + 3 * (contracts.length - 1),
    );
    expect(onLog).toHaveBeenCalled();
    index.close();
  });
});
