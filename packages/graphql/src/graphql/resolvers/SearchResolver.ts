import { Hash256 } from '~/application/vo';
import DataCache from '~/infra/cache/DataCache';
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
    const cacheKey = `search:${params.query.toLowerCase()}`;
    const cachedResult = DataCache.getInstance().get(cacheKey);
    if (cachedResult !== undefined) {
      return cachedResult;
    }

    // Check if query is a block height (numeric, not starting with 0x)
    if (!params.query.startsWith('0x') && !Number.isNaN(Number(params.query))) {
      const blockDAO = new BlockDAO();
      const block = await blockDAO.getByHeight(Number(params.query));
      if (block) {
        const result = {
          block: block.toGQLNode(),
        };
        DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, result);
        return result;
      }
    }

    let address: string;
    try {
      address = Hash256.create(params.query).value();
    } catch {
      DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, null);
      return null;
    }

    const blockDAO = new BlockDAO();
    const contractDAO = new ContractDAO();
    const transactionDAO = new TransactionDAO();
    const predicateDAO = new PredicateDAO();

    const results = await Promise.allSettled([
      blockDAO.getByHash(address),
      contractDAO.getByHash(address),
      transactionDAO.getByHash(address),
      predicateDAO.getByAddress(address),
      transactionDAO.accountExists(address),
    ]);

    const [
      blockResult,
      contractResult,
      transactionResult,
      predicateResult,
      accountExistsResult,
    ] = results;

    // Priority order: Block > Contract > Transaction > Account (only if has transactions) > Predicate

    if (blockResult.status === 'fulfilled' && blockResult.value) {
      const result = {
        block: blockResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, result);
      return result;
    }

    if (contractResult.status === 'fulfilled' && contractResult.value) {
      const result = {
        contract: contractResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, result);
      return result;
    }

    if (transactionResult.status === 'fulfilled' && transactionResult.value) {
      const result = {
        transaction: transactionResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, result);
      return result;
    }

    // Only return account if it has transactions (validate it exists)
    const accountExists =
      accountExistsResult.status === 'fulfilled' && accountExistsResult.value;
    if (accountExists) {
      const result = {
        account: {
          address,
        },
      };
      DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, result);
      return result;
    }

    // Only return predicate if it has bytecode (validate it exists)
    if (
      predicateResult.status === 'fulfilled' &&
      predicateResult.value &&
      predicateResult.value.bytecode !== '0x'
    ) {
      const result = {
        predicate: predicateResult.value.toGQLNode(),
      };
      DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, result);
      return result;
    }

    DataCache.getInstance().save(cacheKey, 1 * 60 * 1000, null);
    return null;
  }
}
