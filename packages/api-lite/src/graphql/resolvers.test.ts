import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import DataCache from '~/infra/cache/DataCache';
import { HotKeys } from '../hot/HotKeys';
import { Index, txCursor } from '../index/Index';
import { Indexer } from '../index/Indexer';
import { TipTracker } from '../index/TipTracker';
import { createApp } from '../server';
import { BlockStore } from '../store/BlockStore';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const TIP = 120;
// Blocks are one minute apart and end at the current time, so the whole
// range (TIP * 60s) falls inside the statistics resolver's rolling 24h window.
const T0 = BigInt(Math.floor(Date.now() / 1000) - TIP * 60) + (1n << 62n) + 10n;
const ACCOUNT = hex(777);

function fakeBlock(h: number) {
  const mk = (i: number, kind: 'script' | 'mint') => ({
    __typename: 'Transaction',
    id: hex(h * 10 + i),
    rawPayload: '0x00',
    isScript: kind === 'script',
    isCreate: false,
    isMint: kind === 'mint',
    isUpgrade: false,
    isUpload: false,
    inputs:
      kind === 'script'
        ? [
            {
              __typename: 'InputCoin',
              owner: ACCOUNT,
              amount: '5',
              assetId: hex(0),
              utxoId: `${hex(1)}0000`,
              txPointer: '000000000000',
              witnessIndex: '0',
              predicateGasUsed: '0',
              predicate: '0x',
              predicateData: '0x',
            },
          ]
        : [],
    outputs: [],
    witnesses: [],
    policies: null,
    inputAssetIds: [],
    inputContracts: [],
    mintAmount: kind === 'mint' ? '9' : null,
    mintAssetId: kind === 'mint' ? hex(0) : null,
    mintGasPrice: kind === 'mint' ? '1' : null,

    status: {
      __typename: 'SuccessStatus',
      time: (T0 + BigInt(h) * 60n).toString(),
      transactionId: hex(h * 10 + i),
      // Large enough (in base units, 9 decimals) that its USD conversion at
      // the fake $2000 price clears the 1-cent threshold, so convertToUsd's
      // significant-digit fallback for sub-cent amounts never kicks in.
      totalFee: '1000000',
      totalGas: '4',
      receipts: [],
      programState: null,
      block: {
        id: hex(1000 + h),
        height: String(h),
        header: {
          id: hex(1000 + h),
          height: String(h),
          time: (T0 + BigInt(h) * 60n).toString(),
          daHeight: '1',
          applicationHash: hex(0),
          messageReceiptCount: '0',
        },
      },
    },
  });
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
      transactionsCount: '2',
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
    transactions: [mk(0, 'script'), mk(1, 'mint')],
  } as any;
}

// Ordered newest-first, matching the app's own list ordering. Heights/ids are real
// (script tx, index 0) transactions produced by fakeBlock, so rendering via the
// block store succeeds regardless of which account actually "owns" them.
const FC_ITEMS = [
  { cursor: 'c1', id: hex(900), height: 90 },
  { cursor: 'c2', id: hex(910), height: 91 },
  { cursor: 'c3', id: hex(920), height: 92 },
  { cursor: 'c4', id: hex(930), height: 93 },
];

function fcFake(owner: string) {
  return async (o: string, opts: any) => {
    if (o !== owner)
      return { items: [], hasNextPage: false, hasPreviousPage: false };
    if ('first' in opts) {
      const afterIdx = opts.after
        ? FC_ITEMS.findIndex((x) => x.cursor === opts.after)
        : -1;
      const start = afterIdx + 1;
      const slice = FC_ITEMS.slice(start, start + opts.first);
      return {
        items: slice,
        hasNextPage: start + slice.length < FC_ITEMS.length,
        hasPreviousPage: start > 0,
      };
    }
    const beforeIdx = opts.before
      ? FC_ITEMS.findIndex((x) => x.cursor === opts.before)
      : FC_ITEMS.length;
    const start = Math.max(0, beforeIdx - opts.last);
    const slice = FC_ITEMS.slice(start, beforeIdx);
    return {
      items: slice,
      hasNextPage: beforeIdx < FC_ITEMS.length,
      hasPreviousPage: start > 0,
    };
  };
}

