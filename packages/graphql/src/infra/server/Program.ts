import { setTimeout } from 'node:timers/promises';
import { Command } from 'commander';
import { env } from '~/config';
import { db } from '../database/Db';
import { QueueNames, mq } from '../queue/Queue';

type SyncOptions = {
  all: boolean;
  missing: boolean;
  from: number;
  offset: number;
  clean: boolean;
  last: number;
  watch: boolean;
};

export class Program {
  private program: Command;

  constructor() {
    this.program = new Command();
  }

  async create() {
    this.program
      .name('cli-tool')
      .description(
        'CLI tool for blockchain synchronization and database management',
      )
      .version('1.0.0');

    this.program
      .command('sync')
      .description('Sync blocks from node')
      .option('-a, --all', 'Sync all blocks', false)
      .option('-m, --missing', 'Sync missing blocks', false)
      .option('-fl, --from <number>', 'Sync blocks from a specific height')
      .option('-of, --offset <number>', 'Sync blocks with an offset')
      .option('-c, --clean', 'Clean all queues', false)
      .option('-l, --last <number>', 'Sync the last N blocks')
      .option('-w, --watch', 'Watch for new blocks and sync them', false)
      .action(async (options: SyncOptions) => {
        await this.sync(options);
      });

    this.program
      .command('migrate')
      .description('Run migrations')
      .action(async () => {
        await db.conn();
        await db.migrate();
        db.close();
      });

    this.program
      .command('clean-db')
      .description('Clean database')
      .action(async () => {
        await db.conn();
        await db.cleanFull();
        await db.migrate();
        db.close();
      });

    this.program
      .command('sql')
      .description('Execute custom SQL')
      .requiredOption('-s, --sql <string>', 'SQL to execute')
      .action(async (options) => {
        await db.conn();
        const res = (await db.execSQL(options.sql)) as any;
        console.log(res.rows);
        db.close();
      });

    await this.program.parseAsync(process.argv);
    await setTimeout(2500);
    process.exit(0);
  }

  async sync(options: SyncOptions) {
    const { all, missing, offset, clean, from, watch, last } = options;
    await db.conn();
    await mq.connect();

    function finish() {
      db.close();
    }

    if (clean) {
      await mq.clean();
      finish();
      return;
    }

    if (missing) {
      await mq.send('main', QueueNames.SYNC_MISSING);
      finish();
      return;
    }

    if (last) {
      await mq.send('main', QueueNames.SYNC_LAST, { watch, last });
      finish();
      return;
    }

    if (all || from) {
      await mq.send('main', QueueNames.SYNC_BLOCKS, {
        watch,
        cursor: from ?? 0,
        offset: offset ?? Number(env.get('SYNC_OFFSET')),
      });
      finish();
      return;
    }
  }
}
