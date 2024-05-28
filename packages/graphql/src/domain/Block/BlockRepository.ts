import { desc, eq, getTableColumns } from 'drizzle-orm';
import { values } from 'lodash';
import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { client } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk';
import { type DbConnection, type DbTransaction, db } from '~/infra/database/Db';
import {
  type TransactionItem,
  TransactionsTable,
} from '../Transaction/TransactionModel';
import { BlockEntity } from './BlockEntity';
import { type BlockItem, BlocksTable } from './BlockModel';

export class BlockRepository {
  constructor(
    readonly producer: string | null,
    readonly conn: DbConnection | DbTransaction = db.connection(),
  ) {}

  async findByHash(blockHash: string) {
    const first = await this.conn.query.BlocksTable.findFirst({
      where: eq(BlocksTable.blockHash, blockHash),
      with: {
        transactions: true,
      },
    });

    if (!first) return null;
    const { transactions, ...block } = first;
    return BlockEntity.create(block, this.producer, transactions);
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
    return BlockEntity.create(block, this.producer, transactions);
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
    const items = results.reduce<
      Record<number, { block: BlockItem; transactions: TransactionItem[] }>
    >((acc, row) => {
      const block = row.blocks;
      const transaction = row.transactions;

      if (!acc[block._id]) {
        acc[block._id] = { block, transactions: [] };
      }
      if (transaction) {
        acc[block._id].transactions.push(transaction);
      }
      return acc;
    }, {});

    return values(items).map((item) =>
      BlockEntity.create(item.block, this.producer, item.transactions),
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
    return BlockEntity.create(block, this.producer, transactions);
  }

  async upsertMany(blocks: GQLBlock[], trx: DbTransaction) {
    const values = blocks.map((block) =>
      BlockEntity.toDBItem(block, this.producer),
    );
    const conn = trx || this.conn;
    const query = conn.insert(BlocksTable).values(values).onConflictDoNothing();
    const items = await query.returning();
    return items.map((item) => BlockEntity.create(item, this.producer, []));
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
}
