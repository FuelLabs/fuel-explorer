import { desc, eq } from 'drizzle-orm';
import { groupBy } from 'lodash';
import { logger } from '~/core/Logger';
import type { Paginator } from '~/core/Paginator';
import { client } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import {
  type TransactionItem,
  TransactionsTable,
} from '../Transaction/TransactionModel';
import { BlockEntity } from './BlockEntity';
import { type BlockItem, BlocksTable } from './BlockModel';
import { BlockProducer } from './vo/BlockProducer';

export class BlockRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findByHash(blockHash: string) {
    logger.debugRequest('BlockRepository.findByHash', { blockHash });
    const first = await this.conn.query.BlocksTable.findFirst({
      where: eq(BlocksTable.blockHash, blockHash),
      with: {
        transactions: true,
      },
    });

    logger.debugResponse('BlockRepository.findByHash', { first });
    if (!first) return null;
    const { transactions, ...block } = first;
    logger.debugRequest('Getting block producer from SDK', { block });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findByHash', { producer });
    return BlockEntity.create(block, producer, transactions);
  }

  async findByHeight(height: number) {
    logger.debugRequest('BlockRepository.findByHeight', { height });
    const first = await this.conn.query.BlocksTable.findFirst({
      where: eq(BlocksTable._id, height),
      with: {
        transactions: true,
      },
    });

    logger.debugResponse('BlockRepository.findByHeight', { first });
    if (!first) return null;
    const { transactions, ...block } = first;
    logger.debugRequest('Getting block producer from SDK', { block });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findByHeight', { producer });
    return BlockEntity.create(block, producer, transactions);
  }

  async findMany(
    paginator: Paginator<typeof BlocksTable>,
  ): Promise<BlockEntity[]> {
    logger.debugRequest('BlockRepository.findMany', { paginator });
    const config = await paginator.getQueryPaginationConfig();
    const query = paginator.getPaginatedQuery(config);
    const joined = await query.leftJoin(
      TransactionsTable,
      eq(TransactionsTable.blockId, BlocksTable._id),
    );

    const results = paginator.getPaginatedResult(joined);
    const blockTransactionMap = this.groupBlockTransactions(results);
    logger.debugRequest('Getting block producer from SDK', { results });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findMany', { producer, results });
    return Object.values(blockTransactionMap).map(({ block, transactions }) =>
      BlockEntity.create(block, producer, transactions ?? []),
    );
  }

  async findLatestAdded() {
    logger.debugRequest('BlockRepository.findLatestAdded');
    const latest = await this.conn.query.BlocksTable.findFirst({
      with: {
        transactions: true,
      },
      orderBy: desc(BlocksTable._id),
    });

    logger.debugResponse('BlockRepository.findLatestAdded', { latest });
    if (!latest) return null;
    const { transactions, ...block } = latest;
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findLatestAdded', { producer });
    return BlockEntity.create(block, producer, transactions);
  }

  async upsertMany(
    producer: string | null,
    blocks: GQLBlock[],
    trx: DbTransaction,
  ) {
    const values = blocks.map((block) => BlockEntity.toDBItem(block, producer));
    const conn = trx || this.conn;
    await conn.insert(BlocksTable).values(values).onConflictDoNothing();
  }

  static async blocksFromNode(first: number, after?: number) {
    logger.debugRequest('BlockRepository.blocksFromNode', { first, after });
    const { data } = await client.sdk.blocks({
      first: first < 0 ? -first : first,
      ...(after ? { after: String(after) } : null),
    });
    logger.debugResponse('BlockRepository.blocksFromNode', { data });

    const blocks = data.blocks.nodes as GQLBlock[];
    const hasNext = data.blocks.pageInfo.hasNextPage;
    const hasPrev = data.blocks.pageInfo.hasPreviousPage;
    const endCursor = Number(data.blocks.pageInfo.endCursor);
    const results = {
      blocks,
      hasNext,
      hasPrev,
      endCursor: endCursor || undefined,
    };
    logger.debugDone('BlockRepository.blocksFromNode', results);
    return results;
  }

  private groupBlockTransactions(
    rows: { blocks: BlockItem; transactions: TransactionItem | null }[],
  ): Record<number, { block: BlockItem; transactions: TransactionItem[] }> {
    logger.debugRequest('BlockRepository.groupBlockTransactions', { rows });
    const groupedRows = groupBy(rows, 'blocks._id');
    const response = Object.entries(groupedRows).reduce(
      (acc, [blockId, rows]) => {
        const block = rows[0].blocks;
        const transactions = rows
          .map((row) => row.transactions)
          .filter(
            (transaction): transaction is TransactionItem =>
              transaction !== null,
          );

        acc[blockId] = { block, transactions };
        return acc;
      },
      {} as Record<
        string,
        { block: BlockItem; transactions: TransactionItem[] }
      >,
    );
    logger.debugDone('BlockRepository.groupBlockTransactions', { response });
    return response;
  }
}
