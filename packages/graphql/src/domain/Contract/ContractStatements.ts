import { eq, sql } from 'drizzle-orm';
import { BaseStatements } from '~/core/BaseStatement';
import { ContractsTable } from './ContractModel';

const TABLE = ContractsTable;
export type ContractStatementsItem = ReturnType<ContractStatements['build']>;

export class ContractStatements extends BaseStatements<typeof TABLE> {
  protected get tableName() {
    return 'contracts';
  }
  protected get table() {
    return TABLE;
  }

  build() {
    return {
      findByHash: this.findByHash,
      findMany: this.findMany(),
    };
  }

  get findByHash() {
    return this.conn.query.ContractsTable.findFirst({
      where: eq(TABLE.contractHash, sql.placeholder('contractHash')),
    }).prepare('contracts.findByHash');
  }
}
