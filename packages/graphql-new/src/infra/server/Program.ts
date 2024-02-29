import yargs from 'yargs/yargs';
import { db } from '../database/Db';
import { inngest } from '../inngest/InngestClient';

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

  async sync(argv: { all: boolean; missing: boolean }) {
    await db.connect();

    if (argv.all) {
      await inngest.syncBlocks();
    }
    if (argv.missing) {
      await inngest.syncMissing();
    }

    await db.close();
  }
}
