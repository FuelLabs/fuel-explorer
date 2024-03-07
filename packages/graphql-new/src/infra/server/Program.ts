import yargs from 'yargs/yargs';
import { db } from '../database/Db';
import { inngest } from '../inngest/InngestClient';

const PER_PAGE = 10;

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
            })
            .option('missing', {
              alias: 'm',
              type: 'boolean',
              default: false,
            })
            .option('from', {
              alias: 'fl',
              type: 'number',
              default: 1,
            });
        },
        handler: async (argv) => {
          await this.sync(argv);
        },
      })
      .command({
        command: 'migrate',
        describe: 'Run migrations',
        handler: async () => {
          await db.connect();
          await db.migrate();
          await db.close();
        },
      })
      .help('help')
      .parse();
  }

  async sync(argv: { all: boolean; missing: boolean; from: number }) {
    await db.connect();

    if (argv.missing) {
      await inngest.syncMissing();
    }
    if (argv.all) {
      await inngest.syncBlocks({
        page: 1,
        perPage: PER_PAGE,
      });
    }
    if (!argv.all && argv.from) {
      const page = Math.ceil(argv.from / PER_PAGE);
      await inngest.syncBlocks({
        page,
        perPage: PER_PAGE,
      });
    }

    await db.close();
  }
}
