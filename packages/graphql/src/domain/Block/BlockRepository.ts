import { desc, eq } from 'drizzle-orm';
import { values } from 'lodash';
import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { GraphQLSDK } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk';
import { type DbConnection, type DbTransaction, db } from '~/infra/database/Db';
import {
  type TransactionItem,
  TransactionsTable,
} from '../Transaction/TransactionModel';
import { BlockEntity } from './BlockEntity';
import { type BlockItem, BlocksTable } from './BlockModel';

export class BlockRepository {
  async findByHash(blockHash: string) {
    const first = await db.connection().query.BlocksTable.findFirst({
      where: eq(BlocksTable.blockHash, blockHash),
      with: {
        transactions: true,
      },
    });

    if (!first) return null;
    const { transactions, ...block } = first;
    return BlockEntity.create(block, transactions);
  }

  async findByHeight(height: number) {
    const first = await db.connection().query.BlocksTable.findFirst({
      where: eq(BlocksTable._id, height),
      with: {
        transactions: true,
      },
    });

    if (!first) return null;
    const { transactions, ...block } = first;
    return BlockEntity.create(block, transactions);
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
      BlockEntity.create(item.block, item.transactions),
    );
  }

  async findLatestAdded() {
    const latest = await db.connection().query.BlocksTable.findFirst({
      with: {
        transactions: true,
      },
      orderBy: desc(BlocksTable._id),
    });

    if (!latest) return null;
    const { transactions, ...block } = latest;
    return BlockEntity.create(block, transactions);
  }

  async upsertOne(block: GQLBlock) {
    const upsertOne = this.createUpsertOne(db.connection());
    return upsertOne(block);
  }

  async upsertMany(blocks: GQLBlock[]) {
    return db.connection().transaction(async (trx) => {
      const queries = blocks.map(this.createUpsertOne(trx));
      return Promise.all(queries.filter(Boolean));
    });
  }

  async blocksFromNode(first: number, after?: number) {
    const { sdk } = new GraphQLSDK();
    const { data } = await sdk.blocks({
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

  async latestBlockFromNode() {
    const { sdk } = new GraphQLSDK();
    const { data } = await sdk.blocks({ last: 1 });
    return data.blocks.nodes[0] as GQLBlock;
  }

  private createUpsertOne(conn: DbConnection | DbTransaction) {
    return async (block: GQLBlock) => {
      const [item] = await conn
        .insert(BlocksTable)
        .values(BlockEntity.toDBItem(block))
        .onConflictDoUpdate({
          target: [BlocksTable._id],
          set: { data: block },
        })
        .returning();
      return BlockEntity.create(item, []);
    };
  }
}
