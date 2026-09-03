import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { HotKeys } from '../hot/HotKeys';
import { Index } from '../index/Index';
import { Indexer } from '../index/Indexer';
import { TipTracker } from '../index/TipTracker';
import { createApp } from '../server';
import { BlockStore } from '../store/BlockStore';

// Minimal setup mirroring resolvers.test.ts's/blockSignatures.test.ts's shape,
// scoped to Balance.utxos so it doesn't collide with concurrent edits to the
// shared resolvers.test.ts file.

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;

async function setup(clientOverrides: Record<string, unknown> = {}) {
  const index = new Index(':memory:');
  const store = new BlockStore({
    source: {
      fetchRaw: async () => {
        throw new (await import('../s3/S3BlockSource')).BlockNotFound(0);
      },
    },
    decode: () => {
      throw new Error('not used');
    },
    dataDir: mkdtempSync(join(tmpdir(), 'schema-')),
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
    latestHeight: async () => 0,
    heightForTx: async () => null,
    heightForBlock: async () => null,
    assetDetails: async () => null,
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
  return { gql };
}

describe('Balance.utxos', () => {
  it('requests up to 2500 coins from fuel-core, matching production BalanceResolver.utxos', async () => {
    let seenQuery = '';
    let seenVariables: any;
    const { gql } = await setup({
      query: async (query: string, variables: any) => {
        if (query.includes('query coins')) {
          seenQuery = query;
          seenVariables = variables;
          return { coins: { nodes: [{ utxoId: hex(1) }] } };
        }
        return {
          balances: {
            nodes: [{ amount: '1', assetId: hex(0), owner: hex(9) }],
          },
        };
      },
    });
    const d = await gql(
      `{ balances(filter: { owner: "${hex(9)}" }, first: 10) { nodes { amount utxos { utxoId } } } }`,
    );
    expect(d.balances.nodes[0].utxos).toEqual([{ utxoId: hex(1) }]);
    expect(seenVariables).toEqual({
      filter: { owner: hex(9), assetId: hex(0) },
      first: 2500,
    });
    expect(seenQuery).toContain('coins');
  });
});
