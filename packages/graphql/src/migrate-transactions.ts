import { setTimeout } from 'node:timers/promises';
import IndexAsset from './application/uc/IndexAsset';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

const connection = DatabaseConnection.getInstance();
const indexAsset = new IndexAsset();

(async () => {
  let index = parseInt(process.argv[2]) || 0;
  const page = 10000;
  while (index < 11000000) {
    const from = index === 0 ? 0 : index + 1;
    const to = index + page;
    await migrate(from, to);
    index += page;
    await setTimeout(100);
  }
})();

async function migrate(from: number, to: number) {
  console.log('migrate', from, to);
  const transactions = await connection.query(
    'select * from indexer.transactions where block_id between $1 and $2',
    [from, to],
  );
  for (const transaction of transactions) {
    try {
      await indexAsset.execute(transaction.data);
    } catch (_e: any) {}
  }
}
