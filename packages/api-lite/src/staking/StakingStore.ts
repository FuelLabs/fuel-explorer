import dayjs from 'dayjs';
import type { CosmosIndex } from '../cosmos/CosmosIndex';
import type { ArgLogRow, L1Index, StakingLogEventRow } from '../l1/L1Index';
import type { PaginatedParams } from './PaginatedParams';
import {
  convertEthAddressToSequencerUserAddress,
  getValidAddress,
} from './addresses';
import { CosmosMsgType, decodeAuthorizeMessages } from './decodeAuthorize';
import type { FinalizationPeriods } from './finalization';
import { normalizeCosmosQueryResponse } from './normalize';
import type { WithdrawProofCache } from './proof';
import {
  BaseStatusType,
  type ClaimRewardsResponse,
  type CommitInfo,
  type ComosTx,
  type DelegateResponse,
  type PaginatedEventsResult,
  type RedelegateResponse,
  ResponseType,
  type SequencerEventItem,
  type StakingHistoryResponse,
  type UndelegateEvent,
  type UndelegateResponse,
  UndelegateStatusType,
  type WithdrawEvent,
  type WithdrawResponse,
  WithdrawStatusType,
} from './types';

const TIME_TO_SYNCHRONIZE_IN_SEQUENCER = 30;
const TIME_TO_COMMIT_SEQUENCER_BLOCK_TO_L1 = 8;

export type StakingStoreDeps = {
  l1Index: Pick<
    L1Index,
    | 'queryStakingEvents'
    | 'hasStakingEventBeyond'
    | 'stakingEventById'
    | 'recentArgLogs'
    | 'firstArgLogAtOrAfter'
    | 'queryLogs'
  >;
  cosmosIndex: Pick<
    CosmosIndex,
    'blockSyncedAfter' | 'queryEventsSyncedToEthBlock'
  >;
  finalization: Pick<FinalizationPeriods, 'timeToFinalize'>;
  proofCache: Pick<WithdrawProofCache, 'get'>;
};

function toSequencerEventItem(row: StakingLogEventRow): SequencerEventItem {
  return {
    _id: row._id,
    tx_hash: row.tx_hash,
    signature: row.signature,
    block_height: row.block_height,
    timestamp: new Date(row.timestamp),
    decoded_args: JSON.parse(row.decoded_args) as Record<string, unknown>,
  };
}

function averageTimeDifferenceInSeconds(dates: Date[]): number {
  if (dates.length < 2) return 0;
  const timestamps = dates.map((d) => d.getTime()).sort((a, b) => b - a);
  let totalDiff = 0;
  for (let i = 1; i < timestamps.length; i++) {
    totalDiff += timestamps[i - 1] - timestamps[i];
  }
  return totalDiff / (timestamps.length - 1) / 1000;
}

function argLogToCommitInfo(rows: ArgLogRow[]): CommitInfo | null {
  // A fresh index with no L1-commit logs yet must not crash callers; skip
  // the L1-commit status refinement instead.
  if (rows.length === 0) return null;
  const diff = averageTimeDifferenceInSeconds(
    rows.map((r) => new Date(r.timestamp)),
  );
  return {
    commitPeriodSeconds: diff,
    timestamp: new Date(rows[0].timestamp),
    txHash: rows[0].txHash,
    ethBlockHeight: String(rows[0].blockHeight),
    cosmosBlockNumber: rows[0].value,
  };
}

export class StakingStore {
  constructor(private readonly deps: StakingStoreDeps) {}

  private getLastCommittedBlock(): CommitInfo | null {
    return argLogToCommitInfo(
      this.deps.l1Index.recentArgLogs('blockNumber', 10),
    );
  }

  private blockIsSynced(ethBlockHeight: number): boolean {
    return this.deps.cosmosIndex.blockSyncedAfter(ethBlockHeight);
  }

  private cosmosQueryEvents<T = Record<string, unknown>>(
    ethBlockHeight: number,
    eventsQuery: Array<{ type: string; key: string; value: string }>,
  ): Array<ComosTx<T>> {
    const rows = this.deps.cosmosIndex.queryEventsSyncedToEthBlock(
      ethBlockHeight,
      eventsQuery,
    );
    if (rows.length === 0) return [];
    const preferredEventType =
      eventsQuery.length === 1 ? eventsQuery[0].type : undefined;
    return normalizeCosmosQueryResponse<T>(rows, preferredEventType);
  }

