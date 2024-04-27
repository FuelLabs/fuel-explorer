import { db } from '@core/db';
import type { GQLBlock } from '@core/generated/gql-types';
import type { DbConnection, DbTransaction } from '@core/infra/database/Db';
import { GraphQLSDK } from '@core/infra/graphql/GraphQLSDK';
import { Paginator, type PaginatorParams } from '@core/shared/Paginator';
import c from 'chalk';
import { desc, eq } from 'drizzle-orm';
import { NodeRepository } from '../Node/NodeRepository';
import { BlockEntity } from './BlockEntity';
import { BlocksTable } from './BlockModel';

export class BlockRepository {
  constructor(private readonly nodeRepository = new NodeRepository()) {}

  async findByHash(blockHash: string) {
    const first = await db.connection().query.BlocksTable.findFirst({
      where: eq(BlocksTable.blockHash, blockHash),
      with: {
        transactions: true,
        node: true,
      },
    });

    if (!first) return null;
    return BlockEntity.create(first);
  }

  async findByHeight(height: number) {
    const first = await db.connection().query.BlocksTable.findFirst({
      where: eq(BlocksTable._id, height),
      with: {
        transactions: true,
        node: true,
      },
    });

    if (!first) return null;
    return BlockEntity.create(first);
  }

  async findMany(params: PaginatorParams): Promise<BlockEntity[]> {
    const paginator = new Paginator(BlocksTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const items = await db.connection().query.BlocksTable.findMany({
      ...paginator.queryParamsFromConfig(config),
      with: {
        transactions: true,
        node: true,
      },
    });

    return items.map(BlockEntity.create);
  }

  async findLatestAdded() {
    const latest = await db.connection().query.BlocksTable.findFirst({
      orderBy: desc(BlocksTable._id),
      with: {
        transactions: true,
        node: true,
      },
    });

    if (!latest) return null;
    return BlockEntity.create(latest);
  }

  async insertOne(block: GQLBlock) {
    const insertOne = this.createInsertOne(db.connection());
    return insertOne(block);
  }

  async insertMany(blocks: GQLBlock[]) {
    return db.connection().transaction(async (trx) => {
      const queries = blocks.map(this.createInsertOne(trx));
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

  // TODO: improve this query to be more efficient
  private createInsertOne(conn: DbConnection | DbTransaction) {
    return async (block: GQLBlock) => {
      const node = await this.nodeRepository.findById(block.id);
      if (!node) {
        throw new Error(`Node ${block.id} not found`);
      }

      const found = await this.findByHash(block.id);
      if (found) {
        console.log(c.red(`Block ${block.header.height} already exists`));
        return null;
      }

      const [item] = await conn
        .insert(BlocksTable)
        .values(BlockEntity.toDBItem(node.toNodeItem()))
        .returning();

      if (!item) {
        throw new Error(`Failed to insert block ${block.header.height}`);
      }

      return this.findByHash(block.id);
    };
  }
}
