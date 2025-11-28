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

  static resolveOwnerInputIndex(transaction: GQLTransaction): number | null {
    try {
      if (!transaction.isScript) {
        return null;
      }

      const rawPayload = transaction.rawPayload;
      if (!rawPayload || typeof rawPayload !== 'string') {
        logger.debug('TransactionResolver.ownerInputIndex', 'No rawPayload');
        return null;
      }

      const payload = rawPayload.startsWith('0x')
        ? rawPayload.slice(2)
        : rawPayload;

      const POLICY_TYPES_OFFSET = 128;

      const policyTypesHex = payload.slice(
        POLICY_TYPES_OFFSET,
        POLICY_TYPES_OFFSET + 16,
      );
      const policyTypes = Number.parseInt(policyTypesHex, 16);

      logger.debug(
        'TransactionResolver.ownerInputIndex',
        `rawPayload length: ${payload.length}, policyTypesHex: ${policyTypesHex}, policyTypes: ${policyTypes}`,
      );

      const OWNER_POLICY_BIT = 32;
      if ((policyTypes & OWNER_POLICY_BIT) === OWNER_POLICY_BIT) {
        const ownerIndex = parseOwnerPolicyFromPayload(payload, policyTypes);
        logger.debug(
          'TransactionResolver.ownerInputIndex',
          `Owner policy found! ownerIndex: ${ownerIndex}`,
        );
        return ownerIndex;
      }

      logger.debug(
        'TransactionResolver.ownerInputIndex',
        `No Owner policy (policyTypes=${policyTypes}, bit 32 not set)`,
      );
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

function parseOwnerPolicyFromPayload(
  payload: string,
  policyTypes: number,
): number | null {
  try {
    if ((policyTypes & 32) === 0) {
      return null;
    }

    // Count preceding policies (all bits lower than Owner's bit 5)
    // Bits: Tip(0), WitnessLimit(1), Maturity(2), MaxFee(3), Reserved(4)
    let precedingPolicies = 0;
    if ((policyTypes & 1) !== 0) precedingPolicies++; // Tip
    if ((policyTypes & 2) !== 0) precedingPolicies++; // WitnessLimit
    if ((policyTypes & 4) !== 0) precedingPolicies++; // Maturity
    if ((policyTypes & 8) !== 0) precedingPolicies++; // MaxFee
    if ((policyTypes & 16) !== 0) precedingPolicies++; // Reserved (bit 4, currently unused)

    const skipHexChars = precedingPolicies * 16;

    const scriptLength = Number.parseInt(payload.slice(96, 112), 16);
    const scriptDataLength = Number.parseInt(payload.slice(112, 128), 16);

    const variableDataEnd = 192 + scriptLength * 2 + scriptDataLength * 2;
    const policiesStart = Math.ceil(variableDataEnd / 16) * 16;

    const ownerOffset = policiesStart + skipHexChars;
    const ownerHex = payload.slice(ownerOffset, ownerOffset + 16);
    const ownerValue = Number.parseInt(ownerHex, 16);

    logger.debug(
      'parseOwnerPolicyFromPayload',
      `precedingPolicies: ${precedingPolicies}, ownerOffset: ${ownerOffset}, ownerValue: ${ownerValue}`,
    );

    return ownerValue;
  } catch (error) {
    logger.error('parseOwnerPolicyFromPayload', error);
    return null;
  }
}
