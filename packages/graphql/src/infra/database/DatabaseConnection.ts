import { Pool } from 'pg';
import { env } from '~/config';

const DB_HOST = env.get('DB_HOST');
const DB_PORT = env.get('DB_PORT');
const DB_USER = env.get('DB_USER');
const DB_PASS = env.get('DB_PASS');
const DB_NAME = env.get('DB_NAME');

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: Pool;

  constructor() {
    const config = {
      host: DB_HOST as string,
      port: Number(DB_PORT) as number,
      user: DB_USER as string,
      password: DB_PASS as string,
      database: DB_NAME as string,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      max: 15,
      min: 2,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };
    this.pool = new Pool(config);
  }

  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  async query(statement: string, params: any) {
    const connection = await this.pool.connect();
    try {
      const result = await connection.query(statement, params);
      return result.rows;
    } catch (error) {
      try {
        await connection.query('ROLLBACK');
      } catch {}
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Execute a query with per-session statement_timeout and lock_timeout.
   * Timeouts are applied via SET LOCAL inside a transaction so they don't
   * leak to other connections. If the query exceeds the timeout, PostgreSQL
   * cancels it and the connection is returned cleanly to the pool.
   */
  async queryWithTimeout(
    statement: string,
    params: any,
    statementTimeoutMs: number,
    lockTimeoutMs: number,
  ) {
    const connection = await this.pool.connect();
    try {
      await connection.query('BEGIN');
      await connection.query(
        `SET LOCAL statement_timeout = ${statementTimeoutMs}`,
      );
      await connection.query(`SET LOCAL lock_timeout = ${lockTimeoutMs}`);
      const result = await connection.query(statement, params);
      await connection.query('COMMIT');
      return result.rows;
    } catch (error) {
      try {
        await connection.query('ROLLBACK');
      } catch {}
      throw error;
    } finally {
      connection.release();
    }
  }

  async executeTransaction(queries: { statement: string; params: any }[]) {
    const connection = await this.pool.connect();
    try {
      await connection.query('begin');
      for (const query of queries) {
        await connection.query(query.statement, query.params);
      }
      await connection.query('commit');
    } catch (e: any) {
      await connection.query('rollback');
      throw e;
    } finally {
      connection.release();
    }
  }
}
