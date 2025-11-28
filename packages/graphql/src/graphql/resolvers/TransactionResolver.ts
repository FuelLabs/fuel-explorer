import { TransactionCoder, arrayify } from 'fuels';
import GetTransaction from '~/application/uc/GetTransaction';
import { logger } from '~/core/Logger';
import type {
  GQLQueryTransactionArgs,
  GQLQueryTransactionsArgs,
  GQLQueryTransactionsByBlockIdArgs,
  GQLQueryTransactionsByOwnerArgs,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
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
      Transaction: {
        ownerInputIndex: TransactionResolver.resolveOwnerInputIndex,
      },
    };
  }

  /**
   * Resolves the Owner policy (PolicyType 32) using fuels-ts SDK decoder.
   * The Owner policy designates which input index is the transaction owner.
   */
  static resolveOwnerInputIndex(transaction: GQLTransaction): number | null {
    try {
      const rawPayload = transaction.rawPayload;
      if (!rawPayload) {
        return null;
      }

      // Use fuels-ts SDK to decode the transaction
      const bytes = arrayify(rawPayload);
      const [decoded] = new TransactionCoder().decode(bytes, 0);

      // Access ownerInputIndex from decoded policies
      const ownerInputIndex = decoded.policies?.find(
        (p: { type: number; data: unknown }) => p.type === 32,
      )?.data;

      if (ownerInputIndex !== undefined) {
        logger.debug(
          'TransactionResolver.ownerInputIndex',
          `Owner policy found: ${ownerInputIndex}`,
        );
        return Number(ownerInputIndex);
      }

      return null;
    } catch (error) {
      logger.error('TransactionResolver.ownerInputIndex', error);
      return null;
    }
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
    const transactionDAO = new TransactionDAO();
    const paginatedParams = new PaginatedParams(params);
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
