import { txCursor } from '../../index/Index';
import { toTxListNode, toTxNode, transactionResolvers } from './transactions';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const BASE_ASSET = hex(0);
const OTHER_ASSET = hex(9);
const T0 = ((1n << 62n) + 10n + 1_700_000_000n).toString();

function scriptTx(overrides: Record<string, unknown> = {}) {
  return {
    __typename: 'Transaction',
    id: hex(1),
    rawPayload: '0x00',
    isScript: true,
    isCreate: false,
    isMint: false,
    isUpgrade: false,
    isUpload: false,
    inputs: [
      {
        __typename: 'InputCoin',
        owner: hex(2),
        amount: '5',
        assetId: BASE_ASSET,
        utxoId: `${hex(3)}0000`,
        txPointer: '000000000000',
        witnessIndex: '0',
        predicateGasUsed: '0',
        predicate: '0x',
        predicateData: '0x',
      },
      {
        __typename: 'InputCoin',
        owner: hex(2),
        amount: '1000',
        assetId: OTHER_ASSET,
        utxoId: `${hex(4)}0000`,
        txPointer: '000000000000',
        witnessIndex: '0',
        predicateGasUsed: '0',
        predicate: '0x',
        predicateData: '0x',
      },
    ],
    outputs: [
      {
        __typename: 'ChangeOutput',
        to: hex(2),
        amount: '4',
        assetId: BASE_ASSET,
      },
      {
        __typename: 'ChangeOutput',
        to: hex(2),
        amount: '900',
        assetId: OTHER_ASSET,
      },
    ],
    witnesses: [],
    policies: null,
    inputAssetIds: [],
    inputContracts: [],
    mintAmount: null,
    mintAssetId: null,
    mintGasPrice: null,
    status: {
      __typename: 'SuccessStatus',
      time: T0,
      transactionId: hex(1),
      totalFee: '1000000',
      totalGas: '4',
      receipts: [],
      programState: null,
      block: {
        id: hex(101),
        height: '1',
        header: {
          id: hex(101),
          height: '1',
          time: T0,
          daHeight: '1',
          applicationHash: hex(0),
          messageReceiptCount: '0',
        },
      },
    },
    ...overrides,
  } as any;
}

function mintTx(overrides: Record<string, unknown> = {}) {
  const base = scriptTx();
  return {
    ...base,
    id: hex(5),
    isScript: false,
    isMint: true,
    inputs: [],
    outputs: [],
    mintAmount: '9',
    mintAssetId: BASE_ASSET,
    mintGasPrice: '1',
    status: { ...base.status, totalFee: '0', totalGas: '0' },
    ...overrides,
  } as any;
}

describe('toTxNode', () => {
  const pricing = { usd: 2000, baseAssetId: BASE_ASSET };
  const noPricing = { usd: null, baseAssetId: BASE_ASSET };

  it('computes gasCosts.feeInUsd from the given price, null when the price is unavailable', () => {
    const node = toTxNode(scriptTx(), 1, 0, pricing);
    expect(node.gasCosts?.feeInUsd).toBe('$2.00');
    const noPrice = toTxNode(scriptTx(), 1, 0, noPricing);
    expect(noPrice.gasCosts?.feeInUsd).toBeNull();
  });

  it('computes amountInUsd on inputs and outputs for the base asset only, null for other assets', () => {
    const node = toTxNode(scriptTx(), 1, 0, pricing);
    expect((node.inputs as any)[0].amountInUsd).toBe('$0.00001');
    expect((node.inputs as any)[1].amountInUsd).toBeNull();
    expect((node.outputs as any)[0].amountInUsd).toBe('$0.000008');
    expect((node.outputs as any)[1].amountInUsd).toBeNull();
  });

  it('leaves amountInUsd null on every input/output when the price is unavailable', () => {
    const node = toTxNode(scriptTx(), 1, 0, noPricing);
    expect((node.inputs as any)[0].amountInUsd).toBeNull();
    expect((node.outputs as any)[0].amountInUsd).toBeNull();
  });

  it('computes mintAmountUsd like production: $0 for a non-mint tx, the real conversion for a base-asset mint', () => {
    expect(toTxNode(scriptTx(), 1, 0, pricing).mintAmountUsd).toBe('$0');
    expect(toTxNode(mintTx(), 1, 0, pricing).mintAmountUsd).toBe('$0.00001');
  });

  it('list nodes carry mintAmountUsd too, since the schema field is non-nullable', () => {
    expect(toTxListNode(mintTx(), 1, 0, pricing).mintAmountUsd).toBe(
      '$0.00001',
    );
    expect(toTxListNode(scriptTx(), 1, 0, pricing).mintAmountUsd).toBe('$0');
    expect(toTxListNode(scriptTx(), 1, 0, noPricing).mintAmountUsd).toBe('');
  });

  it('mintAmountUsd is empty only when the price is unavailable', () => {
    expect(toTxNode(mintTx(), 1, 0, noPricing).mintAmountUsd).toBe('');
    expect(toTxNode(scriptTx(), 1, 0, noPricing).mintAmountUsd).toBe('');
  });

  it('mintAmountUsd is $0 when a mint targets a non-base asset instead of pricing it at the ETH rate', () => {
    const node = toTxNode(mintTx({ mintAssetId: OTHER_ASSET }), 1, 0, pricing);
    expect(node.mintAmountUsd).toBe('$0');
  });

  it('defaults to the unpriced shape when pricing is omitted, matching search.ts callers', () => {
    const node = toTxNode(scriptTx(), 1, 0);
    expect(node.gasCosts?.feeInUsd).toBeNull();
    expect(node.mintAmountUsd).toBe('');
    expect((node.inputs as any)[0].amountInUsd).toBeNull();
  });
});

