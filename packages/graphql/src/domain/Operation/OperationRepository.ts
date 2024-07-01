import type { GQLOperation } from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { OperationEntity } from './OperationEntity';
import { OperationsTable } from './OperationModel';

export class OperationRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async insertMany(
    operations: GQLOperation[],
    transactionId: TxID,
    transactionHash: string,
  ) {
    const values = operations.map((operation) =>
      OperationEntity.toDBItem(operation, transactionId, transactionHash),
    );
    await this.conn.insert(OperationsTable).values(values);
  }
}
