import { setTimeout } from 'node:timers/promises';
import { env } from '~/config';
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
        for (const tx of tx_responses) {
          const [cosmosResponse] = await connection.query(
            'insert into indexer.cosmos_responses (block_height, tx_hash, data, timestamp) values ($1, $2, $3, $4) returning _id',
            [tx.height, tx.txhash, tx.data, tx.timestamp],
          );
          let index = 0;
          for (const event of tx.events) {
            for (const attribute of event.attributes) {
              await connection.query(
                'insert into indexer.cosmos_events (cosmos_response_id, type, key, value, index) values ($1, $2, $3, $4, $5)',
                [
                  cosmosResponse._id,
                  event.type,
                  attribute.key,
                  attribute.value,
                  index,
                ],
              );
            }
            index++;
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
