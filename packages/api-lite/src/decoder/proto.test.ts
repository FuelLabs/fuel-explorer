import { encodeProtoBlock } from '../../test/helpers/protoBlock';
import { decodeProtoBlock } from './proto';

describe('decodeProtoBlock', () => {
  it('round-trips a minimal v1 block with a v2 header', () => {
    const bytes = encodeProtoBlock({
      v1: {
        header: {
          v2: {
            height: 42,
            time: '4611686020140000000',
            daHeight: '7',
            transactionsCount: 0,
          },
        },
        transactions: [],
        receipts: [],
      },
    });
    const block = decodeProtoBlock(bytes) as any;
    expect(block.v1.header.v2.height).toBe(42);
    expect(block.v1.header.v2.time).toBe('4611686020140000000');
    expect(block.v1.header.v2.daHeight).toBe('7');
  });
});
