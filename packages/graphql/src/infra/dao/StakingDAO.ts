import { fuelsequencer } from '@fuel-infrastructure/fuelsequencerjs';
import { MsgWithdrawDelegatorReward } from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/cosmos/distribution/v1beta1/tx';
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/cosmos/staking/v1beta1/tx';
import { MsgWithdrawToEthereum } from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/fuelsequencer/bridge/v1/tx';
import dayjs from 'dayjs';
import { ethers } from 'ethers';
import { arrayify } from 'fuels';
import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';
import type PaginatedParams from '../paginator/PaginatedParams';
import { convertEthAddressToSequencerUserAddress } from '../util/util';
import {
  BaseStatusType,
  type ClaimRewardsResponse,
  type CommitQueryItem,
  type ComosTx,
  type DelegateResponse,
  type ProccessedWithdrawQueryItem,
  type QueryItem,
  type RedelegateResponse,
  ResponseType,
  type SequencerEventItem,
  type UndelegateEvent,
  type UndelegateResponse,
  UndelegateStatusType,
  type WithdrawEvent,
  type WithdrawResponse,
  WithdrawStatusType,
} from './StakingDAO.types';
import { getTimeToFinalize } from './TEMP_StakingDAO';

// Time to synchronize in sequencer (minutes)
const TIME_TO_SYNCHRONIZE_IN_SEQUENCER = 30;

// Time to commit to L1 (hours)
const TIME_TO_COMMIT_SEQUENCER_BLOCK_TO_L1 = 8;

enum DecodersTypes {
  MsgWithdrawToEthereum = '/fuelsequencer.bridge.v1.MsgWithdrawToEthereum',
  MsgDelegate = '/cosmos.staking.v1beta1.MsgDelegate',
  MsgUndelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
  MsgBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  MsgWithdrawDelegatorReward = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
}

const decodersMapping = {
  [DecodersTypes.MsgWithdrawToEthereum]: MsgWithdrawToEthereum,
  [DecodersTypes.MsgDelegate]: MsgDelegate,
  [DecodersTypes.MsgUndelegate]: MsgUndelegate,
  [DecodersTypes.MsgBeginRedelegate]: MsgBeginRedelegate,
  [DecodersTypes.MsgWithdrawDelegatorReward]: MsgWithdrawDelegatorReward,
} as const;
type Param<T extends DecodersTypes> = ReturnType<
  (typeof decodersMapping)[T]['decode']
>;

function normalizeCosmosQueryResponse<T = any>(
  items: Array<QueryItem>,
  preferredEventType?: string,
): Array<ComosTx<T>> {
  // Combine events with same event_index and same event_type
  const tryParse = (value: string) => {
    try {
      if (typeof value !== 'string') return value;
      return JSON.parse(value);
    } catch (_error) {
      return value;
    }
  };
  const result: Record<string, ComosTx<T>> = {};
  for (const item of items) {
    result[item.tx_hash] = result[item.tx_hash] || {
      height: item.block_height,
      txHash: item.tx_hash,
      timestamp: item.timestamp,
      id: item.id,
      events: [],
    };
    result[item.tx_hash].events[item.event_index] = {
      ...result[item.tx_hash].events[item.event_index],
      type: item.event_type,
      [item.event_key]: tryParse(item.event_value),
    };
  }

  return Object.values(result).map((tx) => {
    const events = tx.events.filter((e) => !!e);

    // If a preferred event type is specified, filter events to only include that type
    // and set the 'event' property to the first event of that type
    if (preferredEventType) {
      const filteredEvents = events.filter(
        (e) => (e as any).type === preferredEventType,
      );
      return {
        ...tx,
        events: filteredEvents,
        event: filteredEvents.length > 0 ? filteredEvents[0] : events[0],
      };
    }

    return {
      ...tx,
      events,
      event: events[0],
    };
  });
}

function getValidAddress(address: string) {
  try {
    return ethers.getAddress(address);
  } catch (_error) {
    throw new Error(
      'Invalid address format, expected a valid Ethereum address',
    );
  }
}

