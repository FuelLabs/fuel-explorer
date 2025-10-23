import { env } from '~/config';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export default class IndexAssetsRate {
  async execute() {
    logger.debug('Timer', 'IndexAssetsRate');
    const connection = DatabaseConnection.getInstance();
    const mapping = await connection.query(
      'select * from indexer.assets_rate_provider',
      [],
    );
    const ids = mapping.map((map) => map.value).join(',');
    const response = await fetch(
      `https://pro-api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${ids}`,
      {
        headers: {
          Accept: 'application/json',
          'x-cg-pro-api-key': env.get('COINGECKO_API_KEY') || '',
        },
      },
    );
    const assets = await response.json();
    for (const asset of mapping) {
      const rate = assets[asset.value].usd;
      await connection.query(
        'insert into indexer.assets_rates (asset_id, symbol, rate, timestamp) values ($1, $2, $3, $4)',
        [asset.asset_id, asset.symbol, rate, new Date()],
      );
    }
  }
}
