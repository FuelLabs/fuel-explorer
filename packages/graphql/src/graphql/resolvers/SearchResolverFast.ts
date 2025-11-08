import { Hash256 } from '~/application/vo';
import { logger } from '~/core/Logger';
import BlockDAO from '~/infra/dao/BlockDAO';
import ContractDAO from '~/infra/dao/ContractDAO';
import PredicateDAO from '~/infra/dao/PredicateDAO';
import TransactionDAO from '~/infra/dao/TransactionDAO';

type Params = {
  search: { query: string };
};

export class SearchResolverFast {
  static create() {
    const resolvers = new SearchResolverFast();
    return {
      Query: {
        searchFast: resolvers.searchFast,
      },
    };
  }

  async searchFast(_null: any, params: Params['search']) {
    logger.debug('GraphQL', 'SearchResolverFast.searchFast', {
      query: params.query,
    });

    // Check if query is a block height (numeric, not starting with 0x)
    if (!params.query.startsWith('0x') && !Number.isNaN(Number(params.query))) {
      const blockDAO = new BlockDAO();
      const block = await blockDAO.getByHeight(Number(params.query));
      if (block) {
        logger.debug(
          'GraphQL',
          'SearchResolverFast.searchFast - found block by height',
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
    const predicateDAO = new PredicateDAO();

    // Fast queries only: block, contract, transaction, predicate
    const results = await Promise.allSettled([
      blockDAO.getByHash(address),
      contractDAO.getByHash(address),
      transactionDAO.getByHash(address),
      predicateDAO.getByAddress(address),
    ]);

    const [blockResult, contractResult, transactionResult, predicateResult] =
      results;

    // Priority order: Block > Contract > Transaction > Predicate

    if (blockResult.status === 'fulfilled' && blockResult.value) {
      logger.debug(
        'GraphQL',
        'SearchResolverFast.searchFast - found block by hash',
      );
      return {
        block: blockResult.value.toGQLNode(),
      };
    }

    if (contractResult.status === 'fulfilled' && contractResult.value) {
      logger.debug('GraphQL', 'SearchResolverFast.searchFast - found contract');
      return {
        contract: contractResult.value.toGQLNode(),
      };
    }

    if (transactionResult.status === 'fulfilled' && transactionResult.value) {
      logger.debug(
        'GraphQL',
        'SearchResolverFast.searchFast - found transaction',
      );
      return {
        transaction: transactionResult.value.toGQLNode(),
      };
    }

    if (predicateResult.status === 'fulfilled' && predicateResult.value) {
      logger.debug(
        'GraphQL',
        'SearchResolverFast.searchFast - found predicate',
      );
      return {
        predicate: predicateResult.value.toGQLNode(),
      };
    }

    // Return null if no fast result found (slow queries will handle the rest)
    logger.debug(
      'GraphQL',
      'SearchResolverFast.searchFast - no fast results found',
    );
    return null;
  }
}
