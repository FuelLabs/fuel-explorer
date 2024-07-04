import path from 'node:path';
import { type ExtractTablesWithRelations, sql } from 'drizzle-orm';
import {
  type NodePgDatabase,
  type NodePgQueryResultHKT,
  drizzle,
} from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import { Pool, type PoolClient, type PoolConfig } from 'pg';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import * as DbSchema from './DbSchema';

const DB_HOST = env.get('DB_HOST');
const DB_PORT = env.get('DB_PORT');
const DB_USER = env.get('DB_USER');
const DB_PASS = env.get('DB_PASS');
const DB_NAME = env.get('DB_NAME');

export type Schema = typeof DbSchema;
export type DbConnection = NodePgDatabase<Schema>;
export type DbTransaction = PgTransaction<
  NodePgQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;

export class Db {
  private static instance: Db;
  private pool!: Pool;
  connection: DbConnection | null = null;
  client: PoolClient | null = null;
  _opts: PoolConfig = Db.connectionOpts();

  public static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  static connectionOpts() {
    return {
      host: DB_HOST as string,
      port: Number(DB_PORT) as number,
      user: DB_USER as string,
      password: DB_PASS as string,
      database: DB_NAME as string,
      ssl: Boolean(env.get('SSL')) as boolean,
    };
  }

  setOpts(opts: PoolConfig) {
    this._opts = opts;
  }

  async conn(): Promise<DbConnection> {
    if (!this.pool) {
      this.pool = new Pool(this._opts);
    }
    if (!this.client) {
      await this.connect();
    }
    this.connection = drizzle(this.pool, { schema: DbSchema });
    return this.connection;
  }

  async connect(): Promise<void> {
    if (!this.pool) {
      this.pool = new Pool(this._opts);
    }
    if (!this.client) {
      logger.info('🚨 Connecting to database...');
      this.client = await this.pool.connect();
      logger.info('✅ Database connected');
    }
  }

  async close(): Promise<void> {
    if (this.client) {
      logger.info('🚨 Closing database connection...');
      this.client.release(true);
      this.client = null;
      this.connection = null;
      await this.pool.end();
      logger.info('✅ Database connection closed');
    }
  }

  async migrate(): Promise<void> {
    const conn = await this.conn();
    await migrate(conn, {
      migrationsFolder: path.join(__dirname, '../../../drizzle'),
      migrationsTable: 'migrations',
      migrationsSchema: 'public',
    });
    logger.info('✅ Database migrated');
  }

  async cleanFull(): Promise<void> {
    const query = sql`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `;
    logger.info('🚨 Cleaning database...');
    const conn = await this.conn();
    await conn.execute(query);
    logger.info('✅ Database cleaned');
  }

  async execSQL(raw: string): Promise<unknown> {
    logger.info('🚨 Executing SQL...', raw);
    const query = sql.raw(`${raw}`);
    const conn = await this.conn();
    const res = await conn.execute(query);
    logger.info('✅ Executed SQL', res);
    return res;
  }
}

export const db = Db.getInstance();
