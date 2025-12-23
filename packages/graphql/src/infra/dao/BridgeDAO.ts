import dayjs from 'dayjs';
import { dataLength, ethers, toUtf8Bytes, zeroPadValue } from 'ethers';
import {
  Address,
  type BytesLike,
  InputMessageCoder,
  ZeroBytes32,
  arrayify,
  bn,
  concat,
  sha256,
} from 'fuels';
import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';
import {
  type BridgeResponse,
  type CommitQueryItem,
  type DepositEvent,
  DepositQueryType,
  type DepositResponse,
  DepositStatusType,
  type EventRow,
  type MessageDecoded,
  type MessageSpent,
  ResponseType,
  type WithdrawEvent,
  type WithdrawResponse,
  WithdrawStatusType,
} from './BridgeDAO.types';

// Time to finalize withdraw in days
const TIME_TO_FINALIZE_COMMIT = 7;
const TIME_TO_INCLUDE_BLOCK = 30;

// TODO: Contract changes base on the network
const BRIDGE_CONTRACT_L2_ADDRESS =
  '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471';

function getTokenId(_tokenAddress: BytesLike) {
  const tokenId: BytesLike = ZeroBytes32;
  let tokenAddress = _tokenAddress;
  if (dataLength(tokenAddress) < 32) {
    tokenAddress = zeroPadValue(tokenAddress, 32);
  }
  const subId = sha256(concat([toUtf8Bytes('1'), tokenAddress, tokenId]));
  const assetId = sha256(concat([BRIDGE_CONTRACT_L2_ADDRESS, subId]));
  return assetId;
}

export const MESSAGE_TYPES = {
  DEPOSIT: '0x0000000000000000000000000000000000000000000000000000000000000000',
  DEPOSIT_WITH_DATA:
    '0x0000000000000000000000000000000000000000000000000000000000000002',
} as const;

// This is default used on mainnet and testnet
const ETH_ASSET_ID =
  '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07';

function decodeMessageOut(bytes: string): {
  recipient: string;
  assetId: string;
  amount: string;
  ethAssetId: string;
} {
  const [recipient, tokenId, amount] = ethers.AbiCoder.defaultAbiCoder().decode(
    new Array(3).fill('bytes32'),
    arrayify(bytes).slice(4),
  );
  return {
    recipient,
    assetId: getTokenId(tokenId),
    ethAssetId: tokenId,
    amount: bn(amount).toString(),
  };
}

function decodeMessageIn(bytes: string): MessageDecoded {
  const [
    contractId,
    _messageType,
    address,
    _tokenId,
    sender,
    recipient,
    amount,
    decimals,
  ] = ethers.AbiCoder.defaultAbiCoder().decode(
    new Array(8).fill('bytes32'),
    arrayify(bytes),
  );

  return {
    address,
    assetId: getTokenId(contractId),
    sender,
    recipient,
    amount: bn(amount).toString(),
    decimals: bn(decimals).toNumber(),
  };
}

function getValidAddress(address: string) {
  try {
    return Address.fromString(address);
  } catch (_error) {
    throw new Error('Invalid address format, expected a valid FUEL address');
  }
}

