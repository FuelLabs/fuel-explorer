import { encodeProtoBlock } from './protoBlock';

const b = (n: number, len = 32) => Buffer.alloc(len, n);

// Any gasCosts key that getMinGas or calculateMetadataGasForTxScript reads
// and that is missing here makes decodeBlock throw; add the key with a small
// decimal string value.
export const sampleFee = {
  gasPriceFactor: '92',
  gasPerByte: '63',
  maxGasPerTx: '30000000',
  gasCosts: {
    ecr1: '3000',
    s256: { LightOperation: { base: '2', unitsPerGas: '214' } },
    vmInitialization: { base: '1', unitsPerGas: '1' },
  },
};

// Protobuf bytes for a block at `height` with `scripts` script txs and one
// mint, the smallest shape decodeBlock accepts end to end.
export function sampleBlockBytes(height: number, scripts = 1): Uint8Array {
  const script = {
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
  };
  const scriptReceipts = {
    receipts: [{ scriptResult: { result: { success: {} }, gasUsed: '10' } }],
  };
  return encodeProtoBlock({
    v1: {
      header: {
        v2: {
          daHeight: '9',
          consensusParametersVersion: 1,
          stateTransitionBytecodeVersion: 2,
          transactionsCount: scripts + 1,
          messageReceiptCount: 0,
          transactionsRoot: b(1),
          messageOutboxRoot: b(2),
          eventInboxRoot: b(3),
          txIdCommitment: b(4),
          prevRoot: b(5),
          height,
          time: '4611686020140000000',
          applicationHash: b(6),
          blockId: b(7),
        },
      },
      transactions: [
        ...Array.from({ length: scripts }, () => script),
        {
          mint: {
            txPointer: { blockHeight: height, txIndex: scripts },
            inputContract: { utxoId: {}, txPointer: {} },
            outputContract: {},
            mintAmount: '3',
            mintAssetId: b(0),
            gasPrice: '2',
          },
        },
      ],
      receipts: [
        ...Array.from({ length: scripts }, () => scriptReceipts),
        { receipts: [] },
      ],
    },
  });
}
