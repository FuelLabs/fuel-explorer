import yargs from 'yargs/yargs';
import { db } from '~/db';
import { QueueNames, queue } from '~/queue';

type Arguments = {
  all: boolean;
  missing: boolean;
  from: number | null;
  clean: boolean;
  last: number | null;
  offset: number;
  recursive: boolean;
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
            .option('offset', {
              alias: 'o',
              type: 'number',
              default: 10,
              describe: 'Number of blocks to sync',
            })
            .option('recursive', {
              alias: 'r',
              type: 'boolean',
              default: true,
              describe:
                'Keep syncing blocks until the end of the chain is reached',
            });
        },
        handler: async (argv) => {
          await this.sync(argv);
        },
      })
      .help('help')
      .parse();
  }

  async sync(argv: Arguments) {
    const { all, missing, recursive, clean, from, offset, last } = argv;

    await db.connect();
    await queue.start();

    async function finish() {
      await queue.stop();
      await db.close();
    }

    if (clean) {
      await queue.deleteAllQueues();
      await finish();
      return;
    }
    if (missing) {
      await queue.push(QueueNames.SYNC_MISSING, undefined);
      await finish();
      return;
    }
    if (last) {
      await queue.push(QueueNames.SYNC_LAST, { last });
      await finish();
      return;
    }
    if (from) {
      await queue.push(QueueNames.SYNC_NODES, {
        after: from,
        first: offset,
        checkNext: recursive,
      });
      await finish();
      return;
    }
    if (all) {
      await queue.push(QueueNames.SYNC_NODES, { first: offset });
      await finish();
      return;
    }
  }
}
