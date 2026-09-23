import { encodeProtoBlock } from '../../test/helpers/protoBlock';
import { decodeBlock } from './block';

const b = (n: number, len = 32) => Buffer.alloc(len, n);
const fee = {
  gasPriceFactor: '92',
  gasPerByte: '63',
  maxGasPerTx: '30000000',
  gasCosts: {
    ecr1: '3000',
    s256: { LightOperation: { base: '2', unitsPerGas: '214' } },
    vmInitialization: { base: '1', unitsPerGas: '1' },
  },
};
// Any gasCosts key that getMinGas or calculateMetadataGasForTxScript reads and that is missing here makes this test throw. Add the key with a small decimal string value; do not change the assertions.

const bytes = encodeProtoBlock({
  v1: {
    header: {
      v2: {
        daHeight: '9',
        consensusParametersVersion: 1,
        stateTransitionBytecodeVersion: 2,
        transactionsCount: 2,
        messageReceiptCount: 0,
        transactionsRoot: b(1),
        messageOutboxRoot: b(2),
        eventInboxRoot: b(3),
        txIdCommitment: b(4),
        prevRoot: b(5),
        height: 500,
        time: '4611686020140000000',
        applicationHash: b(6),
        blockId: b(7),
      },
    },
    transactions: [
      {
        script: {
          scriptGasLimit: '10',
          receiptsRoot: b(0),
          script: Buffer.from([0]),
          scriptData: Buffer.from([]),
          policies: { bits: 0, values: [] },
          inputs: [],
          outputs: [],
          witnesses: [],
        },
      },
      {
        mint: {
          txPointer: { blockHeight: 500, txIndex: 1 },
          inputContract: { utxoId: {}, txPointer: {} },
          outputContract: {},
          mintAmount: '3',
          mintAssetId: b(0),
          gasPrice: '2',
        },
      },
    ],
    receipts: [
      {
        receipts: [
          { scriptResult: { result: { success: {} }, gasUsed: '10' } },
        ],
      },
      { receipts: [] },
    ],
  },
});

describe('decodeBlock', () => {
  it('produces a GQLBlock', () => {
    const block = decodeBlock(bytes, { chainId: 9889, fee }) as any;
    expect(block.__typename).toBe('Block');
    expect(block.id).toBe(`0x${'07'.repeat(32)}`);
    expect(block.height).toBe('500');
    expect(block.header.height).toBe('500');
    expect(block.header.daHeight).toBe('9');
    expect(block.header.transactionsCount).toBe('2');
    expect(block.header.prevRoot).toBe(`0x${'05'.repeat(32)}`);
    expect(block.consensus).toEqual({
      __typename: 'PoAConsensus',
      signature: null,
    });
    expect(block.transactions).toHaveLength(2);
    expect(block.transactions[0].status.totalGas).not.toBe('0');
    expect(block.transactions[0].status.totalFee).not.toBe('0');
    expect(block.transactions[1].isMint).toBe(true);
    expect(block.transactions[1].status.totalFee).toBe('0');
  });

  it('throws BlockIdMissing when header has no blockId', () => {
    const noId = encodeProtoBlock({
      v1: {
        header: { v2: { height: 1, time: '0' } },
        transactions: [],
        receipts: [],
      },
    });
    expect(() => decodeBlock(noId, { chainId: 9889, fee })).toThrow(/blockId/);
  });
});
