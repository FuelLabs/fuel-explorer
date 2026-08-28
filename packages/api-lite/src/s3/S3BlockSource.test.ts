import { gzipSync } from 'node:zlib';
import { BlockNotFound, S3BlockSource } from './S3BlockSource';

describe('S3BlockSource', () => {
  it('gunzips gzip objects', async () => {
    const plain = new Uint8Array([1, 2, 3]);
    const src = new S3BlockSource(async () => gzipSync(plain));
    expect(Buffer.from(await src.fetchRaw(5))).toEqual(Buffer.from(plain));
  });

  it('passes through plain objects', async () => {
    const plain = new Uint8Array([9, 9]);
    const src = new S3BlockSource(async () => plain);
    expect(await src.fetchRaw(5)).toEqual(plain);
  });

  it('asks for the right key', async () => {
    const keys: string[] = [];
    const src = new S3BlockSource(async (k) => {
      keys.push(k);
      return new Uint8Array([0]);
    });
    await src.fetchRaw(59300000);
    expect(keys).toEqual(['03/88/d8/a0']);
  });

  it('throws BlockNotFound on null', async () => {
    const src = new S3BlockSource(async () => null);
    await expect(src.fetchRaw(7)).rejects.toBeInstanceOf(BlockNotFound);
  });
});
