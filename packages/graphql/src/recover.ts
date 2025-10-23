import { setTimeout } from 'node:timers/promises';
import { logger } from './core/Logger';
import { DatabaseConnection } from './infra/database/DatabaseConnection';
import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
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
    await mq.send('block', QueueNames.ADD_BLOCK_RANGE, {
      from: row.seq,
      to: row.seq,
    });
    console.log(`Recovering block #${row.seq} ${i++}`);
    await setTimeout(100);
  }
}

main();
