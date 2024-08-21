import { setTimeout } from 'node:timers/promises';
import { Command } from 'commander';
import { mq } from '../queue/Queue';

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

    await this.program.parseAsync(process.argv);
    await setTimeout(2500);
    process.exit(0);
  }

  async sync(options: SyncOptions) {
    const { clean } = options;
    await mq.connect();

    if (clean) {
      await mq.clean();
      return;
    }
  }
}
