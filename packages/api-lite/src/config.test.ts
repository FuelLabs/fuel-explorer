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

  it('leaves cosmosRestUrl and cosmosStartHeight undefined by default', () => {
    const c = loadConfig(base);
    expect(c.cosmosRestUrl).toBeUndefined();
    expect(c.cosmosStartHeight).toBeUndefined();
  });

  it('parses COSMOS_REST_URL and COSMOS_START_HEIGHT when given', () => {
    const c = loadConfig({
      ...base,
      COSMOS_REST_URL: 'https://rest.seq.testnet.fuel.network',
      COSMOS_START_HEIGHT: '123456',
    });
    expect(c.cosmosRestUrl).toBe('https://rest.seq.testnet.fuel.network');
    expect(c.cosmosStartHeight).toBe(123456);
  });

  it('leaves ethRpcUrl and l1StartBlock undefined by default, L1 poller disabled', () => {
    const c = loadConfig(base);
    expect(c.ethRpcUrl).toBeUndefined();
    expect(c.l1StartBlock).toBeUndefined();
  });

  it('parses ETH_RPC_URL and L1_START_BLOCK when given', () => {
    const c = loadConfig({
      ...base,
      ETH_RPC_URL: 'https://eth-mainnet.g.alchemy.com/v2/key',
      L1_START_BLOCK: '21000000',
    });
    expect(c.ethRpcUrl).toBe('https://eth-mainnet.g.alchemy.com/v2/key');
    expect(c.l1StartBlock).toBe(21000000);
  });

  it('derives fuelChain=mainnet from a FUEL_PROVIDER host without "testnet"', () => {
    const c = loadConfig(base);
    expect(c.fuelChain).toBe('mainnet');
  });

  it('derives fuelChain=testnet from a FUEL_PROVIDER host containing "testnet"', () => {
    const c = loadConfig({
      ...base,
      FUEL_PROVIDER: 'https://testnet.fuel.network/v1/graphql',
    });
    expect(c.fuelChain).toBe('testnet');
  });

  it('FUEL_CHAIN overrides the host-derived default', () => {
    const c = loadConfig({ ...base, FUEL_CHAIN: 'testnet' });
    expect(c.fuelChain).toBe('testnet');
  });

  it('throws for an unknown FUEL_CHAIN', () => {
    expect(() => loadConfig({ ...base, FUEL_CHAIN: 'other' })).toThrow();
  });

  it('treats empty-string optional env vars as unset', () => {
    const c = loadConfig({
      ...base,
      ETH_RPC_URL: '',
      COSMOS_START_HEIGHT: '',
    });
    expect(c.ethRpcUrl).toBeUndefined();
    expect(c.cosmosStartHeight).toBeUndefined();
  });
});
