#!/usr/bin/env tsx
/**
 * Database Migration Runner
 *
 * Reads all .sql files from database/migrations/ and executes pending ones.
 * Tracks executed migrations in {schema}._migrations table.
 * Statements execute individually (like psql -f), with graceful error handling.
 */

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseConnection } from '../src/infra/database/DatabaseConnection';

interface MigrationRecord {
  id: number;
  filename: string;
  executed_at: Date;
}

export const DB_SCHEMA = process.env.DB_SCHEMA || 'indexer';
export const MIGRATIONS_DIR = path.join(__dirname, '../database/migrations');

export class MigrationRunner {
  private db: DatabaseConnection;

  constructor() {
    this.db = DatabaseConnection.getInstance();
  }

  /**
   * Ensure migrations tracking table exists
   */
  async ensureMigrationsTable(): Promise<void> {
    // Check if schema exists first (don't create - let migrations handle it)
    const schemaExists = await this.db.query(
      'SELECT 1 FROM information_schema.schemata WHERE schema_name = $1',
      [DB_SCHEMA],
    );

    if (schemaExists.length === 0) {
      // Schema doesn't exist yet - will be created by first migration
      return;
    }

    const sql = `
      CREATE TABLE IF NOT EXISTS ${DB_SCHEMA}._migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await this.db.query(sql, []);
  }

  /**
   * Get list of executed migrations
   */
  async getExecutedMigrations(): Promise<Set<string>> {
    try {
      // Check if schema exists first
      const schemaExists = await this.db.query(
        'SELECT 1 FROM information_schema.schemata WHERE schema_name = $1',
        [DB_SCHEMA],
      );
      if (schemaExists.length === 0) {
        return new Set();
      }

      const result = await this.db.query(
        `SELECT filename FROM ${DB_SCHEMA}._migrations ORDER BY filename`,
        [],
      );
      return new Set(result.map((r: MigrationRecord) => r.filename));
    } catch {
      return new Set();
    }
  }

  /**
   * Get all migration files sorted by filename
   */
  async getAllMigrationFiles(): Promise<string[]> {
    // Check if migrations directory exists
    if (!fs.existsSync(MIGRATIONS_DIR)) {
      console.log(`Creating migrations directory: ${MIGRATIONS_DIR}`);
      fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
      return [];
    }

    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((file) => file.endsWith('.sql'))
      .sort(); // Lexicographic sort (001, 002, etc.)

    return files;
  }

  /**
   * Get pending migrations
   */
  async getPendingMigrations(): Promise<string[]> {
    const executed = await this.getExecutedMigrations();
    const allFiles = await this.getAllMigrationFiles();
    return allFiles.filter((file) => !executed.has(file));
  }

  /**
   * Execute a single migration with schema replacement
   */
  async executeMigration(filename: string, dryRun = false): Promise<void> {
    const filePath = path.join(MIGRATIONS_DIR, filename);
    let sql = fs.readFileSync(filePath, 'utf-8');

    // Replace schema references if DB_SCHEMA is different
    if (DB_SCHEMA !== 'indexer') {
      sql = sql.replace(/\bindexer\./g, `${DB_SCHEMA}.`);
      sql = sql.replace(
        /CREATE SCHEMA IF NOT EXISTS indexer/g,
        `CREATE SCHEMA IF NOT EXISTS ${DB_SCHEMA}`,
      );
    }

    if (dryRun) {
      console.log(`\n[DRY RUN] Would execute: ${filename}`);
      console.log('─'.repeat(80));
      console.log(sql.slice(0, 500) + (sql.length > 500 ? '...' : ''));
      console.log('─'.repeat(80));
      return;
    }

    // Split into statements and execute individually (like psql -f)
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => {
        if (s.length === 0) return false;
        // Remove pure comment blocks (all lines start with --)
        const lines = s
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0);
        return lines.some((line) => !line.startsWith('--'));
      });

    const total = statements.length;
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.replace(/\s+/g, ' ').slice(0, 60);
      process.stdout.write(`  [${i + 1}/${total}] ${preview}...`);
      const stmtStart = Date.now();
      try {
        await this.db.query(statement, []);
        console.log(` ${Date.now() - stmtStart}ms`);
      } catch (error: any) {
        // Ignore common non-fatal errors (match psql -f behavior)
        const ignorable =
          error.code === '23505' || // duplicate key
          error.code === '42P07' || // relation already exists
          error.code === '42710' || // object already exists
          error.code === '42704' || // role/object does not exist (for GRANT)
          error.code === '42P01' || // relation does not exist
          error.code === '0A000' || // cannot alter type used by view
          error.message?.includes('already exists') ||
          error.message?.includes('does not exist') ||
          error.message?.includes('cannot alter type');
        if (ignorable) {
          console.log(` skipped (${error.code || 'exists'})`);
        } else {
          console.log(' FAILED');
          throw new Error(`Failed to execute ${filename}: ${error.message}`);
        }
      }
    }

    // Ensure _migrations table exists (schema should exist now after first migration)
    await this.ensureMigrationsTable();

    // Record successful migration
    await this.db.query(
      `INSERT INTO ${DB_SCHEMA}._migrations (filename) VALUES ($1)`,
      [filename],
    );
  }

  /**
   * Run all pending migrations
   */
  async run(dryRun = false): Promise<void> {
    console.log('🔍 Checking for pending migrations...\n');

    await this.ensureMigrationsTable();
    const pending = await this.getPendingMigrations();

    if (pending.length === 0) {
      console.log('✅ No pending migrations\n');
      return;
    }

    console.log(`Found ${pending.length} pending migration(s):\n`);
    for (const file of pending) {
      console.log(`  - ${file}`);
    }
    console.log('');

    if (dryRun) {
      console.log('🔍 DRY RUN MODE - No changes will be made\n');
    }

    for (let i = 0; i < pending.length; i++) {
      const file = pending[i];
      const startTime = Date.now();

      console.log(`[${i + 1}/${pending.length}] Running ${file}...`);

      try {
        await this.executeMigration(file, dryRun);
        const duration = Date.now() - startTime;
        console.log(`✅ Completed in ${duration}ms\n`);
      } catch (error: any) {
        console.error(`❌ Failed: ${error.message}\n`);
        process.exit(1);
      }
    }

    if (!dryRun) {
      console.log(`✅ Successfully executed ${pending.length} migration(s)\n`);
    } else {
      console.log(
        `🔍 DRY RUN: ${pending.length} migration(s) would be executed\n`,
      );
    }
  }

  /**
   * Show migration status
   */
  async status(): Promise<void> {
    await this.ensureMigrationsTable();

    const executed = await this.getExecutedMigrations();
    const allFiles = await this.getAllMigrationFiles();
    const pending = allFiles.filter((f) => !executed.has(f));

    console.log('\n=== Migration Status ===\n');
    console.log(`Schema: ${DB_SCHEMA}`);
    console.log(`Total migrations: ${allFiles.length}`);
    console.log(`Executed: ${executed.size}`);
    console.log(`Pending: ${pending.length}\n`);

    if (allFiles.length > 0) {
      console.log('Migrations:');
      console.log('─'.repeat(80));
      console.log(
        `${'Filename'.padEnd(50)} ${'Status'.padEnd(15)} ${'Executed'}`,
      );
      console.log('─'.repeat(80));

      for (const file of allFiles) {
        const status = executed.has(file) ? '✅ executed' : '⏳ pending';
        console.log(
          `${file.padEnd(50)} ${status.padEnd(15)} ${executed.has(file) ? 'Yes' : 'No'}`,
        );
      }

      console.log('─'.repeat(80));
    }

    console.log('');
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const showStatus = args.includes('--status');
  const showHelp = args.includes('--help') || args.includes('-h');

  if (showHelp) {
    console.log(`
Database Migration Runner

Usage:
  tsx scripts/migrate.ts [options]

Options:
  --dry-run    Preview pending migrations without executing
  --status     Show migration status
  --help, -h   Show this help message

Environment Variables:
  DB_SCHEMA    Schema to use (default: indexer)
  DB_HOST      Database host
  DB_PORT      Database port
  DB_USER      Database user
  DB_PASS      Database password
  DB_NAME      Database name

Examples:
  tsx scripts/migrate.ts              Run pending migrations
  tsx scripts/migrate.ts --dry-run    Preview pending migrations
  tsx scripts/migrate.ts --status     Show migration status
`);
    process.exit(0);
  }

  const runner = new MigrationRunner();

  try {
    if (showStatus) {
      await runner.status();
    } else {
      await runner.run(dryRun);
    }
    process.exit(0);
  } catch (error: any) {
    console.error(`\n❌ Migration failed: ${error.message}\n`);
    process.exit(1);
  }
}

main();
