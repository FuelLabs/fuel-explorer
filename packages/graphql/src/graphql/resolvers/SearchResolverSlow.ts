import { isB256 } from 'fuels';
import { Hash256 } from '~/application/vo';
import { logger } from '~/core/Logger';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import DataCache from '~/infra/cache/DataCache';
import AssetDAO from '~/infra/dao/AssetDAO';
import TransactionDAO from '~/infra/dao/TransactionDAO';

type Params = {
  search: { query: string };
};

export class SearchResolverSlow {
  static create() {
    const resolvers = new SearchResolverSlow();
    return {
      Query: {
        searchSlow: resolvers.searchSlow,
      },
    };
  }

  async searchSlow(_null: any, params: Params['search']) {
    logger.debug('GraphQL', 'SearchResolverSlow.searchSlow', {
      query: params.query,
    });

    // Check cache first (10-minute TTL for slow queries - they're expensive)
    const cacheKey = `searchSlow:${params.query.toLowerCase()}`;
    const cachedResult = DataCache.getInstance().get(cacheKey);
    if (cachedResult !== undefined) {
      logger.debug('GraphQL', 'SearchResolverSlow.searchSlow - cache hit', {
        query: params.query,
      });
      return cachedResult;
    }

    // Skip block height check (already handled by fast resolver)
    const address = Hash256.create(params.query).value();
    const transactionDAO = new TransactionDAO();
    const assetDAO = new AssetDAO();

    // Slow queries: account transactions and assets
    // Use recent transactions view for better performance on high-volume accounts
    const results = await Promise.allSettled([
      assetDAO.getByAssetId(address),
      transactionDAO.getRecentTransactionsByOwner(address),
    ]);

    const [assetResult, transactionsResult] = results;

    // Priority order: Asset > Account

    if (assetResult.status === 'fulfilled' && assetResult.value) {
      logger.debug('GraphQL', 'SearchResolverSlow.searchSlow - found asset');
      const result = {
        asset: assetResult.value,
      };
      DataCache.getInstance().save(cacheKey, 600000, result); // 10 min TTL
      return result;
    }

    if (
      transactionsResult.status === 'fulfilled' &&
      transactionsResult.value &&
      transactionsResult.value.length > 0
    ) {
      logger.debug(
        'GraphQL',
        'SearchResolverSlow.searchSlow - found account with transactions',
      );
      const result = {
        account: {
          address,
          transactions: transactionsResult.value.map(
            (transaction: TransactionEntity) => transaction.toGQLNode(),
          ),
        },
      };
      DataCache.getInstance().save(cacheKey, 600000, result); // 10 min TTL
      return result;
    }

    // Return empty account if valid B256 but no results
    if (isB256(address)) {
      logger.debug(
        'GraphQL',
        'SearchResolverSlow.searchSlow - valid B256 but no results',
      );
      const result = {
        account: {
          address,
          transactions: [],
        },
      };
      DataCache.getInstance().save(cacheKey, 600000, result); // 10 min TTL
      return result;
    }

    logger.debug('GraphQL', 'SearchResolverSlow.searchSlow - no results found');
    // Cache null result with shorter TTL (2 minutes) for non-B256 addresses
    DataCache.getInstance().save(cacheKey, 120000, null);
    return null;
  }
}
