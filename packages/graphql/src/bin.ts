import chokidar from 'chokidar';
import { execa } from 'execa';
import { createServer } from 'http';
import { resolve } from 'path';

import app from './server';
import { requireEnv } from './utils/requireEnv';

const { SERVER_PORT } = requireEnv(['SERVER_PORT']);
const { WATCH } = requireEnv(['WATCH']);

const isWatching = WATCH === 'true';

async function codegen() {
  console.log('⌛️ Generating GraphQL code...');
  await execa('pnpm', ['codegen:fuel'], { stdio: 'inherit' });
  await execa('pnpm', ['codegen:schema'], { stdio: 'inherit' });
  await execa('pnpm', ['codegen:app'], { stdio: 'inherit' });
  console.log('✅ GraphQL code generated!');
  console.log('👀 Watching for GraphQL changes...');
  console.log(`🚀 Server running at http://localhost:${SERVER_PORT}/graphql`);
}

const server = createServer(app);
const cwd = resolve(__dirname, '../');
const gqlWatcher = chokidar.watch(['src/**/*.graphql'], {
  cwd,
  ignoreInitial: true,
  ignored: ['src/schemas'],
});

async function runServer() {
  return new Promise((resolve) => {
    server.listen(SERVER_PORT, async () => {
      resolve(null);
    });
  });
}

async function closeServer() {
  return new Promise((resolve) => {
    server.close(() => {
      resolve(null);
      console.log('🛑 GraphQL server stopped!');
    });
  });
}

export async function exec() {
  await runServer();
  await codegen();

  async function exitHandler() {
    await closeServer();
    gqlWatcher.close();
  }

  if (!isWatching) {
    await exitHandler();
    return;
  }

  process.on('exit', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGINT', exitHandler);
  process.on('SIGUSR1', exitHandler);

  gqlWatcher.on('all', async () => {
    await closeServer();
    await runServer();
    await codegen();
  });
}

exec();
