import path from 'node:path';
import {
  type NodePgDatabase,
  type NodePgQueryResultHKT,
  drizzle,
} from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool, type PoolClient } from 'pg';
import { env } from '~/config';

import { type ExtractTablesWithRelations, sql } from 'drizzle-orm';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import * as DbSchema from './DbSchema';

const DB_HOST = env.get('DB_HOST');
const DB_PORT = env.get('DB_PORT');
const DB_USER = env.get('DB_USER');
const DB_PASS = env.get('DB_PASS');
const DB_NAME = env.get('DB_NAME');

type Schema = typeof DbSchema;
export type DbConnection = NodePgDatabase<Schema>;
export type DbTransaction = PgTransaction<
  NodePgQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;

export class Db {
  #pool: Pool;
  isConnected = false;
  private static instance: Db;

  constructor() {
    this.#pool = new Pool(this.connectionOpts);
  }

  get connectionOpts() {
    return {
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      ssl: env.get('SSL'),
    };
  }

  async connection() {
    if (!this.isConnected) await this.connect();
    return drizzle(this.#pool, { schema: DbSchema });
  }

  async connect() {
    console.log('🚨 Connecting to database...');
    const client = await this.#pool.connect();
    console.log('✅ Database connected');
    this.isConnected = true;
    return client;
  }

  async close(client?: PoolClient) {
    console.log('🚨 Closing database...');
    client?.release(true);
    console.log('✅ Database closed');
  }

  async migrate() {
    const client = await this.connect();
    const conn = await this.connection();
    await migrate(conn, {
      migrationsFolder: path.join(__dirname, '../../../drizzle'),
      migrationsTable: 'migrations',
      migrationsSchema: 'public',
    });
    await this.close(client);
    console.log('✅ Database migrated');
  }

  async clean() {
    const query = sql`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `;

    console.log('🚨 Cleaning database...');
    const conn = await this.connection();
    await conn.execute(query);
    console.log('✅ Database cleaned');
    await this.migrate();
  }

  async execSQL(raw: string) {
    console.log('🚨 Executing SQL...');
    console.log(raw);
    const query = sql.raw(`${raw}`);
    const conn = await this.connection();
    const res = await conn.execute(query);
    console.log('✅ Executed SQL');
    console.log(res);
  }

  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
}

export const db = Db.getInstance();
