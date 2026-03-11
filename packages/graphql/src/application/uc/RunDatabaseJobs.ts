import { setTimeout } from 'node:timers/promises';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

const POLL_INTERVAL_MS = 5000;
const DEFAULT_STATEMENT_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const LOCK_TIMEOUT_MS = 10 * 1000; // 10 seconds — fail fast if lock contention

export default class RunDatabaseJobs {
  async execute() {
    const connection = DatabaseConnection.getInstance();
    while (true) {
      logger.debug('Database Jobs', 'Fetching jobs');
      await setTimeout(POLL_INTERVAL_MS);
      const jobs = await connection.query(
        'select * from indexer.database_jobs where status = $1',
        ['pending'],
      );
      if (jobs.length === 0) continue;
      for (const job of jobs) {
        if (job.last_run) {
          const now = new Date();
          const diff = (now.getTime() - job.last_run.getTime()) / 1000;
          if (diff < job.interval_seconds) continue;
        }
        logger.debug('Database Jobs', 'Running query', job.query);
        const startTime = performance.now();
        let status = 'done';
        let errorMessage = '';
        try {
          await connection.queryWithTimeout(
            job.query,
            [],
            DEFAULT_STATEMENT_TIMEOUT_MS,
            LOCK_TIMEOUT_MS,
          );
          if (job.recurrent) {
            status = 'pending';
          }
          const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
          logger.debug('Database Jobs', `Completed in ${elapsed}s`, job.query);
        } catch (e: any) {
          errorMessage = e.message;
          status = job.recurrent ? 'pending' : 'error';
          const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
          logger.debug(
            'Database Jobs',
            `Failed after ${elapsed}s: ${errorMessage}`,
            job.query,
          );
        }
        await connection.query(
          'update indexer.database_jobs set status = $1, last_run = now(), error_message = $2 where _id = $3',
          [status, errorMessage, job._id],
        );
      }
    }
  }
}
