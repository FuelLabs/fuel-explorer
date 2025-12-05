import GetTransaction from '~/application/uc/GetTransaction';
import { logger } from '~/core/Logger';
import type {
  GQLQueryTransactionArgs,
  GQLQueryTransactionsArgs,
  GQLQueryTransactionsByBlockIdArgs,
  GQLQueryTransactionsByOwnerArgs,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import DataCache from '~/infra/cache/DataCache';
import TransactionDAO from '~/infra/dao/TransactionDAO';
import { convertToUsd } from '~/infra/dao/utils';
import AssetGateway from '~/infra/gateway/AssetGateway';
import PaginatedParams from '~/infra/paginator/PaginatedParams';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLTransaction;
type Params = {
  transaction: GQLQueryTransactionArgs;
  transactions: GQLQueryTransactionsArgs;
  transactionByOwner: GQLQueryTransactionsByOwnerArgs;
  transactionByBlockId: GQLQueryTransactionsByBlockIdArgs;
};

export class TransactionResolver {
  static create() {
    const resolvers = new TransactionResolver();
    return {
      Query: {
        transaction: resolvers.transaction,
        transactions: resolvers.transactions,
        transactionsByOwner: resolvers.transactionsByOwner,
        transactionsByBlockId: resolvers.transactionsByBlockId,
      },
    };
  }

  async transaction(
    _: Source,
    params: Params['transaction'],
    { chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'TransactionResolver.transaction');
    const baseAssetId = chain?.data.consensusParameters.baseAssetId;
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const getTransaction = new GetTransaction();
    const transaction = await getTransaction.execute(
      params.id,
      chainId,
      baseAssetId,
    );
    if (transaction && baseAssetId != null) {
      const assetGateway = new AssetGateway();
      const baseAsset = await assetGateway.getAsset(baseAssetId, chainId);

      transaction.mintAmountUsd = baseAsset?.rate
        ? convertToUsd(
            transaction?.mintAmount,
            baseAsset.decimals,
            baseAsset.rate,
          ).formatted
        : '';
    }
    return transaction;
  }

  async transactions(
    _: Source,
    params: Params['transactions'],
    { chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'TransactionResolver.transactions');
    const transactionDAO = new TransactionDAO();
    const paginatedParams = new PaginatedParams(params);
    const baseAssetId = chain?.data.consensusParameters.baseAssetId || '';
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const assetGateway = new AssetGateway();
    const baseAsset = await assetGateway.getAsset(baseAssetId, chainId);
    const transactions =
      await transactionDAO.getPaginatedTransactions(paginatedParams);
    for (const transaction of transactions.nodes) {
      if (transaction.gasCosts?.fee) {
        transaction.gasCosts.feeInUsd = baseAsset?.rate
          ? convertToUsd(
              transaction.gasCosts.fee || '',
              baseAsset.decimals,
              baseAsset.rate,
            ).formatted
          : null;
      }
    }
    return transactions;
  }

  async transactionsByOwner(
    _: Source,
    params: Params['transactionByOwner'],
    { chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'TransactionResolver.transactionsByOwner');
    const paginatedParams = new PaginatedParams(params);
    const cacheKey = `txByOwner:${params.owner}:${paginatedParams.cursor || 'init'}:${paginatedParams.direction}:${paginatedParams.last}`;

    const cached = DataCache.getInstance().get(cacheKey);
    if (cached) {
      return cached;
    }

    const transactionDAO = new TransactionDAO();
    const baseAssetId = chain?.data.consensusParameters.baseAssetId || '';
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const assetGateway = new AssetGateway();
    const baseAsset = await assetGateway.getAsset(baseAssetId, chainId);
    const transactions = await transactionDAO.getPaginatedTransactionsByOwner(
      params.owner,
      paginatedParams,
    );
    for (const transaction of transactions.nodes) {
      if (transaction.gasCosts?.fee) {
        transaction.gasCosts.feeInUsd = baseAsset?.rate
          ? convertToUsd(
              transaction.gasCosts.fee || '',
              baseAsset.decimals,
              baseAsset.rate,
            ).formatted
          : null;
      }
    }

    DataCache.getInstance().save(cacheKey, 30000, transactions);
    return transactions;
  }

  async transactionsByBlockId(
    _: Source,
    params: Params['transactionByBlockId'],
    { chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'TransactionResolver.transactionsByBlockId');
    const transactionDAO = new TransactionDAO();
    const paginatedParams = new PaginatedParams(params);
    const baseAssetId = chain?.data.consensusParameters.baseAssetId || '';
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const assetGateway = new AssetGateway();
    const baseAsset = await assetGateway.getAsset(baseAssetId, chainId);
    const transactions = await transactionDAO.getPaginatedTransactionsByBlockId(
      params.blockId,
      paginatedParams,
    );
    for (const transaction of transactions.nodes) {
      if (transaction.gasCosts?.fee) {
        transaction.gasCosts.feeInUsd = baseAsset?.rate
          ? convertToUsd(
              transaction.gasCosts.fee || '',
              baseAsset.decimals,
              baseAsset.rate,
            ).formatted
          : null;
      }
    }
    return transactions;
  }
}