describe('toTxListNode', () => {
  it('computes gasCosts.feeInUsd from the given price', () => {
    const priced = toTxListNode(scriptTx(), 1, 0, {
      usd: 2000,
      baseAssetId: BASE_ASSET,
    });
    expect(priced.gasCosts?.feeInUsd).toBe('$2.00');
    const unpriced = toTxListNode(scriptTx(), 1, 0, {
      usd: null,
      baseAssetId: BASE_ASSET,
    });
    expect(unpriced.gasCosts?.feeInUsd).toBeNull();
    const defaulted = toTxListNode(scriptTx(), 1, 0);
    expect(defaulted.gasCosts?.feeInUsd).toBeNull();
  });
});

describe('mutation safety', () => {
  const pricing = { usd: 2000, baseAssetId: BASE_ASSET };

  it('toTxNode does not mutate the raw cached transaction object', () => {
    const tx = scriptTx();
    const before = structuredClone(tx);
    toTxNode(tx, 1, 0, pricing);
    expect(tx).toEqual(before);
    expect((tx.inputs as any)[0].amountInUsd).toBeUndefined();
    expect((tx.outputs as any)[0].amountInUsd).toBeUndefined();
    expect((tx as any).gasCosts?.feeInUsd).toBeUndefined();
  });

  it('toTxListNode does not mutate the raw cached transaction object', () => {
    const tx = scriptTx();
    const before = structuredClone(tx);
    toTxListNode(tx, 1, 0, pricing);
    expect(tx).toEqual(before);
    expect((tx as any).gasCosts?.feeInUsd).toBeUndefined();
  });
});

describe('transactions (global list) pageInfo counts', () => {
  // Three blocks, one tx each, tip at height 3: a small, fully-known
  // "retention window" so txCount()/newerTxCount() can be asserted against
  // real numbers instead of mocked ones -- this is the same bug shape as
  // transactionsByOwner's 0/0, just for the global recentTransactions list.
  const heights = [1, 2, 3];
  const blocksByHeight: Record<number, { transactions: unknown[] }> = {};
  for (const h of heights) {
    blocksByHeight[h] = { transactions: [scriptTx({ id: hex(100 + h) })] };
  }
  function makeCtx() {
    return {
      store: { get: async (h: number) => blocksByHeight[h] ?? null },
      tip: { servedTip: 3 },
      price: { usd: async () => 2000 },
      chain: { chainId: 1, baseAssetId: BASE_ASSET },
      index: {
        txCount: () => heights.length,
        newerTxCount: (ref: { height: number; txIndex: number }) =>
          heights.filter((h) => h > ref.height).length,
      },
    } as any;
  }

  it('reports 1-based ascending counts (oldest = 1, newest = totalCount) on the default (no-cursor) page', async () => {
    const result = await transactionResolvers.Query.transactions(
      null,
      { first: 2 },
      makeCtx(),
    );
    expect(result.nodes).toHaveLength(2);
    expect(result.pageInfo.totalCount).toBe(3);
    expect(result.pageInfo.endCount).toBe(3);
    expect(result.pageInfo.startCount).toBe(2);
  });

  it('reports the same 1-based counts when paginating via an after cursor', async () => {
    const result = await transactionResolvers.Query.transactions(
      null,
      { first: 2, after: txCursor(1, 0) },
      makeCtx(),
    );
    expect(result.nodes).toHaveLength(2);
    expect(result.pageInfo.totalCount).toBe(3);
    expect(result.pageInfo.endCount).toBe(3);
    expect(result.pageInfo.startCount).toBe(2);
  });

  it('never reports 0 for a non-empty page', async () => {
    const result = await transactionResolvers.Query.transactions(
      null,
      { first: 1 },
      makeCtx(),
    );
    expect(result.nodes).toHaveLength(1);
    expect(result.pageInfo.startCount).toBeGreaterThan(0);
    expect(result.pageInfo.endCount).toBeGreaterThan(0);
  });
});
describe('global list totalCount/ranks are capped like the account list', () => {
  it('passes TX_COUNT_CAP (1001) through to index.txCount/newerTxCount', async () => {
    const txCount = jest.fn(() => 1001);
    const newerTxCount = jest.fn(() => 0);
    const ctx: any = {
      store: {
        get: async (h: number) => ({
          transactions: [scriptTx({ id: hex(200 + h) })],
        }),
      },
      tip: { servedTip: 1 },
      price: { usd: async () => null },
      chain: { chainId: 1, baseAssetId: BASE_ASSET },
      index: { txCount, newerTxCount },
    };
    const result = await transactionResolvers.Query.transactions(
      null,
      { first: 4 },
      ctx,
    );
    expect(result.pageInfo.totalCount).toBe(1001);
    expect(txCount).toHaveBeenCalledWith(1001);
    expect(newerTxCount).toHaveBeenCalledWith(expect.anything(), 1001);
  });
});

