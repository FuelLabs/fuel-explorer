import BigNumber from 'bignumber.js';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export default class IndexBalance {
  async execute() {
    logger.debug('Balance', 'IndexBalance');
    const connection = DatabaseConnection.getInstance();
    const [data] = await connection.query(
      'select block_height as height from indexer.balance_index',
      [],
    );
    let height = data.height;
    while (true) {
      const [block] = await connection.query(
        `select _id as height, data->'transactions' as transactions from indexer.blocks where _id > $1 and jsonb_array_length(data->'transactions') > 1 order by _id limit 1`,
        [height],
      );
      if (!block) {
        return;
      }
      await connection.query(
        'delete from indexer.balance where block_height = $1',
        [block.height],
      );
      for (const transaction of block.transactions) {
        transaction.inputs = transaction.inputs || [];
        transaction.outputs = transaction.outputs || [];
        const index: any = {};
        for (const input of transaction.inputs) {
          if (input.__typename === 'InputCoin') {
            const event = {
              type: 'input',
              accountHash: input.owner,
              assetId: input.assetId,
              amount: input.amount,
            };
            index[event.accountHash] = index[event.accountHash] || {};
            index[event.accountHash][event.assetId] =
              index[event.accountHash][event.assetId] || [];
            index[event.accountHash][event.assetId].push(event);
          }
        }
        for (const output of transaction.outputs) {
          if (
            ['ChangeOutput', 'CoinOutput', 'VariableOutput'].includes(
              output.__typename,
            )
          ) {
            const event = {
              type: 'output',
              accountHash: output.to,
              assetId: output.assetId,
              amount: output.amount,
            };
            index[event.accountHash] = index[event.accountHash] || {};
            index[event.accountHash][event.assetId] =
              index[event.accountHash][event.assetId] || [];
            index[event.accountHash][event.assetId].push(event);
          }
        }
        for (const accountHash in index) {
          for (const assetId in index[accountHash]) {
            const [balanceData] = await connection.query(
              'select balance from indexer.balance where account_hash = $1 and asset_id = $2 order by _id desc limit 1',
              [accountHash, assetId],
            );
            let balance = BigNumber(balanceData ? balanceData.balance : 0);
            const events = index[accountHash][assetId];
            for (const event of events) {
              if (event.type === 'input') {
                balance = balance.minus(BigNumber(event.amount));
              }
              if (event.type === 'output') {
                balance = balance.plus(BigNumber(event.amount));
              }
            }
            await connection.query(
              'insert into indexer.balance (block_height, tx_hash, account_hash, asset_id, balance) values ($1, $2, $3, $4, $5) on conflict do nothing',
              [
                block.height,
                transaction.id,
                accountHash,
                assetId,
                balance.toString(),
              ],
            );
          }
        }
      }
      await connection.query(
        'update indexer.balance_index set block_height = $1',
        [block.height],
      );
      height = block.height;
    }
  }
}
