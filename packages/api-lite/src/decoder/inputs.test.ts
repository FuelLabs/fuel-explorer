import { mapInput } from './inputs';
const b = (n: number, len = 32) => Buffer.alloc(len, n);

describe('mapInput', () => {
  it('coinSigned -> InputCoin', () => {
    const i = mapInput({
      coinSigned: {
        utxoId: { txId: b(1), outputIndex: 2 },
        owner: b(3),
        amount: '100',
        assetId: b(4),
        txPointer: { blockHeight: 10, txIndex: 1 },
        witnessIndex: 0,
        predicateGasUsed: '0',
      },
    });
    expect(i).toEqual({
      __typename: 'InputCoin',
      utxoId: `0x${'01'.repeat(32)}0002`,
      owner: `0x${'03'.repeat(32)}`,
      amount: '100',
      assetId: `0x${'04'.repeat(32)}`,
      txPointer: '0000000a0001',
      witnessIndex: '0',
      predicateGasUsed: '0',
      predicate: '0x',
      predicateData: '0x',
    });
  });
  it('coinPredicate keeps predicate bytes', () => {
    const i = mapInput({
      coinPredicate: {
        utxoId: { txId: b(1), outputIndex: 0 },
        owner: b(3),
        amount: '1',
        assetId: b(4),
        txPointer: {},
        witnessIndex: 0,
        predicateGasUsed: '9',
        predicate: Buffer.from([0xaa]),
        predicateData: Buffer.from([0xbb]),
      },
    });
    expect(i).toMatchObject({
      __typename: 'InputCoin',
      predicate: '0xaa',
      predicateData: '0xbb',
      predicateGasUsed: '9',
      txPointer: '000000000000',
    });
  });
  it('contract -> InputContract', () => {
    const i = mapInput({
      contract: {
        utxoId: { txId: b(1), outputIndex: 1 },
        balanceRoot: b(2),
        stateRoot: b(3),
        txPointer: { blockHeight: 1, txIndex: 2 },
        contractId: b(4),
      },
    });
    expect(i).toEqual({
      __typename: 'InputContract',
      utxoId: `0x${'01'.repeat(32)}0001`,
      balanceRoot: `0x${'02'.repeat(32)}`,
      stateRoot: `0x${'03'.repeat(32)}`,
      txPointer: '000000010002',
      contractId: `0x${'04'.repeat(32)}`,
    });
  });
  it('message variants -> InputMessage', () => {
    for (const key of [
      'messageCoinSigned',
      'messageCoinPredicate',
      'messageDataSigned',
      'messageDataPredicate',
    ]) {
      const i = mapInput({
        [key]: {
          sender: b(1),
          recipient: b(2),
          amount: '5',
          nonce: b(3),
          witnessIndex: 1,
          predicateGasUsed: '0',
          data: Buffer.from([1]),
        },
      });
      expect(i).toMatchObject({
        __typename: 'InputMessage',
        sender: `0x${'01'.repeat(32)}`,
        recipient: `0x${'02'.repeat(32)}`,
        amount: '5',
        nonce: `0x${'03'.repeat(32)}`,
        witnessIndex: '1',
        data: '0x01',
        predicate: '0x',
        predicateData: '0x',
      });
    }
  });
  it('throws on unknown', () => {
    expect(() => mapInput({ x: {} })).toThrow(/input oneof/);
  });
});
