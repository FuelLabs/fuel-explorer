import { bytesOf, record, toB256, toU64String } from './values';

export type GQLOutputOut = Record<string, string> & {
  __typename:
    | 'CoinOutput'
    | 'ContractOutput'
    | 'ChangeOutput'
    | 'VariableOutput'
    | 'ContractCreated';
};

export function mapOutput(proto: unknown): GQLOutputOut {
  const output = record(proto, 'Output');
  const coinLike = (
    typename: GQLOutputOut['__typename'],
    v: unknown,
  ): GQLOutputOut => {
    const o = record(v);
    return {
      __typename: typename,
      to: toB256(bytesOf(o.to)),
      amount: toU64String(o.amount),
      assetId: toB256(bytesOf(o.assetId)),
    };
  };
  if (output.coin) return coinLike('CoinOutput', output.coin);
  if (output.change) return coinLike('ChangeOutput', output.change);
  if (output.variable) return coinLike('VariableOutput', output.variable);
  if (output.contract) {
    const o = record(output.contract);
    return {
      __typename: 'ContractOutput',
      inputIndex: toU64String(o.inputIndex),
      balanceRoot: toB256(bytesOf(o.balanceRoot)),
      stateRoot: toB256(bytesOf(o.stateRoot)),
    };
  }
  if (output.contractCreated) {
    const o = record(output.contractCreated);
    return {
      __typename: 'ContractCreated',
      contract: toB256(bytesOf(o.contractId)),
      stateRoot: toB256(bytesOf(o.stateRoot)),
    };
  }
  throw new Error(`unknown output oneof: ${Object.keys(output).join(',')}`);
}
