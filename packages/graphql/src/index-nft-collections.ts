import { DatabaseConnection } from './infra/database/DatabaseConnection';

const connection = DatabaseConnection.getInstance();

export async function indexNftCollections(contractId: string) {
  const [collection] = await connection.query(
    'select * from indexer.collections where contract_id = $1',
    [contractId],
  );
  if (!collection) return;
  console.log(collection);
  const assets = await connection.query(
    `select * from indexer.assets_contracts where contract_id = $1 and metadata->>'name' is null`,
    [collection.contract_id],
  );
  console.log(assets.length);
  for (const asset of assets) {
    console.log(asset.asset_id);
    try {
      if (asset.metadata) {
        const url = collection.url.replace('{subId}', Number(asset.sub_id));
        console.log(url);
        const response = await fetch(url);
        const resolvedMetadata = await response.json();
        const metadata = Object.assign(asset.metadata, resolvedMetadata);
        await connection.query(
          'update indexer.assets_contracts set metadata = $1 where asset_id = $2',
          [metadata, asset.asset_id],
        );
      }
    } catch (e: any) {
      console.log(e);
    }
  }
}

(async () => {
  const collections = [
    '0x202b55f66b8bafaf3b4fdf0653f1a4320607781dbd368bb576bc09250dd7dbbe',
    '0x59b10bd361740618f12bba00f1083ef304a294b37ed7a8756c1b9cfc9b491b16',
    '0x5d0188a9f77c4e5e48c459b5d02ccedac1a26d45b9f9c9e886f8563395bad32d',
    '0xc5c219d360dcddbdaad2e0a33afc3550794ed4dfc484efb13562023189a08851',
    '0xf0b6e2320caccb9071e45b1150b4da6f5edf74e7375ac6c87084822a87832de2',
  ];
  for (const collection of collections) {
    await indexNftCollections(collection);
  }
})();
