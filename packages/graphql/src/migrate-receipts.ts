import IndexReceipts from './application/uc/IndexReceipt';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

(async () => {
  const startHeight = Number.parseInt(process.argv[2]);
  const endHeight = Number.parseInt(process.argv[3]);
  await migrate(startHeight, endHeight);
})();

async function migrate(startHeight: number, endHeight: number) {
  console.log('migrate');
  const indexReceipts = new IndexReceipts();
  const connection = DatabaseConnection.getInstance();
  let height = startHeight || 1;
  while (true) {
    if (height > endHeight) {
      console.log('last height reached');
      break;
    }
    const transactions = await connection.query(
      'select * from indexer.transactions where block_id = $1',
      [height],
    );
    console.log(height, transactions.length);
    if (!transactions.length) {
      console.log('No transactions found');
      break;
    }
    for (const transaction of transactions) {
      transaction.blockId = transaction.block_id;
      transaction.transactionHash = transaction.tx_hash;
      transaction.id = transaction._id;
      await indexReceipts.execute(transaction);
    }
    height++;
  }
}
