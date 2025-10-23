import { DatabaseConnection } from './infra/database/DatabaseConnection';

(async () => {
  const startHeight = Number.parseInt(process.argv[2]);
  const endHeight = Number.parseInt(process.argv[3]);
  await migrate(startHeight, endHeight);
})();

async function migrate(startHeight: number, endHeight: number) {
  console.log('migrate');
  const connection = DatabaseConnection.getInstance();
  let height = startHeight || 1;
  while (true) {
    if (height > endHeight) {
      console.log('last height reached');
      break;
    }
    await connection.query(
      'update indexer.transactions set timestamp2 = timestamp where block_id = $1',
      [height],
    );
    height++;
  }
}
