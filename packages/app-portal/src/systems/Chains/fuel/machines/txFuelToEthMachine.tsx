import type {
  Provider as FuelProvider,
  MessageProof,
  TransactionResult,
} from 'fuels';
import type { PublicClient as EthPublicClient } from 'wagmi';
import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { FetchMachine } from '~/systems/Core/machines';

import type { TxFuelToEthInputs } from '../services';
import { TxFuelToEthService } from '../services';
import { FuelTxCache } from '../utils';

type MachineContext = {
  fuelProvider: FuelProvider;
  fuelTxId: string;
  fuelTxResult?: TransactionResult;
  fuelLastBlockId?: string;
  messageId?: string;
  messageProof?: MessageProof;
  fuelBlockHashCommited?: string;
  ethTxId?: string;
  ethPublicClient?: EthPublicClient;
  txHashMessageRelayed?: string;
};

type MachineServices = {
  waitFuelTxResult: {
    data: {
      txResult: TransactionResult;
      messageId: string;
    };
  };
  getMessageProof: {
    data: MessageProof | undefined;
  };
  waitBlockCommit: {
    data: string | undefined;
  };
  waitBlockFinalization: {
    data: boolean | undefined;
  };
  getMessageRelayed: {
    data: string | undefined;
  };
  relayMessageFromFuelBlock: {
    data: string;
  };
  waitTxMessageRelayed: {
    data: boolean | undefined;
  };
};

type AnalyzeInputs = TxFuelToEthInputs['getMessageProof'] &
  TxFuelToEthInputs['getMessageRelayed'];
export type TxFuelToEthMachineEvents =
  | {
      type: 'START_ANALYZE_TX';
      input: AnalyzeInputs;
    }
  | {
      type: 'RELAY_TO_ETH';
      input: Omit<
        TxFuelToEthInputs['relayMessageFromFuelBlock'],
        'messageProof'
      >;
    };

