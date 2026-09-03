import * as protobuf from 'protobufjs';
import apiJson from '../generated/api.json';

export const root = protobuf.Root.fromJSON(apiJson as protobuf.INamespace);
export const BlockType = root.lookupType('blockaggregator.Block');

export type ProtoBlock = Record<string, unknown>;

export function decodeProtoBlock(bytes: Uint8Array): ProtoBlock {
  return BlockType.toObject(BlockType.decode(bytes), {
    defaults: false,
    longs: String,
    bytes: Buffer,
    oneofs: false,
  }) as ProtoBlock;
}
