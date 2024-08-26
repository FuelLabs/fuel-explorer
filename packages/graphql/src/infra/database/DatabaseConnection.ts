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
      ssl: Boolean(env.get('SSL')) as boolean,
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
    const result = await connection.query(statement, params);
    connection.release();
    return result.rows;
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
