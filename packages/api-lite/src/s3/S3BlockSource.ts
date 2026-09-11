import { gunzipSync } from 'node:zlib';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { s3KeyForBlock } from './key';

export type ObjectFetcher = (key: string) => Promise<Uint8Array | null>;

// Matches the RPC client's own abort, so both block sources give up on an
// unreachable server on the same schedule.
const S3_FETCH_TIMEOUT_MS = 15_000;

// Caps gunzipSync's output so a crafted (or corrupt) gzip object -- small on
// the wire, huge once inflated -- cannot exhaust the 768 MB heap. BlockStore
// applies the same limit to its disk cache reads.
export const MAX_BLOCK_BYTES = 64 * 1024 * 1024;

export class BlockNotFound extends Error {
  constructor(public readonly height: number) {
    super(`block ${height} not in S3`);
    this.name = 'BlockNotFound';
  }
}

function isNoSuchKey(error: unknown): boolean {
  const e = error as {
    name?: string;
    Code?: string;
    $metadata?: { httpStatusCode?: number };
  };
  return (
    e?.name === 'NoSuchKey' ||
    e?.name === 'NotFound' ||
    e?.Code === 'NoSuchKey' ||
    e?.$metadata?.httpStatusCode === 404
  );
}

export function createS3Fetcher(opts: {
  bucket?: string;
  region?: string;
  endpoint?: string;
}): ObjectFetcher {
  // An endpoint with no bucket means the URL already addresses one bucket and
  // serves keys at its root, as Cloudflare R2's public r2.dev host does. The
  // SDK cannot express that: path-style addressing inserts the bucket again
  // (`<endpoint>/<bucket>/<key>`, a 404 here), and virtual-host style would
  // prefix a bucket onto a host that already is the bucket. Those reads are
  // anonymous, so a plain fetch is both correct and credential-free.
  if (opts.endpoint && !opts.bucket) {
    const base = opts.endpoint.replace(/\/+$/, '');
    return async (key) => {
      const res = await fetch(`${base}/${key}`, {
        // Bound the read. BlockStore abandons a load it has waited too long
        // for, but it cannot cancel the fetch underneath, so an unbounded one
        // would keep running while the retry starts another -- one per retry,
        // until the connection pool is gone. The authenticated path gets the
        // same protection from the RPC client's own abort.
        signal: AbortSignal.timeout(S3_FETCH_TIMEOUT_MS),
      });
      if (res.status === 404) return null;
      if (!res.ok) {
        throw new Error(
          `S3 GET ${key} failed: ${res.status} ${res.statusText}`,
        );
      }
      return new Uint8Array(await res.arrayBuffer());
    };
  }
  const client = new S3Client({
    region: opts.region,
    ...(opts.endpoint ? { endpoint: opts.endpoint, forcePathStyle: true } : {}),
  });
  return async (key) => {
    try {
      const out = await client.send(
        new GetObjectCommand({ Bucket: opts.bucket, Key: key }),
      );
      const body = await out.Body?.transformToByteArray();
      if (!body) throw new Error(`empty body for ${key}`);
      return body;
    } catch (error) {
      if (isNoSuchKey(error)) return null;
      throw error;
    }
  };
}

export class S3BlockSource {
  constructor(private readonly fetcher: ObjectFetcher) {}

  async fetchRaw(height: number): Promise<Uint8Array> {
    const key = s3KeyForBlock(height);
    const bytes = await this.fetcher(key);
    if (bytes === null) throw new BlockNotFound(height);
    if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
      try {
        return gunzipSync(bytes, { maxOutputLength: MAX_BLOCK_BYTES });
      } catch (error) {
        // A too-large block is a real error, not a miss -- it must not be
        // (and must not be mistaken for) BlockNotFound, which would make the
        // indexer silently skip the height.
        if ((error as { code?: string })?.code === 'ERR_BUFFER_TOO_LARGE') {
          throw new Error(
            `block ${height} inflates past the ${MAX_BLOCK_BYTES} byte limit`,
          );
        }
        throw error;
      }
    }
    return bytes;
  }
}
