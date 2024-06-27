import path from 'node:path';
import {
  type NodePgDatabase,
  type NodePgQueryResultHKT,
  drizzle,
} from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
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
  #connection: Client;
  isConnected = false;
  private static instance: Db;

  constructor() {
    this.#connection = new Client(this.connectionOpts);
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

  connection() {
    return drizzle(this.#connection, { schema: DbSchema });
  }

  async connect() {
    if (this.isConnected) {
      return;
    }
    await this.#connection.connect();
    this.isConnected = true;
  }

  async close() {
    await this.#connection.end();
  }

  async migrate() {
    await migrate(this.connection(), {
      migrationsFolder: path.join(__dirname, '../../../drizzle'),
      migrationsTable: 'migrations',
      migrationsSchema: 'public',
    });
  }

  async clean() {
    const query = sql`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `;

    console.log('🚨 Cleaning database...');
    await this.connection().execute(query);
    console.log('✅ Database cleaned');
    await this.migrate();
  }

  async execSQL(raw: string) {
    console.log('🚨 Executing SQL...');
    console.log(raw);
    const query = sql.raw(`${raw}`);
    const res = await this.connection().execute(query);
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
