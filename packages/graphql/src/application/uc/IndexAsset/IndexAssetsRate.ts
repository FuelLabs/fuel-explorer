import { env } from '~/config';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export default class IndexAssetsRate {
  async execute() {
    logger.info('IndexAssetsRate', 'Starting rate indexing...');
    const connection = DatabaseConnection.getInstance();
    const mapping = await connection.query(
      'select * from indexer.assets_rate_provider',
      [],
    );
    logger.info(
      'IndexAssetsRate',
      `Found ${mapping.length} assets in rate provider table`,
    );

    // Separate assets by provider
    const coingeckoAssets = mapping.filter(
      (m: any) => m.provider === 'coingecko',
    );
    const cmcDexAssets = mapping.filter((m: any) => m.provider === 'cmc-dex');

    logger.info(
      'IndexAssetsRate',
      `CoinGecko: ${coingeckoAssets.length}, CMC DEX: ${cmcDexAssets.length}`,
    );

    // Fetch CoinGecko prices
    if (coingeckoAssets.length > 0) {
      await this.fetchCoingeckoPrices(connection, coingeckoAssets);
    }

    // Fetch CMC DEX prices
    if (cmcDexAssets.length > 0) {
      await this.fetchCmcDexPrices(connection, cmcDexAssets);
    }

    logger.info('IndexAssetsRate', 'Rate indexing complete');
  }

  private async fetchCoingeckoPrices(connection: any, assets: any[]) {
    logger.info('IndexAssetsRate', 'Fetching CoinGecko prices...');
    const ids = assets.map((m: any) => m.value).join(',');
    try {
      const response = await fetch(
        `https://pro-api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${ids}`,
        {
          headers: {
            Accept: 'application/json',
            'x-cg-pro-api-key': env.get('COINGECKO_API_KEY') || '',
          },
        },
      );
      const data = await response.json();
      logger.debug(
        'IndexAssetsRate',
        `CoinGecko response: ${JSON.stringify(data).slice(0, 200)}...`,
      );

      let successCount = 0;
      for (const asset of assets) {
        const rate = data[asset.value]?.usd;
        if (rate) {
          await connection.query(
            'insert into indexer.assets_rates (asset_id, symbol, rate, timestamp) values ($1, $2, $3, $4)',
            [asset.asset_id, asset.symbol, rate, new Date()],
          );
          successCount++;
        }
      }
      logger.info(
        'IndexAssetsRate',
        `CoinGecko: saved ${successCount}/${assets.length} rates`,
      );
    } catch (error) {
      logger.error('IndexAssetsRate', `CoinGecko fetch failed: ${error}`);
    }
  }

  private async fetchCmcDexPrices(connection: any, assets: any[]) {
    logger.info('IndexAssetsRate', 'Fetching CMC DEX prices...');
    for (const asset of assets) {
      try {
        const url = `https://dapi.coinmarketcap.com/u-kline/v1/k-line/candles?platform=${encodeURIComponent(asset.value)}&address=${asset.asset_id}&unit=usd&pm=p&interval=1h&limit=1`;
        logger.debug(
          'IndexAssetsRate',
          `CMC DEX request: ${asset.symbol} -> ${url}`,
        );

        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        logger.debug(
          'IndexAssetsRate',
          `CMC DEX response for ${asset.symbol}: ${JSON.stringify(data)}`,
        );

        // Extract close price from the latest candle [open, high, low, close, volume, timestamp]
        const rate = data?.data?.[0]?.[3];
        if (rate) {
          await connection.query(
            'insert into indexer.assets_rates (asset_id, symbol, rate, timestamp) values ($1, $2, $3, $4)',
            [asset.asset_id, asset.symbol, rate, new Date()],
          );
          logger.info('IndexAssetsRate', `CMC DEX: ${asset.symbol} = $${rate}`);
        } else {
          logger.info(
            'IndexAssetsRate',
            `CMC DEX: No rate found for ${asset.symbol}`,
          );
        }
      } catch (error) {
        logger.error(
          'IndexAssetsRate',
          `Failed to fetch CMC DEX price for ${asset.symbol}: ${error}`,
        );
      }
    }
  }
}
