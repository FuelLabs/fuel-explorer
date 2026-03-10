import { setTimeout } from 'node:timers/promises';
import { env } from '~/config';
import { COSMOS_EXCLUDED_DELEGATOR } from '~/constants/staking';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export default class IndexCosmos {
  async execute() {
    const connection = DatabaseConnection.getInstance();
    const [cosmosIndex] = await connection.query(
      'select * from indexer.cosmos_index',
      [],
    );
    let height = cosmosIndex.block_height;
    await connection.query(
      'delete from indexer.cosmos_events where cosmos_response_id in (select _id from indexer.cosmos_responses where block_height >= $1)',
      [height],
    );
    await connection.query(
      'delete from indexer.cosmos_responses where block_height >= $1',
      [height],
    );
    while (true) {
      try {
        const network = env.get('FUEL_CHAIN');
        const baseUrl =
          network === 'mainnet' ? 'rest-fuel-seq' : 'testnet-rest-fuel-seq';
        const response = await fetch(
          `https://${baseUrl}.simplystaking.xyz/cosmos/tx/v1beta1/txs?query=tx.height=${height}&limit=1000&offset=0`,
        );
        const output = await response.json();
        if (output.total === '0') {
          logger.debug('Cosmos', `Waiting for blocks #${height}`);
          await setTimeout(5000);
          continue;
        }
        logger.debug('Cosmos', `Indexing block #${height}`);
        const tx_responses = output.tx_responses;
        if (!Array.isArray(tx_responses)) {
          logger.debug(
            'Cosmos',
            `Invalid response for block #${height}, skipping`,
          );
          height++;
          await connection.query(
            'update indexer.cosmos_index set block_height = $1',
            [height],
          );
          continue;
        }
        for (const tx of tx_responses) {
          const [cosmosResponse] = await connection.query(
            'insert into indexer.cosmos_responses (block_height, tx_hash, data, timestamp) values ($1, $2, $3, $4) returning _id',
            [tx.height, tx.txhash, tx.data, tx.timestamp],
          );

          const eventRows: any[][] = [];
          let index = 0;
          for (const event of tx.events) {
            for (const attribute of event.attributes) {
              eventRows.push([
                cosmosResponse._id,
                event.type,
                attribute.key,
                attribute.value,
                index,
              ]);
            }
            index++;
          }

          if (eventRows.length > 0) {
            const batchSize = 500;
            for (let i = 0; i < eventRows.length; i += batchSize) {
              const batch = eventRows.slice(i, i + batchSize);
              const placeholders = batch
                .map(
                  (_, idx) =>
                    `($${idx * 5 + 1}, $${idx * 5 + 2}, $${idx * 5 + 3}, $${idx * 5 + 4}, $${idx * 5 + 5})`,
                )
                .join(', ');
              const params = batch.flat();
              await connection.query(
                `INSERT INTO indexer.cosmos_events (cosmos_response_id, type, key, value, index) VALUES ${placeholders}`,
                params,
              );
            }
          }

          // Aggregate L1 delegation events into total_staking_agg
          for (const event of tx.events) {
            if (event.type === 'delegate') {
              const delegatorAttr = event.attributes.find(
                (a: any) => a.key === 'delegator',
              );
              const amountAttr = event.attributes.find(
                (a: any) => a.key === 'amount',
              );
              if (
                delegatorAttr &&
                amountAttr &&
                delegatorAttr.value !== COSMOS_EXCLUDED_DELEGATOR
              ) {
                const amount = amountAttr.value.replace(/[^0-9]/g, '');
                if (amount && BigInt(amount) > 0n) {
                  const day = new Date(tx.timestamp)
                    .toISOString()
                    .split('T')[0];
                  await connection.query(
                    'INSERT INTO indexer.total_staking_agg (day, l1_staked, l2_staked) VALUES ($1, $2, 0) ON CONFLICT (day) DO UPDATE SET l1_staked = indexer.total_staking_agg.l1_staked + $2',
                    [day, amount],
                  );
                }
              }
            }
          }
        }
        height++;
        await connection.query(
          'update indexer.cosmos_index set block_height = $1',
          [height],
        );
      } catch (error: any) {
        logger.debug('Cosmos', `Error indexing ${error.message}`);
        await setTimeout(5000);
      }
    }
  }
}
