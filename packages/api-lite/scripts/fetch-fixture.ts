import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { config as dotenv } from 'dotenv';
import { FuelCoreClient } from '../src/fuelcore/FuelCoreClient';
import { S3BlockSource, createS3Fetcher } from '../src/s3/S3BlockSource';

dotenv({ path: join(__dirname, '../../../docker/vps/.env') });

async function main() {
  const height = Number(process.argv[2]);
  if (!Number.isInteger(height))
    throw new Error('usage: fetch-fixture <height>');

  const bucket = process.env.S3_BUCKET ?? 'fuel-blocks-mainnet-ap-northeast-1';
  const region = process.env.AWS_REGION ?? 'ap-northeast-1';
  const provider =
    process.env.FUEL_PROVIDER ?? 'https://mainnet.fuel.network/v1/graphql';
  const outDir = join(__dirname, '../test/fixtures/blocks');
  mkdirSync(outDir, { recursive: true });

  // Use S3BlockSource.fetchRaw (not the bare fetcher) so the fixture bytes are
  // decompressed exactly like the production pipeline (main.ts) does before
  // handing bytes to decodeBlock. decodeBlock has no gunzip step of its own.
  const source = new S3BlockSource(createS3Fetcher({ bucket, region }));
  const bytes = await source.fetchRaw(height);
  writeFileSync(join(outDir, `${height}.bin`), bytes);

  const blocksDoc = readFileSync(
    join(
      __dirname,
      '../../graphql/src/graphql/queries/provider/blocks.graphql',
    ),
    'utf8',
  );
  const fragment = blocksDoc.slice(0, blocksDoc.indexOf('query '));
  const client = new FuelCoreClient(provider);
  const data = await client.query<{ block: unknown }>(
    `${fragment}\nquery($h: U32!) { block(height: $h) { ...BlockItems } }`,
    { h: String(height) },
  );
  writeFileSync(
    join(outDir, `${height}.fuelcore.json`),
    `${JSON.stringify(data.block, null, 2)}\n`,
  );
  console.log(
    `wrote ${height}.bin (${bytes.length} bytes) and ${height}.fuelcore.json`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
