import { eq, like, sql } from 'drizzle-orm';
import { BaseStatements } from '~/core/BaseStatement';
import type { Paginator } from '~/core/Paginator';
import { TransactionsTable } from './TransactionModel';

const TABLE = TransactionsTable;
export type TransactionStatementsItem = ReturnType<
  TransactionStatements['build']
>;

export class TransactionStatements extends BaseStatements<typeof TABLE> {
  protected get tableName() {
    return 'transactions';
  }
  protected get table() {
    return TABLE;
  }

  build() {
    return {
      findByHash: this.findByHash,
      findMany: this.findMany(),
      findManyByOwner: this.findManyByOwner(),
    };
  }

  get findByHash() {
    return this.conn.query.TransactionsTable.findFirst({
      where: eq(TABLE.txHash, sql.placeholder('txHash')),
    }).prepare('transactions.findByHash');
  }

  findManyByOwner() {
    const where = like(TABLE.accountIndex, sql.placeholder('owner'));
    const byFirst = this.findManyByFirst(where);
    const byLast = this.findManyByLast(where);
    return (paginator: Paginator<typeof TABLE>) => {
      const params = this.getPaginatorParams(paginator);
      const exec = paginator.params.first ? byFirst : byLast;
      return { execute: (owner: string) => exec.execute({ ...params, owner }) };
    };
  }
}
