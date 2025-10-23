import IndexBalance from './application/uc/IndexBalance';
import { logger } from './core/Logger';
import Timer from './infra/timer/Timer';

async function main() {
  logger.debug('Balance', 'Starting balance services');
  const indexBalance = new IndexBalance();
  Timer.register(1000, indexBalance.execute);
}

main().catch(async (error: any) => {
  logger.error('Balance', 'Uncaught error', error);
  logger.error('Balance', 'Process exit');
  process.exit(1);
});
