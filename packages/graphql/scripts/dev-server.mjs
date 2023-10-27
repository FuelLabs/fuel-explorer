import chokidar from 'chokidar';
import { execa } from 'execa';
import nodemon from 'nodemon';
import { resolve } from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function codegen() {
  console.log('⌛️ Generating GraphQL code...');
  await execa('pnpm', ['codegen:fuel'], { stderr: 'inherit' });
  await execa('pnpm', ['codegen:schema'], { stderr: 'inherit' });
  await execa('pnpm', ['codegen:app'], { stderr: 'inherit' });
  console.log('✅ GraphQL Codegen!');
}

export async function devServer() {
  const gqlWatcher = chokidar.watch(['src/**/*.graphql'], {
    ignoreInitial: true,
    ignored: ['src/schemas'],
    cwd: resolve(__dirname, '../'),
  });

  const script = nodemon({
    script: resolve(__dirname, '../dist/index.js'),
    cwd: resolve(__dirname, '../'),
  });

  script.on('start', async () => {
    await codegen();
    console.log('\n🚀 Explorer api running at http://localhost:4444/graphql');
    gqlWatcher.on('all', async () => {
      await codegen();
    });
  });

  script.on('quit', () => {
    console.log('🛑 GraphQL server stopped!');
    gqlWatcher.close();
    process.exit();
  });

  process.on('SIGINT', () => {
    script.emit('quit');
  });
}
