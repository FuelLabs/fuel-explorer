import {
  bytesOf,
  record,
  toB256,
  toHex,
  toNumber,
  toU64String,
  txPointerHex,
  utxoIdHex,
} from './values';

export type GQLInputOut = Record<string, string> & {
  __typename: 'InputCoin' | 'InputContract' | 'InputMessage';
};

function pointer(value: unknown): string {
  const p = value == null ? {} : record(value, 'TxPointer');
  return txPointerHex(toNumber(p.blockHeight), toNumber(p.txIndex));
}

function utxo(value: unknown): string {
  const u = value == null ? {} : record(value, 'UtxoId');
  return utxoIdHex(bytesOf(u.txId), toNumber(u.outputIndex));
}

export function mapInput(proto: unknown): GQLInputOut {
  const input = record(proto, 'Input');
  const coin = input.coinSigned ?? input.coinPredicate;
  if (coin) {
    const c = record(coin);
    return {
      __typename: 'InputCoin',
      utxoId: utxo(c.utxoId),
      owner: toB256(bytesOf(c.owner)),
      amount: toU64String(c.amount),
      assetId: toB256(bytesOf(c.assetId)),
      txPointer: pointer(c.txPointer),
      witnessIndex: toU64String(c.witnessIndex),
      predicateGasUsed: toU64String(c.predicateGasUsed),
      predicate: toHex(bytesOf(c.predicate)),
      predicateData: toHex(bytesOf(c.predicateData)),
    };
  }
  if (input.contract) {
    const c = record(input.contract);
    return {
      __typename: 'InputContract',
      utxoId: utxo(c.utxoId),
      balanceRoot: toB256(bytesOf(c.balanceRoot)),
      stateRoot: toB256(bytesOf(c.stateRoot)),
      txPointer: pointer(c.txPointer),
      contractId: toB256(bytesOf(c.contractId)),
    };
  }
  const msg =
    input.messageCoinSigned ??
    input.messageCoinPredicate ??
    input.messageDataSigned ??
    input.messageDataPredicate;
  if (msg) {
    const m = record(msg);
    return {
      __typename: 'InputMessage',
      sender: toB256(bytesOf(m.sender)),
      recipient: toB256(bytesOf(m.recipient)),
      amount: toU64String(m.amount),
      nonce: toB256(bytesOf(m.nonce)),
      witnessIndex: toU64String(m.witnessIndex),
      predicateGasUsed: toU64String(m.predicateGasUsed),
      data: toHex(bytesOf(m.data)),
      predicate: toHex(bytesOf(m.predicate)),
      predicateData: toHex(bytesOf(m.predicateData)),
    };
  }
  throw new Error(`unknown input oneof: ${Object.keys(input).join(',')}`);
}
