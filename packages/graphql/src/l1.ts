import IndexL1 from './application/uc/IndexL1/IndexL1';
import L1ReorgSentinel from './application/uc/IndexL1/L1ReorgSentinel';
import { logger } from './core/Logger';

async function main() {
  logger.debug('L1', 'Starting l1 indexing service');
  const indexL1 = new IndexL1();
  const sentinel = new L1ReorgSentinel();
  await Promise.all([indexL1.execute(), sentinel.execute()]);
}

main().catch(async (error: any) => {
  logger.error('L1', 'Uncaught error', error);
  logger.error('L1', 'Process exit');
  process.exit(1);
});