describe("fuel-core fallback pages never reuse the index page's numbers", () => {
  function makeCtx(overrides: Record<string, unknown> = {}) {
    return {
      hot: { hit: () => {}, hits: () => 0 },
      price: { usd: async () => null },
      chain: { chainId: 1, baseAssetId: BASE_ASSET },
      index: {
        countForAccount: () => 3,
        txsForAccount: () => [],
        range: () => ({ from: null, to: null }),
        newerCountForAccount: () => 0,
      },
      store: { get: async () => null },
      client: {
        txsByOwner: async () => ({
          items: [{ id: hex(300), height: 5, cursor: 'c1' }],
          hasNextPage: false,
          hasPreviousPage: false,
        }),
      },
      ...overrides,
    } as any;
  }

  it('numbers a fuel-core-served page 1..pageLength instead of near the (unrelated) total', async () => {
    const ctx = makeCtx({
      store: {
        get: async (h: number) =>
          h === 5 ? { transactions: [scriptTx({ id: hex(300) })] } : null,
      },
    });
    const result = await transactionResolvers.Query.transactionsByOwner(
      null,
      { owner: hex(1), first: 1 },
      ctx,
    );
    expect(result.nodes).toHaveLength(1);
    expect(result.pageInfo.startCount).toBe(1);
    expect(result.pageInfo.endCount).toBe(1);
    expect(result.pageInfo.totalCount).not.toBe(result.pageInfo.endCount);
  });
});

describe('pageFromFuelCore backfills a page when a fuel-core item fails to render', () => {
  it('fills the page from remaining items instead of shrinking it when one block fetch fails', async () => {
    const items = [
      { id: hex(1), height: 10, cursor: 'c1' },
      { id: hex(2), height: 11, cursor: 'c2' },
      { id: hex(3), height: 12, cursor: 'c3' },
      { id: hex(4), height: 13, cursor: 'c4' },
    ];
    const ctx: any = {
      hot: { hit: () => {}, hits: () => 0 },
      price: { usd: async () => null },
      chain: { chainId: 1, baseAssetId: BASE_ASSET },
      index: {
        countForAccount: () => 3,
        txsForAccount: () => [],
        range: () => ({ from: null, to: null }),
        newerCountForAccount: () => 0,
      },
      store: {
        get: async (h: number) =>
          h === 11
            ? null // simulates a failed/missing block fetch for this one item
            : { transactions: [scriptTx({ id: hex(h - 9) })] },
      },
      client: {
        txsByOwner: async (_owner: string, opts: any) => ({
          items: items.slice(0, opts.first ?? items.length),
          hasNextPage: false,
          hasPreviousPage: false,
        }),
      },
    };
    const result = await transactionResolvers.Query.transactionsByOwner(
      null,
      { owner: hex(1), first: 3 },
      ctx,
    );
    expect(result.nodes).toHaveLength(3);
    expect(result.nodes.map((n: any) => n.id)).toEqual([
      hex(1),
      hex(3),
      hex(4),
    ]);
  });
});
