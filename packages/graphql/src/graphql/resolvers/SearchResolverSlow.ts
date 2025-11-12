import { isB256 } from 'fuels';
import { Hash256 } from '~/application/vo';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import DataCache from '~/infra/cache/DataCache';
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
    // Check cache first (10-minute TTL for slow queries - they're expensive)
    const cacheKey = `searchSlow:${params.query.toLowerCase()}`;
    const cachedResult = DataCache.getInstance().get(cacheKey);
    if (cachedResult !== undefined) {
      return cachedResult;
    }

    // Skip block height check (already handled by fast resolver)
    const address = Hash256.create(params.query).value();
    const transactionDAO = new TransactionDAO();

    // Slow queries: account transactions only
    // Assets are rarely searched and not critical for the initial result
    // Use recent transactions view for better performance on high-volume accounts
    const transactionsResult =
      await transactionDAO.getRecentTransactionsByOwner(address);

    if (
      transactionsResult &&
      Array.isArray(transactionsResult) &&
      transactionsResult.length > 0
    ) {
      const result = {
        account: {
          address,
          transactions: transactionsResult.map(
            (transaction: TransactionEntity) => transaction.toGQLListNode(),
          ),
        },
      };
      DataCache.getInstance().save(cacheKey, 600000, result); // 10 min TTL
      return result;
    }

    // Return empty account if valid B256 but no results
    if (isB256(address)) {
      const result = {
        account: {
          address,
          transactions: [],
        },
      };
      DataCache.getInstance().save(cacheKey, 600000, result); // 10 min TTL
      return result;
    }

    // Cache null result with shorter TTL (2 minutes) for non-B256 addresses
    DataCache.getInstance().save(cacheKey, 120000, null);
    return null;
  }
}
