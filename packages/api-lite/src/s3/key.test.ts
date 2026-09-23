import { s3KeyForBlock } from './key';

describe('s3KeyForBlock', () => {
  it('encodes height as 4 big-endian hex bytes', () => {
    expect(s3KeyForBlock(59300000)).toBe('03/88/d8/a0');
    expect(s3KeyForBlock(0)).toBe('00/00/00/00');
    expect(s3KeyForBlock(0xffffffff)).toBe('ff/ff/ff/ff');
  });
  it('rejects non-u32', () => {
    expect(() => s3KeyForBlock(-1)).toThrow(/u32/);
    expect(() => s3KeyForBlock(1.5)).toThrow(/u32/);
    expect(() => s3KeyForBlock(0x100000000)).toThrow(/u32/);
  });
});
