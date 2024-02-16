import path from 'path';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import { EnvHelper } from '../helpers/Env';

const env = EnvHelper.requireEnv([
  ['DB_HOST', '127.0.0.1'],
  ['DB_PORT', '5435'],
  ['DB_USER', 'postgres'],
  ['DB_PASSWORD', 'postgres'],
  ['DB_DATABASE', 'postgres'],
  ['INNGEST_EVENT_KEY', 'inngest'],
]);

export class Db {
  #connection: Client;

  constructor() {
    this.#connection = new Client({
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
    });
  }

  connection() {
    return drizzle(this.#connection);
  }

  async connect() {
    await this.#connection.connect();
  }

  async close() {
    await this.#connection.end();
  }

  async migrate() {
    await migrate(this.connection(), {
      migrationsFolder: path.join(__dirname, '../../drizzle'),
    });
  }

  connectionString() {
    return `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`;
  }
}

export const db = new Db();
