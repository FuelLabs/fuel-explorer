import { setTimeout } from 'node:timers/promises';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

const connection = DatabaseConnection.getInstance();

(async () => {
  let index = 0;
  const page = 10000;
  while (index < 8000000) {
    const from = index === 0 ? 0 : index + 1;
    const to = index + page;
    await migrate(from, to);
    index += page;
    await setTimeout(1000);
  }
})();

async function migrate(from: number, to: number) {
  console.log('migrate', from, to);
  const transactions = await connection.query(
    `select tx_hash, "accountIndex" from transactions where "accountIndex" <> '' and block_id between $1 and $2`,
    [from, to],
  );
  for (const transaction of transactions) {
    const accountsHash = transaction.accountIndex.split('|');
    for (const accountHash of accountsHash) {
      if (!accountHash) continue;
      await connection.query(
        'insert into transactions_accounts (tx_hash, account_hash) values ($1, $2) on conflict do nothing',
        [transaction.tx_hash, accountHash],
      );
    }
  }
}
