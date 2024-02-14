import yargs from 'yargs/yargs';
import { BlockRepository } from '../repositories/BlockRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { db } from './Database';
import { Sync } from './Sync';

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
    const blockRepository = new BlockRepository();
    const transactionRepository = new TransactionRepository();
    const sync = new Sync(blockRepository, transactionRepository);

    if (argv.all) {
      console.log('Syncing all blocks');
      await sync.syncAllBlocks();
    }
    if (argv.missing) {
      console.log('Syncing missing blocks');
      await sync.syncMissingBlocks();
    }

    await db.close();
  }
}
