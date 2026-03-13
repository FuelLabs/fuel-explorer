import { setTimeout } from 'node:timers/promises';
import NewAddBlockRange from './application/uc/NewAddBlockRange';
import { logger } from './core/Logger';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

async function main() {
  const addBlockRange = new NewAddBlockRange();
  const databaseConnection = DatabaseConnection.getInstance();
  const from = 1;
  const to = 12875752;
  const rows = (await databaseConnection.query(
    `select seq from generate_series(${from}, ${to}) as seq left join indexer.blocks b on (b._id = seq) where b._id is null`,
    [],
  )) as any;
  if (rows.length === 0) {
    logger.debug('Recover', `No blocks to recover between #${from} and #${to}`);
  } else {
    logger.debug(
      'Recover',
      `Recovering ${rows.length} blocks between #${from} and #${to}`,
    );
  }
  let i = 0;
  for (const row of rows) {
    try {
      await addBlockRange.execute({ from: row.seq, to: row.seq });
      console.log(`Recovering block #${row.seq} ${i++}`);
    } catch (err: any) {
      console.error(`Failed to recover block #${row.seq}: ${err.message}`);
    }
    await setTimeout(100);
  }
}

main();
