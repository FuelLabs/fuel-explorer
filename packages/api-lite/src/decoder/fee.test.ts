import { bn } from 'fuels';
import { computeGasAndFee } from './fee';
import { encodeRawPayload, toFuelsTransaction } from './fuelsTx';

const b = (n: number, len = 32) => Buffer.alloc(len, n);
const params = {
  gasPriceFactor: '92',
  gasPerByte: '63',
  maxGasPerTx: '30000000',
  gasCosts: {
    ecr1: '3000',
    s256: { LightOperation: { base: '2', unitsPerGas: '214' } },
    vmInitialization: { base: '1', unitsPerGas: '1' },
  },
};

describe('computeGasAndFee', () => {
  it('mint is zero', () => {
    const tx = toFuelsTransaction({
      mint: {
        txPointer: {},
        inputContract: { utxoId: {}, txPointer: {} },
        outputContract: {},
        mintAmount: '1',
        mintAssetId: b(0),
        gasPrice: '1',
      },
    });
    expect(computeGasAndFee(tx, encodeRawPayload(tx), [], '1', params)).toEqual(
      { totalGas: '0', totalFee: '0' },
    );
  });

  it('script fee is ceil((minGas + gasUsed) * gasPrice / factor) + tip', () => {
    const proto = {
      script: {
        scriptGasLimit: '1000',
        receiptsRoot: b(0),
        script: Buffer.from([0]),
        scriptData: Buffer.from([]),
        policies: { bits: 1, values: ['7'] },
        inputs: [],
        outputs: [],
        witnesses: [],
      },
    };
    const tx = toFuelsTransaction(proto);
    const raw = encodeRawPayload(tx);
    const { totalGas, totalFee } = computeGasAndFee(
      tx,
      raw,
      [
        {
          __typename: 'Receipt',
          receiptType: 'SCRIPT_RESULT',
          result: '0',
          gasUsed: '100',
        },
      ],
      '10',
      params,
    );
    const minGas = bn(totalGas).sub(100);
    expect(minGas.gt(0)).toBe(true);
    const expected = bn(totalGas).mul(10).add(91).div(92).add(7);
    expect(totalFee).toBe(expected.toString());
  });
});
