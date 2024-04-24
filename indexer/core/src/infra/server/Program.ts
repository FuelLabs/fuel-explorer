import { db } from '@core/db';
import yargs from 'yargs/yargs';

export class Program {
  async create() {
    yargs(process.argv.slice(2))
      .command({
        command: 'migrate',
        describe: 'Run migrations',
        handler: async () => {
          console.log('Running migrations...');
          await db.connect();
          await db.migrate();
          await db.close();
        },
      })
      .help('help')
      .parse();
  }
}
