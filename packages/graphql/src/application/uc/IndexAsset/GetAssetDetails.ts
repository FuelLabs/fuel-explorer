import { env } from '~/config';
import { logger } from '~/core/Logger';
import DataCache from '~/infra/cache/DataCache';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export interface AssetDetails {
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  fully_diluted_valuation: number;
  description: string;
  links: {
    homepage: string[];
    whitepaper: string;
    github: string[];
    reddit: string;
    twitter: string;
    official_forum: string[];
  };
  block_time_in_minutes: number;
  hashing_algorithm: string;
  genesis_date: string;
}

export default class GetAssetDetails {
  async execute(symbol: string): Promise<AssetDetails | null> {
    logger.debug('GetAssetDetails', `Fetching details for asset: ${symbol}`);

    try {
      // Get CoinGecko ID from database
      const connection = DatabaseConnection.getInstance();
      const [mapping] = await connection.query(
        'select value from indexer.assets_rate_provider where symbol = $1',
        [symbol],
      );

      if (!mapping) {
        logger.error(
          'GetAssetDetails',
          `Asset not found in rate provider: ${symbol}`,
        );
        return null;
      }

      const coingeckoId = mapping.value;

      const response = await fetch(
        `https://pro-api.coingecko.com/api/v3/coins/${coingeckoId}`,
        {
          headers: {
            Accept: 'application/json',
            'x-cg-pro-api-key': env.get('COINGECKO_API_KEY') || '',
          },
        },
      );

      if (!response.ok) {
        logger.error(
          'GetAssetDetails',
          `Failed to fetch asset details: ${response.status} ${response.statusText}`,
        );
        return null;
      }

      const rawData = await response.json();

      // Filter and transform the response to only include requested fields
      const filteredData: AssetDetails = {
        market_cap: rawData.market_data?.market_cap?.usd || 0,
        circulating_supply: rawData.market_data?.circulating_supply || 0,
        total_supply: rawData.market_data?.total_supply || 0,
        max_supply: rawData.market_data?.max_supply || 0,
        fully_diluted_valuation:
          rawData.market_data?.fully_diluted_valuation?.usd || 0,
        description: rawData.description?.en || '',
        links: {
          homepage: rawData.links?.homepage || [],
          whitepaper: rawData.links?.whitepaper || '',
          github: rawData.links?.repos_url?.github || [],
          reddit: rawData.links?.subreddit_url || '',
          twitter: rawData.links?.twitter_screen_name || '',
          official_forum: rawData.links?.official_forum_url || [],
        },
        block_time_in_minutes: rawData.block_time_in_minutes || 0,
        hashing_algorithm: rawData.hashing_algorithm || '',
        genesis_date: rawData.genesis_date || '',
      };

      return filteredData;
    } catch (error) {
      logger.error('GetAssetDetails', `Error fetching asset details: ${error}`);
      return null;
    }
  }

  async executeCached(assetId: string): Promise<AssetDetails | null> {
    const cacheKey = `assetDetails_${assetId}`;
    const cachedAssetDetails = DataCache.getInstance().get(cacheKey);
    if (cachedAssetDetails) {
      return cachedAssetDetails;
    }

    const output = await this.execute(assetId);
    if (output) {
      DataCache.getInstance().save(cacheKey, 60000, output);
    }
    return output;
  }
}
