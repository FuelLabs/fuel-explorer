import c from 'chalk';
import dayjs from 'dayjs';
import { assign, createActor, fromCallback, fromPromise, setup } from 'xstate';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import { client } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
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
      logger.syncer.info(c.green('✅ All blocks are synced!'));
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

  async syncLostBlocks() {
    worker.postMessage('SYNC_LOST_BLOCKS');
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
  /** @xstate-layout N4IgpgJg5mDOIC5SwJ4DsDGAhANgewwGtYA6ASwhzAGIBlAFQEEAlegfVoE0A5AYQG0ADAF1EoAA55YZAC5k8aMSAAeiACwAmAMwltARgCsBtYLVm9ANgsB2ADQgU6jRZIBOABwaNRg3teu9a1cAX2D7VExcAmISGBk5NCgAGQBDWBkoomoIBTByNAA3PEI8iOx8IlI4hOS0jIrCBDJCghS5BSFhTqVJaXbFJBVEAw17RwR3a0FdD3cLPTU9QXdBLQtQ8PRy6NIMAAswImaoAEUAVzALkn3DwmPqAGkAUSeABQ4eXgBJbgBxbsGvVk8gGoFUCAMWj0bhMzlcGmsams1jWY0QS0EBhIWlcgi8ekm2g0mg2IDKmRiNyOiXOlzyVLuiWoAHVGF96ACJFJgQolODIdDXLCLPDEcjUQ5EK4jCRNLj5lotBo8RZ3KTyQ1dgdqacLlcAO4pYFM5TpNp5FIAMxkYAATgAKZWCQQASmoGp2121jN1dJIhuNUE5ICB-T5w3cWLmGk8gnhmMVajRCFx7llqr0WgMrgsWkES2s6q2FK1t2OtKuluaZFge3uppk5pIVptDqdrvdxc1XrLNL1eSraBrdcSwdDIPDEws00EubjBlM7jl7mTGJc7lxiqFBiCFgMRci3bKxxL2Vy+SKJRIHsq162J81TRaGDaIM6Y+5YcG4L0o0lCF-A9tlvBl7g-PoJ2-dEbGxVUAkVeZs3zCxkx3aF3ECLNVU8TNJiAksex1ah+D0URAU-SCwXRSZYI3TM1kMXFLGTDRXGsEgViRbNFhxbQ93w7tQKZfgNDIrkIN5KCAORWj4IYpDmP-OVdChQRrG0SEML3dYwjJLtPWPRIAFka2kRICMMqAzzQPJmkvUp9NvSyTNgMyoAs+9EifIoX36d8RB6CjJKohAbFcNxpWjDwvA3Ox-1YnQc2WRFYUMbwBIMzyoBctyCNtOAwHiY5UnSClrNslorxvGJnNMh9PXy2BCpqEr6mibzWj8kRwJ5UEhgA39wpMGw1A8JVlT0FjXES6dJjMPE0v3Uk0DwCA4CUar4HIiS+vBABaCVxj26wsQJFEtGsKxjAMSMdM2Q9PQoKhAp2yctxICw1E+6x3DWNTZz-cZNHYjRLDURNPAzSMMtvapirqCkXt6ycFhRXRvCWG7WOlJVkxMHRJj3XxnECMwtDUGHKW9ct+yRr8Qo0j7MTmRZWOVTjkxw3QVncX6Tq+rQN0p0sdQrelqcSOnKP6mMdGnG7PsG9nTGTeFws8RUdzUwXIS0YXCJ9MX-SNGopeC-qpjTbj-CRXCkTi8YAixGNwbzMxvGlJb7uAqne19Stq1rY4zd2xBLZIa2hWsO3kVXZ0sQsYkcTGhdeb13TNrvTB6sqEPJ2ikgghGbDFhSyb-0jaYY2WPnjFzIWM8c32dTzqTNFXX8Ppu5DExti79dq1yc+IVuQsFtQSD8OMIcRfxvBY0wOIMKxf1By7tIHrKcuH0hLNH-rwY0SfcWm8m5rngwpqP0xBc+zRpwuinG4epyt7q8zuwDU3tuRqT6OhfMJMcTzBMK4ZMUIsSC0flYL6bE1Bqmfj7Xeb8h4fwagVIqiRWqIx-vTfquJnYmDxIiUGRMwHxXhCQG+LN76rEROnUIQA */
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

// const machineLostBlocks = setup({
//   actors: {
//     syncLostBlocks: fromPromise(async () => {
//       await syncer.syncLostBlocks();
//     }),
//   },
// }).createMachine({
//   id: 'lostBlocks',
//   initial: 'idle',
//   states: {
//     idle: {
//       on: {
//         START_SYNC_LOST_BLOCKS: {
//           target: 'syncingLostBlocks',
//         },
//       },
//     },
//     syncingLostBlocks: {
//       invoke: {
//         src: 'syncLostBlocks',
//         onDone: {
//           target: 'wait',
//         },
//       },
//     },
//     wait: {
//       after: {
//         600000: {
//           target: 'syncingLostBlocks',
//         },
//       },
//     },
//   },
// });

export default async function runSyncMachine(input: Input) {
  const actor = createActor(machine, { input });
  const start = new Date();
  actor.subscribe((state) => {
    const val = state.value;
    if (typeof val === 'string') {
      logger.syncer.debug(c.yellow(`📟 State: ${val}`));
      return;
    }
    const [key, value] = Object.entries(val)[0];
    const time = c.grey(`(${dayjs(start).fromNow()})`);
    logger.syncer.debug(c.yellow(`📟 State: ${key}.${value} ${time}`));
  });

  actor.start();
  actor.send({ type: 'START_SYNC' });

  //   const actorLostBlocks = createActor(machineLostBlocks, { input });
  //   actorLostBlocks.start();
  //   actorLostBlocks.send({ type: 'START_SYNC_LOST_BLOCKS' });
}