  async createWithdrawHistory(
    address: string,
    event: SequencerEventItem,
    withdraw: {
      from: string;
      to: string;
      amount: { amount: string };
    },
    shared?: {
      lastCommittedBlock?: CommitInfo | null;
      contractTimeToFinalizeInMinutes?: number;
    },
  ): Promise<WithdrawResponse> {
    const contractTimeToFinalizeInMinutes =
      shared?.contractTimeToFinalizeInMinutes ??
      (await this.deps.finalization.timeToFinalize());

    const data: WithdrawResponse = {
      id: event._id,
      type: ResponseType.Withdraw,
      from: withdraw.from,
      to: withdraw.to,
      amount: withdraw.amount.amount,
      status: BaseStatusType.WaitingSync,
      timestampToFinish: dayjs(event.timestamp)
        .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
        .add(TIME_TO_COMMIT_SEQUENCER_BLOCK_TO_L1, 'hours')
        .add(contractTimeToFinalizeInMinutes, 'minutes')
        .toDate()
        .toISOString(),
      statusInfo: {
        [BaseStatusType.TransactionSent]: {
          ethTx: {
            height: event.block_height.toString(),
            txHash: event.tx_hash,
            timestamp: event.timestamp,
          },
        },
        [BaseStatusType.WaitingSync]: {
          dateExpectedToComplete: dayjs(event.timestamp)
            .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
            .toDate(),
        },
      },
    };

    const withdrawEvents = this.cosmosQueryEvents<WithdrawEvent>(
      event.block_height,
      [
        {
          key: 'from',
          type: 'fuelsequencer.bridge.EventWithdrawToEthereumReported',
          value: `"${address.toLowerCase()}"`,
        },
      ],
    );

    if (withdrawEvents.length === 0) {
      if (this.blockIsSynced(event.block_height)) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    const lastestCommittedBlock =
      shared?.lastCommittedBlock !== undefined
        ? shared.lastCommittedBlock
        : this.getLastCommittedBlock();
    const withdrawSequencerTX = withdrawEvents[0];

    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: withdrawSequencerTX.height,
        txHash: withdrawSequencerTX.txHash,
        timestamp: withdrawSequencerTX.timestamp,
      },
    };

    if (withdrawSequencerTX.event && 'nonce' in withdrawSequencerTX.event) {
      data.nonce = (withdrawSequencerTX.event as WithdrawEvent).nonce;
    }

    // Without a commit yet, the status can't advance past WaitingSync (there
    // is no commit_period to estimate finalization from).
    if (!lastestCommittedBlock) return data;

    data.status = WithdrawStatusType.WaitingCommittingToL1;
    data.statusInfo[WithdrawStatusType.WaitingCommittingToL1] = {
      dateExpectedToComplete: dayjs(lastestCommittedBlock.timestamp)
        .add(lastestCommittedBlock.commitPeriodSeconds, 'seconds')
        .toDate(),
    };

    data.timestampToFinish = dayjs(withdrawSequencerTX.timestamp)
      .add(lastestCommittedBlock.commitPeriodSeconds, 'seconds')
      .add(contractTimeToFinalizeInMinutes, 'minutes')
      .toDate()
      .toISOString();

    const blockCommited = this.deps.l1Index.firstArgLogAtOrAfter(
      'blockNumber',
      Number(withdrawSequencerTX.height),
    );
    if (!blockCommited) return data;

    data.statusInfo[WithdrawStatusType.WaitingCommittingToL1] = {
      ethTx: {
        height: String(blockCommited.blockHeight),
        txHash: blockCommited.txHash,
        timestamp: new Date(blockCommited.timestamp),
      },
    };

    data.status = WithdrawStatusType.WaitingFinalization;
    data.statusInfo[WithdrawStatusType.WaitingFinalization] = {
      dateExpectedToComplete: dayjs(blockCommited.timestamp)
        .add(contractTimeToFinalizeInMinutes, 'minutes')
        .toDate(),
    };

    data.timestampToFinish = dayjs(blockCommited.timestamp)
      .add(contractTimeToFinalizeInMinutes, 'minutes')
      .toDate()
      .toISOString();

