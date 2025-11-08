import { isB256 } from 'fuels';
import { Hash256 } from '~/application/vo';
import { logger } from '~/core/Logger';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
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

    // Skip block height check (already handled by fast resolver)
    const address = Hash256.create(params.query).value();
    const transactionDAO = new TransactionDAO();
    const assetDAO = new AssetDAO();

    // Slow queries: account transactions and assets
    const results = await Promise.allSettled([
      assetDAO.getByAssetId(address),
      transactionDAO.getTransactionsByOwner(address),
    ]);

    const [assetResult, transactionsResult] = results;

    // Priority order: Asset > Account

    if (assetResult.status === 'fulfilled' && assetResult.value) {
      logger.debug('GraphQL', 'SearchResolverSlow.searchSlow - found asset');
      return {
        asset: assetResult.value,
      };
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
      return {
        account: {
          address,
          transactions: transactionsResult.value.map(
            (transaction: TransactionEntity) => transaction.toGQLNode(),
          ),
        },
      };
    }

    // Return empty account if valid B256 but no results
    if (isB256(address)) {
      logger.debug(
        'GraphQL',
        'SearchResolverSlow.searchSlow - valid B256 but no results',
      );
      return {
        account: {
          address,
          transactions: [],
        },
      };
    }

    logger.debug('GraphQL', 'SearchResolverSlow.searchSlow - no results found');
    return null;
  }
}
