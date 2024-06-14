import c from 'chalk';
import dayjs from 'dayjs';
import { assign, createActor, fromCallback, fromPromise, setup } from 'xstate';
import { env } from '~/config';
import { client } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk';
import { worker } from '~/infra/worker/Worker';
import type { SyncBlocksProps } from './SyncBlocks';

type Input = SyncBlocksProps;

type Context = Input & {
  offset: number;
  limit: number;
  lastBlock: GQLBlock | null;
  lastResult?: EventsReturn | null;
  watch?: boolean;
};

type EventsReturn = {
  endCursor: number | undefined;
};

class Syncer {
  async getLatestBlock() {
    const { data } = await client.sdk.blocks({ last: 1 });
    return data.blocks.nodes[0] as GQLBlock;
  }

  getLastBlockHeight(ctx: Context) {
    return Number(ctx.lastBlock?.header.height ?? '0');
  }

  private getIdsRange(ctx: Context) {
    const { limit, cursor = 0 } = ctx;
    const lastHeight = this.getLastBlockHeight(ctx);
    const from = cursor;
    const to = cursor + limit;
    return { from, to: to > lastHeight ? lastHeight : to };
  }

  private createBatchEvents(ctx: Context) {
    const { offset } = ctx;
    const idsRange = this.getIdsRange(ctx);
    const lastHeight = this.getLastBlockHeight(ctx);
    const diff = idsRange.to - idsRange.from;
    const numberOfBatches = Math.ceil(diff / offset);
    const events = Array.from({ length: numberOfBatches }).map((_, page) => {
      const from = idsRange.from + page * offset;
      let to = from + offset;
      to = to > lastHeight ? lastHeight : to;
      return { from, to };
    });
    return events;
  }

  async syncBlocks(ctx: Context) {
    const { cursor = 0 } = ctx;
    const events = this.createBatchEvents(ctx);

    if (cursor > 0 && !events.length) {
      console.log(c.green('✅ All blocks are synced!'));
      return { endCursor: cursor };
    }
    worker.postMessage('ADD_BLOCK_RANGE', events);
    const last = events[events.length - 1];
    return { endCursor: last.to };
  }

  async syncMissingBlocks(ctx: Context) {
    const { cursor = 0 } = ctx;
    const lastBlock = await this.getLatestBlock();
    const to = this.getLastBlockHeight({ ...ctx, lastBlock });
    worker.postMessage('ADD_BLOCK_RANGE', [{ from: cursor, to }]);
    return { endCursor: to };
  }
}

const syncer = new Syncer();
const WATCH_INTERVAL = Number(env.get('WATCH_INTERVAL'));

const machine = setup({
  types: {} as {
    context: Context;
    events:
      | { type: 'START_SYNC' }
      | { type: 'FINISH' }
      | { type: 'KEEP_SYNCING' }
      | { type: 'WAIT' };
    input: Input;
  },
  actors: {
    getLatestBlock: fromPromise<GQLBlock>(async () => {
      const { data } = await client.sdk.blocks({ last: 1 });
      return data.blocks.nodes[0] as GQLBlock;
    }),
    syncBlocks: fromPromise<EventsReturn, Context>(
      async ({ input: context }) => {
        return syncer.syncBlocks(context);
      },
    ),
    syncMissingBlocks: fromPromise<EventsReturn, Context>(
      async ({ input: context }) => {
        return syncer.syncMissingBlocks(context);
      },
    ),
    checkQueueTasks: fromCallback(({ sendBack }) => {
      worker.postMessage('GET_ACTIVE_JOBS');
      return worker.on('ACTIVE_JOBS_RESPONSE', (jobs) => {
        if (jobs === 0) {
          sendBack({ type: 'KEEP_SYNCING' });
        } else {
          sendBack({ type: 'WAIT' });
        }
      });
    }),
  },
  guards: {
    hasMoreEvents: ({ context }) => {
      const endCursor = context.lastResult?.endCursor ?? 0;
      const lastBlockHeight = syncer.getLastBlockHeight(context);
      return Boolean(endCursor < lastBlockHeight);
    },
    needToWatch: ({ context }) => {
      return Boolean(context.watch);
    },
  },
}).createMachine({
  id: 'syncBlocks',
  initial: 'idle',
  context: ({ input }) => ({
    ...input,
    cursor: input.cursor ?? 0,
    offset: input.offset ?? Number(env.get('SYNC_OFFSET')),
    limit: Number(env.get('SYNC_LIMIT')),
    lastBlock: null,
    events: [],
  }),
  states: {
    idle: {
      on: {
        START_SYNC: {
          target: 'gettingLastBlock',
        },
      },
    },
    gettingLastBlock: {
      invoke: {
        src: 'getLatestBlock',
        onDone: {
          target: 'checkingQueue',
          actions: assign({
            lastBlock: ({ event }) => event.output,
          }),
        },
      },
    },
    checkingQueue: {
      initial: 'checking',
      states: {
        checking: {
          invoke: {
            src: 'checkQueueTasks',
          },
          on: {
            KEEP_SYNCING: {
              target: 'finishing',
            },
            WAIT: {
              target: 'waiting',
            },
          },
        },
        waiting: {
          after: {
            2000: 'checking',
          },
        },
        finishing: {
          after: {
            2000: '#syncBlocks.syncingBlocks',
          },
        },
      },
    },
    syncingBlocks: {
      invoke: {
        src: 'syncBlocks',
        input: ({ context }) => context,
        onDone: {
          target: 'checking',
          actions: assign({
            lastResult: ({ event }) => event.output,
            cursor: ({ context, event }) => {
              return event.output?.endCursor ?? context.cursor;
            },
          }),
        },
      },
    },
    checking: {
      always: [
        { target: 'checkingQueue', guard: 'hasMoreEvents' },
        { target: 'syncingMissingBlocks', guard: 'needToWatch' },
        { target: 'idle' },
      ],
    },
    syncingMissingBlocks: {
      initial: 'syncing',
      states: {
        syncing: {
          invoke: {
            src: 'syncMissingBlocks',
            input: ({ context }) => context,
            onDone: {
              target: 'resettingLastBlock',
              actions: assign({
                lastResult: ({ event }) => event.output,
                cursor: ({ context, event }) => {
                  return event.output?.endCursor ?? context.cursor;
                },
              }),
            },
          },
        },
        waiting: {
          after: {
            [WATCH_INTERVAL]: {
              target: 'syncing',
            },
          },
        },
        resettingLastBlock: {
          invoke: {
            src: 'getLatestBlock',
            onDone: {
              target: 'waiting',
              actions: assign({
                lastBlock: ({ event }) => event.output,
              }),
            },
          },
        },
      },
    },
  },
});

export default async function runSyncMachine(input: Input) {
  const actor = createActor(machine, { input });
  const start = new Date();
  actor.subscribe((state) => {
    const val = state.value;
    if (typeof val === 'string') {
      console.log(c.yellow(`📟 State: ${val}`));
      return;
    }
    const [key, value] = Object.entries(val)[0];
    const time = c.grey(`(${dayjs(start).fromNow()})`);
    console.log(c.yellow(`📟 State: ${key}.${value} ${time}`));
  });

  actor.start();
  actor.send({ type: 'START_SYNC' });
}
