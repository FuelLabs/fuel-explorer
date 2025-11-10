import { isB256 } from 'fuels';
import { Hash256 } from '~/application/vo';
import { logger } from '~/core/Logger';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import DataCache from '~/infra/cache/DataCache';
import AssetDAO from '~/infra/dao/AssetDAO';
import BlockDAO from '~/infra/dao/BlockDAO';
import ContractDAO from '~/infra/dao/ContractDAO';
import PredicateDAO from '~/infra/dao/PredicateDAO';
import TransactionDAO from '~/infra/dao/TransactionDAO';

type Params = {
  search: { query: string };
};

export class SearchResolver {
  static create() {
    const resolvers = new SearchResolver();
    return {
      Query: {
        search: resolvers.search,
      },
    };
  }

  async search(_null: any, params: Params['search']) {
    logger.debug('GraphQL', 'SearchResolver.search', { query: params.query });

    // Check cache first (5-minute TTL)
    const cacheKey = `search:${params.query.toLowerCase()}`;
    const cachedResult = DataCache.getInstance().get(cacheKey);
    if (cachedResult) {
      logger.debug('GraphQL', 'SearchResolver.search - cache hit', {
        query: params.query,
      });
      return cachedResult;
    }

    // Check if query is a block height (numeric, not starting with 0x)
    if (!params.query.startsWith('0x') && !Number.isNaN(Number(params.query))) {
      const blockDAO = new BlockDAO();
      const block = await blockDAO.getByHeight(Number(params.query));
      if (block) {
        logger.debug(
          'GraphQL',
          'SearchResolver.search - found block by height',
        );
        const result = {
          block: block.toGQLNode(),
        };
        DataCache.getInstance().save(cacheKey, 300000, result); // 5 min TTL
        return result;
      }
    }

    const address = Hash256.create(params.query).value();
    const blockDAO = new BlockDAO();
    const contractDAO = new ContractDAO();
    const transactionDAO = new TransactionDAO();
    const assetDAO = new AssetDAO();
    const predicateDAO = new PredicateDAO();

    const results = await Promise.allSettled([
      blockDAO.getByHash(address),
      contractDAO.getByHash(address),
      transactionDAO.getByHash(address),
      assetDAO.getByAssetId(address),
      predicateDAO.getByAddress(address),
      transactionDAO.getRecentTransactionsByOwner(address),
    ]);

    const [
      blockResult,
      contractResult,
      transactionResult,
      assetResult,
      predicateResult,
      transactionsResult,
    ] = results;

    // Priority order: Block > Contract > Transaction > Asset > Predicate > Account

    if (blockResult.status === 'fulfilled' && blockResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found block by hash');
      const result = {
        block: blockResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 300000, result);
      return result;
    }

    if (contractResult.status === 'fulfilled' && contractResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found contract');
      const result = {
        contract: contractResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 300000, result);
      return result;
    }

    if (transactionResult.status === 'fulfilled' && transactionResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found transaction');
      const result = {
        transaction: transactionResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 300000, result);
      return result;
    }

    if (assetResult.status === 'fulfilled' && assetResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found asset');
      const result = {
        asset: assetResult.value,
      };
      DataCache.getInstance().save(cacheKey, 300000, result);
      return result;
    }

    if (predicateResult.status === 'fulfilled' && predicateResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found predicate');
      const result = {
        predicate: predicateResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 300000, result);
      return result;
    }

    if (
      transactionsResult.status === 'fulfilled' &&
      transactionsResult.value &&
      transactionsResult.value.length > 0
    ) {
      logger.debug(
        'GraphQL',
        'SearchResolver.search - found account with transactions',
      );
      const result = {
        account: {
          address,
          transactions: transactionsResult.value.map(
            (transaction: TransactionEntity) => transaction.toGQLNode(),
          ),
        },
      };
      DataCache.getInstance().save(cacheKey, 300000, result);
      return result;
    }

    // Return empty account if valid B256 but no results
    if (isB256(address)) {
      logger.debug(
        'GraphQL',
        'SearchResolver.search - valid B256 but no results',
      );
      const result = {
        account: {
          address,
          transactions: [],
        },
      };
      DataCache.getInstance().save(cacheKey, 300000, result);
      return result;
    }

    logger.debug('GraphQL', 'SearchResolver.search - no results found');
    // Cache null result for non-B256 addresses (shorter TTL: 1 minute)
    DataCache.getInstance().save(cacheKey, 60000, null);
    return null;
  }
}
