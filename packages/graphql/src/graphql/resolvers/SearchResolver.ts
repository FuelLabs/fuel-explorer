import { isB256 } from 'fuels';
import { Hash256 } from '~/application/vo';
import { logger } from '~/core/Logger';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import BlockDAO from '~/infra/dao/BlockDAO';
import ContractDAO from '~/infra/dao/ContractDAO';
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
    logger.debug('GraphQL', 'SearchResolver.search');

    if (!params.query.startsWith('0x') && !Number.isNaN(Number(params.query))) {
      const blockDAO = new BlockDAO();
      const block = await blockDAO.getByHeight(Number(params.query));
      if (block) {
        return {
          block: block.toGQLNode(),
        };
      }
    }

    const address = Hash256.create(params.query).value();
    const blockDAO = new BlockDAO();
    const contractDAO = new ContractDAO();
    const transactionDAO = new TransactionDAO();

    const results = await Promise.allSettled([
      blockDAO.getByHash(address),
      contractDAO.getByHash(address),
      transactionDAO.getByHash(address),
      transactionDAO.getTransactionsByOwner(address),
    ]);

    const [blockResult, contractResult, transactionResult, transactionsResult] =
      results;

    if (blockResult.status === 'fulfilled' && blockResult.value) {
      return {
        block: blockResult.value.toGQLNode(),
      };
    }

    if (contractResult.status === 'fulfilled' && contractResult.value) {
      return {
        contract: contractResult.value.toGQLNode(),
      };
    }

    if (transactionResult.status === 'fulfilled' && transactionResult.value) {
      return {
        transaction: transactionResult.value.toGQLNode(),
      };
    }

    if (
      transactionsResult.status === 'fulfilled' &&
      transactionsResult.value &&
      transactionsResult.value.length > 0
    ) {
      return {
        account: {
          address,
          transactions: transactionsResult.value.map(
            (transaction: TransactionEntity) => transaction.toGQLNode(),
          ),
        },
      };
    }

    if (isB256(address)) {
      return {
        account: {
          address,
          transactions: [],
        },
      };
    }
  }
}
