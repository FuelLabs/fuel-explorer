import { createServer } from 'http';
import { resolve } from 'path';
import chokidar from 'chokidar';
import { execa } from 'execa';

import { Server } from 'socket.io';
import app from '../server';
import { requireEnv } from '../utils/requireEnv';

const { SERVER_PORT } = requireEnv([['SERVER_PORT', '4444']]);
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
  // Handle WebSocket events here
  socket.on('example_event', (data) => {
    console.log('Received example_event:', data);
    // Broadcast the event to all connected clients
    io.emit('example_event_response', data);
  });

  socket.on('disconnect', () => {
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
