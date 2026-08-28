import { Index, parseTxCursor, txCursor } from './Index';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;

function block(
  height: number,
  txs: {
    id: string;
    accounts?: string[];
    contractCreated?: string;
    predicate?: [string, string];
    mint?: [string, string];
  }[],
) {
  return {
    id: hex(1000 + height),
    height: String(height),
    header: { height: String(height), time: '4611686020140000000' },
    transactions: txs.map((t) => ({
      id: t.id,
      inputs: [
        ...(t.accounts ?? []).map((a) => ({
          __typename: 'InputCoin',
          owner: a,
          predicate: t.predicate?.[0] === a ? t.predicate[1] : '0x',
        })),
      ],
      outputs: t.contractCreated
        ? [{ __typename: 'ContractCreated', contract: t.contractCreated }]
        : [],
      status: {
        __typename: 'SuccessStatus',
        receipts: t.mint
          ? [{ receiptType: 'MINT', id: t.mint[0], subId: t.mint[1] }]
          : [],
      },
    })),
  } as any;
}

describe('Index', () => {
  let idx: Index;
  beforeEach(() => {
    idx = new Index(':memory:');
  });
  afterEach(() => idx.close());

  it('cursor round trip', () => {
    expect(txCursor(5, 0)).toBe(`${'0'.repeat(31)}5-${'0'.repeat(15)}1`);
    expect(parseTxCursor(txCursor(5, 2))).toEqual({ height: 5, txIndex: 2 });
  });

  it('hash lookups', () => {
    idx.writeBlock(block(10, [{ id: hex(1) }, { id: hex(2) }]));
    expect(idx.heightForBlock(hex(1010))).toBe(10);
    expect(idx.heightForTx(hex(2))).toEqual({ height: 10, txIndex: 1 });
    expect(idx.heightForTx(hex(3))).toBeNull();
  });

  it('account history newest first with cursors', () => {
    const a = hex(77);
    idx.writeBlock(
      block(10, [
        { id: hex(1), accounts: [a] },
        { id: hex(2), accounts: [a] },
      ]),
    );
    idx.writeBlock(block(11, [{ id: hex(3), accounts: [a] }]));
    expect(idx.accountExists(a)).toBe(true);
    expect(idx.accountExists(hex(78))).toBe(false);
    expect(idx.txsForAccount(a, { limit: 10 })).toEqual([
      { height: 11, txIndex: 0 },
      { height: 10, txIndex: 1 },
      { height: 10, txIndex: 0 },
    ]);
    expect(
      idx.txsForAccount(a, { limit: 10, before: txCursor(11, 0) }),
    ).toEqual([
      { height: 10, txIndex: 1 },
      { height: 10, txIndex: 0 },
    ]);
    expect(idx.txsForAccount(a, { limit: 10, after: txCursor(10, 0) })).toEqual(
      [
        { height: 11, txIndex: 0 },
        { height: 10, txIndex: 1 },
      ],
    );
    expect(idx.countForAccount(a, 1001)).toBe(3);
  });

  it('writes the same block twice without error', () => {
    idx.writeBlock(block(10, [{ id: hex(1), accounts: [hex(5)] }]));
    idx.writeBlock(block(10, [{ id: hex(1), accounts: [hex(5)] }]));
    expect(idx.countForAccount(hex(5), 10)).toBe(1);
  });

  it('predicates, contracts, assets', () => {
    const p = hex(9);
    idx.writeBlock(
      block(12, [
        {
          id: hex(1),
          accounts: [p],
          predicate: [p, '0xdeadbeef'],
          contractCreated: hex(20),
          mint: [hex(20), hex(0)],
        },
      ]),
    );
    expect(idx.predicate(p)).toBe('0xdeadbeef');
    expect(idx.predicate(hex(8))).toBeNull();
    expect(idx.contract(hex(20))).toEqual({ height: 12 });
    expect(idx.contracts({ limit: 5 })).toEqual([
      { contractId: hex(20), height: 12 },
    ]);
    const assets = idx.assetsByContract(hex(20));
    expect(assets).toHaveLength(1);
    expect(assets[0].subId).toBe(hex(0));
    expect(idx.asset(assets[0].assetId)).toEqual({
      contractId: hex(20),
      subId: hex(0),
    });
  });

  it('stores unix time, gas and fee, and buckets series', () => {
    const T = 1_700_000_000;
    const tai = (u: number) => (BigInt(u) + (1n << 62n) + 10n).toString();
    const blk = (h: number, u: number, gas: string, fee: string) => ({
      ...block(h, [{ id: hex(h) }]),
      header: { height: String(h), time: tai(u) },
      transactions: [
        {
          id: hex(h),
          inputs: [],
          outputs: [],
          status: {
            __typename: 'SuccessStatus',
            receipts: [],
            totalGas: gas,
            totalFee: fee,
          },
        },
      ],
    });
    idx.writeBlock(blk(1, T, '10', '5'));
    idx.writeBlock(blk(2, T + 100, '20', '7'));
    idx.writeBlock(blk(3, T + 3700, '1', '1'));
    const hours = idx.hourlySeries(T - 1);
    expect(hours).toHaveLength(2);
    expect(hours[0]).toEqual({
      bucketStart: Math.floor(T / 3600) * 3600,
      txCount: 2,
      blocks: 2,
      gasUsed: '30',
      totalFee: '12',
    });
    expect(idx.tenMinuteSeries(T - 1)).toHaveLength(2);
    expect(idx.oldestTime()).toBe(T);
  });

  it('range and deleteBelow', () => {
    expect(idx.range()).toEqual({ from: null, to: null });
    idx.writeBlock(block(10, [{ id: hex(1), accounts: [hex(5)] }]));
    idx.writeBlock(block(11, [{ id: hex(2), accounts: [hex(5)] }]));
    idx.setRange(10, 11);
    expect(idx.range()).toEqual({ from: 10, to: 11 });
    expect(idx.deleteBelow(11)).toBeGreaterThan(0);
    expect(idx.heightForTx(hex(1))).toBeNull();
    expect(idx.heightForTx(hex(2))).toEqual({ height: 11, txIndex: 0 });
    expect(idx.range().from).toBe(11);
    expect(idx.fileBytes()).toBeGreaterThanOrEqual(0);
  });

  it('deleteAboveRange keeps a stray row below from and removes a row above to', () => {
    idx.writeBlock(block(0, [{ id: hex(1) }]));
    idx.writeBlock(block(10, [{ id: hex(2) }]));
    idx.writeBlock(block(11, [{ id: hex(3) }]));
    idx.setRange(10, 11);
    expect(idx.deleteAboveRange()).toBe(0);
    idx.writeBlock(block(12, [{ id: hex(4) }]));
    expect(idx.deleteAboveRange()).toBeGreaterThan(0);
    expect(idx.heightForTx(hex(1))).toEqual({ height: 0, txIndex: 0 });
    expect(idx.heightForTx(hex(2))).toEqual({ height: 10, txIndex: 0 });
    expect(idx.heightForTx(hex(3))).toEqual({ height: 11, txIndex: 0 });
    expect(idx.heightForTx(hex(4))).toBeNull();
  });

  it('deleteAboveRange is a no-op when indexed_to is unset', () => {
    idx.writeBlock(block(0, [{ id: hex(1) }]));
    expect(idx.deleteAboveRange()).toBe(0);
    expect(idx.heightForTx(hex(1))).not.toBeNull();
  });

  it('clearRange deletes the indexed_from and indexed_to meta rows', () => {
    idx.setRange(10, 11);
    expect(idx.range()).toEqual({ from: 10, to: 11 });
    idx.clearRange();
    expect(idx.range()).toEqual({ from: null, to: null });
  });

  it('setFrom updates only indexed_from, leaving indexed_to untouched', () => {
    idx.setRange(10, 20);
    idx.setFrom(15);
    expect(idx.range()).toEqual({ from: 15, to: 20 });
  });
});
