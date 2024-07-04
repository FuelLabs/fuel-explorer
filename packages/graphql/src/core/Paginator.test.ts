import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { TransactionsTable } from '~/domain/Transaction/TransactionModel';
import { Db, type DbConnection } from '~/infra/database/Db';
import { logger } from './Logger';
import { Paginator } from './Paginator';

logger.setTurnOff();

describe('Paginator', () => {
  const db = Db.getInstance();
  let conn: DbConnection;
  let container: StartedPostgreSqlContainer;

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
  }, 60000);

  afterAll(async () => {
    await db.close();
    await container.stop();
  });

  // Test suite for validateParams
  describe('Paginator.validateParams()', () => {
    it('should throw an error when neither first nor last is provided', async () => {
      const pagParams = {};
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      await expect(paginator.validateParams()).rejects.toThrow(
        'Must use either first or last',
      );
    });

    it('should throw an error when both first and last are provided', async () => {
      const pagParams = { first: 5, last: 5 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      await expect(paginator.validateParams()).rejects.toThrow(
        'Cannot use both first and last at the same time',
      );
    });

    it('should throw an error when both before and after are provided', async () => {
      const pagParams = { first: 5, before: '1000', after: '500' };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      await expect(paginator.validateParams()).rejects.toThrow(
        'Cannot use both before and after at the same time',
      );
    });

    it('should not throw an error for valid params with first', async () => {
      const pagParams = { first: 5 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      await expect(paginator.validateParams()).resolves.not.toThrow();
    });

    it('should not throw an error for valid params with last', async () => {
      const pagParams = { last: 5 };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      await expect(paginator.validateParams()).resolves.not.toThrow();
    });

    it('should not throw an error for valid params with first and after', async () => {
      const pagParams = { first: 5, after: '500' };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      await expect(paginator.validateParams()).resolves.not.toThrow();
    });

    it('should not throw an error for valid params with last and before', async () => {
      const pagParams = { last: 5, before: '1000' };
      const paginator = new Paginator(TransactionsTable, pagParams, conn);
      await expect(paginator.validateParams()).resolves.not.toThrow();
    });
  });
});
