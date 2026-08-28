import { loadConfig } from './config';

const base = {
  S3_BUCKET: 'fuel-blocks-mainnet-ap-northeast-1',
  AWS_REGION: 'ap-northeast-1',
  FUEL_PROVIDER: 'https://mainnet.fuel.network/v1/graphql',
};

describe('loadConfig', () => {
  it('applies defaults', () => {
    const c = loadConfig(base);
    expect(c.port).toBe(3000);
    expect(c.dataDir).toBe('/data');
    expect(c.diskCacheBytes).toBe(5 * 1024 ** 3);
    expect(c.memoryCacheBytes).toBe(128 * 1024 ** 2);
    expect(c.indexRetentionDays).toBe(3);
    expect(c.indexMaxBytes).toBe(15_000_000_000);
    expect(c.tipPollMs).toBe(5000);
    expect(c.backfillBatch).toBe(20);
    expect(c.s3Concurrency).toBe(8);
  });

  it('throws when S3_BUCKET is missing', () => {
    expect(() => loadConfig({ ...base, S3_BUCKET: undefined })).toThrow(
      /S3_BUCKET/,
    );
  });

  it('parses numbers', () => {
    const c = loadConfig({ ...base, PORT: '4001', INDEX_RETENTION_DAYS: '7' });
    expect(c.port).toBe(4001);
    expect(c.indexRetentionDays).toBe(7);
  });

  it('defaults blockSource to s3 and rpcMaxBlocksPerSecond to 5', () => {
    const c = loadConfig(base);
    expect(c.blockSource).toBe('s3');
    expect(c.rpcMaxBlocksPerSecond).toBe(5);
  });

  it('succeeds with BLOCK_SOURCE=rpc and no S3 vars', () => {
    const c = loadConfig({
      BLOCK_SOURCE: 'rpc',
      FUEL_PROVIDER: base.FUEL_PROVIDER,
    });
    expect(c.blockSource).toBe('rpc');
    expect(c.s3Bucket).toBeUndefined();
    expect(c.awsRegion).toBeUndefined();
  });

  it('still requires S3_BUCKET and AWS_REGION when BLOCK_SOURCE=s3', () => {
    expect(() =>
      loadConfig({ BLOCK_SOURCE: 's3', FUEL_PROVIDER: base.FUEL_PROVIDER }),
    ).toThrow(/S3_BUCKET/);
  });

  it('throws for an unknown BLOCK_SOURCE', () => {
    expect(() => loadConfig({ ...base, BLOCK_SOURCE: 'other' })).toThrow();
  });
});