export const txFuelToEthMachine = createMachine(
  {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    tsTypes: {} as import('./txFuelToEthMachine.typegen').Typegen0,
    schema: {
      context: {} as MachineContext,
      services: {} as MachineServices,
      events: {} as TxFuelToEthMachineEvents,
    },
    predictableActionArguments: true,
    id: '(machine)',
    initial: 'idle',
    states: {
      idle: {
        on: {
          START_ANALYZE_TX: {
            actions: ['assignAnalyzeTxInput'],
            target: 'submittingToBridge',
          },
        },
      },
      submittingToBridge: {
        initial: 'waitingFuelTxResult',
        states: {
          waitingFuelTxResult: {
            tags: ['isSubmitToBridgeLoading', 'isSubmitToBridgeSelected'],
            invoke: {
              src: 'waitFuelTxResult',
              data: {
                input: (ctx: MachineContext) => ({
                  fuelTxId: ctx.fuelTxId,
                  fuelProvider: ctx.fuelProvider,
                }),
              },
              onDone: [
                {
                  cond: FetchMachine.hasError,
                },
                {
                  actions: ['assignFuelTxResult', 'assignMessageId'],
                  cond: 'hasMessageId',
                  target: 'checkingSettlement',
                },
              ],
            },
            after: {
              10000: {
                target: 'waitingFuelTxResult',
              },
            },
          },
          checkingSettlement: {
            tags: ['isSubmitToBridgeDone'],
            initial: 'waitingBlockCommit',
            states: {
              waitingBlockCommit: {
                tags: ['isSettlementLoading', 'isSettlementSelected'],
                invoke: {
                  src: 'waitBlockCommit',
                  data: {
                    input: (ctx: MachineContext) => ({
                      fuelWithdrawBlockId: ctx.fuelTxResult?.blockId,
                      ethPublicClient: ctx.ethPublicClient,
                      fuelProvider: ctx.fuelProvider,
                    }),
                  },
                  onDone: [
                    {
                      cond: FetchMachine.hasError,
                    },
                    {
                      actions: ['assignFuelBlockHashCommited'],
                      cond: 'hasBlockCommited',
                      target: 'checkingMessageProof',
                    },
                  ],
                },
                after: {
                  10000: {
                    target: 'waitingBlockCommit',
                  },
                },
              },
              checkingMessageProof: {
                tags: ['isSettlementLoading', 'isSettlementSelected'],
                invoke: {
                  src: 'getMessageProof',
                  data: {
                    input: (ctx: MachineContext) => ({
                      fuelTxId: ctx.fuelTxId,
                      messageId: ctx.messageId,
                      fuelBlockHashCommited: ctx.fuelBlockHashCommited,
                      fuelProvider: ctx.fuelProvider,
                    }),
                  },
                  onDone: [
                    {
                      cond: FetchMachine.hasError,
                    },
                    {
                      actions: ['assignMessageProof'],
                      cond: 'hasMessageProof',
                      target: 'waitingBlockFinalization',
                    },
                  ],
                },
                after: {
                  10000: {
                    target: 'checkingMessageProof',
                  },
                },
              },
              waitingBlockFinalization: {
                tags: ['isSettlementLoading', 'isSettlementSelected'],
                invoke: {
                  src: 'waitBlockFinalization',
                  data: {
                    input: (ctx: MachineContext) => ({
                      messageProof: ctx.messageProof,
                      ethPublicClient: ctx.ethPublicClient,
                    }),
                  },
                  onDone: [
                    {
                      cond: FetchMachine.hasError,
                    },
                    {
                      cond: 'hasBlockFinalized',
                      target: 'checkingRelayed',
                    },
                  ],
                },
                after: {
                  10000: {
                    target: 'waitingBlockFinalization',
                  },
                },
              },
              checkingRelayed: {
                tags: ['isSettlementDone'],
                initial: 'checkingHasRelayedInEth',
                states: {
                  checkingHasRelayedInEth: {
                    tags: ['isConfirmTransactionSelected'],
                    invoke: {
                      src: 'getMessageRelayed',
                      data: {
                        input: (ctx: MachineContext) => ({
                          messageProof: ctx.messageProof,
                          ethPublicClient: ctx.ethPublicClient,
                          messageId: ctx.messageId,
                        }),
                      },
                      onDone: [
                        {
                          cond: FetchMachine.hasError,
                        },
                        {
                          actions: ['assignTxHashMessageRelayed'],
                          cond: 'hasTxHashMessageRelayed',
                          target: 'waitingReceive',
                        },
                        {
                          target: 'waitingEthWalletApproval',
                        },
                      ],
                    },
                    after: {
                      10000: {
                        target: 'checkingHasRelayedInEth',
                      },
                    },
                  },
                  waitingEthWalletApproval: {
                    tags: [
                      'isConfirmTransactionSelected',
                      'isWaitingEthWalletApproval',
                    ],
                    on: {
                      RELAY_TO_ETH: {
                        target: ['relayingMessageFromFuelBlock'],
                      },
                    },
                  },
                  relayingMessageFromFuelBlock: {
                    tags: [
                      'isConfirmTransactionLoading',
                      'isConfirmTransactionSelected',
                    ],
                    invoke: {
                      src: 'relayMessageFromFuelBlock',
                      data: {
                        input: (
                          ctx: MachineContext,
                          ev: Extract<
                            TxFuelToEthMachineEvents,
                            { type: 'RELAY_TO_ETH' }
                          >
                        ) => ({
                          messageProof: ctx.messageProof,
                          ethWalletClient: ev.input.ethWalletClient,
                        }),
                      },
                      onDone: [
                        {
                          cond: FetchMachine.hasError,
                          target: 'waitingEthWalletApproval',
                        },
                        {
                          actions: ['assignTxHashMessageRelayed'],
                          cond: 'hasTxHashMessageRelayed',
                          target: 'waitingReceive',
                        },
                      ],
                    },
                  },
                  waitingReceive: {
                    tags: ['isConfirmTransactionDone'],
                    initial: 'waitTxMessageRelayed',
                    states: {
                      waitTxMessageRelayed: {
                        tags: ['isReceiveLoading', 'isReceiveSelected'],
                        invoke: {
                          src: 'waitTxMessageRelayed',
                          data: {
                            input: (ctx: MachineContext) => ({
                              txHash: ctx.txHashMessageRelayed,
                              ethPublicClient: ctx.ethPublicClient,
                            }),
                          },
                          onDone: [
                            {
                              cond: FetchMachine.hasError,
                              // if some problem happened with the transaction, move to prec state to try a new transaction
                              target:
                                '#(machine).submittingToBridge.checkingSettlement.checkingRelayed.checkingHasRelayedInEth',
                            },
                            {
                              cond: 'hasTxMessageRelayed',
                              target: 'done',
                            },
                          ],
                        },
                        after: {
                          10000: {
                            target: 'waitTxMessageRelayed',
                          },
                        },
                      },
                      done: {
                        entry: ['setFuelToEthTxDone'],
                        tags: ['isReceiveDone'],
                        type: 'final',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      failed: {},
    },
  },
  {
    actions: {
      assignAnalyzeTxInput: assign((_, ev) => ({
        fuelTxId: ev.input.fuelTxId,
        fuelProvider: ev.input.fuelProvider,
        ethPublicClient: ev.input.ethPublicClient,
      })),
      assignFuelTxResult: assign({
        fuelTxResult: (_, ev) => ev.data.txResult || undefined,
      }),
      assignMessageId: assign({
        messageId: (_, ev) => ev.data.messageId,
      }),
      assignMessageProof: assign({
        messageProof: (_, ev) => ev.data,
      }),
      assignTxHashMessageRelayed: assign({
        txHashMessageRelayed: (_, ev) => ev.data,
      }),
      assignFuelBlockHashCommited: assign({
        fuelBlockHashCommited: (_, ev) => ev.data,
      }),
      setFuelToEthTxDone: (ctx) => {
        if (ctx.fuelTxId) {
          FuelTxCache.setTxIsDone(ctx.fuelTxId);
        }
      },
    },
    guards: {
      hasMessageId: (ctx, ev) => !!ctx.messageId || !!ev?.data.messageId,
      hasMessageProof: (ctx, ev) => !!ctx.messageProof || !!ev?.data,
      hasBlockCommited: (ctx, ev) => !!ctx.fuelBlockHashCommited || !!ev?.data,
      hasBlockFinalized: (_, ev) => !!ev?.data,
      hasTxHashMessageRelayed: (ctx, ev) =>
        !!ctx.txHashMessageRelayed || !!ev?.data,
      hasTxMessageRelayed: (_, ev) => !!ev?.data,
    },
    services: {
      waitFuelTxResult: FetchMachine.create<
        TxFuelToEthInputs['waitTxResult'],
        MachineServices['waitFuelTxResult']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to wait tx result');
          }

          console.log('waitFuelTxResult');

          const result = await TxFuelToEthService.waitTxResult(input);

          return result;
        },
      }),
      getMessageProof: FetchMachine.create<
        TxFuelToEthInputs['getMessageProof'],
        MachineServices['getMessageProof']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to get fuel message');
          }

          console.log('getMessageProof');
          const result = await TxFuelToEthService.getMessageProof(input);
          return result;
        },
      }),
      waitBlockCommit: FetchMachine.create<
        TxFuelToEthInputs['waitBlockCommit'],
        MachineServices['waitBlockCommit']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to wait block commit');
          }

          console.log('waitBlockCommit');
          const result = await TxFuelToEthService.waitBlockCommit(input);
          return result;
        },
      }),
      waitBlockFinalization: FetchMachine.create<
        TxFuelToEthInputs['waitBlockFinalization'],
        MachineServices['waitBlockFinalization']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to wait block commit');
          }

          console.log('waitBlockFinalization');
          const result = TxFuelToEthService.waitBlockFinalization(input);
          return result;
        },
      }),
      getMessageRelayed: FetchMachine.create<
        TxFuelToEthInputs['getMessageRelayed'],
        MachineServices['getMessageRelayed']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to get message relayed');
          }

          console.log('getMessageRelayed');
          const txHashMessageRelayed =
            await TxFuelToEthService.getMessageRelayed(input);
          return txHashMessageRelayed;
        },
      }),
      relayMessageFromFuelBlock: FetchMachine.create<
        TxFuelToEthInputs['relayMessageFromFuelBlock'],
        MachineServices['relayMessageFromFuelBlock']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to get fuel message');
          }

          console.log('relayMessageFromFuelBlock');
          const resp =
            await TxFuelToEthService.relayMessageFromFuelBlock(input);

          return resp;
        },
      }),
      waitTxMessageRelayed: FetchMachine.create<
        TxFuelToEthInputs['waitTxMessageRelayed'],
        MachineServices['waitTxMessageRelayed']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to wait tx message relayed');
          }

          console.log('waitTxMessageRelayed');
          const resp = await TxFuelToEthService.waitTxMessageRelayed(input);

          return resp;
        },
      }),
    },
  }
);

export type TxFuelToEthMachine = typeof txFuelToEthMachine;
export type TxFuelToEthMachineService = InterpreterFrom<TxFuelToEthMachine>;
export type TxFuelToEthMachineState = StateFrom<TxFuelToEthMachine>;