async function setup(
  clientOverrides: Record<string, unknown> = {},
  priceUsd: number | null = 2000,
) {
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
    dataDir: mkdtempSync(join(tmpdir(), 'api-')),
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
    blockSignatures: async (heights: number[]) =>
      new Map(heights.map((h) => [h, `0x${'ab'.repeat(64)}`])),
    ...clientOverrides,
  } as any;
  const tip = new TipTracker({
    client,
    store,
    pollMs: 1e9,
    onBlock: (b) => indexer.indexBlock(b),
  });
  await tip.tick();
  while (await indexer.backfillStep()) {}
  const price = { usd: async () => priceUsd } as any;
  const hot = new HotKeys(':memory:');
  const { yoga } = createApp({
    store,
    index,
    tip,
    client,
    chain: { chainId: 9889, baseAssetId: hex(0) },
    price,
    hot,
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
  return { gql, index, hot };
}

describe('resolvers', () => {
  it('block by height and by hash', async () => {
    const { gql } = await setup();
    const d = await gql(
      '{ block(height: "100") { id height producer time { rawUnix } header { transactionsCount } transactions { id title } } }',
    );
    expect(d.block.id).toBe(hex(1100));
    expect(d.block.transactions[1].title).toBe('Mint');
    const byHash = await gql(
      'query($id: BlockId!) { block(id: $id) { height } }',
      { id: hex(1100) },
    );
    expect(byHash.block.height).toBe('100');
    const missing = await gql('{ block(height: "999") { id } }');
    expect(missing.block).toBeNull();
  });

  it('blocks pagination newest first', async () => {
    const { gql } = await setup();
    const d = await gql(
      '{ blocks(first: 3) { edges { node { header { height } } } pageInfo { hasNextPage hasPreviousPage endCursor } } }',
    );
    expect(d.blocks.edges.map((e: any) => e.node.header.height)).toEqual([
      '120',
      '119',
      '118',
    ]);
    expect(d.blocks.pageInfo.hasNextPage).toBe(false);
    expect(d.blocks.pageInfo.hasPreviousPage).toBe(true);
    const older = await gql(
      'query($c: String) { blocks(first: 2, before: $c) { edges { node { header { height } } } } }',
      { c: d.blocks.pageInfo.endCursor },
    );
    expect(older.blocks.edges.map((e: any) => e.node.header.height)).toEqual([
      '117',
      '116',
    ]);

    const afterNearTip = await gql(
      '{ blocks(first: 3, after: "118") { edges { node { header { height } } } pageInfo { hasNextPage } } }',
    );
    expect(
      afterNearTip.blocks.edges.map((e: any) => e.node.header.height),
    ).toEqual(['120', '119']);
    expect(afterNearTip.blocks.pageInfo.hasNextPage).toBe(false);

    const afterMid = await gql(
      '{ blocks(first: 2, after: "110") { edges { node { header { height } } } pageInfo { hasNextPage } } }',
    );
    expect(afterMid.blocks.edges.map((e: any) => e.node.header.height)).toEqual(
      ['112', '111'],
    );
    expect(afterMid.blocks.pageInfo.hasNextPage).toBe(true);
  });

  it('transaction by id, exists, and byBlockId', async () => {
    const { gql } = await setup();
    const d = await gql(
      'query($id: TransactionId!) { transaction(id: $id) { id blockHeight statusType title gasCosts { fee gasUsed } groupedInputs { __typename } } }',
      { id: hex(1001) },
    );
    expect(d.transaction.blockHeight).toBe('100');
    expect(d.transaction.statusType).toBe('Success');
    expect(d.transaction.gasCosts.fee).toBe('1000000');
    const none = await gql(
      'query($id: TransactionId!) { transaction(id: $id) { id } }',
      { id: hex(5) },
    );
    expect(none.transaction).toBeNull();
    const byBlock = await gql(
      '{ transactionsByBlockId(blockId: "100", first: 10) { nodes { id } pageInfo { totalCount } } }',
    );
    expect(byBlock.transactionsByBlockId.nodes).toHaveLength(2);
    expect(byBlock.transactionsByBlockId.pageInfo.totalCount).toBe(2);
  });

  it('transaction returns an empty mintAmountUsd when the source omits it', async () => {
    const { gql } = await setup();
    const d = await gql(
      'query($id: TransactionId!) { transaction(id: $id) { mintAmountUsd } }',
      { id: hex(1001) },
    );
    expect(d.transaction.mintAmountUsd).toBe('');
  });

  it('transactions recent list walks down blocks', async () => {
    const { gql } = await setup();
    const d = await gql(
      '{ transactions(first: 5) { nodes { _id id title } pageInfo { endCursor hasPreviousPage } } }',
    );
    expect(d.transactions.nodes).toHaveLength(5);
    expect(d.transactions.nodes[0].id).toBe(hex(1201));
    expect(d.transactions.nodes[1].id).toBe(hex(1200));
    expect(d.transactions.nodes[2].id).toBe(hex(1191));
    const next = await gql(
      'query($c: String) { transactions(first: 2, before: $c) { nodes { id } } }',
      { c: d.transactions.pageInfo.endCursor },
    );
    expect(next.transactions.nodes[0].id).toBe(hex(1180));

    const afterMid = await gql(
      'query($c: String) { transactions(first: 2, after: $c) { nodes { id } pageInfo { hasNextPage } } }',
      { c: txCursor(118, 1) },
    );
    expect(afterMid.transactions.nodes.map((n: any) => n.id)).toEqual([
      hex(1191),
      hex(1190),
    ]);
    expect(afterMid.transactions.pageInfo.hasNextPage).toBe(true);

    const afterTip = await gql(
      'query($c: String) { transactions(first: 5, after: $c) { nodes { id } pageInfo { hasNextPage } } }',
      { c: txCursor(119, 1) },
    );
    expect(afterTip.transactions.nodes.map((n: any) => n.id)).toEqual([
      hex(1201),
      hex(1200),
    ]);
    expect(afterTip.transactions.pageInfo.hasNextPage).toBe(false);
  });

  it('transactionsByOwner from the index', async () => {
    const { gql } = await setup();
    const d = await gql(
      'query($o: Address!) { transactionsByOwner(owner: $o, first: 3) { nodes { id } pageInfo { totalCount hasPreviousPage } } }',
      { o: ACCOUNT },
    );
    expect(d.transactionsByOwner.nodes.map((n: any) => n.id)).toEqual([
      hex(1200),
      hex(1190),
      hex(1180),
    ]);
    expect(d.transactionsByOwner.pageInfo.hasPreviousPage).toBe(true);
    const none = await gql(
      'query($o: Address!) { transactionsByOwner(owner: $o, first: 3) { nodes { id } } }',
      { o: hex(1) },
    );
    expect(none.transactionsByOwner.nodes).toEqual([]);
  });

  it('transactionsByOwner falls back to fuel-core when the index has no rows, tracking per-item cursors', async () => {
    const { gql } = await setup({ txsByOwner: fcFake(hex(555)) });
    // size+1=2 is fetched but only 1 is consumed; the next page must resume right
    // after the item actually returned (c1), not after the whole fetched batch (c2).
    const d = await gql(
      'query($o: Address!) { transactionsByOwner(owner: $o, first: 1) { nodes { id } pageInfo { endCursor hasNextPage } } }',
      { o: hex(555) },
    );
    expect(d.transactionsByOwner.nodes.map((n: any) => n.id)).toEqual([
      hex(900),
    ]);
    expect(d.transactionsByOwner.pageInfo.endCursor).toBe('fc:c1');
    expect(d.transactionsByOwner.pageInfo.hasNextPage).toBe(true);
    const next = await gql(
      'query($o: Address!, $c: String) { transactionsByOwner(owner: $o, first: 1, before: $c) { nodes { id } } }',
      { o: hex(555), c: d.transactionsByOwner.pageInfo.endCursor },
    );
    expect(next.transactionsByOwner.nodes.map((n: any) => n.id)).toEqual([
      hex(910),
    ]);
  });

  it('transactionsByOwner pages the whole fuel-core list forward via before, then reports empty', async () => {
    const { gql } = await setup({ txsByOwner: fcFake(hex(555)) });
    const page1 = await gql(
      'query($o: Address!) { transactionsByOwner(owner: $o, first: 2) { nodes { id } pageInfo { endCursor hasNextPage } } }',
      { o: hex(555) },
    );
    const page2 = await gql(
      'query($o: Address!, $c: String) { transactionsByOwner(owner: $o, first: 2, before: $c) { nodes { id } pageInfo { endCursor hasNextPage } } }',
      { o: hex(555), c: page1.transactionsByOwner.pageInfo.endCursor },
    );
    const page3 = await gql(
      'query($o: Address!, $c: String) { transactionsByOwner(owner: $o, first: 2, before: $c) { nodes { id } pageInfo { hasNextPage } } }',
      { o: hex(555), c: page2.transactionsByOwner.pageInfo.endCursor },
    );
    const seen = [
      ...page1.transactionsByOwner.nodes,
      ...page2.transactionsByOwner.nodes,
    ].map((n: any) => n.id);
    expect(new Set(seen)).toEqual(new Set(FC_ITEMS.map((x) => x.id)));
    expect(seen).toHaveLength(FC_ITEMS.length);
    expect(page3.transactionsByOwner.nodes).toEqual([]);
    expect(page3.transactionsByOwner.pageInfo.hasNextPage).toBe(false);
  });

  it('transactionsByOwner pages backward (newer) through fuel-core via an fc: after cursor', async () => {
    const { gql } = await setup({ txsByOwner: fcFake(hex(555)) });
    const d = await gql(
      'query($o: Address!, $c: String) { transactionsByOwner(owner: $o, first: 2, after: $c) { nodes { id } } }',
      { o: hex(555), c: 'fc:c3' },
    );
    expect(d.transactionsByOwner.nodes.map((n: any) => n.id)).toEqual([
      hex(900),
      hex(910),
    ]);
  });

  it('caches a transactionsByOwner fuel-core fallback page across two calls within the TTL', async () => {
    const owner = hex(556);
    let calls = 0;
    const { gql } = await setup({
      txsByOwner: async (o: string, opts: any) => {
        calls += 1;
        return fcFake(owner)(o, opts);
      },
    });
    const query =
      'query($o: Address!) { transactionsByOwner(owner: $o, first: 1) { nodes { id } } }';
    const first = await gql(query, { o: owner });
    const second = await gql(query, { o: owner });
    expect(second).toEqual(first);
    expect(calls).toBe(1);
  });

  it('records a hot hit for the account on every transactionsByOwner call', async () => {
    const { gql, hot } = await setup();
    expect(hot.hits('account', ACCOUNT.toLowerCase())).toBe(0);
    await gql(
      'query($o: Address!) { transactionsByOwner(owner: $o, first: 3) { nodes { id } } }',
      { o: ACCOUNT },
    );
    hot.flush();
    expect(hot.hits('account', ACCOUNT.toLowerCase())).toBe(1);
  });

  it('records a hot hit for the block height and the tx id', async () => {
    const { gql, hot } = await setup();
    await gql('{ block(height: "100") { id } }');
    await gql(`{ transaction(id: "${hex(991)}") { id } }`);
    hot.flush();
    expect(hot.hits('block', '100')).toBe(1);
    expect(hot.hits('tx', hex(991))).toBe(1);
  });

  it('search', async () => {
    const { gql } = await setup();
    expect(
      (await gql('{ search(query: "100") { block { height } } }')).search.block
        .height,
    ).toBe('100');
    expect(
      (await gql(`{ search(query: "${hex(1100)}") { block { height } } }`))
        .search.block.height,
    ).toBe('100');
    expect(
      (await gql(`{ search(query: "${hex(991)}") { transaction { id } } }`))
        .search.transaction.id,
    ).toBe(hex(991));
    expect(
      (await gql(`{ search(query: "${ACCOUNT}") { account { address } } }`))
        .search.account.address,
    ).toBe(ACCOUNT);
    expect(
      (await gql('{ search(query: "zzz") { block { height } } }')).search,
    ).toBeNull();
  });

  it('dashboard and stats do not throw', async () => {
    const { gql } = await setup();
    const d = await gql(
      '{ getBlocksDashboard { nodes { blockNo transactionsCount totalFee } } tps { nodes { txCount } } statistics { nodes { rollingStats60s { tps } totalFee24hrs } } }',
    );
    expect(d.getBlocksDashboard.nodes).toHaveLength(6);
    expect(d.getBlocksDashboard.nodes[0].blockNo).toBe('120');
    expect(typeof d.statistics.nodes.totalFee24hrs).toBe('string');
  });

  it('statistics and tps read hourly/10-minute series from the index, priced in USD', async () => {
    const { gql, index } = await setup();
    // Matches the resolver's own boundary: the first full hour at or after
    // now - 24h, so the series never starts with a partial (and therefore
    // artificially low) bucket.
    const firstFullHourSecs =
      Math.ceil((Date.now() / 1000 - 86400) / 3600) * 3600;
    const truth = index.hourlySeries(firstFullHourSecs);
    const totalTxs = truth.reduce((s, r) => s + r.txCount, 0);

    const d = await gql(`{
      statistics { nodes {
        totalTps { date value }
        totalFee { date value valueInUsd }
        totalFee24hrs
        averageTpsPerMinute { date value }
      } }
      tps { nodes { start end txCount } }
    }`);
    const nodes = d.statistics.nodes;

    expect(nodes.totalTps.length).toBe(truth.length);
    expect(nodes.totalTps.length).toBeGreaterThan(0);
    const txSum = nodes.totalTps.reduce(
      (s: number, r: any) => s + Number(r.value),
      0,
    );
    expect(txSum).toBe(totalTxs);
    // Allow a few seconds of clock skew between this computation and the
    // resolver's own `Date.now()` call.
    const firstFullHourMs = firstFullHourSecs * 1000 - 5000;
    for (const row of nodes.totalTps) {
      expect(Number.isFinite(Number(row.date))).toBe(true);
      expect(Number(row.date)).toBeGreaterThanOrEqual(firstFullHourMs);
    }

    const usdPattern = /^\$[\d,]+\.\d{2}$/;
    expect(nodes.totalFee24hrs).toMatch(usdPattern);
    expect(nodes.totalFee.length).toBe(truth.length);
    for (const row of nodes.totalFee)
      expect(row.valueInUsd).toMatch(usdPattern);

    expect(nodes.averageTpsPerMinute.length).toBeGreaterThan(0);

    expect(d.tps.nodes.length).toBe(truth.length);
    for (const row of d.tps.nodes) {
      expect(Number.isFinite(Number(row.start))).toBe(true);
      expect(Number.isFinite(Number(row.end))).toBe(true);
    }
  });

  it('averageTpsPerMinute equals txCount/60 for each minute bucket', async () => {
    const { gql, index } = await setup();
    // The 'statistics' query result is cache-shared (DataCache) across every
    // test in this file, so evict any entry left by an earlier test.
    DataCache.getInstance().save('statistics', 0, undefined);
    const firstFullMinuteSecs =
      Math.ceil((Date.now() / 1000 - 86400) / 60) * 60;
    const truth = index.minuteSeries(firstFullMinuteSecs);

    const d = await gql(`{
      statistics { nodes { averageTpsPerMinute { date value } } }
    }`);
    const rows = d.statistics.nodes.averageTpsPerMinute;
    expect(rows.length).toBe(truth.length);
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((row: { date: string; value: string }, i: number) => {
      expect(row.date).toBe(String(truth[i].bucketStart * 1000));
      expect(row.value).toBe((truth[i].txCount / 60).toFixed(2));
    });
  });

  it('statistics returns null USD fields when the price is unavailable', async () => {
    const { gql } = await setup({}, null);
    // The 'statistics' query result is cache-shared (DataCache) across every
    // test in this file, so evict any entry left by an earlier test's price.
    DataCache.getInstance().save('statistics', 0, undefined);
    const d = await gql(`{
      statistics { nodes {
        totalFee { valueInUsd }
        totalFee24hrs
      } }
    }`);
    expect(d.statistics.nodes.totalFee24hrs).toBeNull();
    expect(d.statistics.nodes.totalFee.length).toBeGreaterThan(0);
    for (const row of d.statistics.nodes.totalFee)
      expect(row.valueInUsd).toBeNull();
  });

  it('stubs return empty', async () => {
    const { gql } = await setup();
    const d = await gql(
      '{ predicate(address: "0x00") { address bytecode } asset(assetId: "0x00") { assetId } contracts(first: 5) { nodes { _id } } }',
    );
    expect(d.predicate).toBeNull();
    expect(d.asset).toBeNull();
    expect(d.contracts.nodes).toEqual([]);
  });

  it('balances passthrough enriches asset metadata (null when verified assets are unreachable)', async () => {
    const { gql } = await setup({
      query: async () => ({
        balances: { nodes: [{ amount: '1', assetId: hex(0), owner: ACCOUNT }] },
      }),
    });
    const d = await gql(
      `{ balances(filter: { owner: "${ACCOUNT}" }, first: 10) { nodes { amount assetId name } } }`,
    );
    expect(d.balances.nodes[0].amount).toBe('1');
    expect(d.balances.nodes[0].name).toBeNull();
  });
});