    if (dayjs().isAfter(dayjs(data.timestampToFinish))) {
      data.status = WithdrawStatusType.ReadyToProcessWithdraw;
      data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] = {};
    }

    // Finality check first, proof fetch only if it's still pending: a
    // WithdrawalProcessed L1 log means the withdrawal is already finalized,
    // so there's nothing left to prove and the sequencer indexer's
    // /seq/proof endpoint is never called for it.
    const withdrawFinalized = data.nonce
      ? this.deps.l1Index.queryLogs({
          event: 'WithdrawalProcessed',
          argKey: 'nonce',
          argValue: data.nonce,
          limit: 1,
        })[0]
      : undefined;

    if (withdrawFinalized) {
      data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] = {
        ...data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw],
        ethTx: {
          height: String(withdrawFinalized.block_height),
          txHash: withdrawFinalized.tx_hash,
          timestamp: new Date(withdrawFinalized.timestamp),
        },
      };
      data.status = BaseStatusType.Finalized;
      data.statusInfo[BaseStatusType.Finalized] = {};
    } else if (data.status === WithdrawStatusType.ReadyToProcessWithdraw) {
      data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] = {
        ...data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw],
        proof: data.nonce ? await this.deps.proofCache.get(data.nonce) : null,
      };
    }

    return data;
  }

  async createDelegateHistory(
    address: string,
    event: SequencerEventItem,
    delegate: {
      delegatorAddress: string;
      validatorAddress: string;
      amount: { amount: string };
    },
  ): Promise<DelegateResponse> {
    const data: DelegateResponse = {
      id: event._id,
      type: ResponseType.Stake,
      from: delegate.delegatorAddress,
      amount: delegate.amount.amount,
      validator: delegate.validatorAddress,
      status: BaseStatusType.WaitingSync,
      timestampToFinish: dayjs(event.timestamp)
        .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
        .toDate()
        .toISOString(),
      statusInfo: {
        [BaseStatusType.TransactionSent]: {
          ethTx: {
            height: event.block_height.toString(),
            txHash: event.tx_hash,
            timestamp: event.timestamp,
          },
        },
        [BaseStatusType.WaitingSync]: {
          dateExpectedToComplete: dayjs(event.timestamp)
            .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
            .toDate(),
        },
      },
    };

    const [delegateTX] = this.cosmosQueryEvents(event.block_height, [
      { key: 'delegator', type: 'delegate', value: address.toLowerCase() },
    ]);

    if (!delegateTX) {
      if (this.blockIsSynced(event.block_height)) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: delegateTX.height,
        txHash: delegateTX.txHash,
        timestamp: delegateTX.timestamp,
      },
    };
    data.status = BaseStatusType.Finalized;
    data.statusInfo[BaseStatusType.Finalized] = {};
    return data;
  }

  async createRedelegateHistory(
    address: string,
    event: SequencerEventItem,
    delegate: {
      delegatorAddress: string;
      validatorSrcAddress: string;
      validatorDstAddress: string;
      amount: { amount: string };
    },
  ): Promise<RedelegateResponse> {
    const data: RedelegateResponse = {
      id: event._id,
      type: ResponseType.ReDelegate,
      from: delegate.delegatorAddress,
      amount: delegate.amount.amount,
      toValidator: delegate.validatorDstAddress,
      fromValidator: delegate.validatorSrcAddress,
      timestampToFinish: dayjs(event.timestamp)
        .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
        .toDate()
        .toISOString(),
      status: BaseStatusType.WaitingSync,
      statusInfo: {
        [BaseStatusType.TransactionSent]: {
          ethTx: {
            height: event.block_height.toString(),
            txHash: event.tx_hash,
            timestamp: event.timestamp,
          },
        },
        [BaseStatusType.WaitingSync]: {
          dateExpectedToComplete: dayjs(event.timestamp)
            .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
            .toDate(),
        },
      },
    };

    const sequencerAddress = convertEthAddressToSequencerUserAddress(address);

    const [redelegateTX] = this.cosmosQueryEvents(event.block_height, [
      {
        type: 'redelegate',
        key: 'destination_validator',
        value: delegate.validatorDstAddress,
      },
      {
        type: 'withdraw_rewards',
        key: 'delegator',
        value: sequencerAddress ?? '',
      },
    ]);

    if (!redelegateTX) {
      if (this.blockIsSynced(event.block_height)) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: redelegateTX.height,
        txHash: redelegateTX.txHash,
        timestamp: redelegateTX.timestamp,
      },
    };
    data.status = BaseStatusType.Finalized;
    data.statusInfo[BaseStatusType.Finalized] = {};
    return data;
  }

  async createClaimRewardsHistory(
    address: string,
    event: SequencerEventItem,
    claimRewards: { delegatorAddress: string; validatorAddress: string },
  ): Promise<ClaimRewardsResponse> {
    const data: ClaimRewardsResponse = {
      id: event._id,
      type: ResponseType.ClaimRewards,
      from: claimRewards.delegatorAddress,
      validator: claimRewards.validatorAddress,
      timestampToFinish: dayjs(event.timestamp)
        .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
        .toDate()
        .toISOString(),
      status: BaseStatusType.WaitingSync,
      statusInfo: {
        [BaseStatusType.TransactionSent]: {
          ethTx: {
            height: event.block_height.toString(),
            txHash: event.tx_hash,
            timestamp: event.timestamp,
          },
        },
        [BaseStatusType.WaitingSync]: {
          dateExpectedToComplete: dayjs(event.timestamp)
            .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
            .toDate(),
        },
      },
    };

    const sequencerAddress = convertEthAddressToSequencerUserAddress(address);

    const [claimRewardsTX] = this.cosmosQueryEvents(event.block_height, [
      {
        type: 'withdraw_rewards',
        key: 'delegator',
        value: sequencerAddress ?? '',
      },
    ]);

    if (!claimRewardsTX) {
      if (this.blockIsSynced(event.block_height)) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: claimRewardsTX.height,
        txHash: claimRewardsTX.txHash,
        timestamp: claimRewardsTX.timestamp,
      },
    };
    data.status = BaseStatusType.Finalized;
    data.statusInfo[BaseStatusType.Finalized] = {};
    return data;
  }

  async createUndelegateHistory(
    address: string,
    event: SequencerEventItem,
    undelegate: {
      delegatorAddress: string;
      validatorAddress: string;
      amount: { amount: string };
    },
  ): Promise<UndelegateResponse> {
    const data: UndelegateResponse = {
      id: event._id,
      type: ResponseType.Undelegate,
      from: undelegate.delegatorAddress,
      amount: undelegate.amount.amount,
      validator: undelegate.validatorAddress,
      timestampToFinish: dayjs(event.timestamp)
        .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
        .toDate()
        .toISOString(),
      status: BaseStatusType.WaitingSync,
      statusInfo: {
        [BaseStatusType.TransactionSent]: {
          ethTx: {
            height: event.block_height.toString(),
            txHash: event.tx_hash,
            timestamp: event.timestamp,
          },
        },
        [BaseStatusType.WaitingSync]: {
          dateExpectedToComplete: dayjs(event.timestamp)
            .add(TIME_TO_SYNCHRONIZE_IN_SEQUENCER, 'minutes')
            .toDate(),
        },
      },
    };

    const [undelegateTX] = this.cosmosQueryEvents<UndelegateEvent>(
      event.block_height,
      [{ type: 'unbond', key: 'delegator', value: address.toLowerCase() }],
    );

    if (!undelegateTX) {
      if (this.blockIsSynced(event.block_height)) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: undelegateTX.height,
        txHash: undelegateTX.txHash,
        timestamp: undelegateTX.timestamp,
      },
    };

    data.status = UndelegateStatusType.WaitingUnbonding;
    const dateToComplete = dayjs(undelegateTX.event.completion_time).toDate();
    data.statusInfo[UndelegateStatusType.WaitingUnbonding] = {
      dateExpectedToComplete: dateToComplete,
    };
    data.timestampToFinish = dateToComplete.toISOString();

    if (dayjs(undelegateTX.event.completion_time).isBefore(Date.now())) {
      data.status = BaseStatusType.Finalized;
      data.statusInfo[BaseStatusType.Finalized] = {};
    }

    return data;
  }

  async processEvent(
    address: string,
    event: SequencerEventItem,
    shared?: {
      lastCommittedBlock?: CommitInfo | null;
      contractTimeToFinalizeInMinutes?: number;
    },
  ): Promise<StakingHistoryResponse[]> {
    const finalHistory: StakingHistoryResponse[] = [];
    // biome-ignore lint/suspicious/noExplicitAny: shape depends on `type`
    const eventProcessingMap: Array<{ type: CosmosMsgType; data: any }> = [];
    const decodedArgs = event.decoded_args as Record<string, string>;

    switch (event.signature) {
      case 'Authorize(address,bytes)': {
        for (const message of decodeAuthorizeMessages(
          decodedArgs.data as string,
        )) {
          eventProcessingMap.push(message);
        }
        break;
      }
      case 'Delegate(address,address,uint256)': {
        eventProcessingMap.push({
          type: CosmosMsgType.MsgDelegate,
          data: {
            delegatorAddress: decodedArgs.delegator,
            validatorAddress: decodedArgs.validator,
            amount: { amount: decodedArgs.amount },
          },
        });
        break;
      }
      case 'Redelegate(address,address,address,uint256)': {
        eventProcessingMap.push({
          type: CosmosMsgType.MsgBeginRedelegate,
          data: {
            delegatorAddress: decodedArgs.delegator,
            validatorSrcAddress: decodedArgs.srcValidator,
            validatorDstAddress: decodedArgs.dstValidator,
            amount: { amount: decodedArgs.amount },
          },
        });
        break;
      }
      case 'ClaimRewards(address,address)': {
        eventProcessingMap.push({
          type: CosmosMsgType.MsgWithdrawDelegatorReward,
          data: {
            delegatorAddress: decodedArgs.delegator,
            validatorAddress: decodedArgs.validator,
          },
        });
        break;
      }
      case 'Unbond(address,address,uint256)': {
        eventProcessingMap.push({
          type: CosmosMsgType.MsgUndelegate,
          data: {
            delegatorAddress: decodedArgs.delegator,
            validatorAddress: decodedArgs.validator,
            amount: { amount: decodedArgs.amount },
          },
        });
        break;
      }
      case 'Withdraw(address,address,uint256)': {
        eventProcessingMap.push({
          type: CosmosMsgType.MsgWithdrawToEthereum,
          data: {
            from: decodedArgs.sender,
            to: decodedArgs.recipient,
            amount: { amount: decodedArgs.amount },
          },
        });
        break;
      }
      default:
        return finalHistory;
    }

    for (const item of eventProcessingMap) {
      switch (item.type) {
        case CosmosMsgType.MsgDelegate:
          finalHistory.push(
            await this.createDelegateHistory(address, event, item.data),
          );
          break;
        case CosmosMsgType.MsgUndelegate:
          finalHistory.push(
            await this.createUndelegateHistory(address, event, item.data),
          );
          break;
        case CosmosMsgType.MsgBeginRedelegate:
          finalHistory.push(
            await this.createRedelegateHistory(address, event, item.data),
          );
          break;
        case CosmosMsgType.MsgWithdrawDelegatorReward:
          finalHistory.push(
            await this.createClaimRewardsHistory(address, event, item.data),
          );
          break;
        case CosmosMsgType.MsgWithdrawToEthereum:
          finalHistory.push(
            await this.createWithdrawHistory(address, event, item.data, shared),
          );
          break;
      }
    }
    return finalHistory;
  }

  async getEvents(
    rawAddress: string,
    paginatedParams: PaginatedParams,
  ): Promise<PaginatedEventsResult> {
    const address = getValidAddress(rawAddress);
    const rows = this.deps.l1Index.queryStakingEvents(address, {
      cursor: paginatedParams.cursor,
      direction: paginatedParams.direction,
      limit: paginatedParams.last,
    });
    // node order is always newest-_id-first regardless of query direction.
    const sorted = [...rows].sort((a, b) => b._id - a._id);

    if (sorted.length === 0) {
      return {
        nodes: [],
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: '',
          startCursor: '',
        },
      };
    }

    const startCursor = sorted[0]._id;
    const endCursor = sorted[sorted.length - 1]._id;
    const hasPreviousPage = this.deps.l1Index.hasStakingEventBeyond(
      address,
      endCursor,
      '<',
    );
    const hasNextPage = this.deps.l1Index.hasStakingEventBeyond(
      address,
      startCursor,
      '>',
    );

    const lastCommittedBlock = this.getLastCommittedBlock();
    const contractTimeToFinalizeInMinutes =
      await this.deps.finalization.timeToFinalize();

    // Each row's history is independent, so they're processed concurrently
    // rather than one L1/cosmos round trip at a time.
    const historyResults = await Promise.all(
      sorted.map((row) =>
        this.processEvent(address, toSequencerEventItem(row), {
          lastCommittedBlock,
          contractTimeToFinalizeInMinutes,
        }),
      ),
    );
    const nodes = historyResults.flat();

    return {
      nodes,
      edges: [],
      pageInfo: { hasNextPage, hasPreviousPage, endCursor, startCursor },
    };
  }

  async getEvent(eventId: number): Promise<StakingHistoryResponse> {
    const row = this.deps.l1Index.stakingEventById(eventId);
    if (!row || row.value == null) {
      throw new Error('Event not found');
    }
    const address = getValidAddress(row.value);
    const [tx] = await this.processEvent(address, toSequencerEventItem(row));
    return tx;
  }
}
