import { desc, eq } from 'drizzle-orm';
import { groupBy } from 'lodash';
import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { client } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import { type DbConnection, type DbTransaction, db } from '~/infra/database/Db';
import {
  type TransactionItem,
  TransactionsTable,
} from '../Transaction/TransactionModel';
import { BlockEntity } from './BlockEntity';
import { type BlockItem, BlocksTable } from './BlockModel';
import { BlockProducer } from './vo/BlockProducer';

export class BlockRepository {
  constructor(readonly conn: DbConnection | DbTransaction = db.connection()) {}

  async findByHash(blockHash: string) {
    const first = await this.conn.query.BlocksTable.findFirst({
      where: eq(BlocksTable.blockHash, blockHash),
      with: {
        transactions: true,
      },
    });

    if (!first) return null;
    const { transactions, ...block } = first;
    const producer = await BlockProducer.fromSdk();
    return BlockEntity.create(block, producer, transactions);
  }

  async findByHeight(height: number) {
    const first = await this.conn.query.BlocksTable.findFirst({
      where: eq(BlocksTable._id, height),
      with: {
        transactions: true,
      },
    });

    if (!first) return null;
    const { transactions, ...block } = first;
    const producer = await BlockProducer.fromSdk();
    return BlockEntity.create(block, producer, transactions);
  }

  async findMany(params: PaginatorParams): Promise<BlockEntity[]> {
    const paginator = new Paginator(BlocksTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const query = paginator.getPaginatedQuery(config);
    const joined = await query.leftJoin(
      TransactionsTable,
      eq(TransactionsTable.blockId, BlocksTable._id),
    );

    const results = paginator.getPaginatedResult(joined);
    const blockTransactionMap = this.groupBlockTransactions(results);
    const producer = await BlockProducer.fromSdk();
    return Object.values(blockTransactionMap).map(({ block, transactions }) =>
      BlockEntity.create(block, producer, transactions ?? []),
    );
  }

  async findLatestAdded() {
    const latest = await this.conn.query.BlocksTable.findFirst({
      with: {
        transactions: true,
      },
      orderBy: desc(BlocksTable._id),
    });

    if (!latest) return null;
    const { transactions, ...block } = latest;
    const producer = await BlockProducer.fromSdk();
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
    const { data } = await client.sdk.blocks({
      first,
      ...(after ? { after: String(after) } : null),
    });
    const blocks = data.blocks.nodes as GQLBlock[];
    const hasNext = data.blocks.pageInfo.hasNextPage;
    const hasPrev = data.blocks.pageInfo.hasPreviousPage;
    const endCursor = Number(data.blocks.pageInfo.endCursor);

    return {
      blocks,
      hasNext,
      hasPrev,
      endCursor: endCursor || undefined,
    };
  }

  private groupBlockTransactions(
    rows: { blocks: BlockItem; transactions: TransactionItem | null }[],
  ): Record<number, { block: BlockItem; transactions: TransactionItem[] }> {
    const groupedRows = groupBy(rows, 'blocks._id');

    return Object.entries(groupedRows).reduce(
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
        number,
        { block: BlockItem; transactions: TransactionItem[] }
      >,
    );
  }
}
