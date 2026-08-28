import { gunzipSync } from 'node:zlib';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { s3KeyForBlock } from './key';

export type ObjectFetcher = (key: string) => Promise<Uint8Array | null>;

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
  bucket: string;
  region: string;
  endpoint?: string;
}): ObjectFetcher {
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
      return gunzipSync(bytes);
    }
    return bytes;
  }
}
