import { setTimeout } from 'node:timers/promises';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export default class RunDatabaseJobs {
  async execute() {
    const connection = DatabaseConnection.getInstance();
    while (true) {
      logger.debug('Database Jobs', 'Fetching jobs');
      await setTimeout(5000);
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
        let status = 'done';
        let errorMessage = '';
        try {
          await connection.query(job.query, []);
          if (job.recurrent) {
            status = 'pending';
          }
        } catch (e: any) {
          errorMessage = e.message;
          status = 'error';
        }
        await connection.query(
          'update indexer.database_jobs set status = $1, last_run = now(), error_message = $2 where _id = $3',
          [status, errorMessage, job._id],
        );
      }
    }
  }
}
