import { createServer } from 'http';
import { resolve } from 'path';
import chokidar from 'chokidar';
import { execa } from 'execa';

import { Server } from 'socket.io';
import { ContextDomain } from '../domains/Context';
import { TPS } from '../domains/TPS';
import app from '../server';
import { requireEnv } from '../utils/requireEnv';

const { SERVER_PORT } = requireEnv([['SERVER_PORT', '4444']]);
const { FUEL_PROVIDER } = requireEnv([
  ['FUEL_PROVIDER', 'https://testnet.fuel.network/v1/graphql'],
]);
const { WATCH = 'false' } = process.env;

const server = createServer(app);

// Set up Socket.IO on the same HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A client connected');

  const sendTPSData = async () => {
    try {
      // Create the context
      const context = await ContextDomain.createContext(FUEL_PROVIDER);

      // Instantiate the TPS domain with the context
      const tpsDomain = new TPS();
      tpsDomain.context = context; // Set the context
      tpsDomain.args = { first: 4, before: null }; // Set the args

      const tpsData = await tpsDomain.getTPS();
      console.log('TPS data:', tpsData);
      //* sending tps data
      socket.emit('tps_data', tpsData);
      //* sending block details
      socket.emit('block_details', tpsData);
    } catch (error) {
      console.error('Error sending TPS data:', error);
    }
  };

  // Emit TPS data immediately after the client connects
  sendTPSData();

  // Send TPS data every minute
  const intervalId = setInterval(sendTPSData, 60 * 1000);

  socket.on('disconnect', () => {
    clearInterval(intervalId);
    console.log('A client disconnected');
  });
});

export async function runServer() {
  return new Promise((resolve) => {
    server.listen(SERVER_PORT, async () => {
      console.log(
        `🚀 Server running at http://localhost:${SERVER_PORT}/graphql`,
      );
      resolve(null);
    });
  });
}

export async function closeServer() {
  return new Promise((resolve) => {
    server.close(() => {
      resolve(null);
      console.log('🛑 GraphQL server stopped!');
    });
  });
}

export async function runServerCodegen() {
  const cwd = resolve(__dirname, '../');
  const gqlWatcher = chokidar.watch(['src/**/*.graphql'], {
    cwd,
    ignoreInitial: true,
    ignored: ['src/schemas'],
  });

  async function codegen() {
    console.log('⌛️ Generating GraphQL code...');
    try {
      await execa('pnpm', ['codegen:app'], { stdio: 'inherit' });
      console.log('✅ GraphQL code generated!');
    } catch (_err) {
      console.log('❌ GraphQL error!');
    }

    console.log('👀 Watching for GraphQL changes...');
  }

  await runServer();
  await codegen();

  async function exitHandler() {
    await closeServer();
    gqlWatcher.close();
  }

  if (WATCH !== 'true') {
    exitHandler();
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

  return exitHandler;
}
