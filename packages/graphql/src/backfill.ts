import { logger } from './core/Logger';
import { client } from './graphql/GraphQLSDK';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

const RANGE_START = 52734751;
const RANGE_END = 52758580;
const CHUNK_SIZE = 10;
const CONCURRENCY = 5;

async function hydrateAndUpdate(connection: DatabaseConnection, blocks: any[]) {
  for (const block of blocks) {
    const height = Number(block.header.height);

    // Hydrate status.block on each transaction (same as syncer does)
    for (const transaction of block.transactions) {
      if (!transaction.status) continue;
      if (
        ['FailureStatus', 'SuccessStatus'].includes(
          transaction.status.__typename,
        )
      ) {
        transaction.status.block = {
          ...block,
          transactions: [],
          transactionIds: [],
        };
      }
    }
    (block as any).transactionIds = block.transactions.map((t: any) => t.id);

    const queries: { statement: string; params: any }[] = [
      {
        statement:
          "UPDATE indexer.blocks SET data = $1 WHERE _id = $2 AND NOT (data ? 'height')",
        params: [block, height],
      },
      ...block.transactions.map((tx: any) => ({
        statement:
          'UPDATE indexer.transactions SET data = $1 WHERE tx_hash = $2',
        params: [tx, tx.id],
      })),
    ];

    await connection.executeTransaction(queries);
  }
}

async function main() {
  const connection = DatabaseConnection.getInstance();

  const broken = await connection.query(
    "SELECT count(*)::int as cnt FROM indexer.blocks WHERE _id BETWEEN $1 AND $2 AND NOT (data ? 'height')",
    [RANGE_START, RANGE_END],
  );
  const brokenCount = broken[0]?.cnt ?? 0;
  if (brokenCount === 0) {
    logger.info('Backfill', 'No broken blocks found, skipping.');
    process.exit(0);
  }

  logger.info('Backfill', `Found ${brokenCount} broken blocks, backfilling...`);

  const total = RANGE_END - RANGE_START + 1;
  let processed = 0;
  let updated = 0;

  for (
    let cursor = RANGE_START;
    cursor <= RANGE_END;
    cursor += CHUNK_SIZE * CONCURRENCY
  ) {
    const fetches = [];
    for (let c = 0; c < CONCURRENCY; c++) {
      const from = cursor + c * CHUNK_SIZE;
      if (from > RANGE_END) break;
      const size = Math.min(CHUNK_SIZE, RANGE_END - from + 1);
      fetches.push(
        client.sdk
          .blocks({ after: String(from - 1), first: size })
          .then((res) => res.data.blocks.nodes)
          .catch((e) => {
            logger.error('Backfill', `Fetch failed at ${from}: ${e.message}`);
            return [];
          }),
      );
    }

    const results = await Promise.all(fetches);
    for (const blocks of results) {
      if (blocks.length === 0) continue;
      await hydrateAndUpdate(connection, blocks as any[]);
      updated += blocks.length;
    }

    processed += CHUNK_SIZE * CONCURRENCY;
    const pct = Math.min(100, (processed / total) * 100).toFixed(1);
    logger.info(
      'Backfill',
      `Progress: ${pct}% (${updated} blocks updated, cursor=${cursor + CHUNK_SIZE * CONCURRENCY})`,
    );
  }

  // Verify
  const remaining = await connection.query(
    "SELECT count(*) as cnt FROM indexer.blocks WHERE _id BETWEEN $1 AND $2 AND NOT (data ? 'height')",
    [RANGE_START, RANGE_END],
  );
  const cnt = remaining[0]?.cnt ?? 0;
  if (cnt > 0) {
    logger.warn(
      'Backfill',
      `${cnt} broken blocks remain — will retry on next restart`,
    );
  } else {
    logger.info('Backfill', 'Complete. All blocks fixed.');
  }
  process.exit(0);
}

main().catch((e) => {
  logger.error('Backfill', `Error: ${e.message} — will retry on next restart`);
  process.exit(0);
});
