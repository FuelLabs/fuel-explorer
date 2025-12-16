#!/usr/bin/env tsx
/**
 * Setup _migrations table for production deployment
 *
 * This script populates the _migrations table with existing migration filenames
 * WITHOUT re-running them. It reads the current version from the old migration
 * system (indexer.migration.version) and marks migrations up to that version as applied.
 *
 * Usage:
 *   pnpm db:migrate:setup
 *
 * This should be run ONCE during the migration system upgrade, before
 * running any new migrations with `pnpm db:migrate`.
 */

import fs from 'node:fs';
import { DatabaseConnection } from '../src/infra/database/DatabaseConnection';
import { DB_SCHEMA, MIGRATIONS_DIR, MigrationRunner } from './migrate';

async function setupMigrations(): Promise<void> {
  const db = DatabaseConnection.getInstance();
  const runner = new MigrationRunner();

  console.log('🔧 Setting up _migrations table...\n');
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

  // Get current version from old migration system
  let currentVersion = -1;
  try {
    const versionResult = await db.query(
      `SELECT version FROM ${DB_SCHEMA}.migration LIMIT 1`,
      [],
    );
    if (versionResult.length > 0) {
      currentVersion = versionResult[0].version;
      console.log(
        `📊 Current migration version (old system): ${currentVersion}`,
      );
    }
  } catch {
    console.log('📊 No old migration table found, will mark all as applied');
  }

  // Ensure _migrations table exists
  await runner.ensureMigrationsTable();

  // Get all migration files
  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  console.log(`Found ${files.length} migration files\n`);

  // Check which are already set up
  const existing = await db.query(
    `SELECT filename FROM ${DB_SCHEMA}._migrations`,
    [],
  );
  const existingSet = new Set(existing.map((r: any) => r.filename));

  let added = 0;
  let skipped = 0;
  let pending = 0;

  for (const file of files) {
    // Extract migration number from filename (e.g., "001" from "001_create_schema.sql")
    const match = file.match(/^(\d+)_/);
    if (!match) {
      console.log(`⚠️  Skipping ${file} (invalid filename format)`);
      continue;
    }

    const migrationNum = Number.parseInt(match[1], 10);
    // Old version N corresponds to new migration N+1
    // e.g., version 31 = migrations 001-032 have been run
    const maxMigrationToSetup = currentVersion + 1;

    if (existingSet.has(file)) {
      console.log(`⏭️  Skipping ${file} (already exists)`);
      skipped++;
    } else if (currentVersion >= 0 && migrationNum > maxMigrationToSetup) {
      console.log(
        `⏸️  Pending ${file} (not yet applied, version ${currentVersion})`,
      );
      pending++;
    } else {
      await db.query(
        `INSERT INTO ${DB_SCHEMA}._migrations (filename) VALUES ($1)`,
        [file],
      );
      console.log(`✅ Added ${file}`);
      added++;
    }
  }

  console.log(
    `\n✅ Done! Added ${added}, skipped ${skipped}, pending ${pending}\n`,
  );

  if (pending > 0) {
    console.log(
      `Run 'pnpm db:migrate' to apply the ${pending} pending migration(s).\n`,
    );
  }

  process.exit(0);
}

setupMigrations().catch((error) => {
  console.error(`\n❌ Setup failed: ${error.message}\n`);
  process.exit(1);
});
