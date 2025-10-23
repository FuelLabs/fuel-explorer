import RunDatabaseJobs from './application/uc/RunDatabaseJobs';
import { logger } from './core/Logger';

async function main() {
  logger.debug('DE', 'Starting database executor service');
  const runDatabaseJobs = new RunDatabaseJobs();
  await runDatabaseJobs.execute();
}

main().catch(async (error: any) => {
  logger.error('DE', 'Uncaught error', error);
  logger.error('DE', 'Process exit');
  process.exit(1);
});
