import IndexCosmos from './application/uc/IndexCosmos';
import { logger } from './core/Logger';

async function main() {
  logger.debug('Cosmos', 'Starting cosmos services');
  const indexCosmos = new IndexCosmos();
  await indexCosmos.execute();
}

main().catch(async (error: any) => {
  logger.error('Cosmos', 'Uncaught error', error);
  logger.error('Cosmos', 'Process exit');
  process.exit(1);
});
