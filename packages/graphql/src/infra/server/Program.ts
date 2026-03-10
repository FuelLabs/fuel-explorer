import { Command } from 'commander';

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

    await this.program.parseAsync(process.argv);
    process.exit(0);
  }
}
