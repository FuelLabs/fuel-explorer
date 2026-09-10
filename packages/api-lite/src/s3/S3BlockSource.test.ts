import { gzipSync } from 'node:zlib';
import { BlockNotFound, S3BlockSource, createS3Fetcher } from './S3BlockSource';

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

describe('createS3Fetcher against a public bucket-root endpoint', () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  it('puts the key straight on the endpoint, with no bucket segment', async () => {
    const urls: string[] = [];
    global.fetch = (async (url: string) => {
      urls.push(String(url));
      return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
    }) as typeof fetch;

    // Trailing slash on the endpoint must not double up.
    const get = createS3Fetcher({ endpoint: 'https://pub-abc.r2.dev/' });
    const body = await get('00/00/00/01');
    expect(urls).toEqual(['https://pub-abc.r2.dev/00/00/00/01']);
    expect(Buffer.from(body ?? [])).toEqual(Buffer.from([1, 2, 3]));
  });

  it('treats a missing key as absent and any other status as an error', async () => {
    global.fetch = (async () =>
      new Response('', { status: 404 })) as typeof fetch;
    const get = createS3Fetcher({ endpoint: 'https://pub-abc.r2.dev' });
    expect(await get('00/00/00/01')).toBeNull();

    global.fetch = (async () =>
      new Response('', { status: 500 })) as typeof fetch;
    await expect(get('00/00/00/01')).rejects.toThrow('500');
  });

  // BlockStore can stop waiting on a load but cannot cancel the fetch under
  // it, so the read carries its own deadline or an unreachable server leaves
  // one request running per retry.
  it('bounds every read with an abort signal', async () => {
    let init: RequestInit | undefined;
    global.fetch = (async (_url: string, opts?: RequestInit) => {
      init = opts;
      return new Response(new Uint8Array([1]), { status: 200 });
    }) as typeof fetch;

    await createS3Fetcher({ endpoint: 'https://pub-abc.r2.dev' })(
      '00/00/00/01',
    );
    expect(init?.signal).toBeInstanceOf(AbortSignal);
  });
});
