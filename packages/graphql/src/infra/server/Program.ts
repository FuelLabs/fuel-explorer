import { sql } from 'drizzle-orm';
import yargs from 'yargs/yargs';
import { db } from '../database/Db';
import { QueueNames, queue } from '../queue/Queue';

type Arguments = {
  all: boolean;
  missing: boolean;
  from: number | null;
  clean: boolean;
  last: number | null;
  watch: boolean;
};

export class Program {
  async create() {
    yargs(process.argv.slice(2))
      .command({
        command: 'sync',
        describe: 'Sync blocks from node',
        builder: (yargs) => {
          return yargs
            .option('all', {
              alias: 'a',
              type: 'boolean',
              default: false,
              describe: 'Sync all blocks',
            })
            .option('missing', {
              alias: 'm',
              type: 'boolean',
              default: false,
              describe: 'Sync missing blocks',
            })
            .option('from', {
              alias: 'fl',
              type: 'number',
              default: null,
              describe: 'Sync blocks from a specific height',
            })
            .option('clean', {
              alias: 'c',
              type: 'boolean',
              default: false,
              describe: 'Clean all queues',
            })
            .option('last', {
              alias: 'l',
              type: 'number',
              default: null,
              describe: 'Sync the last N blocks',
            })
            .option('watch', {
              alias: 'w',
              type: 'boolean',
              default: false,
              describe: 'Watch for new blocks and sync them',
            });
        },
        handler: async (argv) => {
          await this.sync(argv);
          process.exit(0);
        },
      })
      .command({
        command: 'migrate',
        describe: 'Run migrations',
        handler: async () => {
          await db.connect();
          await db.migrate();
          await db.close();
          process.exit(0);
        },
      })
      .command({
        command: 'clean-db',
        describe: 'Clean database',
        handler: async () => {
          await db.connect();
          await db.clean();
          await db.close();
          process.exit(0);
        },
      })

      .help('help')
      .parse();
  }

  async sync(argv: Arguments) {
    const { all, missing, clean, from, watch, last } = argv;

    await db.connect();
    await queue.start();

    async function finish() {
      await queue.stop();
      await db.close();
    }

    if (clean) {
      const query = sql`
        DROP SCHEMA pgboss CASCADE;
        CREATE SCHEMA pgboss;
      `;
      await db.connection().execute(query);
      await finish();
      return;
    }
    if (missing) {
      await queue.push(QueueNames.SYNC_MISSING);
      await finish();
      return;
    }
    if (last) {
      await queue.push(QueueNames.SYNC_LAST, { watch, last });
      await finish();
      return;
    }
    if (all || from) {
      await queue.push(QueueNames.SYNC_BLOCKS, { watch, cursor: from ?? 0 });
      await finish();
      return;
    }
  }
}
