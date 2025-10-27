import IndexL1 from './application/uc/IndexL1/IndexL1';
import { logger } from './core/Logger';

async function main() {
  logger.debug('L1', 'Starting l1 indexing service');
  const indexL1 = new IndexL1();
  await indexL1.execute();
}

main().catch(async (error: any) => {
  logger.error('L1', 'Uncaught error', error);
  logger.error('L1', 'Process exit');
  process.exit(1);
});