export default class StakingDAO {
  databaseConnection: DatabaseConnectionReplica;
  private singleQueryCounter = 0;
  private batchQueryCounter = 0;
  private skippedQueryCounter = 0;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
  }

  // Method to get and reset counters for logging
  getQueryCounters() {
    const counters = {
      singleQueries: this.singleQueryCounter,
      batchQueries: this.batchQueryCounter,
      skippedQueries: this.skippedQueryCounter,
    };
    return counters;
  }

  // Reset counters for next set of operations
  resetQueryCounters() {
    this.singleQueryCounter = 0;
    this.batchQueryCounter = 0;
    this.skippedQueryCounter = 0;
  }

  averageTimeDifferenceInSeconds(dates: Date[]) {
    if (dates.length < 2) return 0;
    const timestamps = dates
      .map((date) => date.getTime())
      .sort((a, b) => b - a);
    let totalDiff = 0;
    for (let i = 1; i < timestamps.length; i++) {
      totalDiff += timestamps[i - 1] - timestamps[i];
    }
    const avgDiffInMilliseconds = totalDiff / (timestamps.length - 1);
    return avgDiffInMilliseconds / 1000;
  }

  async getLastCommittedBlock(): Promise<
    CommitQueryItem & { commit_period: number }
  > {
    const blocks = await this.databaseConnection.query(
      `SELECT
          ca.value as cosmos_block_number,
          cl."timestamp" as timestamp,
          cl.tx_hash as tx_hash,
          cl.block_height as eth_block_height
        FROM
          indexer.contract_l1_logs cl
        JOIN
          indexer.contract_l1_args ca
          ON ca.contract_l1_log_id = cl._id
          AND ca."key" = 'blockNumber'
        ORDER BY
          cl."timestamp" desc
        LIMIT 10`,
      [],
    );
    const diff = this.averageTimeDifferenceInSeconds(
      blocks.map((block) => block.timestamp),
    );
    return {
      commit_period: diff,
      timestamp: blocks[0].timestamp,
      tx_hash: blocks[0].tx_hash,
      eth_block_height: blocks[0].eth_block_height,
      cosmos_block_number: blocks[0].cosmos_block_number,
    };
  }

  async blockIsSynced(blockHeight: number) {
    const [blockIsSynced] = await this.databaseConnection.query(
      `SELECT
        cr.block_height as block_height
      FROM
        indexer.cosmos_events ce2
        JOIN indexer.cosmos_responses cr ON cr._id = ce2.cosmos_response_id
      WHERE
        ce2."type" = 'fuelsequencer.bridge.EventEthereumBlockSynced'
        AND ce2."key" = 'block_number'
        AND CAST(TRIM(BOTH '"' FROM ce2."value") AS INT) > $1
      LIMIT 1`,
      [blockHeight],
    );
    return blockIsSynced ? blockIsSynced.block_height > 0 : false;
  }

  async cosmos_queryEvents<T = any>(
    blockHeight: number,
    eventsQuery: Array<{
      type: string;
      key: string;
      value: string;
    }>,
  ) {
    // Increment counter for single queries
    this.singleQueryCounter++;

    // console.log(
    //   `[StakingDAO] Querying SINGLE block ${blockHeight} with ${eventsQuery.length} event queries (Total single queries: ${this.singleQueryCounter})`,
    // );

    const whereClause = eventsQuery
      .map(
        (eventQuery) => `
      (
        ce3."type" = '${eventQuery.type}'
        AND ce3."key" = '${eventQuery.key}'
        AND LOWER(ce3."value") = LOWER('${eventQuery.value}')
      )`,
      )
      .join(' OR ');
    const whereClauseType = eventsQuery
      .map((eventQuery) => `ce."type" = '${eventQuery.type}'`)
      .join(' OR ');
    const events: Array<QueryItem> = await this.databaseConnection.query(
      `SELECT
          cr._id AS id,
          cr.tx_hash AS tx_hash,
          cr.block_height AS block_height,
          cr.timestamp AS timestamp,
          ce.index AS event_index,
          ce.type AS event_type,
          ce.key AS event_key,
          ce.value AS event_value
        FROM 
          indexer.cosmos_responses cr
        JOIN
          indexer.cosmos_events ce
          ON ce.cosmos_response_id = cr._id
          AND (
            ${whereClauseType}
          )
        WHERE
          cr.block_height IN (
            SELECT
              cr.block_height
            FROM
              indexer.cosmos_events ce2
            JOIN
              indexer.cosmos_responses cr
              ON cr._id = ce2.cosmos_response_id
            WHERE
              ce2."type" = 'fuelsequencer.bridge.EventEthereumBlockSynced'
              AND ce2."key" = 'block_number'
              AND ce2."value" = $1
          )
          AND cr._id IN (
            SELECT
              ce3.cosmos_response_id
            FROM
              indexer.cosmos_events ce3
            WHERE
              ${whereClause}
          )
        ORDER BY cr._id, ce.index`,
      [`"${blockHeight}"`],
    );

    if (events.length === 0) {
      return [];
    }

    // Pass the preferred event type when there's only one query type
    const preferredEventType =
      eventsQuery.length === 1 ? eventsQuery[0].type : undefined;
    return normalizeCosmosQueryResponse<T>(events, preferredEventType);
  }

  async cosmos_queryEventsMultipleBlocks<T = any>(
    blockHeights: number[],
    eventsQueries: Array<{
      type: string;
      key: string;
      value: string;
      queryId?: string; // Optional identifier to distinguish between different queries
    }>,
  ) {
    // Increment counter for batch queries
    this.batchQueryCounter++;

    // console.log(
    //   `[StakingDAO] Querying MULTIPLE blocks (${blockHeights.length} blocks) with ${eventsQueries.length} event queries (Total batch queries: ${this.batchQueryCounter})`,
    // );

    if (blockHeights.length === 0 || eventsQueries.length === 0) {
      return {};
    }

    const whereClause = eventsQueries
      .map(
        (eventQuery) => `
      (
        ce3."type" = '${eventQuery.type}'
        AND ce3."key" = '${eventQuery.key}'
        AND LOWER(ce3."value") = LOWER('${eventQuery.value}')
      )`,
      )
      .join(' OR ');

    // Create placeholders for block heights with proper formatting
    const blockHeightsPlaceholders = blockHeights
      .map((_, index) => `$${index + 1}`)
      .join(',');
    const blockHeightsValues = blockHeights.map((height) => `"${height}"`);

    // First, get all cosmos blocks associated with the Ethereum blocks
    const ethToCosmosBlocks: Record<number, number[]> = {};

    // Initialize with empty arrays for each Ethereum block
    for (const blockHeight of blockHeights) {
      ethToCosmosBlocks[blockHeight] = [];
    }

    // Query for all cosmos blocks that contain these Ethereum blocks
    const cosmosBlocksForEthBlocks = await this.databaseConnection.query(
      `SELECT DISTINCT
          cr.block_height AS cosmos_block_height,
          CAST(TRIM(BOTH '"' FROM ce2.value) AS INT) AS eth_block_height
        FROM 
          indexer.cosmos_responses cr
        JOIN
          indexer.cosmos_events ce2
          ON ce2.cosmos_response_id = cr._id
          AND ce2."type" = 'fuelsequencer.bridge.EventEthereumBlockSynced'
          AND ce2."key" = 'block_number'
          AND ce2."value" IN (${blockHeightsPlaceholders})
        ORDER BY cr.block_height`,
      blockHeightsValues,
    );

    // Populate the mapping
    for (const mapping of cosmosBlocksForEthBlocks) {
      const ethBlock = mapping.eth_block_height;
      const cosmosBlock = mapping.cosmos_block_height;

      if (!ethToCosmosBlocks[ethBlock]) {
        ethToCosmosBlocks[ethBlock] = [];
      }

      ethToCosmosBlocks[ethBlock].push(cosmosBlock);
    }

    // Log the relationship between Ethereum and Cosmos blocks
    // console.log(
    //   '[StakingDAO] Ethereum->Cosmos block mappings:',
    //   Object.entries(ethToCosmosBlocks)
    //     .map(([eth, cosmos]) => `${eth}->[${cosmos.join(', ')}]`)
    //     .join('; '),
    // );

    // Now query for all the cosmos_response_ids that match our event types
    // For each of the cosmos blocks we found above
    const cosmosBlocks = Object.values(ethToCosmosBlocks).flat();

    if (cosmosBlocks.length === 0) {
      // console.log(
      //   '[StakingDAO] No cosmos blocks found for the ethereum blocks',
      // );
      return {};
    }

    const cosmosBlocksPlaceholders = cosmosBlocks
      .map((_, index) => `$${index + 1}`)
      .join(',');

    const matchedResponseIds = await this.databaseConnection.query(
      `SELECT DISTINCT
          cr._id AS response_id,
          cr.block_height AS cosmos_block_height,
          ce3.type AS event_type,
          CASE
            ${eventsQueries
              .map(
                (eq) =>
                  `WHEN ce3."type" = '${eq.type}' AND ce3."key" = '${eq.key}' THEN '${eq.queryId || eq.type}'`,
              )
              .join('\n            ')}
          END AS query_type
        FROM 
          indexer.cosmos_responses cr
        JOIN
          indexer.cosmos_events ce3
          ON ce3.cosmos_response_id = cr._id
          AND (${whereClause})
        WHERE
          cr.block_height IN (${cosmosBlocksPlaceholders})
        ORDER BY cr._id`,
      cosmosBlocks,
    );

    if (matchedResponseIds.length === 0) {
      // console.log('[StakingDAO] No matching events found in cosmos blocks');
      return {};
    }

    // Group response IDs by query type and store event types
    const responseIdsByQueryType: Record<
      string,
      { ids: number[]; eventType: string }
    > = {};

    // Create a reverse mapping from cosmos blocks to ethereum blocks
    const cosmosToEthBlocks: Record<number, number[]> = {};

    // Build the reverse mapping
    for (const [ethBlock, cosmosBlocks] of Object.entries(ethToCosmosBlocks)) {
      const ethNum = Number.parseInt(ethBlock, 10);
      for (const cosmosBlock of cosmosBlocks) {
        if (!cosmosToEthBlocks[cosmosBlock]) {
          cosmosToEthBlocks[cosmosBlock] = [];
        }
        cosmosToEthBlocks[cosmosBlock].push(ethNum);
      }
    }

    // Process each matched response
    for (const match of matchedResponseIds) {
      if (match.query_type) {
        // Store response info by query type
        responseIdsByQueryType[match.query_type] = responseIdsByQueryType[
          match.query_type
        ] || {
          ids: [],
          eventType: match.event_type,
        };
        responseIdsByQueryType[match.query_type].ids.push(match.response_id);
      }
    }

    // Now fetch ALL events for these response IDs, not just the ones matching our criteria
    const result: Record<string, any> = {};

    for (const [queryType, queryData] of Object.entries(
      responseIdsByQueryType,
    )) {
      if (queryData.ids.length === 0) continue;

      const idPlaceholders = queryData.ids
        .map((_, idx) => `$${idx + 1}`)
        .join(',');

      const events: Array<QueryItem> = await this.databaseConnection.query(
        `SELECT
            cr._id AS id,
            cr.tx_hash AS tx_hash,
            cr.block_height AS block_height,
            cr.timestamp AS timestamp,
            ce.index AS event_index,
            ce.type AS event_type,
            ce.key AS event_key,
            ce.value AS event_value
          FROM 
            indexer.cosmos_responses cr
          JOIN
            indexer.cosmos_events ce
            ON ce.cosmos_response_id = cr._id
          WHERE
            cr._id IN (${idPlaceholders})
          ORDER BY cr._id, ce.index`,
        queryData.ids,
      );

      if (events.length > 0) {
        // Pass the preferred event type to normalizeCosmosQueryResponse
        result[queryType] = normalizeCosmosQueryResponse<T>(
          events,
          queryData.eventType,
        );
      } else {
        result[queryType] = [];
      }
    }

    // Add the mappings to the result
    result.__ethToCosmosBlocks = ethToCosmosBlocks;
    result.__cosmosToEthBlocks = cosmosToEthBlocks;

    return result;
  }

  async processEvent(
    address: string,
    event: any,
    prefetchedData?: {
      withdrawEvents: ComosTx<WithdrawEvent>[];
      delegateEvents: ComosTx<any>[];
      undelegateEvents: ComosTx<UndelegateEvent>[];
      withdrawRewardsEvents: ComosTx<any>[];
      redelegateEvents: ComosTx<any>[];
      lastCommittedBlock: CommitQueryItem & { commit_period: number };
      contractTimeToFinalizeInMinutes: number;
    },
  ) {
    const finalHistory: any[] = [];

    // Create a flexible mapping to handle different event signatures
    const eventProcessingMap: Array<{
      type: string;
      data: any;
    }> = [];

    // Handle different event signatures
    switch (event.signature) {
      case 'Authorize(address,bytes)': {
        const bytes = arrayify(event.decoded_args.data);
        const eventDecoded = fuelsequencer.bridge.AuthorizeTx.decode(bytes);

        // For Authorize events, decode messages immediately and add to processing map
        for (const message of eventDecoded.messages) {
          let decodedData;
          switch (message.typeUrl) {
            case DecodersTypes.MsgDelegate:
              decodedData = MsgDelegate.decode(message.value);
              break;
            case DecodersTypes.MsgUndelegate:
              decodedData = MsgUndelegate.decode(message.value);
              break;
            case DecodersTypes.MsgBeginRedelegate:
              decodedData = MsgBeginRedelegate.decode(message.value);
              break;
            case DecodersTypes.MsgWithdrawDelegatorReward:
              decodedData = MsgWithdrawDelegatorReward.decode(message.value);
              break;
            case DecodersTypes.MsgWithdrawToEthereum:
              decodedData = MsgWithdrawToEthereum.decode(message.value);
              break;
            default:
              continue; // Skip unknown message types
          }

          eventProcessingMap.push({
            type: message.typeUrl,
            data: decodedData,
          });
        }
        break;
      }
      case 'Delegate(address,address,uint256)': {
        eventProcessingMap.push({
          type: DecodersTypes.MsgDelegate,
          data: {
            delegatorAddress: event.decoded_args.delegator,
            validatorAddress: event.decoded_args.validator,
            amount: {
              amount: event.decoded_args.amount,
            },
          },
        });
        break;
      }
      case 'Redelegate(address,address,address,uint256)': {
        eventProcessingMap.push({
          type: DecodersTypes.MsgBeginRedelegate,
          data: {
            delegatorAddress: event.decoded_args.delegator,
            validatorSrcAddress: event.decoded_args.srcValidator,
            validatorDstAddress: event.decoded_args.dstValidator,
            amount: {
              amount: event.decoded_args.amount,
            },
          },
        });
        break;
      }
      case 'ClaimRewards(address,address)': {
        eventProcessingMap.push({
          type: DecodersTypes.MsgWithdrawDelegatorReward,
          data: {
            delegatorAddress: event.decoded_args.delegator,
            validatorAddress: event.decoded_args.validator,
          },
        });
        break;
      }
      case 'Unbond(address,address,uint256)': {
        eventProcessingMap.push({
          type: DecodersTypes.MsgUndelegate,
          data: {
            delegatorAddress: event.decoded_args.delegator,
            validatorAddress: event.decoded_args.validator,
            amount: {
              amount: event.decoded_args.amount,
            },
          },
        });
        break;
      }
      case 'Withdraw(address,address,uint256)': {
        eventProcessingMap.push({
          type: DecodersTypes.MsgWithdrawToEthereum,
          data: {
            from: event.decoded_args.sender,
            to: event.decoded_args.recipient,
            amount: {
              amount: event.decoded_args.amount,
            },
          },
        });
        break;
      }
      default:
        console.log(`Unknown event signature: ${event.signature}`);
        return finalHistory;
    }

    // Process each item in the mapping
    for (const item of eventProcessingMap) {
      switch (item.type) {
        case DecodersTypes.MsgDelegate: {
          finalHistory.push(
            await this.createDelegateHistory(
              address,
              event,
              item.data,
              prefetchedData?.delegateEvents,
            ),
          );
          break;
        }
        case DecodersTypes.MsgUndelegate: {
          finalHistory.push(
            await this.createUndelegateHistory(
              address,
              event,
              item.data,
              prefetchedData?.undelegateEvents,
            ),
          );
          break;
        }
        case DecodersTypes.MsgBeginRedelegate: {
          finalHistory.push(
            await this.createRedelegateHistory(
              address,
              event,
              item.data,
              prefetchedData?.redelegateEvents,
            ),
          );
          break;
        }
        case DecodersTypes.MsgWithdrawDelegatorReward: {
          finalHistory.push(
            await this.createClaimRewardsHistory(
              address,
              event,
              item.data,
              prefetchedData?.withdrawRewardsEvents,
            ),
          );
          break;
        }
        case DecodersTypes.MsgWithdrawToEthereum: {
          finalHistory.push(
            await this.createWithdrawHistory(
              address,
              event,
              item.data,
              prefetchedData?.withdrawEvents,
              prefetchedData?.lastCommittedBlock,
              prefetchedData?.contractTimeToFinalizeInMinutes,
            ),
          );
          break;
        }
      }
    }
    return finalHistory;
  }

  async createWithdrawHistory(
    address: string,
    event: SequencerEventItem,
    withdraw: Param<DecodersTypes.MsgWithdrawToEthereum>,
    prefetchedWithdrawEvents?: ComosTx<WithdrawEvent>[],
    prefetchedLastCommittedBlock?: CommitQueryItem & { commit_period: number },
    prefetchedContractTimeToFinalizeInMinutes?: number,
  ): Promise<WithdrawResponse> {
    const contractTimeToFinalizeInMinutes =
      prefetchedContractTimeToFinalizeInMinutes || (await getTimeToFinalize());

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

    // Use prefetched events if available, otherwise query the database
    let withdrawEvents: ComosTx<WithdrawEvent>[] = [];
    if (prefetchedWithdrawEvents) {
      this.skippedQueryCounter++;
      // console.log(
      //   `[StakingDAO] SKIPPING single cosmos_queryEvents call - using prefetched data for withdraw event at block ${event.block_height} (Total skipped: ${this.skippedQueryCounter})`,
      // );
      withdrawEvents = prefetchedWithdrawEvents;
    } else {
      // console.log(
      //   `[StakingDAO] NO prefetched data available - making single cosmos_queryEvents call for withdraw event at block ${event.block_height}`,
      // );
      withdrawEvents = await this.cosmos_queryEvents<WithdrawEvent>(
        event.block_height,
        [
          {
            key: 'from',
            type: 'fuelsequencer.bridge.EventWithdrawToEthereumReported',
            value: `"${address.toLowerCase()}"`,
          },
        ],
      );
    }

    // Transaction sent but not synced with sequencer
    if (withdrawEvents.length === 0) {
      const blockIsSynced = await this.blockIsSynced(event.block_height);
      if (blockIsSynced) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    // TODO: once we treat multiple events per tx, we need to find the right one
    const lastestCommittedBlock =
      prefetchedLastCommittedBlock || (await this.getLastCommittedBlock());
    const withdrawSequencerTX = withdrawEvents[0];

    // updates previous status with the tx that completed it
    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: withdrawSequencerTX.height,
        txHash: withdrawSequencerTX.txHash,
        timestamp: withdrawSequencerTX.timestamp,
      },
    };

    // move to new status and update its information
    data.status = WithdrawStatusType.WaitingCommittingToL1;
    data.statusInfo[WithdrawStatusType.WaitingCommittingToL1] = {
      dateExpectedToComplete: dayjs(lastestCommittedBlock.timestamp)
        .add(lastestCommittedBlock.commit_period, 'seconds')
        .toDate(),
    };

    // Ensure that the event property contains the expected values
    if (withdrawSequencerTX.event && 'nonce' in withdrawSequencerTX.event) {
      data.nonce = withdrawSequencerTX.event.nonce;
    }

    // now that sequencer computed the initial ethTx, we can more precisely estimate the time to finalize
    data.timestampToFinish = dayjs(withdrawSequencerTX.timestamp)
      .add(lastestCommittedBlock.commit_period, 'seconds')
      .add(contractTimeToFinalizeInMinutes, 'minutes')
      .toDate()
      .toISOString();

    const blockCommmiteds: Array<CommitQueryItem> =
      await this.databaseConnection.query(
        `SELECT
          ca.value as cosmos_block_number,
          cl."timestamp" as timestamp,
          cl.tx_hash as tx_hash,
          cl.block_height as eth_block_height
        FROM
          indexer.contract_l1_logs cl
        JOIN
          indexer.contract_l1_args ca
          ON ca.contract_l1_log_id = cl._id
          AND ca."key" = 'blockNumber'
          AND CAST(ca."value" AS INT) >= $1
        ORDER BY cl."timestamp" ASC
        LIMIT 1`,
        [withdrawSequencerTX.height],
      );
    const [blockCommited] = blockCommmiteds;
    if (blockCommmiteds.length === 0) {
      return data;
    }

    // updates previous status with the tx that completed it
    data.statusInfo[WithdrawStatusType.WaitingCommittingToL1] = {
      ethTx: {
        height: blockCommited.eth_block_height,
        txHash: blockCommited.tx_hash,
        timestamp: blockCommited.timestamp,
      },
    };

    // move to new status and update its information
    data.status = WithdrawStatusType.WaitingFinalization;
    data.statusInfo[WithdrawStatusType.WaitingFinalization] = {
      dateExpectedToComplete: dayjs(blockCommited.timestamp)
        .add(contractTimeToFinalizeInMinutes, 'minutes')
        .toDate(),
    };

    // now that sequencer block is commited to L1, we can more precisely estimate the time to finalize
    data.timestampToFinish = dayjs(blockCommited.timestamp)
      .add(contractTimeToFinalizeInMinutes, 'minutes')
      .toDate()
      .toISOString();

    // Check if the finalization period has passed based on timestampToFinish
    if (dayjs().isAfter(dayjs(data.timestampToFinish))) {
      // move to new status and update its information
      data.status = WithdrawStatusType.ReadyToProcessWithdraw;
      data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] = {
        proof: `fetch-proof?nonce=${data.nonce}`,
      };
    }

    const [withdrawFinalized]: Array<ProccessedWithdrawQueryItem> =
      await this.databaseConnection.query(
        `select
        cl.block_height as block_height,
        cl."timestamp" as timestamp,
        cl.tx_hash as tx_hash
      from
        indexer.contract_l1_logs cl
      join
        indexer.contract_l1_args ca
        ON ca.contract_l1_log_id = cl._id
        AND ca."key" = 'nonce'
        AND ca."value" = $1
      where
        event = 'WithdrawalProcessed'`,
        [data.nonce],
      );

    if (withdrawFinalized) {
      // updates previous status with the tx that completed it
      data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] = {
        ...data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw],
        ethTx: {
          height: withdrawFinalized.block_height,
          txHash: withdrawFinalized.tx_hash,
          timestamp: withdrawFinalized.timestamp,
        },
      };

      // move to new status and update its information
      data.status = BaseStatusType.Finalized;
      data.statusInfo[BaseStatusType.Finalized] = {};
    }

    return data;
  }

  async createDelegateHistory(
    address: string,
    event: SequencerEventItem,
    delegate: Param<DecodersTypes.MsgDelegate>,
    prefetchedDelegateEvents?: ComosTx<any>[],
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

    // Use prefetched events if available, otherwise query the database
    let delegateTX;
    if (prefetchedDelegateEvents && prefetchedDelegateEvents.length > 0) {
      this.skippedQueryCounter++;
      // console.log(
      //   `[StakingDAO] SKIPPING single cosmos_queryEvents call - using prefetched data for delegate event at block ${event.block_height} (Total skipped: ${this.skippedQueryCounter})`,
      // );
      delegateTX = prefetchedDelegateEvents[0];
    } else {
      // console.log(
      //   `[StakingDAO] NO prefetched data available - making single cosmos_queryEvents call for delegate event at block ${event.block_height}`,
      // );
      [delegateTX] = await this.cosmos_queryEvents(event.block_height, [
        {
          key: 'delegator',
          type: 'delegate',
          value: address.toLowerCase(),
        },
      ]);
    }

    if (!delegateTX) {
      const blockIsSynced = await this.blockIsSynced(event.block_height);
      if (blockIsSynced) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    // updates previous status with the tx that completed it
    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: delegateTX.height,
        txHash: delegateTX.txHash,
        timestamp: delegateTX.timestamp,
      },
    };

    // move to new status and update its information
    data.status = BaseStatusType.Finalized;
    data.statusInfo[BaseStatusType.Finalized] = {};
    return data;
  }

  async createRedelegateHistory(
    address: string,
    event: SequencerEventItem,
    delegate: Param<DecodersTypes.MsgBeginRedelegate>,
    prefetchedRedelegateEvents?: ComosTx<any>[],
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

    // Use prefetched events if available, otherwise query the database
    let redelegateTX;
    if (prefetchedRedelegateEvents && prefetchedRedelegateEvents.length > 0) {
      this.skippedQueryCounter++;
      // console.log(
      //   `[StakingDAO] SKIPPING single cosmos_queryEvents call - using prefetched data for redelegate event at block ${event.block_height} (Total skipped: ${this.skippedQueryCounter})`,
      // );
      // Note: For redelegate, we check the tx hash rather than delegate type
      const txHash =
        data.statusInfo[BaseStatusType.TransactionSent]?.ethTx?.txHash || '';
      redelegateTX = prefetchedRedelegateEvents.find(
        (evt) => evt.txHash === txHash,
      );
    } else {
      // console.log(
      //   `[StakingDAO] NO prefetched data available - making single cosmos_queryEvents call for redelegate event at block ${event.block_height}`,
      // );
      [redelegateTX] = await this.cosmos_queryEvents(event.block_height, [
        {
          type: 'redelegate',
          key: 'destination_validator',
          value: delegate.validatorDstAddress,
        },
        {
          type: 'withdraw_rewards',
          key: 'delegator',
          value: sequencerAddress!,
        },
      ]);
    }

    if (!redelegateTX) {
      const blockIsSynced = await this.blockIsSynced(event.block_height);
      if (blockIsSynced) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    // updates previous status with the tx that completed it
    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: redelegateTX.height,
        txHash: redelegateTX.txHash,
        timestamp: redelegateTX.timestamp,
      },
    };

    // move to new status and update its information
    data.status = BaseStatusType.Finalized;
    data.statusInfo[BaseStatusType.Finalized] = {};

    return data;
  }

  async createClaimRewardsHistory(
    address: string,
    event: SequencerEventItem,
    claimRewards: Param<DecodersTypes.MsgWithdrawDelegatorReward>,
    prefetchedWithdrawRewardsEvents?: ComosTx<any>[],
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

    // Use prefetched events if available, otherwise query the database
    let claimRewardsTX;
    if (
      prefetchedWithdrawRewardsEvents &&
      prefetchedWithdrawRewardsEvents.length > 0
    ) {
      this.skippedQueryCounter++;
      // console.log(
      //   `[StakingDAO] SKIPPING single cosmos_queryEvents call - using prefetched data for claim rewards event at block ${event.block_height} (Total skipped: ${this.skippedQueryCounter})`,
      // );
      claimRewardsTX = prefetchedWithdrawRewardsEvents[0];
    } else {
      // console.log(
      //   `[StakingDAO] NO prefetched data available - making single cosmos_queryEvents call for claim rewards event at block ${event.block_height}`,
      // );
      [claimRewardsTX] = await this.cosmos_queryEvents(event.block_height, [
        {
          type: 'withdraw_rewards',
          key: 'delegator',
          value: sequencerAddress!,
        },
      ]);
    }

    if (!claimRewardsTX) {
      const blockIsSynced = await this.blockIsSynced(event.block_height);
      if (blockIsSynced) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    // updates previous status with the tx that completed it
    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: claimRewardsTX.height,
        txHash: claimRewardsTX.txHash,
        timestamp: claimRewardsTX.timestamp,
      },
    };

    // move to new status and update its information
    data.status = BaseStatusType.Finalized;
    data.statusInfo[BaseStatusType.Finalized] = {};

    return data;
  }

  async createUndelegateHistory(
    address: string,
    event: SequencerEventItem,
    undelegate: Param<DecodersTypes.MsgUndelegate>,
    prefetchedUndelegateEvents?: ComosTx<UndelegateEvent>[],
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

    // Use prefetched events if available, otherwise query the database
    let undelegateTX;
    if (prefetchedUndelegateEvents && prefetchedUndelegateEvents.length > 0) {
      this.skippedQueryCounter++;
      // console.log(
      //   `[StakingDAO] SKIPPING single cosmos_queryEvents call - using prefetched data for undelegate event at block ${event.block_height} (Total skipped: ${this.skippedQueryCounter})`,
      // );
      undelegateTX = prefetchedUndelegateEvents[0];
    } else {
      // console.log(
      //   `[StakingDAO] NO prefetched data available - making single cosmos_queryEvents call for undelegate event at block ${event.block_height}`,
      // );
      [undelegateTX] = await this.cosmos_queryEvents<UndelegateEvent>(
        event.block_height,
        [
          {
            type: 'unbond',
            key: 'delegator',
            value: address.toLowerCase(),
          },
        ],
      );
    }

    if (!undelegateTX) {
      const blockIsSynced = await this.blockIsSynced(event.block_height);
      if (blockIsSynced) {
        data.status = BaseStatusType.Skipped;
        data.statusInfo[BaseStatusType.Skipped] = {
          message:
            'Event was sent but not synced with sequencer due to be invalid',
        };
      }
      return data;
    }

    // updates previous status with the tx that completed it
    data.statusInfo[BaseStatusType.WaitingSync] = {
      ...data.statusInfo[BaseStatusType.WaitingSync],
      sequencerTx: {
        height: undelegateTX.height,
        txHash: undelegateTX.txHash,
        timestamp: undelegateTX.timestamp,
      },
    };

    // move to new status and update its information
    data.status = UndelegateStatusType.WaitingUnbonding;
    const dateToComplete = dayjs(undelegateTX.event.completion_time).toDate();
    data.statusInfo[UndelegateStatusType.WaitingUnbonding] = {
      dateExpectedToComplete: dateToComplete,
    };

    // now that sequencer computed the initial ethTx, we can more precisely estimate the time to finalize unbondiong
    data.timestampToFinish = dateToComplete.toISOString();

    if (dayjs(undelegateTX.event.completion_time).isBefore(Date.now())) {
      data.status = BaseStatusType.Finalized;
      data.statusInfo[BaseStatusType.Finalized] = {};
    }

    return data;
  }

  async eth_queryEvents(
    address: string,
    paginatedParams: PaginatedParams,
  ): Promise<any> {
    const direction = paginatedParams.direction === 'before' ? '<' : '>';
    const order = paginatedParams.direction === 'before' ? 'desc' : 'asc';
    const events: Array<SequencerEventItem> =
      await this.databaseConnection.query(
        `select
          log.tx_hash,
          log.signature,
          log._id,
          log.block_height,
          log.decoded_args,
          log.timestamp
        from
          indexer.contract_l1_logs log
        where
          (
            (
              log._id in (
                select
                  distinct contract_l1_log_id
                from
                  indexer.contract_l1_args
                where
                  key = 'sender' and
                  value = $1
              ) and
              signature IN ('Authorize(address,bytes)', 'Withdraw(address,address,uint256)')
            ) OR
            (
              log._id in (
                select
                  distinct contract_l1_log_id
                from
                  indexer.contract_l1_args
                where
                  key = 'delegator' and
                  value = $1
              ) and
              signature IN ('Delegate(address,address,uint256)', 'Redelegate(address,address,address,uint256)', 'ClaimRewards(address,address)', 'Unbond(address,address,uint256)')
            )
          ) and
          ($2::integer is null or log._id ${direction} $2)
        order by 
          log.block_height ${order}
        limit $3
        `,
        [address, paginatedParams.cursor, paginatedParams.last],
      );

    events.sort((a: any, b: any) => {
      return b._id - a._id;
    });

    if (events.length === 0) {
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
    const startCursor = events[0]._id;
    const endCursor = events[events.length - 1]._id;
    const hasPreviousPage = (
      await this.databaseConnection.query(
        `
			select exists(
				select
					1
				from
					indexer.contract_l1_logs log
				where
					(
						(
							log._id in (
								select
									distinct contract_l1_log_id
								from
									indexer.contract_l1_args
								where
									key = 'sender' and
									value = $1
							) and
							signature IN ('Authorize(address,bytes)', 'Withdraw(address,address,uint256)')
						) OR
						(
							log._id in (
								select
									distinct contract_l1_log_id
								from
									indexer.contract_l1_args
								where
									key = 'delegator' and
									value = $1
							) and
							signature IN ('Delegate(address,address,uint256)', 'Redelegate(address,address,address,uint256)', 'ClaimRewards(address,address)', 'Unbond(address,address,uint256)')
						)
					) and
					log._id < $2)
		`,
        [address, endCursor],
      )
    )[0].exists;
    const hasNextPage = (
      await this.databaseConnection.query(
        `
			select exists(
				select
					1
				from
					indexer.contract_l1_logs log
				where
					(
						(
							log._id in (
								select
									distinct contract_l1_log_id
								from
									indexer.contract_l1_args
								where
									key = 'sender' and
									value = $1
							) and
							signature IN ('Authorize(address,bytes)', 'Withdraw(address,address,uint256)')
						) OR
						(
							log._id in (
								select
									distinct contract_l1_log_id
								from
									indexer.contract_l1_args
								where
									key = 'delegator' and
									value = $1
							) and
							signature IN ('Delegate(address,address,uint256)', 'Redelegate(address,address,address,uint256)', 'ClaimRewards(address,address)', 'Unbond(address,address,uint256)')
						)
					) and
					log._id > $2)
		`,
        [address, startCursor],
      )
    )[0].exists;
    return {
      nodes: events,
      edges: [],
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
  }

  async eth_queryEvent(eventId: number): Promise<any> {
    const [event] = await this.databaseConnection.query(
      `
		select
      log.tx_hash,
      log.signature,
      log._id,
      log.block_height,
      log.decoded_args,
      log.timestamp,
      arg.value
		from
			indexer.contract_l1_logs log
			left join indexer.contract_l1_args arg on (
        log._id = arg.contract_l1_log_id and 
        (
          (arg.key = 'sender' and log.signature IN ('Authorize(address,bytes)', 'Withdraw(address,address,uint256)')) OR
          (arg.key = 'delegator' and log.signature IN ('Delegate(address,address,uint256)', 'Redelegate(address,address,address,uint256)', 'ClaimRewards(address,address)', 'Unbond(address,address,uint256)'))
        )
      )
		where
			log._id = $1
		and
			log.signature IN ('Authorize(address,bytes)', 'Delegate(address,address,uint256)', 'Redelegate(address,address,address,uint256)', 'ClaimRewards(address,address)', 'Unbond(address,address,uint256)', 'Withdraw(address,address,uint256)')
        `,
      [eventId],
    );
    return event;
  }

  async getEvents(rawAddress: string, paginatedParams: PaginatedParams) {
    // Reset counters at start of new event query
    this.resetQueryCounters();

    const address = getValidAddress(rawAddress);
    const events = await this.eth_queryEvents(address, paginatedParams);

    // Extract all block heights from events for batched query
    const blockHeights = events.nodes.map((event: any) => event.block_height);

    const sequencerAddress = convertEthAddressToSequencerUserAddress(address);

    // Build the queries array with all event types we need to fetch
    const eventsQueries = [
      {
        key: 'from',
        type: 'fuelsequencer.bridge.EventWithdrawToEthereumReported',
        value: `"${address.toLowerCase()}"`,
        queryId: 'withdraw',
      },
      {
        key: 'delegator',
        type: 'delegate',
        value: address.toLowerCase(),
        queryId: 'delegate',
      },
      {
        type: 'unbond',
        key: 'delegator',
        value: address.toLowerCase(),
        queryId: 'undelegate',
      },
    ];

    // Add withdraw rewards query if sequencer address exists
    if (sequencerAddress) {
      eventsQueries.push({
        type: 'withdraw_rewards',
        key: 'delegator',
        value: sequencerAddress,
        queryId: 'withdraw_rewards',
      });
    }

    // Pre-fetch all event types in a single query
    const [
      allEventsResult,
      lastCommittedBlock,
      contractTimeToFinalizeInMinutes,
    ] = await Promise.all([
      this.cosmos_queryEventsMultipleBlocks(blockHeights, eventsQueries),
      this.getLastCommittedBlock(),
      getTimeToFinalize(),
    ]);

    // Extract individual event types
    const withdrawEvents = allEventsResult.withdraw || [];
    const delegateEvents = allEventsResult.delegate || [];
    const undelegateEvents = allEventsResult.undelegate || [];
    const withdrawRewardsEvents = allEventsResult.withdraw_rewards || [];

    // Extract the mapping from Ethereum block to Cosmos blocks
    const ethToCosmosBlocks = allEventsResult.__ethToCosmosBlocks || {};

    // Store all events by their cosmos block height for easy lookup
    const cosmosBlockToEvents = new Map<number, any[]>();

    // Process all events and organize them by Cosmos block height
    const allEventsArray = [
      ...withdrawEvents,
      ...delegateEvents,
      ...undelegateEvents,
      ...withdrawRewardsEvents,
    ];

    for (const event of allEventsArray) {
      const cosmosHeight =
        typeof event.height === 'string'
          ? Number.parseInt(event.height, 10)
          : event.height;

      if (!cosmosBlockToEvents.has(cosmosHeight)) {
        cosmosBlockToEvents.set(cosmosHeight, []);
      }

      cosmosBlockToEvents.get(cosmosHeight)?.push(event);
    }

    // Store the prefetched data by ETHEREUM block height
    const prefetchedEventsByBlock: Record<
      number,
      {
        withdrawEvents: any[];
        delegateEvents: any[];
        undelegateEvents: any[];
        withdrawRewardsEvents: any[];
        redelegateEvents: any[];
      }
    > = {};

    // Initialize each Ethereum block with empty arrays
    for (const ethBlock of blockHeights) {
      prefetchedEventsByBlock[ethBlock] = {
        withdrawEvents: [],
        delegateEvents: [],
        undelegateEvents: [],
        withdrawRewardsEvents: [],
        redelegateEvents: [],
      };

      // Get all Cosmos blocks associated with this Ethereum block
      const cosmosBlocks = ethToCosmosBlocks[ethBlock] || [];

      // For each Cosmos block, collect all relevant events
      for (const cosmosBlock of cosmosBlocks) {
        const eventsForBlock = cosmosBlockToEvents.get(cosmosBlock) || [];

        // Process each event and add to appropriate category
        for (const event of eventsForBlock) {
          if (
            event.event?.type ===
            'fuelsequencer.bridge.EventWithdrawToEthereumReported'
          ) {
            prefetchedEventsByBlock[ethBlock].withdrawEvents.push(event);
          } else if (event.event?.type === 'delegate') {
            prefetchedEventsByBlock[ethBlock].delegateEvents.push(event);
          } else if (event.event?.type === 'unbond') {
            prefetchedEventsByBlock[ethBlock].undelegateEvents.push(event);
          } else if (event.event?.type === 'withdraw_rewards') {
            prefetchedEventsByBlock[ethBlock].withdrawRewardsEvents.push(event);
          } else if (event.event?.type === 'redelegate') {
            prefetchedEventsByBlock[ethBlock].redelegateEvents.push(event);
          }
        }
      }
    }

    // With parallel processing using Promise.all

    const historyPromises = events.nodes.map((event: any) => {
      const blockHeight = event.block_height;
      const prefetchedData = prefetchedEventsByBlock[blockHeight];
      return this.processEvent(address, event, {
        ...prefetchedData,
        lastCommittedBlock,
        contractTimeToFinalizeInMinutes,
      });
    });

    const historyResults = await Promise.all(historyPromises);

    // Directly assign flattened results to events.nodes
    events.nodes = historyResults.flat();

    return events;
  }

  async getEvent(eventId: number) {
    const event = await this.eth_queryEvent(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    const address = getValidAddress(event.value);
    const [tx] = await this.processEvent(address, event);
    return tx;
  }
}
