import { setTimeout } from 'node:timers/promises';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

const connection = DatabaseConnection.getInstance();

(async () => {
  let index = 0;
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
    for (const receipt of transaction.data.status.receipts) {
      if (
        receipt.receiptType === 'TRANSFER_OUT' &&
        receipt.assetId &&
        receipt.id
      ) {
        await connection.query(
          'insert into indexer.assets_contracts (asset_id, contract_id) values ($1, $2) on conflict do nothing',
          [receipt.assetId, receipt.id],
        );
      }
    }
  }
}
