import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { FeeParams } from './fee';
import { decodeProtoBlock } from './proto';
import { type BlockRef, decodeTransaction } from './transaction';
import {
  ZERO_B256,
  bytesOf,
  record,
  toB256,
  toNumber,
  toU64String,
} from './values';

export class BlockIdMissing extends Error {
  constructor(public readonly height: number) {
    super(`block ${height} has no blockId in its header`);
    this.name = 'BlockIdMissing';
  }
}

export function decodeBlock(
  bytes: Uint8Array,
  ctx: { chainId: number; fee: FeeParams; baseAssetId?: string },
): GQLBlock {
  const proto = decodeProtoBlock(bytes);
  if (proto.v1 == null)
    throw new Error(`unsupported Block oneof: ${Object.keys(proto).join(',')}`);
  const v1 = record(proto.v1);
  const headerMsg = record(v1.header, 'Header');
  const isV2 = headerMsg.v2 != null;
  const h = record(headerMsg.v2 ?? headerMsg.v1, 'header');
  const height = toNumber(h.height);
  const blockIdBytes = bytesOf(h.blockId);
  if (!blockIdBytes || blockIdBytes.length === 0)
    throw new BlockIdMissing(height);
  const id = toB256(blockIdBytes);
  const time = toU64String(h.time);

  const header = {
    __typename: 'Header',
    id,
    height: String(height),
    daHeight: toU64String(h.daHeight),
    time,
    transactionsCount: toU64String(h.transactionsCount),
    messageReceiptCount: toU64String(h.messageReceiptCount),
    consensusParametersVersion: toU64String(h.consensusParametersVersion),
    stateTransitionBytecodeVersion: toU64String(
      h.stateTransitionBytecodeVersion,
    ),
    transactionsRoot: toB256(bytesOf(h.transactionsRoot)),
    messageOutboxRoot: toB256(bytesOf(h.messageOutboxRoot)),
    eventInboxRoot: toB256(bytesOf(h.eventInboxRoot)),
    prevRoot: toB256(bytesOf(h.prevRoot)),
    applicationHash: toB256(bytesOf(h.applicationHash)),
    version: isV2 ? 'V2' : 'V1',
  };
  const ref: BlockRef = {
    id,
    height,
    time,
    daHeight: header.daHeight,
    applicationHash: header.applicationHash,
    messageReceiptCount: header.messageReceiptCount,
  };

  const protoTxs = Array.isArray(v1.transactions) ? v1.transactions : [];
  const groups = Array.isArray(v1.receipts) ? v1.receipts : [];

  const mint = protoTxs.map((t) => record(t)).find((t) => t.mint != null);
  const gasPrice = mint ? toU64String(record(mint.mint).gasPrice) : '0';

  const transactions = protoTxs.map((t, i) =>
    decodeTransaction(t, groups[i], {
      chainId: ctx.chainId,
      block: ref,
      baseAssetId: ctx.baseAssetId ?? ZERO_B256,
      gasPrice,
      fee: ctx.fee,
    }),
  );

  return {
    __typename: 'Block',
    id,
    height: String(height),
    version: isV2 ? 'V2' : 'V1',
    header,
    consensus: { __typename: 'PoAConsensus', signature: null },
    transactions,
  } as unknown as GQLBlock;
}
