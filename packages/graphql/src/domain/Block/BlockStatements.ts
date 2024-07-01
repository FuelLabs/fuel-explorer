import { desc, eq, sql } from 'drizzle-orm';
import { BaseStatements } from '~/core/BaseStatement';
import { BlocksTable } from './BlockModel';

const TABLE = BlocksTable;
export type BlockStatementsItem = ReturnType<BlockStatements['build']>;

export class BlockStatements extends BaseStatements<typeof TABLE> {
  protected get tableName() {
    return 'blocks';
  }
  protected get table() {
    return TABLE;
  }

  build() {
    return {
      findByHash: this.findByHash,
      findByHeight: this.findByHeight,
      findLatestAdded: this.findLatestAdded,
      findMany: this.findMany(),
    };
  }

  get findByHash() {
    return this.conn.query.BlocksTable.findFirst({
      where: eq(TABLE.blockHash, sql.placeholder('blockHash')),
    }).prepare('blocks.findByHash');
  }

  get findByHeight() {
    return this.conn.query.BlocksTable.findFirst({
      where: eq(TABLE._id, sql.placeholder('height')),
    }).prepare('blocks.findByHeight');
  }

  get findLatestAdded() {
    return this.conn.query.BlocksTable.findFirst({
      orderBy: desc(TABLE._id),
    }).prepare('blocks.findLatestAdded');
  }
}
