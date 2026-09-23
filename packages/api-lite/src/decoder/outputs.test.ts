import { mapOutput } from './outputs';
const b = (n: number, len = 32) => Buffer.alloc(len, n);

describe('mapOutput', () => {
  it('coin/change/variable', () => {
    for (const [key, typename] of [
      ['coin', 'CoinOutput'],
      ['change', 'ChangeOutput'],
      ['variable', 'VariableOutput'],
    ] as const) {
      expect(
        mapOutput({ [key]: { to: b(1), amount: '7', assetId: b(2) } }),
      ).toEqual({
        __typename: typename,
        to: `0x${'01'.repeat(32)}`,
        amount: '7',
        assetId: `0x${'02'.repeat(32)}`,
      });
    }
  });
  it('contract', () => {
    expect(
      mapOutput({
        contract: { inputIndex: 3, balanceRoot: b(1), stateRoot: b(2) },
      }),
    ).toEqual({
      __typename: 'ContractOutput',
      inputIndex: '3',
      balanceRoot: `0x${'01'.repeat(32)}`,
      stateRoot: `0x${'02'.repeat(32)}`,
    });
  });
  it('contractCreated', () => {
    expect(
      mapOutput({ contractCreated: { contractId: b(1), stateRoot: b(2) } }),
    ).toEqual({
      __typename: 'ContractCreated',
      contract: `0x${'01'.repeat(32)}`,
      stateRoot: `0x${'02'.repeat(32)}`,
    });
  });
  it('throws on unknown', () => {
    expect(() => mapOutput({})).toThrow(/output oneof/);
  });
});
