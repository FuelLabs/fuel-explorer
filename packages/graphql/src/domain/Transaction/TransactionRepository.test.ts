import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { logger } from '~/core/Logger';
import { Paginator } from '~/core/Paginator';
import { Db, type DbConnection } from '~/infra/database/Db';
import { BlocksTable } from '../Block/BlockModel';
import {
  fakeBlocks as blocks,
  fakeTransactions as txs,
} from '../__mocks__/data';
import { TransactionsTable } from './TransactionModel';
import { TransactionRepository } from './TransactionRepository';

logger.setTurnOff();

describe('TransactionRepository', () => {
  const db = Db.getInstance();
  let conn: DbConnection;
  let repository: TransactionRepository;
  let container: StartedPostgreSqlContainer;
  const len = txs.length;

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
    repository = new TransactionRepository(conn);
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

  describe('findMany()', () => {
    it('should return first 3 transactions when no cursor is provided', async () => {
      const pagParams = { first: 3 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(txs[0]._id);
      expect(result[1].cursor).toBe(txs[1]._id);
      expect(result[2].cursor).toBe(txs[2]._id);
    });

    it('should return correct transactions when using first with after', async () => {
      const pagParams = {
        first: 3,
        after: txs[2]._id,
      };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(txs[3]._id);
      expect(result[1].cursor).toBe(txs[4]._id);
      expect(result[2].cursor).toBe(txs[5]._id);
    });

    it('should return correct transactions when using first with before', async () => {
      const pagParams = {
        first: 3,
        before: txs[10]._id,
      };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(txs[7]._id);
      expect(result[1].cursor).toBe(txs[8]._id);
      expect(result[2].cursor).toBe(txs[9]._id);
    });

    it('should return last 3 transactions when no cursor is provided', async () => {
      const pagParams = { last: 3 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(txs[len - 1]._id);
      expect(result[1].cursor).toBe(txs[len - 2]._id);
      expect(result[2].cursor).toBe(txs[len - 3]._id);
    });

    it('should return correct transactions when using last with before', async () => {
      const pagParams = {
        last: 3,
        before: txs[7]._id,
      };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(txs[6]._id);
      expect(result[1].cursor).toBe(txs[5]._id);
      expect(result[2].cursor).toBe(txs[4]._id);
    });

    it('should return correct transactions when using last with after', async () => {
      const pagParams = {
        last: 3,
        after: txs[3]._id,
      };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(3);
      expect(result[0].cursor).toBe(txs[6]._id);
      expect(result[1].cursor).toBe(txs[5]._id);
      expect(result[2].cursor).toBe(txs[4]._id);
    });

    it('should return an empty array when no results match the criteria', async () => {
      const pagParams = {
        first: 3,
        after: txs[len - 1]._id,
      };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result).toEqual([]);
    });

    it('should handle edge case with first: 1', async () => {
      const pagParams = { first: 1 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(1);
      expect(result[0].cursor).toBe(txs[0]._id);
    });

    it('should handle edge case with last: 1', async () => {
      const pagParams = { last: 1 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(1);
      expect(result[0].cursor).toBe(txs[len - 1]._id);
    });

    it('should return all transactions when first is greater than available items', async () => {
      const pagParams = { first: len + 10 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(len);
      expect(result[0].cursor).toBe(txs[0]._id);
      expect(result[len - 1].cursor).toBe(txs[len - 1]._id);
    });

    it('should handle pagination with first and after in the middle of the dataset', async () => {
      const middleIndex = Math.floor(len / 2);
      const pagParams = {
        first: 2,
        after: txs[middleIndex]._id,
      };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(2);
      expect(result[0].cursor).toBe(txs[middleIndex + 1]._id);
      expect(result[1].cursor).toBe(txs[middleIndex + 2]._id);
    });

    it('should handle pagination with last and before in the middle of the dataset', async () => {
      const middleIndex = Math.floor(len / 2);
      const pagParams = {
        last: 2,
        before: txs[middleIndex]._id,
      };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      const result = await repository.findMany(paginator);
      expect(result.length).toBe(2);
      expect(result[0].cursor).toBe(txs[middleIndex - 1]._id);
      expect(result[1].cursor).toBe(txs[middleIndex - 2]._id);
    });
  });
});
