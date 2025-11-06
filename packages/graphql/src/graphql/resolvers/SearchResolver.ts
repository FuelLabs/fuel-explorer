import { isB256 } from 'fuels';
import { Hash256 } from '~/application/vo';
import { logger } from '~/core/Logger';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
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

    // Check if query is a block height (numeric, not starting with 0x)
    if (!params.query.startsWith('0x') && !Number.isNaN(Number(params.query))) {
      const blockDAO = new BlockDAO();
      const block = await blockDAO.getByHeight(Number(params.query));
      if (block) {
        logger.debug(
          'GraphQL',
          'SearchResolver.search - found block by height',
        );
        return {
          block: block.toGQLNode(),
        };
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
      transactionDAO.getTransactionsByOwner(address),
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
      return {
        block: blockResult.value.toGQLNode(),
      };
    }

    if (contractResult.status === 'fulfilled' && contractResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found contract');
      return {
        contract: contractResult.value.toGQLNode(),
      };
    }

    if (transactionResult.status === 'fulfilled' && transactionResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found transaction');
      return {
        transaction: transactionResult.value.toGQLNode(),
      };
    }

    if (assetResult.status === 'fulfilled' && assetResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found asset');
      return {
        asset: assetResult.value,
      };
    }

    if (predicateResult.status === 'fulfilled' && predicateResult.value) {
      logger.debug('GraphQL', 'SearchResolver.search - found predicate');
      return {
        predicate: predicateResult.value.toGQLNode(),
      };
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
        'SearchResolver.search - valid B256 but no results',
      );
      return {
        account: {
          address,
          transactions: [],
        },
      };
    }

    logger.debug('GraphQL', 'SearchResolver.search - no results found');
    return null;
  }
}
