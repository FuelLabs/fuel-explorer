#!/usr/bin/env tsx
/**
 * Seed _migrations table for production deployment
 *
 * This script populates the _migrations table with existing migration filenames
 * WITHOUT re-running them. Use this when deploying the new migration system
 * to a database that already has all migrations applied.
 *
 * Usage:
 *   pnpm db:migrate:seed
 *
 * This should be run ONCE during the migration system upgrade, before
 * running any new migrations with `pnpm db:migrate`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseConnection } from '../src/infra/database/DatabaseConnection';

const DB_SCHEMA = process.env.DB_SCHEMA || 'indexer';
const MIGRATIONS_DIR = path.join(__dirname, '../database/migrations');

async function seedMigrations(): Promise<void> {
  const db = DatabaseConnection.getInstance();

  console.log('🌱 Seeding _migrations table...\n');
  console.log(`Schema: ${DB_SCHEMA}`);
  console.log(`Migrations directory: ${MIGRATIONS_DIR}\n`);

  // Check if schema exists
  const schemaExists = await db.query(
    'SELECT 1 FROM information_schema.schemata WHERE schema_name = $1',
    [DB_SCHEMA],
  );

  if (schemaExists.length === 0) {
    console.error(`❌ Schema "${DB_SCHEMA}" does not exist.`);
    console.error(
      'Run migrations first or ensure the database has been initialized.\n',
    );
    process.exit(1);
  }

  // Ensure _migrations table exists
  await db.query(
    `
    CREATE TABLE IF NOT EXISTS ${DB_SCHEMA}._migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `,
    [],
  );

  // Get all migration files
  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  console.log(`Found ${files.length} migration files\n`);

  // Check which are already seeded
  const existing = await db.query(
    `SELECT filename FROM ${DB_SCHEMA}._migrations`,
    [],
  );
  const existingSet = new Set(existing.map((r: any) => r.filename));

  let seeded = 0;
  let skipped = 0;

  for (const file of files) {
    if (existingSet.has(file)) {
      console.log(`⏭️  Skipping ${file} (already seeded)`);
      skipped++;
    } else {
      await db.query(
        `INSERT INTO ${DB_SCHEMA}._migrations (filename) VALUES ($1)`,
        [file],
      );
      console.log(`✅ Seeded ${file}`);
      seeded++;
    }
  }

  console.log(`\n✅ Done! Seeded ${seeded} migrations, skipped ${skipped}\n`);

  process.exit(0);
}

seedMigrations().catch((error) => {
  console.error(`\n❌ Seed failed: ${error.message}\n`);
  process.exit(1);
});
