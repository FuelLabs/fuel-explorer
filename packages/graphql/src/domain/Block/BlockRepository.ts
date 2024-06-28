import { desc, eq } from 'drizzle-orm';
import { logger } from '~/core/Logger';
import type { Paginator } from '~/core/Paginator';
import { client } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { BlockEntity } from './BlockEntity';
import { BlocksTable } from './BlockModel';
import { BlockProducer } from './vo/BlockProducer';

export class BlockRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findByHash(blockHash: string) {
    logger.debugRequest('BlockRepository.findByHash', { blockHash });
    const block = await this.conn.query.BlocksTable.findFirst({
      where: eq(BlocksTable.blockHash, blockHash),
    });

    logger.debugResponse('BlockRepository.findByHash', { first: block });
    if (!block) return null;
    logger.debugRequest('Getting block producer from SDK', { block });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findByHash', { producer });
    return BlockEntity.create(block, producer);
  }

  async findByHeight(height: number) {
    logger.debugRequest('BlockRepository.findByHeight', { height });
    const block = await this.conn.query.BlocksTable.findFirst({
      where: eq(BlocksTable._id, height),
    });

    logger.debugResponse('BlockRepository.findByHeight', { first: block });
    if (!block) return null;
    logger.debugRequest('Getting block producer from SDK', { block });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findByHeight', { producer });
    return BlockEntity.create(block, producer);
  }

  async findMany(
    paginator: Paginator<typeof BlocksTable>,
  ): Promise<BlockEntity[]> {
    logger.debugRequest('BlockRepository.findMany', { paginator });
    const config = await paginator.getQueryPaginationConfig();
    const query = await paginator.getPaginatedQuery(config);
    const results = paginator.getPaginatedResult(query);
    logger.debugRequest('Getting block producer from SDK', { results });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findMany', { producer, results });
    return results.map((block) => BlockEntity.create(block, producer));
  }

  async findLatestAdded() {
    logger.debugRequest('BlockRepository.findLatestAdded');
    const block = await this.conn.query.BlocksTable.findFirst({
      orderBy: desc(BlocksTable._id),
    });

    logger.debugResponse('BlockRepository.findLatestAdded', { block });
    if (!block) return null;
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findLatestAdded', { producer });
    return BlockEntity.create(block, producer);
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
}
