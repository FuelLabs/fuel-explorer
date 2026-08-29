import { toTxListNode, toTxNode } from './transactions';

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
