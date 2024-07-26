import { logger } from '~/core/Logger';
import type { Paginator } from '~/core/Paginator';
import type {
  GQLBlock,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { TransactionEntity } from './TransactionEntity';
import { TransactionsTable } from './TransactionModel';
import {
  TransactionStatements,
  type TransactionStatementsItem,
} from './TransactionStatements';

export class TransactionRepository {
  statements!: TransactionStatementsItem;
  constructor(readonly conn: DbConnection | DbTransaction) {
    const statements = new TransactionStatements(conn);
    this.statements = statements.build();
  }

  async findByHash(id: string) {
    logger.debugRequest('TransactionRepository.findByHash', { id });
    const transaction = await this.statements.findByHash.execute({
      txHash: id,
    });
    logger.debugResponse('TransactionRepository.findByHash', { transaction });
    if (!transaction) return null;
    logger.debugDone('TransactionRepository.findByHash');
    return TransactionEntity.createFromDB(transaction);
  }

  async findMany(paginator: Paginator<typeof TransactionsTable>) {
    logger.debugRequest('TransactionRepository.findMany', { paginator });
    const statement = this.statements.findMany(paginator);
    const transactions = await statement.execute();
    logger.debugResponse('TransactionRepository.findMany', { transactions });
    return transactions?.map((transaction) =>
      TransactionEntity.createFromDB(transaction),
    );
  }

  async findManyByOwner(
    paginator: Paginator<typeof TransactionsTable>,
    owner: string,
  ) {
    logger.debugRequest('TransactionRepository.findManyByOwner', {
      paginator,
      owner,
    });
    const statement = this.statements.findManyByOwner(paginator);
    const transactions = await statement.execute(owner);
    logger.debugResponse('TransactionRepository.findManyByOwner', {
      transactions,
    });
    return transactions.map((transaction) =>
      TransactionEntity.createFromDB(transaction),
    );
  }

  async upsertMany(
    inserts: {
      block: Omit<GQLBlock, 'transactions'>;
      transaction: GQLTransaction;
      index: number;
    }[],
    trx: DbTransaction,
  ) {
    const conn = trx || this.conn;
    const values = inserts.map((item) =>
      TransactionEntity.toDBItem(
        Number(item.block.header.height),
        this.addBlockToTx(item.transaction, item.block),
        item.index,
      ),
    );
    const items = await conn
      .insert(TransactionsTable)
      .values(values)
      .onConflictDoNothing()
      .returning();
    // retornar somente os values com id e data, evitando o returning e pesando a query
    return items.map((item) => TransactionEntity.createFromDB(item));
  }

  private addBlockToTx(
    item: GQLTransaction,
    block: Omit<GQLBlock, 'transactions'>,
  ) {
    if (
      item.status &&
      (item.status.__typename === 'FailureStatus' ||
        item.status.__typename === 'SuccessStatus')
    ) {
      item.status.block = block as GQLBlock;
    }
    return item;
  }
}
