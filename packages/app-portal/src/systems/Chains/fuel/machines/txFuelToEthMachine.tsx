import type {
  MessageProof,
  Provider as FuelProvider,
  TransactionResult,
} from 'fuels';
import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { FetchMachine } from '~portal/systems/Core/machines';

import type { PublicClient as EthPublicClient } from 'viem';
import type { TxFuelToEthInputs } from '../services';
import { TxFuelToEthService } from '../services';
import { FuelTxCache } from '../utils/txCache';

type MachineContext = {
  fuelProvider?: FuelProvider;
  fuelTxId?: string;
  fuelTxResult?: TransactionResult;
  nonce?: string;
  messageId?: string;
  messageProof?: MessageProof;
  fuelBlockHashCommited?: string;
  ethTxId?: string;
  ethPublicClient?: EthPublicClient;
  txHashMessageRelayed?: string;
  estimatedFinishDate?: Date;
  estimatedNextCommitDate?: Date;
};

type MachineServices = {
  waitFuelTxResult: {
    data: {
      txResult: TransactionResult;
      messageId: string;
      nonce: string;
    };
  };
  getMessageProof: {
    data: MessageProof | undefined;
  };
  waitBlockCommit: {
    data: {
      blockHashCommited?: string | undefined;
      estimatedFinishDate?: Date | undefined;
      estimatedNextCommitDate?: Date | undefined;
    };
  };
  waitBlockFinalization: {
    data: {
      isFinalized?: boolean | undefined;
      estimatedFinishDate?: Date | undefined;
    };
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
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQBUBBAJXoH1GA5RgGQE0AWgFE29ABoBtAAwBdRKAAOAe1i4ALriX55IAB6IAjACYArCQBsAFhMAOSwHZLATnv2DDgMwAaEAE9DHjYeJPYe9uYeTk7uBlKWRgC+CT5oWHiEpORU1NJySCDKqhpaOvoIxmZWtg7Oru6hPv7lHoEklgahLYHuNgZJKRg4BMQksACuAEao6hr4UPRKAEIATuQwJADu6OoEUABiY2AU9LrMcGMUatQQWmBk+ABuSgDWd6lDGaOT02qz80uraB3LY7OYHI4nM7jS4IAhPTDoYr4XK5HSFHYlfJlUIGEgmJweEwmZyWDxGCIGRqIIzOEg2XrmGzEpy2dxGRLJEDvdIjcZTGa7BYrNbA7Z-cHHU7nS7XW73J6vEjc4akPk-P5CwHrEHiw6SqEXNSwx5KBFIlEGPKKFQY7RYwxSDyWEhSIw2UyEyJBdxU8o2ewkIyBSzmGmhIl2cz9LmDHmq74CuaakWbMW7CWQ6VXXSwNSIu7oABmajAy2QJiklaI1GVnzVif+wqBqdB+z1mehalR+XRSNKiEsNnMJCcRgMQ4MBgiTLs9l9BgrFnMJnsJmMHVMjg5AzSKq+-N+goBKZwYEwz12ABFbgBhNI0bvWoqaO2gMrtMxDt1r9l2IdzvxEECSoWSCMkpFCV1yWjWteQTQ8k2PZtT3PK9b3vHJLTRG0+3tBB7CkYdGXMQjGSMKQnD-X0QykEhYjHCsySZRw+k5WD4wPDUkPWFCLzmWgwF+KhUDAfA1BbP5FgoU1nhvJRUB+WVCHlF43ljPd6wQxstTuXjdgEoSwBEsSJN2KSZLkhT1GNeFERfFFZGw59MTfQwDCdCxKPDNcVw8R1fXdZ0jFcUJgo8ScSI8GD1LreCuKbHjsDPPioAMtRhNE8SdTM6Tz0sxSbmUuFVKVGK4M4o8Et0pLUP4wT0qMzLTLmcy8vkn4bNNOytAtK0Chwl9+2aFw8XidzjEdCDzF9cwWUDPyPXI8xJ3iaLd1iirEKqkg9LqwzjKytMWty2T2vUJS7mKxV2P3dVKp0naapStKMpM7Ljoss6jWKs17NkCQjD63tBrwgwWQDBwWVJCtLFdQdfQIow8XJellsJVwWTWj5yruraHt21L6tew7W1a06rOzXN8xIIsSzLBEKEwC580vI50F8RZ0FgSAAHl8HoXARIWTgwF0NR8vUasbs0+L8ae-Sicat6jqgMmJa7RyewGly9DcjxhxMN0-Nmr9iUsX1bFo0wpGJFoqkIpwsbjW6G2TZD5b2hqDse5LdgAWTgWB0BgAAFZYlCUQsLpU66yo43HtJPD3Cf2pqCYD2Ag9D8PI8636ev+zWn1tIb3OCuiINtokyPNwDykdYJ3LicJ3SCZcTCdjS4vupPfc94mfdqqAM6zsAw4jqPCsuk1Y-WnHXe46q+5Tr20+Tkfg7HnPCzz7rkX+rCtec19dfKJwSIsOITG6FdBzsecpFiNoKOMIIaQcCjO42hO3cS5eXqVuJdOgdN7j0jtQHMeYSw02LKWZAsRKxSClnHF2Wlf5LyHgA72wDM6gO3o+fqx9S7GGHJEIMLhiRumsNNOu9JnSRGsJGeIEFBxf3nmgxeg9nqK29u9VWJ09gEHQBQXAAAvPe0crpqTnvHBe20CZYKanwsmgj8DCLEXvXe5pC5A21ifMok5DZtENvYGwNtAqThsPOboyMWg0SHA4thsiOHyOToo5WpMBFCJEeIpEkiZ7SOxs42WvdME8KUSrFR3iNFIi0X9GQEhD7F1wq5M+ZILBTnJB0UcNhQLWPCniQIjIbZOFJGEJxqCQnu3-uEjxkkvFqJ8RIqeMdAnOxlj3apYTU51JyjJVR6jfEvjiQXBJgMnIl1BgSUh7hSlhEZHUJw85rDBDXFYXJ5JLYOAqR0vGoTuE9JJvU-p0ShlaAgVTaBtM4EMyZhQFmbMOZc15vzQWYAFgDJ8cQGsKDdmJy6Qc1evSPrnk+TE+JEyUmn1iK4EgTF3Tt3xPRec45cTLlMOff07IySWB2d3PZAKFaHK4bsM49zfCQBJXMAAElzMl7NIAAEl8BCDUNgfxCo2ld02v8v+3SgVAOTvSilEAqVQFpbAYVTKWVspGfvBJRdCGTNScYcidEinLnsC4ciTp5z-k8qENGjhLA1DxTy9BYr3GCuXlK0VBMJW2uZay9lLSpGlRkZUzpfLAUDwJrasVDrHnSudXK3qkKQYqtCM6Bcmr1lBnMBEecbh6GrjiNYc+RsopsV+fi3lGCfWALFf6+1dKg0QCdWyjlJVpa5otQo2p1qh7FuToG8lwbZU-T3iicZR9lXQpJCEaZP4TCMhXEYecGb1XtBIuSG24R7Bmp-pw+txK-VloDaWtt5aZXssgdTa5ZYEFVh+R6v5da3ENqLeuktkqy0VuwAQ4GOsDHjmCO-CabhHBSHpPOZczp-Q20CKYskERF1yLljU1dQr118OdQAdWEVQNQjAFAKHDg8YR1BmBCB4IwPgogeZsCEPQalj69FDXpGYQ2BJDERBWUsuuY53TzXiF5advkwMuIg-y310Gt0kGWI8-2ICYB7HDqgCUZMq2zyCZ6gl3qiUCqvfxwT5LhO4NE+JyTJ1Q06PDc+wwwUkZOBtoOCsU5r5WF9GOewSMbOxATdYEhnGqkKf7oWtdKmhNzA3pp+S2mZLSa5d-cD+zFO8Zteu1T7N1OjzE-5vUZNdMJKSUqqFBjGQ2EHcFIkI6CSuhMNZwkzpVwYqMOfVcURcXZtPbW5dF6oORf43ws4mAwC4AeKKdQJxfNgFtUF91smz31cg0pzzDLRUtbPO1zrEkesib62W5LZGiF4RIllzZjCnPQ3HXXMGFERxBmcAuUpq5Qgua9fm8LHm+MTealAVrM2utqHmxpxbW6Bs1vNSNnjN2mt3am21jrz3Xuj1tct1LT79EOiiC6QIDDTN2FdNZzVcLIgI8iDbViO4ht1dcaNiLTaYMq0e8Dubuhev9b3Vc2Bh7EFIJPbj77+PfvYNuyK+7pPZs6lB5vW1K2+0GO-ZUJk0RPThFmgxpowUpx4nRVOXosNz7Vc5PgJQEA4A6HYvp6HCAAC0NCmh66DCOMxEEWindJNjmMHqshgB10NeI1j4ghAcFYEMJmQzugu-J+3vb0tAWJJfScNJTPBhDDNYIToja5JDyuKcPu833YzFKTsDu8KwyRiREPsNbZ2Aj4x9J36KuUSx3YLNOP2l4+4yla8hA7ynnTyqioFcaTmFMaSc+7ffTw7opODoZiTNREdNVyv3Kl0s4LQdJvp8fyBj-dUNcO3qKjkO6uKwwUrDLWt19ifNfru8MiSddWM+hcFNMCuajjpZrXwRoRF0hjXQElHAPxP56Cd-aHr1sBhZT8Oj8nCpOOEC0OVkSAuL6C4LROfGmtOB0IbB3DVkznvmFu5ofp4ico0uCjrFDqXK6LRIEJRL0NfDLu6POJvi6KSHELOu4M4AgWPiFlxigSvITilLan-ggCOlbAvnYEvoSLtk0DGgGMSOEOSA4LZqGDYG-j9lPmvP9hzjeo6juuwTCp+BRDSDSMQZDEmtfHRO6DSEyCUu3guogVXszvvqgbIUTs1irPBohoJChmhkoBhhQMod+sEKSOVuyKYmDOVrXNLsXq7qOEBn+p-CYePqFoShYSZONhztFr4LFpvPFhJolidOwQyBYPrG4RWMFFbtZijC6O6BRK4JELYC4FIZPgfpYawcTq2Fzn7skhGqfB3nCobOyC4AuNDJSIxoxHCquF7oRJvqGOUeYcwZ-tUdYbUdNmTjzhTgtmwf7o0WUG-C0eyOVm4FXF0dLviLRCbIENfv6AmsYfQewq5ldlEY2uMQDiTlMbNlPMoZinSD0FYMPv6EENZoPq7qGOFGDARCahUoWNsFQBAOwU7ntlQoGKyOOL0HYJjEkAkEAA */
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
        always: {
          cond: 'hasAnalyzeTxInput',
          target: 'submittingToBridge',
        },
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
                  actions: [
                    'assignFuelTxResult',
                    'assignMessageId',
                    'assignNonce',
                    'clearTxCreated',
                  ],
                  cond: 'hasTxResultInfo',
                  target: 'checkingDoneCache',
                },
              ],
            },
            after: {
              5000: {
                target: 'waitingFuelTxResult',
              },
            },
          },
          checkingDoneCache: {
            tags: ['isSubmitToBridgeLoading', 'isSubmitToBridgeSelected'],
            always: [
              {
                cond: 'isTxFuelToEthDone',
                target:
                  '#(machine).submittingToBridge.checkingSettlement.checkingRelayed.waitingReceive.done',
              },
              {
                target: 'checkingSettlement',
              },
            ],
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
                      actions: [
                        'assignEstimatedNextCommitDate',
                        'assignEstimatedFinishDate',
                      ],
                      cond: 'hasEstimatedFinishDate',
                    },
                    {
                      actions: ['assignFuelBlockHashCommited'],
                      cond: 'hasBlockCommited',
                      target: 'checkingMessageProof',
                    },
                  ],
                },
                after: {
                  calculateDelayBasedOnTimeToNextCommit: {
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
                      nonce: ctx.nonce,
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
                      fuelBlockHashCommited: ctx.fuelBlockHashCommited,
                      fuelProvider: ctx.fuelProvider,
                    }),
                  },
                  onDone: [
                    {
                      cond: FetchMachine.hasError,
                    },
                    {
                      actions: ['assignEstimatedFinishDate'],
                      cond: 'hasEstimatedFinishDate',
                    },
                    {
                      cond: 'hasBlockFinalized',
                      target: 'checkingRelayed',
                    },
                  ],
                },
                after: {
                  calculateDelayBasedOnTimeToFinalize: {
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
                          >,
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
                              // if some problem happened with the transaction, move to prev state to try a new transaction
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
      assignNonce: assign({
        nonce: (_, ev) => ev.data.nonce,
      }),
      assignMessageProof: assign({
        messageProof: (_, ev) => ev.data,
      }),
      assignTxHashMessageRelayed: assign({
        txHashMessageRelayed: (_, ev) => ev.data,
      }),
      assignFuelBlockHashCommited: assign({
        fuelBlockHashCommited: (_, ev) => ev.data.blockHashCommited,
      }),
      assignEstimatedNextCommitDate: assign({
        estimatedNextCommitDate: (ctx, ev) => {
          if (ctx.fuelTxId && ev.data.estimatedNextCommitDate) {
            FuelTxCache.setTxTimeToNextCommit(
              ctx.fuelTxId,
              ev.data.estimatedNextCommitDate.getTime(),
            );
          }
          return ev.data.estimatedNextCommitDate;
        },
      }),
      assignEstimatedFinishDate: assign({
        estimatedFinishDate: (ctx, ev) => {
          if (ctx.fuelTxId && ev.data.estimatedFinishDate) {
            FuelTxCache.setTxTimeToFinalize(
              ctx.fuelTxId,
              ev.data.estimatedFinishDate.getTime(),
            );
          }
          return ev.data.estimatedFinishDate;
        },
      }),
      setFuelToEthTxDone: (ctx) => {
        if (ctx.fuelTxId) {
          FuelTxCache.setTxIsDone(ctx.fuelTxId);
        }
      },
      clearTxCreated: (ctx) => {
        if (ctx.fuelTxId && FuelTxCache.getTxIsCreated(ctx.fuelTxId)) {
          FuelTxCache.removeTxCreated(ctx.fuelTxId);
        }
      },
    },
    guards: {
      hasTxResultInfo: (ctx, ev) =>
        (!!ctx.messageId || !!ev?.data.messageId) &&
        (!!ctx.nonce || !!ev?.data.nonce),
      hasMessageProof: (ctx, ev) => !!ctx.messageProof || !!ev?.data,
      hasBlockCommited: (ctx, ev) =>
        !!ctx.fuelBlockHashCommited || !!ev?.data?.blockHashCommited,
      hasEstimatedFinishDate: (_, ev) => !!ev?.data?.estimatedFinishDate,
      hasBlockFinalized: (_, ev) => !!ev?.data?.isFinalized,
      hasTxHashMessageRelayed: (ctx, ev) =>
        !!ctx.txHashMessageRelayed || !!ev?.data,
      hasTxMessageRelayed: (_, ev) => !!ev?.data,
      hasAnalyzeTxInput: (ctx) =>
        !!ctx.fuelTxId && !!ctx.fuelProvider && !!ctx.ethPublicClient,
      isTxFuelToEthDone: (ctx) => FuelTxCache.getTxIsDone(ctx.fuelTxId || ''),
    },
    delays: {
      calculateDelayBasedOnTimeToFinalize: (ctx) => {
        const delay = TxFuelToEthService.calculateDelayBasedOnTimeRemaining({
          txId: ctx.fuelTxId,
          timeRemaining: FuelTxCache.getTxTimeToFinalize(ctx.fuelTxId || ''),
        });
        return delay;
      },
      calculateDelayBasedOnTimeToNextCommit: (ctx) => {
        const delay = TxFuelToEthService.calculateDelayBasedOnTimeRemaining({
          txId: ctx.fuelTxId,
          timeRemaining: FuelTxCache.getTxTimeToNextCommit(ctx.fuelTxId || ''),
        });
        return delay;
      },
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
  },
);

export type TxFuelToEthMachine = typeof txFuelToEthMachine;
export type TxFuelToEthMachineService = InterpreterFrom<TxFuelToEthMachine>;
export type TxFuelToEthMachineState = StateFrom<TxFuelToEthMachine>;
