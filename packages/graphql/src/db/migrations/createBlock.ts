import { DatabaseConnection } from '../../infra/database/DatabaseConnection';

async function migrate() {
  const db = DatabaseConnection.getInstance();

  // Step 1: Drop the existing indexer schema if it exists
  await db.query(
    `
    DROP SCHEMA IF EXISTS indexer CASCADE;
    `,
    [], // Provide an empty array for query parameters
  );
  console.log('Existing indexer schema dropped if it was present.');

  // Step 2: Create the new indexer schema
  await db.query(
    `
    CREATE SCHEMA indexer;
    `,
    [],
  );
  console.log('New indexer schema created successfully.');

  // Step 3: Create the blocks table
  await db.query(
    `
    CREATE TABLE indexer.blocks (
        _id INTEGER PRIMARY KEY,
        id CHARACTER VARYING(66) NOT NULL UNIQUE,
        timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        data JSONB NOT NULL,
        gas_used CHARACTER VARYING(66),
        producer CHARACTER VARYING(66)
    );
    `,
    [],
  );
  console.log('Blocks table created successfully.');

  // Step 4: Create indexes for blocks table
  await db.query(
    `
    CREATE UNIQUE INDEX ON indexer.blocks(_id);
    CREATE UNIQUE INDEX ON indexer.blocks(id);
    CREATE INDEX ON indexer.blocks(timestamp);
    CREATE INDEX ON indexer.blocks(id);
    CREATE INDEX ON indexer.blocks(_id);
    `,
    [],
  );
  console.log('Indexes for blocks table created successfully.');

  // Step 5: Create the transactions table
  await db.query(
    `
    CREATE TABLE indexer.transactions (
        _id CHARACTER VARYING(66) PRIMARY KEY,
        tx_hash CHARACTER VARYING(66) NOT NULL UNIQUE,
        timestamp TIMESTAMP WITHOUT TIME ZONE,
        data JSONB NOT NULL,
        block_id INTEGER NOT NULL REFERENCES indexer.blocks(_id)
    );
    `,
    [],
  );
  console.log('Transactions table created successfully.');

  // Step 6: Create indexes for transactions table
  await db.query(
    `
    CREATE UNIQUE INDEX ON indexer.transactions(_id);
    CREATE UNIQUE INDEX ON indexer.transactions(tx_hash);
    CREATE INDEX ON indexer.transactions(timestamp);
    CREATE INDEX ON indexer.transactions(_id);
    CREATE INDEX ON indexer.transactions(block_id);
    CREATE INDEX ON indexer.transactions(tx_hash);
    `,
    [],
  );
  console.log('Indexes for transactions table created successfully.');

  // Step 7: Create the contracts table
  await db.query(
    `
    CREATE TABLE indexer.contracts (
        _id SERIAL PRIMARY KEY,
        contract_hash CHARACTER VARYING(66) NOT NULL UNIQUE,
        data JSONB NOT NULL
    );
    `,
    [],
  );
  console.log('Contracts table created successfully.');

  // Step 8: Create indexes for contracts table
  await db.query(
    `
    CREATE UNIQUE INDEX ON indexer.contracts(_id);
    CREATE UNIQUE INDEX ON indexer.contracts(contract_hash);
    CREATE INDEX ON indexer.contracts(_id);
    CREATE INDEX ON indexer.contracts(contract_hash);
    `,
    [],
  );
  console.log('Indexes for contracts table created successfully.');

  // Step 9: Create the inputs table
  await db.query(
    `
    CREATE TABLE indexer.inputs (
        _id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        transaction_id CHARACTER VARYING(66) NOT NULL REFERENCES indexer.transactions(_id)
    );
    `,
    [],
  );
  console.log('Inputs table created successfully.');

  // Step 10: Create indexes for inputs table
  await db.query(
    `
    CREATE UNIQUE INDEX ON indexer.inputs(_id);
    CREATE INDEX ON indexer.inputs(_id);
    CREATE INDEX ON indexer.inputs(transaction_id);
    `,
    [],
  );
  console.log('Indexes for inputs table created successfully.');

  // Step 11: Create the outputs table
  await db.query(
    `
    CREATE TABLE indexer.outputs (
        _id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        transaction_id CHARACTER VARYING(66) NOT NULL REFERENCES indexer.transactions(_id)
    );
    `,
    [],
  );
  console.log('Outputs table created successfully.');

  // Step 12: Create indexes for outputs table
  await db.query(
    `
    CREATE UNIQUE INDEX ON indexer.outputs(_id);
    CREATE INDEX ON indexer.outputs(_id);
    CREATE INDEX ON indexer.outputs(transaction_id);
    `,
    [],
  );
  console.log('Indexes for outputs table created successfully.');

  // Step 13: Create the predicates table
  await db.query(
    `
    CREATE TABLE indexer.predicates (
        _id SERIAL PRIMARY KEY,
        bytecode TEXT NOT NULL,
        address CHARACTER VARYING(66) NOT NULL UNIQUE
    );
    `,
    [],
  );
  console.log('Predicates table created successfully.');

  // Step 14: Create indexes for predicates table
  await db.query(
    `
    CREATE UNIQUE INDEX ON indexer.predicates(_id);
    CREATE UNIQUE INDEX ON indexer.predicates(address);
    CREATE INDEX ON indexer.predicates(_id);
    CREATE INDEX ON indexer.predicates(address);
    `,
    [],
  );
  console.log('Indexes for predicates table created successfully.');

  // Step 15: Create the transactions_accounts table
  await db.query(
    `
    CREATE TABLE indexer.transactions_accounts (
        _id TEXT NOT NULL,
        block_id INTEGER NOT NULL,
        tx_hash TEXT NOT NULL,
        account_hash TEXT NOT NULL,
        PRIMARY KEY (_id, block_id, tx_hash, account_hash)
    );
    `,
    [],
  );
  console.log('Transactions_Accounts table created successfully.');

  // Step 16: Create indexes for transactions_accounts table
  await db.query(
    `
    CREATE INDEX ON indexer.transactions_accounts (_id);
    CREATE INDEX ON indexer.transactions_accounts (block_id);
    CREATE INDEX ON indexer.transactions_accounts (tx_hash);
    CREATE INDEX ON indexer.transactions_accounts (account_hash);
    `,
    [],
  );
  console.log('Indexes for transactions_accounts table created successfully.');
}

migrate()
  .catch(console.error)
  .finally(() => process.exit());