export default class BridgeDAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
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

  async getLastCommits(): Promise<{
    lastCommit: CommitQueryItem;
    lastFinalizedCommit: CommitQueryItem;
    commitPeriod: number;
  }> {
    const blocks = await this.databaseConnection.query(
      `select
        cl."timestamp",
        cl.tx_hash,
        b._id as fuel_block_height,
        b.id as fuel_block_hash,
        cl.block_height as eth_block_height,
        (cl."timestamp" < (now() - interval '7 days')) as is_finalized
      from
        indexer.contract_l1_logs cl
      join
      	indexer.blocks b
      	on b.id = cl.decoded_args->>'blockHash'
      where
        cl."event" = 'CommitSubmitted' and
        cl."timestamp" > (now() - interval '10 days') and
        cl.contract_hash in (select contract_hash from indexer.contract_l1_index where name = 'FuelChainState')
      order by cl."timestamp" desc`,
      [],
    );
    const diff = this.averageTimeDifferenceInSeconds(
      blocks.map((block) => block.timestamp),
    );
    return {
      lastCommit: blocks[0],
      lastFinalizedCommit: blocks.find((b) => b.is_finalized === true),
      commitPeriod: diff,
    };
  }

  async getBlockCommit(block_height: string): Promise<{
    fuel_block_height: string;
    fuel_block_hash: string;
    eth_block_height: string;
    tx_hash: string;
    timestamp: Date;
  } | null> {
    const [block] = await this.databaseConnection.query(
      `select
        b._id as fuel_block_height,
        b.id as fuel_block_hash,
        cl.block_height as eth_block_height,
        cl.tx_hash as tx_hash,
        cl."timestamp"
      from
        indexer.blocks b
      join
        indexer.contract_l1_args ca
        on ca."key" = 'blockHash'
        and ca."value" = b.id
      join
        indexer.contract_l1_logs cl
        on cl._id = ca.contract_l1_log_id
      where
        b._id >= $1
	  order by b._id asc
      limit 1`,
      [block_height],
    );
    return block;
  }

  async blockIsSynced(blockHeight: string) {
    const [blockIsSynced] = await this.databaseConnection.query(
      `select
        b.da_height
      from
        indexer.blocks b
      where
        b.da_height >= $1
      order by b._id desc
      limit 1`,
      [blockHeight],
    );
    return blockIsSynced ? blockIsSynced.da_height > 0 : false;
  }

  async getMessageSpent(
    address: string,
    nonce: string,
  ): Promise<MessageSpent | null> {
    const [messageSpent] = await this.databaseConnection.query(
      `select
        t.tx_hash,
        t.block_id,
        t."timestamp",
        (i.data->>'nonce') as nonce
      from
        indexer.transactions_accounts t_a
      join
        indexer.inputs i
        on i.transaction_id = t_a._id
        and (i.data->>'nonce') = $1
      join
        indexer.transactions t
        on t.tx_hash = t_a.tx_hash
      where
        t_a.account_hash = $2`,
      // TODO move nonce outside jsonb
      [String(nonce), Address.fromString(address).toB256()],
    );
    return messageSpent
      ? {
          tx_hash: messageSpent.tx_hash,
          block_height: messageSpent.block_id,
          nonce: messageSpent.nonce,
          timestamp: messageSpent.timestamp,
        }
      : null;
  }

  parseWithdrawEvent(event: any): EventRow & WithdrawEvent {
    const messageId = InputMessageCoder.getMessageId({
      sender: event.sender,
      amount: bn(event.amount),
      nonce: event.nonce,
      recipient: event.recipient,
      data: event.data,
    });
    const data: EventRow & WithdrawEvent = {
      event_id: event.event_id,
      event_type: event.event_type,
      tx_hash: event.tx_id,
      block_height: event.block_id,
      timestamp: event.timestamp,
      data: event.data,
      messageId,
      sender: event.sender,
      recipient: event.recipient,
      amount: bn(event.amount).toString(),
      assetId: ETH_ASSET_ID,
      ethAssetId: ETH_ASSET_ID,
    };

    if (bn(data.amount).isZero()) {
      const { recipient, amount, assetId, ethAssetId } = decodeMessageOut(
        event.data,
      );
      data.amount = amount;
      data.recipient = recipient;
      data.assetId = assetId;
      data.ethAssetId = ethAssetId;
    }

    return data;
  }

  parseDepositEvent(event: any): EventRow & DepositEvent {
    if (event.key === 'data') {
      const data = decodeMessageIn(event.decoded_args.data);
      return {
        event_id: event.event_id,
        event_type: event.event_type,
        type: DepositQueryType.ERC_20,
        tx_hash: event.tx_hash,
        block_height: event.block_height,
        timestamp: event.timestamp,
        nonce: bn(event.decoded_args.nonce).toHex(32),
        ...data,
      };
    }
    return {
      event_id: event.event_id,
      event_type: event.event_type,
      type: DepositQueryType.ETH,
      tx_hash: event.tx_hash,
      block_height: event.block_height,
      timestamp: event.timestamp,
      nonce: bn(event.decoded_args.nonce).toHex(32),
      address: ZeroBytes32,
      assetId: ETH_ASSET_ID,
      sender: event.decoded_args.sender,
      recipient: event.decoded_args.recipient,
      amount: bn(event.decoded_args.amount).toString(),
      decimals: 9,
    };
  }

  async processDepositEvent(event: EventRow & DepositEvent) {
    const data: EventRow & DepositResponse = {
      event_id: event.event_id,
      event_type: event.event_type,
      type: ResponseType.Deposit,
      amount: event.amount,
      ethAssetId: event.address,
      assetId: event.assetId,
      from: event.sender,
      to: event.recipient,
      status: DepositStatusType.WaitingSync,
      statusInfo: {
        [DepositStatusType.TransactionSent]: {
          ethTx: {
            height: event.block_height,
            txHash: event.tx_hash,
            timestamp: event.timestamp,
          },
        },
        [DepositStatusType.WaitingSync]: {
          dateExpectedToComplete: dayjs(event.timestamp)
            .add(TIME_TO_INCLUDE_BLOCK, 'minutes')
            .toDate(),
        },
      },
    };
    const isSynced = await this.blockIsSynced(event.block_height);

    if (event.type === DepositQueryType.ERC_20) {
      const messageSpent = await this.getMessageSpent(
        event.recipient,
        event.nonce,
      );
      if (isSynced) {
        data.status = DepositStatusType.ReadyToProcessDeposit;
        data.statusInfo[DepositStatusType.ReadyToProcessDeposit] = {
          nonce: event.nonce,
        };
      }
      if (messageSpent) {
        data.status = DepositStatusType.Finalized;
        data.statusInfo[DepositStatusType.Finalized] = {};
      }
    }

    if (event.type === DepositQueryType.ETH && isSynced) {
      data.status = DepositStatusType.Finalized;
      data.statusInfo[DepositStatusType.Finalized] = {};
    }

    return data;
  }

  async processWithdrawEvent(event: EventRow & WithdrawEvent) {
    const { lastCommit, lastFinalizedCommit, commitPeriod } =
      await this.getLastCommits();
    const data: EventRow & WithdrawResponse = {
      event_id: event.event_id,
      event_type: event.event_type,
      type: ResponseType.Withdraw,
      amount: event.amount,
      ethAssetId: event.ethAssetId,
      assetId: event.assetId,
      from: event.sender,
      to: event.recipient,
      status: WithdrawStatusType.WaitingCommittingToL1,
      statusInfo: {
        [WithdrawStatusType.TransactionSent]: {
          fuelTx: {
            height: event.block_height,
            txHash: event.tx_hash,
            timestamp: event.timestamp,
          },
        },
        [WithdrawStatusType.WaitingCommittingToL1]: {
          dateExpectedToComplete: dayjs(lastCommit.timestamp)
            .add(commitPeriod, 'seconds')
            .toDate(),
        },
      },
    };
    const blockCommited = await this.getBlockCommit(event.block_height);
    if (blockCommited) {
      const dateToFinalize = dayjs(blockCommited.timestamp).add(
        TIME_TO_FINALIZE_COMMIT,
        'days',
      );
      data.status = WithdrawStatusType.WaitingFinalization;
      data.statusInfo[WithdrawStatusType.WaitingFinalization] = {
        dateExpectedToComplete: dateToFinalize.toDate(),
        ethTx: {
          height: blockCommited.eth_block_height,
          txHash: blockCommited.tx_hash,
          timestamp: blockCommited.timestamp,
        },
      };
      if (dateToFinalize.isBefore()) {
        data.status = WithdrawStatusType.ReadyToProcessWithdraw;
        data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] = {
          transactionId: event.tx_hash,
          nonce: event.messageId,
          commitBlockId: blockCommited.fuel_block_height,
          commitBlockHeight: blockCommited.fuel_block_hash,
        };
        if (
          Number(lastFinalizedCommit.fuel_block_height) >
          Number(blockCommited.fuel_block_height)
        ) {
          data.statusInfo[WithdrawStatusType.ReadyToProcessWithdraw] = {
            transactionId: event.tx_hash,
            nonce: event.messageId,
            commitBlockId: lastFinalizedCommit.fuel_block_height,
            commitBlockHeight: lastFinalizedCommit.fuel_block_hash,
          };
        }
      }
    }

    const [messageRelayed] = await this.databaseConnection.query(
      `SELECT
          cl."timestamp",
          cl.tx_hash,
          cl.block_height
        FROM
            indexer.contract_l1_logs cl
        JOIN
          indexer.contract_l1_args ca
            on ca."key" = 'messageId'
            and ca.contract_l1_log_id = cl._id
            and ca."value" = $1
        WHERE
            cl.signature = 'MessageRelayed(bytes32,bytes32,bytes32,uint64)'
        ORDER BY cl."timestamp" DESC`,
      [event.messageId],
    );
    if (messageRelayed) {
      data.status = WithdrawStatusType.Finalized;
      data.statusInfo[WithdrawStatusType.Finalized] = {
        ethTx: {
          height: messageRelayed.block_height,
          txHash: messageRelayed.tx_hash,
          timestamp: messageRelayed.timestamp,
        },
      };
    }
    return data;
  }

  async queryEvents(address: Address, limit: number, offset: number) {
    const events: Array<EventRow & DepositEvent & WithdrawEvent> =
      await this.databaseConnection.query(
        `select
        'deposit' as event_type,
        cl._id as event_id,
        cl."timestamp",
        cl.contract_hash,
        cl.block_height,
        cl.tx_hash,
        cl.decoded_args as decoded_args,
        ca."key",
        null as tx_id,
        null as block_id,
        null as contract_id,
        null as sender,
        null as nonce,
        null as amount,
        null as recipient,
        null as data
      from
        indexer.contract_l1_logs cl
      join
        indexer.contract_l1_args ca
        on ca.contract_l1_log_id = cl._id
        and ((
          ca."key" = 'recipient'
          and ca."value" = $1
        ) or (
          ca."key" = 'data'
          and ca."value" LIKE '%${address.toB256().replace('0x', '')}%'
        ))
      where
        cl.event = 'MessageSent'
        AND cl.contract_hash in (
          select ci.contract_hash from indexer.contract_l1_index ci where ci."name" in (
            'FuelMessagePortal', 'FuelERC20GatewayV4'
          )
        )
      union all
      select
        'withdraw' as event_type,
        r._id as event_id,
        t."timestamp" as timestamp,
        null as contract_hash,
        null as block_height,
        null as tx_hash,
        null as decoded_args,
        null as key,
        t.tx_hash as tx_id,
        t.block_id as block_id,
        a_c.account_hash as contract_id,
        r.receipt_sender as sender,
        r.receipt_nonce as nonce,
        r.receipt_amount as amount,
        r.receipt_recipient as recipient,
        r.receipt_data as data
      from
        indexer.transactions_accounts a_c
        join indexer.transactions t on (t.tx_hash = a_c.tx_hash)
        join indexer.receipts r on (r.tx_hash = t.tx_hash)
      where
        a_c.account_hash = $1 and
        r.receipt_type = 'MESSAGE_OUT'
      order by timestamp desc
      limit $2
      offset $3
      `,
        [address.toB256(), limit, offset],
      );
    return events;
  }

  async queryLogsForRecipient(
    address: string,
    recipient: string,
    predicate: string,
  ) {
    // Remove 0x prefix and convert to lowercase for comparison
    const recipientHex = recipient.toLowerCase().replace('0x', '');

    const events: Array<EventRow & DepositEvent & WithdrawEvent> =
      await this.databaseConnection.query(
        `SELECT
        ca.value as recipient,
        cl."raw_log"->>'blockHash' as "blockHash",
        cl."raw_log"->>'topics' as "topics",
        cl."raw_log"->>'data' as "data",
        cl."decoded_args"->>'nonce' as "nonce",
        cl.tx_hash as "transactionHash"
      FROM
        indexer.contract_l1_logs cl
      JOIN
        indexer.contract_l1_args ca
        ON ca.contract_l1_log_id = cl._id
        AND ca."key" = 'recipient'
      WHERE cl.contract_hash = $1
        AND (
          -- Direct recipient match (ETH deposits)
          LOWER(ca."value") = LOWER($2)
          OR (
            -- ERC20 deposits: recipient is predicate, but check if data contains actual recipient
            LOWER(ca."value") = LOWER($3)
            AND EXISTS (
              SELECT 1
              FROM indexer.contract_l1_args ca_data
              WHERE ca_data.contract_l1_log_id = cl._id
                AND ca_data."key" = 'data'
                AND LOWER(ca_data."value") LIKE '%' || $4 || '%'
            )
          )
        )
      ORDER BY cl."timestamp" DESC
      `,
        [address, recipient, predicate, recipientHex],
      );
    return events;
  }

  async queryBlockHashes(address: string, fromBlock: number) {
    const events: Array<EventRow & DepositEvent & WithdrawEvent> =
      await this.databaseConnection.query(
        `SELECT
        cl."decoded_args"->>'blockHash' as "fuelBlockHash",
        cl."raw_log"->>'blockHash' as "ethBlockHash"
      FROM
        indexer.contract_l1_logs cl
      WHERE
        cl.contract_hash = $1 AND
        cl.event = 'CommitSubmitted' AND
        cl.block_height > $2
      ORDER BY cl."timestamp" ASC
      `,
        [address, fromBlock],
      );
    return events;
  }

  async queryMessageRelayedTxHash(address: string, messageId: string) {
    const events: Array<EventRow & DepositEvent & WithdrawEvent> =
      await this.databaseConnection.query(
        `SELECT
        cl.tx_hash as "transactionHash"
      FROM
        indexer.contract_l1_logs cl
      WHERE
        cl.contract_hash = $1 AND
        cl.event = 'MessageRelayed' AND
        cl.decoded_args->>'messageId' = $2
      ORDER BY cl."timestamp" ASC
      `,
        [address, messageId],
      );
    return events;
  }

  async existsQueryEvents(address: Address, limit: number, offset: number) {
    if (offset < 0) return false;
    const events = await this.queryEvents(address, limit, offset);
    return events.length > 0;
  }

  async getEvents(
    rawAddress: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    if (limit < 0 || offset < 0) return [];
    const address = getValidAddress(rawAddress);
    const events = await this.queryEvents(address, limit, offset);
    const hasPreviousPage = await this.existsQueryEvents(
      address,
      limit,
      offset + limit,
    );
    const hasNextPage = await this.existsQueryEvents(
      address,
      limit,
      offset - limit,
    );
    const promises = events.map(
      async (event: EventRow & DepositEvent & WithdrawEvent) => {
        if (event.event_type === 'deposit') {
          const deposit = await this.processDepositEvent(
            this.parseDepositEvent(event),
          );
          return deposit;
        }
        if (event.event_type === 'withdraw') {
          const withdraw = await this.processWithdrawEvent(
            this.parseWithdrawEvent(event),
          );
          return withdraw;
        }
        throw new Error('');
      },
    );
    const mergedEvents: Array<BridgeResponse> = await Promise.all(promises);
    return {
      nodes: mergedEvents,
      pageInfo: {
        limit,
        offset,
        hasPreviousPage,
        hasNextPage,
      },
    };
  }

  async queryDepositEvent(eventId: number) {
    const [event] = await this.databaseConnection.query(
      `select
        'deposit' as event_type,
        cl._id as event_id,
        cl."timestamp",
        cl.contract_hash,
        cl.block_height,
        cl.tx_hash,
        cl.decoded_args as decoded_args,
        ca."key"
      from
        indexer.contract_l1_logs cl
        join indexer.contract_l1_args ca on ca.contract_l1_log_id = cl._id
      where
        cl._id = $1 and
        ((ca."key" = 'recipient' and (cl.decoded_args->>'amount')::numeric > 0) or (ca."key" = 'data' and (cl.decoded_args->>'amount')::numeric = 0))
      `,
      [eventId],
    );
    return event;
  }

  async queryWithdrawEvent(eventId: number) {
    const [event] = await this.databaseConnection.query(
      `
        select
        'withdraw' as event_type,
        r._id as event_id,
        t."timestamp" as timestamp,
        t.tx_hash as tx_id,
        t.block_id as block_id,
        a_c.account_hash as contract_id,
        r.receipt_sender as sender,
        r.receipt_nonce as nonce,
        r.receipt_amount as amount,
        r.receipt_recipient as recipient,
        r.receipt_data as data
      from
        indexer.transactions_accounts a_c
        join indexer.transactions t on (t.tx_hash = a_c.tx_hash)
        join indexer.receipts r on (r.tx_hash = t.tx_hash)
      where
        r._id = $1
      `,
      [eventId],
    );
    return event;
  }

  async getEvent(eventType: string, eventId: number) {
    if (eventType === 'deposit') {
      const event = await this.queryDepositEvent(eventId);
      const deposit = await this.processDepositEvent(
        this.parseDepositEvent(event),
      );
      return deposit;
    }
    if (eventType === 'withdraw') {
      const event = await this.queryWithdrawEvent(eventId);
      const withdraw = await this.processWithdrawEvent(
        this.parseWithdrawEvent(event),
      );
      return withdraw;
    }
  }
}
