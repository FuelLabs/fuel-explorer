import IndexAssetsRate from './application/uc/IndexAsset/IndexAssetsRate';
import { logger } from './core/Logger';
import Timer from './infra/timer/Timer';

async function main() {
  logger.debug('Timer', 'Starting timer services');
  const indexAssetsRate = new IndexAssetsRate();
  Timer.register(300000, indexAssetsRate.execute);
}

main().catch(async (error: any) => {
  logger.error('Syncer', 'Uncaught error', error);
  logger.error('Timer', 'Process exit');
  process.exit(1);
});
