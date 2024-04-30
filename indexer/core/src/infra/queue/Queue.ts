import PgBoss, { type Job } from 'pg-boss';

export type QueueData<T = unknown> = Job<T>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Queue<QueueInputs extends Record<any, unknown>> extends PgBoss {
  static defaultJobOptions: PgBoss.RetryOptions = {
    retryLimit: 1,
    retryDelay: 1,
    retryBackoff: false,
  };

  workOpts = {
    teamSize: 50,
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

  setWorkOpts<T>(key: string, value: T) {
    this.workOpts = {
      ...this.workOpts,
      [key]: value,
    };
  }
}
