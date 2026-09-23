import type {
  GQLContractOutput,
  GQLInputContract,
  GQLPolicies,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import { decodeTransaction } from './transaction';

type Decoded = Omit<
  GQLTransaction,
  'status' | 'inputContract' | 'outputContract' | 'policies'
> & {
  status: Record<string, any>;
  inputContract: GQLInputContract;
  outputContract: GQLContractOutput;
  policies: GQLPolicies;
};
const decodeTransactionTyped = (
  ...a: Parameters<typeof decodeTransaction>
): Decoded => decodeTransaction(...a) as unknown as Decoded;

const b = (n: number, len = 32) => Buffer.alloc(len, n);
const block = {
  id: `0x${'ee'.repeat(32)}`,
  height: 100,
  time: '4611686020140000000',
  daHeight: '5',
  applicationHash: `0x${'aa'.repeat(32)}`,
  messageReceiptCount: '0',
};
const io = {
  policies: { bits: 0, values: [] },
  inputs: [
    {
      coinSigned: {
        utxoId: { txId: b(1), outputIndex: 0 },
        owner: b(2),
        amount: '10',
        assetId: b(0),
        txPointer: {},
        witnessIndex: 0,
        predicateGasUsed: '0',
      },
    },
  ],
  outputs: [{ contractCreated: { contractId: b(8), stateRoot: b(9) } }],
  witnesses: [],
};

describe('decodeTransaction', () => {
  it('script success', () => {
    const tx = decodeTransactionTyped(
      {
        script: {
          scriptGasLimit: '1',
          receiptsRoot: b(0),
          script: Buffer.from([0]),
          scriptData: Buffer.from([]),
          ...io,
        },
      },
      {
        receipts: [
          { scriptResult: { result: { success: {} }, gasUsed: '55' } },
        ],
      },
      { chainId: 9889, block },
    );
    expect(tx.__typename).toBe('Transaction');
    expect(tx.id).toMatch(/^0x[0-9a-f]{64}$/);
    expect(tx.isScript).toBe(true);
    expect(tx.isCreate).toBe(false);
    expect(tx.rawPayload).toMatch(/^0x/);
    expect(tx.inputAssetIds).toEqual([`0x${'00'.repeat(32)}`]);
    expect(tx.inputContracts).toEqual([]);
    expect(tx.status.__typename).toBe('SuccessStatus');
    expect(tx.status.time).toBe(block.time);
    expect(tx.status.block.header.height).toBe('100');
    expect(tx.status.receipts).toHaveLength(1);
    expect(tx.status.totalGas).toBe('0');
    expect(tx.status.transactionId).toBe(tx.id);
  });

  it('script failure with reason from PANIC', () => {
    const tx = decodeTransactionTyped(
      {
        script: {
          scriptGasLimit: '1',
          receiptsRoot: b(0),
          script: Buffer.from([0]),
          scriptData: Buffer.from([]),
          ...io,
        },
      },
      {
        receipts: [
          {
            panic: {
              id: b(0),
              reason: { reason: 2, instruction: 0 },
              pc: '0',
              is: '0',
            },
          },
          { scriptResult: { result: { panic: {} }, gasUsed: '5' } },
        ],
      },
      { chainId: 9889, block },
    );
    expect(tx.status.__typename).toBe('FailureStatus');
    expect(tx.status.reason).toBe(
      'PanicInstruction { reason: OUT_OF_GAS, instruction: 0 }',
    );
  });

  it('mint', () => {
    const tx = decodeTransactionTyped(
      {
        mint: {
          txPointer: { blockHeight: 100, txIndex: 0 },
          inputContract: {
            utxoId: { txId: b(0), outputIndex: 0 },
            balanceRoot: b(0),
            stateRoot: b(0),
            txPointer: {},
            contractId: b(0),
          },
          outputContract: { inputIndex: 0, balanceRoot: b(0), stateRoot: b(0) },
          mintAmount: '12',
          mintAssetId: b(0),
          gasPrice: '3',
        },
      },
      undefined,
      { chainId: 9889, block },
    );
    expect(tx.isMint).toBe(true);
    expect(tx.mintAmount).toBe('12');
    expect(tx.mintGasPrice).toBe('3');
    expect(tx.txPointer).toBe('000000640000');
    expect(tx.inputContract.contractId).toBe(`0x${'00'.repeat(32)}`);
    expect(tx.outputContract.inputIndex).toBe('0');
    expect(tx.status.__typename).toBe('SuccessStatus');
    expect(tx.status.receipts).toEqual([]);
  });

  it('create carries salt, storageSlots, bytecodeWitnessIndex', () => {
    const tx = decodeTransactionTyped(
      {
        create: {
          bytecodeWitnessIndex: 0,
          salt: b(1),
          storageSlots: [{ key: b(2), value: b(3) }],
          ...io,
          witnesses: [Buffer.from([0])],
        },
      },
      { receipts: [] },
      { chainId: 9889, block },
    );
    expect(tx.isCreate).toBe(true);
    expect(tx.salt).toBe(`0x${'01'.repeat(32)}`);
    expect(tx.storageSlots).toEqual([`0x${'02'.repeat(32)}${'03'.repeat(32)}`]);
    expect(tx.bytecodeWitnessIndex).toBe('0');
    expect(tx.outputs[0].__typename).toBe('ContractCreated');
  });

  it('policies read by fixed index, not packed position', () => {
    const maxFeeOnly = decodeTransactionTyped(
      {
        script: {
          scriptGasLimit: '1',
          receiptsRoot: b(0),
          script: Buffer.from([0]),
          scriptData: Buffer.from([]),
          ...io,
          policies: { bits: 8, values: ['0', '0', '0', '5000'] },
        },
      },
      { receipts: [] },
      { chainId: 9889, block },
    );
    expect(maxFeeOnly.policies.maxFee).toBe('5000');
    expect(maxFeeOnly.policies.tip).toBe(null);

    const tipAndMaxFee = decodeTransactionTyped(
      {
        script: {
          scriptGasLimit: '1',
          receiptsRoot: b(0),
          script: Buffer.from([0]),
          scriptData: Buffer.from([]),
          ...io,
          policies: { bits: 9, values: ['7', '0', '0', '5000'] },
        },
      },
      { receipts: [] },
      { chainId: 9889, block },
    );
    expect(tipAndMaxFee.policies.tip).toBe('7');
    expect(tipAndMaxFee.policies.maxFee).toBe('5000');
    expect(tipAndMaxFee.policies.witnessLimit).toBe(null);
  });
});
