import { Pool } from 'pg';
import { env } from '~/config';

const DB_HOST = env.get('DB_HOST_REPLICA') || env.get('DB_HOST');
const DB_PORT = env.get('DB_PORT_REPLICA') || env.get('DB_PORT');
const DB_USER = env.get('DB_USER_REPLICA') || env.get('DB_USER');
const DB_PASS = env.get('DB_PASS_REPLICA') || env.get('DB_PASS');
const DB_NAME = env.get('DB_NAME_REPLICA') || env.get('DB_NAME');

export class DatabaseConnectionReplica {
  private static instance: DatabaseConnectionReplica;
  private pool: Pool;

  constructor() {
    const config = {
      host: DB_HOST as string,
      port: Number(DB_PORT) as number,
      user: DB_USER as string,
      password: DB_PASS as string,
      database: DB_NAME as string,
      // Disable SSL for local development
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      max: 20,
      min: 2,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      acquireTimeoutMillis: 10000,
      allowExitOnIdle: false,
    };
    this.pool = new Pool(config);
  }

  static getInstance() {
    if (!DatabaseConnectionReplica.instance) {
      DatabaseConnectionReplica.instance = new DatabaseConnectionReplica();
    }
    return DatabaseConnectionReplica.instance;
  }

  async query(statement: string, params: any) {
    let connection;
    try {
      connection = await this.pool.connect();
      const result = await connection.query(statement, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', {
        statement: statement.substring(0, 100),
        error,
      });
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
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

  /**
   * Execute multiple queries in a single transaction with custom planner settings.
   * Settings are applied with SET LOCAL and only affect this transaction.
   *
   * @param settings - PostgreSQL settings to apply
   * @param queries - Queries to execute sequentially
   * @returns Array of result sets
   */
  async batchQueryWithSettings(
    settings: { name: string; value: string }[],
    queries: { statement: string; params: any }[],
  ) {
    const connection = await this.pool.connect();
    try {
      await connection.query('BEGIN');

      for (const setting of settings) {
        await connection.query(`SET LOCAL ${setting.name} = ${setting.value}`);
      }

      const results = [];
      for (const query of queries) {
        const result = await connection.query(query.statement, query.params);
        results.push(result.rows);
      }

      await connection.query('COMMIT');

      return results;
    } catch (error) {
      await connection.query('ROLLBACK');
      console.error('Database batch query error:', { error });
      throw error;
    } finally {
      connection.release();
    }
  }
}
