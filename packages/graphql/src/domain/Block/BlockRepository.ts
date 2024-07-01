import { logger } from '~/core/Logger';
import type { Paginator } from '~/core/Paginator';
import { client } from '~/graphql/GraphQLSDK';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { BlockEntity } from './BlockEntity';
import { BlocksTable } from './BlockModel';
import { BlockStatements, type BlockStatementsItem } from './BlockStatements';
import { BlockProducer } from './vo/BlockProducer';

export class BlockRepository {
  statements!: BlockStatementsItem;
  constructor(readonly conn: DbConnection | DbTransaction) {
    const statements = new BlockStatements(conn);
    this.statements = statements.build();
  }

  async findByHash(blockHash: string) {
    logger.debugRequest('BlockRepository.findByHash', { blockHash });
    const block = await this.statements.findByHash.execute({ blockHash });
    logger.debugResponse('BlockRepository.findByHash', { first: block });
    if (!block) return null;
    logger.debugRequest('Getting block producer from SDK', { block });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findByHash', { producer });
    return BlockEntity.create(block, producer);
  }

  async findByHeight(height: number) {
    logger.debugRequest('BlockRepository.findByHeight', { height });
    const block = await this.statements.findByHeight.execute({ height });
    logger.debugResponse('BlockRepository.findByHeight', { first: block });
    if (!block) return null;
    logger.debugRequest('Getting block producer from SDK', { block });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findByHeight', { producer });
    return BlockEntity.create(block, producer);
  }

  async findLatestAdded() {
    logger.debugRequest('BlockRepository.findLatestAdded');
    const block = await this.statements.findLatestAdded.execute();
    logger.debugResponse('BlockRepository.findLatestAdded', { block });
    if (!block) return null;
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findLatestAdded', { producer });
    return BlockEntity.create(block, producer);
  }

  async findMany(paginator: Paginator<typeof BlocksTable>) {
    logger.debugRequest('BlockRepository.findMany');
    const statement = this.statements.findMany(paginator);
    const blocks = await statement.execute();
    logger.debugResponse('BlockRepository.findMany', { blocks });
    const producer = await BlockProducer.fromSdk();
    logger.debugDone('BlockRepository.findMany', { producer });
    return blocks.map((block) => BlockEntity.create(block, producer));
  }

  async upsertMany(
    producer: string | null,
    blocks: GQLBlock[],
    trx: DbTransaction,
  ) {
    const conn = trx || this.conn;
    const values = blocks.map((block) => BlockEntity.toDBItem(block, producer));
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
