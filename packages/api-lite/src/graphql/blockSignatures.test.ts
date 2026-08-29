import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { HotKeys } from '../hot/HotKeys';
import { Index } from '../index/Index';
import { Indexer } from '../index/Indexer';
import { TipTracker } from '../index/TipTracker';
import { createApp } from '../server';
import { BlockStore } from '../store/BlockStore';

// Minimal setup mirroring resolvers.test.ts's fakeBlock/setup shape. Blocks
// here have no transactions -- only consensus.signature / producer are
// exercised, and neither depends on transaction content.

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const TIP = 10;
const T0 = BigInt(Math.floor(Date.now() / 1000)) + (1n << 62n) + 10n;
const SIGNATURE = `0x${'ab'.repeat(64)}`;

function fakeBlock(h: number) {
  return {
    __typename: 'Block',
    id: hex(1000 + h),
    height: String(h),
    version: 'V2',
    consensus: { __typename: 'PoAConsensus', signature: null },
    header: {
      __typename: 'Header',
      id: hex(1000 + h),
      height: String(h),
      time: (T0 + BigInt(h) * 60n).toString(),
      daHeight: '1',
      transactionsCount: '0',
      messageReceiptCount: '0',
      applicationHash: hex(0),
      prevRoot: hex(0),
      transactionsRoot: hex(0),
      messageOutboxRoot: hex(0),
      eventInboxRoot: hex(0),
      consensusParametersVersion: '1',
      stateTransitionBytecodeVersion: '1',
      version: 'V2',
    },
    transactions: [],
  } as any;
}

async function setup(clientOverrides: Record<string, unknown> = {}) {
  const index = new Index(':memory:');
  const store = new BlockStore({
    source: {
      fetchRaw: async (h) => {
        if (h > TIP || h < 0)
          throw new (await import('../s3/S3BlockSource')).BlockNotFound(h);
        return new Uint8Array([h]);
      },
    },
    decode: (bytes) => fakeBlock(bytes[0]),
    dataDir: mkdtempSync(join(tmpdir(), 'bsig-')),
    memoryBytes: 50_000_000,
    diskBytes: 1e9,
    concurrency: 4,
  });
  const indexer = new Indexer({
    index,
    store,
    retentionDays: 1,
    maxBytes: 1e12,
    batch: 10,
  });
  store.opts.onDecoded = (b) => indexer.writeOnly(b);
  const client = {
    latestHeight: async () => TIP,
    heightForTx: async () => null,
    heightForBlock: async () => null,
    query: async () => ({}),
    rawChain: async () => ({ consensusParameters: { chainId: '9889' } }),
    txsByOwner: async () => ({
      items: [],
      hasNextPage: false,
      hasPreviousPage: false,
    }),
    blockSignatures: async () => new Map(),
    ...clientOverrides,
  } as any;
  const tip = new TipTracker({
    client,
    store,
    pollMs: 1e9,
    onBlock: (b) => indexer.indexBlock(b),
  });
  await tip.tick();
  while (await indexer.backfillStep()) {
    /* drain */
  }
  const price = { usd: async () => 2000 } as any;
  const { yoga } = createApp({
    store,
    index,
    tip,
    client,
    chain: { chainId: 9889, baseAssetId: hex(0) },
    price,
    hot: new HotKeys(':memory:'),
  });
  const gql = async (query: string, variables: object = {}) => {
    const res = await yoga.fetch('http://x/graphql', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
  };
  return { gql, client };
}

const BLOCK_QUERY =
  '{ block(height: "5") { producer consensus { __typename ... on PoAConsensus { signature } } } }';

describe('block signature and producer from fuel-core', () => {
  it('block(height) attaches a real signature and derives a non-null producer', async () => {
    const calls: number[][] = [];
    const { gql } = await setup({
      blockSignatures: async (heights: number[]) => {
        calls.push(heights);
        return new Map(heights.map((h) => [h, SIGNATURE]));
      },
    });
    const d = await gql(BLOCK_QUERY);
    expect(d.block.consensus.signature).toBe(SIGNATURE);
    expect(d.block.producer).not.toBeNull();
    expect(calls).toEqual([[5]]);
  });

  it('block(height) falls back to signature "0x" and producer null when fuel-core has no signature', async () => {
    const { gql } = await setup({ blockSignatures: async () => new Map() });
    const d = await gql(BLOCK_QUERY);
    expect(d.block.consensus.signature).toBe('0x');
    expect(d.block.producer).toBeNull();
  });

  it('a failed fetch does not poison the cache: the next request retries fuel-core', async () => {
    const calls: number[][] = [];
    const { gql } = await setup({
      blockSignatures: async (heights: number[]) => {
        calls.push(heights);
        return new Map();
      },
    });
    const first = await gql(BLOCK_QUERY);
    expect(first.block.consensus.signature).toBe('0x');
    const second = await gql(BLOCK_QUERY);
    expect(second.block.consensus.signature).toBe('0x');
    expect(calls).toEqual([[5], [5]]);
  });

  it('a second request for the same block does not refetch (the patch is cached)', async () => {
    const calls: number[][] = [];
    const { gql } = await setup({
      blockSignatures: async (heights: number[]) => {
        calls.push(heights);
        return new Map(heights.map((h) => [h, SIGNATURE]));
      },
    });
    await gql(BLOCK_QUERY);
    await gql(BLOCK_QUERY);
    expect(calls).toHaveLength(1);
  });

  it('blocks() fetches signatures for the whole page in a single client call', async () => {
    const calls: number[][] = [];
    const { gql } = await setup({
      blockSignatures: async (heights: number[]) => {
        calls.push(heights);
        return new Map(heights.map((h) => [h, SIGNATURE]));
      },
    });
    const d = await gql(
      '{ blocks(first: 5) { edges { node { producer consensus { __typename ... on PoAConsensus { signature } } } } } }',
    );
    expect(d.blocks.edges).toHaveLength(5);
    for (const e of d.blocks.edges) {
      expect(e.node.consensus.signature).toBe(SIGNATURE);
      expect(e.node.producer).not.toBeNull();
    }
    expect(calls).toHaveLength(1);
    expect(calls[0].sort((a, b) => a - b)).toEqual([6, 7, 8, 9, 10]);
  });
});
