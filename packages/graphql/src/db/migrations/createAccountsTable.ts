import { DatabaseConnection } from '../../infra/database/DatabaseConnection';

async function migrate() {
  const db = DatabaseConnection.getInstance();

  // Step 1: Drop the existing table if it exists
  await db.query(
    `
    DROP TABLE IF EXISTS accounts;
    `,
    [], // Provide an empty array for query parameters
  );
  console.log('Existing table dropped if it was present.');

  // Step 2: Create the new table with the desired schema
  await db.query(
    `
    CREATE TABLE IF NOT EXISTS accounts (
        _id SERIAL PRIMARY KEY,  -- Auto-incrementing ID
        address TEXT NOT NULL UNIQUE,
        transaction_count INTEGER NOT NULL DEFAULT 0,
        balance BIGINT NOT NULL DEFAULT 0,
        data JSONB NOT NULL DEFAULT '{}',
        createTime TIMESTAMPTZ DEFAULT NOW(), -- Column for account creation time
        updateTime TIMESTAMPTZ DEFAULT NOW()  -- Column for the last update time
    );
    `,
    [], // Provide an empty array as the second argument
  );
  console.log('New table created successfully.');
}

migrate()
  .catch(console.error)
  .finally(() => process.exit());
