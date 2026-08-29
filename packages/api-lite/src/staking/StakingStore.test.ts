import { CosmosIndex } from '../cosmos/CosmosIndex';
import { L1Index } from '../l1/L1Index';
import { PaginatedParams } from './PaginatedParams';
import { StakingStore } from './StakingStore';
import { BaseStatusType, WithdrawStatusType } from './types';

// EIP-55 checksummed test addresses (viem's getAddress rejects anything else).
const ADDRESS = '0x821d65c4e8Bc11Cb146452F28a5eb0DFC25A1113';
const VALIDATOR = '0xc951bc7E7E4685d24E71c2C5a602D40F4DA1ccE9';
const RECIPIENT = '0x240fAd535346546F464d96B96be3D1c74Dc4A322';

function makeStores() {
  const l1Index = new L1Index(':memory:');
  const cosmosIndex = new CosmosIndex(':memory:');
  return { l1Index, cosmosIndex };
}

function makeStore(
  l1Index: L1Index,
  cosmosIndex: CosmosIndex,
  opts: {
    timeToFinalizeMinutes?: number;
    proof?: unknown;
    proofGet?: (nonce: string) => Promise<unknown>;
  } = {},
) {
  return new StakingStore({
    l1Index,
    cosmosIndex,
    finalization: {
      timeToFinalize: async () => opts.timeToFinalizeMinutes ?? 2880,
    },
    proofCache: {
      get: opts.proofGet ?? (async () => opts.proof ?? null),
    },
  });
}

describe('StakingStore delegate flow', () => {
  let l1Index: L1Index;
  let cosmosIndex: CosmosIndex;

  beforeEach(() => {
    ({ l1Index, cosmosIndex } = makeStores());
  });
  afterEach(() => {
    l1Index.close();
    cosmosIndex.close();
  });

  it('reports Finalized once the sequencer indexed the matching delegate event', async () => {
    l1Index.insertLogs([
      {
        contractHash: '0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3',
        blockHeight: 100,
        txHash: '0xdelegate',
        event: 'Delegate',
        signature: 'Delegate(address,address,uint256)',
        rawLog: '{}',
        decodedArgs: JSON.stringify({
          delegator: ADDRESS,
          validator: VALIDATOR,
          amount: '1000000',
        }),
        decodedData: '{}',
        timestamp: '2026-01-01T00:00:00.000Z',
        logIndex: 0,
        args: { delegator: ADDRESS, validator: VALIDATOR, amount: '1000000' },
      },
    ]);
    cosmosIndex.insertResponse(
      {
        blockHeight: 50,
        txHash: 'COSMOSTX1',
        data: '{}',
        timestamp: '2026-01-01T00:01:00Z',
      },
      [
        {
          type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
          key: 'block_number',
          value: '"100"',
          index: 0,
        },
      ],
    );
    cosmosIndex.insertResponse(
      {
        blockHeight: 50,
        txHash: 'COSMOSTX2',
        data: '{}',
        timestamp: '2026-01-01T00:01:30Z',
      },
      [
        {
          type: 'delegate',
          key: 'delegator',
          value: ADDRESS.toLowerCase(),
          index: 0,
        },
        { type: 'delegate', key: 'amount', value: '1000000', index: 0 },
      ],
    );

    const store = makeStore(l1Index, cosmosIndex);
    const result = await store.getEvents(
      ADDRESS,
      new PaginatedParams({ last: '10' }),
    );

    expect(result.nodes).toHaveLength(1);
    const node = result.nodes[0];
    expect(node.type).toBe('Stake');
    expect(node.status).toBe(BaseStatusType.Finalized);
    expect((node as { validator: string }).validator).toBe(VALIDATOR);
    expect((node as { amount: string }).amount).toBe('1000000');
    expect(result.pageInfo).toEqual({
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: node.id,
      startCursor: node.id,
    });
  });

  it('reports Skipped when the L1 event never synced to the sequencer', async () => {
    l1Index.insertLogs([
      {
        contractHash: '0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3',
        blockHeight: 100,
        txHash: '0xdelegate',
        event: 'Delegate',
        signature: 'Delegate(address,address,uint256)',
        rawLog: '{}',
        decodedArgs: JSON.stringify({
          delegator: ADDRESS,
          validator: VALIDATOR,
          amount: '1000000',
        }),
        decodedData: '{}',
        timestamp: '2026-01-01T00:00:00.000Z',
        logIndex: 0,
        args: { delegator: ADDRESS, validator: VALIDATOR, amount: '1000000' },
      },
    ]);
    // The sequencer has synced well past block 100 (blockIsSynced needs a
    // strictly greater height), but no cosmos "delegate" event for this
    // delegator ever showed up.
    cosmosIndex.insertResponse(
      {
        blockHeight: 50,
        txHash: 'COSMOSTX1',
        data: '{}',
        timestamp: '2026-01-01T00:01:00Z',
      },
      [
        {
          type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
          key: 'block_number',
          value: '"150"',
          index: 0,
        },
      ],
    );

    const store = makeStore(l1Index, cosmosIndex);
    const eventRow = l1Index.queryStakingEvents(ADDRESS, {
      cursor: null,
      direction: 'before',
      limit: 10,
    })[0];
    const single = await store.getEvent(eventRow._id);
    expect(single.status).toBe(BaseStatusType.Skipped);
  });
});

