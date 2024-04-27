import { db } from '@core/db';
import type { GQLBlock, GQLTransaction } from '@core/generated/gql-types';
import { GraphQLSDK } from '@core/infra/graphql/GraphQLSDK';
import { Paginator, type PaginatorParams } from '@core/shared/Paginator';
import { and, eq, like } from 'drizzle-orm';
import { NodeRepository } from '../Node/NodeRepository';
import { TransactionEntity } from './TransactionEntity';
import { TransactionsTable } from './TransactionModel';

export class TransactionRepository {
  constructor(private readonly nodeRepository = new NodeRepository()) {}

  async findByHash(id: string) {
    const transaction = await db
      .connection()
      .query.TransactionsTable.findFirst({
        where: eq(TransactionsTable.txHash, id),
        with: {
          operations: true,
          node: true,
        },
      });

    if (!transaction) return null;
    return TransactionEntity.create(transaction);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const items = await db.connection().query.TransactionsTable.findMany({
      ...paginator.queryParamsFromConfig(config),
      with: {
        operations: true,
        node: true,
      },
    });

    return items.map(TransactionEntity.create);
  }

  async findByOwner(params: PaginatorParams & { owner: string }) {
    const { owner } = params;
    const paginator = new Paginator(TransactionsTable, params);
    await paginator.validateParams();
    const config = await paginator.getQueryPaginationConfig();
    const queryParams = paginator.queryParamsFromConfig(config);
    const items = await db.connection().query.TransactionsTable.findMany({
      ...queryParams,
      where: and(
        queryParams.where,
        like(TransactionsTable.accountIndex, `%${owner}%`),
      ),
      with: {
        operations: true,
        node: true,
      },
    });

    return items.map(TransactionEntity.create);
  }

  async insertOne(txHash: string, block: GQLBlock, index: number) {
    const found = await this.findByHash(txHash);
    if (found) return null;

    const { sdk } = new GraphQLSDK();
    const res = await sdk.transaction({ id: txHash });
    const transaction = res.data?.transaction as GQLTransaction;
    if (!transaction) throw new Error('Transaction not found');

    const node = await this.nodeRepository.findById(transaction.id);
    if (!node) {
      throw new Error(`Node ${transaction.id} not found`);
    }

    const nodeItem = node.toNodeItem();
    const [item] = await db
      .connection()
      .insert(TransactionsTable)
      .values(TransactionEntity.toDBItem(nodeItem, block, index))
      .returning();
    return TransactionEntity.create(item);
  }
}
