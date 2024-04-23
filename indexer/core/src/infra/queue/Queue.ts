import PgBoss, { type Job } from 'pg-boss';

export type QueueData<T = unknown> = Job<T>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Queue<QueueInputs extends Record<any, unknown>> extends PgBoss {
  workers: PgBoss.Worker[] = [];

  static defaultJobOptions: PgBoss.RetryOptions = {
    retryLimit: 100,
    retryDelay: 1,
    retryBackoff: false,
  };

  push<Q extends keyof QueueInputs>(
    queue: Q,
    data: QueueInputs[Q],
    options?: PgBoss.JobOptions,
  ) {
    console.log(`Pushing job to queue ${String(queue)}`);
    return this.send(String(queue), data as object, {
      ...Queue.defaultJobOptions,
      ...options,
    });
  }

  pushBatch<Q extends keyof QueueInputs>(
    queue: Q,
    data: Array<PgBoss.JobInsert<object>>,
  ) {
    const jobs = data.map((job) => ({
      name: String(queue),
      data: job,
      ...Queue.defaultJobOptions,
    }));
    return this.insert(jobs);
  }

  async setupWorkers() {
    await this.start();
    console.log('⚡️ Queue running');
  }
}
