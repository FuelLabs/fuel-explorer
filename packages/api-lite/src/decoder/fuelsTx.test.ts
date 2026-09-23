import { TransactionCoder, TransactionType, arrayify } from 'fuels';
import {
  computeTxId,
  encodeRawPayload,
  toFuelsTransaction,
  txVariant,
} from './fuelsTx';

const b = (n: number, len = 32) => Buffer.alloc(len, n);

const scriptProto = {
  script: {
    scriptGasLimit: '1000',
    receiptsRoot: b(9),
    script: Buffer.from([0x24, 0x00, 0x00, 0x00]),
    scriptData: Buffer.from([]),
    policies: { bits: 8, values: ['0', '0', '0', '5000'] },
    inputs: [
      {
        coinSigned: {
          utxoId: { txId: b(1), outputIndex: 0 },
          owner: b(2),
          amount: '10',
          assetId: b(0),
          txPointer: { blockHeight: 3, txIndex: 0 },
          witnessIndex: 0,
          predicateGasUsed: '0',
        },
      },
    ],
    outputs: [{ change: { to: b(2), amount: '0', assetId: b(0) } }],
    witnesses: [Buffer.from([1, 2, 3])],
  },
};

describe('fuelsTx', () => {
  it('detects variant', () => {
    expect(txVariant(scriptProto)).toBe('script');
    expect(txVariant({ mint: {} })).toBe('mint');
    expect(txVariant({ blob: {} })).toBe('blob');
  });

  it('round-trips a script through TransactionCoder', () => {
    const tx = toFuelsTransaction(scriptProto);
    const raw = encodeRawPayload(tx);
    const [decoded] = new TransactionCoder().decode(arrayify(raw), 0);
    expect(decoded.type).toBe(TransactionType.Script);
    expect(decoded.inputs?.length).toBe(1);
    expect(decoded.outputs?.length).toBe(1);
    expect(decoded.witnesses?.length).toBe(1);
    expect(decoded.policies?.find((p) => p.type === 8)?.data.toString()).toBe(
      '5000',
    );
  });

  it('id is stable, 32 bytes, and depends on chainId', () => {
    const raw = encodeRawPayload(toFuelsTransaction(scriptProto));
    const a = computeTxId(raw, 9889);
    expect(a).toMatch(/^0x[0-9a-f]{64}$/);
    expect(
      computeTxId(encodeRawPayload(toFuelsTransaction(scriptProto)), 9889),
    ).toBe(a);
    expect(
      computeTxId(encodeRawPayload(toFuelsTransaction(scriptProto)), 0),
    ).not.toBe(a);
  });

  it('id ignores witnesses', () => {
    const noWitness = { script: { ...scriptProto.script, witnesses: [] } };
    expect(
      computeTxId(encodeRawPayload(toFuelsTransaction(noWitness)), 9889),
    ).toBe(
      computeTxId(encodeRawPayload(toFuelsTransaction(scriptProto)), 9889),
    );
  });

  it('builds create, upgrade, upload, blob', () => {
    const io = {
      policies: { bits: 0, values: [] },
      inputs: [],
      outputs: [],
      witnesses: [Buffer.from([0])],
    };
    expect(
      toFuelsTransaction({
        create: {
          bytecodeWitnessIndex: 0,
          salt: b(1),
          storageSlots: [{ key: b(2), value: b(3) }],
          ...io,
        },
      }).type,
    ).toBe(TransactionType.Create);
    expect(
      toFuelsTransaction({
        upgrade: { purpose: { stateTransition: { root: b(4) } }, ...io },
      }).type,
    ).toBe(TransactionType.Upgrade);
    expect(
      toFuelsTransaction({
        upgrade: {
          purpose: { consensusParameters: { witnessIndex: 0, checksum: b(4) } },
          ...io,
        },
      }).type,
    ).toBe(TransactionType.Upgrade);
    expect(
      toFuelsTransaction({
        upload: {
          root: b(5),
          witnessIndex: 0,
          subsectionIndex: 0,
          subsectionsNumber: 1,
          proofSet: [b(6)],
          ...io,
        },
      }).type,
    ).toBe(TransactionType.Upload);
    expect(
      toFuelsTransaction({ blob: { blobId: b(7), witnessIndex: 0, ...io } })
        .type,
    ).toBe(TransactionType.Blob);
  });

  it('builds mint', () => {
    const tx = toFuelsTransaction({
      mint: {
        txPointer: { blockHeight: 1, txIndex: 0 },
        inputContract: {
          utxoId: { txId: b(1), outputIndex: 0 },
          balanceRoot: b(2),
          stateRoot: b(3),
          txPointer: {},
          contractId: b(4),
        },
        outputContract: { inputIndex: 0, balanceRoot: b(2), stateRoot: b(3) },
        mintAmount: '12',
        mintAssetId: b(0),
        gasPrice: '1',
      },
    });
    expect(tx.type).toBe(TransactionType.Mint);
    const [decoded] = new TransactionCoder().decode(
      arrayify(encodeRawPayload(tx)),
      0,
    );
    expect(decoded.type).toBe(TransactionType.Mint);
  });
});
