import { BlockType } from '../../src/decoder/proto';

export function encodeProtoBlock(obj: object): Uint8Array {
  return BlockType.encode(BlockType.fromObject(obj)).finish();
}
