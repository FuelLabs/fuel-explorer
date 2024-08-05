import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import dayjs from 'dayjs';
import { DateHelper } from '~/core/Date';
import { logger } from '~/core/Logger';
import { Paginator } from '~/core/Paginator';
import { Db, type DbConnection } from '~/infra/database/Db';
import { TransactionsTable } from '../Transaction/TransactionModel';
import {
  fakeBlocks as blocks,
  fakeTransactions as txs,
} from '../__mocks__/data';
import { BlocksTable } from './BlockModel';
import { BlockRepository } from './BlockRepository';
import { BlockProducer } from './vo/BlockProducer';

logger.setTurnOff();
jest.spyOn(BlockProducer, 'fromSdk').mockResolvedValue('producer');
jest.spyOn(DateHelper, 'tai64toDate').mockReturnValue(dayjs('2021-01-01'));
jest.spyOn(DateHelper, 'dateToTai64').mockReturnValue('tai64');

describe('BlockRepository', () => {
  const db = Db.getInstance();
  let conn: DbConnection;
  let repository: BlockRepository;
  let container: StartedPostgreSqlContainer;
  const len = blocks.length;

  beforeAll(async () => {
    // Start PostgreSQL container
    container = await new PostgreSqlContainer().start();
    db.setOpts({
      host: container.getHost(),
      port: container.getPort(),
      user: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
    });
    await db.migrate();
    conn = await db.conn();
    repository = new BlockRepository(conn);
  }, 60000);

  afterAll(async () => {
    await db.close();
    await container.stop();
  });

  beforeEach(async () => {
    await db.migrate();
    await conn.insert(BlocksTable).values(blocks).onConflictDoNothing();
    await conn.insert(TransactionsTable).values(txs).onConflictDoNothing();
  });

  describe('findByHeight()', () => {
    it('should return the correct block for a given height', async () => {
      const height = blocks[2]._id;
      const result = await repository.findByHeight(height);
      expect(result).not.toBeNull();
      expect(result?.cursor).toBe(height);
      expect(result?.props.blockHash.value()).toBe(blocks[2].blockHash);
    });

    it('should return null for a non-existent height', async () => {
      const nonExistentHeight = 999999;
      const result = await repository.findByHeight(nonExistentHeight);
      expect(result).toBeNull();
    });

    it('should call BlockProducer.fromSdk()', async () => {
      const height = blocks[0]._id;
      await repository.findByHeight(height);
      expect(BlockProducer.fromSdk).toHaveBeenCalled();
    });
  });

  describe('findByHash()', () => {
    it('should return the correct block for a given hash', async () => {
      const hash = blocks[3].blockHash;
      const result = await repository.findByHash(hash);
      expect(result).not.toBeNull();
      expect(result?.cursor).toBe(blocks[3]._id);
      expect(result?.blockHash).toBe(hash);
    });

    it('should return null for a non-existent hash', async () => {
      const nonExistentHash = 'nonexistenthash123';
      const result = await repository.findByHash(nonExistentHash);
      expect(result).toBeNull();
    });

    it('should call BlockProducer.fromSdk()', async () => {
      const hash = blocks[0].blockHash;
      await repository.findByHash(hash);
      expect(BlockProducer.fromSdk).toHaveBeenCalled();
    });
  });

  describe('findMany()', () => {
    it('should return first 3 blocks when no cursor is provided', async () => {
      const pagParams = { first: 3 };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(blocks[0]._id);
      expect(result[1].cursor).toBe(blocks[1]._id);
      expect(result[2].cursor).toBe(blocks[2]._id);
    });

    it('should return correct blocks when using first with after', async () => {
      const pagParams = {
        first: 3,
        after: blocks[2]._id,
      };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(2);
      expect(result[0].cursor).toBe(blocks[3]._id);
      expect(result[1].cursor).toBe(blocks[4]._id);
    });

    it('should return correct blocks when using first with before', async () => {
      const pagParams = {
        first: 3,
        before: blocks[4]._id,
      };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(blocks[1]._id);
      expect(result[1].cursor).toBe(blocks[2]._id);
      expect(result[2].cursor).toBe(blocks[3]._id);
    });

    it('should return last 3 blocks when no cursor is provided', async () => {
      const pagParams = { last: 3 };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(blocks[len - 1]._id);
      expect(result[1].cursor).toBe(blocks[len - 2]._id);
      expect(result[2].cursor).toBe(blocks[len - 3]._id);
    });

    it('should return correct blocks when using last with before', async () => {
      const pagParams = {
        last: 3,
        before: blocks[3]._id,
      };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(blocks[2]._id);
      expect(result[1].cursor).toBe(blocks[1]._id);
      expect(result[2].cursor).toBe(blocks[0]._id);
    });

    it('should return correct blocks when using last with after', async () => {
      const pagParams = {
        last: 3,
        after: blocks[1]._id,
      };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(blocks[4]._id);
      expect(result[1].cursor).toBe(blocks[3]._id);
      expect(result[2].cursor).toBe(blocks[2]._id);
    });

    it('should return an empty array when no results match the criteria', async () => {
      const pagParams = {
        first: 3,
        after: blocks[len - 1]._id,
      };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result).toEqual([]);
    });

    it('should handle edge case with first: 1', async () => {
      const pagParams = { first: 1 };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(1);
      expect(result[0].cursor).toBe(blocks[0]._id);
    });

    it('should handle edge case with last: 1', async () => {
      const pagParams = { last: 1 };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(1);
      expect(result[0].cursor).toBe(blocks[len - 1]._id);
    });

    it('should return all blocks when first is greater than available items', async () => {
      const pagParams = { first: len + 10 };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(len);
      expect(result[0].cursor).toBe(blocks[0]._id);
      expect(result[len - 1].cursor).toBe(blocks[len - 1]._id);
    });

    it('should handle pagination with first and after in the middle of the dataset', async () => {
      const middleIndex = Math.floor(len / 2);
      const pagParams = {
        first: 2,
        after: blocks[middleIndex]._id,
      };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(2);
      expect(result[0].cursor).toBe(blocks[middleIndex + 1]._id);
      expect(result[1].cursor).toBe(blocks[middleIndex + 2]._id);
    });

    it('should handle pagination with last and before in the middle of the dataset', async () => {
      const middleIndex = Math.floor(len / 2);
      const pagParams = {
        last: 2,
        before: blocks[middleIndex]._id,
      };
      const paginator = new Paginator(BlocksTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(2);
      expect(result[0].cursor).toBe(blocks[middleIndex - 1]._id);
      expect(result[1].cursor).toBe(blocks[middleIndex - 2]._id);
    });
  });
});
