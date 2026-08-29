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
    const poller = new L1Poller({ index, client, network: 'mainnet' });

    await poller.syncContract(CONTRACT);

    expect(client.getLogs).toHaveBeenCalledWith({
      address: CONTRACT.contract_hash,
      fromBlock: BigInt(CONTRACT.block_height),
      toBlock: BigInt(CONTRACT.block_height + 999),
    });
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
});
