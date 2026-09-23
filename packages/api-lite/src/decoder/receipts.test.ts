import { mapReceipt, mapReceipts, scriptResultCode } from './receipts';

const b = (n: number, len = 32) => Buffer.alloc(len, n);

describe('receipts', () => {
  it('maps CALL', () => {
    const r = mapReceipt({
      call: {
        id: b(1),
        to: b(2),
        amount: '10',
        assetId: b(3),
        gas: '5',
        param1: '1',
        param2: '2',
        pc: '100',
        is: '200',
      },
    });
    expect(r).toMatchObject({
      __typename: 'Receipt',
      receiptType: 'CALL',
      id: `0x${'01'.repeat(32)}`,
      to: `0x${'02'.repeat(32)}`,
      amount: '10',
      assetId: `0x${'03'.repeat(32)}`,
      gas: '5',
      param1: '1',
      param2: '2',
      pc: '100',
      is: '200',
    });
  });

  it('maps SCRIPT_RESULT success and revert', () => {
    expect(
      mapReceipt({ scriptResult: { result: { success: {} }, gasUsed: '77' } }),
    ).toMatchObject({
      receiptType: 'SCRIPT_RESULT',
      result: '0',
      gasUsed: '77',
    });
    expect(scriptResultCode({ revert: {} })).toEqual({ code: '1', ok: false });
    expect(scriptResultCode({ panic: {} })).toEqual({ code: '2', ok: false });
    expect(scriptResultCode({ genericFailure: { code: '9' } })).toEqual({
      code: '9',
      ok: false,
    });
  });

  it('maps PANIC reason packed as reason | instruction << 8', () => {
    const r = mapReceipt({
      panic: {
        id: b(0),
        reason: { reason: 2, instruction: 5 },
        pc: '1',
        is: '2',
      },
    });
    expect(r.reason).toBe(String(2 | (5 << 8)));
    expect(r.id).toBeNull();
  });

  it('maps MINT with contractId into id', () => {
    const r = mapReceipt({
      mint: { subId: b(4), contractId: b(5), val: '1', pc: '0', is: '0' },
    });
    expect(r).toMatchObject({
      receiptType: 'MINT',
      id: `0x${'05'.repeat(32)}`,
      subId: `0x${'04'.repeat(32)}`,
      val: '1',
    });
  });

  it('maps MESSAGE_OUT and data', () => {
    const r = mapReceipt({
      messageOut: {
        sender: b(1),
        recipient: b(2),
        amount: '3',
        nonce: b(6),
        len: '2',
        digest: b(7),
        data: Buffer.from([1, 2]),
      },
    });
    expect(r).toMatchObject({
      receiptType: 'MESSAGE_OUT',
      data: '0x0102',
      len: '2',
    });
  });

  it('mapReceipts handles empty group', () => {
    expect(mapReceipts(undefined)).toEqual([]);
    expect(mapReceipts({ receipts: [] })).toEqual([]);
  });

  it('throws on unknown variant', () => {
    expect(() => mapReceipt({ nope: {} })).toThrow(/Receipt oneof/);
  });
});
