import yargs from 'yargs/yargs';
import { BlockDomain } from '../domains/BlockDomain';
import { BlockRepository } from '../repositories/BlockRepository';
import { db } from './Database';
import { GraphQLSDK } from './GraphQLSDK';

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
    const { sdk } = new GraphQLSDK();
    const blockRepository = new BlockRepository(sdk);
    const blockDomain = new BlockDomain(blockRepository);

    if (argv.all) {
      console.log('Syncing all blocks');
      await blockDomain.syncAllBlocks();
    }
    if (argv.missing) {
      console.log('Syncing missing blocks');
      await blockDomain.syncMissingBlocks();
    }

    await db.close();
  }
}
