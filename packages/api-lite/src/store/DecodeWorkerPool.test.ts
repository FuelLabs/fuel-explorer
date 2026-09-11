import { gunzipSync, gzipSync } from 'node:zlib';
import { sampleBlockBytes, sampleFee } from '../../test/helpers/sampleBlock';
import { DecodeWorkerPool } from './DecodeWorkerPool';

const ctx = { chainId: 9889, fee: sampleFee };

// A copy that owns its whole ArrayBuffer, so the pool can transfer it instead
// of copying a view that shares Buffer's slab.
const owned = (bytes: Uint8Array) => new Uint8Array(bytes);

describe('DecodeWorkerPool', () => {
  const pools: DecodeWorkerPool[] = [];
  const make = (size: number) => {
    const p = new DecodeWorkerPool({ size, ...ctx });
    pools.push(p);
    return p;
  };
  afterEach(async () => {
    await Promise.all(pools.splice(0).map((p) => p.close()));
  });

  it('decodes a block in a worker and hands back the block, its JSON and the gzipped JSON', async () => {
    const pool = make(1);
    const bytes = owned(sampleBlockBytes(500));
    const { block, json, gz } = await pool.decode(500, bytes);
    expect(block.height).toBe('500');
    expect(block.transactions).toHaveLength(2);
    expect(JSON.parse(json)).toEqual(block);
    expect(JSON.parse(gunzipSync(gz).toString('utf8'))).toEqual(block);
    // The bytes were transferred to the worker, not copied.
    expect(bytes.byteLength).toBe(0);
  });

  it('gunzips a disk-cache entry in a worker', async () => {
    const pool = make(1);
    const { json } = await pool.decode(7, sampleBlockBytes(7));
    const { block } = await pool.gunzip(7, gzipSync(json));
    expect(block.height).toBe('7');
  });

  it('rejects with the height when the worker cannot decode the bytes', async () => {
    const pool = make(1);
    await expect(pool.decode(77, new Uint8Array([1, 2, 3]))).rejects.toThrow(
      /block 77/,
    );
    // The worker is still usable after a decode error.
    expect((await pool.decode(78, sampleBlockBytes(78))).block.height).toBe(
      '78',
    );
  });

  it('spreads work across workers', async () => {
    const pool = make(2);
    const heights = [1, 2, 3, 4];
    const pending = heights.map((h) => pool.decode(h, sampleBlockBytes(h)));
    // Dispatch is synchronous, so both workers hold a task before any reply.
    expect((pool as any).busy.size).toBe(2);
    expect((pool as any).idle).toHaveLength(0);
    const out = await Promise.all(pending);
    expect(out.map((d) => d.block.height)).toEqual(['1', '2', '3', '4']);
    expect((pool as any).idle).toHaveLength(2);
  });

  it('rejects the in-flight load with its height when the worker dies, then keeps serving', async () => {
    const pool = make(1);
    const pending = pool.decode(9, sampleBlockBytes(9));
    await (pool as any).workers[0].terminate();
    await expect(pending).rejects.toThrow(/block 9/);
    expect((await pool.decode(10, sampleBlockBytes(10))).block.height).toBe(
      '10',
    );
  });

  it('close() fails queued work and stops every worker', async () => {
    const pool = make(1);
    const queued = [1, 2, 3].map((h) =>
      pool.decode(h, sampleBlockBytes(h)).catch((e: Error) => e),
    );
    await pool.close();
    for (const e of await Promise.all(queued)) expect(e).toBeInstanceOf(Error);
    expect((pool as any).workers).toHaveLength(0);
    await expect(pool.decode(4, sampleBlockBytes(4))).rejects.toThrow(/closed/);
  });
});