describe('StakingStore withdraw flow', () => {
  let l1Index: L1Index;
  let cosmosIndex: CosmosIndex;

  beforeEach(() => {
    ({ l1Index, cosmosIndex } = makeStores());
  });
  afterEach(() => {
    l1Index.close();
    cosmosIndex.close();
  });

  it('waits on sync when no matching cosmos event has landed yet', async () => {
    l1Index.insertLogs([
      {
        contractHash: '0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3',
        blockHeight: 100,
        txHash: '0xwithdraw',
        event: 'Withdraw',
        signature: 'Withdraw(address,address,uint256)',
        rawLog: '{}',
        decodedArgs: JSON.stringify({
          sender: ADDRESS,
          recipient: RECIPIENT,
          amount: '2000000',
        }),
        decodedData: '{}',
        timestamp: '2026-01-01T00:00:00.000Z',
        logIndex: 0,
        args: { sender: ADDRESS, recipient: RECIPIENT, amount: '2000000' },
      },
    ]);

    const store = makeStore(l1Index, cosmosIndex);
    const result = await store.getEvents(
      ADDRESS,
      new PaginatedParams({ last: '10' }),
    );
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0].status).toBe(BaseStatusType.WaitingSync);
  });

  it('walks WaitingSync -> WaitingCommittingToL1 -> ReadyToProcessWithdraw -> Finalized as L1 evidence accumulates', async () => {
    l1Index.insertLogs([
      {
        contractHash: '0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3',
        blockHeight: 100,
        txHash: '0xwithdraw',
        event: 'Withdraw',
        signature: 'Withdraw(address,address,uint256)',
        rawLog: '{}',
        decodedArgs: JSON.stringify({
          sender: ADDRESS,
          recipient: RECIPIENT,
          amount: '2000000',
        }),
        decodedData: '{}',
        timestamp: '2020-01-01T00:00:00.000Z',
        logIndex: 0,
        args: { sender: ADDRESS, recipient: RECIPIENT, amount: '2000000' },
      },
    ]);
    // Cosmos block 50 reports syncing eth block 100, and carries the
    // EventWithdrawToEthereumReported for this address with its nonce.
    cosmosIndex.insertResponse(
      {
        blockHeight: 50,
        txHash: 'SYNCTX',
        data: '{}',
        timestamp: '2020-01-01T00:05:00Z',
      },
      [
        {
          type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
          key: 'block_number',
          value: '"100"',
          index: 0,
        },
      ],
    );
    cosmosIndex.insertResponse(
      {
        blockHeight: 50,
        txHash: 'WITHDRAWTX',
        data: '{}',
        timestamp: '2020-01-01T00:05:30Z',
      },
      [
        {
          type: 'fuelsequencer.bridge.EventWithdrawToEthereumReported',
          key: 'from',
          value: `"${ADDRESS.toLowerCase()}"`,
          index: 0,
        },
        {
          type: 'fuelsequencer.bridge.EventWithdrawToEthereumReported',
          key: 'nonce',
          value: '"7"',
          index: 0,
        },
      ],
    );

    // Still no L1 commit log yet -> can't advance past WaitingSync.
    const waitingStore = makeStore(l1Index, cosmosIndex);
    const waiting = await waitingStore.getEvents(
      ADDRESS,
      new PaginatedParams({ last: '10' }),
    );
    expect(waiting.nodes[0].status).toBe(BaseStatusType.WaitingSync);
    expect((waiting.nodes[0] as { nonce?: string }).nonce).toBe('7');

    // A HeadUpdate log commits cosmos block >= 50 to L1, in the past, with
    // timeToFinalize stubbed to 0 minutes so the finish time is already due.
    l1Index.insertLogs([
      {
        contractHash: '0x481aeEB9bdFe08f050d22F0b352356691c4B0b59',
        blockHeight: 101,
        txHash: '0xheadupdate',
        event: 'HeadUpdate',
        signature: 'HeadUpdate(uint256,uint256)',
        rawLog: '{}',
        decodedArgs: '{}',
        decodedData: '{}',
        timestamp: '2020-01-01T01:00:00.000Z',
        logIndex: 0,
        args: { blockNumber: '50' },
      },
    ]);

    const readyStore = makeStore(l1Index, cosmosIndex, {
      timeToFinalizeMinutes: 0,
      proof: { proofFor: '7' },
    });
    const ready = await readyStore.getEvents(
      ADDRESS,
      new PaginatedParams({ last: '10' }),
    );
    const node = ready.nodes[0] as {
      status: string;
      nonce?: string;
      statusInfo: Record<string, unknown>;
    };
    expect(node.status).toBe(WithdrawStatusType.ReadyToProcessWithdraw);
    expect(
      (
        node.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] as {
          proof: unknown;
        }
      ).proof,
    ).toEqual({ proofFor: '7' });

    // Once WithdrawalProcessed is indexed for this nonce, the event is Finalized.
    l1Index.insertLogs([
      {
        contractHash: '0x481aeEB9bdFe08f050d22F0b352356691c4B0b59',
        blockHeight: 102,
        txHash: '0xprocessed',
        event: 'WithdrawalProcessed',
        signature: 'WithdrawalProcessed(uint256)',
        rawLog: '{}',
        decodedArgs: '{}',
        decodedData: '{}',
        timestamp: '2020-01-01T02:00:00.000Z',
        logIndex: 0,
        args: { nonce: '7' },
      },
    ]);
    const proofGet = jest.fn().mockResolvedValue({ proofFor: '7' });
    const finalizedStore = makeStore(l1Index, cosmosIndex, {
      timeToFinalizeMinutes: 0,
      proofGet,
    });
    const finalized = await finalizedStore.getEvents(
      ADDRESS,
      new PaginatedParams({ last: '10' }),
    );
    expect(finalized.nodes[0].status).toBe(BaseStatusType.Finalized);
    // A finalized withdrawal has nothing left to prove: the finality check
    // (WithdrawalProcessed) runs before the proof fetch, and short-circuits it.
    expect(proofGet).not.toHaveBeenCalled();
  });
});
